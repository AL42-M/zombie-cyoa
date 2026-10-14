/* ============================================================
   THE HUSH — engine
   Rendering, state transitions, persistence, panels, input.
   Classic script (no modules) so the game runs from file://
   ============================================================ */
(function (root, doc) {
  'use strict';

  var Story = root.Story;
  var Ambience = root.Ambience || { start: function () { return false; }, stop: function () {},
    toggle: function () { return false; }, setIntensity: function () {}, sting: function () {}, supported: false };

  var SAVE_KEY = 'hush.save.v1';
  var FOUND_KEY = 'hush.endings.v1';
  var MAX_HISTORY = 80;

  /* ---------------------------------------------------------- helpers */
  function $(id) { return doc.getElementById(id); }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function store(key, value) {
    try { root.localStorage.setItem(key, value); return true; } catch (e) { return false; }
  }
  function recall(key) {
    try { return root.localStorage.getItem(key); } catch (e) { return null; }
  }
  function forget(key) {
    try { root.localStorage.removeItem(key); } catch (e) { /* no-op */ }
  }

  /* ---------------------------------------------------------- elements */
  var el = {};
  function cacheElements() {
    ['title-screen', 'game-screen', 'end-screen', 'hud-chapter', 'hud-place', 'party-strip',
     'passage', 'choices', 'skip-hint', 'toasts', 'overlay', 'panel-title', 'panel-body',
     'btn-begin', 'btn-continue', 'continue-sub', 'btn-endings-title', 'endings-count',
     'btn-help-title', 'btn-journal', 'btn-keepsakes', 'btn-sound', 'btn-menu', 'btn-close-panel',
     'end-kicker', 'end-title', 'end-body', 'end-stats', 'end-keepsakes', 'btn-again', 'btn-rewind',
     'btn-endings-end', 'btn-title', 'pulse'].forEach(function (id) {
      el[id] = $(id);
    });
    ['health', 'infection', 'humanity', 'trauma'].forEach(function (k) {
      el['w-' + k] = $('w-' + k);
      el['m-' + k] = $('m-' + k);
    });
  }

  /* ---------------------------------------------------------- runtime */
  var state = null;
  var history = [];
  var revealTimer = null;
  var revealing = false;
  var pendingChoices = [];
  var lastSnapshot = null;

  /* ---------------------------------------------------------- screens */
  function showScreen(name) {
    [el['title-screen'], el['game-screen'], el['end-screen']].forEach(function (s) {
      if (s) s.classList.remove('is-active');
    });
    var target = name === 'title' ? el['title-screen'] : name === 'end' ? el['end-screen'] : el['game-screen'];
    if (target) target.classList.add('is-active');
    doc.body.setAttribute('data-screen', name);
    if (root.scrollTo) root.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------- prose */
  /* A line is either a string of inline HTML, or { t: html, c: className }. */
  function buildParagraph(line, index, allowLede) {
    var p = doc.createElement('p');
    var html, cls = '';
    if (line && typeof line === 'object') { html = line.t || ''; cls = line.c || ''; }
    else { html = String(line); }
    if (cls) p.className = cls;
    else if (index === 0 && allowLede) p.className = 'lede';
    p.innerHTML = html;
    return p;
  }

  function renderProse(container, lines, allowLede, animate) {
    clear(container);
    var made = [];
    for (var i = 0; i < lines.length; i++) {
      var p = buildParagraph(lines[i], i, allowLede);
      if (animate) p.style.animationDelay = Math.min(i * 0.42, 6) + 's';
      container.appendChild(p);
      made.push(p);
    }
    return made;
  }

  /* Reveal prose one paragraph at a time, then show the choices. */
  function revealPassage(lines) {
    var paras = renderProse(el.passage, lines, true, false);
    paras.forEach(function (p) { p.style.visibility = 'hidden'; });

    el.choices.classList.add('is-hidden');
    revealing = paras.length > 1;
    if (el['skip-hint']) el['skip-hint'].hidden = !revealing;

    var i = 0;
    function step() {
      if (i >= paras.length) { finishReveal(paras); return; }
      var p = paras[i++];
      p.style.visibility = '';
      p.style.animation = 'none';
      /* force reflow so the animation restarts cleanly */
      void p.offsetWidth;
      p.style.animation = '';
      revealTimer = root.setTimeout(step, 620);
    }
    step();
  }

  function finishReveal(paras) {
    if (revealTimer) { root.clearTimeout(revealTimer); revealTimer = null; }
    if (paras) paras.forEach(function (p) { p.style.visibility = ''; });
    revealing = false;
    if (el['skip-hint']) el['skip-hint'].hidden = true;
    showChoices();
  }

  function skipReveal() {
    if (!revealing) return;
    var paras = [].slice.call(el.passage.querySelectorAll('p'));
    paras.forEach(function (p) { p.style.visibility = ''; p.style.animationDelay = '0s'; });
    finishReveal(paras);
  }

  /* ---------------------------------------------------------- choices */
  function resolveChoices(node, s) {
    var raw = Story.choicesOf(node), out = [];
    for (var i = 0; i < raw.length; i++) {
      var c = raw[i];
      if (typeof c.show === 'function' && !c.show(s)) continue;
      var open = (typeof c.when === 'function') ? !!c.when(s) : true;
      out.push({ def: c, open: open });
    }
    return out;
  }

  function showChoices() {
    clear(el.choices);
    pendingChoices.forEach(function (entry, idx) {
      var c = entry.def;
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'choice' + (c.tone ? ' choice--' + c.tone : '') + (entry.open ? '' : ' choice--locked');
      btn.style.animationDelay = (idx * 0.075) + 's';

      var key = doc.createElement('span');
      key.className = 'key';
      key.textContent = String(idx + 1);
      btn.appendChild(key);

      var label = doc.createElement('span');
      label.className = 'label';
      var labelText = (typeof c.label === 'function') ? c.label(state) : c.label;
      label.innerHTML = labelText;

      var hintText = entry.open
        ? ((typeof c.hint === 'function') ? c.hint(state) : c.hint)
        : (c.lockHint || 'not possible now');
      if (hintText) {
        var hint = doc.createElement('span');
        hint.className = 'hint';
        hint.textContent = hintText;
        label.appendChild(hint);
      }
      btn.appendChild(label);

      if (entry.open) {
        btn.addEventListener('click', function () { takeChoice(idx); });
      } else {
        btn.setAttribute('aria-disabled', 'true');
      }
      el.choices.appendChild(btn);
    });
    el.choices.classList.remove('is-hidden');
  }

  /* ---------------------------------------------------------- HUD */
  var LOW = { health: 35, humanity: 35 };
  var HIGH = { infection: 55, trauma: 65 };

  function updateStats(previous) {
    ['health', 'infection', 'humanity', 'trauma'].forEach(function (k) {
      var v = state[k];
      var word = el['w-' + k], meter = el['m-' + k];
      if (word) word.textContent = state.word(k);
      if (meter) meter.style.width = v + '%';
      var wrap = doc.querySelector('.stat[data-stat="' + k + '"]');
      if (wrap) {
        wrap.setAttribute('data-low', String(LOW[k] !== undefined && v < LOW[k]));
        wrap.setAttribute('data-high', String(HIGH[k] !== undefined && v > HIGH[k]));
        if (previous && previous[k] !== v) {
          wrap.classList.add('bump');
          root.setTimeout(function () { wrap.classList.remove('bump'); }, 1000);
        }
      }
    });
    Ambience.setIntensity((state.infection * 0.65 + state.trauma * 0.35) / 100);
  }

  function updateParty() {
    clear(el['party-strip']);
    Object.keys(Story.CAST).forEach(function (id) {
      var person = state.people[id];
      if (!person) return;
      var span = doc.createElement('span');
      span.className = 'pc';
      span.setAttribute('data-state', person.state);
      var dot = doc.createElement('i');
      dot.className = 'dot';
      span.appendChild(dot);
      span.appendChild(doc.createTextNode(Story.CAST[id].name));
      span.title = Story.CAST[id].full + ' — ' + Story.CAST[id].role;
      el['party-strip'].appendChild(span);
    });
  }

  function updateHud(node) {
    if (el['hud-chapter']) el['hud-chapter'].textContent = node.chapter || '';
    if (el['hud-place']) el['hud-place'].textContent = node.place || '';
  }

  /* ---------------------------------------------------------- toasts */
  function toast(message, kind) {
    if (!message) return;
    var t = doc.createElement('div');
    t.className = 'toast' + (kind ? ' toast--' + kind : '');
    t.textContent = message;
    el.toasts.appendChild(t);
    root.setTimeout(function () {
      t.classList.add('out');
      root.setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 520);
    }, 3200);
  }

  function pulse(colour) {
    if (!el.pulse) return;
    el.pulse.style.background = 'radial-gradient(ellipse at center, ' + colour + ' 0%, rgba(0,0,0,0) 70%)';
    el.pulse.style.opacity = '1';
    root.setTimeout(function () { el.pulse.style.opacity = '0'; }, 220);
  }

  /* Compare before/after and narrate what changed. */
  function reportChanges(before) {
    /* items */
    var seen = {}, k;
    for (k in before.items) seen[k] = true;
    for (k in state.items) seen[k] = true;
    Object.keys(seen).forEach(function (id) {
      var was = before.items[id] || 0, now = state.items[id] || 0;
      if (now === was) return;
      var name = (Story.ITEMS[id] && Story.ITEMS[id].name) || id;
      var delta = now - was;
      if (delta > 0) toast('+ ' + name + (delta > 1 ? ' ×' + delta : ''), 'item');
      else toast('− ' + name + (delta < -1 ? ' ×' + (-delta) : ''), 'item');
    });

    /* infection crossing a stage boundary */
    var wasStage = stageOf(before.infection), nowStage = state.stage();
    if (nowStage > wasStage) {
      toast('The hum gets closer.', 'rot');
      Ambience.sting('rot');
      pulse('rgba(141,154,85,.20)');
    } else if (nowStage < wasStage) {
      toast('It recedes. A little.', 'good');
    }

    /* wounds */
    if (state.health < before.health - 10) {
      Ambience.sting('blood');
      pulse('rgba(142,51,38,.26)');
    }
    if (state.trauma > before.trauma + 12) toast('Something in you gives.', 'weight');
    if (state.humanity < before.humanity - 12) toast('You did not hesitate.', 'bad');

    /* the dead */
    before._deadCount = before.deaths ? before.deaths.length : 0;
    if (state.deaths.length > before._deadCount) {
      var latest = state.deaths[state.deaths.length - 1];
      var who = (Story.CAST[latest.id] && Story.CAST[latest.id].name) || latest.id;
      toast(who + ' is gone.', 'bad');
      Ambience.sting('cold');
    }
  }

  /* ---------------------------------------------------------- keepsakes
     Mementos can be granted from a choice's act() or a node's enter(),
     so announcing them is driven off the state itself rather than the
     thing that caused it. Loading and rewinding re-baseline instead of
     re-announcing. */
  var announced = {};

  function syncAnnounced() {
    announced = {};
    if (!state || !state.keepsakes) return;
    for (var i = 0; i < state.keepsakes.length; i++) announced[state.keepsakes[i].id] = true;
  }

  function checkKeepsakes() {
    if (!state || !state.keepsakes) return;
    for (var i = 0; i < state.keepsakes.length; i++) {
      var id = state.keepsakes[i].id;
      if (announced[id]) continue;
      announced[id] = true;
      var def = Story.MEMENTOS[id];
      if (def) toast('Kept — ' + def.name, 'keepsake');
    }
  }

  function stageOf(v) {
    if (v <= 0) return 0;
    if (v < 20) return 1;
    if (v < 40) return 2;
    if (v < 60) return 3;
    if (v < 80) return 4;
    return 5;
  }

  /* ---------------------------------------------------------- journal */
  function logEntry(node, choiceLabel) {
    state.log.push({
      day: state.day,
      place: node.place || '',
      chapter: node.chapter || '',
      text: stripTags(firstLine(node)),
      choice: stripTags(choiceLabel || '')
    });
    if (state.log.length > 120) state.log.shift();
  }

  function firstLine(node) {
    var lines = Story.textOf(node, state);
    if (!lines.length) return '';
    var l = lines[0];
    return (l && typeof l === 'object') ? (l.t || '') : String(l);
  }

  function stripTags(html) {
    var d = doc.createElement('div');
    d.innerHTML = String(html);
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }

  /* ---------------------------------------------------------- endings */
  function foundEndings() {
    var raw = recall(FOUND_KEY);
    if (!raw) return {};
    try { return JSON.parse(raw) || {}; } catch (e) { return {}; }
  }
  function markEndingFound(id) {
    var f = foundEndings();
    f[id] = true;
    store(FOUND_KEY, JSON.stringify(f));
    updateEndingCount();
  }
  function updateEndingCount() {
    var total = Story.endingOrder.length;
    var have = Object.keys(foundEndings()).filter(function (k) { return Story.endings[k]; }).length;
    if (el['endings-count']) el['endings-count'].textContent = have + '/' + total;
  }

  /* ---------------------------------------------------------- save */
  function save() {
    if (!state) return;
    store(SAVE_KEY, JSON.stringify({ state: state, history: history.slice(-MAX_HISTORY) }));
    refreshContinue();
  }

  function loadSave() {
    var raw = recall(SAVE_KEY);
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.state) return null;
      return parsed;
    } catch (e) { return null; }
  }

  function refreshContinue() {
    var saved = loadSave();
    if (!el['btn-continue']) return;
    if (saved && saved.state && Story.has(saved.state.node)) {
      var node = Story.get(saved.state.node);
      el['btn-continue'].hidden = false;
      if (el['continue-sub']) {
        el['continue-sub'].textContent = node.isEnding
          ? '· an ending'
          : '· day ' + saved.state.day + ', ' + (node.place || 'somewhere');
      }
    } else {
      el['btn-continue'].hidden = true;
    }
  }

  /* ---------------------------------------------------------- flow */
  function goTo(id, skipHistory) {
    if (!Story.has(id)) {
      console.error('[THE HUSH] missing node: "' + id + '"');
      toast('This path is not written yet.', 'bad');
      return;
    }
    var node = Story.get(id);
    state.node = id;
    state.visits[id] = (state.visits[id] || 0) + 1;

    if (typeof node.enter === 'function') node.enter(state);
    checkKeepsakes();

    if (node.isEnding) { showEnding(node); return; }

    showScreen('game');
    updateHud(node);
    updateParty();
    updateStats(null);

    pendingChoices = resolveChoices(node, state);
    validateNode(node, pendingChoices);

    revealPassage(Story.textOf(node, state));
    save();
  }

  function takeChoice(index) {
    var entry = pendingChoices[index];
    if (!entry || !entry.open) return;
    var choice = entry.def;
    var node = Story.get(state.node);

    /* snapshot for rewind */
    history.push(JSON.stringify(state));
    if (history.length > MAX_HISTORY) history.shift();

    var before = JSON.parse(JSON.stringify(state));
    var labelText = (typeof choice.label === 'function') ? choice.label(state) : choice.label;
    logEntry(node, labelText);

    state.choicesMade++;
    if (typeof choice.act === 'function') choice.act(state);

    /* once it is in the bone it keeps going, and it speeds up, unless a dose has arrested it */
    if (state.infection > 0 && state.infection < 100 && !state.flag('arrested')) {
      state.bump('_creep');
      if (state.val('_creep') % 2 === 0) state.infect(1 + Math.floor(state.infection / 34));
    }

    reportChanges(before);
    checkKeepsakes();
    if (choice.toast) toast(choice.toast[0], choice.toast[1]);

    var dest = (typeof choice.to === 'function') ? choice.to(state) : choice.to;

    /* death by attrition overrides the written destination */
    if (state.health <= 0 && Story.has('end_body_failed')) dest = 'end_body_failed';
    else if (state.infection >= 100 && Story.has('end_turned')) dest = 'end_turned';

    goTo(dest);
  }

  function rewind() {
    if (!history.length) { toast('There is nothing to go back to.', 'bad'); return; }
    var snap = history.pop();
    try {
      state = new Story.GameState(JSON.parse(snap));
    } catch (e) { toast('That memory is gone.', 'bad'); return; }
    syncAnnounced();
    closePanel();
    goTo(state.node, true);
  }

  function showEnding(node) {
    markEndingFound(node.id);
    var ending = Story.endings[node.id] || {};
    showScreen('end');
    if (el['end-kicker']) el['end-kicker'].textContent = ending.kicker || 'An ending';
    if (el['end-title']) el['end-title'].textContent = ending.title || 'The end of it';
    renderProse(el['end-body'], Story.textOf(node, state), false, true);

    clear(el['end-stats']);
    var survivors = state.party().map(function (id) { return Story.CAST[id].name; });
    var rows = [
      ['Days', String(state.day)],
      ['Choices', String(state.choicesMade)],
      ['Body', state.word('health')],
      ['Blood', state.word('infection')],
      ['Self', state.word('humanity')],
      ['Weight', state.word('trauma')],
      ['Still with you', survivors.length ? survivors.join(', ') : 'No one']
    ];
    rows.forEach(function (r) {
      var d = doc.createElement('div');
      var s = doc.createElement('span'); s.textContent = r[0];
      var b = doc.createElement('b'); b.textContent = r[1];
      d.appendChild(s); d.appendChild(b);
      el['end-stats'].appendChild(d);
    });

    /* what you chose to carry, listed last, because it is the only column
       in this report that you filled in on purpose */
    if (el['end-keepsakes']) {
      clear(el['end-keepsakes']);
      var carried = state.carried();
      if (carried.length) {
        var kh = doc.createElement('h3');
        kh.textContent = 'What you carried out of it';
        el['end-keepsakes'].appendChild(kh);
        carried.forEach(function (m) {
          var row = doc.createElement('div');
          row.className = 'end-keep';
          var nm = doc.createElement('b');
          nm.textContent = m.name;
          var of = doc.createElement('span');
          of.textContent = 'of ' + m.of;
          row.appendChild(nm);
          row.appendChild(of);
          el['end-keepsakes'].appendChild(row);
        });
      }
    }

    lastSnapshot = history.length ? history[history.length - 1] : null;
    if (el['btn-rewind']) el['btn-rewind'].hidden = !lastSnapshot;
    forget(SAVE_KEY);
    refreshContinue();
  }

  /* ---------------------------------------------------------- panels */
  function openPanel(title, build) {
    if (!el.overlay) return;
    el['panel-title'].textContent = title;
    clear(el['panel-body']);
    build(el['panel-body']);
    el.overlay.hidden = false;
  }
  function closePanel() { if (el.overlay) el.overlay.hidden = true; }

  function buildJournal(body) {
    if (!state || !state.log.length) {
      var p = doc.createElement('p');
      p.textContent = 'Nothing written down yet.';
      body.appendChild(p);
      return;
    }
    for (var i = state.log.length - 1; i >= 0; i--) {
      var entry = state.log[i];
      var row = doc.createElement('div');
      row.className = 'jrow';
      var head = doc.createElement('div');
      head.className = 'jhead';
      head.textContent = 'Day ' + entry.day + (entry.place ? ' · ' + entry.place : '');
      var text = doc.createElement('div');
      text.className = 'jtext';
      text.textContent = entry.text.length > 180 ? entry.text.slice(0, 180) + '…' : entry.text;
      var choice = doc.createElement('div');
      choice.className = 'jchoice';
      choice.textContent = entry.choice;
      row.appendChild(head); row.appendChild(text); row.appendChild(choice);
      body.appendChild(row);
    }
  }

  function buildKeepsakes(body) {
    var carried = state ? state.carried() : [];
    var intro = doc.createElement('p');
    intro.className = 'keep-intro';
    intro.textContent = carried.length
      ? 'Things you have kept for no practical reason. They weigh nothing and you have never once considered putting them down.'
      : 'You are carrying nothing you did not need. Not yet.';
    body.appendChild(intro);

    carried.forEach(function (m) {
      var card = doc.createElement('div');
      card.className = 'keepsake';

      var h = doc.createElement('h4');
      h.textContent = m.name;
      card.appendChild(h);

      var of = doc.createElement('div');
      of.className = 'keep-of';
      of.textContent = 'of ' + m.of;
      card.appendChild(of);

      var desc = doc.createElement('p');
      desc.className = 'keep-desc';
      desc.innerHTML = m.desc;
      card.appendChild(desc);

      if (m.note) {
        var note = doc.createElement('p');
        note.className = 'keep-note';
        note.textContent = m.note;
        card.appendChild(note);
      }

      var day = doc.createElement('div');
      day.className = 'keep-day';
      day.textContent = 'carried since day ' + m.day;
      card.appendChild(day);

      body.appendChild(card);
    });
  }

  function buildEndings(body) {
    var found = foundEndings();
    var intro = doc.createElement('p');
    var have = Object.keys(found).filter(function (k) { return Story.endings[k]; }).length;
    intro.textContent = have + ' of ' + Story.endingOrder.length + ' endings found. The rest are still out there.';
    body.appendChild(intro);

    Story.endingOrder.forEach(function (id) {
      var e = Story.endings[id];
      var card = doc.createElement('div');
      var isFound = !!found[id];
      card.className = 'ending-card' + (isFound ? ' found' : ' locked');
      var h = doc.createElement('h4');
      h.textContent = isFound ? e.title : '— — — — —';
      card.appendChild(h);
      var p = doc.createElement('p');
      p.textContent = isFound ? (e.blurb || '') : (e.tease || 'Not yet found.');
      card.appendChild(p);
      if (isFound && e.tag) {
        var tag = doc.createElement('span');
        tag.className = 'etag';
        tag.textContent = e.tag;
        card.appendChild(tag);
      }
      body.appendChild(card);
    });
  }

  function buildMenu(body) {
    var list = doc.createElement('div');
    list.className = 'menu-list';
    function add(text, fn) {
      var b = doc.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-ghost';
      b.textContent = text;
      b.addEventListener('click', fn);
      list.appendChild(b);
    }
    add('Journal', function () { openPanel('Journal', buildJournal); });
    add('Keepsakes', function () { openPanel('Keepsakes', buildKeepsakes); });
    add('Endings found', function () { openPanel('Endings', buildEndings); });
    add('How to play', function () { openPanel('How to play', buildHelp); });
    add('Step back one choice', function () { rewind(); });
    add('Abandon this run', function () {
      if (root.confirm('Abandon this run and return to the title screen? Your progress in this run is lost.')) {
        forget(SAVE_KEY);
        closePanel();
        showScreen('title');
        refreshContinue();
      }
    });
    body.appendChild(list);
  }

  function buildHelp(body) {
    body.innerHTML =
      '<h3>How to play</h3>' +
      '<p>Read what is in front of you, then pick one of the choices. There is never a text box — ' +
      'you choose from what is offered, and what is offered is never everything you want.</p>' +
      '<h3>Your condition</h3>' +
      '<ul>' +
      '<li><b>Body</b> — what you can still do. At zero you stop.</li>' +
      '<li><b>Blood</b> — how far the hum has gone into you. It does not go back easily.</li>' +
      '<li><b>Self</b> — how much of the person you were is still driving.</li>' +
      '<li><b>Weight</b> — what you are carrying that cannot be put down.</li>' +
      '</ul>' +
      '<p>These are shown in words, never numbers. You are not meant to optimise them. ' +
      'You are meant to live with them.</p>' +
      '<h3>Keys</h3>' +
      '<ul><li><b>1</b>–<b>7</b> choose</li><li><b>J</b> journal</li><li><b>K</b> keepsakes</li>' +
      '<li><b>M</b> ambience</li>' +
      '<li><b>Esc</b> menu, or close a panel</li><li><b>Space</b> finish the text</li></ul>' +
      '<h3>Keepsakes</h3>' +
      '<p>Some choices let you pick up a small thing that is of no use to anybody — a photograph, ' +
      'a torn page, a tuning fork. They do nothing. They cannot be spent, traded or lost. ' +
      'They are only a record of who and what you decided was worth carrying, and they are ' +
      'read back to you at the end.</p>' +
      '<h3>Saving</h3>' +
      '<p>Your run is saved in this browser as you go. Reaching an ending clears it — ' +
      'but endings you find are remembered on the title screen.</p>' +
      '<h3>A note</h3>' +
      '<p>Some choices are cruel, and the game will not stop you or scold you. ' +
      'It will only remember.</p>';
  }

  /* ---------------------------------------------------------- new run */
  function beginRun() {
    state = new Story.GameState();
    history = [];
    syncAnnounced();
    forget(SAVE_KEY);
    goTo(Story.START);
  }

  function continueRun() {
    var saved = loadSave();
    if (!saved) { beginRun(); return; }
    state = new Story.GameState(saved.state);
    history = saved.history || [];
    syncAnnounced();
    goTo(state.node, true);
  }

  /* ---------------------------------------------------------- sound */
  function syncSoundButton() {
    if (!el['btn-sound']) return;
    var on = Ambience.enabled;
    el['btn-sound'].textContent = 'Sound: ' + (on ? 'on' : 'off');
    el['btn-sound'].setAttribute('aria-pressed', String(on));
  }

  function toggleSound() {
    if (!Ambience.supported) { toast('No audio available in this browser.', 'bad'); return; }
    Ambience.toggle();
    if (state) Ambience.setIntensity((state.infection * 0.65 + state.trauma * 0.35) / 100);
    syncSoundButton();
  }

  /* ---------------------------------------------------------- sanity */
  var warned = {};
  function validateNode(node, choices) {
    if (warned[node.id]) return;
    warned[node.id] = true;
    var open = choices.filter(function (c) { return c.open; }).length;
    if (choices.length < 3) {
      console.warn('[THE HUSH] node "' + node.id + '" shows ' + choices.length + ' choices (needs 3–7).');
    }
    if (choices.length > 7) {
      console.warn('[THE HUSH] node "' + node.id + '" shows ' + choices.length + ' choices (max 7).');
    }
    if (open === 0) {
      console.warn('[THE HUSH] node "' + node.id + '" has no selectable choice — the run can dead-end here.');
    }
  }

  /* Walk the whole graph once at boot so broken links surface immediately. */
  function auditStory() {
    var problems = 0;
    Story.order.forEach(function (id) {
      var node = Story.nodes[id];
      var choices = Story.choicesOf(node);
      if (!node.isEnding) {
        if (choices.length < 3 || choices.length > 7) {
          console.warn('[THE HUSH] "' + id + '" declares ' + choices.length + ' choices (needs 3–7).');
          problems++;
        }
      }
      choices.forEach(function (c, i) {
        if (typeof c.to === 'function') return; /* dynamic, cannot check statically */
        if (!c.to || !Story.has(c.to)) {
          console.error('[THE HUSH] "' + id + '" choice ' + (i + 1) + ' points at missing node "' + c.to + '".');
          problems++;
        }
      });
    });
    var msg = '[THE HUSH] ' + Story.order.length + ' nodes, ' + Story.endingOrder.length + ' endings';
    console.log(problems ? msg + ' — ' + problems + ' problem(s) found.' : msg + ' — graph OK.');
    return problems;
  }

  /* ---------------------------------------------------------- input */
  function onKey(e) {
    var key = e.key;
    if (key === 'Escape') {
      if (el.overlay && !el.overlay.hidden) closePanel();
      else if (doc.body.getAttribute('data-screen') === 'game') openPanel('Menu', buildMenu);
      return;
    }
    if (el.overlay && !el.overlay.hidden) return;
    if (doc.body.getAttribute('data-screen') !== 'game') return;

    if (key === ' ' || key === 'Enter') {
      if (revealing) { e.preventDefault(); skipReveal(); }
      return;
    }
    if (key === 'j' || key === 'J') { openPanel('Journal', buildJournal); return; }
    if (key === 'k' || key === 'K') { openPanel('Keepsakes', buildKeepsakes); return; }
    if (key === 'm' || key === 'M') { toggleSound(); return; }

    var n = parseInt(key, 10);
    if (n >= 1 && n <= 7) {
      if (revealing) { skipReveal(); return; }
      takeChoice(n - 1);
    }
  }

  /* ---------------------------------------------------------- boot */
  function wire() {
    el['btn-begin'].addEventListener('click', beginRun);
    el['btn-continue'].addEventListener('click', continueRun);
    el['btn-help-title'].addEventListener('click', function () { openPanel('How to play', buildHelp); });
    el['btn-endings-title'].addEventListener('click', function () { openPanel('Endings', buildEndings); });
    el['btn-journal'].addEventListener('click', function () { openPanel('Journal', buildJournal); });
    el['btn-keepsakes'].addEventListener('click', function () { openPanel('Keepsakes', buildKeepsakes); });
    el['btn-menu'].addEventListener('click', function () { openPanel('Menu', buildMenu); });
    el['btn-sound'].addEventListener('click', toggleSound);
    el['btn-close-panel'].addEventListener('click', closePanel);
    el['skip-hint'].addEventListener('click', skipReveal);
    el.passage.addEventListener('click', function () { if (revealing) skipReveal(); });

    el['btn-again'].addEventListener('click', beginRun);
    el['btn-rewind'].addEventListener('click', rewind);
    el['btn-endings-end'].addEventListener('click', function () { openPanel('Endings', buildEndings); });
    el['btn-title'].addEventListener('click', function () { showScreen('title'); refreshContinue(); });

    el.overlay.addEventListener('click', function (e) { if (e.target === el.overlay) closePanel(); });
    doc.addEventListener('keydown', onKey);
  }

  function init() {
    if (!Story) { console.error('[THE HUSH] story core failed to load.'); return; }
    cacheElements();
    wire();
    auditStory();
    updateEndingCount();
    refreshContinue();
    syncSoundButton();
    showScreen('title');
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

  root.Game = { goTo: function (id) { goTo(id); }, toast: toast, state: function () { return state; } };
})(typeof window !== 'undefined' ? window : globalThis, document);
