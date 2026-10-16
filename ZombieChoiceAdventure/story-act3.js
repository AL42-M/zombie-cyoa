/* ============================================================
   THE HUSH — Act III: St Amaranth Mercy
   We take in all who come.
   ============================================================ */
(function () {
  'use strict';
  var S = window.Story;
  var CH = 'III — We Take In All Who Come';

  function withTeddy(s) { return s.alive('teddy'); }

  /* ---------------------------------------------------------- the front */
  S.add({
    id: 'a3_reception',
    chapter: CH,
    place: 'Reception',
    enter: function (s) { s.set('cameInTheFront'); },
    text: function (s) {
      var lines = [
        'The man in the fleece puts his paperback face-down on the desk and stands up, and he is ' +
        'so ordinary that it is like being struck.',

        '<span class="said">"Evening," </span>he says. <span class="said">"Come in, come in, ' +
        'shut it behind you, the heat gets out. You are the first since Tuesday."</span>',

        'It is warm. That is the thing that gets through my guard before any of the rest of it. ' +
        'It is <em>warm</em>, and there is a radiator ticking, and the floor has been mopped, ' +
        'and somewhere down a corridor a kettle is coming to the boil.'
      ];
      if (withTeddy(s)) {
        lines.push('He looks at Teddy for about a second and a half, and something in his manner ' +
          'adjusts — becomes warmer, becomes <em>kinder</em> — and he comes round the desk ' +
          'with a chair.');
        lines.push('<span class="said">"Sir. Sit down before you fall down. Respiratory?"</span> ' +
          'He says it the way a professional says it. <span class="said">"We can do something ' +
          'about that. Genuinely, we can. Sit."</span>');
      }
      if (s.flag('askedForTeddysBed')) {
        lines.push('I ask for his bed first. The man writes Teddy\u2019s name at the top of the ' +
          'clipboard before he asks mine; Teddy watches the pen instead of looking at me.');
      }
      if (s.flag('confessedAtReception')) {
        lines.push('I tell him about the tins taken from the children at Marlowe House. ' +
          'He pauses with the pen in his hand. <span class="said">"They are still up there?"</span> ' +
          'I nod. He writes the address on a separate sheet for the morning shift. ' +
          'It is not forgiveness, but it is an address somebody here might use.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"Right. Names when you are ready, no rush, no documents needed. ' +
        'Everyone gets a wash and a bed tonight and we do the medical in the morning when ' +
        'you have slept."</span>');
      lines.push('He slides a clipboard across the desk. It has a pen on a string. ' +
        'The form on it is a photocopy of a photocopy and the boxes say NAME, AGE, ' +
        'ANY PERSISTING COUGH OR FEVER, ANY BREAK IN THE SKIN.');
      return lines;
    },
    choices: [
      { label: 'Fill it in. Truthfully.', hint: 'all of it', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Fill it in. Lie about the skin.', tone: 'risk',
        show: function (s) { return s.infection > 0 || s.flag('sawTheWound'); },
        to: 'a3_triage', act: function (s) { s.set('liedOnTheForm'); s.harden(5); } },
      { label: 'Ask what is in the east wing.', tone: 'risk', to: 'a3_ask_east' },
      { label: 'Ask about a patient. Dennis Holloway, Ward Eleven.',
        show: function (s) { return s.flag('hollowayCard') || s.flag('knowsHolloway'); },
        to: 'a3_ask_holloway' },
      { label: 'Back out of the door and follow the service road instead.', tone: 'risk',
        to: 'a3_service' }
    ]
  });

  S.add({
    id: 'a3_ask_east',
    chapter: CH,
    place: 'Reception',
    text: [
      'He does not flinch, and he does not pause, and that is how I know he has answered this ' +
      'question several hundred times.',

      '<span class="said">"Long-term care," </span>he says. <span class="said">"The ones who turned ' +
      'and did not die of it. We kept them."</span>',

      'He lets that sit. Then, with the first real feeling I have heard out of him:',

      '<span class="said">"Everybody else burned theirs. In the pits, in the first fortnight, ' +
      'by the lorry-load. We did not. Whatever is left in those beds, it came in here as somebody\u2019s ' +
      'mother, and we are a hospital, and we do not burn people because they have become ' +
      'inconvenient."</span>',

      '<span class="said">"You will hear them. I am not going to pretend you will not. ' +
      'It is the hardest night\u2019s sleep you will ever have and then you get used to it, ' +
      'and getting used to it is worse, and then you get used to that too."</span>'
    ],
    choices: [
      { label: '"And the treatment?"', to: 'a3_ask_treatment' },
      { label: 'Fill in the form. Truthfully.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: '"Who decides who goes into those beds?"', tone: 'risk', to: 'a3_ask_decides' },
      { label: 'Back out of the door. Now, while it is still a conversation.', tone: 'kind',
        to: 'a3_back' }
    ]
  });

  S.add({
    id: 'a3_ask_treatment',
    chapter: CH,
    place: 'Reception',
    enter: function (s) { s.set('knowsTreatmentExists'); },
    text: [
      'For the first time he hesitates — not from guilt, I think, but from the care of a man ' +
      'handling something he has watched go wrong in other people\u2019s hands.',

      '<span class="said">"There is one. It is real. I have seen it work eleven times with my own ' +
      'eyes and I have seen it fail twice, and the two it failed on were both more than four days ' +
      'gone when they came to us."</span>',

      '<span class="said">"Doctor Aytoun will explain it properly in the morning. She is better at ' +
      'it than me and she is honest about it, which you will find is not the comfort you are ' +
      'expecting."</span>',

      { c: 'sep', t: '\u2042' },

      'He picks his paperback back up and squares it on the desk, and says, to the desk:',

      '<span class="said">"Ask her where it comes from. Ask her first thing. She will tell you the ' +
      'truth and then you will have to decide what you are, and it is better to do that on a full ' +
      'night\u2019s sleep."</span>'
    ],
    choices: [
      { label: 'Fill in the form. Truthfully.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Fill it in. Lie about the skin.', tone: 'risk',
        show: function (s) { return s.infection > 0 || s.flag('sawTheWound'); },
        to: 'a3_triage', act: function (s) { s.set('liedOnTheForm'); s.harden(5); } },
      { label: '"I am asking you. Where does it come from?"', tone: 'risk', to: 'a3_ask_decides' },
      { label: 'Take the others and go out the front door.', tone: 'kind', to: 'a3_back' }
    ]
  });

  S.add({
    id: 'a3_ask_decides',
    chapter: CH,
    place: 'Reception',
    text: [
      'He looks at me properly for the first time. Reassesses. Puts the paperback down again.',

      '<span class="said">"Matron does," </span>he says. <span class="said">"Not a doctor. ' +
      'Matron. She was here in 1983 and she will be here when the rest of us have gone, and ' +
      'every name in this building goes through her and comes out the other side as a decision."</span>',

      'He straightens the pen on its string.',

      '<span class="said">"She will want to meet you. She meets everybody. That is not a threat, ' +
      'it is a courtesy, and I would take it as one while you still can."</span>'
    ],
    choices: [
      { label: 'Fill in the form and ask to see the Matron tonight.', to: 'a3_matron',
        act: function (s) { s.set('askedForTheMatron'); } },
      { label: 'Fill in the form. Sleep first. Decide in the morning.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Ask to see the east wing before you sign anything.', tone: 'risk', to: 'a3_ward11',
        act: function (s) { s.set('askedToSee'); } },
      { label: 'Leave. Take everyone. Out the front, now.', tone: 'kind', to: 'a3_back' }
    ]
  });

  S.add({
    id: 'a3_ask_holloway',
    chapter: CH,
    place: 'Reception',
    enter: function (s) { s.set('askedAboutHolloway'); },
    text: [
      'He does not need to look it up, which tells me how many patients are left who have names.',

      '<span class="said">"Dennis. Ward Eleven."</span> A beat. <span class="said">"You are family?"</span>',

      'I say I have his boat.',

      'Something crosses his face — relief, almost. <span class="said">"Right. Right, good. ' +
      'He talked about that boat for three days solid before he went under. Jean this and Jean that ' +
      'and the bloody boat."</span>',

      '<span class="said">"His effects will be in the property room with everyone else\u2019s. ' +
      'We keep all of it, labelled, in case. I will walk you down in the morning."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"He is still with us, if you want the word for it. You can see him. ' +
      'I would not, in your position. But you can."</span>'
    ],
    choices: [
      { label: '"Take me to him. Now."', tone: 'risk', to: 'a3_ward11' },
      { label: '"Just the coat. Tonight, if you can."', to: 'a3_property' },
      { label: 'Fill in the form and wait for morning.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Ask who decides which ward a person goes to.', tone: 'risk', to: 'a3_ask_decides' }
    ]
  });

  S.add({
    id: 'a3_triage',
    chapter: CH,
    place: 'Outpatients',
    enter: function (s) {
      s.set('wasTriaged');
      s.advance(1);
      s.heal(14); s.ease(10);
    },
    text: function (s) {
      var lines = [
        'They give me a bed. An actual bed, with an actual sheet, in a six-bed bay with a radiator ' +
        'under the window, and I sleep until morning without meaning to and wake up furious ' +
        'with myself for it.',

        'There is porridge. There is tea. A boy of about nineteen takes my boots away and brings ' +
        'them back dry.',

        { c: 'sep', t: '\u2042' },

        'Doctor Aytoun does the medical after breakfast. She is about forty-five, grey with exhaustion, ' +
        'and she is thorough in a way that nobody has been thorough with me since the world ended ' +
        '\u2014 blood pressure, chest, pupils, lymph nodes, and every inch of skin, ' +
        'slowly, with a light.'
      ];
      if (s.infection > 0) {
        if (s.flag('liedOnTheForm')) {
          lines.push('She finds it in under four minutes. Of course she does. ' +
            'She does not say anything about the form. She simply puts her thumb either side of ' +
            'the graze on my arm, and looks at it, and then looks at me with an expression ' +
            'of such complete and unsurprised patience that lying to her again becomes impossible.');
          lines.push('<span class="said">"People always do," </span>she says. ' +
            '<span class="said">"Every single one. And then we lose a day."</span>');
        } else {
          lines.push('She finds the graze and she does not flinch and she does not hurry. ' +
            'She measures it. She writes the measurement down.');
          lines.push('<span class="said">"Thank you for putting it on the form," </span>she says. ' +
            '<span class="said">"You would be astonished how much difference that makes ' +
            'to what I can do for you."</span>');
        }
        var daysIn = Math.max(0, s.day - s.val('firstInfectionDay', s.day - 3));
        if (daysIn <= 4) {
          lines.push('<span class="said">"You are ' +
            (daysIn ? daysIn + ' day' + (daysIn === 1 ? '' : 's') : 'under a day') +
            ' in, give or take. That is inside the window. I can stop this."</span>');
        } else {
          lines.push('<span class="said">"You are at least ' + daysIn + ' days in. ' +
            'Beyond four days the treatment has failed people. I can try, but I will not ' +
            'promise it will work."</span>');
        }
        lines.push('A pause, and she puts the light down, and for the first time she looks ' +
          'like somebody about to do a difficult thing rather than a clinical one.');
        lines.push('<span class="said">"Before I offer you a treatment, you are entitled to ' +
          'know where it comes from. Matron will tell you. I want you to go and ask her, ' +
          'and I want you to come back afterwards, and I will not think less of you ' +
          'whichever way you come back."</span>');
      } else {
        lines.push('<span class="said">"You are clean," </span>she says, and sits back, ' +
          'and rubs both eyes with the heels of her hands. <span class="said">' +
          '"Genuinely clean. Underfed, overtired, and about four hundred years old in the shoulders, ' +
          'but there is nothing in you."</span>');
        lines.push('<span class="said">"Nine out of ten who come up that drive are not. ' +
          'So forgive me \u2014 that was the best minute of my week."</span>');
      }
      if (s.alive('teddy')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('She spends forty minutes with Teddy. I can see them through the glass: ' +
          'the chest, the oxygen saturation, the long careful listening with the stethoscope ' +
          'moving a half-inch at a time.');
        lines.push('When she comes out she closes the door behind her first, which tells me ' +
          'everything before she opens her mouth.');
        lines.push(s.flag('heldAtTheBoat')
          ? '<span class="said">"Those nights outside have cost him. Oxygen, steroids and a bed ' +
            'might give him some time. I cannot tell you how much."</span>'
          : '<span class="said">"I can give him a fortnight," </span>she says. ' +
            '<span class="said">"Oxygen, steroids, a bed and somebody listening. ' +
            'Not longer. I want to be honest with you rather than kind, because kind runs out ' +
            'and honest does not."</span>');
        lines.push('<span class="said">"He has asked me a question. I have told him I will not ' +
          'answer it until he has told you he asked it. He says he will tell you tonight."</span>');
      }
      return lines;
    },
    choices: [
      { label: 'Go and find the Matron. Ask her where it comes from.', tone: 'risk',
        to: 'a3_matron' },
      { label: 'Ask to see the east wing for yourself first.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Go and ask Teddy what he asked her.', tone: 'kind',
        show: function (s) { return s.alive('teddy'); }, to: 'a3_teddy_asked' },
      { label: 'Take the treatment now and ask questions later.', tone: 'cruel',
        show: function (s) { return s.infection > 0; }, to: 'a3_matron_treat' },
      { label: 'Walk the corridors. Find the office with the records in it.', to: 'a3_office' },
      { label: 'Say nothing, collect everyone, and leave while they are being kind to you.',
        tone: 'kind', to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_teddy_asked',
    chapter: CH,
    place: 'Outpatients',
    enter: function (s) { s.set('teddyAsked'); },
    text: [
      'He is sitting up in a bed with a blanket over his knees and an oxygen line under his nose, ' +
      'and he looks better than he has looked in six weeks, which is the cruellest trick this ' +
      'building has played on anybody yet.',

      '<span class="said">"Sit down," </span>he says. <span class="said">"I asked her whether ' +
      'I was any use."</span>',

      'I wait.',

      '<span class="said">"The wards. The blood. She explained all of it to me before she ' +
      'explained it to you, because I asked first, and because I am the one it is relevant to."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"And the answer is no. I am no use at all. One unit, perhaps two, ' +
      'and then nothing, because there is not enough left of me to be worth draining."</span>',

      'He laughs, and it turns into the cough, and he rides it out with both hands flat on ' +
      'the blanket.',

      '<span class="said">"All these weeks I have been the reason you could not do things. ' +
      'And the one time it would have bought you something \u2014 the one time being used up ' +
      'would have been <em>worth</em> something \u2014 I am not even good enough for that."</span>',

      '<span class="said">"I wanted you to hear that from me. Not from her, and not from Bram, ' +
      'and not in six months when you are deciding what sort of person you were about it."</span>'
    ],
    choices: [
      { label: '"You were never the reason. You were the point."', tone: 'kind', to: 'a3_matron',
        act: function (s) { s.soften(14); s.trust('teddy', 30); s.ease(8); s.set('theCompact'); },
        toast: ['He cannot answer that for a while.', 'good'] },
      { label: 'Sit with him and say nothing. Let it be said and left.', tone: 'kind',
        to: 'a3_matron', act: function (s) { s.soften(8); s.trust('teddy', 15); s.ease(6); } },
      { label: '"Then let me make it mean something. I will take the bed instead."', tone: 'rot',
        to: 'a3_final', act: function (s) { s.set('offeredMyself'); s.scar(14); s.soften(10); } },
      { label: '"You are right. And it changes nothing about tomorrow."', to: 'a3_matron',
        act: function (s) { s.harden(8); s.scar(8); s.trust('teddy', -10); } },
      { label: 'Ask him what he wants to happen now.', to: 'a3_teddy_compact' }
    ]
  });

  S.add({
    id: 'a3_teddy_compact',
    chapter: CH,
    place: 'Outpatients',
    text: [
      'He thinks about it properly. He always does. It is the thing about him that has survived ' +
      'everything else intact.',

      '<span class="said">"A fortnight in a bed," </span>he says, <span class="said">' +
      '"in a building that does what this one does, so that I can die eleven days later than ' +
      'I otherwise would, in a nice room, on the proceeds of ninety-four people strapped to ' +
      'a mattress."</span>',

      '<span class="said">"Or."</span>',

      'He looks at the window. From here I can just see the lime trees and, four miles off ' +
      'and far below, the river.',

      '<span class="said">"There is a boat, Odile tells me. And the water stops them."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"I would like the water. I would like to come with you as far as my ' +
      'body manages, and when it stops managing I would like to be the one who says so, ' +
      'and I would like one of you to not argue with me on that night."</span>',

      '<span class="said">"That is the whole will and testament. It has not changed since the shop. ' +
      'I have just had a very good breakfast and a very bad piece of news, ' +
      'and neither of them moved it an inch."</span>'
    ],
    choices: [
      { label: 'Shake his hand on it. All of it. Including the not arguing.', tone: 'kind',
        to: 'a3_matron',
        act: function (s) { s.set('theCompact'); s.soften(14); s.trust('teddy', 30); s.ease(6); },
        toast: ['He holds on a second longer than a handshake needs.', 'good'] },
      { label: 'Agree to the boat. Refuse to agree to the rest.', to: 'a3_matron',
        act: function (s) { s.soften(6); s.trust('teddy', 10); s.scar(6); } },
      { label: '"A fortnight is a fortnight. You are taking the bed."', tone: 'cruel',
        to: 'a3_matron',
        act: function (s) { s.harden(10); s.trust('teddy', -20); s.set('overruledHim'); } },
      { label: 'Tell him you will decide tonight, and go and find the Matron.', to: 'a3_matron',
        act: function (s) { s.scar(5); } }
    ]
  });

  /* ---------------------------------------------------------- the back */
  S.add({
    id: 'a3_back',
    chapter: CH,
    place: 'The east wing',
    enter: function (s) { s.set('cameInTheBack'); },
    text: [
      'I go round. Past the kitchens, where the generator is, past a row of wheelie bins that have ' +
      'been washed out, to the service face of the east wing where the double doors are.',

      'They are not locked. There is no reason for them to be locked. Nothing in this county is ' +
      'trying to get <em>in</em>.',

      { c: 'sep', t: '\u2042' },

      'The corridor beyond is lit, warm, and smells of disinfectant over something sweeter that ' +
      'the disinfectant is not quite managing.',

      'A whiteboard on the wall by the doors, in three colours of marker, immaculately maintained:',

      { c: 'note', t: 'WARD 11 \u00b7 OCCUPANCY 94/96\nTURNS: 04:00 \u00b7 10:00 \u00b7 16:00 \u00b7 22:00\n' +
        'DRAW: 06:00 ONLY. DO NOT DRAW OFF-SCHEDULE.\nMOUTH CARE IS NOT OPTIONAL. THEY STILL FEEL IT.\n' +
        'Be kind. They can hear me. \u2014 M.' },

      'Ninety-four of ninety-six. And underneath the hum, from behind the double doors at the end ' +
      'of the corridor, the sound of someone moving along a row of beds, talking quietly and ' +
      'continuously, the way I talk to a frightened animal.'
    ],
    choices: [
      { label: 'Go in. See it.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Find the property room first.', to: 'a3_property' },
      { label: 'Follow the service road. See where the trolleys go.', tone: 'risk', to: 'a3_service' },
      { label: 'Go round to the front, give your names, and take the beds.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Get everyone out. This is enough. You have seen enough.', tone: 'kind',
        show: function (s) { return s.flag('knowsBoat'); }, to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_split',
    chapter: CH,
    place: 'The lime avenue',
    enter: function (s) { s.set('wentInAlone'); },
    text: function (s) {
      var lines = [
        'I go in alone. It takes nine minutes to arrange and all nine of them are an argument.'
      ];
      lines.push('<span class="said">"If you are not out by first light," </span> Bram says, ' +
        '<span class="said">"we are not coming in after you. I want that agreed out loud, now, ' +
        'by you, so that it is your decision and not mine."</span>');
      lines.push('I agree it out loud.');
      if (withTeddy(s)) {
        lines.push('Teddy will not look at me. <span class="said">"You are going in there to ask ' +
          'them about me," </span>he says. <span class="said">"Do not dress it up."</span>');
      }
      lines.push({ c: 'whisper', t: 'Wren writes, and holds it where only you can see it.' });
      lines.push({ c: 'whisper', t: 'if its bad come out and say the word hush and well run' });
      lines.push({ c: 'whisper', t: 'dont be brave. be fast' });
      return lines;
    },
    choices: [
      { label: 'In the front. As a patient.', to: 'a3_reception' },
      { label: 'In the back. As a thief.', tone: 'risk', to: 'a3_back' },
      { label: 'Down the service road first.', tone: 'risk', to: 'a3_service' },
      { label: 'Change your mind. Nobody goes in.', tone: 'kind',
        show: function (s) { return s.flag('knowsBoat'); }, to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_service',
    chapter: CH,
    place: 'The service road',
    enter: function (s) { s.set('sawThePit'); s.scar(20); },
    text: [
      'The service road runs four hundred yards behind the east wing, between the laundry and the ' +
      'old mortuary, and ends at a gate in a wall, and beyond the gate is the hospital\u2019s ' +
      'north field.',

      'It was a field. In 1874 they put a chapel in the corner of it for the ones nobody claimed.',

      { c: 'sep', t: '\u2042' },

      'There is a trench. Machine-cut, forty feet by nine, and three-quarters filled, and ' +
      'carefully — <em>carefully</em> — layered: a row of people, a dressing of lime, a row of ' +
      'people, a dressing of lime.',

      'Each one is in a sheet. Each sheet is tied at the head and the foot with a cord. ' +
      'On each cord, a label.',

      'I climb down and I turn one of the labels over, because I have come four miles ' +
      'and I have earned the right to read it.',

      { c: 'note', t: 'FENWICK, ALICE M. \u00b7 D.O.B. 14.09.1951 \u00b7 WARD 11 \u00b7 ' +
        'ADMITTED 19.04 \u00b7 ENDED 29.05\nYIELD: 11 UNITS \u00b7 TYPE B\n' +
        'NO NEXT OF KIN TRACED. CHAPEL SERVICE HELD 30.05. \u2014 M.' },

      'A chapel service. Held. On the thirtieth of May. For a woman they had been draining for ' +
      'forty days, by the people who drained her, and they wrote it down, ' +
      'and they meant it.'
    ],
    choices: [
      { label: 'Go in. You need to look at Ward Eleven now.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Read more labels. All of them, if you have to.', to: 'a3_pit_read' },
      { label: 'Go back and get the others out. Right now.', tone: 'kind',
        show: function (s) { return !s.flag('wentInAlone'); }, to: 'a3_refuse' },
      { label: 'Go to the chapel.', to: 'a3_chapel' },
      { label: 'Go and find whoever signs themselves M.', tone: 'risk', to: 'a3_matron' }
    ]
  });

  S.add({
    id: 'a3_pit_read',
    chapter: CH,
    place: 'The north field',
    enter: function (s) { s.scar(16); s.harden(6); s.set('readThePit'); },
    text: [
      'I read forty-one of them before I stop, and I stop because of the pattern, ' +
      'not because of the horror.',

      'Admitted in April, ended in May. Admitted in April, ended in June. ' +
      'Yields of nine units, eleven units, six units.',

      'And then, further along, in the newest layer, the dates change shape:',

      { c: 'note', t: 'OKONKWO, SAMUEL \u00b7 ADMITTED 02.06 \u00b7 ENDED 04.06\nYIELD: 2 UNITS' },
      { c: 'note', t: 'PRICE, HEATHER \u00b7 ADMITTED 09.06 \u00b7 ENDED 11.06\nYIELD: 2 UNITS' },
      { c: 'note', t: 'UNNAMED MALE, APPROX 60 \u00b7 ADMITTED 14.06 \u00b7 ENDED 15.06\nYIELD: 1 UNIT' },

      { c: 'sep', t: '\u2042' },

      'The April ones lasted forty days. The June ones last two.',

      'Which means the April ones were people who turned on their own, out there, and were brought in. ' +
      'And the June ones were people who <em>arrived well</em>, and were made into donors, ' +
      'and did not have forty days in them because being turned on purpose in a bed is not the same ' +
      'as turning in the street.',

      'And the yield is falling. Eleven units to one. Whatever this hospital is doing, ' +
      'it is running out of the thing it does it with, and it is getting through people faster ' +
      'to get less.'
    ],
    choices: [
      { label: 'Ward Eleven. Now.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Find the Matron.', tone: 'risk', to: 'a3_matron' },
      { label: 'Get the others. Leave. Tonight.', tone: 'kind', to: 'a3_refuse' },
      { label: 'Find the ledger these labels were copied from.', to: 'a3_office' }
    ]
  });

  S.add({
    id: 'a3_chapel',
    chapter: CH,
    place: 'The chapel',
    enter: function (s) { s.set('wentToTheChapel'); },
    text: [
      'The chapel is eleven feet by twenty and smells of damp hymn books. Somebody has swept it ' +
      'this week.',

      'There are no bodies in here. There is a table with a cloth on it, and on the cloth, ' +
      'in rows, nine hundred-odd small objects.',

      'A watch. A pair of reading glasses. A wedding ring on a loop of string. A bus pass. ' +
      'A photograph of a dog. A child\u2019s hair slide. A set of car keys. A hearing aid.',

      'Each with a paper label. Each squared off. Each dusted.',

      { c: 'sep', t: '\u2042' },

      'Pinned above the table, in the same neat hand as the whiteboard and the labels:',

      { c: 'note', t: 'If anyone comes looking for them, they are to be given these and told the truth. ' +
        'All of it. Including my name.\n\u2014 M.' }
    ],
    choices: [
      { label: 'Look for HOLLOWAY, D.', show: function (s) { return s.flag('hollowayCard') || s.flag('knowsHolloway'); },
        to: 'a3_chapel_keys' },
      { label: 'Take nothing. Go and find M.', tone: 'risk', to: 'a3_matron' },
      { label: 'Take the lot. Nine hundred people\u2019s effects are nine hundred people\u2019s proof.',
        to: 'a3_office', act: function (s) { s.set('tookTheEffects'); s.scar(10); } },
      { label: 'Go to Ward Eleven.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Sit down in the back pew for a minute. Just a minute.', tone: 'kind',
        to: 'a3_chapel_exit', act: function (s) { s.ease(10); s.soften(5); s.bump('satInTheChapel'); } },
      { label: 'Take one thing. One, so that one of them gets out of this building.', tone: 'kind',
        hint: 'the hair slide. it is the smallest and that is the whole reason',
        show: function (s) { return !s.kept('hairslide'); },
        to: 'a3_chapel_exit',
        act: function (s) {
          s.scar(6); s.soften(6);
          s.keep('hairslide', 'You did not read its label. You decided you would rather carry a stranger than a name you could fail.');
        },
        toast: ['You put it in the pocket with the others.', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a3_chapel_exit',
    chapter: CH,
    place: 'The chapel',
    text: function (s) {
      var lines = [
        'The building keeps humming beyond the chapel wall. Here the little objects stay quiet, ' +
        'each in its labelled place, each waiting for someone who may never come.'
      ];
      if (s.kept('hairslide')) {
        lines.push('The yellow duck on the hair slide presses against my palm through my pocket. ' +
          'I did not read the name. I can still go back and learn it, but I do not.');
      } else {
        lines.push('I stand from the pew. The dust on the table has been wiped away by someone ' +
          'who will come back tomorrow to do it again.');
      }
      return lines;
    },
    choices: [
      { label: 'Find the person who wrote the labels.', to: 'a3_matron' },
      { label: 'Go to the ward. See the people behind the names.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Find the records. Count what happened here.', to: 'a3_office' }
    ]
  });

  S.add({
    id: 'a3_chapel_keys',
    chapter: CH,
    place: 'The chapel',
    enter: function (s) { s.give('keys'); s.set('hasTheKeys'); },
    text: [
      'Third row, eleventh along, between a hearing aid and a Saint Christopher.',

      'A set of keys on a foam fob shaped like a fish. The fob says LUCKY. ' +
      'Somebody has written on the label in the neat hand:',

      { c: 'note', t: 'HOLLOWAY, DENNIS \u00b7 WARD 11 \u00b7 ADMITTED 23.04\nKEYS (BOAT). ' +
        'HE ASKED THAT THESE GO TO HIS WIFE JEAN AT 14 ESTUARY VIEW.\nI HAVE NOT BEEN ABLE TO ' +
        'GET THERE. IF I CAN, PLEASE. \u2014 M.' },

      'I stand in a cold chapel holding a dead man\u2019s boat keys and a dead man\u2019s last ' +
      'request, and four hundred yards away there is a trench with his neighbours in it, ' +
      'and the same hand wrote both labels.'
    ],
    choices: [
      { label: 'Pocket the keys. Find the Matron. You have questions now.', tone: 'risk',
        to: 'a3_matron' },
      { label: 'Pocket the keys and get out of this building immediately.', to: 'a3_refuse' },
      { label: 'Go and look at Dennis Holloway in his bed first.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Take the keys and the whole table. All nine hundred.', to: 'a3_office',
        act: function (s) { s.set('tookTheEffects'); s.scar(10); } },
      { label: 'Peel the label off and keep it with the keys.', tone: 'kind',
        hint: '14 Estuary View. it is on your way to nothing.',
        to: 'a3_matron',
        act: function (s) {
          s.set('tookTheRequest'); s.soften(7); s.scar(4);
          s.keep('label', 'You have not promised anybody you will go. You have also not thrown it away.');
        },
        toast: ['A dead man\u2019s last errand, now yours.', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a3_property',
    chapter: CH,
    place: 'The property room',
    enter: function (s) { s.give('keys'); s.set('hasTheKeys'); },
    text: [
      'The property room is a converted linen store with industrial shelving and nine hundred ' +
      'labelled bags on it, in admission order, with a card index.',

      'HOLLOWAY, D. is in the April section. The bag contains: one wallet, one wedding ring, ' +
      'one inhaler, one pair of spectacles, and one set of boat keys on a foam fob shaped like a fish.',

      'Everything is dusted. Everything is in order. There is a chair by the door and a ' +
      'half-drunk cup of tea gone cold on the floor beside it, where somebody sits, ' +
      'regularly, in a room full of the belongings of people they are killing.',

      { c: 'sep', t: '\u2042' },

      'On the card index, under HOLLOWAY, in the neat hand, a second card has been added:',

      { c: 'note', t: 'ASKED FOR JEAN 11 TIMES BEFORE HE WENT UNDER.\nTOLD HIM I WOULD FETCH HER. ' +
        'I DID NOT. THERE WAS NO TIME AND THAT IS NOT AN EXCUSE.\n\u2014 M.' }
    ],
    choices: [
      { label: 'Take the keys and go. Out, now, to the boat.', to: 'a3_refuse' },
      { label: 'Take the keys and go and find M.', tone: 'risk', to: 'a3_matron' },
      { label: 'Go and see Holloway.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Find the office. Find the records. Find all of it.', to: 'a3_office' }
    ]
  });

  /* ---------------------------------------------------------- ward eleven */
  S.add({
    id: 'a3_ward11',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) { s.set('sawWard11'); s.scar(24); s.infect(4); },
    text: [
      'Ninety-four beds in a Victorian ward with high windows and a stripped pine floor that ' +
      'somebody mops twice a day.',

      'They are strapped at the wrist, the chest and the ankle, in padded restraints that have been ' +
      'sheepskin-lined by hand, because sheepskin does not take the skin off and someone worked ' +
      'that out and then did the work.',

      'They are clean. They are covered to the chest with a folded blanket. Their hair has been ' +
      'brushed. Each one has a cannula taped at the inside of the elbow, capped off, and a chart ' +
      'at the foot of the bed with a date on it and a running total.',

      'Every single one of them is humming at the ceiling.',

      { c: 'hum', t: 'h m m m m m m m' },

      { c: 'sep', t: '\u2042' },

      'A woman in her twenties is working her way down the row with a tray: a sponge, a cup of water, ' +
      'a soft toothbrush. She is doing mouth care, bed by bed, and she is talking to each of them ' +
      'while she does it — the weather, the generator, somebody called Pav who has lost his boots.',

      'She looks up and sees me and does not stop what she is doing.',

      '<span class="said">"If you are going to be sick, the sluice is through there," </span>she says, ' +
      '<span class="said">"and if you are going to say something clever about this, do not."</span>'
    ],
    choices: [
      { label: 'Say nothing. Help her with the mouth care.', tone: 'kind', to: 'a3_ward_help' },
      { label: 'Find bed eleven. Dennis Holloway.',
        show: function (s) { return s.flag('hollowayCard') || s.flag('knowsHolloway') || s.flag('askedAboutHolloway'); },
        to: 'a3_ward_holloway' },
      { label: '"How many of these came in here well?"', tone: 'risk', to: 'a3_ward_question' },
      { label: 'Walk out. Find the person in charge.', tone: 'risk', to: 'a3_matron' },
      { label: 'Start unstrapping them.', tone: 'cruel', to: 'a3_ward_unstrap' },
      { label: 'Go back for the others. They have to see this.',
        show: function (s) { return !s.flag('wentInAlone'); }, to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_ward_help',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) { s.soften(10); s.scar(14); s.set('didMouthCare'); },
    text: [
      'I do eleven beds. She does not thank me and she does not explain, and after the fourth ' +
      'one she starts telling I the names without being asked.',

      '<span class="said">"This is Margaret. She was a dinner lady at St Jude\u2019s. ' +
      'This is Oyelaran, he came in off the Hawksmoor Road in the second week with his arm already ' +
      'gone black. This is Pav\u2019s dad."</span>',

      'The mouth care matters because they cannot swallow and they are humming twenty hours a day ' +
      'and their mouths dry out and crack and bleed, and if I do not do it, they suffer, ' +
      'and the one thing this ward has decided is that <em>they still feel it</em>.',

      { c: 'sep', t: '\u2042' },

      'At the eleventh bed she stops and sits down on the edge of it for a moment with the sponge ' +
      'in her hand.',

      '<span class="said">"I am going to tell you the thing," </span>she says, ' +
      '<span class="said">"because you did eleven beds and you did not ask me once to justify ' +
      'myself, and that buys you the thing."</span>',

      '<span class="said">"They are not all from outside. Not since May."</span>'
    ],
    choices: [
      { label: '"Who decides?"', to: 'a3_ward_question' },
      { label: '"Show me the ones from inside."', tone: 'risk', to: 'a3_ward_new' },
      { label: '"Why do you stay?"', tone: 'kind', to: 'a3_ward_why' },
      { label: 'Go and find the Matron. Now.', tone: 'risk', to: 'a3_matron' }
    ]
  });

  S.add({
    id: 'a3_ward_why',
    chapter: CH,
    place: 'Ward 11',
    text: [
      'She looks down the row of ninety-four beds.',

      '<span class="said">"Because if I go, nobody does the mouths," </span>she says.',

      '<span class="said">"That is it. That is the whole answer. I have been through all the other ' +
      'answers and they all come apart in your hands, and that one does not. If I walk out of here ' +
      'tonight, then tomorrow ninety-four people lie in the dark with their mouths splitting open ' +
      'and nobody talks to them about the weather."</span>',

      'She wrings the sponge out.',

      '<span class="said">"I know what we are. I have known since the fourth of June. ' +
      'I am not asking you to think well of me. I am telling you that there is a version of ' +
      'complicity that is just — turning up. Every day. And doing the mouths."</span>'
    ],
    choices: [
      { label: '"That is not nothing."', tone: 'kind', to: 'a3_ward_question',
        act: function (s) { s.soften(8); } },
      { label: '"It is still complicity."', to: 'a3_ward_question',
        act: function (s) { s.harden(6); s.scar(6); } },
      { label: '"Then help me stop it."', tone: 'risk', to: 'a3_ward_ally' },
      { label: 'Say nothing. Pick up the sponge. Do the twelfth bed.', tone: 'kind',
        to: 'a3_ward_question', act: function (s) { s.soften(12); s.set('didTheTwelfth'); } }
    ]
  });

  S.add({
    id: 'a3_ward_ally',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) { s.set('hasAlly'); },
    text: [
      'She is quiet for a long moment.',

      '<span class="said">"There are four of us who would," </span>she says at last, very low. ' +
      '<span class="said">"Pav, and Iris on nights, and the lad on the gate who you probably met. ' +
      'We have talked about it. We have talked about it for three weeks and we have not done ' +
      'anything, because every version ends with ninety-four people dying of thirst while we argue ' +
      'about who gets the generator."</span>',

      '<span class="said">"You want to know what stops us? Not Matron. Not loyalty."</span>',

      'She nods at the beds.',

      '<span class="said">"Them. There is no good ending for them. Every road out of this ward ' +
      'goes through ninety-four people who cannot consent to any of it. So we stay, and we do the ' +
      'mouths, and we hate ourselves on a rota."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"But if somebody from outside walked in and took the decision off us — "</span> ' +
      'She stops. Starts again. <span class="said">"Do not make me finish that sentence. ' +
      'Just know that the back gate is not locked and the lime store is not locked and ' +
      'the generator is behind the kitchens."</span>'
    ],
    choices: [
      { label: '"I am going to burn it."', tone: 'cruel', to: 'a3_final',
        act: function (s) { s.set('allyKnowsBurn'); s.harden(8); } },
      { label: '"I am going to take the records out instead."', to: 'a3_office',
        act: function (s) { s.set('allyKnowsLedger'); } },
      { label: '"I am going to talk to the Matron first."', to: 'a3_matron' },
      { label: '"I am going to get my people on a boat and go."', to: 'a3_refuse',
        act: function (s) { s.scar(10); } }
    ]
  });

  S.add({
    id: 'a3_ward_new',
    chapter: CH,
    place: 'Ward 11 \u00b7 the new row',
    enter: function (s) { s.set('sawTheNewRow'); s.scar(20); s.harden(4); },
    text: [
      'The last eleven beds are different and once I have seen it I cannot unsee it.',

      'The restraints are newer. The skin is better. The hair has not grown out. ' +
      'And on each chart, where the others say ADMITTED, these say ' +
      '<span class="wound">CONVERTED</span>, with a date in June, and underneath that, a line ' +
      'that the others do not have:',

      { c: 'note', t: 'CONSENT: VERBAL, WITNESSED (2)\nCOMPENSATION: FAMILY PLACED, EAST BLOCK. ' +
        'RATIONS CAT. A FOR LIFE.' },

      'Consent. Witnessed. Twice.',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"They volunteered," </span>she says, behind me. <span class="said">' +
      '"That is the part nobody can hold in their head, so I will say it slowly. ' +
      'They were told exactly what it was and exactly what it would be like and exactly how long it ' +
      'would take, and they said yes, and they signed, and they got their families a warm room ' +
      'and food for as long as this place stands."</span>',

      '<span class="said">"Bed ninety-one is Pav\u2019s father. Pav witnessed it. ' +
      'Pav held the pen for him because his hands were going."</span>'
    ],
    choices: [
      { label: '"That is not consent. That is a price."', to: 'a3_matron',
        act: function (s) { s.scar(10); s.set('refusedTheLogic'); } },
      { label: '"And it works. The treatment actually works."', to: 'a3_matron',
        act: function (s) { s.harden(10); s.set('acceptedTheLogic'); } },
      { label: 'Ask if there is a form. Ask to read it.', tone: 'risk', to: 'a3_office' },
      { label: 'Go outside and be sick, and then come back in.', to: 'a3_matron',
        act: function (s) { s.scar(12); s.soften(4); } }
    ]
  });

  S.add({
    id: 'a3_ward_question',
    chapter: CH,
    place: 'Ward 11',
    text: [
      'She finishes the mouth she is doing before she answers. She always finishes the mouth.',

      '<span class="said">"Matron decides. With the doctor. The doctor does the medicine and ' +
      'Matron does the — "</span> she looks for the word and does not find a soft one ' +
      '<span class="said">" — the selecting."</span>',

      '<span class="said">"Forty of these came in off the roads already turned. Forty-three were ' +
      'brought in by their own families, which I will let you sit with. And eleven are ours."</span>',

      '<span class="said">"If you are going to do something about it, do it to Matron. ' +
      'Do not do it to the beds. The beds did not choose."</span>'
    ],
    choices: [
      { label: 'Go and find the Matron.', tone: 'risk', to: 'a3_matron' },
      { label: 'See the eleven first.', tone: 'risk', to: 'a3_ward_new' },
      { label: 'Find the office and the records.', to: 'a3_office' },
      { label: '"Help me stop it."', tone: 'risk', to: 'a3_ward_ally' }
    ]
  });

  S.add({
    id: 'a3_ward_holloway',
    chapter: CH,
    place: 'Ward 11 \u00b7 bed 11',
    enter: function (s) { s.set('sawHolloway'); s.scar(16); if (!s.has('keys')) { s.give('keys'); s.set('hasTheKeys'); } },
    text: [
      'Dennis Holloway is sixty-one years old and has been in this bed since the twenty-third of April.',

      'He is clean. His hair is brushed. His chart says 48 UNITS, which is more than anybody else ' +
      'on the ward, which means Dennis Holloway has been the best thing that ever happened to ' +
      'St Amaranth Mercy and has spent two months paying for it a pint at a time.',

      'His eyes are open and gone. His throat works steadily. His hands are strapped but his ' +
      'fingers are moving, slightly, continuously, in a pattern.',

      { c: 'sep', t: '\u2042' },

      'I watch the fingers for a long time before I understand, and when I do understand it ' +
      'takes the floor out from under me.',

      'He is tying a bowline. Over and over. The first knot a sailor learns and the last one he ' +
      'forgets, and he has been tying it in an empty hand in a locked ward for two months.',

      'Taped to the head of the bed, in the neat hand: <em>LIKES THE WINDOW OPEN. ' +
      'TALK TO HIM ABOUT BOATS.</em>',

      'And in the drawer of his locker, labelled, waiting: a set of keys on a foam fob shaped ' +
      'like a fish.'
    ],
    choices: [
      { label: 'Take the keys. Tell him about the boat first.', tone: 'kind', to: 'a3_matron',
        act: function (s) { s.soften(14); s.scar(14); s.set('toldHimAboutTheBoat'); },
        toast: ['You tell him she is riding high and the fuel is three-quarters. His fingers keep tying.', 'good'] },
      { label: 'Take the keys. Do not look at his face again.', to: 'a3_matron',
        act: function (s) { s.harden(8); s.scar(10); } },
      { label: 'Take the keys, and end him.', tone: 'cruel',
        show: function (s) { return s.has('knife') || s.has('morphine'); }, to: 'a3_holloway_end' },
      { label: 'Open the window for him.', tone: 'kind', to: 'a3_matron',
        act: function (s) { s.soften(10); s.scar(8); s.set('openedTheWindow'); },
        toast: ['The hum in the ward changes very slightly. Ninety-four heads turn to the air.', 'rot'] }
    ]
  });

  S.add({
    id: 'a3_holloway_end',
    chapter: CH,
    place: 'Ward 11 \u00b7 bed 11',
    enter: function (s) {
      s.set('endedHolloway'); s.harden(10); s.scar(22);
      if (s.has('morphine')) s.take('morphine');
    },
    text: function (s) {
      var lines = [];
      if (s.flag('endedHolloway') && s.count('morphine') === 0 && s.flag('morphineForMe')) {
        lines.push('I use the ampoule I have been carrying for a week with somebody else\u2019s ' +
          'name on it, and in the using it becomes a different object entirely.');
      }
      lines.push('It takes under a minute and he does not struggle, and the fingers stop ' +
        'tying the bowline halfway through a bowline.');
      lines.push('That is the detail. Not the rest of it. <em>Halfway through.</em>');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The woman with the sponge watches me do it from four beds away and does not move ' +
        'and does not call out, and when it is over she comes and straightens his blanket and ' +
        'folds his hands and says, to him, not to me:');
      lines.push('<span class="said">"Right then, Dennis. That is you done."</span>');
      lines.push('Then she looks up.');
      lines.push('<span class="said">"Ninety-three," </span>she says. <span class="said">' +
        '"Are you going to do ninety-three? Because if you are, I will hold the door, and if you ' +
        'are not, then you have just done the one that was easiest for you and called it mercy."</span>');
      return lines;
    },
    choices: [
      { label: '"No. But I am going to end the thing that fills these beds."', tone: 'risk',
        to: 'a3_matron', act: function (s) { s.set('sworeToEndIt'); } },
      { label: '"Yes. All ninety-three. Hold the door."', tone: 'cruel', to: 'a3_final',
        act: function (s) { s.set('choseTheWard'); s.harden(25); s.scar(30); } },
      { label: 'Say nothing. Take the keys and walk out.', tone: 'cruel', to: 'a3_matron',
        act: function (s) { s.harden(14); s.scar(12); } },
      { label: '"I do not know. Help me decide."', to: 'a3_ward_ally' }
    ]
  });

  S.add({
    id: 'a3_ward_unstrap',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) {
      s.hurt(26); s.infect(18); s.scar(26); s.harden(10);
      s.set('unstrappedThem');
    },
    text: [
      'I get four of them undone before anybody reaches I.',

      'They do not get up. That is the first thing and it is almost funny — two months of ' +
      'muscle wastage in a bed does not produce a monster, it produces a person who cannot ' +
      'stand up, and the first one slides off the mattress onto the pine floor like a dropped coat ' +
      'and lies there humming.',

      'The second one gets a hand into my hair and pulls my face down toward its open mouth ' +
      'with a grip like a cramp, and what stops it is the woman with the sponge, who hits it twice ' +
      'across the forearm with a steel kidney dish and then puts her body between me and the bed ' +
      'and <span class="wound">screams at me</span> — the first raised voice in this building in weeks.',

      '<span class="said">"They CANNOT CONSENT! They cannot consent to being saved either, ' +
      'you absolute — they are not a statement you get to make!"</span>',

      { c: 'sep', t: '\u2042' },

      'She is crying. She re-straps all four of them herself, checking each one for skin damage ' +
      'as she goes, apologising to each of them by name.',

      'my scalp is bleeding. Something went into the graze on my arm. I feel the hum settle ' +
      'in my back teeth and <em>stay</em>.'
    ],
    choices: [
      { label: 'Apologise. Properly. Then go and find the Matron.', tone: 'kind', to: 'a3_matron',
        act: function (s) { s.soften(10); s.scar(10); } },
      { label: 'Say nothing. Go and find the Matron.', to: 'a3_matron',
        act: function (s) { s.harden(6); } },
      { label: 'Keep going. All ninety-four.', tone: 'cruel', to: 'a3_final',
        act: function (s) { s.set('choseTheWard'); s.hurt(20); s.infect(20); s.harden(20); s.scar(20); } },
      { label: 'Go and wash the bite out. Immediately.', tone: 'kind', to: 'a3_matron',
        act: function (s) { s.cure(8); s.scar(6); if (s.has('flask')) s.take('flask'); } }
    ]
  });

  /* ---------------------------------------------------------- the office */
  S.add({
    id: 'a3_office',
    chapter: CH,
    place: "The Matron's office",
    enter: function (s) { s.set('foundTheOffice'); if (!s.has('ledger')) s.give('ledger'); },
    text: [
      'The office is at the end of the east wing and the door is open, because the door is always ' +
      'open, because that is the kind of building this is.',

      'A desk. A chair. A kettle. A framed photograph of a hockey team from 1991. ' +
      'And on the desk, closed, squared to the edge, a hardbacked ledger about four inches thick.',

      'Nine hundred names in a neat hand. Each with a date of admission, a date of ending, ' +
      'and a yield.',

      { c: 'sep', t: '\u2042' },

      'The last forty pages are different. The handwriting is the same but the entries have grown ' +
      'a fourth column, and the fourth column is headed:',

      { c: 'note', t: 'WAS IT NECESSARY? \u2014 my answer, written the same night, before I slept.' },

      'And she has filled it in. Nine hundred times. Nearly all of them say YES. ' +
      'Some say <em>I think so</em>. Eleven of them, scattered through June, say ' +
      '<span class="wound">NO</span>, and those eleven have a line ruled under them, ' +
      'and beside each one, in the same hand, a single word:',

      { c: 'note', t: 'MINE.' }
    ],
    choices: [
      { label: 'Take the ledger.', to: 'a3_matron',
        act: function (s) { s.set('tookTheLedger'); } },
      { label: 'Read the last page first.', to: 'a3_lastpage' },
      { label: 'Burn the ledger here and now.', tone: 'cruel',
        show: function (s) { return s.has('lighter'); }, to: 'a3_matron',
        act: function (s) { s.take('ledger'); s.set('burnedTheLedger'); s.harden(12); s.scar(10); } },
      { label: 'Leave it exactly where it is and go and find her.', tone: 'risk', to: 'a3_matron',
        act: function (s) { s.take('ledger'); } }
    ]
  });

  S.add({
    id: 'a3_lastpage',
    chapter: CH,
    place: "The Matron's office",
    enter: function (s) { s.set('readTheLastPage'); },
    text: [
      'The last entry is from yesterday and it is not a name.',

      { c: 'note', t: 'YIELD CONTINUES TO FALL. 1.2 units/donor and dropping. At this rate the ' +
        'treatment ends in nine weeks whatever we do.\n\nThe arithmetic I have been doing since May ' +
        'only worked while the yield held. It does not hold. Which means every name in this book ' +
        'after the 4th of June bought nothing, and I signed each one of them YES.\n\n' +
        'I will tell the next person who walks in here. Whoever they are. I will tell them all of it ' +
        'and I will not shade a word of it, and then I will abide by what they say, because I have ' +
        'proven conclusively that I cannot be trusted to be the one who decides.\n\n' +
        'If I am reading this, I am the next person who walked in here.\n\u2014 M.' },

      { c: 'sep', t: '\u2042' },

      'The kettle, behind me, has just boiled.',

      'She has been standing in the doorway for some time.'
    ],
    choices: [
      { label: 'Turn around.', to: 'a3_matron', act: function (s) { s.set('sheSawYouRead'); } },
      { label: 'Finish reading first. Make her wait.', to: 'a3_matron',
        act: function (s) { s.set('sheSawYouRead'); s.harden(6); } },
      { label: 'Close the ledger and put it under your coat.', tone: 'cruel', to: 'a3_matron',
        act: function (s) { s.set('sheSawYouRead'); s.set('tookTheLedger'); s.harden(8); } }
    ]
  });

  /* ---------------------------------------------------------- the matron */
  S.add({
    id: 'a3_matron',
    chapter: CH,
    place: "The Matron's office",
    enter: function (s) { s.set('metTheMatron'); },
    text: function (s) {
      var lines = [
        'She is about sixty-five, in a cardigan, holding two mugs of tea, and she gives me one of ' +
        'them before she says a single word.'
      ];
      if (s.flag('sheSawYouRead')) {
        lines.push('<span class="said">"You have read it," </span>she says. <span class="said">' +
          '"Good. That saves us the worst forty minutes."</span>');
      } else {
        lines.push('<span class="said">"Sit down," </span>she says. <span class="said">' +
          '"I am going to tell you what we do here. All of it. I am not going to make it easier ' +
          'to hear and you are not to make it easier to say by nodding."</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('She talks for eleven minutes. I keep my tea in my hands until it goes cold.');
      lines.push('They take in everyone. Those still well are fed, housed and put to work. ' +
        'The turned go to Ward Eleven. They are washed and fed. They are strapped to their beds. ' +
        'Every morning at six, the staff draw blood from them.');
      lines.push('Doctor Aytoun uses that blood to make a grey serum. It has stopped the hum in ' +
        'eleven of thirteen people who were bitten. I ask her to repeat the number. She does.');
      lines.push('<span class="said">"And since the fourth of June," </span>she says, ' +
        '<span class="said">"when the wards filled and the yield began to fall, we have been asking ' +
        'people to volunteer for the beds. Eleven have. I wrote the words that asked them. ' +
        'I am not going to tell you I was coerced by circumstance, because circumstance does not ' +
        'write a consent form, and I did."</span>');
      if (withTeddy(s)) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('She looks past me, through the open door, down the corridor to where Teddy is ' +
          'sitting in a chair with a blanket somebody has put over his knees.');
        lines.push('<span class="said">"And before you ask me about your friend: yes. ' +
          'He is exactly who I would ask. He is dying, he knows it, and a man ' +
          'in his position yields nothing at all — one unit, perhaps two."</span>');
        lines.push('<span class="said">"Which is why I am not going to ask him. ' +
          'I want you to notice that I could, and that it would be easy, and that I am not."</span>');
      }
      return lines;
    },
    choices: [
      { label: '"Why are you telling me this?"', to: 'a3_matron_why' },
      { label: '"Give me the treatment. I have been bitten."', tone: 'risk',
        show: function (s) { return s.infection > 0; }, to: 'a3_matron_treat' },
      { label: '"This ends tonight. All of it."', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"Show me the serum."', to: 'a3_matron_serum' },
      { label: '"We are leaving. Now. All of us."', to: 'a3_refuse' },
      { label: 'Drink the tea and say nothing at all for a while.', to: 'a3_matron_why',
        act: function (s) { s.ease(6); } }
    ]
  });

  S.add({
    id: 'a3_matron_why',
    chapter: CH,
    place: "The Matron's office",
    text: [
      '<span class="said">"Because I have stopped being able to tell," </span>she says.',

      'She wraps both hands around her mug.',

      '<span class="said">"In April it was obvious. A person turns, a person is kept alive, ' +
      'that person\u2019s blood saves four others. I would do April again tomorrow and ' +
      'twice on Sunday."</span>',

      '<span class="said">"In June I wrote to a man with emphysema and asked him whether he would ' +
      'consider converting, in exchange for a warm room for his daughter. And he said yes. ' +
      'And I notarised it. And I have asked myself every night since whether there is any ' +
      'meaningful distance between what I did and holding a gun to him, and the answer keeps ' +
      'coming back <em>no</em>, and I keep doing it."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"Forty-one years I have worked in this building. I have been the person ' +
      'who decides for all of them. And the last thing I am still able to do about it is ' +
      'hand the decision to a stranger who has walked four miles in the dark and has not yet ' +
      'got used to any of it."</span>',

      '<span class="said">"So. You have the whole picture. What happens to St Amaranth Mercy?"</span>'
    ],
    choices: [
      { label: '"Show me the serum first."', to: 'a3_matron_serum' },
      { label: '"You do not get to hand this to me."', tone: 'risk', to: 'a3_matron_refuse' },
      { label: '"It ends. Tonight."', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"It continues. And I will help you run it."', tone: 'cruel', to: 'a3_final',
        act: function (s) { s.set('acceptedTheOffice'); s.harden(16); } },
      { label: '"Give me the treatment and let me go."', tone: 'risk',
        show: function (s) { return s.infection > 0; }, to: 'a3_matron_treat' }
    ]
  });

  S.add({
    id: 'a3_matron_refuse',
    chapter: CH,
    place: "The Matron's office",
    text: [
      'She takes it. She does not argue. She looks, if anything, relieved to be told.',

      '<span class="said">"No," </span>she agrees. <span class="said">"I do not. That is quite right ' +
      'and it is the most sensible thing anybody has said in this office since May."</span>',

      'She puts her mug down.',

      '<span class="said">"But you are standing in it now. That is the position. You did not ask ' +
      'for it, and it is not fair, and you are in it, and in about ninety seconds you are going to ' +
      'do something or not do something, and both of those are the same size of decision."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"I will tell you the one thing I know that you do not. ' +
      'The yield is finished. Nine weeks at the outside. After that this building is ninety-four ' +
      'people in beds, a generator, and the forty of us who have made ourselves into the sort of ' +
      'people who did this."</span>',

      '<span class="said">"There is no version of St Amaranth Mercy in five years. ' +
      'There is only what it does between now and the end of it."</span>'
    ],
    choices: [
      { label: '"Then it ends tonight."', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"Then give me the serum and we are quits."', to: 'a3_matron_serum' },
      { label: '"Then give me the ledger. People need to know what was done here."', to: 'a3_final',
        act: function (s) { s.give('ledger'); s.set('tookTheLedger'); } },
      { label: '"Then I am taking my people and going to the water."', to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_matron_serum',
    chapter: CH,
    place: 'The dispensary',
    enter: function (s) { s.set('sawTheSerum'); if (!s.has('vial')) s.give('vial'); },
    text: [
      'Doctor Aytoun is asleep at her desk and does not wake. Matron takes the key off a hook ' +
      'and opens the cold cabinet herself.',

      'There are nine vials left. Nine, in a rack, in a grey rubber tray, in a hospital with ' +
      'ninety-four donors and a falling yield.',

      'The serum is not a colour. That is the nearest I can get to it. It is a grey that does not ' +
      'settle, and if I hold the vial still for more than a second or two I will see that ' +
      '<span class="wound">it is not still either</span>, and that whatever is in there is ' +
      'describing a very slow circle without any help from me.',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"One dose arrests it," </span>she says. <span class="said">' +
      '"It does not reverse it. Whatever the hum has already taken of you, you do not get back. ' +
      'You simply stop giving it any more."</span>',

      '<span class="said">"It is nine doses. It is the last nine doses that will ever exist, ' +
      'because the yield is done. So you can see why I have not been sleeping."</span>',

      'She puts one in my hand without being asked.'
    ],
    choices: [
      { label: 'Take it. All nine. Walk out of this building tonight.', tone: 'cruel',
        to: 'end_serum',
        act: function (s) { s.give('vial', 8); s.set('tookAllNine'); s.harden(20); s.scar(10); } },
      { label: 'Take the one. Leave the other eight.', to: 'a3_final',
        act: function (s) { s.set('tookOne'); s.soften(6); } },
      { label: 'Take none of it.', tone: 'kind', to: 'a3_final',
        act: function (s) { s.take('vial'); s.set('tookNone'); s.soften(14); } },
      { label: 'Use it now, on yourself, in front of her.', tone: 'risk',
        show: function (s) { return s.infection > 0; }, to: 'a3_matron_treat' },
      { label: 'Ask her what happens to the eight if you take them.', to: 'a3_matron_eight' }
    ]
  });

  S.add({
    id: 'a3_matron_eight',
    chapter: CH,
    place: 'The dispensary',
    text: [
      '<span class="said">"Eight people who are bitten between now and the end of the year ' +
      'do not get them," </span>she says. <span class="said">"That is all. That is the whole ' +
      'consequence. They are not earmarked. There is no list. It is eight strangers who will ' +
      'walk up that drive in the next few months with a bite on them, and you will never meet ' +
      'any of them, and they will die humming."</span>',

      'She says it without weight. She is not trying to stop me.',

      '<span class="said">"I have made nine hundred decisions in this building and the only thing ' +
      'I have learned worth passing on is this: do not pretend the people you will never meet ' +
      'are not people. That is the whole mechanism. That is how a hospital gets to where this one ' +
      'is, one entirely reasonable step at a time."</span>'
    ],
    choices: [
      { label: 'Take one. Leave eight.', to: 'a3_final',
        act: function (s) { s.set('tookOne'); s.soften(8); } },
      { label: 'Take all nine anyway, and go.', tone: 'cruel', to: 'end_serum',
        act: function (s) { s.give('vial', 8); s.set('tookAllNine'); s.harden(22); s.scar(12); } },
      { label: 'Take none.', tone: 'kind', to: 'a3_final',
        act: function (s) { s.take('vial'); s.set('tookNone'); s.soften(16); } },
      { label: '"Then nobody gets them, because this place ends tonight."', tone: 'risk',
        to: 'a3_final', act: function (s) { s.set('declaredTheEnd'); } }
    ]
  });

  S.add({
    id: 'a3_matron_treat',
    chapter: CH,
    place: 'The dispensary',
    enter: function (s) {
      s.set('tookTheTreatment');
      s.cure(100);
      s.set('arrested');
      if (s.has('vial')) s.take('vial');
    },
    text: [
      'It goes in slowly, into the back of the hand, over about ninety seconds, and Matron talks ' +
      'to me the whole way through it about absolutely nothing — the hockey team in the photograph, ' +
      'the 1991 county final, a goalkeeper called Brenda who swore like a docker.',

      { c: 'sep', t: '\u2042' },

      'The hum goes out of my back teeth first. Then out of my jaw, my sinuses, ' +
      'the long bones of my arms, the floor of my pelvis — places I did not know it had got to, ' +
      'reporting their departure one after another like rooms in a house going dark.',

      'What is left behind is not health. It is an <span class="cold">absence</span>, ' +
      'precisely the shape of everything the hum had already taken, and I can feel the edges of it.',

      'I will not get that back. She told me. She did not shade a word of it.',

      '<span class="said">"There," </span>she says, and puts a plaster on it, ' +
      'and the plaster has a cartoon dinosaur on it because that is what the hospital has.'
    ],
    choices: [
      { label: '"Now show me where the serum comes from."', to: 'a3_treatment_source',
        show: function (s) { return !s.flag('sawWard11'); } },
      { label: '"Now it ends. Tonight."', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"Thank you." And mean it, and hate that you mean it.', to: 'a3_final',
        act: function (s) { s.scar(12); s.set('thankedHer'); } },
      { label: 'Ask for eight more for the road.', tone: 'cruel', to: 'a3_matron_eight' }
    ]
  });

  S.add({
    id: 'a3_treatment_source',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) {
      if (!s.flag('sawTreatmentSource')) {
        s.set('sawTreatmentSource'); s.scar(12);
      }
      s.set('sawWard11');
    },
    text: [
      'Matron takes me past the dispensing room to a window into Ward Eleven. The nurse inside ' +
      'is cleaning a woman\u2019s mouth with a damp sponge. She stops to listen when the woman hums, ' +
      'then goes on as gently as before.',
      'There are ninety-four beds. Ninety-four charts. The small plaster on my hand is still ' +
      'warm from the injection. I can put my hand against the glass, but I cannot give it back.',
      'Matron stays beside me until I step away. Neither of me says thank me.'
    ],
    choices: [
      { label: 'Ask that the patients be named in every account of this place.', tone: 'kind',
        to: 'a3_final', act: function (s) { s.soften(8); s.set('askedForNames'); } },
      { label: 'Tell Matron you will close the ward tonight.', tone: 'risk',
        to: 'a3_final', act: function (s) { s.set('declaredTheEnd'); s.scar(6); } },
      { label: 'Turn away. You needed the dose; you cannot look any longer.',
        to: 'a3_final', act: function (s) { s.harden(6); s.scar(8); } }
    ]
  });

  /* ---------------------------------------------------------- refusal path */
  S.add({
    id: 'a3_refuse',
    chapter: CH,
    place: 'The lime avenue',
    enter: function (s) { s.set('refusedTheMercy'); },
    text: function (s) {
      var lines = [
        'I walk back down the avenue of pruned lime trees with the lights of a working hospital ' +
        'behind me and nothing in front of me but four miles of dark and a river.'
      ];
      if (s.flag('knowsBoat')) {
        lines.push('There is a boat. Riding high, canopy zipped, three-quarters of a tank, ' +
          'on a river that they will not cross.');
      }
      if (s.has('keys')) {
        lines.push('And there are keys in my pocket on a foam fob shaped like a fish, ' +
          'and the word on the fob is LUCKY, and I have not decided yet whether that is a joke ' +
          'the world is making at my expense.');
      } else {
        lines.push('There are no keys. There is a boat with an empty ignition barrel and ' +
          'a note from a man to his wife, and a hospital on a hill that has his coat in a labelled bag.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (withTeddy(s)) {
        lines.push('Teddy walks the first two hundred yards on his own and then cannot, ' +
          'and Odile takes one side and I take the other without discussing it.');
        lines.push('<span class="said">"Was it bad?" </span>he asks.');
        lines.push('I tell him. All of it. He listens to the whole thing and then says, ' +
          'after a while: <span class="said">"One or two units. That is what I am worth to them."</span>');
        lines.push('<span class="said">"And you still turned around. Thank you. ' +
          'That is twice now."</span>');
      }
      return lines;
    },
    choices: [
      { label: 'The river. The boat. Tonight.', show: function (s) { return s.has('keys'); },
        to: 'a3_final', act: function (s) { s.set('headingForTheBoat'); } },
      { label: 'Go back for the keys. You cannot do this without them.',
        show: function (s) { return !s.has('keys'); }, to: 'a3_refuse_keys' },
      { label: 'The river anyway. You will break into the boat or sleep on it.',
        to: 'a3_final', act: function (s) { s.set('headingForTheBoat'); s.set('noKeys'); } },
      { label: 'Find somewhere with a door that locks from the inside.', tone: 'kind',
        to: 'a3_final', act: function (s) { s.set('lookingForTheDoor'); } },
      { label: 'Turn around. You cannot leave it standing.', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } }
    ]
  });

  S.add({
    id: 'a3_refuse_keys',
    chapter: CH,
    place: 'The property room',
    enter: function (s) {
      if (!s.flag('hasTheKeys')) s.give('keys');
      s.set('hasTheKeys');
    },
    text: [
      'I slip back through the service door while the others wait at the end of the drive. ' +
      'The property room has a card index. HOLLOWAY, D. is in the April section.',
      'His wallet, ring, spectacles and boat keys are sealed in a labelled bag. I take the keys. ' +
      'The paper tears at the staple and makes a small sound in a building full of larger ones.',
      'Outside, the others have kept their eyes on the door. They start walking with me ' +
      'before I speak.'
    ],
    choices: [
      { label: 'Take everyone to the boat.', tone: 'kind', to: 'a3_final',
        act: function (s) { s.set('headingForTheBoat'); } },
      { label: 'Keep the keys to yourself until the river.', to: 'a3_final',
        act: function (s) { s.set('headingForTheBoat'); s.harden(5); } },
      { label: 'Show the keys to Teddy. Let him choose whether to come.', tone: 'kind',
        show: function (s) { return s.alive('teddy'); }, to: 'a3_final',
        act: function (s) { s.set('headingForTheBoat'); s.trust('teddy', 10); } },
      { label: 'Pocket them. Before the river, you must decide what happens to the ward.',
        to: 'a3_final' }
    ]
  });

  /* ---------------------------------------------------------- the last choice */
  S.add({
    id: 'a3_final',
    chapter: 'III — The last of it',
    place: 'St Amaranth Mercy',
    enter: function (s) {
      s.set('atTheEnd');
      s.advance(1);
      /* people you drove away do not wait around for the last decision */
      ['odile', 'bram', 'wren'].forEach(function (id) {
        if (s.alive(id) && s.who(id).trust <= 12 && !s.flag('left_' + id)) {
          s.set('left_' + id);
          s.part(id, 'walked away from you before the end');
          s.scar(6);
        }
      });
    },
    text: function (s) {
      var lines = [];
      if (s.flag('declaredTheEnd')) {
        lines.push('I have said it out loud, and saying it out loud has made it a thing that ' +
          'now has to be done by somebody with hands.');
      } else if (s.flag('headingForTheBoat')) {
        lines.push('The hill is behind me. The river is ahead. It is day ' + s.day +
          ', and whatever is going to be decided is going to be decided before I reach the water.');
      } else {
        lines.push('It comes down to this, in a corridor before the next shift, with a kettle ' +
          'boiling somewhere and ninety-four people humming at a ceiling two rooms away.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.flag('heldAtTheBoat')) {
        lines.push(s.alive('teddy')
          ? 'The boat is still there, but the days I spent on it have gone into Teddy\u2019s ' +
            'breathing. Wren has stopped asking how long he has left.'
          : 'The boat is still there. I spent days holding to its mooring while the ' +
            'water kept the dead away; here there is no such boundary.');
      }
      if (s.flag('tookFromTheChildren')) {
        lines.push(s.flag('gaveItBack')
          ? 'I left the stolen tins on the landing at Marlowe House. The sound of the ' +
            'children behind the door has followed me into this corridor.'
          : 'The tins from Marlowe House are still with me. Before I decide what the ' +
            'hospital owes anyone, I have to admit what I took from six children.');
      }
      lines.push('Everything I have is in my pockets and everyone I have is in this building ' +
        'or on the road below it.');
      var kit = [];
      if (s.has('vial')) kit.push(s.count('vial') > 1 ? s.count('vial') + ' vials of grey serum' : 'one vial of grey serum');
      if (s.has('ledger')) kit.push("the Matron's ledger");
      if (s.has('keys')) kit.push('a set of boat keys');
      if (s.has('lighter')) kit.push('a lighter');
      if (s.has('morphine')) kit.push('an ampoule of morphine');
      if (kit.length) {
        lines.push('I have: ' + kit.join(', ') + '.');
      }
      if (withTeddy(s)) {
        lines.push('And I have Teddy, whose time is running out, and who has walked four miles, ' +
          'and who has not once asked me for anything.');
      }
      lines.push('Decide.');
      return lines;
    },
    choices: [
      { label: 'Burn St Amaranth Mercy to the ground.',
        hint: 'ninety-four in the beds. nine weeks of yield. forty staff.',
        tone: 'cruel', show: function (s) { return s.has('lighter'); },
        to: 'end_burn' },

      { label: 'Take the Matron\u2019s chair. Run it properly until the yield ends.',
        hint: 'somebody has to sign the forms', tone: 'cruel',
        show: function (s) { return s.flag('metTheMatron') || s.flag('atTheMercy'); },
        to: 'end_matron' },

      { label: 'Walk out with the ledger and make the world read it.',
        hint: 'nine hundred names and a fourth column',
        show: function (s) { return s.has('ledger'); },
        to: 'end_ledger' },

      { label: 'Take everyone to the boat and go out on the tide.',
        hint: 'the water is a wall', tone: 'kind',
        show: function (s) { return s.flag('knowsBoat') || s.flag('headingForTheBoat'); },
        to: function (s) {
          if (s.alive('teddy') && s.flag('theCompact')) return 'end_mercy_teddy';
          /* with nobody left there is nothing to decide; with somebody left
             there is, and it gets its own beat on the slipway */
          return s.partyCount() >= 1 ? 'a3_boat_who' : 'end_boat_alone';
        } },

      { label: 'Volunteer for bed ninety-five.',
        hint: 'verbal, witnessed, compensated', tone: 'rot',
        show: function (s) { return s.flag('sawWard11') || s.flag('knowsTheWards') || s.flag('atTheMercy'); },
        to: 'end_ward' },

      { label: 'Find a room with a door that locks from the inside, and hold it.',
        hint: 'and let her be the one who locks it', tone: 'kind',
        show: function (s) { return s.alive('wren'); },
        to: 'end_door' },

      { label: 'Walk out into the dark and stop holding the note down.',
        hint: 'it has been very patient with you', tone: 'rot',
        to: 'end_hush' }
    ]
  });

  /* ---------------------------------------------------------- the slipway */
  S.add({
    id: 'a3_boat_who',
    chapter: 'III — The last of it',
    place: 'Hadley sailing club',
    enter: function (s) { s.set('atTheSlip'); },
    text: function (s) {
      var names = s.party().map(function (id) { return S.CAST[id].name; });
      var lines = [
        'The sailing club is a portakabin and a concrete slip and eleven boats that nobody ' +
        'will ever come back for. LUCKY II is fourth along, and the foam fob turns in the ' +
        'ignition like it has been waiting.'
      ];
      lines.push('The engine will start. I know it will start. That stopped being the ' +
        'question somewhere on the hill.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (names.length === 1) {
        lines.push(names[0] + ' is forty feet behind me on the slip, out of breath, ' +
          'not hurrying, because it has not occurred to ' + (names[0] === 'Wren' ? 'her' : 'them') +
          ' that hurrying might be necessary.');
      } else {
        lines.push(names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] +
          ' are strung out along the slip behind me in the dark, none of them hurrying, ' +
          'because it has not occurred to any of them that hurrying might be necessary.');
      }
      lines.push('There is a throttle under my right hand and a rope on a cleat and ' +
        'about ninety seconds in which this is still entirely my decision.');
      lines.push({ c: 'whisper', t: 'nobody would ever know. there is nobody left to tell.' });
      return lines;
    },
    choices: [
      { label: 'Wait. Get every one of them aboard.', tone: 'kind',
        hint: 'the boat takes four and there are fewer than four',
        to: 'end_boat_together',
        act: function (s) { s.soften(10); s.ease(6); } },

      { label: 'Ask them, once, out loud, whether they want to come.',
        hint: 'you have not asked anybody anything in six weeks',
        to: 'end_boat_together',
        act: function (s) {
          s.soften(8); s.scar(4);
          s.party().forEach(function (id) { s.trust(id, 15); });
        } },

      { label: 'Cast off now, while they are still on the slip.', tone: 'cruel',
        hint: 'ninety seconds. then sixty. then it is done.',
        to: 'end_boat_alone',
        act: function (s) {
          s.harden(30); s.scar(24);
          s.party().forEach(function (id) {
            s.part(id, 'left standing on the slipway at Hadley');
          });
          s.set('castOffAlone');
        } }
    ]
  });
})();
