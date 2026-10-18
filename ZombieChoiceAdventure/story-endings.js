/* ============================================================
   THE HUSH — endings
   Twelve ways out. None of them clean.
   ============================================================ */
(function () {
  'use strict';
  var S = window.Story;

  /* ---------------------------------------------------------- helpers */
  var NUM = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  var SUBJ = { odile: 'she', wren: 'she', bram: 'he', teddy: 'he' };
  var OBJ = { odile: 'her', wren: 'her', bram: 'him', teddy: 'him' };

  function num(n) { return (n >= 0 && n < NUM.length) ? NUM[n] : String(n); }

  /* "A", "A and B", "A, B, and C" */
  function listOf(a) {
    if (a.length < 2) return a.join('');
    if (a.length === 2) return a[0] + ' and ' + a[1];
    return a.slice(0, -1).join(', ') + ', and ' + a[a.length - 1];
  }

  function survivors(s) {
    return s.party().map(function (id) { return S.CAST[id].name; });
  }

  function dayOf(s) { return Math.floor(Number(s.day)); }

  /* the treatment scene introduces her even when the office talk never happened */
  function metMatron(s) { return s.flag('metTheMatron') || s.flag('tookTheTreatment'); }

  /* heardNineWeeks is set by Act 3; the node checks cover saves from before it existed */
  function knowsNineWeeks(s) {
    return s.flag('heardNineWeeks') || s.flag('readTheLastPage') ||
      s.seen('a3_matron_refuse') || s.seen('a3_lastpage');
  }

  function knowsCure(s) {
    return s.flag('sawTheSerum') || s.flag('metTheMatron') || s.flag('tookTheTreatment') ||
      s.flag('knowsTreatmentExists') || s.seen('a1_teddy_something');
  }

  function knowsDaughter(s) {
    return s.seen('a1_bram_carry') || s.seen('a1_bram_sayit') || s.seen('a1_bram_daughter');
  }

  /* a3_boat_who already narrates finding LUCKY II and putting the key in */
  function boatFound(s) { return s.flag('knowsBoat') || s.flag('atTheSlip'); }

  /* a3_holloway_end leaves ninety-three in the ward, unless the attempt failed */
  function wardCount(s) { return s.flag('endedHolloway') ? 'ninety-three' : 'ninety-four'; }

  /* went in alone and never brought the others inside: they are waiting on the avenue */
  function othersAway(s) {
    return s.flag('wentInAlone') && !s.flag('wasTriaged') && !s.flag('refusedTheMercy');
  }

  /* Act 2's daylight test: a dawn departure reached the hospital by day. If nobody slept
     there, everything after is the same afternoon and evening, so departures fall at dusk. */
  function byDay(s) {
    return (s.flag('waited') || s.flag('satWithHim')) && !s.flag('heldAtTheBoat') && !s.flag('wasTriaged');
  }

  function bramSeesBadly(s) { return s.flag('bramEye') && s.alive('bram'); }

  /* ---------------------------------------------------------- 1 */
  S.ending({
    id: 'end_burn',
    title: 'Everything That Was Left',
    kicker: 'An ending \u00b7 fire',
    tag: 'THE FIRE',
    blurb: 'I burned St. Amaranth Mercy with its patients still in their beds. The smoke hung over the county for two days.',
    tease: 'Somewhere in this county, a generator still has a full tank of diesel.',
    place: 'Sexton\u2019s Field',
    text: function (s) {
      var names = survivors(s);
      var lines = [];
      lines.push((s.flag('headingForTheBoat') ? 'I go back up the hill in the dark. '
        : (s.flag('refusedTheMercy') ? 'I go back up the avenue in the dark. ' : '')) +
        'The generator is behind the kitchens, with a hundred gallons of diesel in a double-walled tank. ' +
        'A hospital is a building full of oxygen tanks. I don\u2019t have to be clever about ' +
        'any of it.');
      if (names.length) {
        lines.push('I get ' + listOf(names) + ' out to Sexton\u2019s Field first.');
      }
      if (!s.flag('cameInTheBack')) {
        lines.push('By the east-wing doors there is a whiteboard: WARD 11 \u00b7 OCCUPANCY 94/96. ' +
          'I read it on my way in with the first can.');
      }
      if (s.flag('allyKnowsBurn')) {
        lines.push('The woman with the sponge does the east-wing doors herself. First she does the ' +
          'mouths one last time, all ' + wardCount(s) + '. It takes her two hours and eleven minutes, and ' +
          'nobody hurries her. When she comes out, she nods once and doesn\u2019t look back.');
      } else {
        lines.push('Nobody stops me. Forty members of staff watch a stranger carry cans of diesel into ' +
          'the east wing, and not one of them puts out a hand. I think they have all been waiting ' +
          'for somebody from outside to make the decision for them.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It catches at ten after five. From Sexton\u2019s Field I see the first window go, ' +
        'then the others, one after another along the east wing.');
      lines.push(s.seen('a2_burn_lorry')
        ? 'For about ninety seconds, over the roar, I can hear ' + wardCount(s) + ' people holding the note ' +
          'and then climbing the scale together, exactly as the truck on Quay Road did.'
        : 'For about ninety seconds, over the roar, I can hear ' + wardCount(s) + ' people holding the note ' +
          'the way the truck on Quay Road did, then climbing the scale together.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      var loss = '';
      if (s.flag('sawTheSerum') || s.seen('a3_matron_eight')) {
        var left = 9 - s.count('vial') - (s.flag('tookTheTreatment') ? 1 : 0);
        if (left < 1) left = 1;
        loss = left === 1
          ? ', and the last dose of the only cure there is going with it'
          : ', and the last ' + num(left) + ' doses of the only cure there is going with it';
      } else if (knowsCure(s)) {
        loss = ', and whatever was left of their cure going with it';
      }
      lines.push('Then the roof comes down into the ward, and the note stops. I am standing in a cold ' +
        'field at dawn, watching the only light in the county go out' + loss + '.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (knowsNineWeeks(s)) {
        lines.push((s.flag('readTheLastPage')
          ? 'The Matron wrote it on her last page: nine weeks, whatever anyone did. '
          : 'The Matron told me the yield had nine weeks left in it, at the outside. ') +
          'By her numbers, I burned nine weeks of the cure, not years of it. ' +
          'I remind myself of that more often than I\u2019d like.');
      } else if (knowsCure(s)) {
        lines.push('I never found out how long their cure had left. One more question would ' +
          'have told me, and I didn\u2019t ask it.');
      } else {
        lines.push('I never found out what that ward was for. I didn\u2019t ask anyone ' +
          'before I lit it.');
      }
      lines.push('Smoke hangs over the county for two days. People come up to the ridge to watch. ' +
        'I can\u2019t tell whether they know what was inside.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 2 */
  S.ending({
    id: 'end_matron',
    title: 'The Fourth Column',
    kicker: 'An ending \u00b7 the chair',
    tag: 'THE LEDGER KEEPER',
    blurb: 'I took the Matron\u2019s chair and kept the book. I wrote in the fourth column every night.',
    tease: 'Somebody has to sit in the Matron\u2019s chair and sign the forms.',
    place: "The Matron's office",
    text: function (s) {
      var lines = [];
      if (!metMatron(s)) {
        lines.push('I have never met the Matron. She is the head of nursing, about sixty-five, ' +
          'in a cardigan, and she runs this hospital. When I tell her what I have come for, ' +
          'she sits me down and explains what St. Amaranth Mercy does, all of it, in eleven minutes. ' +
          'Then she says yes.');
      }
      lines.push('She hands everything over in an afternoon: the keys, the card index, the duty roster, ' +
        'the consent forms, and the names of the four staff who will help me and the two who won\u2019t.');
      if (s.flag('burnedTheLedger')) {
        lines.push('I burned her ledger in this office, so she takes the copy out of the box file ' +
          'under her desk and opens it at the fourth column: WAS IT NECESSARY?');
      } else if (s.has('ledger')) {
        lines.push('I put her ledger back on the desk. She opens it at the fourth column, ' +
          'WAS IT NECESSARY?, and turns it to face me.');
      } else {
        lines.push('Last of all she gives me the ledger, open at the fourth column: ' +
          'WAS IT NECESSARY?');
      }
      lines.push('<span class="said">"You will want to change things," </span>she says. ' +
        '<span class="said">"Do. Most of it was put together in two weeks by a frightened woman. ' +
        'But keep up the mouth care. Whatever else goes, keep the mouths. And write in that column ' +
        'every night before you sleep. It is the only thing that helps."</span>');
      lines.push('She leaves the next morning with a bag and a cane and doesn\u2019t say where she is going. ' +
        'The kid on the gate cries, and she tells him not to be silly. ' +
        'I watch her walk down the lime avenue until the trees hide her.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I run St. Amaranth Mercy properly. In several ways that can be measured, I run it ' +
        'better than she did, and that has to go in here too: I was <em>good at it</em>.');
      lines.push('Her figures gave the yield nine weeks. I move the draws to the evening and get nine ' +
        'weeks and four days out of it. I get the rations fair. I stop converting volunteers on the ' +
        'eleventh day, and on the twenty-sixth, with a nine-year-old on a gurney and nothing left in ' +
        'the cold cabinet, I start again.');
      lines.push('I write in the fourth column every night before I sleep. She was right that it helps. ' +
        'She didn\u2019t mention that it also makes it easier to keep going.');
      if (s.alive('wren')) {
        lines.push({ c: 'sep', t: '\u2042' });
        if (s.flag('promisedTheDoor')) {
          lines.push('Wren leaves in the sixth week, without any fuss. ' +
            'She leaves her pad open on my desk.');
          lines.push({ c: 'pad', t: 'you said youd find me a door that locks from the inside' });
          lines.push({ c: 'pad', t: 'you found one. you just stood on the wrong side of it' });
        } else if (s.flag('wrenKnowsMercy')) {
          lines.push('Wren leaves in the sixth week, without any fuss. ' +
            'She leaves her pad open on my desk.');
          lines.push({ c: 'pad', t: 'you told me about this place at roscos' });
          lines.push({ c: 'pad', t: 'i thought it was the door' });
        } else {
          lines.push('Wren leaves in the sixth week, without any fuss. She doesn\u2019t leave a note.');
        }
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Early in the tenth week the yield gives out and the last vial is used. After that, ' +
        'St. Amaranth Mercy is a full ward, a generator, and forty of us who signed the forms.');
      lines.push('I keep the mouths. I keep them for a long time.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 3 */
  S.ending({
    id: 'end_ledger',
    title: 'Nine Hundred Names',
    kicker: 'An ending \u00b7 the record',
    tag: 'THE WITNESS',
    blurb: 'I carried the ledger out and spent years reading the names in it aloud, one town at a time.',
    tease: 'Nine hundred names in a neat hand, each with a date and a yield.',
    place: 'Old Cleveholt Road',
    text: function (s) {
      var lines = [];
      if (s.flag('burnedTheLedger')) {
        lines.push('Burning her ledger changed nothing. She had copied every page into a box file ' +
          'under her desk, and when I ask for it she gives it to me without a word.');
        lines.push('I take Old Cleveholt Road west at dawn with the box file under my arm. Nobody tries to stop me. ' +
          'I think the woman who wrote it has been waiting six weeks for someone to take it off her.');
      } else {
        lines.push((s.flag('foundTheOffice') ? '' :
          'I ask the Matron for her ledger, and she gives it to me without a word. ') +
          'I take Old Cleveholt Road west at dawn with four inches of hardback ledger inside my coat. ' +
          'Nobody tries to stop me. I think the woman who wrote it has been waiting six weeks ' +
          'for someone to take it off her.');
      }
      if (s.flag('tookTheEffects')) {
        lines.push('I take what was on the table in the Arimathea Chapel too: nine hundred-odd watches, rings, and ' +
          'hairclips in four pillowcases. They weigh more than the book.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push({ c: 'dateline', t: 'The following spring' });
      lines.push('It turns out the world doesn\u2019t end all at once. Pockets of it ' +
        'go on holding meetings.');
      lines.push('The first is in Cleveholt: two hundred people, a working mill, and a committee. ' +
        'In a church hall I read out forty-one names, with their dates and yields and what the ' +
        'fourth column says beside each one. A man near the back stands up and asks ' +
        'what every hall asks.');
      lines.push('<span class="said">"Did it work?"</span>');
      lines.push('I have to say yes. In every hall, every time, I say ' +
        '<em>yes, it worked</em>, and watch the room work out what that means.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Three of the settlements vote to build one of their own.');
      lines.push('I stop two of them. The third time I am sixty miles away and don\u2019t ' +
        'hear about it until the fall, by which time there is a ward in a converted school ' +
        'with eleven beds in it and a woman doing mouth care.');
      lines.push('The book hasn\u2019t stopped anyone. What it has done is get the names read out loud, ' +
        'in front of people who would rather not hear them. It took me four years to decide ' +
        'that was worth the walking.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 4 */
  S.ending({
    id: 'end_boat_together',
    title: 'The Water Is A Wall',
    kicker: 'An ending \u00b7 the tide',
    tag: 'OUT ON THE TIDE',
    blurb: 'I got the others onto the boat, and we went out on the tide.',
    tease: 'They stop at the water\u2019s edge. A boat could carry everyone past them.',
    place: 'LUCKY II',
    text: function (s) {
      var names = survivors(s);
      var lines = [];
      if (!boatFound(s)) {
        lines.push('Downriver, the keys led me to a sailing club, and to LUCKY II ' +
          'tied up on the slip.');
      }
      var dusk = byDay(s);
      lines.push('I turn the key. The forty-year-old diesel catches on the fourth try, and across ' +
        'the water at ' + (dusk ? 'six in the evening' : 'five in the morning') +
        ' it is the loudest thing I have heard in weeks, and the best.');
      var edge = s.seen('a2_ask') ? ', as Wren said they would,'
        : (s.flag('tookRiver') ? ', as they did along the Sallow Walk,' : ',');
      lines.push('Both banks fill up. Hundreds of them come out of the reeds and the boatyards and ' +
        'down the slipway. They wade in shin-deep and stop' + edge + ' facing us, holding the note ' +
        'as we go past.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('The note follows us for two miles. It is the last I hear of the town.');
      if (names.length) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('There are ' + num(names.length + 1) + ' of us on a twenty-six-foot boat: ' +
          listOf(names.concat(['me'])) + '.');
      }
      if (s.alive('teddy')) {
        lines.push('Teddy sleeps in the cabin most of the way out, wrapped in a blanket. His breathing ' +
          'is as loud as it ever was, and nothing on either bank can reach him.');
      }
      if (s.alive('wren')) {
        lines.push('Wren sits in the bow the whole way out with her face into the wind. ' +
          'About a mile past the harbor wall she turns around and says something out loud.');
        lines.push((s.flag('wrenSpoke')
          ? 'She hasn\u2019t used her voice since Quay Road. '
          : 'It is the first sound I have ever heard her make. ') +
          'It is cracked and rough and about four words long, and the engine is too loud for me ' +
          'to catch any of them. She won\u2019t repeat it, then or since.');
        if (s.flag('wrenKnowsMercy')) {
          lines.push('At Rosco\u2019s I told her about a hospital that takes in all who come. ' +
            'She doesn\u2019t look back at the hill once.');
        }
      }
      if (s.alive('odile')) {
        lines.push('Odile finds a half bottle of supermarket ros\u00e9 in the galley locker ' +
          'and opens it ' + (dusk ? 'as the sun goes down' : 'at six in the morning') +
          '. She sets out an enamel mug for everyone aboard.');
      }
      if (s.alive('bram')) {
        if (bramSeesBadly(s)) {
          lines.push('Bram keeps watch from the stern' +
            (s.flag('bramEyeTreated') ? ', with Dr. Aytoun\u2019s dressing taped over one eye,' : '') +
            ' and twice asks me what is moving on the left bank.');
        }
        lines.push('Bram asks once about the road east to Thornbury' +
          (knowsDaughter(s) ? '' : ', where his daughter is') +
          '. Then he looks at the water and doesn\u2019t ask again that day. He asks again a week ' +
          'later. I will go with him. Not yet, but I will.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push((dusk
        ? 'The estuary opens out at about eight, and the light over the sea goes the orange ' +
          'of any ordinary evening. '
        : 'The estuary opens out at about seven, and the sky over the sea turns the pink ' +
          'of any ordinary morning. ') +
        'The fuel gauge reads three-quarters of a tank, which is enough to get somewhere. ' +
        'Nobody on this boat knows where, and for the first time since the Hush ' +
        'that is a <em>pleasant</em> thing not to know.');
      lines.push('Once the banks are out of sight, the hum is gone. All I can hear is water ' +
        'against the hull, the engine, and the people aboard letting out their breath.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 5 */
  S.ending({
    id: 'end_boat_alone',
    title: 'Three Quarters Of A Tank',
    kicker: 'An ending \u00b7 the tide',
    tag: 'ALONE ON THE WATER',
    blurb: 'I made it onto the water. Nobody came with me.',
    tease: 'You could take the boat out alone.',
    place: 'LUCKY II',
    text: function (s) {
      var lines = [];
      var ids = ['teddy', 'odile', 'bram', 'wren'];
      var losses = [], walked = [], slip = [], slipIds = [];
      for (var i = 0; i < ids.length; i++) {
        var id = ids[i], name = S.CAST[id].name;
        if (s.alive(id)) continue;
        if (s.dead(id)) {
          if (id === 'teddy' && s.seen('a1_smother')) {
            losses.push(s.flag('byMyHand')
              ? 'Teddy died there, by my hand.'
              : 'Teddy died there, by Odile\u2019s hand.');
          } else {
            losses.push(name + ' died on the way.');
          }
        } else if (id === 'teddy' && s.seen('a1_leave_teddy')) {
          losses.push('I left Teddy there with the revolver.');
        } else if (s.flag('left_' + id)) {
          walked.push(name);
        } else if (s.flag('castOffAlone')) {
          slip.push(name); slipIds.push(id);
        } else {
          losses.push(name + ' is gone.');
        }
      }
      if (walked.length) losses.push(listOf(walked) + ' walked away from me before the end.');
      if (slip.length) {
        losses.push(losses.length ? 'I left the rest on the slip.'
          : (slip.length === 4 ? 'I left the other four on the slip.' : 'I left ' + listOf(slip) + ' on the slip.'));
      }

      if (!boatFound(s)) {
        lines.push('I search the sailing club until I find LUCKY II, the name on her stern ' +
          'matching the foam fish on my fob.');
      }
      lines.push((s.flag('atTheSlip') ? 'I turn the key. ' : 'The key turns. ') +
        'The engine catches on the fourth try.');
      if (slip.length) {
        lines.push('I lift the rope off the cleat and open the throttle while ' + listOf(slip) +
          (slip.length === 1 ? ' is' : ' are') + ' still on the slip.' +
          (s.flag('castOffAlone') && slipIds.indexOf('wren') >= 0
            ? ' The last thing I see clearly is Wren holding up her pad, too far away to read.'
            : '') +
          ' I don\u2019t see what happens to ' + (slip.length === 1 ? OBJ[slipIds[0]] : 'them') +
          ' after that.');
      }
      lines.push(byDay(s)
        ? 'I take a twenty-six-foot cabin cruiser down a brown river at six in the evening, alone.'
        : 'I take a twenty-six-foot cabin cruiser down a black river at five in the morning, alone.');
      lines.push('Both banks fill up. They hold the note and stop at the waterline, and I pass ' +
        'close enough to see faces. There is nobody aboard whose hand I have to hold while it happens.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push(s.flag('foundBoat')
        ? 'There are two berths in the cabin. The water wing, the paperback, and the half bottle of ' +
          'ros\u00e9 are still in the locker where I first saw them.'
        : 'There are two berths in the cabin. In the locker: a child\u2019s water wing, ' +
          'a paperback swollen with damp, and a half bottle of supermarket ros\u00e9.');
      lines.push('I don\u2019t open the wine, that night or any night after.');
      lines.push('I\u2019m good at being alone. I didn\u2019t know that while there were other people ' +
        'to look after.');
      if (losses.length) {
        lines.push('There were five of us in the stockroom at Rosco\u2019s. ' + losses.join(' ') +
          ' I could tell anybody the order, the hour, what the weather was doing, and what I chose.');
      }
      if (s.has('photo')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Somewhere past the harbor wall I take out the photo strip: four frames from ' +
          'a booth at a county fair, June and me laughing in the first three and blurred in the last. ' +
          'I had half meant to drop it in the water. I don\u2019t.');
        lines.push('I say her name out loud over the engine, to no one. It is the first time ' +
          'in a long while, and there is nobody aboard to pretend not to hear.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The estuary opens at ' + (byDay(s) ? 'eight' : 'seven') +
        '. The fuel gauge reads three-quarters of a tank, ' +
        'which is enough to get somewhere.');
      lines.push('There is no hum out here, and there is nobody else either. ' +
        'After a few weeks I stop listening for either one.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 6 */
  S.ending({
    id: 'end_mercy_teddy',
    title: 'A Reason For Good Things',
    kicker: 'An ending \u00b7 the compact',
    tag: 'THE PROMISE KEPT',
    blurb: 'I took Teddy out on the boat. When he said it was time, I didn\u2019t argue.',
    tease: 'Teddy wants to be the one who decides when, and he wants nobody to argue.',
    place: 'LUCKY II',
    enter: function (s) { s.advance(1); },
    text: function (s) {
      var lines = [];
      if (!boatFound(s)) {
        lines.push('At the sailing club I find LUCKY II by the name on the fob, ' +
          'the fourth boat on the pontoon.');
      }
      lines.push('Teddy gets onto the boat under his own power on the morning of day ' + dayOf(s) +
        ', which ought not to be medically possible. He does it with one hand on the railing ' +
        'while I pretend not to watch.');
      lines.push('The engine catches on the fourth try. The banks fill up, hold the note, ' +
        'and stop at the water.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('He lasts six days. They are good days: no decisions in them, nothing to carry, ' +
        'and an engine doing the walking.');
      lines.push('On the fourth day he conducts. He sits in the cockpit with a blanket over his knees, ' +
        'both hands up and eyes shut, and works through something from memory for about four minutes, ' +
        'while I watch forty years of a man\u2019s life pass through an empty pair of hands.');
      if (s.alive('wren')) {
        lines.push('Wren hums for him under her breath, badly and off the note. ' +
          (s.flag('wrenSpoke')
            ? 'She hasn\u2019t used her voice since Quay Road. '
            : 'It is the first sound she has made on purpose since the third day. ') +
          'He doesn\u2019t stop or open his eyes. He brings her in with two fingers ' +
          'on the second bar, as he must once have done for nervous choristers, ' +
          'and carries on as if he had been expecting her.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('On the sixth evening he looks at me and says, ' +
        '<span class="said">"It is time, child."</span> I do not argue.');
      lines.push('That is the whole of the promise: <em>I do not argue</em>. ' +
        'I hold his hand and let a seventy-one-year-old man be the one who says so. ' +
        'It takes about an hour. It is quiet, and it is on the water, ' +
        'and nobody is coming for the sound of it.');
      if (s.alive('odile') && s.has('morphine')) {
        lines.push('I give Odile the ampoule from Rosco\u2019s. She asks him first. He says yes. ' +
          'She does it properly, and afterward she cries in the cabin, where she thinks nobody can ' +
          'hear. On a boat this size, I hear it anyway.');
      } else if (s.alive('odile') && s.flag('odileKeepsMorphine')) {
        lines.push('Odile has the ampoule from Rosco\u2019s. ' +
          'She asks him first. He says yes. She does it properly, and afterward she cries ' +
          'in the cabin, where she thinks nobody can hear. On a boat this size, I hear it anyway.');
      } else if (s.has('morphine')) {
        lines.push('I have the ampoule from Rosco\u2019s. I ask him first. He says yes.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('At dawn, off a sandbar, I put him over the side. The sun comes up ' +
        'the color of the inside of a shell.');
      lines.push(((s.seen('a1_teddy_wants') || s.seen('a3_teddy_asked'))
        ? 'He was not the reason for anything. I made sure of that. ' : '') +
        'Of everything I have done since April 11, it is the one thing I would do again ' +
        'the same way, in the same order, for the same man.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 7 */
  S.ending({
    id: 'end_serum',
    title: 'The Last Nine Doses',
    kicker: 'An ending \u00b7 the gray',
    tag: 'NINE VIALS',
    blurb: 'I walked out with every dose of the cure that was left. Then I had to decide who got them.',
    tease: 'The hospital keeps the last doses of the cure in a cold cabinet. You could take them all.',
    place: 'The lime avenue',
    text: function (s) {
      var n = Math.max(1, s.count('vial'));
      var mine = s.infection > 0 && !s.flag('arrested');
      var comp = s.party();
      var lines = [
        'I take the vials out of the gray rubber tray and put all ' + num(n) + ' in my coat. ' +
        'Then I walk down the lime avenue, and nobody stops me.',

        'The Matron watches me go from the steps with a mug of tea and says nothing. ' +
        'I can feel her eyes on the back of my neck for four hundred yards.'
      ];
      if (comp.length > 1) {
        lines.push('The others fall into step behind me. The glass knocks together inside ' +
          'my coat, and nobody asks what I have taken.');
      } else if (comp.length === 1) {
        lines.push(S.CAST[comp[0]].name + ' falls into step behind me. The glass knocks together ' +
          'inside my coat, and ' + SUBJ[comp[0]] + ' doesn\u2019t ask what I have taken.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (mine) {
        lines.push((s.alive('odile') ? 'Odile puts the first one into the back of my hand'
          : 'I put the first one into the back of my own hand') +
          ' that night, by flashlight.');
      }
      lines.push('By the end of the first month I understand what I walked out with. Everyone who ' +
        'hears about the serum wants a dose, and I am the only place left to get one. ' +
        'I have become a triage desk that walks.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push((mine
        ? 'The first one I give away goes, inside a week, to a boy on the Hawksmoor Road. '
        : 'I give the first one away inside a week, to a boy on the Hawksmoor Road. ') +
        'It is the easiest thing I have ever done.');
      lines.push('The second goes inside a month.');
      var kept = Math.max(0, n - 2 - (mine ? 1 : 0));
      lines.push('I don\u2019t give the third one away. By then I have learned ' +
        'to ask whether somebody better might come along, ' +
        'and the answer is always <em>possibly</em>. ' +
        '<em>Possibly</em> is how I come to have ' + num(kept) + ' vials in my coat two years later, ' +
        'and a list in my head of everyone I walked past.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('In a church hall in Cleveholt, listening to a committee argue about who should ' +
        'get the next dose, I realize I have been doing the Matron\u2019s job since the night I left.');
      lines.push(s.flag('foundTheOffice')
        ? 'I do it without her building, her ledger, or her fourth column. She wrote her decisions ' +
          'down, name by name. I have never written down the names of the people I passed over. ' +
          'This is as close as I will come.'
        : 'I do it without her building or her staff. She wrote her decisions down, name by name. ' +
          'I have never written down the names of the people I passed over. ' +
          'This is as close as I will come.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 8 */
  S.ending({
    id: 'end_ward',
    title: 'Bed Ninety-Five',
    kicker: 'An ending \u00b7 verbal, witnessed',
    tag: 'THE VOLUNTEER',
    blurb: 'I signed the form. They put me in the bed and were kind about it.',
    tease: 'CONSENT: VERBAL, WITNESSED (2). COMPENSATION: FAMILY PLACED, EAST BLOCK.',
    place: 'Ward 11',
    text: function (s) {
      var names = survivors(s);
      var pav = s.flag('sawTheNewRow') ? 'Pav, whose father is in bed ninety-one,' : 'a man called Pav';
      var lines = [
        (metMatron(s)
          ? 'The Matron doesn\u2019t try to talk me out of it. I expected her to. '
          : 'I ask for the Matron, the head of nursing who runs this hospital. She is about ' +
            'sixty-five, in a cardigan, and she doesn\u2019t try to talk me out of it. ') +
        'I think she has learned that arguing only makes it worse.',

        'She reads me the whole thing instead, twice: what it will be like at the start ' +
        'and in the middle, how long it takes, how it feels when the hum ' +
        'gets into the bone, and what I will and won\u2019t be aware of by the second week. ' +
        'She doesn\u2019t shade a word of it.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      if (names.length) {
        lines.push('The compensation is real, and it is written down: ' + listOf(names) +
          ' placed in the east block, on Category A rations, for as long as this building stands.');
        lines.push('It has to be witnessed. That is the rule, and she won\u2019t bend it: ' +
          'two signatures.');
        var signed = 0;
        if (s.alive('odile')) {
          lines.push('Odile signs with a steady hand. Afterward she goes out to Sexton\u2019s Field ' +
            'alone for two hours.');
          signed++;
        }
        if (s.alive('bram')) {
          lines.push('Bram reads the form through twice, start to finish, before he signs it.');
          signed++;
        }
        if (s.alive('wren')) {
          lines.push('Wren won\u2019t sign.' + (signed < 2
            ? ' They find ' + pav + (signed === 1 ? ' to be the second witness.' : ' and a night nurse called Iris to sign instead.')
            : ''));
          if (s.flag('promisedTheDoor')) {
            lines.push({ c: 'pad', t: 'you promised me a door that locks from the inside' });
            lines.push({ c: 'pad', t: 'you didnt say youd be the lock' });
          } else if (s.flag('wrenKnowsMercy')) {
            lines.push({ c: 'pad', t: 'you told me about this place like it was good news' });
          }
        } else if (signed < 2) {
          lines.push('They find ' + pav + (signed === 1 ? ' to be the second witness.' : ' and a night nurse called Iris to sign.'));
        }
      } else {
        lines.push('There is nobody to place in the east block, so that line on my form stays blank. ' +
          'Two of the staff witness it: ' + pav + ' and a night nurse called Iris.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The restraints are lined with sheepskin, and it is softer than it looks. ' +
        'Somebody worked out that it needed to be, and then did the work. They say they will talk ' +
        'to me while they wash me. I have made them promise to open the window if I ask.');
      lines.push('BED 95 is written above the frame. I can still read it from here.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push((s.flag('foundTheOffice') && !s.flag('burnedTheLedger'))
        ? 'The Matron has promised to put these pages with the ledger. I haven\u2019t asked ' +
          'what she will write in the fourth column.'
        : 'The Matron has promised to keep these pages with her records. I haven\u2019t asked ' +
          'what she will write about me.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 9 */
  S.ending({
    id: 'end_door',
    title: 'A Door That Locks From The Inside',
    kicker: 'An ending \u00b7 the room',
    tag: 'THE DOOR',
    blurb: 'I found Wren a cellar with a bolt on the inside of the door. She decides when it opens.',
    tease: 'Wren wants a door that locks from the inside.',
    place: 'Somewhere with a door',
    text: function (s) {
      var lines = [
        'It is a Methodist chapel hall eleven miles north, with a cellar under it, ' +
        'a cast-iron door at the top of the cellar stairs, and a bolt on the inside ' +
        'that somebody fitted around 1950 for reasons that had nothing to do with any of this.'
      ];
      if (s.alive('teddy')) {
        lines.push('Teddy comes with us. On the second evening he ' +
          (s.flag('theCompact') ? 'says it is time, and nobody argues. ' : 'asks to rest. ') +
          'We stay with him until he is gone, and in the morning there is one fewer set of footsteps.');
      }
      lines.push({ c: 'dateline', t: 'Nine days later' });
      lines.push('Finding it has cost the last of the canned soup and most of the skin ' +
        'off both my hands. Wren goes up the steps ahead of me.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I stand back and watch her put her hand on the bolt. She waits a long time ' +
        'before she slides it across. It goes home with a good, solid sound. Whoever fitted it ' +
        'expected the world to go on being ordinary.');
      lines.push({ c: 'whisper', t: 'She writes on the pad and holds it up. She is crying, ' +
        'and she is smiling too. I have never seen her smile.' });
      lines.push({ c: 'pad', t: 'thats it then' });
      lines.push({ c: 'pad', t: 'thats the whole thing i wanted' });
      if (s.alive('odile') || s.alive('bram')) lines.push({ c: 'sep', t: '\u2042' });
      if (s.alive('odile')) {
        lines.push('Odile sets up a clinic on a trestle table and sees eleven people in the ' +
          'first month. Word gets around. A woman who can take an arm off ' +
          'cleanly is worth four cans of anything.');
      }
      if (s.alive('bram')) {
        lines.push('Bram goes east to Thornbury in the third week' +
          (bramSeesBadly(s)
            ? (s.flag('bramEyeTreated')
              ? ', with a clean dressing over his eye and two spares in his pocket'
              : ', on one good eye, turning his whole head at every corner')
            : '') +
          (knowsDaughter(s) ? '. ' : '. He has a daughter there; he tells me so the night before he leaves. ') +
          'He comes back in the fifth week with a nine-year-old girl on his shoulders, wheezing, ' +
          'and a look on his face I have never seen there. All he says is: ' +
          '<span class="said">"Her grandma had a storm cellar and a shotgun."</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The hum is still out there.' + (knowsNineWeeks(s)
        ? ' The Matron\u2019s figures gave the cure at St. Amaranth Mercy nine weeks when we left, ' +
          'and after that there is no cure anywhere that I know of.'
        : '') +
        ' But we have a cellar with a cast-iron door and a bolt on the inside, ' +
        'and the person who decides whether it is open or shut is a fourteen-year-old girl ' +
        'who hasn\u2019t gotten her voice back yet. She sleeps through the night now.');
      if (s.flag('promisedTheDoor')) {
        lines.push('On the first night of this journal I promised her this door. Whatever else ' +
          'I got wrong, I kept that one.');
      } else if (s.flag('wrenKnowsMercy')) {
        lines.push(s.seen('a1_wren_wants')
          ? 'At Rosco\u2019s, when she asked me for a door, I told her about a hospital that ' +
            'takes in all who come. It was the wrong answer, and she has been kind enough never to say so.'
          : 'At Rosco\u2019s I told her about a hospital that takes in all who come. ' +
            'This is what she wanted instead, and she has been kind enough never to say so.');
      } else if (s.seen('a1_wren_wants')) {
        lines.push('On the first night of this journal she wrote down what she wanted. ' +
          'I didn\u2019t promise her anything then. I found it anyway.');
      }
      return lines;
    }
  });

  /* ---------------------------------------------------------- 10 */
  S.ending({
    id: 'end_hush',
    title: 'It Was Never An Infection',
    kicker: 'An ending \u00b7 the note',
    tag: 'THE RECRUITMENT',
    blurb: 'I stopped holding back the note and walked out to join them.',
    tease: 'Stop holding the note down.',
    place: 'The lime avenue',
    text: function (s) {
      var heading = s.flag('headingForTheBoat');
      var away = !heading && s.flag('refusedTheMercy');
      var lines = [
        heading
          ? 'Halfway down to the river I leave the road and walk out into a wet field. ' +
            'About two hundred yards from the road, I stop holding the note down.'
          : (away
            ? 'I leave the road where the lime trees end and walk out onto the wet grass. ' +
              'About two hundred yards out, I stop holding the note down.'
            : 'I walk out of the gates, down the avenue and off the gravel onto the wet grass. ' +
              'About two hundred yards along, where the lime trees end, I stop holding the note down.'),

        'That is all it takes. It feels like putting down a bag I have carried so long ' +
        'that my arm stopped noticing it.',

        { c: 'hum', t: 'h m m m m m m m' },

        'The note comes up out of me, low and even, and goes on without any need for breath. ' +
        'Within four minutes they begin to arrive ' +
        (byDay(s) ? 'out of the hedges and the low ground ' : 'out of the dark ') +
        'from every direction, unhurried, like people coming off a train.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Once I am inside the note, I know things that nobody outside it could find out. ' +
        'I know them all at once, without words.');
      lines.push('They have been assembling all along. Each of them holds a position in something ' +
        'huge and unfinished that has been under construction since the nine seconds on April 11. ' +
        'The humming holds it together. They stand in trailers and culverts and shallow water, ' +
        'tipped to whatever opening they can find, because that is where they are needed.');
      lines.push('I can feel the whole of it from inside, the way you can feel how big a cathedral ' +
        'is with your eyes shut. It is about eleven weeks from finished.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.partyCount() > 0) {
        lines.push(heading
          ? 'Somebody is shouting my name from the road. I can hear it clearly. I can hear every ' +
            'heartbeat on the road, and four miles back up the hill I can hear the generator behind ' +
            'the kitchens and ' + wardCount(s) + ' voices in the east wing, holding the same note I am.'
          : 'Somebody is shouting my name from ' + (away ? 'the end of the avenue' : 'the hospital steps') +
            '. I can hear it clearly. I can hear every heartbeat ' + (away ? 'on the avenue' : 'on that gravel') +
            ', the generator behind the kitchens, and ' + wardCount(s) + ' voices in the east wing, ' +
            'holding the same note I am.');
        lines.push('I don\u2019t go back. I can still name everyone I have loved. ' +
          'I just don\u2019t put any of them above the work anymore.');
      }
      lines.push('By morning I am standing in eight inches of water in a culvert, ' +
        'my face tipped to the bright round mouth of it, in exactly the right place. ' +
        'For the first time since the Hush, I am not afraid.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 11 */
  S.ending({
    id: 'end_turned',
    title: 'Nearly Theirs',
    kicker: 'An ending \u00b7 the bone',
    tag: 'TURNED',
    blurb: 'The hum got into my bones, and I turned.',
    tease: 'Let the infection run its course.',
    place: 'Where I stood',
    text: function (s) {
      var lines = [];
      var inside = s.flag('letTheNoteIn');
      /* Act 3 routes: the dose failed (a3_matron_treat choices), or it happened on the
         ward floor straight after a3_ward_unstrap */
      var failed = !inside && s.flag('treatmentFailed');
      /* walked out with all nine vials, past the point where a dose can work */
      var serum = !inside && !failed && s.flag('serumFailed');
      var ward = !inside && !failed && !serum && s.flag('stillOnTheWard');
      var away = !inside && !serum && othersAway(s);
      if (inside) {
        lines.push('At the trailer doors I stop. Bram still has my collar in his fist. ' +
          'I put my hand over his and loosen his fingers one by one. ' +
          'For a moment we are both holding on.');
        lines.push('He says my name. I hear every syllable of it. Then I turn back toward the people ' +
          'waiting inside, and he doesn\u2019t follow me.');
        lines.push({ c: 'sep', t: '\u2042' });
      } else if (failed) {
        var daysIn = s.day - s.val('firstInfectionDay', s.day - 3);
        lines.push(s.flag('metTheMatron')
          ? 'The Matron gives me the dose herself, into the back of my hand, over about ninety seconds.'
          : 'Dr. Aytoun sends for the head of nursing, a woman of about sixty-five in a cardigan ' +
            'whom everyone calls Matron. Matron gives me the dose herself, into the back of my hand, ' +
            'over about ninety seconds.');
        lines.push('She talks the whole time, about nothing in particular. Then she stops talking ' +
          'and watches my face. It is supposed to go quiet in the back teeth first. ' +
          'Nothing goes quiet anywhere.');
        lines.push(daysIn > 4
          ? '<span class="said">"It has been in you too long," </span>she says. ' +
            '<span class="said">"I am sorry."</span>'
          : '<span class="said">"It had gone further in you than the days would suggest," </span>she says. ' +
            '<span class="said">"That happens. I am sorry."</span>');
        lines.push({ c: 'sep', t: '\u2042' });
      } else if (serum) {
        var doser = s.alive('odile') ? 'Odile' : '';
        lines.push('I walk down the lime avenue with ' + num(s.count('vial')) + ' vials knocking ' +
          'together inside my coat. The Matron watches me go from the steps and says nothing.');
        lines.push((doser ? 'Odile puts the first one into the back of my hand'
          : 'I put the first one into the back of my own hand') +
          ' that night, by flashlight, and ' + (s.partyCount() ? 'we wait' : 'I wait') +
          ' for the quiet. Nothing goes quiet anywhere.');
        lines.push((doser ? 'She tries a second an hour later' : 'I try a second an hour later') +
          ', and a third before morning. They go in gray and do nothing at all.');
        lines.push({ c: 'sep', t: '\u2042' });
      } else if (ward) {
        lines.push('What they hummed into me on the ward floor doesn\u2019t wait. I am still on the pine ' +
          'floor of Ward Eleven, between two beds, when it starts.');
        lines.push({ c: 'sep', t: '\u2042' });
      }
      lines.push(
        'I always expected teeth, and a moment, and somebody\u2019s face going wrong above me. ' +
        'It doesn\u2019t happen like that.',

        'It happens from the inside, one part of me at a time.',

        'The back teeth. The jaw. The sinuses. The long bones of the arms. ' +
        'The floor of the pelvis. Places I didn\u2019t know it had reached ' +
        'switch over one after another, like lights in a house.'
      );
      lines.push({ c: 'sep', t: '\u2042' });
      if (inside) {
        lines.push('Nobody comes in after me. Through the open doors I can see the others ' +
          'in the road.' + (s.alive('odile') ? ' Odile is the last to look away.' : ''));
      } else if (away && s.partyCount() > 0) {
        lines.push('The others are still waiting for me at the end of the avenue, where we agreed. ' +
          'I hope somebody goes down to tell them. I don\u2019t want them let in.');
      } else if (s.partyCount() > 0) {
        if (ward) lines.push('Somebody runs to fetch the others.');
        if (s.alive('odile')) {
          lines.push('Odile sees it before I say anything. She doesn\u2019t back away.');
          lines.push('<span class="said">"Sit down," </span>she says. ' +
            '<span class="said">"I am going to stay. You do not have to talk."</span>');
          lines.push('She stays. She is still telling me about a collie she put down last spring ' +
            'when her words stop meaning anything and turn into part of the note.');
        }
        if (s.alive('bram')) {
          lines.push((s.alive('odile') ? 'Bram stays too, ' : 'Bram stays, ') +
            'a few yards off, and doesn\u2019t take his eyes off me. ' +
            'I know why, and I\u2019m glad it\u2019s him.');
        }
        if (s.alive('wren')) {
          lines.push('Wren writes something on her pad and holds it up. By then I can\u2019t read it.');
        }
        if (s.alive('teddy')) {
          lines.push('Teddy stays where he is and keeps his eyes on me.');
        }
      } else if (failed || ward) {
        lines.push('None of my own people are here to sit with me. I arranged that myself, over the ' +
          'last few days, in small decisions that each seemed reasonable at the time.');
      } else {
        lines.push('Nobody sits with me. I arranged that myself, over the last few days, ' +
          'in small decisions that each seemed reasonable at the time.');
      }
      if (failed) {
        var knowsWard = s.flag('sawWard11') || s.flag('metTheMatron') || s.flag('cameInTheBack') ||
          s.flag('knowsTheWards') || s.seen('a3_ask_east');
        lines.push(knowsWard
          ? 'The Matron is already writing on a fresh chart. I know which ward it is for. Nobody here ' +
            'will burn me. They will wash me, strap me down on sheepskin, and talk to me about the weather.'
          : 'The Matron is already writing on a fresh chart. At the top it says WARD 11. Through two ' +
            'sets of doors I can hear the east wing humming, and I understand what that ward is for.');
      } else if (ward) {
        lines.push('The woman with the sponge kneels beside me and doesn\u2019t back away. She asks my ' +
          'name, so that she can use it later, and writes it on the chart of the empty bed at the end ' +
          'of the row.');
      } else if (serum) {
        var left = Math.max(0, s.count('vial') - 3);
        lines.push('There are ' + num(left) + ' vials left in my coat. ' +
          (s.alive('odile')
            ? 'Odile has the coat now. I hope she carries them back up the hill.'
            : 'I hope whoever takes the coat off me carries them back up the hill.'));
      }
      lines.push({ c: 'sep', t: '\u2042' });
      var last = 'My last private thought isn\u2019t about June or the photo strip, ' +
        'and I have no time left to resent that. ';
      if (s.flag('keptTheList')) {
        lines.push(last + 'It is about the grocery list in my pocket, from the pharmacist\u2019s coat ' +
          'at Rosco\u2019s. <em>Milk. Trash bags. Call Mom.</em>');
      } else if (s.flag('lootedDispensary')) {
        lines.push(last + 'It is about a grocery list in a pharmacist\u2019s coat pocket at Rosco\u2019s. ' +
          '<em>Milk. Trash bags. Call Mom.</em>');
      } else {
        lines.push(last + 'It is about the nine seconds in April when every radio stopped, ' +
          'and everybody on my street went outside to look at the sky.');
      }
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('The pencil moves with the note. Three times I have tried to write something ' +
        'else. My hand keeps bringing me back to the same word: <em>here</em>.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 12 */
  S.ending({
    id: 'end_body_failed',
    title: 'What The Body Had Left',
    kicker: 'An ending \u00b7 the end of it',
    tag: 'FINISHED',
    blurb: 'My body gave out from blood loss and exhaustion before the hum could take me.',
    tease: 'Let your body give out.',
    place: 'Where I fell',
    text: function (s) {
      /* Act 3: collapsing on the ward floor straight after a3_ward_unstrap */
      var ward = s.flag('stillOnTheWard');
      var lines = [
        'In the end it isn\u2019t the hum that kills me.',

        'It is blood loss, and six weeks on three hundred calories a day, ' +
        'and one more thing asked of a body that had already said no twice ' +
        'and been overruled.'
      ];
      if (ward) {
        lines.push('I go down on the pine floor between two beds, my scalp open and my arm bleeding, ' +
          'and I can\u2019t get up again. Three of the staff drag me clear of the beds.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (ward) {
        lines.push((s.flag('wasTriaged') ? 'Dr. Aytoun' : 'A doctor called Aytoun') +
          ' works on me for forty minutes on the ward floor. Every pint of blood in this building ' +
          'came out of the beds around me. She won\u2019t put any of it into me, and I don\u2019t ask her to.');
        lines.push(s.flag('choseTheWard')
          ? '<span class="said">"If you\u2019d stopped at four, you\u2019d have walked out of here," </span>' +
            'she says. She doesn\u2019t say it unkindly.'
          : '<span class="said">"You came in here half dead," </span>she says. ' +
            '<span class="said">"Four was too many."</span> She doesn\u2019t say it unkindly.');
        if (othersAway(s) && s.partyCount() > 0) {
          lines.push('The others are still waiting for me at the end of the avenue. Somebody goes down ' +
            'to tell them. I don\u2019t know whether they get here in time.');
        } else if (s.partyCount() > 0) {
          lines.push('Somebody runs for the others.');
          if (s.alive('odile')) {
            lines.push('Odile kneels on my other side and keeps pressure wherever Dr. Aytoun points.');
          }
          if (s.alive('wren')) {
            lines.push('Wren holds my hand in both of hers. Her pad stays in her pocket.');
          }
          if (s.alive('bram')) {
            lines.push('Bram stands at the end of the row with his back to us, between me and the beds.');
          }
          if (s.alive('teddy')) {
            lines.push('Teddy sits with me. For once his breathing is the steadier of the two.');
          }
        } else {
          lines.push('There is nobody of mine here. I saw to that myself, one decision at a time. ' +
            'The woman with the sponge holds my hand instead.');
        }
      } else {
        if (s.alive('odile')) {
          var kit = [];
          if (s.has('knife')) kit.push('a boning knife');
          if (s.has('flask')) kit.push('a bottle of grain alcohol');
          if (s.has('gauze')) kit.push('one field dressing');
          lines.push(kit.length
            ? 'Odile works on me for forty minutes with what we have: ' +
              listOf(kit.concat(['thirty years\u2019 experience with the wrong species'])) + '.'
            : 'Odile works on me for forty minutes with nothing but her hands and thirty years\u2019 ' +
              'experience with the wrong species.');
          lines.push('She is very good. <span class="said">"In a hospital you would live,"</span> ' +
            'she says. It isn\u2019t a consolation, and she doesn\u2019t offer it as one.');
        }
        if (s.alive('wren')) {
          lines.push('Wren holds my hand in both of hers. Her pad stays in her pocket.');
        }
        if (s.alive('bram')) {
          lines.push('Bram keeps watch a few yards off, with his back to us. Every few minutes he says, ' +
            '<span class="said">"Nothing\u2019s coming."</span>');
        }
        if (s.alive('teddy')) {
          lines.push('Teddy sits with me. For once his breathing is the steadier of the two.');
        }
        if (s.partyCount() === 0) {
          lines.push('There is nobody with me. I saw to that myself, one decision at a time.');
        }
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I thought I would be frightened. I\u2019m not, and I want that written down ' +
        'for whoever finds this.');
      var seen = [];
      if (s.flag('lootedDispensary')) seen.push('a grocery list from a pharmacist\u2019s coat');
      seen.push('four frames from a photo booth at a county fair');
      if (s.flag('tookTeddy')) seen.push('how little a seventy-one-year-old man weighed with his arm across my shoulders');
      lines.push('What I can still see is ' + listOf(seen) + '.');
      lines.push('Day ' + dayOf(s) + '. There is hardly any room left on this page.');
      return lines;
    }
  });
})();
