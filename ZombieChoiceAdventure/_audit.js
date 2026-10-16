/* Story validation for THE HUSH. Run with node _audit.js or cscript //E:JScript _audit.js. */

if (typeof WScript === 'undefined') {
  var WScript = {
    Echo: function (message) { console.log(message); },
    Quit: function (code) { process.exit(code); }
  };
}

/* ---- ES5 polyfills for the JScript engine ---- */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (fn) { for (var i = 0; i < this.length; i++) fn(this[i], i, this); };
}
if (!Array.prototype.map) {
  Array.prototype.map = function (fn) { var o = []; for (var i = 0; i < this.length; i++) o.push(fn(this[i], i, this)); return o; };
}
if (!Array.prototype.filter) {
  Array.prototype.filter = function (fn) { var o = []; for (var i = 0; i < this.length; i++) if (fn(this[i], i, this)) o.push(this[i]); return o; };
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (v) { for (var i = 0; i < this.length; i++) if (this[i] === v) return i; return -1; };
}
if (!Object.keys) {
  Object.keys = function (o) { var k = []; for (var p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p); return k; };
}

function readFile(path) {
  if (typeof require === 'function') {
    return require('fs').readFileSync(path, 'utf8').replace(/^\uFEFF/, '');
  }
  var st = new ActiveXObject('ADODB.Stream');
  st.Type = 2; st.Charset = 'utf-8'; st.Open(); st.LoadFromFile(path);
  var s = st.ReadText(); st.Close();
  if (s.length && s.charCodeAt(0) === 0xFEFF) s = s.substring(1);
  return s;
}

var DIR = typeof require === 'function' ? __dirname + require('path').sep :
  WScript.ScriptFullName.replace(/\\[^\\]*$/, '\\');
var window = {};
var problems = [];
var files = ['story-core.js', 'story-act1.js', 'story-act2.js', 'story-act3.js', 'story-endings.js'];

for (var i = 0; i < files.length; i++) {
  try {
    eval(readFile(DIR + files[i]));
    WScript.Echo('  loaded  ' + files[i]);
  } catch (e) {
    WScript.Echo('  FAILED  ' + files[i] + '  ->  ' + e.message);
    problems.push('load ' + files[i] + ': ' + e.message);
  }
}

var Story = window.Story;
if (!Story) { WScript.Echo('FATAL: Story did not load.'); WScript.Quit(1); }

WScript.Echo('');
WScript.Echo('nodes: ' + Story.order.length + '   endings: ' + Story.endingOrder.length);
WScript.Echo('');

/* ---------- static audit: declared links and choice counts ---------- */
var dynamicTargets = 0;
for (var n = 0; n < Story.order.length; n++) {
  var id = Story.order[n];
  var node = Story.nodes[id];
  var ch = node.choices || [];
  if (!node.isEnding) {
    if (ch.length < 3) problems.push('node "' + id + '" declares only ' + ch.length + ' choices (min 3)');
    if (ch.length > 7) problems.push('node "' + id + '" declares ' + ch.length + ' choices (max 7)');
  }
  for (var c = 0; c < ch.length; c++) {
    var to = ch[c].to;
    if (typeof to === 'function') { dynamicTargets++; continue; }
    if (!to) problems.push('node "' + id + '" choice ' + (c + 1) + ' has no destination');
    else if (!Story.has(to)) problems.push('node "' + id + '" choice ' + (c + 1) + ' -> missing node "' + to + '"');
  }
}
WScript.Echo('dynamic destinations (checked by fuzz): ' + dynamicTargets);

/* ---------- static reachability ---------- */
var seenStatic = {}, queue = [Story.START];
seenStatic[Story.START] = true;
while (queue.length) {
  var cur = Story.nodes[queue.shift()];
  var cc = cur.choices || [];
  for (var q = 0; q < cc.length; q++) {
    var t = cc[q].to;
    if (typeof t === 'function' || !t || !Story.has(t)) continue;
    if (!seenStatic[t]) { seenStatic[t] = true; queue.push(t); }
  }
}
var orphans = [];
for (var o = 0; o < Story.order.length; o++) {
  if (!seenStatic[Story.order[o]]) orphans.push(Story.order[o]);
}

