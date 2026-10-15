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
    blurb: 'You burned St Amaranth Mercy with everyone in it, and the county could see it for two days.',
    tease: 'Something in this county still has a generator and a full tank of diesel.',
    place: 'The north field',
    text: function (s) {
      var lines = [
        'The generator is behind the kitchens and it has four hundred litres of diesel in a bunded ' +
        'tank, and a hospital is a building full of oxygen cylinders, and you do not have to be ' +
        'clever about any of it.'
      ];
      if (s.flag('allyKnowsBurn')) {
        lines.push('The woman with the sponge does the east wing doors herself. She does the mouths ' +
          'one last time first — all ninety-four, which takes her two hours and eleven minutes, ' +
          'and nobody hurries her, and then she comes out and nods once and does not look back.');
      } else {
        lines.push('Nobody stops you. That is the thing that will sit with you longest. ' +
          'Forty members of staff watch a stranger walk out of the east wing with a jerrycan ' +
          'and not one of them puts a hand out, because every one of them has been waiting ' +
          'for somebody from outside to take the decision off them.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It goes up at ten past five. The windows go first, all along the east wing, ' +
        'one after another down the row like a line of applause.');
      lines.push('And for about ninety seconds, over the noise of it, you can hear ' +
        'ninety-four people holding a note, going up the scale together, exactly the way ' +
        'the lorry did.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('Then the roof falls into the ward and the note stops, and you are standing ' +
        'in a cold field at dawn watching the only light in the county go out, ' +
        'and the last nine doses of the only cure on earth go with it.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.flag('readTheLastPage')) {
        lines.push('She wrote that the yield was finished. Nine weeks at the outside. ' +
          'You have burned nine weeks and ninety-four people and a chapel full of wedding rings, ' +
          'and the arithmetic says you were very nearly right.');
        lines.push('<em>Very nearly</em> is going to have to be enough, because it is what you have.');
      } else {
        lines.push('You never did find out how many weeks were left in it. ' +
          'That is the part you will go back to. Not the fire, not the note \u2014 ' +
          'the not knowing, which you chose, and which you could have ended with one more question.');
      }
      lines.push('The county can see it for two days. People come to the ridge to look at it ' +
        'the way people used to go and look at the sea.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 2 */
  S.ending({
    id: 'end_matron',
    title: 'The Fourth Column',
    kicker: 'An ending \u00b7 the chair',
    tag: 'THE LEDGER KEEPER',
    blurb: 'You took the chair, and you kept the book, and you wrote in the fourth column every night before you slept.',
    tease: 'Somebody has to sign the forms. There is a chair, and a kettle, and a hockey team from 1991.',
    place: "The Matron's office",
    text: function (s) {
      var lines = [
        'She hands it over the way you would hand over a dog you could no longer walk. ' +
        'The keys, the index, the rota, the names of the four who would help you and ' +
        'the two who would not.',

        '<span class="said">"You will want to change things," </span>she says. ' +
        '<span class="said">"Do. Most of what I built was built in a fortnight by a frightened woman. ' +
        'But keep the mouths. Whatever else goes, keep the mouths."</span>',

        'She leaves the next morning with a bag and a stick and does not say where, ' +
        'and the lad on the gate cries, and she tells him not to be silly, ' +
        'and then she is a shape on the lime avenue and then she is nothing.',

        { c: 'sep', t: '\u2042' },

        'You run St Amaranth Mercy for nine weeks and four days.',

        'You do it properly. You do it better than she did, in several measurable ways, ' +
        'and that is the thing you will have to carry: you were <em>good at it</em>. ' +
        'The yields hold up a fortnight longer than her projection because you move the draws to ' +
        'the evening. You get the rations fair. You stop the conversions on the eleventh day ' +
        'and then, on the twenty-sixth day, with a nine-year-old on a trolley and no doses left, ' +
        'you start them again.',

        'You write in the fourth column every night before you sleep. ' +
        'She was right that it is the only thing that helps. She did not mention that it ' +
        'also makes it possible to continue.'
      ];
      if (s.alive('wren')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Wren leaves in the sixth week. She does not do it dramatically. ' +
          'She leaves the pad on your desk, open, with one line on it.');
        lines.push({ c: 'whisper', t: 'you said youd find me a door that locks from the inside' });
        lines.push({ c: 'whisper', t: 'you found one. you just stood on the wrong side of it' });
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The last vial goes into a stranger on day sixty-six. ' +
        'After that St Amaranth Mercy is ninety-four people in beds, a generator, ' +
        'and the forty of you who have made yourselves into the sort of people who did this.');
      lines.push('You keep the mouths. You keep them for a long time.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 3 */
  S.ending({
    id: 'end_ledger',
    title: 'Nine Hundred Names',
    kicker: 'An ending \u00b7 the record',
    tag: 'THE WITNESS',
    blurb: 'You carried the book out and spent what was left of your life making people read it.',
    tease: 'Nine hundred names in a neat hand, each with a date and a yield.',
    place: 'The road west',
    text: function (s) {
      var lines = [
        'You walk out of St Amaranth Mercy at dawn with four inches of hardbacked ledger ' +
        'inside your coat and nobody tries to stop you, because the woman who wrote it ' +
        'has been waiting two months for somebody to take it away from her.'
      ];
      if (s.flag('tookTheEffects')) {
        lines.push('You take the chapel table too. Nine hundred watches and rings and hair slides ' +
          'in four pillowcases, which is the heaviest and stupidest and most necessary load ' +
          'anybody has carried out of that building.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It turns out that the world does not end all at once, and that pockets of it ' +
        'go on having meetings.');
      lines.push('You find the first one in Cleveholt in the spring: two hundred people, ' +
        'a working mill, a committee. You stand up in a church hall and you read out ' +
        'forty-one names and dates and yields, and then you read out the fourth column, ' +
        'and a man near the back stands up and asks the only question that matters.');
      lines.push('<span class="said">"Did it work?"</span>');
      lines.push('And you have to say yes. Every single time, in every hall, for the rest of ' +
        'your life, you have to say <em>yes, it worked</em>, and watch the room do the ' +
        'arithmetic in front of you.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Three of them vote to build one.');
      lines.push('You stop them twice. The third time you are sixty miles away and you only ' +
        'hear about it in the autumn, and by then there is a ward in a converted school ' +
        'with eleven beds in it and a woman doing the mouths.');
      lines.push('The book does not stop anything. The book only means that it happens ' +
        'with the names written down.');
      lines.push('You decide, eventually, that this is not nothing. ' +
        'It takes you four years to decide it.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 4 */
  S.ending({
    id: 'end_boat_together',
    title: 'The Water Is A Wall',
    kicker: 'An ending \u00b7 the tide',
    tag: 'OUT ON THE TIDE',
    blurb: 'You got what was left of them onto the water, and the water held.',
    tease: 'They stop at the edge of it. Wren watched. Wren was right.',
    place: 'LUCKY II',
    text: function (s) {
      var names = survivors(s);
      var lines = [
        'The brass barrel takes the key and the key turns and a forty-year-old diesel inboard ' +
        'catches on the fourth attempt, and the sound of it across that water at five in the ' +
        'morning is the single loudest and most magnificent noise in the history of the world.'
      ];
      lines.push('Both banks fill up. Of course they do. Hundreds of them, out of the reeds, ' +
        'out of the boatyards, down the slipway \u2014 and they stop at the waterline exactly ' +
        'as Wren said they would, shin-deep, facing you, holding the note as you go past.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('It follows you for two miles. It is the last you hear of the town.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (names.length) {
        lines.push('There are ' + (names.length + 1) + ' of you on a twenty-six foot boat: ' +
          names.join(', ') + ', and you.');
      }
      if (s.alive('wren')) {
        lines.push('Wren sits in the bow the whole way out with her face into the wind, ' +
          'and about a mile past the harbour wall she turns round and says something.');
        lines.push('Out loud. With her voice. It is cracked and ugly and about four words long ' +
          'and the engine is too loud for anybody to hear a syllable of it.');
        lines.push({ c: 'whisper', t: 'She refuses, then and ever afterwards, to repeat it.' });
      }
      if (s.alive('odile')) {
        lines.push('Odile finds the half bottle of supermarket ros\u00e9 in the galley locker ' +
          'and opens it at six in the morning and pours it into four enamel mugs without asking ' +
          'anybody whether they want any.');
      }
      if (s.alive('bram')) {
        lines.push('Bram asks, once, about the road east to Thornbury, and then looks at the water ' +
          'and does not ask again that day. He asks again in a week. You will go. ' +
          'Not yet, but you will go.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The estuary opens out at about seven. The sky over the sea is the ordinary ' +
        'pink of an ordinary morning in an ordinary year, and three-quarters of a tank is ' +
        'enough to get somewhere, and nobody on this boat knows where, and for the first time ' +
        'in forty-four days that is a <em>pleasant</em> thing not to know.');
      lines.push('There is no hum out here. There is just water, and an engine, ' +
        'and the sound of people not holding their breath.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 5 */
  S.ending({
    id: 'end_boat_alone',
    title: 'Three Quarters Of A Tank',
    kicker: 'An ending \u00b7 the tide',
    tag: 'ALONE ON THE WATER',
    blurb: 'You made it onto the water. There was nobody left to make it with you.',
    tease: 'A boat that takes four people is a very large boat for one.',
    place: 'LUCKY II',
    text: function (s) {
      var lines = [
        'The key turns. The engine catches on the fourth attempt. You take a twenty-six foot ' +
        'cabin cruiser down a black river at five in the morning entirely on your own.',

        'Both banks fill up and hold the note and stop at the waterline, and you go past them ' +
        'close enough to see faces, and it costs you nothing at all, because there is nobody ' +
        'aboard whose hand you have to hold while it happens.',

        { c: 'hum', t: 'h m m m m m m m' },

        { c: 'sep', t: '\u2042' },

        'There are two berths in the cabin. There is a child\u2019s armband in the locker. ' +
        'There is a paperback swollen with damp and a half bottle of supermarket ros\u00e9 ' +
        'that you do not open, that night or any other night, and which is still in the locker ' +
        'two years later.',

        'You are very good at being alone. That turns out to be the thing you were best at ' +
        'the whole time, and you did not find it out until there was nobody left to test it on.'
      ];
      if (s.deaths.length) {
        lines.push('You lost ' + s.deaths.length + ' of them. You could tell anybody the order, ' +
          'and the hour, and what the weather was doing, and what you chose.');
      }
      if (s.has('photo')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Somewhere past the harbour wall you take out four frames of a photo booth at ' +
          'a county fair \u2014 you and June, laughing, laughing, laughing, blurred \u2014 ' +
          'and you hold it, and you do not put it in the water, which you had half intended to do.');
        lines.push('You say her name out loud over an engine, to nobody, and it is the first time ' +
          'in a long time, and there is nobody aboard to pretend not to hear it.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The estuary opens at seven. Three quarters of a tank is enough to get somewhere.');
      lines.push('There is no hum out here. There is nothing out here. ' +
        'You find, over the following weeks, that you cannot always tell the difference, ' +
        'and that you have stopped minding, and that the stopping-to-mind was the part ' +
        'you should have been frightened of all along.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 6 */
  S.ending({
    id: 'end_mercy_teddy',
    title: 'A Reason For Good Things',
    kicker: 'An ending \u00b7 the compact',
    tag: 'THE PROMISE KEPT',
    blurb: 'You carried him the whole way, and when he said it was time, you did not argue.',
    tease: 'I want to be the one who says so, and I want one of you to not argue with me.',
    place: 'LUCKY II',
    text: function (s) {
      var lines = [
        'Teddy Alafuzo gets onto a boat under his own power on the morning of day forty-four, ' +
        'which Odile will tell you afterwards was not medically possible, ' +
        'and which he does anyway, with one hand on the guard rail and both of you pretending ' +
        'not to be watching.',

        'The engine catches on the fourth attempt. The banks fill up and hold the note ' +
        'and stop at the water.',

        { c: 'hum', t: 'h m m m m m m m' },

        { c: 'sep', t: '\u2042' },

        'He lasts six days. They are good days, in the way that only days like that can be: ' +
        'no decisions in them, nothing to carry, an engine doing the walking.',

        'On the fourth day he conducts. Sitting in the cockpit with a blanket over his knees, ' +
        'both hands up, eyes shut, working through something from memory for about four minutes ' +
        'while the rest of you watch forty years of a man\u2019s life happen in an empty pair of hands.'
      ];
      if (s.alive('wren')) {
        lines.push('Wren hums for him. Quietly, badly, off the note \u2014 ' +
          'the first sound she has made on purpose in forty-four days \u2014 ' +
          'and he does not stop or open his eyes, he just brings her in with two fingers ' +
          'on the second bar, the way you would with a nervous chorister, ' +
          'and keeps going as if he had been expecting her.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('On the sixth evening he says it is time, and he says it in those words, ' +
        'and he looks at you.');
      lines.push('And you do not argue.');
      lines.push('That is the whole of it. That is the thing you carried four miles through ' +
        'a dead city and did not put down: <em>you do not argue</em>. ' +
        'You hold his hand and you let a seventy-one-year-old man be the one who says so, ' +
        'and it takes about an hour, and it is quiet, and it is on the water, ' +
        'and nobody in the world is coming for the sound of it.');
      if (s.has('morphine') || s.flag('odileKeepsMorphine')) {
        lines.push('Odile has the ampoule she has been carrying since Ferry Street. ' +
          'She asks him first. He says yes. She does it properly and she cries afterwards ' +
          'in the cabin where she thinks nobody can hear, and everybody can hear.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('You put him over the side at dawn off a sandbank with the sun coming up ' +
        'the colour of the inside of a shell.');
      lines.push('He was not the reason for anything. You made sure of it. ' +
        'Of everything you did after the eleventh of April, that is the one you would do again ' +
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
    blurb: 'You walked out with every dose that will ever exist, and that made you the hospital.',
    tease: 'Nine vials in a rack in a cold cabinet. There will never be any more.',
    place: 'The lime avenue',
    text: function (s) {
      var lines = [
        'Nine vials in a grey rubber tray, in a cold cabinet, in a hospital with a falling yield. ' +
        'You put all nine in your coat and you walk down the lime avenue and nobody stops you.',

        'Matron watches you go from the steps with a mug of tea and does not say a word, ' +
        'and the not-saying is a judgement so complete that you feel it in the back of your neck ' +
        'for four hundred yards.',

        { c: 'sep', t: '\u2042' },

        'Here is what you did not understand on the avenue, and what you understand ' +
        'perfectly well by the end of the first month:',

        'You did not take nine doses of medicine. You took the <em>supply</em>. ' +
        'And a person who holds the entire remaining supply of the only thing that works ' +
        'is not a person with nine vials in their coat. They are an institution. ' +
        'They are a triage desk with legs.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('You give the first one away in a week, to a boy on the Hawksmoor Road, ' +
        'and it is the easiest thing you have ever done.');
      lines.push('You give the second one away in a month.');
      lines.push('You do not give the third one away, because by then you have learned ' +
        'to ask yourself whether somebody better might come along, ' +
        'and the answer to that question is always <em>possibly</em>, ' +
        'and <em>possibly</em> is how you end up with six vials in a coat two years later ' +
        'and a list in your head of every person you walked past.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('There is a word for what you became and you worked it out eventually, ' +
        'in a church hall in Cleveholt, listening to a committee argue about a converted school.');
      lines.push('You became Matron. Without the building, without the ledger, ' +
        'without the fourth column to write in at night.');
      lines.push('<em>Without the fourth column.</em> That is the part she would want you ' +
        'to notice. She wrote hers down. You never wrote a single one of yours down, ' +
        'and so there is no book anywhere that says what you decided, ' +
        'and no one will ever read out your name in a church hall.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 8 */
  S.ending({
    id: 'end_ward',
    title: 'Bed Ninety-Five',
    kicker: 'An ending \u00b7 verbal, witnessed',
    tag: 'THE VOLUNTEER',
    blurb: 'You signed the form, and they put you in the bed, and they were kind about it the whole way.',
    tease: 'CONSENT: VERBAL, WITNESSED (2). COMPENSATION: FAMILY PLACED, EAST BLOCK.',
    place: 'Ward 11',
    text: function (s) {
      var names = survivors(s);
      var lines = [
        'Matron does not try to talk you out of it, which you had expected her to do, ' +
        'and which she does not do because she has learned that it is a kind of theatre ' +
        'that only makes it worse.',

        'She reads you the whole thing instead. Twice. What it will be like at the start, ' +
        'what it will be like in the middle, how long, what it will feel like when the hum ' +
        'gets into the bone, what you will and will not be aware of by the second week.',

        'She does not shade a word of it. She never does.'
      ];
      if (names.length) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('The compensation is real and it is written down: ' + names.join(', ') +
          ' placed in the east block, Category A rations, for as long as this building stands.');
        lines.push('They have to witness it. That is the rule and she will not bend it. ' +
          'Two signatures from people who know you.');
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
        'and then did the work, and that is the last clear thought you have that is entirely ' +
        'your own shape.');
      lines.push('They do the mouths twice a day. They talk to you about the weather and the ' +
        'generator and a man called Pav who has lost his boots. ' +
        'They open the window when you like the window open.');
      lines.push('You are bed ninety-five. You yield eleven units, which is good, ' +
        'which is very good, which is nearly Dennis Holloway.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('Somebody writes your name in a ledger in a neat hand, with a date and a yield, ' +
        'and that night, before she sleeps, she fills in the fourth column.');
      lines.push('For you, she writes: <em>NO.</em>');
      lines.push('And under it: <em>MINE.</em>');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 9 */
  S.ending({
    id: 'end_door',
    title: 'A Door That Locks From The Inside',
    kicker: 'An ending \u00b7 the room',
    tag: 'THE DOOR',
    blurb: 'You found her the door. You let her be the one who locked it.',
    tease: 'and i want to be the one who locks it',
    place: 'Somewhere with a door',
    text: function (s) {
      var lines = [
        'It is a Methodist chapel hall eleven miles north with a cellar under it, ' +
        'a cast-iron door at the top of the cellar stairs, and a bolt on the inside ' +
        'that somebody fitted in about 1950 for reasons that had nothing to do with any of this.'
      ];
      lines.push('You do not find it quickly. It takes nine days and it costs you ' +
        'the last of the tinned soup and most of the skin off both hands.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('But you find it. And you stand back. And you let Wren go up the steps first ' +
        'and put her hand on the bolt, and you watch a fourteen-year-old girl look at a piece ' +
        'of iron for a long moment before she slides it across.');
      lines.push('It makes a good sound. A heavy, stupid, completely final sound, ' +
        'the sound of a thing designed by somebody who assumed the world would go on being ordinary.');
      lines.push({ c: 'whisper', t: 'She writes on the pad and holds it up, and she is crying, ' +
        'and she is also doing something with her face that neither of you have seen in forty-four days.' });
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
          'nine-year-old asthmatic girl on his shoulders and a face you have not seen on him ' +
          'and will not see again, and he says only: <span class="said">"The grandmother had ' +
          'a cellar and a shotgun."</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It is not safety. You are not confused about that. ' +
        'The hum is still out there and the yield at St Amaranth Mercy has nine weeks in it ' +
        'and then there is no cure on this earth at all.');
      lines.push('But there is a cellar with a cast-iron door, and the bolt is on the inside, ' +
        'and the person who decides whether it is open or shut is a fourteen-year-old girl ' +
        'who has not got her voice back yet and who is, for the first time since the third day, ' +
        'not frightened in the particular way she was frightened before.');
      lines.push('You did one thing you said you would do. One, out of all of it.');
      return lines;
    }
  });

  /* ---------------------------------------------------------- 10 */
  S.ending({
    id: 'end_hush',
    title: 'It Was Never An Infection',
    kicker: 'An ending \u00b7 the note',
    tag: 'THE RECRUITMENT',
    blurb: 'You stopped holding it down. It had been very patient with you.',
    tease: 'It is not an infection. It is a recruitment.',
    place: 'The lime avenue',
    text: function (s) {
      var lines = [
        'You walk out of the gates and down the avenue and off the gravel onto the wet grass, ' +
        'and about two hundred yards along, where the limes end, you stop holding it down.',

        'That is all it takes. It is not a surrender and it is not a fall. ' +
        'It is the precise sensation of putting down a bag you have been carrying so long ' +
        'that your arm had stopped reporting it.',

        { c: 'hum', t: 'h m m m m m m m' },

        'The note comes up out of you low and even and goes on and on without any apparent ' +
        'need for breath, and within about four minutes they begin to arrive out of the dark ' +
        'from every direction, unhurried, the way people come in off a platform.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Here is the thing nobody outside the note has ever been able to find out, ' +
        'and which you understand immediately and completely and without a single word:');
      lines.push('They are not hunting. They never were. They are <em>assembling</em>.');
      lines.push('Every one of them is holding a position in something enormous and unfinished ' +
        'that has been under construction since nine seconds past the eleventh of April, ' +
        'and the humming is not a sound, it is <em>load-bearing</em>, ' +
        'and the reason they stand in trailers and culverts and shallow water facing walls ' +
        'is that they are exactly where they need to be.');
      lines.push('There is a shape. You can feel the whole of it from inside, ' +
        'the way you can feel a cathedral with your eyes shut.');
      lines.push('It is about eleven weeks from finished.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.partyCount() > 0) {
        lines.push('Somebody is shouting your name from the hospital steps. ' +
          'You can hear it perfectly. You can hear every heartbeat on that gravel, ' +
          'and the generator behind the kitchens, and ninety-four of your own voices ' +
          'two rooms away, all holding the note, all exactly on it.');
        lines.push('You do not go back. Not because you have lost anything \u2014 ' +
          'you have not lost one single thing, you can account for all of it, ' +
          'you simply no longer rank it above the work.');
      }
      lines.push('By morning you are standing in eight inches of water in a culvert, ' +
        'facing a wall, in exactly the right place.');
      lines.push('It is the first time since the Hush that you are not the slightest bit afraid.');
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
    tease: 'The hum, in the bone. Most of you is still yours. Nearly theirs.',
    place: 'Wherever you were standing',
    text: function (s) {
      var lines = [
        'It does not happen the way you had been quietly dreading, which was teeth, ' +
        'and a moment, and somebody\u2019s face going wrong above you.',

        'It happens one room at a time, from the inside, reporting itself.',

        'The back teeth. The jaw. The sinuses. The long bones of the arms. ' +
        'The floor of the pelvis. Places you did not know it had got to, ' +
        'going over one after another like lights in a house.'
      ];
      if (s.alive('odile')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('Odile sees it before you say anything, because Odile sees everything, ' +
          'and she does not back away, and she does not reach for her coat pocket.');
        lines.push('<span class="said">"Sit down," </span>she says. ' +
          '<span class="said">"I am going to stay. You do not have to talk."</span>');
        lines.push('She stays. She is still talking to you about a collie she put down last spring ' +
          'when the words stop being words and become a shape the note is going through.');
      } else {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('There is nobody with you. You had arranged that, over the preceding days, ' +
          'in a number of small decisions that each seemed reasonable at the time.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The last entirely private thought you have is not about June and it is not ' +
        'about the photo strip, and the unfairness of that is something you have no time ' +
        'left to resent.');
      lines.push('It is about a shopping list in a chemist\u2019s coat pocket. ' +
        '<em>Milk. Bin bags. Ring Mum.</em>');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('And then you are standing somewhere facing a wall, in exactly the right place, ' +
        'and you are part of something eleven weeks from finished, ' +
        'and the last of you that was ever going to be frightened has already stopped.');
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
    place: 'Wherever you fell',
    text: function (s) {
      var lines = [
        'In the end it is not the hum at all, which is its own small insult.',

        'It is blood loss, and six weeks of three hundred calories a day, and a graze that went ' +
        'filthy four days ago, and one more thing asked of a body that had already said no twice ' +
        'and been overruled.'
      ];
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.alive('odile')) {
        lines.push('Odile works on you for forty minutes with what she has, which is a boning knife, ' +
          'a bottle of grain alcohol and thirty years of experience on the wrong species.');
        lines.push('She is very good. In a hospital you would live. ' +
          'That is not a consolation and she does not offer it as one.');
      }
      if (s.alive('wren')) {
        lines.push('Wren holds your hand with both of hers and does not write anything, ' +
          'because there is nothing on a pharmacy pad that would be any use here, ' +
          'and she has always been better than the rest of you at knowing that.');
      }
      if (s.alive('bram')) {
        lines.push('Bram stands in the doorway with his back to the room and watches the road, ' +
          'which is the only thing he has ever known how to do for anybody, ' +
          'and he does it for nine hours.');
      }
      if (s.partyCount() === 0) {
        lines.push('There is nobody. You had arranged that, in a number of small decisions ' +
          'that each seemed reasonable at the time.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('It is not frightening. That is worth writing down somewhere, ' +
        'for whoever comes next: at the very end of it the fear goes out first, ' +
        'well before anything else, like staff leaving a building.');
      lines.push('What is left after the fear goes is a shopping list, and four frames of a ' +
        'photo booth at a county fair, and the particular weight of a seventy-one-year-old man ' +
        'with an arm over your shoulder who weighed almost nothing at all.');
      lines.push('Forty-four days. You got four miles.');
      return lines;
    }
  });
})();
