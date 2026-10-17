/* ============================================================
   THE HUSH — endings
   Twelve ways out. None of them clean.
   ============================================================ */
(function () {
  'use strict';
  var S = window.Story;

  function survivors(s) {
    return s.party().map(function (id) { return S.CAST[id].name; });
  }

  /* ---------------------------------------------------------- 1 */
  S.ending({
    id: 'end_burn',
    title: 'Everything That Was Left',
    kicker: 'An ending \u00b7 fire',
    tag: 'THE FIRE',
    blurb: 'I burned St Amaranth Mercy and the ninety-four in its beds. The county could see the smoke for two days.',
    tease: 'Something in this county still has a generator and a full tank of diesel.',
    place: 'The north field',
    text: function (s) {
      var lines = [
        'The generator is behind the kitchens, with four hundred litres of diesel in a bunded tank. ' +
        'A hospital is a building full of oxygen cylinders. I don\u2019t have to be clever about ' +
        'any of it.'
      ];
      if (s.flag('allyKnowsBurn')) {
        lines.push('The woman with the sponge does the east wing doors herself. First she does the ' +
          'mouths one last time, all ninety-four. It takes her two hours and eleven minutes, and ' +
          'nobody hurries her. When she comes out she nods once and doesn\u2019t look back.');
      } else {
        lines.push('Nobody stops me. Forty members of staff watch a stranger carry a jerrycan out of ' +
          'the east wing, and not one of them puts out a hand. I think they have all been waiting ' +
          'for somebody from outside to take the decision off them.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It catches at ten past five. From the north field I see the first window go, ' +
        'then the others, one after another along the east wing.');
      lines.push('For about ninety seconds, over the roar of it, I can hear ninety-four people ' +
        'holding the note the way the lorry did, then going up the scale together.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('Then the roof comes down into the ward and the note stops. I am standing in a cold ' +
        'field at dawn, watching the only light in the county go out, and the last nine doses ' +
        'of the only cure on earth going with it.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.flag('readTheLastPage')) {
        lines.push('Matron wrote it on her last page: nine weeks, whatever anyone did. ' +
          'I have burned nine weeks, ninety-four people and a chapel full of wedding rings, ' +
          'and by her arithmetic I was very nearly right.');
        lines.push('<em>Very nearly</em> will have to be enough. It is what I have.');
      } else {
        lines.push('I never found out how many weeks were left in it. One more question would ' +
          'have told me, and I chose not to ask it.');
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
    blurb: 'I took the chair and kept the book. I wrote in the fourth column every night.',
    tease: 'Somebody has to sign the forms. There is a chair, and a kettle, and a hockey team from 1991.',
    place: "The Matron's office",
    text: function (s) {
      var lines = [
        'She hands it all over like someone rehoming a dog she can no longer walk: ' +
        'the keys, the index, the rota, the names of the four who will help me and ' +
        'the two who won\u2019t.',

        '<span class="said">"You will want to change things," </span>she says. ' +
        '<span class="said">"Do. Most of it was put together in a fortnight by a frightened woman. ' +
        'But keep the mouths. Whatever else goes, keep the mouths."</span>',

        'She leaves the next morning with a bag and a stick and doesn\u2019t say where. ' +
        'The lad on the gate cries, and she tells him not to be silly. ' +
        'Then she is a shape on the lime avenue, and then not even that.',

        { c: 'sep', t: '\u2042' },

        'I run St Amaranth Mercy for nine weeks and four days.',

        'I do it properly. In several ways that can be measured, I do it better than she did, ' +
        'and that has to go in here too: I was <em>good at it</em>. ' +
        'The yields hold up a fortnight longer than her projection because I move the draws to ' +
        'the evening. I get the rations fair. I stop the conversions on the eleventh day, ' +
        'and on the twenty-sixth, with a nine-year-old on a trolley and no doses left, ' +
        'I start them again.',

        'I write in the fourth column every night before I sleep. ' +
        'She was right that it is the only thing that helps. She didn\u2019t mention that it ' +
        'also makes it possible to carry on.'
      ];
      if (s.alive('wren')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Wren goes in the sixth week, without any fuss. ' +
          'She leaves her pad open on my desk.');
        lines.push({ c: 'whisper', t: 'you said youd find me a door that locks from the inside' });
        lines.push({ c: 'whisper', t: 'you found one. you just stood on the wrong side of it' });
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Six weeks in, the last vial is long gone. St Amaranth Mercy is ' +
        'ninety-four people in beds, a generator, and forty of us who signed the forms.');
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
    blurb: 'I carried the book out and spent the years after making people read it.',
    tease: 'Nine hundred names in a neat hand, each with a date and a yield.',
    place: 'The road west',
    text: function (s) {
      var lines = [
        'I walk out of St Amaranth Mercy at dawn with four inches of hardback ledger ' +
        'inside my coat. Nobody tries to stop me. I think the woman who wrote it ' +
        'has been waiting two months for someone to take it off her.'
      ];
      if (s.flag('tookTheEffects')) {
        lines.push('I take what was on the chapel table too: nine hundred watches, rings and ' +
          'hair slides in four pillowcases, the heaviest, stupidest, most necessary load ' +
          'anyone has carried out of that building.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push({ c: 'dateline', t: 'The following spring' });
      lines.push('It turns out the world doesn\u2019t end all at once. Pockets of it ' +
        'go on holding meetings.');
      lines.push('The first is in Cleveholt: two hundred people, a working mill, a committee. ' +
        'In a church hall I read out forty-one names, with their dates and yields, ' +
        'and then the fourth column. A man near the back stands up and asks ' +
        'what every hall asks.');
      lines.push('<span class="said">"Did it work?"</span>');
      lines.push('And I have to say yes. In every hall, every time, I say ' +
        '<em>yes, it worked</em>, and watch the room do the arithmetic.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Three of the settlements vote to build one of their own.');
      lines.push('I stop two of them. The third time I am sixty miles away and don\u2019t ' +
        'hear about it until the autumn, by which time there is a ward in a converted school ' +
        'with eleven beds in it and a woman doing the mouths.');
      lines.push('The book doesn\u2019t stop anything. It only means that it happens ' +
        'with the names written down.');
      lines.push('I decide, eventually, that this is not nothing. ' +
        'It takes me four years to decide it.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 4 */
  S.ending({
    id: 'end_boat_together',
    title: 'The Water Is A Wall',
    kicker: 'An ending \u00b7 the tide',
    tag: 'OUT ON THE TIDE',
    blurb: 'I got the others onto the water. The water held.',
    tease: 'They stop at the edge of it. Wren watched. Wren was right.',
    place: 'LUCKY II',
    text: function (s) {
      var names = survivors(s);
      var lines = [
        'The key goes into the brass barrel and turns. A forty-year-old diesel inboard ' +
        'catches on the fourth attempt, and across that water at five in the morning it is ' +
        'the loudest thing I have heard in weeks, and the best.'
      ];
      if (!s.flag('knowsBoat')) {
        lines.unshift('Downriver, the keys led me to a sailing club, and to LUCKY II ' +
          'tied up on the slip.');
      }
      lines.push('Both banks fill up. Of course they do. Hundreds of them, out of the reeds, ' +
        'out of the boatyards, down the slipway \u2014 and they wade in shin-deep and stop, ' +
        'as Wren said they would, facing me, holding the note as I go past.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('The note follows me for two miles. It is the last I hear of the town.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (names.length) {
        lines.push('There are ' + (names.length + 1) + ' of us on a twenty-six-foot boat: ' +
          names.join(', ') + ' and me.');
      }
      if (s.alive('wren')) {
        lines.push('Wren sits in the bow the whole way out with her face into the wind. ' +
          'About a mile past the harbour wall she turns round and says something.');
        lines.push('Out loud, with her voice. It is cracked and rough and about four words long, ' +
          'and the engine is too loud for me to catch a syllable of it.');
        lines.push({ c: 'whisper', t: 'She won\u2019t repeat it, then or since.' });
      }
      if (s.alive('odile')) {
        lines.push('Odile finds a half bottle of supermarket ros\u00e9 in the galley locker ' +
          'and opens it at six in the morning. She sets out an enamel mug for everyone aboard.');
      }
      if (s.alive('bram')) {
        lines.push('Bram asks once about the road east to Thornbury, then looks at the water ' +
          'and doesn\u2019t ask again that day. He asks again a week later. I will go. ' +
          'Not yet, but I will.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The estuary opens out at about seven. The sky over the sea is the ordinary ' +
        'pink of an ordinary morning. Three-quarters of a tank is enough to get somewhere. ' +
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
    tease: 'A boat that takes four people is a very large boat for one.',
    place: 'LUCKY II',
    text: function (s) {
      var lines = [
        'The key turns. The engine catches on the fourth attempt. I take a twenty-six-foot ' +
        'cabin cruiser down a black river at five in the morning, alone.',

        'Both banks fill up. They hold the note and stop at the waterline, and I pass ' +
        'close enough to see faces. There is nobody ' +
        'aboard whose hand I have to hold while it happens.',

        { c: 'hum', t: 'h m m m m m m m' },

        { c: 'sep', t: '\u2042' },

        'There are two berths in the cabin. In the locker: a child\u2019s armband, ' +
        'a paperback swollen with damp and a half bottle of supermarket ros\u00e9. ' +
        'I don\u2019t open the wine, that night or any other. Two years later it is still ' +
        'in the locker.',

        'I am very good at being alone. It may be what I was best at all along; ' +
        'I never found out while there were other people around.'
      ];
      if (!s.flag('knowsBoat')) {
        lines.unshift('I search the sailing club until I find LUCKY II, the name on her stern ' +
          'matching the foam fish on my fob.');
      }
      if (s.deaths.length) {
        lines.push('Along the way I lost ' + s.deaths.length + ' of the people I set out with. ' +
          'I could tell anybody the order, the hour, what the weather was doing, and what I chose.');
      }
      if (s.has('photo')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Somewhere past the harbour wall I take out the photo strip: four frames from ' +
          'a booth at a county fair, June and me laughing in the first three and blurred in the last. ' +
          'I had half meant to drop it in the water. I don\u2019t.');
        lines.push('I say her name aloud over the engine, to no one. It is the first time ' +
          'in a long while, and there is nobody aboard to pretend not to hear.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The estuary opens at seven. Three quarters of a tank is enough to get somewhere.');
      lines.push('There is no hum out here. There is nothing out here. ' +
        'Over the weeks that follow I find I can\u2019t always tell the difference, ' +
        'and that I have stopped minding. The not minding is what I should ' +
        'have been frightened of.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 6 */
  S.ending({
    id: 'end_mercy_teddy',
    title: 'A Reason For Good Things',
    kicker: 'An ending \u00b7 the compact',
    tag: 'THE PROMISE KEPT',
    blurb: 'I carried Teddy the whole way. When he said it was time, I did not argue.',
    tease: 'I want to be the one who says so, and I want one of you to not argue with me.',
    place: 'LUCKY II',
    enter: function (s) { s.advance(1); },
    text: function (s) {
      var lines = [
        'Teddy gets onto the boat under his own power on the morning of day ' +
        Math.floor(Number(s.day)) + ', ' +
        'which ought not to be medically possible. ' +
        'He does it with one hand on the guard rail ' +
        'while I pretend not to watch.',

        'The engine catches on the fourth attempt. The banks fill up, hold the note ' +
        'and stop at the water.',

        { c: 'hum', t: 'h m m m m m m m' },

        { c: 'sep', t: '\u2042' },

        'He lasts six days. They are good days, the way only days like that can be: ' +
        'no decisions in them, nothing to carry, an engine doing the walking.',

        'On the fourth day he conducts. He sits in the cockpit with a blanket over his knees, ' +
        'both hands up and eyes shut, and works through something from memory for about four minutes, ' +
        'while I watch forty years of a man\u2019s life pass through an empty pair of hands.'
      ];
      if (!s.flag('knowsBoat')) {
        lines.unshift('At the sailing club I find LUCKY II by the name on the fob, ' +
          'fourth boat along the slip.');
      }
      if (s.alive('wren')) {
        lines.push('Wren hums for him, quietly, badly, off the note \u2014 ' +
          (s.flag('wrenSpoke')
            ? 'she has not risked her voice since the river path \u2014 '
            : 'the first sound she has made on purpose since the third day \u2014 ') +
          'and he doesn\u2019t stop or open his eyes. He brings her in with two fingers ' +
          'on the second bar, as he must once have done for nervous choristers, ' +
          'and carries on as if he had been expecting her.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('On the sixth evening he looks at me and says, ' +
        '<span class="said">"It is time, child."</span>');
      lines.push('And I do not argue.');
      lines.push('That is the whole of the promise: <em>I do not argue</em>. ' +
        'I hold his hand and let a seventy-one-year-old man be the one who says so. ' +
        'It takes about an hour. It is quiet, and it is on the water, ' +
        'and nobody is coming for the sound of it.');
      if (s.alive('odile') && (s.has('morphine') || s.flag('odileKeepsMorphine'))) {
        lines.push('Odile has the ampoule from Rosco\u2019s. ' +
          'She asks him first. He says yes. She does it properly, and afterwards she cries ' +
          'in the cabin, where she thinks nobody can hear. On a boat this size, everybody can.');
      } else if (s.has('morphine')) {
        lines.push('I have the ampoule from Rosco\u2019s. I ask him first. He says yes.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('At dawn, off a sandbank, I put him over the side. The sun comes up ' +
        'the colour of the inside of a shell.');
      lines.push('He was not the reason for anything. I made sure of that. ' +
        'Of everything I have done since the eleventh of April, it is the one thing I would do again ' +
        'the same way, in the same order, for the same man.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 7 */
  S.ending({
    id: 'end_serum',
    title: 'The Last Nine Doses',
    kicker: 'An ending \u00b7 the grey',
    tag: 'NINE VIALS',
    blurb: 'I walked out with every dose that will ever exist. That made me the hospital.',
    tease: 'Nine vials in a rack in a cold cabinet. There will never be any more.',
    place: 'The lime avenue',
    text: function (s) {
      var lines = [
        'Nine vials in a grey rubber tray, in a cold cabinet, in a hospital whose yield is falling. ' +
        'I put all nine in my coat and walk down the lime avenue unchallenged.',

        'Matron watches me go from the steps with a mug of tea and says nothing. ' +
        'I feel the judgement in that silence on the back of my neck ' +
        'for four hundred yards.',

        { c: 'sep', t: '\u2042' },

        'What I didn\u2019t understand on the avenue, and understand well enough ' +
        'by the end of the first month, is this:',

        'I did not take nine doses of medicine. I took the <em>supply</em>. ' +
        'Whoever holds all that is left of the only thing that works ' +
        'is no longer a person with nine vials in a coat. They are an institution: ' +
        'a triage desk with legs.'
      ];
      if (survivors(s).length) {
        lines.push('The others fall into step behind me. The glass knocks together inside ' +
          'my coat, and nobody asks what I have taken.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I give the first one away inside a week, to a boy on the Hawksmoor Road. ' +
        'It is the easiest thing I have ever done.');
      lines.push('The second goes inside a month.');
      lines.push('I don\u2019t give the third one away. By then I have learned ' +
        'to ask whether somebody better might come along, ' +
        'and the answer is always <em>possibly</em>. ' +
        '<em>Possibly</em> is how I come to have six vials in my coat two years later, ' +
        'and a list in my head of everyone I walked past.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('There is a word for what I became. I worked it out eventually, ' +
        'in a church hall in Cleveholt, listening to a committee argue about a converted school.');
      lines.push('I became Matron. Without the building, without the ledger, ' +
        'without the fourth column to write in at night.');
      lines.push('<em>Without the fourth column.</em> She would want me to notice that. ' +
        'She wrote hers down. I never wrote down one of mine, ' +
        'so there is no book anywhere that says what I decided, ' +
        'and nobody will ever stand up in a church hall and read out my name.');
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
      var lines = [
        'Matron doesn\u2019t try to talk me out of it. I expected her to. ' +
        'I think she has learned that it is a kind of theatre, ' +
        'and that it only makes things worse.',

        'She reads me the whole thing instead, twice: what it will be like at the start ' +
        'and in the middle, how long it takes, how it feels when the hum ' +
        'gets into the bone, what I will and will not be aware of by the second week.',

        'She does not shade a word of it. She never does.'
      ];
      if (names.length) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('The compensation is real and it is written down: ' + names.join(', ') +
          ' placed in the east block, Category A rations, for as long as this building stands.');
        lines.push('It has to be witnessed. That is the rule, and she won\u2019t bend it: ' +
          'two signatures from people who know me.');
        if (s.alive('odile')) {
          lines.push('Odile signs. Her hand is steady \u2014 of course it is \u2014 ' +
            'and afterwards she goes out into the north field on her own for two hours.');
        }
        if (s.alive('wren')) {
          lines.push('Wren won\u2019t sign. They have to find a man called Pav to do it instead.');
          lines.push({ c: 'whisper', t: 'you promised me a door that locks from the inside' });
          lines.push({ c: 'whisper', t: 'you didnt say youd be the lock' });
        }
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The sheepskin is softer than it looks. Somebody worked out that it needed to be, ' +
        'and then did the work. They say they will talk to me while they wash me. ' +
        'I have made them promise to open the window if I ask for it.');
      lines.push('BED 95 is written above the frame. I can still read it from here.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('Matron has promised to put these pages with the ledger. I haven\u2019t asked ' +
        'what she will write in the fourth column.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 9 */
  S.ending({
    id: 'end_door',
    title: 'A Door That Locks From The Inside',
    kicker: 'An ending \u00b7 the room',
    tag: 'THE DOOR',
    blurb: 'I found Wren the door. She was the one who locked it.',
    tease: 'and i want to be the one who locks it',
    place: 'Somewhere with a door',
    text: function (s) {
      var lines = [
        'It is a Methodist chapel hall eleven miles north, with a cellar under it, ' +
        'a cast-iron door at the top of the cellar stairs, and a bolt on the inside ' +
        'that somebody fitted in about 1950 for reasons that had nothing to do with any of this.'
      ];
      if (s.alive('teddy')) {
        lines.push('Teddy comes with us. On the second evening he asks to rest. We stay with him ' +
          'until he is gone, and in the morning there is one fewer set of footsteps.');
      }
      lines.push({ c: 'dateline', t: 'Nine days later' });
      lines.push('Finding it has cost the last of the tinned soup and most of the skin ' +
        'off both my hands. Wren goes up the steps ahead of me.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I stand back and watch her put her hand on the bolt. She waits a long ' +
        'moment before she slides it across.');
      lines.push('It makes a good sound: heavy, stupid and final, ' +
        'the sound of something fitted by a person who assumed the world would go on being ordinary.');
      lines.push({ c: 'whisper', t: 'She writes on the pad and holds it up. She is crying, ' +
        'and she is also doing something with her face that I have not seen it do before.' });
      lines.push({ c: 'whisper', t: 'thats it then' });
      lines.push({ c: 'whisper', t: 'thats the whole thing i wanted' });
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.alive('odile')) {
        lines.push('Odile sets up a surgery on a trestle table and sees eleven people in the ' +
          'first month. Word gets about. A woman who can take an arm off ' +
          'cleanly is worth four tins of anything.');
      }
      if (s.alive('bram')) {
        lines.push('Bram goes east in the third week. He comes back in the fifth with a ' +
          'nine-year-old asthmatic girl on his shoulders and a look on his face I have never ' +
          'seen there. All he says is: <span class="said">"The grandmother had ' +
          'a cellar and a shotgun."</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It isn\u2019t safety. I am clear about that. ' +
        'The hum is still out there. The yield at St Amaranth Mercy had nine weeks in it ' +
        'when we left, and after that there is no cure on earth.');
      lines.push('But there is a cellar with a cast-iron door and a bolt on the inside, ' +
        'and the person who decides whether it is open or shut is a fourteen-year-old girl ' +
        'who hasn\u2019t got her voice back yet. For the first time since the third day, ' +
        'she is not frightened in the old way.');
      lines.push('I did one thing I said I would do. One, out of all of it.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 10 */
  S.ending({
    id: 'end_hush',
    title: 'It Was Never An Infection',
    kicker: 'An ending \u00b7 the note',
    tag: 'THE RECRUITMENT',
    blurb: 'I stopped holding it down. It had been very patient with me.',
    tease: 'It is not an infection. It is a recruitment.',
    place: 'The lime avenue',
    text: function (s) {
      var lines = [
        'I walk out of the gates, down the avenue and off the gravel onto the wet grass. ' +
        'About two hundred yards along, where the limes end, I stop holding it down.',

        'That is all it takes. It isn\u2019t surrender, and it isn\u2019t a fall. ' +
        'It feels like putting down a bag I have carried for so long ' +
        'that my arm had stopped reporting the weight.',

        { c: 'hum', t: 'h m m m m m m m' },

        'The note comes up out of me, low and even, and goes on without any need for breath. ' +
        'Within about four minutes they begin to arrive out of the dark ' +
        'from every direction, unhurried, like people coming off a train.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Nobody outside the note has ever been able to find this out. ' +
        'I understand it at once, completely, without a word:');
      lines.push('They are not hunting. They never were. They are <em>assembling</em>.');
      lines.push('Each of them is holding a position in something enormous and unfinished ' +
        'that has been under construction since nine seconds past the eleventh of April. ' +
        'The humming is not a sound; it is <em>load-bearing</em>. ' +
        'They stand in trailers and culverts and shallow water, facing walls, ' +
        'because that is where they are needed.');
      lines.push('There is a shape. I can feel the whole of it from inside, ' +
        'the way I could feel the size of a cathedral with my eyes shut.');
      lines.push('It is about eleven weeks from finished.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.partyCount() > 0) {
        lines.push('Somebody is shouting my name from the hospital steps. ' +
          'I can hear it clearly. I can hear every heartbeat on that gravel, ' +
          'the generator behind the kitchens, and ninety-four of my own voices ' +
          'in the east wing, all holding the note, none of them off it.');
        lines.push('I do not go back. It isn\u2019t that I have lost anything. ' +
          'I can account for every bit of it. ' +
          'I simply no longer rank it above the work.');
      }
      lines.push('By morning I am standing in eight inches of water in a culvert, ' +
        'facing a wall, in exactly the right place.');
      lines.push('For the first time since the Hush, I am not afraid.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 11 */
  S.ending({
    id: 'end_turned',
    title: 'Nearly Theirs',
    kicker: 'An ending \u00b7 the bone',
    tag: 'TURNED',
    blurb: 'It got all the way in. Nobody had to decide anything in the end.',
    tease: 'The hum, in the bone. Most of me is still mine. Nearly theirs.',
    place: 'Where I stood',
    text: function (s) {
      var lines = [];
      if (s.flag('letTheNoteIn')) {
        lines.push('At the trailer doors I stop. Bram still has my collar in his fist. ' +
          'I put my hand over his and loosen his fingers one by one. ' +
          'For a moment we are both holding on.');
        lines.push('He says my name. I hear every syllable of it. Then I turn back towards the people ' +
          'waiting inside, and he does not follow me.');
        lines.push({ c: 'sep', t: '\u2042' });
      }
      lines.push(
        'It doesn\u2019t happen the way I had been quietly dreading: teeth, ' +
        'and a moment, and somebody\u2019s face going wrong above me.',

        'It happens one room at a time, from the inside, reporting itself.',

        'The back teeth. The jaw. The sinuses. The long bones of the arms. ' +
        'The floor of the pelvis. Places I didn\u2019t know it had reached, ' +
        'switching over one after another like lights in a house.'
      );
      if (s.alive('odile')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Odile sees it before I say anything. She doesn\u2019t back away, ' +
          'and she doesn\u2019t reach for her coat pocket.');
        lines.push('<span class="said">"Sit down," </span>she says. ' +
          '<span class="said">"I am going to stay. You do not have to talk."</span>');
        lines.push('She stays. She is still talking to me about a collie she put down last spring ' +
          'when the words stop being words and become a shape the note is going through.');
      } else {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Nobody sits with me. I had arranged that over the preceding days, ' +
          'in a number of small decisions that each seemed reasonable at the time.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('My last wholly private thought isn\u2019t about June, or the photo strip, ' +
        'and I have no time left to resent that.');
      lines.push('It is about a shopping list in a chemist\u2019s coat pocket. ' +
        '<em>Milk. Bin bags. Ring Mum.</em>');
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
    blurb: 'It was not the hum in the end. It was blood loss, and exhaustion, and one more thing asked of a body that had nothing left.',
    tease: 'Finished. Failing. Coming apart. Badly used.',
    place: 'Where I fell',
    text: function (s) {
      var lines = [
        'In the end it isn\u2019t the hum, which is its own small insult.',

        'It is blood loss, and six weeks on three hundred calories a day, and a graze that went ' +
        'bad four days ago, and one more thing asked of a body that had already said no twice ' +
        'and been overruled.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.alive('odile')) {
        lines.push('Odile works on me for forty minutes with what she has: a boning knife, ' +
          'a bottle of grain alcohol and thirty years\u2019 experience on the wrong species.');
        lines.push('She is very good. <span class="said">"In a hospital you would live,"</span> ' +
          'she says. It is not a consolation, and she does not offer it as one.');
      }
      if (s.alive('wren')) {
        lines.push('Wren holds my hand in both of hers and doesn\u2019t write anything. ' +
          'Nothing on a pharmacy pad would be any use here, ' +
          'and she has always known that sooner than the rest of us.');
      }
      if (s.alive('bram')) {
        lines.push('Bram stands in the doorway with his back to the room, watching the road. ' +
          '<span class="said">"I\u2019ve got the door,"</span> he says.');
      }
      if (s.partyCount() === 0) {
        lines.push('There is nobody. I saw to that myself, ' +
          'one reasonable-seeming decision at a time.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I thought I would be frightened. I am not, and I want that written down ' +
        'for whoever finds this.');
      lines.push('What I can still see is a shopping list, four frames from a ' +
        'photo booth at a county fair, and how little a seventy-one-year-old man weighed ' +
        'with his arm across my shoulders.');
      lines.push('Day ' + s.day + '. There is hardly any room left on this page.');
      return lines;
    }
  });
})();