/* A passage may converge with another, but must never lead back to a passage
   the reader has already seen on this run. Dynamic final destinations are
   exercised by the walks below. */
var activePath = {}, finishedPath = {}, cycles = {};
function checkCycles(id) {
  activePath[id] = true;
  var choices = Story.get(id).choices || [];
  for (var ci = 0; ci < choices.length; ci++) {
    var next = choices[ci].to;
    if (typeof next !== 'string' || !Story.has(next)) continue;
    if (activePath[next]) cycles[id + ' -> ' + next] = true;
    else if (!finishedPath[next]) checkCycles(next);
  }
  delete activePath[id];
  finishedPath[id] = true;
}
checkCycles(Story.START);
for (var cycle in cycles) if (Object.prototype.hasOwnProperty.call(cycles, cycle)) {
  problems.push('repeatable story path: ' + cycle);
}

/* ---------- fuzz walk ---------- */
var endingsHit = {}, visited = {}, runtimeErrors = [], deadEnds = {}, countBad = {};
var mementosSeen = {};
var WALKS = 16000, completed = 0;

function rngFactory(seed) {
  var s = seed >>> 0;
  return function (n) { s = (s * 1103515245 + 12345) >>> 0; return (s >>> 8) % n; };
}

function deepCopy(v) {
  if (v === null || typeof v !== 'object') return v;
  if (v instanceof Array) { var a = []; for (var i = 0; i < v.length; i++) a.push(deepCopy(v[i])); return a; }
  var o = {};
  for (var k in v) if (Object.prototype.hasOwnProperty.call(v, k)) o[k] = deepCopy(v[k]);
  return o;
}
function cloneState(s) { return new Story.GameState(deepCopy(s)); }

/* lower is "more alone": being alive at all counts for far more than trust */
function companyScore(s) {
  var ids = ['odile', 'bram', 'wren', 'teddy'], t = 0;
  for (var i = 0; i < ids.length; i++) if (s.alive(ids[i])) t += 1000 + s.who(ids[i]).trust;
  return t;
}

var minPartyAtFinal = 99;

