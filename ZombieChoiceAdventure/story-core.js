/* ============================================================
   THE HUSH — story core
   Registry, state model, stat vocabulary, items, cast.
   Classic script (no modules) so the game runs from file://
   ============================================================ */
(function (root) {
  'use strict';

  /* ----------------------------------------------------------
     CAST
     ---------------------------------------------------------- */
  var CAST = {
    odile: {
      name: 'Odile',
      full: 'Odile Marchetti',
      role: 'veterinary surgeon',
      blurb: 'Thirty years of putting animals down kindly. Steady hands. No illusions left to lose.'
    },
    bram: {
      name: 'Bram',
      full: 'Bram Kessler',
      role: 'corrections officer',
      blurb: 'Spent eleven years deciding who got to eat. He has not stopped deciding.'
    },
    wren: {
      name: 'Wren',
      full: 'Wren',
      role: 'fourteen',
      blurb: "Hasn't made a sound since the third day. Writes on a pharmacy pad when she must."
    },
    teddy: {
      name: 'Teddy',
      full: 'Teodor Alafuzo',
      role: 'one working lung',
      blurb: 'Seventy-one. Was a choirmaster. Now he is a sound that carries.'
    }
  };

  /* ----------------------------------------------------------
     ITEMS
     ---------------------------------------------------------- */
  var ITEMS = {
    pills:    { name: 'amoxicillin',      desc: 'Four capsules left in a foil strip. Expired in March.' },
    gauze:    { name: 'field dressing',   desc: 'Sterile, sealed, smells of nothing. A small miracle.' },
    revolver: { name: 'revolver',         desc: "Someone's service piece. Loud enough to end an argument and start six." },
    bullets:  { name: 'bullet',           desc: 'Brass, cold, finite.' },
    cutters:  { name: 'bolt cutters',     desc: 'Three feet of leverage. Heavy to carry, heavier to leave.' },
    radio:    { name: 'crank radio',      desc: 'It has only ever found one station, and that station only hums.' },
    photo:    { name: 'photo strip',      desc: 'Four frames in a booth at a county fair. June and me, blurred in the last one.' },
    lighter:  { name: 'lighter',          desc: 'Three quarters of a tank of butane. I check it every morning.' },
    knife:    { name: 'boning knife',     desc: 'Thin, flexible, made for getting between things.' },
    flask:    { name: 'grain alcohol',    desc: 'Disinfectant. Anaesthetic. Accelerant. Courage. Pick one, it only works once.' },
    badge:    { name: 'Mercy badge',      desc: 'ST AMARANTH MERCY — WARD STAFF. The photograph has been scraped off.' },
    morphine: { name: 'morphine',         desc: 'One ampoule. Enough to stop pain, or everything, depending on the hand.' },
    saw:      { name: 'bone saw',         desc: 'Hospital steel. It has been cleaned, which is somehow worse.' },
    ledger:   { name: "the Matron's ledger", desc: 'Nine hundred names in a neat hand, each with a date and a yield.' },
    vial:     { name: 'grey serum',       desc: 'It is not still. It is never quite still.' },
    tape:     { name: 'duct tape',        desc: 'Holds a world together for about an hour at a time.' },
    keys:     { name: 'boat keys',        desc: 'A foam fob shaped like a fish. Says LUCKY on it.' }
  };

  /* ----------------------------------------------------------
     MEMENTOS
     Not inventory. Inventory is what you use. These are what you
     carry for no reason except that putting them down would be a
     kind of forgetting.
     ---------------------------------------------------------- */
  var MEMENTOS = {
    ring: {
      name: 'a wedding ring on a bootlace',
      of: 'June',
      desc: 'Worn against my sternum since day nine, when my hands got thin enough to lose it.'
    },
    padpage: {
      name: 'a torn page from a pharmacy pad',
      of: 'Wren',
      desc: 'Four lines in pencil. The word <em>i</em> underlined twice, hard enough to go through the paper.'
    },
    fork: {
      name: 'a tuning fork',
      of: 'Teddy',
      desc: 'A 440, worn smooth at the handle. Struck on a knee it still finds the note. That is the trouble with it.'
    },
    facts: {
      name: 'nine facts in my handwriting',
      of: "Bram's daughter",
      desc: 'Nine. Asthmatic. Frightened of the hoover. Written down so that one day somebody who is not her father will have them.'
    },
    dogphoto: {
      name: 'a photograph of a collie',
      of: 'the driver on Quay Road',
      desc: 'Mid-leap, catching something out of frame. Taped to a dash for six weeks above a man who had already decided.'
    },
    manifest: {
      name: 'a strip torn from a delivery manifest',
      of: 'the eleventh of April',
      desc: 'THEY ARE NOT MEAT. DO NOT OPEN. 11/4. Written on the day the Hush began.'
    },
    hairslide: {
      name: "a child's hair slide",
      of: 'one of the nine hundred',
      desc: 'Yellow enamel, shaped like a duck. Taken from a table where it had been labelled, squared off and dusted.'
    },
    gauzescrap: {
      name: 'a square of gauze, gone stiff',
      of: 'forty minutes under a lorry',
      desc: 'He bit through his own lip rather than cough and give us away. He never mentioned it. Neither did I.'
    },
    label: {
      name: 'a paper label in a neat hand',
      of: 'Dennis Holloway, and a promise',
      desc: 'HE ASKED THAT THESE GO TO HIS WIFE JEAN AT 14 ESTUARY VIEW. I HAVE NOT BEEN ABLE TO GET THERE. IF YOU CAN, PLEASE.'
    }
  };

  /* ----------------------------------------------------------
     STAT VOCABULARY — words, never numbers
     ---------------------------------------------------------- */
  var WORDS = {
    health: [
      [0,   'Finished'],
      [12,  'Failing'],
      [28,  'Coming apart'],
      [45,  'Badly used'],
      [62,  'Hurt'],
      [80,  'Sore'],
      [101, 'Whole']
    ],
    infection: [
      [1,   'Clean'],
      [14,  'A cut that itches'],
      [30,  'Fever, low and patient'],
      [48,  'Something moving under it'],
      [66,  'The hum, in the bone'],
      [84,  'Most of you is still yours'],
      [101, 'Nearly theirs']
    ],
    humanity: [
      [8,   'Hollow'],
      [22,  'Something wearing you'],
      [38,  'Cold all the way down'],
      [54,  'Hardened'],
      [70,  'Frayed, but yours'],
      [86,  'Still a person'],
      [101, 'Soft, and it shows']
    ],
    trauma: [
      [18,  'Bearable'],
      [34,  'Heavy'],
      [52,  'Grinding'],
      [70,  'Splintering'],
      [86,  'Somewhere else now'],
      [101, 'Not here at all']
    ]
  };

  function wordFor(stat, v) {
    var table = WORDS[stat];
    for (var i = 0; i < table.length; i++) if (v < table[i][0]) return table[i][1];
    return table[table.length - 1][1];
  }

  /* ----------------------------------------------------------
     STATE
     JSON-safe: only own enumerable properties are serialised,
     the API below lives on the prototype.
     ---------------------------------------------------------- */
  function defaults() {
    return {
      node: 'start',
      day: 41,
      health: 88,
      infection: 0,
      humanity: 72,
      trauma: 12,
      items: { pills: 4, gauze: 1, photo: 1, lighter: 1, radio: 1 },
      flags: {},
      people: {
        odile: { state: 'alive', trust: 55 },
        bram:  { state: 'alive', trust: 45 },
        wren:  { state: 'alive', trust: 60 },
        teddy: { state: 'alive', trust: 65 }
      },
      visits: {},
      log: [],
      route: null,
      deaths: [],
      choicesMade: 0,
      /* you have carried one thing since before any of this started */
      keepsakes: [
        { id: 'ring', day: 9, note: 'You have stopped noticing the weight of it, which is worse than losing it.' }
      ]
    };
  }

  function GameState(data) {
    var d = defaults();
    for (var k in d) if (Object.prototype.hasOwnProperty.call(d, k)) this[k] = d[k];
    if (data) for (var j in data) if (Object.prototype.hasOwnProperty.call(data, j)) this[j] = data[j];
  }

  var P = GameState.prototype;

  /* --- inventory --- */
  P.count = function (id) { return this.items[id] || 0; };
  P.has = function (id, n) { return this.count(id) >= (n || 1); };
  P.give = function (id, n) {
    n = (n === undefined) ? 1 : n;
    this.items[id] = this.count(id) + n;
    if (this.items[id] <= 0) delete this.items[id];
    return this;
  };
  P.take = function (id, n) {
    n = (n === undefined) ? 1 : n;
    var have = this.count(id);
    this.items[id] = Math.max(0, have - n);
    if (this.items[id] === 0) delete this.items[id];
    return this;
  };

  /* --- people --- */
  P.who = function (id) { return this.people[id]; };
  P.alive = function (id) { return this.people[id] && this.people[id].state !== 'dead' && this.people[id].state !== 'gone'; };
  P.dead = function (id) { return this.people[id] && this.people[id].state === 'dead'; };
  P.hereWith = function (id) { return this.alive(id); };
  P.kill = function (id, how) {
    if (!this.people[id] || this.people[id].state === 'dead') return this;
    this.people[id].state = 'dead';
    this.people[id].how = how || '';
    this.deaths.push({ id: id, how: how || '', day: this.day });
    return this;
  };
  P.part = function (id, how) {
    if (!this.people[id] || this.people[id].state === 'dead') return this;
    this.people[id].state = 'gone';
    this.people[id].how = how || '';
    return this;
  };
  P.wound = function (id) { if (this.alive(id)) this.people[id].state = 'hurt'; return this; };
  P.mend = function (id) { if (this.people[id] && this.people[id].state === 'hurt') this.people[id].state = 'alive'; return this; };
  P.trust = function (id, delta) {
    if (!this.people[id]) return this;
    this.people[id].trust = Math.max(0, Math.min(100, this.people[id].trust + delta));
    return this;
  };
  P.party = function () {
    var out = [], k;
    for (k in this.people) if (this.alive(k)) out.push(k);
    return out;
  };
  P.partyCount = function () { return this.party().length; };

  /* --- mementos ---
     keep() is deliberately idempotent: you cannot pick a thing up twice,
     and the day it was taken is fixed the first time. */
  P.keep = function (id, note) {
    if (!MEMENTOS[id] || this.kept(id)) return this;
    this.keepsakes.push({ id: id, day: this.day, note: note || '' });
    return this;
  };
  P.kept = function (id) {
    for (var i = 0; i < this.keepsakes.length; i++) {
      if (this.keepsakes[i].id === id) return true;
    }
    return false;
  };
  P.drop = function (id) {
    for (var i = 0; i < this.keepsakes.length; i++) {
      if (this.keepsakes[i].id === id) { this.keepsakes.splice(i, 1); return this; }
    }
    return this;
  };
  P.keptCount = function () { return this.keepsakes.length; };
  /* resolved for display: the carried record joined to the registry */
  P.carried = function () {
    var out = [];
    for (var i = 0; i < this.keepsakes.length; i++) {
      var k = this.keepsakes[i], def = MEMENTOS[k.id];
      if (!def) continue;
      out.push({ id: k.id, day: k.day, note: k.note, name: def.name, of: def.of, desc: def.desc });
    }
    return out;
  };

  /* --- flags --- */
  P.flag = function (k) { return !!this.flags[k]; };
  P.val = function (k, dflt) { return (this.flags[k] === undefined) ? (dflt === undefined ? 0 : dflt) : this.flags[k]; };
  P.set = function (k, v) { this.flags[k] = (v === undefined) ? true : v; return this; };
  P.bump = function (k, n) { this.flags[k] = this.val(k) + (n === undefined ? 1 : n); return this; };

  /* --- stats --- */
  P.adj = function (stat, delta) {
    this[stat] = Math.max(0, Math.min(100, this[stat] + delta));
    return this;
  };
  P.hurt    = function (n) { return this.adj('health', -n); };
  P.heal    = function (n) { return this.adj('health', n); };
  P.infect  = function (n) {
    if (n > 0 && this.infection === 0 && this.flags.firstInfectionDay === undefined) {
      this.set('firstInfectionDay', this.day);
    }
    return this.adj('infection', n);
  };
  P.cure    = function (n) { return this.adj('infection', -n); };
  P.harden  = function (n) { return this.adj('humanity', -n); };
  P.soften  = function (n) { return this.adj('humanity', n); };
  P.scar    = function (n) { return this.adj('trauma', n); };
  P.ease    = function (n) { return this.adj('trauma', -n); };

  P.word = function (stat) { return wordFor(stat, this[stat]); };

  /* 0..5 — how far the blood has gone */
  P.stage = function () {
    var v = this.infection;
    if (v <= 0) return 0;
    if (v < 20) return 1;
    if (v < 40) return 2;
    if (v < 60) return 3;
    if (v < 80) return 4;
    return 5;
  };

  P.seen = function (id) { return (this.visits[id] || 0) > 0; };
  P.advance = function (n) { this.day += (n === undefined ? 1 : n); return this; };

  /* --- deterministic per-run randomness, so a reload never re-rolls --- */
  P.roll = function (key, n) {
    var seed = 0, s = String(key) + '|' + this.choicesMade;
    for (var i = 0; i < s.length; i++) { seed = (seed * 31 + s.charCodeAt(i)) >>> 0; }
    return seed % (n || 100);
  };

  /* ----------------------------------------------------------
     REGISTRY
     ---------------------------------------------------------- */
  var Story = {
    nodes: {},
    endings: {},
    order: [],
    endingOrder: [],
    CAST: CAST,
    ITEMS: ITEMS,
    MEMENTOS: MEMENTOS,
    WORDS: WORDS,
    wordFor: wordFor,
    GameState: GameState,
    START: 'start',

    add: function (node) {
      if (!node || !node.id) throw new Error('Story.add: node needs an id');
      if (this.nodes[node.id]) throw new Error('Story.add: duplicate node id "' + node.id + '"');
      this.nodes[node.id] = node;
      this.order.push(node.id);
      return node;
    },

    /* convenience: register many at once */
    addAll: function (list) {
      for (var i = 0; i < list.length; i++) this.add(list[i]);
      return this;
    },

    ending: function (e) {
      if (!e || !e.id) throw new Error('Story.ending: needs an id');
      if (this.endings[e.id]) throw new Error('Story.ending: duplicate ending id "' + e.id + '"');
      this.endings[e.id] = e;
      this.endingOrder.push(e.id);
      // every ending is also a node you can be sent to
      this.add({
        id: e.id,
        chapter: e.chapter || 'The end of it',
        place: e.place || '',
        isEnding: true,
        enter: e.enter || null,
        text: e.text,
        choices: []
      });
      return e;
    },

    get: function (id) { return this.nodes[id]; },
    has: function (id) { return !!this.nodes[id]; },

    /* resolve node text/choices which may be arrays or functions */
    textOf: function (node, s) {
      var t = (typeof node.text === 'function') ? node.text(s) : node.text;
      if (typeof t === 'string') t = [t];
      return node.dateEntry ? [{ c: 'dateline', t: 'Day ' + Math.floor(Number(s.day)) }].concat(t || []) : (t || []);
    },

    choicesOf: function (node) {
      return node.choices || [];
    }
  };

  root.Story = Story;
})(typeof window !== 'undefined' ? window : globalThis);
