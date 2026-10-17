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
      role: 'veterinarian',
      blurb: 'Thirty years as a veterinarian, putting animals down gently and telling farmers the truth. Steady hands.'
    },
    bram: {
      name: 'Bram',
      full: 'Bram Kessler',
      role: 'corrections officer',
      blurb: 'Eleven years as a corrections officer. He keeps the count and the rations, and he wants to leave.'
    },
    wren: {
      name: 'Wren',
      full: 'Wren',
      role: 'fourteen',
      blurb: 'Hasn\u2019t made a sound since the third day. Writes on a pharmacy pad when she has to.'
    },
    teddy: {
      name: 'Teddy',
      full: 'Teodor Alafuzo',
      role: 'retired choirmaster',
      blurb: 'Seventy-one, with one working lung. His breathing is loud, and the sound carries.'
    }
  };

  /* ----------------------------------------------------------
     ITEMS
     ---------------------------------------------------------- */
  var ITEMS = {
    pills:    { name: 'amoxicillin',      desc: 'Four capsules left in a blister pack. Expired in March.' },
    gauze:    { name: 'field dressing',   desc: 'Sterile and still sealed in its wrapper.' },
    revolver: { name: 'revolver',         desc: 'Someone\u2019s service revolver. A shot will carry for blocks.' },
    bullets:  { name: 'bullet',           desc: 'Loose rounds for the revolver.' },
    cutters:  { name: 'bolt cutters',     desc: 'Three feet long and heavy. They will go through a padlock or a chain.' },
    radio:    { name: 'crank radio',      desc: 'It only ever finds one station, and that station only hums.' },
    photo:    { name: 'photo strip',      desc: 'Four frames from a photo booth at the county fair. June and me, blurred in the last one.' },
    lighter:  { name: 'lighter',          desc: 'Three-quarters full of butane. I check it every morning.' },
    knife:    { name: 'boning knife',     desc: 'Thin and flexible. Made for taking meat off the bone.' },
    flask:    { name: 'grain alcohol',    desc: 'Enough to drink, to clean a wound, or to start a fire, but only one of the three.' },
    badge:    { name: 'Mercy ID',         desc: 'An ID from St. Amaranth Mercy, on a cord.' },
    morphine: { name: 'morphine',         desc: 'One ampoule. Enough to ease bad pain, or to kill someone who is already very weak.' },
    saw:      { name: 'bone saw',         desc: 'A butcher\u2019s saw. Someone has cleaned it recently, and carefully.' },
    ledger:   { name: 'the Matron\u2019s ledger', desc: 'Nine hundred names in a neat hand, each with a date and a yield.' },
    vial:     { name: 'gray serum',       desc: 'It moves inside the vial even when I hold it still.' },
    tape:     { name: 'duct tape',        desc: 'Holds most things together, for an hour or so.' },
    keys:     { name: 'boat keys',        desc: 'A foam fob shaped like a fish, with LUCKY printed on it.' },
    tinned:   { name: 'can of soup',      desc: 'Soup from Marlowe House. It can be eaten cold, straight from the can.' }
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
      desc: 'Worn against my sternum since day nine, when my fingers got too thin to keep it on.'
    },
    padpage: {
      name: 'a torn page from a pharmacy pad',
      of: 'Wren',
      desc: 'Two lines in pencil. The word <em>i</em> underlined twice, hard enough to tear the paper.'
    },
    fork: {
      name: 'a tuning fork',
      of: 'Teddy',
      desc: 'An A440, worn smooth at the handle. Tap it on a knee and it still rings a clean A, so I keep it wrapped in a sock.'
    },
    facts: {
      name: 'nine facts in my handwriting',
      of: 'Bram\u2019s daughter',
      desc: 'Nine. Asthmatic. Frightened of the vacuum cleaner. I wrote them down so that someone besides her father would have them.'
    },
    dogphoto: {
      name: 'a photograph of a collie',
      of: 'the driver on Quay Road',
      desc: 'Mid-leap, catching something out of frame. It was taped to the truck\u2019s dashboard, in front of a driver who had killed himself in the first week.'
    },
    manifest: {
      name: 'a strip torn from a delivery manifest',
      of: 'April 11',
      desc: 'THEY ARE NOT MEAT. DO NOT OPEN. 4/11. Written on the day the Hush began.'
    },
    hairslide: {
      name: 'a child\u2019s barrette',
      of: 'one of the nine hundred',
      desc: 'Yellow enamel, in the shape of a duck. I took it from the chapel table, where every object had a label and had been lined up and dusted.'
    },
    gauzescrap: {
      name: 'a square of gauze, gone stiff',
      of: 'forty minutes under a truck',
      desc: 'Teddy bit through his lip rather than cough and give us away. I used the dressing to stop the bleeding. Neither of us mentioned it again.'
    },
    label: {
      name: 'a paper label in a neat hand',
      of: 'Dennis Holloway, and his last request',
      desc: 'HE ASKED THAT THESE GO TO HIS WIFE JEAN AT 14 ESTUARY VIEW. I HAVE NOT BEEN ABLE TO GET THERE. IF YOU CAN, PLEASE.'
    }
  };

  /* ----------------------------------------------------------
     STAT VOCABULARY — words, never numbers
     ---------------------------------------------------------- */
  var WORDS = {
    health: [
      [0,   'Dying'],
      [12,  'Failing'],
      [28,  'Badly hurt'],
      [45,  'Battered'],
      [62,  'Hurt'],
      [80,  'Sore'],
      [101, 'Whole']
    ],
    infection: [
      [1,   'Clean'],
      [14,  'Exposed'],
      [30,  'Low fever'],
      [48,  'Spreading'],
      [66,  'Humming in your bones'],
      [84,  'Mostly still you'],
      [101, 'Nearly turned']
    ],
    humanity: [
      [8,   'Hollow'],
      [22,  'Barely yourself'],
      [38,  'Cold'],
      [54,  'Hardened'],
      [70,  'Frayed'],
      [86,  'Still a person'],
      [101, 'Soft-hearted']
    ],
    trauma: [
      [18,  'Bearable'],
      [34,  'Heavy'],
      [52,  'Very heavy'],
      [70,  'Crushing'],
      [86,  'Numb'],
      [101, 'Shut down']
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
        { id: 'ring', day: 9, note: 'Most days I forget it\u2019s there. Then I reach for it and panic until my fingers find it.' }
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