for (var w = 0; w < WALKS; w++) {
  var rnd = rngFactory(w * 2654435761 + 17);
  var strategy = w % 5;
  var s = new Story.GameState();
  var node = Story.get(Story.START);
  var steps = 0;
  var seenThisWalk = {};

  while (steps++ < 400) {
    if (seenThisWalk[node.id]) {
      runtimeErrors.push('revisited "' + node.id + '" in a single run');
      break;
    }
    seenThisWalk[node.id] = true;
    visited[node.id] = true;
    for (var mk = 0; mk < s.keepsakes.length; mk++) mementosSeen[s.keepsakes[mk].id] = true;
    if (node.id === 'a3_final' && s.partyCount() < minPartyAtFinal) minPartyAtFinal = s.partyCount();

    try { Story.textOf(node, s); }
    catch (e) { runtimeErrors.push('text of "' + node.id + '": ' + e.message); break; }

    if (node.isEnding) { endingsHit[node.id] = (endingsHit[node.id] || 0) + 1; completed++; break; }

    var raw = node.choices || [], shown = [];
    var errored = false;
    for (var k = 0; k < raw.length; k++) {
      var def = raw[k], vis = true;
      try { if (typeof def.show === 'function') vis = !!def.show(s); }
      catch (e2) { runtimeErrors.push('show in "' + node.id + '" #' + (k + 1) + ': ' + e2.message); errored = true; break; }
      if (!vis) continue;
      var open = true;
      try { if (typeof def.when === 'function') open = !!def.when(s); }
      catch (e3) { runtimeErrors.push('when in "' + node.id + '" #' + (k + 1) + ': ' + e3.message); errored = true; break; }
      try { if (typeof def.label === 'function') def.label(s); }
      catch (e6) { runtimeErrors.push('label in "' + node.id + '" #' + (k + 1) + ': ' + e6.message); errored = true; break; }
      shown.push({ def: def, open: open });
    }
    if (errored) break;

    if (shown.length < 3) countBad['"' + node.id + '" showed ' + shown.length + ' (min 3)'] = true;
    if (shown.length > 7) countBad['"' + node.id + '" showed ' + shown.length + ' (max 7)'] = true;

    var openList = shown.filter(function (x) { return x.open; });
    if (!openList.length) { deadEnds[node.id] = true; break; }

    /* strategy 0 = random, 1 = prefer cruel, 2 = prefer kind — real players do all three */
    var pool = openList;
    if (strategy === 1 || strategy === 3) {
      /* committed cruelty: always take it when offered */
      var cruel = openList.filter(function (x) { return x.def.tone === 'cruel'; });
      if (cruel.length) pool = cruel;
    } else if (strategy === 2) {
      var kind = openList.filter(function (x) { return x.def.tone === 'kind'; });
      if (kind.length && rnd(10) < 8) pool = kind;
    } else if (strategy === 4) {
      /* greedily drive everyone away, and take the dynamic exit when it appears */
      var dyn = openList.filter(function (x) { return typeof x.def.to === 'function'; });
      if (dyn.length) {
        pool = dyn;
      } else {
        var best = null, bestScore = 1e9;
        for (var g = 0; g < openList.length; g++) {
          var probe = cloneState(s);
          try { if (typeof openList[g].def['act'] === 'function') openList[g].def['act'](probe); }
          catch (eg) { continue; }
          var sc = companyScore(probe);
          /* tie-break towards knowing about the boat, so the exit is available later */
          if (probe.flag('knowsBoat') || probe.flag('headingForTheBoat')) sc -= 1;
          if (sc < bestScore) { bestScore = sc; best = openList[g]; }
        }
        if (best) pool = [best];
      }
    }
    var pick = pool[rnd(pool.length)].def;
    s.choicesMade++;
    try { if (typeof pick['act'] === 'function') pick['act'](s); }
    catch (e4) { runtimeErrors.push('act in "' + node.id + '": ' + e4.message); break; }

    /* mirror the engine's infection creep so the fuzz matches real play */
    if (s.infection > 0 && s.infection < 100 && !s.flag('arrested')) {
      s.bump('_creep');
      if (s.val('_creep') % 2 === 0) s.infect(1 + Math.floor(s.infection / 34));
    }

    var dest;
    try { dest = (typeof pick.to === 'function') ? pick.to(s) : pick.to; }
    catch (e5) { runtimeErrors.push('to() in "' + node.id + '": ' + e5.message); break; }

    if (s.health <= 0 && Story.has('end_body_failed')) dest = 'end_body_failed';
    else if (s.infection >= 100 && Story.has('end_turned')) dest = 'end_turned';

    if (!dest || !Story.has(dest)) {
      problems.push('runtime: "' + node.id + '" -> missing node "' + dest + '"');
      break;
    }
    s.node = dest;
    s.visits[dest] = (s.visits[dest] || 0) + 1;
    node = Story.get(dest);
    try { if (typeof node.enter === 'function') node.enter(s); }
    catch (e7) { runtimeErrors.push('enter of "' + node.id + '": ' + e7.message); break; }
  }
}

/* ---------- report ---------- */
function uniq(arr) {
  var out = [], seen = {};
  for (var i = 0; i < arr.length; i++) if (!seen[arr[i]]) { seen[arr[i]] = true; out.push(arr[i]); }
  return out;
}

WScript.Echo('fuzz: ' + WALKS + ' walks, ' + completed + ' reached an ending');
WScript.Echo('');

WScript.Echo('--- endings reached ---');
var missingEndings = [];
for (var e2 = 0; e2 < Story.endingOrder.length; e2++) {
  var eid = Story.endingOrder[e2];
  var hits = endingsHit[eid] || 0;
  WScript.Echo('  ' + (hits ? 'yes' : 'NO ') + '  ' + eid + '  (' + hits + ')');
  if (!hits) missingEndings.push(eid);
}

var unvisited = [];
for (var v = 0; v < Story.order.length; v++) if (!visited[Story.order[v]]) unvisited.push(Story.order[v]);

WScript.Echo('');
WScript.Echo('--- issues ---');
var deadList = Object.keys(deadEnds), countList = Object.keys(countBad);
var errList = uniq(runtimeErrors), probList = uniq(problems);

