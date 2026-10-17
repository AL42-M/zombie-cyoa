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
    blurb: 'I burned St Amaranth Mercy with everyone in it, and the county could see the smoke for two days.',
    tease: 'Something in this county still has a generator and a full tank of diesel.',
    place: 'The north field',
    text: function (s) {
      var lines = [
        'The generator is behind the kitchens and it has four hundred litres of diesel in a bunded ' +
        'tank, and a hospital is a building full of oxygen cylinders, and I do not have to be ' +
        'clever about any of it.'
      ];
      if (s.flag('allyKnowsBurn')) {
        lines.push('The woman with the sponge does the east wing doors herself. She does the mouths ' +
          'one last time first — all ninety-four, which takes her two hours and eleven minutes, ' +
          'and nobody hurries her, and then she comes out and nods once and does not look back.');
      } else {
        lines.push('Nobody stops me. That is the thing that will sit with me longest. ' +
          'Forty members of staff watch a stranger walk out of the east wing with a jerrycan ' +
          'and not one of them puts a hand out, because every one of them has been waiting ' +
          'for somebody from outside to take the decision off them.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It catches at ten past five. I see the first window break from the north field. ' +
        'Then the others go, one after another along the east wing.');
      lines.push('And for about ninety seconds, over the noise of it, I can hear ' +
        'ninety-four people holding a note, going up the scale together, exactly the way ' +
        'the lorry did.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('Then the roof falls into the ward and the note stops, and I am standing ' +
        'in a cold field at dawn watching the only light in the county go out, ' +
        'and the last nine doses of the only cure on earth go with it.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.flag('readTheLastPage')) {
        lines.push('She wrote that the yield was finished. Nine weeks at the outside. ' +
          'I have burned nine weeks and ninety-four people and a chapel full of wedding rings, ' +
          'and the arithmetic says I was very nearly right.');
        lines.push('<em>Very nearly</em> is going to have to be enough, because it is what I have.');
      } else {
        lines.push('I never did find out how many weeks were left in it. ' +
          'That is the part I will go back to. Not the fire, not the note \u2014 ' +
          'the not knowing, which I chose, and which I could have ended with one more question.');
      }
      lines.push('Smoke hangs over the county for two days. People come to the ridge to watch. ' +
        'I cannot tell whether they know what was inside.');
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
        'She hands it over the way I would hand over a dog I could no longer walk. ' +
        'The keys, the index, the rota, the names of the four who would help me and ' +
        'the two who would not.',

        '<span class="said">"You will want to change things," </span>she says. ' +
        '<span class="said">"Do. Most of what I built was built in a fortnight by a frightened woman. ' +
        'But keep the mouths. Whatever else goes, keep the mouths."</span>',

        'She leaves the next morning with a bag and a stick and does not say where, ' +
        'and the lad on the gate cries, and she tells him not to be silly, ' +
        'and then she is a shape on the lime avenue and then she is nothing.',

        { c: 'sep', t: '\u2042' },

        'I run St Amaranth Mercy for nine weeks and four days.',

        'I do it properly. I do it better than she did, in several measurable ways, ' +
        'and that is the thing I will have to carry: I was <em>good at it</em>. ' +
        'The yields hold up a fortnight longer than her projection because I move the draws to ' +
        'the evening. I get the rations fair. I stop the conversions on the eleventh day ' +
        'and then, on the twenty-sixth day, with a nine-year-old on a trolley and no doses left, ' +
        'I start them again.',

        'I write in the fourth column every night before I sleep. ' +
        'She was right that it is the only thing that helps. She did not mention that it ' +
        'also makes it possible to continue.'
      ];
      if (s.alive('wren')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Wren leaves in the sixth week. She does not do it dramatically. ' +
          'She leaves the pad on my desk, open, with one line on it.');
        lines.push({ c: 'whisper', t: 'you said youd find me a door that locks from the inside' });
        lines.push({ c: 'whisper', t: 'you found one. you just stood on the wrong side of it' });
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('By the sixth week the last vial is long gone. St Amaranth Mercy is ' +
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
        'I walk out of St Amaranth Mercy at dawn with four inches of hardbacked ledger ' +
        'inside my coat and nobody tries to stop me, because the woman who wrote it ' +
        'has been waiting two months for somebody to take it away from her.'
      ];
      if (s.flag('tookTheEffects')) {
        lines.push('I take the chapel table too. Nine hundred watches and rings and hair slides ' +
          'in four pillowcases, which is the heaviest and stupidest and most necessary load ' +
          'anybody has carried out of that building.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push({ c: 'dateline', t: 'The following spring' });
      lines.push('It turns out that the world does not end all at once, and that pockets of it ' +
        'go on having meetings.');
      lines.push('I find the first one in Cleveholt: two hundred people, ' +
        'a working mill, a committee. I stand up in a church hall and I read out ' +
        'forty-one names and dates and yields, and then I read out the fourth column, ' +
        'and a man near the back stands up and asks the only question that matters.');
      lines.push('<span class="said">"Did it work?"</span>');
      lines.push('And I have to say yes. Every single time, in every hall, for the rest of ' +
        'my life, I have to say <em>yes, it worked</em>, and watch the room do the ' +
        'arithmetic in front of me.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Three of them vote to build one.');
      lines.push('I stop them twice. The third time I am sixty miles away and I only ' +
        'hear about it in the autumn, and by then there is a ward in a converted school ' +
        'with eleven beds in it and a woman doing the mouths.');
      lines.push('The book does not stop anything. The book only means that it happens ' +
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
        'The brass barrel takes the key and the key turns and a forty-year-old diesel inboard ' +
        'catches on the fourth attempt, and the sound of it across that water at five in the ' +
        'morning is the single loudest and most magnificent noise in the history of the world.'
      ];
      if (!s.flag('knowsBoat')) {
        lines.unshift('The keys lead me downriver to a sailing club. I find LUCKY II ' +
          'among the boats tied to the slip.');
      }
      lines.push('Both banks fill up. Of course they do. Hundreds of them, out of the reeds, ' +
        'out of the boatyards, down the slipway \u2014 and they stop at the waterline exactly ' +
        'as Wren said they would, shin-deep, facing me, holding the note as I go past.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('It follows me for two miles. It is the last I hear of the town.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (names.length) {
        lines.push('There are ' + (names.length + 1) + ' of us on a twenty-six foot boat: ' +
          names.join(', ') + ', and I.');
      }
      if (s.alive('wren')) {
        lines.push('Wren sits in the bow the whole way out with her face into the wind, ' +
          'and about a mile past the harbour wall she turns round and says something.');
        lines.push('Out loud. With her voice. It is cracked and ugly and about four words long ' +
          'and the engine is too loud for me to hear a syllable of it.');
        lines.push({ c: 'whisper', t: 'She refuses, then and ever afterwards, to repeat it.' });
      }
      if (s.alive('odile')) {
        lines.push('Odile finds the half bottle of supermarket ros\u00e9 in the galley locker ' +
          'and opens it at six in the morning. She sets out enough enamel mugs for everyone aboard.');
      }
      if (s.alive('bram')) {
        lines.push('Bram asks, once, about the road east to Thornbury, and then looks at the water ' +
          'and does not ask again that day. He asks again in a week. I will go. ' +
          'Not yet, but I will go.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The estuary opens out at about seven. The sky over the sea is the ordinary ' +
        'pink of an ordinary morning in an ordinary year, and three-quarters of a tank is ' +
        'enough to get somewhere, and nobody on this boat knows where, and for the first time ' +
        'since the Hush that is a <em>pleasant</em> thing not to know.');
      lines.push('When the banks are out of sight the hum is gone. I hear water against the hull, ' +
        'the engine, and the people aboard letting their breath out.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 5 */
  S.ending({
    id: 'end_boat_alone',
    title: 'Three Quarters Of A Tank',
    kicker: 'An ending \u00b7 the tide',
    tag: 'ALONE ON THE WATER',
    blurb: 'I made it onto the water. There was nobody left to make it with me.',
    tease: 'A boat that takes four people is a very large boat for one.',
    place: 'LUCKY II',
    text: function (s) {
      var lines = [
        'The key turns. The engine catches on the fourth attempt. I take a twenty-six foot ' +
        'cabin cruiser down a black river at five in the morning entirely on my own.',

        'Both banks fill up and hold the note and stop at the waterline, and I go past them ' +
        'close enough to see faces. There is nobody ' +
        'aboard whose hand I have to hold while it happens.',

        { c: 'hum', t: 'h m m m m m m m' },

        { c: 'sep', t: '\u2042' },

        'There are two berths in the cabin. There is a child\u2019s armband in the locker. ' +
        'There is a paperback swollen with damp and a half bottle of supermarket ros\u00e9 ' +
        'that I do not open, that night or any other night, and which is still in the locker ' +
        'two years later.',

        'I am very good at being alone. That turns out to be the thing I was best at ' +
        'the whole time, and I did not find it out until there was nobody left to test it on.'
      ];
      if (!s.flag('knowsBoat')) {
        lines.unshift('I search the sailing club until I find LUCKY II, with the foam fish ' +
          'on my key fob matching the name on its stern.');
      }
      if (s.deaths.length) {
        lines.push('I lost ' + s.deaths.length + ' of them. I could tell anybody the order, ' +
          'and the hour, and what the weather was doing, and what I chose.');
      }
      if (s.has('photo')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Somewhere past the harbour wall I take out four frames of a photo booth at ' +
          'a county fair \u2014 June and me, laughing in the first three and blurred in the last \u2014 ' +
          'and I hold it, and I do not put it in the water, which I had half intended to do.');
        lines.push('I say her name out loud over an engine, to nobody, and it is the first time ' +
          'in a long time, and there is nobody aboard to pretend not to hear it.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The estuary opens at seven. Three quarters of a tank is enough to get somewhere.');
      lines.push('There is no hum out here. There is nothing out here. ' +
        'I find, over the following weeks, that I cannot always tell the difference, ' +
        'and that I have stopped minding, and that the stopping-to-mind was the part ' +
        'I should have been frightened of all along.');
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
        'Teddy Alafuzo gets onto a boat under his own power on the morning of day ' +
        Math.floor(Number(s.day)) + ', ' +
        'which Odile will tell me afterwards was not medically possible, ' +
        'and which he does anyway, with one hand on the guard rail and both of us pretending ' +
        'not to be watching.',

        'The engine catches on the fourth attempt. The banks fill up and hold the note ' +
        'and stop at the water.',

        { c: 'hum', t: 'h m m m m m m m' },

        { c: 'sep', t: '\u2042' },

        'He lasts six days. They are good days, in the way that only days like that can be: ' +
        'no decisions in them, nothing to carry, an engine doing the walking.',

        'On the fourth day he conducts. Sitting in the cockpit with a blanket over his knees, ' +
        'both hands up, eyes shut, working through something from memory for about four minutes ' +
        'while the rest of us watch forty years of a man\u2019s life happen in an empty pair of hands.'
      ];
      if (!s.flag('knowsBoat')) {
        lines.unshift('At the sailing club I find LUCKY II by the name on the fob, ' +
          'fourth boat along the slip.');
      }
      if (s.alive('wren')) {
        lines.push('Wren hums for him. Quietly, badly, off the note \u2014 ' +
          (s.flag('wrenSpoke')
            ? 'she has not risked her voice since the river path \u2014 '
            : 'the first sound she has made on purpose since the third day \u2014 ') +
          'and he does not stop or open his eyes, he just brings her in with two fingers ' +
          'on the second bar, the way he once did with nervous choristers, ' +
          'and keeps going as if he had been expecting her.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('On the sixth evening he says it is time, and he says it in those words, ' +
        'and he looks at me.');
      lines.push('And I do not argue.');
      lines.push('That is the whole of it. That is the thing I carried four miles through ' +
        'a dead city and did not put down: <em>I do not argue</em>. ' +
        'I hold his hand and I let a seventy-one-year-old man be the one who says so, ' +
        'and it takes about an hour, and it is quiet, and it is on the water, ' +
        'and nobody in the world is coming for the sound of it.');
      if (s.alive('odile') && (s.has('morphine') || s.flag('odileKeepsMorphine'))) {
        lines.push('Odile has the ampoule from Rosco\u2019s. ' +
          'She asks him first. He says yes. She does it properly and she cries afterwards ' +
          'in the cabin where she thinks nobody can hear, and everybody can hear.');
      } else if (s.has('morphine')) {
        lines.push('I have the ampoule from Rosco\u2019s. I ask him first. He says yes.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I put him over the side at dawn off a sandbank with the sun coming up ' +
        'the colour of the inside of a shell.');
      lines.push('He was not the reason for anything. I made sure of it. ' +
        'Of everything I did after the eleventh of April, that is the one I would do again ' +
        'exactly the same way, in the same order, for the same man.');
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
        'Nine vials in a grey rubber tray, in a cold cabinet, in a hospital with a falling yield. ' +
        'I put all nine in my coat and I walk down the lime avenue and nobody stops me.',

        'Matron watches me go from the steps with a mug of tea and does not say a word, ' +
        'and the not-saying is a judgement so complete that I feel it in the back of my neck ' +
        'for four hundred yards.',

        { c: 'sep', t: '\u2042' },

        'Here is what I did not understand on the avenue, and what I understand ' +
        'perfectly well by the end of the first month:',

        'I did not take nine doses of medicine. I took the <em>supply</em>. ' +
        'And a person who holds the entire remaining supply of the only thing that works ' +
        'is not a person with nine vials in their coat. They are an institution. ' +
        'They are a triage desk with legs.'
      ];
      if (survivors(s).length) {
        lines.push('The others fall into step behind me. I hear the glass knock together inside ' +
          'my coat, and nobody asks what I have taken.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I give the first one away in a week, to a boy on the Hawksmoor Road, ' +
        'and it is the easiest thing I have ever done.');
      lines.push('I give the second one away in a month.');
      lines.push('I do not give the third one away, because by then I have learned ' +
        'to ask myself whether somebody better might come along, ' +
        'and the answer to that question is always <em>possibly</em>, ' +
        'and <em>possibly</em> is how I end up with six vials in a coat two years later ' +
        'and a list in my head of every person I walked past.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('There is a word for what I became and I worked it out eventually, ' +
        'in a church hall in Cleveholt, listening to a committee argue about a converted school.');
      lines.push('I became Matron. Without the building, without the ledger, ' +
        'without the fourth column to write in at night.');
      lines.push('<em>Without the fourth column.</em> That is the part she would want me ' +
        'to notice. She wrote hers down. I never wrote a single one of mine down, ' +
        'and so there is no book anywhere that says what I decided, ' +
        'and no one will ever read out my name in a church hall.');
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
        'Matron does not try to talk me out of it, which I had expected her to do, ' +
        'and which she does not do because she has learned that it is a kind of theatre ' +
        'that only makes it worse.',

        'She reads me the whole thing instead. Twice. What it will be like at the start, ' +
        'what it will be like in the middle, how long, what it will feel like when the hum ' +
        'gets into the bone, what I will and will not be aware of by the second week.',

        'She does not shade a word of it. She never does.'
      ];
      if (names.length) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('The compensation is real and it is written down: ' + names.join(', ') +
          ' placed in the east block, Category A rations, for as long as this building stands.');
        lines.push('They have to witness it. That is the rule and she will not bend it. ' +
          'Two signatures from people who know me.');
        if (s.alive('odile')) {
          lines.push('Odile signs. Her hand does not shake, because of course it does not, ' +
            'and afterwards she goes out into the north field on her own for two hours.');
        }
        if (s.alive('wren')) {
          lines.push('Wren will not sign. They have to find a man called Pav to do it instead.');
          lines.push({ c: 'whisper', t: 'you promised me a door that locks from the inside' });
          lines.push({ c: 'whisper', t: 'you didnt say youd be the lock' });
        }
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The sheepskin is softer than it looks. Somebody worked out that it had to be, ' +
        'and then did the work. They say they will talk to me while they wash me. ' +
        'I asked them to open the window if I ask for it.');
      lines.push('BED 95 is written above the frame. I can still read it from here.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('Matron has promised to put these pages with the ledger. I did not ask ' +
        'what she would write in the fourth column.');
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
        'It is a Methodist chapel hall eleven miles north with a cellar under it, ' +
        'a cast-iron door at the top of the cellar stairs, and a bolt on the inside ' +
        'that somebody fitted in about 1950 for reasons that had nothing to do with any of this.'
      ];
      if (s.alive('teddy')) {
        lines.push('Teddy comes with us. On the second evening he asks to rest. We stay beside him ' +
          'until he is gone; when we set out in the morning, there is one fewer pair of footsteps.');
      }
      lines.push({ c: 'dateline', t: 'Nine days later' });
      lines.push('The search has cost me the last of the tinned soup and most of the skin ' +
        'off both hands. Wren goes up the steps ahead of me.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I stand back and watch her put her hand on the bolt. She waits a long ' +
        'moment before she slides it across.');
      lines.push('It makes a good sound. A heavy, stupid, completely final sound, ' +
        'the sound of a thing designed by somebody who assumed the world would go on being ordinary.');
      lines.push({ c: 'whisper', t: 'She writes on the pad and holds it up, and she is crying, ' +
        'and she is also doing something with her face I have not seen since the third day.' });
      lines.push({ c: 'whisper', t: 'thats it then' });
      lines.push({ c: 'whisper', t: 'thats the whole thing i wanted' });
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.alive('odile')) {
        lines.push('Odile sets up a surgery on a trestle table and sees eleven people in the ' +
          'first month, because word gets about, and because a woman who can take an arm off ' +
          'cleanly is worth four tins of anything.');
      }
      if (s.alive('bram')) {
        lines.push('Bram goes east in the third week. He comes back in the fifth with a ' +
          'nine-year-old asthmatic girl on his shoulders and a face I have not seen on him ' +
          'and will not see again, and he says only: <span class="said">"The grandmother had ' +
          'a cellar and a shotgun."</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It is not safety. I am not confused about that. ' +
        'The hum is still out there and the yield at St Amaranth Mercy has nine weeks in it ' +
        'and then there is no cure on this earth at all.');
      lines.push('But there is a cellar with a cast-iron door, and the bolt is on the inside, ' +
        'and the person who decides whether it is open or shut is a fourteen-year-old girl ' +
        'who has not got her voice back yet and who is, for the first time since the third day, ' +
        'not frightened in the particular way she was frightened before.');
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
        'I walk out of the gates and down the avenue and off the gravel onto the wet grass, ' +
        'and about two hundred yards along, where the limes end, I stop holding it down.',

        'That is all it takes. It is not a surrender and it is not a fall. ' +
        'It is the precise sensation of putting down a bag I have been carrying so long ' +
        'that my arm had stopped reporting it.',

        { c: 'hum', t: 'h m m m m m m m' },

        'The note comes up out of me low and even and goes on and on without any apparent ' +
        'need for breath, and within about four minutes they begin to arrive out of the dark ' +
        'from every direction, unhurried, the way people come in off a platform.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Here is the thing nobody outside the note has ever been able to find out, ' +
        'and which I understand immediately and completely and without a single word:');
      lines.push('They are not hunting. They never were. They are <em>assembling</em>.');
      lines.push('Every one of them is holding a position in something enormous and unfinished ' +
        'that has been under construction since nine seconds past the eleventh of April, ' +
        'and the humming is not a sound, it is <em>load-bearing</em>, ' +
        'and the reason they stand in trailers and culverts and shallow water facing walls ' +
        'is that they are exactly where they need to be.');
      lines.push('There is a shape. I can feel the whole of it from inside, ' +
        'the way I can feel a cathedral with my eyes shut.');
      lines.push('It is about eleven weeks from finished.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.partyCount() > 0) {
        lines.push('Somebody is shouting my name from the hospital steps. ' +
          'I can hear it perfectly. I can hear every heartbeat on that gravel, ' +
          'and the generator behind the kitchens, and ninety-four of my own voices ' +
          'two rooms away, all holding the note, all exactly on it.');
        lines.push('I do not go back. Not because I have lost anything \u2014 ' +
          'I have not lost one single thing, I can account for all of it, ' +
          'I simply no longer rank it above the work.');
      }
      lines.push('By morning I am standing in eight inches of water in a culvert, ' +
        'facing a wall, in exactly the right place.');
      lines.push('It is the first time since the Hush that I am not the slightest bit afraid.');
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
        lines.push('At the trailer door I stop. Bram still has the back of my coat in his fist. ' +
          'I put my hand over his and loosen his fingers one by one. ' +
          'For a moment we are both holding on.');
        lines.push('He says my name. I hear every part of it. Then I turn toward the people ' +
          'waiting inside, and he does not follow me.');
        lines.push({ c: 'sep', t: '\u2042' });
      }
      lines.push(
        'It does not happen the way I had been quietly dreading, which was teeth, ' +
        'and a moment, and somebody\u2019s face going wrong above me.',

        'It happens one room at a time, from the inside, reporting itself.',

        'The back teeth. The jaw. The sinuses. The long bones of the arms. ' +
        'The floor of the pelvis. Places I did not know it had got to, ' +
        'going over one after another like lights in a house.'
      );
      if (s.alive('odile')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Odile sees it before I say anything, because Odile sees everything, ' +
          'and she does not back away, and she does not reach for her coat pocket.');
        lines.push('<span class="said">"Sit down," </span>she says. ' +
          '<span class="said">"I am going to stay. You do not have to talk."</span>');
        lines.push('She stays. She is still talking to me about a collie she put down last spring ' +
          'when the words stop being words and become a shape the note is going through.');
      } else {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('There is nobody with me. I had arranged that, over the preceding days, ' +
          'in a number of small decisions that each seemed reasonable at the time.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The last entirely private thought I have is not about June and it is not ' +
        'about the photo strip, and the unfairness of that is something I have no time ' +
        'left to resent.');
      lines.push('It is about a shopping list in a chemist\u2019s coat pocket. ' +
        '<em>Milk. Bin bags. Ring Mum.</em>');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('The pencil keeps moving with the note. I have tried to write something else ' +
        'three times. My hand keeps bringing me back to the same word: <em>here</em>.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 12 */
  S.ending({
    id: 'end_body_failed',
    title: 'What The Body Had Left',
    kicker: 'An ending \u00b7 the end of it',
    tag: 'FINISHED',
    blurb: 'It was not the hum in the end. It was blood loss, and exhaustion, and one more thing asked of a body that had none left.',
    tease: 'Finished. Failing. Coming apart. Badly used.',
    place: 'Where I fell',
    text: function (s) {
      var lines = [
        'In the end it is not the hum at all, which is its own small insult.',

        'It is blood loss, and six weeks of three hundred calories a day, and a graze that went ' +
        'filthy four days ago, and one more thing asked of a body that had already said no twice ' +
        'and been overruled.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.alive('odile')) {
        lines.push('Odile works on me for forty minutes with what she has, which is a boning knife, ' +
          'a bottle of grain alcohol and thirty years of experience on the wrong species.');
        lines.push('She is very good. In a hospital I would live. ' +
          'That is not a consolation and she does not offer it as one.');
      }
      if (s.alive('wren')) {
        lines.push('Wren holds my hand with both of hers and does not write anything, ' +
          'because there is nothing on a pharmacy pad that would be any use here, ' +
          'and she has always been better than the rest of us at knowing that.');
      }
      if (s.alive('bram')) {
        lines.push('Bram stands in the doorway with his back to the room and watches the road. ' +
          'He says he will stay there.');
      }
      if (s.partyCount() === 0) {
        lines.push('There is nobody. I had arranged that, in a number of small decisions ' +
          'that each seemed reasonable at the time.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('I thought I would be frightened. I am not, and I want that written down ' +
        'for whoever comes next.');
      lines.push('What I can still picture is a shopping list, and four frames of a ' +
        'photo booth at a county fair, and the particular weight of a seventy-one-year-old man ' +
        'with an arm over my shoulder who weighed almost nothing at all.');
      lines.push('Day ' + s.day + '. There is hardly any space left on this page.');
      return lines;
    }
  });
})();