function dump(title, list) {
  if (!list.length) { WScript.Echo('  none: ' + title); return; }
  WScript.Echo('  ' + title + ' (' + list.length + '):');
  for (var i = 0; i < list.length && i < 40; i++) WScript.Echo('     - ' + list[i]);
}
dump('structural problems', probList);
dump('runtime errors', errList);
dump('dead ends (no selectable choice)', deadList);
dump('choice-count violations at runtime', countList);
/* a node is only truly unreachable if no static link AND the fuzz never got there
   (dynamic to() targets and the engine's auto-endings are invisible to static analysis) */
var trulyUnreachable = orphans.filter(function (id) { return !visited[id]; });
var reachedDynamically = orphans.filter(function (id) { return visited[id]; });

dump('unreachable nodes', trulyUnreachable);
WScript.Echo('  (reached only via dynamic/auto transitions, which is fine: ' +
  (reachedDynamically.length ? reachedDynamically.join(', ') : 'none') + ')');
dump('never visited during fuzz', unvisited);
dump('endings never reached', missingEndings);

/* every memento in the registry must be obtainable somewhere in the graph */
var mementoIds = Object.keys(Story.MEMENTOS || {});
var unobtainable = mementoIds.filter(function (id) { return !mementosSeen[id]; });
WScript.Echo('');
WScript.Echo('--- mementos ---');
for (var mi = 0; mi < mementoIds.length; mi++) {
  WScript.Echo('  ' + (mementosSeen[mementoIds[mi]] ? 'yes' : 'NO ') + '  ' + mementoIds[mi]);
}
dump('mementos never obtainable', unobtainable);

/* ---------- targeted checks on the branching logic ---------- */
WScript.Echo('');
WScript.Echo('--- targeted checks ---');
WScript.Echo('  smallest party seen at a3_final: ' + (minPartyAtFinal === 99 ? 'n/a' : minPartyAtFinal));

var targeted = [];
function expect(label, actual, wanted) {
  var ok = (actual === wanted);
  WScript.Echo('  ' + (ok ? 'pass' : 'FAIL') + '  ' + label + '  (got "' + actual + '")');
  if (!ok) targeted.push(label + ': expected "' + wanted + '", got "' + actual + '"');
}

var fin = Story.get('a3_final'), boat = null;
for (var bi = 0; bi < fin.choices.length; bi++) {
  if (typeof fin.choices[bi].to === 'function') boat = fin.choices[bi];
}
if (!boat) {
  targeted.push('a3_final has no dynamic boat choice');
  WScript.Echo('  FAIL  a3_final has no dynamic boat choice');
} else {
  var sAlone = new Story.GameState();
  sAlone.part('odile'); sAlone.part('bram'); sAlone.part('wren'); sAlone.part('teddy');
  sAlone.set('knowsBoat');
  expect('nobody left -> end_boat_alone', boat.to(sAlone), 'end_boat_alone');
  expect('boat choice visible with knowsBoat', String(boat.show(sAlone)), 'true');

  var sTog = new Story.GameState();
  sTog.part('teddy');
  expect('companions alive -> slipway decision', boat.to(sTog), 'a3_boat_who');

  /* the slipway is the only way end_boat_alone can be chosen rather than defaulted into */
  var slip = Story.get('a3_boat_who');
  if (!slip) {
    targeted.push('a3_boat_who is missing');
    WScript.Echo('  FAIL  a3_boat_who is missing');
  } else {
    var cruel = null;
    for (var ci = 0; ci < slip.choices.length; ci++) {
      if (slip.choices[ci].tone === 'cruel') cruel = slip.choices[ci];
    }
    if (!cruel) {
      targeted.push('a3_boat_who has no cast-off-alone choice');
      WScript.Echo('  FAIL  a3_boat_who has no cast-off-alone choice');
    } else {
      expect('slipway cruel choice -> end_boat_alone', cruel.to, 'end_boat_alone');
      var sSlip = new Story.GameState();
      cruel['act'](sSlip);
      expect('casting off alone empties the party', String(sSlip.partyCount()), '0');
    }
  }

  var sComp = new Story.GameState();
  sComp.set('theCompact');
  expect('teddy + compact -> end_mercy_teddy', boat.to(sComp), 'end_mercy_teddy');

  var sNoBoat = new Story.GameState();
  expect('boat choice hidden without knowsBoat', String(boat.show(sNoBoat)), 'false');
}

/* companions you have alienated should actually leave at the last node */
var sTrust = new Story.GameState();
sTrust.people.odile.trust = 5; sTrust.people.bram.trust = 5; sTrust.people.wren.trust = 5;
sTrust.set('atTheMercy');
fin.enter(sTrust);
expect('alienated companions depart at a3_final', String(sTrust.partyCount()), '1');

var sLoyal = new Story.GameState();
sLoyal.set('atTheMercy');
fin.enter(sLoyal);
expect('loyal companions stay at a3_final', String(sLoyal.partyCount()), '4');

/* a3_final must always offer a legal number of choices, even with nothing in your pockets */
var sBare = new Story.GameState();
sBare.set('atTheMercy');
sBare.take('lighter'); sBare.part('wren'); sBare.part('odile'); sBare.part('bram'); sBare.part('teddy');
var shownBare = 0;
for (var fb = 0; fb < fin.choices.length; fb++) {
  var d = fin.choices[fb];
  if (typeof d.show === 'function' && !d.show(sBare)) continue;
  shownBare++;
}
WScript.Echo('  ' + (shownBare >= 3 ? 'pass' : 'FAIL') + '  worst-case a3_final shows ' + shownBare + ' choices (min 3)');
if (shownBare < 3) targeted.push('a3_final worst case shows only ' + shownBare + ' choices');

var sResume = new Story.GameState();
var night = Story.get('a2_boat_lastnight');
night.enter(sResume);
var nightDay = sResume.day;
night.enter(sResume);
expect('continuing the last boat night does not advance again', String(sResume.day), String(nightDay));

var source = Story.get('a3_treatment_source');
source.enter(sResume);
var sourceTrauma = sResume.trauma;
source.enter(sResume);
expect('continuing the ward visit does not scar again', String(sResume.trauma), String(sourceTrauma));

var keys = Story.get('a3_refuse_keys');
keys.enter(sResume);
keys.enter(sResume);
expect('continuing after finding the keys does not duplicate them', String(sResume.count('keys')), '1');

var sLate = new Story.GameState();
sLate.infect(8);
sLate.advance(5);
Story.get('a3_triage').enter(sLate);
expect('delayed triage acknowledges late infection',
  String(Story.textOf(Story.get('a3_triage'), sLate).join(' ').indexOf('Beyond four days') >= 0), 'true');
expect('first exposure day survives the delay', String(sLate.val('firstInfectionDay')), '41');

var sFire = new Story.GameState();
var fireChoice = Story.get('a2_lorry_open').choices[1];
expect('burning the lorry needs accelerant', String(fireChoice.show(sFire)), 'false');
sFire.give('flask');
expect('burning the lorry is available with both supplies', String(fireChoice.show(sFire)), 'true');

var sBoat = new Story.GameState();
Story.get('a2_boat_hold').enter(sBoat);
night.enter(sBoat);
Story.get('a2_mercy_approach').enter(sBoat);
expect('extra night advances chronology', String(sBoat.day), '45');
expect('arrival recalls all three boat days',
  String(Story.textOf(Story.get('a2_mercy_approach'), sBoat).join(' ').indexOf('three days') >= 0), 'true');
expect('boat wait opens a Teddy-specific arrival choice',
  String(Story.get('a2_mercy_approach').choices[5].show(sBoat)), 'true');
var sEstate = new Story.GameState();
sEstate.set('tookFromTheChildren');
expect('estate route opens a distinct confession',
  String(Story.get('a2_mercy_approach').choices[6].show(sEstate)), 'true');
expect('estate route recalls the children in the final decision',
  String(Story.textOf(fin, sEstate).join(' ').indexOf('six children') >= 0), 'true');

WScript.Echo('');
var total = probList.length + errList.length + deadList.length + countList.length +
            trulyUnreachable.length + missingEndings.length + targeted.length +
            unobtainable.length;
WScript.Echo(total === 0 ? 'RESULT: clean' : 'RESULT: ' + total + ' issue(s)');
if (total > 0) WScript.Quit(1);
