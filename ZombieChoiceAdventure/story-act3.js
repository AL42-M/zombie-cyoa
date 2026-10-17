/* ============================================================
   THE HUSH — Act III: St. Amaranth Mercy
   We take in all who come.
   ============================================================ */
(function () {
  'use strict';
  var S = window.Story;
  var CH = 'III — We Take In All Who Come';

  function withTeddy(s) { return s.alive('teddy'); }

  /* Teddy is in the building with me only if the group came in by the front
     door together, or I brought everyone in for the night before triage. */
  function teddyInside(s) {
    return s.alive('teddy') &&
      (s.flag('wasTriaged') || (s.flag('cameInTheFront') && !s.flag('wentInAlone')));
  }

  /* what the reader has been told about Holloway before any property-room search */
  function heardFirstName(s) {
    return s.flag('knowsHolloway') || s.flag('askedAboutHolloway');
  }
  function heardHolloway(s) {
    return s.flag('hollowayCard') || heardFirstName(s);
  }
  /* the keys come with a label, so having found them also means knowing the name */
  function knowsHollowayName(s) {
    return heardHolloway(s) || s.flag('hasTheKeys');
  }

  function knowsMatron(s) {
    return s.flag('metTheMatron') || s.flag('tookTheTreatment') || s.flag('wasTriaged') ||
      s.seen('a3_ask_decides') || s.seen('a3_ward_question') || s.seen('a3_ward_ally') ||
      s.flag('foundTheOffice');
  }

  function knowsWardName(s) {
    return s.flag('sawWard11') || s.flag('knowsTheWards') || s.flag('hollowayCard') ||
      s.flag('knowsHolloway') || s.flag('cameInTheBack') || s.flag('sawThePit') ||
      s.flag('metTheMatron') || s.flag('askedAboutHolloway');
  }
  function knowsWard(s) {
    return knowsWardName(s) || s.seen('a3_ask_east') || s.flag('pressedTheDesk') ||
      s.flag('teddyAsked') || s.flag('wasTriaged');
  }

  function knowsAnyBoat(s) { return s.flag('knowsBoat') || s.has('keys'); }

  /* "Beyond four days the treatment has failed people." Days count from first exposure,
     but no route keeps a reader infected that long, so the progress of the infection
     counts too: at 34 the engine's creep speeds up, and the story treats that as
     four days' worth. */
  function treatmentFails(s) {
    if (s.infection <= 0 || s.flag('arrested')) return false;
    var daysIn = s.day - s.val('firstInfectionDay', s.day - 3);
    return daysIn > 4 || s.infection >= 34;
  }
  function tryTheTreatment(s) {
    if (!treatmentFails(s)) return;
    s.set('treatmentFailed');
    if (s.has('vial')) s.take('vial');
  }
  /* each treatment choice gets its own warning, so no run reads the same hint twice */
  function treatmentHint(text) {
    return function (s) { return treatmentFails(s) ? text : ''; };
  }
  function treatmentOutcome(s) {
    return s.flag('treatmentFailed') ? 'end_turned' : 'a3_matron_treat';
  }

  var PRONOUN = { odile: 'her', wren: 'her', bram: 'him', teddy: 'him' };

  function nameList(names) {
    if (names.length < 2) return names.join('');
    return names.slice(0, -1).join(', ') + (names.length > 2 ? ',' : '') +
      ' and ' + names[names.length - 1];
  }

  /* ---------------------------------------------------------- the front */
  S.add({
    id: 'a3_reception',
    chapter: CH,
    place: 'Reception',
    enter: function (s) { s.set('cameInTheFront'); },
    text: function (s) {
      var lines = [
        'The man in the fleece puts his paperback face down on the desk and stands up. ' +
        'He is so ordinary that it stops me in the doorway.',

        '<span class="said">"Hi," </span>he says. <span class="said">"Come in, come in. ' +
        'Close it behind you, you\u2019re letting the heat out. You\u2019re the first since Tuesday."</span>',

        'It\u2019s <em>warm</em>. That gets through my guard before anything else does. ' +
        'A radiator is ticking. The floor has been mopped. Somewhere down a corridor ' +
        'a kettle is coming to a boil.'
      ];
      if (teddyInside(s)) {
        lines.push('He looks at Teddy for a second and a half, and his manner changes. ' +
          'He gets gentler, and he comes around the desk with a chair.');
        lines.push('<span class="said">"Sir. Sit down before you fall down. Respiratory?"</span> ' +
          'It isn\u2019t a doorman\u2019s question. <span class="said">"We can do something ' +
          'about that. We really can. Sit."</span>');
      }
      if (s.flag('askedForTeddysBed')) {
        lines.push('I ask for a bed for Teddy first. The man writes Teddy\u2019s name at the top of the ' +
          'clipboard before he asks for mine. Teddy watches the pen, not me.');
      }
      if (s.flag('confessedAtReception')) {
        lines.push('I tell him about the cans I took from the children at Marlowe House. ' +
          'He stops with the pen in his hand. <span class="said">"They\u2019re still up there?"</span> ' +
          'I nod. He writes the address on a separate sheet for the morning shift. ' +
          'He doesn\u2019t tell me it\u2019s all right. He makes sure somebody will go up there.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"Okay. Names when you\u2019re ready. No rush, no ID. ' +
        'Everyone gets a shower and a bed tonight, and the doctor sees everybody in the morning, ' +
        'once you\u2019ve slept."</span>');
      lines.push('He slides a clipboard across the desk, pen on a string. ' +
        'The form is a photocopy of a photocopy. The boxes say NAME, AGE, ' +
        'ANY PERSISTENT COUGH OR FEVER, ANY BREAK IN THE SKIN.');
      return lines;
    },
    choices: [
      { label: 'Fill it in. Truthfully.', hint: 'you hide nothing, wounds included', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Fill it in. Lie about the skin.', tone: 'risk',
        show: function (s) { return s.infection > 0 || s.flag('sawTheWound'); },
        to: 'a3_triage', act: function (s) { s.set('liedOnTheForm'); s.harden(5); } },
      { label: 'Ask what\u2019s in the east wing.', tone: 'risk', to: 'a3_ask_east' },
      { label: function (s) {
          if (s.flag('knowsHolloway')) return 'Ask about a patient. Dennis Holloway, Ward Eleven.';
          if (s.flag('hollowayCard')) return 'Ask about a patient. D. Holloway, Ward Eleven.';
          return 'Ask whether anyone here came from the sailing club. A boat called LUCKY II.';
        },
        show: function (s) { return heardHolloway(s) || s.flag('knowsBoat'); },
        to: 'a3_ask_holloway' },
      { label: 'Back out of the door and go around to the service road instead.', tone: 'risk',
        to: 'a3_service' },
      { label: function (s) {
          return s.flag('askedForTeddysBed')
            ? 'Ask Teddy whether a bed is what he wants.'
            : 'Before anyone writes Teddy\u2019s name down, ask him what he wants.';
        }, tone: 'kind',
        show: function (s) { return teddyInside(s); }, to: 'a3_teddy_compact' }
    ]
  });

  S.add({
    id: 'a3_ask_east',
    chapter: CH,
    place: 'Reception',
    text: [
      'He doesn\u2019t flinch or pause, which tells me he has answered this question ' +
      'a few hundred times.',

      '<span class="said">"Long-term care," </span>he says. <span class="said">"The ones who turned ' +
      'and didn\u2019t die of it. We kept them."</span>',

      'He lets that sit. Then, with the first real feeling I\u2019ve heard from him:',

      '<span class="said">"Everybody else burned theirs. In pits, in the first two weeks, ' +
      'by the truckload. We didn\u2019t. Whatever\u2019s left in those beds came in here as ' +
      'somebody\u2019s mom. This is a hospital. We don\u2019t burn people for being ' +
      'inconvenient."</span>',

      '<span class="said">"You\u2019ll hear them. I won\u2019t pretend you won\u2019t. ' +
      'The first night\u2019s the worst sleep you\u2019ll ever have. Then you get used to it, ' +
      'and that\u2019s worse. Then you get used to that too."</span>'
    ],
    choices: [
      { label: '"Is there a treatment?"', to: 'a3_ask_treatment' },
      { label: 'Fill in the form. Truthfully.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: '"Who decides who goes into those beds?"', tone: 'risk', to: 'a3_ask_decides' },
      { label: function (s) {
          return s.flag('wentInAlone')
            ? 'Back out of the door and go back to the others, while it\u2019s still a conversation.'
            : 'Back out of the door with the others, while it\u2019s still a conversation.';
        }, tone: 'kind', hint: 'you leave before anyone writes your name down',
        to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_ask_treatment',
    chapter: CH,
    place: 'Reception',
    enter: function (s) { s.set('knowsTreatmentExists'); },
    text: [
      'For the first time he hesitates. I don\u2019t think it\u2019s guilt. He handles the subject ' +
      'carefully, like something he has seen go wrong in other people\u2019s hands.',

      '<span class="said">"There is one. It\u2019s real. I\u2019ve seen it work eleven times with my own ' +
      'eyes, and I\u2019ve seen it fail twice. Both of those were more than four days ' +
      'gone when they got to us."</span>',

      '<span class="said">"Doctor Aytoun will explain it properly in the morning. She\u2019s better at ' +
      'it than me, and she\u2019s honest about it, which isn\u2019t the comfort you\u2019d ' +
      'think."</span>',

      { c: 'sep', t: '\u2042' },

      'He picks up his paperback, squares it on the desk, and says, to the desk:',

      '<span class="said">"Ask her where it comes from. First thing. She\u2019ll tell you the ' +
      'truth, and then you\u2019ll have to decide what you think of us. Better to do that after ' +
      'a night\u2019s sleep."</span>'
    ],
    choices: [
      { label: 'Fill in the form. Truthfully.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Fill it in. Lie about the skin.', tone: 'risk',
        show: function (s) { return s.infection > 0 || s.flag('sawTheWound'); },
        to: 'a3_triage', act: function (s) { s.set('liedOnTheForm'); s.harden(5); } },
      { label: '"I\u2019m asking you. Where does it come from?"', tone: 'risk', to: 'a3_ask_decides',
        act: function (s) { s.set('pressedTheDesk'); } },
      { label: function (s) {
          return s.flag('wentInAlone')
            ? 'Walk back out the front door to the others.'
            : 'Take the others and walk back out the front door.';
        }, tone: 'kind', hint: 'you leave without seeing the doctor', to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_ask_decides',
    chapter: CH,
    place: 'Reception',
    text: function (s) {
      var lines = ['He looks at me properly for the first time. Reassesses. Puts the paperback down again.'];
      if (s.flag('pressedTheDesk')) {
        lines.push('<span class="said">"From the east wing," </span>he says. <span class="said">' +
          '"From the people in those beds. Their blood. And if you want to know who decides ' +
          'whose blood, Matron does."</span>');
      } else {
        lines.push('<span class="said">"Matron does," </span>he says.');
      }
      lines.push('<span class="said">"Head of nursing. Not a doctor. ' +
        'She was here in 1983 and she\u2019ll be here when the rest of us are gone. ' +
        'Every name in this building goes through her and comes out the other side as a decision."</span>');
      lines.push('He straightens the pen on its string.');
      lines.push('<span class="said">"She\u2019ll want to meet you. She meets everybody. ' +
        'She means it as a courtesy, and I\u2019d take it as one while you still can."</span>');
      return lines;
    },
    choices: [
      { label: 'Fill in the form and ask to see the Matron tonight.', to: 'a3_matron',
        act: function (s) { s.set('askedForTheMatron'); } },
      { label: 'Fill in the form. Sleep first. Decide in the morning.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Ask to see the east wing before you sign anything.', tone: 'risk', to: 'a3_ward11',
        act: function (s) { s.set('askedToSee'); } },
      { label: function (s) {
          return s.flag('wentInAlone')
            ? 'Leave. Out the front, now, back to the others.'
            : 'Leave. Take everyone. Out the front, now.';
        }, tone: 'kind', hint: 'you leave without meeting her', to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_ask_holloway',
    chapter: CH,
    place: 'Reception',
    enter: function (s) { s.set('askedAboutHolloway'); },
    text: function (s) {
      var lines = [];
      if (heardHolloway(s)) {
        lines.push('He doesn\u2019t need to look it up.');
        lines.push('<span class="said">"Dennis. Ward Eleven."</span> Then: <span class="said">"Are you family?"</span>');
        lines.push('I tell him I\u2019m here about his boat.');
      } else {
        lines.push('He doesn\u2019t need to think about it.');
        lines.push('<span class="said">"LUCKY II? That\u2019s Dennis. Dennis Holloway, Ward Eleven."</span> ' +
          'Then: <span class="said">"Are you family?"</span>');
        lines.push('I tell him I\u2019ve seen the boat.');
      }
      lines.push('He looks relieved. <span class="said">"Okay. Okay, good. ' +
        'He talked about that boat for three days straight before he went under. Jean this, Jean that, ' +
        'and that damn boat."</span>');
      lines.push('<span class="said">"His things will be in the property room with everyone else\u2019s. ' +
        'We keep it all, labeled, just in case. I\u2019ll walk you down in the morning."</span>');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"He\u2019s still with us, if that\u2019s the word you want. You can see him. ' +
        'I wouldn\u2019t, in your shoes. But you can."</span>');
      return lines;
    },
    choices: [
      { label: '"Take me to him. Now."', tone: 'risk', to: 'a3_ward11' },
      { label: '"Just his things. Tonight, if you can."', to: 'a3_property' },
      { label: 'Fill in the form and wait for morning.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Ask who decides which ward a person goes to.', tone: 'risk', to: 'a3_ask_decides' }
    ]
  });

  S.add({
    id: 'a3_triage',
    chapter: CH,
    place: 'Outpatients',
    dateEntry: true,
    enter: function (s) {
      s.set('wasTriaged');
      s.advance(1);
      s.heal(14); s.ease(10);
    },
    text: function (s) {
      var lines = [];
      if (s.flag('wentInAlone') && s.partyCount()) {
        lines.push('Before I take the bed, I go back out to the lime avenue and bring the others in.' +
          (s.alive('bram') || s.alive('odile') ? ' Nobody mentions the hour we agreed on.' : ''));
      }
      lines.push('They give me a bed. A real one, with a sheet, in a six-bed room with a radiator ' +
        'under the window. I mean to stay awake, listening to the humming that comes through two ' +
        'sets of doors from the east wing. I sleep until morning and wake up furious ' +
        'with myself.');
      lines.push('There\u2019s oatmeal. There\u2019s tea. A boy of about nineteen takes my boots away and ' +
        'brings them back dry.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Dr. Aytoun examines me after breakfast. She\u2019s about forty-five and gray with ' +
        'tiredness, and more thorough than anyone has been with me since April: ' +
        'blood pressure, chest, pupils, lymph nodes, then every inch of skin, ' +
        'slowly, with a light.');
      if (s.infection > 0) {
        if (s.flag('liedOnTheForm')) {
          lines.push('She finds it in under four minutes, in the glands under my jaw, swollen hard. ' +
            'She doesn\u2019t mention the form. She presses them with two fingers, then looks at me ' +
            'with such tired, unsurprised patience that I can\u2019t lie to her twice.');
          lines.push('<span class="said">"People always lie on that form," </span>she says. ' +
            '<span class="said">"And then we lose a day."</span>');
        } else {
          lines.push('She reads what I wrote on the form, then feels the glands under my jaw for a long ' +
            'time, without flinching or hurrying, and writes down what she finds.');
          lines.push('<span class="said">"Thank you for putting it on the form," </span>she says. ' +
            '<span class="said">"You\u2019d be surprised what a difference that makes ' +
            'to what I can do for you."</span>');
        }
        var daysIn = Math.max(0, s.day - s.val('firstInfectionDay', s.day - 3));
        var dayText = daysIn ? daysIn + ' day' + (daysIn === 1 ? '' : 's') : 'under a day';
        if (daysIn > 4) {
          lines.push('<span class="said">"You\u2019re at least ' + daysIn + ' days in. ' +
            'Beyond four days the treatment has failed people. I can try. ' +
            'I won\u2019t promise it will work."</span>');
        } else if (s.infection >= 34) {
          lines.push('<span class="said">"You\u2019re ' + dayText + ' in, give or take, but it\u2019s ' +
            'moved faster in you than that. It\u2019s as far along as I\u2019d expect after four or ' +
            'five days, and past four days the treatment has failed people. I can try. ' +
            'I won\u2019t promise it will work."</span>');
        } else {
          lines.push('<span class="said">"You\u2019re ' + dayText +
            ' in, give or take. That\u2019s inside the window. I can stop this."</span>');
        }
        lines.push('She puts the light down. For the first time she looks like someone ' +
          'about to do something difficult.');
        lines.push('<span class="said">"Before I offer you the treatment, you\u2019re entitled to ' +
          'know where it comes from. Ask Matron. She\u2019s our head of nursing. Then come back. ' +
          'I won\u2019t think less of you whichever way you come back."</span>');
      } else {
        lines.push('<span class="said">"You\u2019re clean," </span>she says, sitting back ' +
          'and pressing the heels of her hands into her eyes. <span class="said">' +
          '"Really clean. Underfed, overtired, and about four hundred years old in the shoulders, ' +
          'but there\u2019s nothing in you."</span>');
        lines.push('<span class="said">"Nine out of ten who come up that drive aren\u2019t. ' +
          'So forgive me. That was the best minute of my week."</span>');
        lines.push('<span class="said">"If you want to know how this place works, ask Matron. ' +
          'She\u2019s our head of nursing, and she runs most of everything else."</span>');
      }
      if (s.alive('teddy')) {
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('She spends forty minutes with Teddy. I watch through the glass: ' +
          'his chest, the oxygen reading, the long, careful listening, the stethoscope ' +
          'moving half an inch at a time.');
        lines.push('When she comes out she closes the door behind her before she says anything. ' +
          'That tells me most of it.');
        lines.push(s.flag('heldAtTheBoat')
          ? '<span class="said">"Those nights on the river have cost him. Oxygen, steroids, and a bed ' +
            'might buy him some time. I can\u2019t tell you how much."</span>'
          : '<span class="said">"I can give him two weeks," </span>she says. ' +
            '<span class="said">"Oxygen, steroids, a bed, and someone listening. ' +
            'Not longer. I\u2019d rather be honest with you than kind."</span>');
        lines.push('<span class="said">"He\u2019s asked me a question. I\u2019ve answered it on one ' +
          'condition: that he tells you he asked. He says he will."</span>');
      }
      return lines;
    },
    choices: [
      { label: function (s) {
          return s.infection > 0
            ? 'Go and find the Matron. Ask her where it comes from.'
            : 'Go and find the Matron. Ask her what this hospital does.';
        }, tone: 'risk', to: 'a3_matron' },
      { label: 'Ask to see the east wing for yourself first.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Go and ask Teddy what he asked her.', tone: 'kind',
        show: function (s) { return s.alive('teddy'); }, to: 'a3_teddy_asked' },
      { label: 'Take the treatment now and ask questions later.', tone: 'cruel',
        show: function (s) { return s.infection > 0; },
        hint: treatmentHint('Dr. Aytoun has told you it may not work'),
        to: treatmentOutcome, act: tryTheTreatment },
      { label: 'Walk the corridors. Find the office with the records in it.', to: 'a3_office' },
      { label: 'Say nothing, collect everyone, and leave while they\u2019re still being kind to you.',
        tone: 'kind', to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_teddy_asked',
    chapter: CH,
    place: 'Outpatients',
    enter: function (s) { s.set('teddyAsked'); },
    text: [
      'He\u2019s sitting up in bed, a blanket over his knees and an oxygen line under his nose. ' +
      'He looks better than he has in six weeks, and I don\u2019t trust it.',

      '<span class="said">"Sit down, child," </span>he says. <span class="said">"I asked her ' +
      'whether I was any use."</span>',

      'I wait.',

      '<span class="said">"The wards. The blood. She told me all of it before she told you. ' +
      'I asked first. And it is, after all, my question."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"And the answer is no. No use at all. One unit, perhaps two. ' +
      'Then nothing. There is not enough left of me \u2014 to be worth the draining."</span>',

      'He laughs. The laugh turns into the cough, and he rides it out with both hands flat on ' +
      'the blanket.',

      '<span class="said">"All these weeks I have been the reason you could not do things. ' +
      'And the one time being used up might have been <em>worth</em> something \u2014 ' +
      'I am not even good enough for that."</span>',

      '<span class="said">"I wanted you to hear it from me. Not from her, and not from anybody else. ' +
      'And not six months from now, when you are deciding what sort of person ' +
      'you were about it."</span>'
    ],
    choices: [
      { label: '"You\u2019re the reason any of us kept going."', tone: 'kind', to: 'a3_teddy_compact',
        act: function (s) { s.soften(14); s.trust('teddy', 30); s.ease(8); },
        toast: ['He can\u2019t answer that for a while.', 'good'] },
      { label: 'Sit with him and say nothing. Let him talk when he\u2019s ready.', tone: 'kind',
        to: 'a3_teddy_compact', act: function (s) { s.soften(8); s.trust('teddy', 15); s.ease(6); } },
      { label: '"Then let me make it mean something. I\u2019ll take the bed instead."', tone: 'rot',
        hint: 'you offer yourself as a donor in his place',
        to: 'a3_final', act: function (s) { s.set('offeredMyself'); s.scar(14); s.soften(10); } },
      { label: '"You\u2019re right. And it changes nothing about tomorrow."', to: 'a3_matron',
        act: function (s) { s.harden(8); s.scar(8); s.trust('teddy', -10); } },
      { label: 'Ask him what he wants to happen now.', to: 'a3_teddy_compact' }
    ]
  });

  S.add({
    id: 'a3_teddy_compact',
    chapter: CH,
    place: 'St. Amaranth Mercy',
    text: function (s) {
      /* reached after Dr. Aytoun's prognosis (via a3_teddy_asked), or before
         anyone has examined him (from reception or the avenue) */
      var told = s.flag('teddyAsked');
      var lines = [
        'When he talks, he has thought it through properly. He always does; it\u2019s the one ' +
        'part of him nothing has worn down.'
      ];
      if (!told) {
        lines.push('<span class="said">"A bed," </span>he says. <span class="said">"A warm one. ' +
          'So that I can die a little later than I otherwise would. In a nice room. ' +
          'While that humming goes on in the east wing."</span>');
      } else if (s.flag('heldAtTheBoat')) {
        lines.push('<span class="said">"Some more days in a bed," </span>he says. <span class="said">' +
          '"She will not say how many. In a building that does \u2014 what this one does. ' +
          'So that I can die a little later than I otherwise would. In a nice room. ' +
          'On the proceeds of ninety-four people strapped to mattresses."</span>');
      } else {
        lines.push('<span class="said">"Two weeks in a bed," </span>he says. <span class="said">' +
          '"In a building that does \u2014 what this one does. So that I can die eleven days later ' +
          'than I otherwise would. In a nice room. On the proceeds of ninety-four people ' +
          'strapped to mattresses."</span>');
      }
      lines.push('<span class="said">"Or."</span>');
      lines.push(told
        ? 'He looks at the window. From here I can just see the lime trees and, four miles ' +
          'off and far below, the river.'
        : (teddyInside(s)
          ? 'He looks past the front doors, into the dark, toward the river.'
          : 'He looks down the hill, toward the river.'));
      var stops = s.flag('tookRiver') ? 'And the water stops them.' : 'And they say the water stops them.';
      if (s.flag('knowsBoat')) {
        lines.push('<span class="said">"There is a boat down there. ' + stops + '"</span>');
      } else if (s.has('keys')) {
        lines.push('<span class="said">"You have a set of boat keys in your pocket. I saw the fob. ' +
          stops + '"</span>');
      } else {
        lines.push('<span class="said">"There will be boats on that river. There always are. ' +
          stops + '"</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"I would like the water. I would like to come with you, as far as ' +
        'this body manages. When it stops managing, I would like to be the one who says so. ' +
        'And I would like one of you not to argue with me \u2014 on that night."</span>');
      lines.push('<span class="said">"That is my whole will. ' +
        (s.seen('a1_teddy_votes')
          ? 'It has not changed since Rosco\u2019s. '
          : 'I have known it since Rosco\u2019s. I am only now saying it out loud. ') +
        (told
          ? 'A very good breakfast and a very bad piece of news. '
          : 'Four miles of road and a warm room. ') +
        'Neither moved it an inch."</span>');
      return lines;
    },
    choices: [
      { label: 'Shake his hand on it. All of it. Including the not arguing.', tone: 'kind',
        to: 'a3_matron',
        act: function (s) { s.set('theCompact'); s.soften(14); s.trust('teddy', 30); s.ease(6); },
        toast: ['He holds on a second longer than a handshake needs.', 'good'] },
      { label: function (s) {
          return knowsAnyBoat(s)
            ? 'Agree to the boat. Refuse to agree to the rest.'
            : 'Agree to the water. Refuse to agree to the rest.';
        }, to: 'a3_matron',
        act: function (s) { s.soften(6); s.trust('teddy', 10); s.scar(6); } },
      { label: function (s) {
          if (!s.flag('teddyAsked')) return '"You\u2019re taking the bed. That\u2019s what it\u2019s for."';
          return s.flag('heldAtTheBoat')
            ? '"Every day counts. You\u2019re taking the bed."'
            : '"Two weeks is two weeks. You\u2019re taking the bed."';
        }, tone: 'cruel',
        to: 'a3_matron',
        act: function (s) { s.harden(10); s.trust('teddy', -20); s.set('overruledHim'); } },
      { label: function (s) {
          return 'Tell him you will decide ' + (s.flag('teddyAsked') ? 'tonight' : 'by morning') +
            ', and go and find ' + (knowsMatron(s) ? 'the Matron.' : 'whoever runs this place.');
        }, to: 'a3_matron',
        act: function (s) { s.scar(5); } },
      { label: function (s) {
          var when = s.flag('teddyAsked') ? 'today' : 'tonight';
          return knowsAnyBoat(s)
            ? 'Shake on it, and take him down to the river ' + when + '.'
            : 'Shake on it. Find a boat and take him down to the river ' + when + '.';
        }, tone: 'kind',
        hint: 'Teddy goes to the water, and the hospital carries on without you',
        to: function (s) { return s.has('keys') ? 'end_mercy_teddy' : 'a3_boat_lastkeys'; },
        act: function (s) { s.set('theCompact'); s.soften(14); s.trust('teddy', 30); s.ease(6); } }
    ]
  });

  /* ---------------------------------------------------------- the back */
  S.add({
    id: 'a3_back',
    chapter: CH,
    place: 'The east wing',
    enter: function (s) { s.set('cameInTheBack'); },
    text: [
      'I go around the back: past the kitchens and the generator, past a row of dumpsters ' +
      'somebody has hosed out, to the double doors at the service end of the east wing.',

      'They aren\u2019t locked. There\u2019s no reason they should be. Nothing in this county is ' +
      'trying to get <em>in</em>.',

      { c: 'sep', t: '\u2042' },

      'The corridor beyond is lit and warm. It smells of disinfectant, and under that of ' +
      'something sweeter the disinfectant can\u2019t quite cover.',

      'On the wall by the doors is a whiteboard, kept up in three colors of marker:',

      { c: 'note', t: 'WARD 11 \u00b7 OCCUPANCY 94/96\nTURNS: 04:00 \u00b7 10:00 \u00b7 16:00 \u00b7 22:00\n' +
        'DRAW: 06:00 ONLY. DO NOT DRAW OFF-SCHEDULE.\nMOUTH CARE IS NOT OPTIONAL. THEY STILL FEEL IT.\n' +
        'Be kind. They can hear you. \u2014 M.' },

      'Ninety-four of ninety-six. Under the hum, from behind the double doors at the end ' +
      'of the corridor, comes the sound of someone moving along a row of beds, talking low ' +
      'and steadily, the way people talk to a frightened animal.'
    ],
    choices: [
      { label: 'Go in. See it.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Find the property room first.', to: 'a3_property' },
      { label: function (s) {
          return s.flag('watchedTheMercy')
            ? 'Follow the service road. See where the gurneys go.'
            : 'Follow the service road behind the east wing.';
        }, tone: 'risk', to: 'a3_service' },
      { label: 'Go around to the front, give your names, and take the beds.', to: 'a3_triage',
        act: function (s) { s.set('toldTheTruthOnTheForm'); } },
      { label: 'Get everyone out. You\u2019ve seen enough.', tone: 'kind',
        show: function (s) { return s.flag('knowsBoat'); }, to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_split',
    chapter: CH,
    place: 'The lime avenue',
    enter: function (s) { s.set('wentInAlone'); },
    text: function (s) {
      var lines = [];
      if (!s.partyCount()) {
        lines.push('There is nobody left to keep outside. I go in alone.');
        return lines;
      }
      lines.push('I go in alone. It takes nine minutes to arrange, and all nine are an argument.');
      if (s.alive('bram')) {
        lines.push('<span class="said">"If you\u2019re not out in an hour," </span>Bram says, ' +
          '<span class="said">"we don\u2019t come in after you. I want that agreed out loud, now, ' +
          'by you. Your decision, not mine."</span>');
        lines.push('I agree, out loud.');
      } else if (s.alive('odile')) {
        lines.push('<span class="said">"If you are not out in an hour," </span>Odile says, ' +
          '<span class="said">"we do not come in after you. I want that agreed out loud, now, ' +
          'by you. It is your decision, not mine."</span>');
        lines.push('I agree, out loud.');
      }
      if (withTeddy(s)) {
        lines.push('Teddy won\u2019t look at me. <span class="said">"You are going in there to ask ' +
          'them about me," </span>he says. <span class="said">"Do not dress it up."</span>');
      }
      if (s.alive('wren')) {
        lines.push({ c: 'whisper', t: 'Wren writes, and holds the pad where only I can see it.' });
        lines.push({ c: 'pad', t: 'if its bad come out and say the word hush and well run' });
        lines.push({ c: 'pad', t: 'dont be brave. be fast' });
      }
      return lines;
    },
    choices: [
      { label: 'In the front. As a patient.', to: 'a3_reception' },
      { label: 'In the back. As a thief.', tone: 'risk', to: 'a3_back' },
      { label: 'Down the service road first.', tone: 'risk', to: 'a3_service' },
      { label: 'Before anyone goes in, ask Teddy what he wants.', tone: 'kind',
        show: function (s) { return s.alive('teddy'); }, to: 'a3_teddy_compact' },
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
      'old morgue, to a gate in a wall. Beyond the gate is the hospital\u2019s north field.',

      'It used to be a field. In 1874 they built a chapel in one corner of it for the dead ' +
      'nobody claimed.',

      { c: 'sep', t: '\u2042' },

      'There is a trench. Machine-cut, forty feet by nine, three-quarters full, and ' +
      '<em>carefully</em> layered: a row of people, a dusting of quicklime, a row of ' +
      'people, a dusting of quicklime.',

      'Each one is in a sheet. Each sheet is tied at the head and the foot with a cord. ' +
      'On each cord, a label.',

      'I climb down and turn one of the labels over. I\u2019ve walked four miles. ' +
      'I\u2019m going to read it.',

      { c: 'note', t: 'FENWICK, ALICE M. \u00b7 D.O.B. 9/14/1951 \u00b7 WARD 11 \u00b7 ' +
        'ADMITTED 4/12 \u00b7 ENDED 5/19\nYIELD: 11 UNITS \u00b7 TYPE B\n' +
        'NO NEXT OF KIN TRACED. CHAPEL SERVICE HELD 5/20. \u2014 M.' },

      'A chapel service, held on May 20, for a woman they had been draining for more than ' +
      'five weeks. The people who drained her held it, and wrote it down, and meant it.'
    ],
    choices: [
      { label: 'Go in. You need to look at Ward Eleven now.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Read more labels. All of them, if you have to.', to: 'a3_pit_read' },
      { label: 'Go back and get the others out. Right now.', tone: 'kind',
        show: function (s) { return !s.flag('wentInAlone'); }, to: 'a3_refuse' },
      { label: 'Go to the chapel.', to: 'a3_chapel' },
      { label: 'Go and find whoever signs off as M.', tone: 'risk', to: 'a3_matron' }
    ]
  });

  S.add({
    id: 'a3_pit_read',
    chapter: CH,
    place: 'The north field',
    enter: function (s) { s.scar(16); s.harden(6); s.set('readThePit'); },
    text: [
      'I read forty-one of them before I stop. What stops me is the pattern.',

      'Admitted in April, ended in May. Admitted in May, ended in May. ' +
      'Yields of nine units, eleven units, six units.',

      'Then, further along, in the newest layer, the dates crowd together:',

      { c: 'note', t: 'OKONKWO, SAMUEL \u00b7 ADMITTED 5/12 \u00b7 ENDED 5/14\nYIELD: 2 UNITS' },
      { c: 'note', t: 'PRICE, HEATHER \u00b7 ADMITTED 5/17 \u00b7 ENDED 5/19\nYIELD: 2 UNITS' },
      { c: 'note', t: 'UNNAMED MALE, APPROX 60 \u00b7 ADMITTED 5/19 \u00b7 ENDED 5/20\nYIELD: 1 UNIT' },

      { c: 'sep', t: '\u2042' },

      'The early April ones lasted nearly forty days. The newest barely lasted two.',

      'So the April ones turned on their own, out there, and were brought in. ' +
      'The newest <em>arrived well</em> and were made into donors, and they didn\u2019t have ' +
      'forty days in them. Being turned on purpose, in a bed, seems to use a person up ' +
      'far faster than turning in the street.',

      'And the yield is falling: eleven units down to one. Whatever this hospital is doing, ' +
      'it\u2019s running out of what it does it with, and getting through people faster ' +
      'for less.'
    ],
    choices: [
      { label: 'Ward Eleven. Now.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Find whoever signs off as M.', tone: 'risk', to: 'a3_matron' },
      { label: 'Get the others. Leave. Tonight.', tone: 'kind', to: 'a3_refuse' },
      { label: 'Find the records these labels were copied from.', to: 'a3_office' },
      { label: 'Go to the chapel in the corner of the field.', to: 'a3_chapel' }
    ]
  });

  S.add({
    id: 'a3_chapel',
    chapter: CH,
    place: 'The chapel',
    enter: function (s) { s.set('wentToTheChapel'); },
    text: [
      'The chapel is eleven feet by twenty and smells of damp hymnals. Somebody has swept it ' +
      'this week.',

      'There are no bodies in here. There\u2019s a table with a cloth on it, and on the cloth, ' +
      'in rows, nine hundred-odd small objects.',

      'A watch. A pair of reading glasses. A wedding ring on a loop of string. A bus pass. ' +
      'A photograph of a dog. A child\u2019s hairclip. A set of car keys. A hearing aid.',

      'Each one has a paper label, and each one has been squared off and dusted.',

      { c: 'sep', t: '\u2042' },

      'Pinned above the table, in the same neat hand as the labels:',

      { c: 'note', t: 'If anyone comes looking for them, they are to be given these and told the truth. ' +
        'All of it. Including my name.\n\u2014 M.' }
    ],
    choices: [
      { label: function (s) {
          return heardHolloway(s)
            ? 'Look for HOLLOWAY, D.'
            : 'Go through the keys on the table. Some of them might still start something.';
        },
        to: 'a3_chapel_keys' },
      { label: 'Take nothing. Go and find M.', tone: 'risk', to: 'a3_matron' },
      { label: 'Take the lot, as proof of what happened to nine hundred people.',
        to: 'a3_office', act: function (s) { s.set('tookTheEffects'); s.scar(10); } },
      { label: 'Go to Ward Eleven.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Sit down in the back pew for a minute. Just a minute.', tone: 'kind',
        to: 'a3_chapel_exit', act: function (s) { s.ease(10); s.soften(5); s.bump('satInTheChapel'); } },
      { label: 'Take one thing, so that one of them gets out of here.', tone: 'kind',
        hint: 'the hairclip, because it is the smallest',
        show: function (s) { return !s.kept('hairslide'); },
        to: 'a3_chapel_exit',
        act: function (s) {
          s.scar(6); s.soften(6);
          s.keep('hairslide', 'I didn\u2019t read its label. I didn\u2019t trust myself to remember the name.');
        },
        toast: ['You put the hairclip in your pocket.', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a3_chapel_exit',
    chapter: CH,
    place: 'The chapel',
    text: function (s) {
      var lines = [
        'Beyond the chapel wall the hospital hums on. In here the small objects keep still, ' +
        'each in its labeled place, waiting for people who may never come.'
      ];
      if (s.kept('hairslide')) {
        lines.push('My hand is in my pocket, closed around the yellow duck. ' +
          'I didn\u2019t read the name. I could still go back and learn it. I don\u2019t.');
      } else {
        lines.push('I get up from the pew. Someone has dusted the table, and will come back ' +
          'tomorrow to dust it again.');
      }
      return lines;
    },
    choices: [
      { label: 'Find the person who wrote the labels.', to: 'a3_matron' },
      { label: 'Go to the ward. See the people behind the names.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Find the records. Count what happened here.', to: 'a3_office' },
      { label: function (s) {
          return heardHolloway(s)
            ? 'Go back to the table and look for HOLLOWAY, D.'
            : 'Go back to the table and look through the keys. Some of them might still start something.';
        },
        to: 'a3_chapel_keys' }
    ]
  });

  S.add({
    id: 'a3_chapel_keys',
    chapter: CH,
    place: 'The chapel',
    enter: function (s) { if (!s.has('keys')) s.give('keys'); s.set('hasTheKeys'); },
    text: function (s) {
      var lines = [];
      if (!heardHolloway(s)) {
        lines.push('Most of the keys belong to cars nobody will drive again. I go along the rows anyway.');
      }
      lines.push('Third row, eleventh along, between a hearing aid and a St. Christopher medal, ' +
        'is a set of keys on a foam fob shaped like a fish. The fob says LUCKY. ' +
        'The label is in the neat hand:');
      lines.push({ c: 'note', t: 'HOLLOWAY, DENNIS \u00b7 WARD 11 \u00b7 ADMITTED 4/23\nKEYS (BOAT). ' +
        'HE ASKED THAT THESE GO TO HIS WIFE JEAN AT 14 ESTUARY VIEW.\nI HAVE NOT BEEN ABLE TO ' +
        'GET THERE. IF YOU CAN, PLEASE. \u2014 M.' });
      lines.push('I stand in a cold chapel holding Dennis Holloway\u2019s boat keys and his last ' +
        'request. Out in the field is a trench full of his neighbors, ' +
        'and the same hand wrote both sets of labels.');
      return lines;
    },
    choices: [
      { label: 'Pocket the keys and go and find M. You have questions now.', tone: 'risk',
        to: 'a3_matron' },
      { label: 'Pocket the keys and leave this place right now.', hint: 'you go with the keys, and nothing here changes',
        to: 'a3_refuse' },
      { label: 'Go and look at Dennis Holloway in his bed first.', tone: 'risk', to: 'a3_ward11' },
      { label: 'Take the keys and the whole table. All nine hundred.', to: 'a3_office',
        act: function (s) { s.set('tookTheEffects'); s.scar(10); } },
      { label: 'Peel the label off and keep it with the keys.', tone: 'kind',
        hint: 'his wife\u2019s address is on it',
        to: 'a3_matron',
        act: function (s) {
          s.set('tookTheRequest'); s.soften(7); s.scar(4);
          s.keep('label', 'I haven\u2019t promised anyone I\u2019ll go. I haven\u2019t thrown it away either.');
        },
        toast: ['You keep his request for Jean.', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a3_property',
    chapter: CH,
    place: 'The property room',
    enter: function (s) { if (!s.has('keys')) s.give('keys'); s.set('hasTheKeys'); },
    text: function (s) {
      var lines = [
        'The property room is an old linen room: steel shelving, nine hundred labeled bags ' +
        'in order of admission, and a card index.'
      ];
      if (heardHolloway(s)) {
        lines.push('HOLLOWAY, D. is in the April section. The bag holds one wallet, one wedding ring, ' +
          'one inhaler, one pair of glasses, and one set of boat keys on a foam fob shaped like a fish.');
      } else {
        lines.push('I start with April, the oldest bags, the ones nobody is coming back for. ' +
          'The fourth one I open holds a wallet, a wedding ring, an inhaler, a pair of glasses, ' +
          'and a set of boat keys on a foam fob shaped like a fish. The card says HOLLOWAY, D.');
      }
      lines.push('Everything is dusted and in order. By the door there\u2019s a chair, and on the floor ' +
        'beside it a half-drunk cup of tea gone cold. Somebody sits here, regularly, among the ' +
        'belongings of the people they are killing.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Behind HOLLOWAY in the card index is a second card, added later in the neat hand:');
      lines.push({ c: 'note', t: 'ASKED FOR JEAN 11 TIMES BEFORE HE WENT UNDER.\nTOLD HIM I WOULD BRING HER. ' +
        'I DID NOT. THERE WAS NO TIME AND THAT IS NOT AN EXCUSE.\n\u2014 M.' });
      return lines;
    },
    choices: [
      { label: function (s) {
          return s.flag('knowsBoat')
            ? 'Take the keys and go. Out, now, to the boat.'
            : 'Take the keys and go. Out, now, to find the boat they fit.';
        }, hint: 'you go with the keys before anyone finds you in here', to: 'a3_refuse' },
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

      'They are strapped at wrist, chest, and ankle, in padded restraints lined by hand with ' +
      'sheepskin, the seams turned away from the skin.',

      'They are clean. Each is covered to the chest with a folded blanket. Their hair has been ' +
      'brushed. Each has a capped IV line taped inside the elbow, and a chart at the foot of the bed ' +
      'with a date on it and a running total.',

      'All of them are humming at the ceiling.',

      { c: 'hum', t: 'h m m m m m m m' },

      'In the bed under the far window, a gray-haired man is twisting his fingers together ' +
      'against the strap: a loop, a tuck, a pull, and then the same again, over and over.',

      { c: 'sep', t: '\u2042' },

      'A woman in her twenties is working her way down the row with a tray: a sponge, a cup of water, ' +
      'a soft toothbrush. She is doing mouth care, bed by bed, talking to each of them as she ' +
      'goes about the weather, the generator, and somebody called Pav who has lost his boots.',

      'She sees me and doesn\u2019t stop.',

      '<span class="said">"If you\u2019re going to be sick, the sink\u2019s through there," </span>she says. ' +
      '<span class="said">"If you\u2019re going to say something clever about this, don\u2019t."</span>'
    ],
    choices: [
      { label: 'Say nothing. Help her with the mouth care.', tone: 'kind', to: 'a3_ward_help' },
      { label: function (s) {
          if (s.flag('hollowayCard') && !heardFirstName(s) && !s.flag('hasTheKeys')) {
            return 'Look for D. Holloway.';
          }
          return knowsHollowayName(s)
            ? 'Find Dennis Holloway.'
            : 'Go to the gray-haired man under the window who keeps twisting his fingers.';
        },
        to: 'a3_ward_holloway' },
      { label: '"How many of these came in here well?"', tone: 'risk', to: 'a3_ward_question' },
      { label: '"Why do you stay?"', tone: 'kind', to: 'a3_ward_why' },
      { label: 'Walk out. Find the person in charge.', tone: 'risk', to: 'a3_matron' },
      { label: 'Start unstrapping them.', tone: 'cruel', to: 'a3_ward_unstrap' },
      { label: 'Go back out to the others. Get them away from here.', hint: 'you leave the ward as it is',
        show: function (s) { return !s.flag('wentInAlone'); }, to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_ward_help',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) { s.soften(10); s.scar(14); s.set('didMouthCare'); },
    text: [
      'I do eleven beds. She doesn\u2019t thank me or explain anything, but after the fourth ' +
      'she starts telling me their names without being asked.',

      '<span class="said">"This is Margaret. Lunch lady at St. Jude\u2019s. ' +
      'This is Oyelaran. Came in off Hawksmoor Road the second week with his arm ' +
      'already gone black. This is Lou. Drove the number nine bus."</span>',

      'They can\u2019t swallow, and they hum twenty hours a day, so their mouths dry out, ' +
      'crack, and bleed. If nobody does this, they suffer, and the one thing this ward is sure of ' +
      'is that <em>they still feel it</em>.',

      { c: 'sep', t: '\u2042' },

      'At the eleventh bed, the one under the far window, she sits down on the edge of the ' +
      'mattress for a moment, the sponge still in her hand. The gray-haired man in the bed keeps twisting ' +
      'his fingers against the strap.',

      '<span class="said">"I\u2019ll tell you something," </span>she says. ' +
      '<span class="said">"You did eleven beds and you never once asked me to justify ' +
      'myself. That\u2019s bought you this."</span>',

      '<span class="said">"They\u2019re not all from outside. Not since May."</span>'
    ],
    choices: [
      { label: '"Who decides?"', to: 'a3_ward_question' },
      { label: '"Show me the ones from inside."', tone: 'risk', to: 'a3_ward_new' },
      { label: '"Why do you stay?"', tone: 'kind', to: 'a3_ward_why' },
      { label: function (s) {
          return knowsHollowayName(s)
            ? 'Ask whether the man in this bed is Dennis Holloway.'
            : 'Ask about the man in the bed she\u2019s sitting on.';
        }, to: 'a3_ward_holloway' },
      { label: 'Go and find whoever runs this. Now.', tone: 'risk', to: 'a3_matron' }
    ]
  });

  S.add({
    id: 'a3_ward_why',
    chapter: CH,
    place: 'Ward 11',
    text: [
      'She looks down the row of ninety-four beds.',

      '<span class="said">"Because if I go, nobody does the mouths," </span>she says.',

      '<span class="said">"That\u2019s it. That\u2019s the whole answer. I\u2019ve tried all the other ' +
      'answers and they come apart in your hands. That one doesn\u2019t. If I walk out of here ' +
      'tonight, then tomorrow ninety-four people lie in the dark with their mouths splitting open ' +
      'and nobody talks to them about the weather."</span>',

      'She wrings the sponge out.',

      '<span class="said">"I know what we are. I\u2019ve known since May 12. ' +
      'I\u2019m not asking you to think well of me. Turning up every day and doing the mouths ' +
      'is still going along with it. I know that too."</span>'
    ],
    choices: [
      { label: '"That isn\u2019t nothing."', tone: 'kind', to: 'a3_ward_question',
        act: function (s) { s.soften(8); } },
      { label: '"It\u2019s still going along with it."', to: 'a3_ward_question',
        act: function (s) { s.harden(6); s.scar(6); } },
      { label: '"Then help me stop it."', tone: 'risk', to: 'a3_ward_ally' },
      { label: 'Don\u2019t wait for her help. Start undoing the straps.', tone: 'cruel',
        hint: 'you go against the one person on this ward who might help you', to: 'a3_ward_unstrap' },
      { label: function (s) {
          return s.flag('didMouthCare')
            ? 'Say nothing. Pick up the sponge. Do the twelfth bed.'
            : 'Say nothing. Pick up a sponge and do the next bed with her.';
        }, tone: 'kind',
        to: 'a3_ward_question', act: function (s) { s.soften(12); s.set('didTheTwelfth'); } }
    ]
  });

  S.add({
    id: 'a3_ward_ally',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) { s.set('hasAlly'); },
    text: [
      'She says nothing for a while.',

      '<span class="said">"There\u2019s four of us who would," </span>she says at last, very low. ' +
      '<span class="said">"Me, Pav, Iris on nights, and the kid on the gate. ' +
      'We\u2019ve talked about it for days and done nothing, because every version ends with ' +
      'ninety-four people dying of thirst while we argue about who gets the generator."</span>',

      '<span class="said">"You want to know what stops us? It isn\u2019t Matron."</span>',

      'She nods at the beds.',

      '<span class="said">"Them. There\u2019s no good ending for them. Every way out of this ward ' +
      'goes through ninety-four people who can\u2019t consent to any of it. So we stay, we do the ' +
      'mouths, and we hate ourselves in shifts."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"But if somebody from outside walked in and took the decision off us \u2014 "</span> ' +
      'She stops. Starts again. <span class="said">"Don\u2019t make me finish that. ' +
      'Just know the back gate isn\u2019t locked, the quicklime store isn\u2019t locked, and ' +
      'the generator\u2019s behind the kitchens."</span>'
    ],
    choices: [
      { label: '"I\u2019m going to burn it."', tone: 'cruel', to: 'a3_final',
        show: function (s) { return s.has('lighter'); },
        act: function (s) { s.set('allyKnowsBurn'); s.harden(8); } },
      { label: '"I\u2019m going to take the records out instead."', to: 'a3_office',
        act: function (s) { s.set('allyKnowsLedger'); } },
      { label: '"I\u2019m going to talk to the Matron first."', to: 'a3_matron' },
      { label: function (s) {
          return knowsAnyBoat(s)
            ? '"I\u2019m going to get my people on a boat and go."'
            : '"I\u2019m going to get my people out of here."';
        }, hint: 'she and the others are left to decide on their own', to: 'a3_refuse',
        act: function (s) { s.scar(10); } }
    ]
  });

  S.add({
    id: 'a3_ward_new',
    chapter: CH,
    place: 'Ward 11 \u00b7 the new row',
    enter: function (s) { s.set('sawTheNewRow'); s.scar(20); s.harden(4); },
    text: [
      'The last eleven beds are different. It takes me a moment to see how.',

      'The restraints are newer. The skin is better. The hair hasn\u2019t grown out. ' +
      'Where the other charts say ADMITTED, these say ' +
      '<span class="wound">CONVERTED</span>, with a date in May, and under that is a line ' +
      'the others don\u2019t have:',

      { c: 'note', t: 'CONSENT: VERBAL, WITNESSED (2)\nCOMPENSATION: FAMILY PLACED, EAST BLOCK. ' +
        'RATIONS CAT. A FOR LIFE.' },

      'Consent. Witnessed. Twice.',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"They volunteered," </span>she says behind me. <span class="said">' +
      '"Nobody can get their head around that, so I\u2019ll say it slowly. ' +
      'They were told what it was, what it would be like, and how long it would take. ' +
      'They said yes. They signed. And their families got a warm room ' +
      'and food for as long as this place stands."</span>',

      '<span class="said">"Bed ninety-one is Pav\u2019s dad. Pav witnessed it. ' +
      'Held the pen for him, because his hands were going."</span>'
    ],
    choices: [
      { label: '"They were paid. Don\u2019t call it consent."', to: 'a3_matron',
        act: function (s) { s.scar(10); s.set('refusedTheLogic'); } },
      { label: '"If it saves people, it saves people."', to: 'a3_matron',
        act: function (s) { s.harden(10); s.set('acceptedTheLogic'); } },
      { label: 'Ask if there is a form. Ask to read it.', tone: 'risk', to: 'a3_office' },
      { label: 'Go outside and be sick. Then go and find whoever runs this.', to: 'a3_matron',
        act: function (s) { s.scar(12); s.soften(4); } }
    ]
  });

  S.add({
    id: 'a3_ward_question',
    chapter: CH,
    place: 'Ward 11',
    text: [
      'She finishes the mouth she is doing before she answers. She always finishes the mouth.',

      '<span class="said">"Matron decides, with the doctor. Matron\u2019s the head nurse. ' +
      'The doctor does the medicine, and Matron does the \u2014 "</span> She looks for a soft word ' +
      'and doesn\u2019t find one. <span class="said">"The selecting."</span>',

      '<span class="said">"Forty of these came in off the roads already turned. Forty-three were ' +
      'brought in by their own families. Sit with that one. And eleven are ours."</span>',

      '<span class="said">"If you\u2019re going to do something about it, do it to Matron. ' +
      'Not to the beds. The beds didn\u2019t choose."</span>'
    ],
    choices: [
      { label: 'Go and find the Matron.', tone: 'risk', to: 'a3_matron' },
      { label: 'See the eleven first.', tone: 'risk', to: 'a3_ward_new' },
      { label: 'Find the office and the records.', to: 'a3_office' },
      { label: '"Help me stop it."', tone: 'risk', to: 'a3_ward_ally' },
      { label: 'Ignore her. Start undoing the straps.', tone: 'cruel',
        hint: 'they can\u2019t stand, and some of them still bite', to: 'a3_ward_unstrap' },
      { label: function (s) {
          return knowsHollowayName(s)
            ? '"Which one is Dennis Holloway?"'
            : '"And the gray-haired man under the window? What is he doing with his hands?"';
        }, to: 'a3_ward_holloway' }
    ]
  });

  S.add({
    id: 'a3_ward_holloway',
    chapter: CH,
    place: 'Ward 11 \u00b7 bed 11',
    enter: function (s) {
      s.set('sawHolloway'); s.scar(16);
      if (!s.has('keys')) { s.give('keys'); s.set('hasTheKeys'); s.set('keysFromLocker'); }
    },
    text: function (s) {
      var lines = [
        'Dennis Holloway is sixty-one and has been in this bed since April 23.',

        'He is clean, his hair brushed. His chart says 48 UNITS, more than anyone else ' +
        'on the ward. Dennis Holloway has been the best thing that ever happened to ' +
        'St. Amaranth Mercy, and he has been paying for it ever since, a pint at a time.',

        'His eyes are open and empty. His throat works steadily. His hands are strapped, but his ' +
        'fingers are moving, slightly and without stopping, in a pattern.',

        { c: 'sep', t: '\u2042' },

        'I watch the fingers for a long time before I understand, and when I do, I have to ' +
        'hold on to the bed rail.',

        'He is tying a bowline. Over and over. It\u2019s the first knot a sailor learns and the last ' +
        'he forgets. He has been tying it in an empty hand, in a locked ward, for a month.',

        'Taped to the head of the bed, in the neat hand: <em>LIKES THE WINDOW OPEN. ' +
        'TALK TO HIM ABOUT BOATS.</em>'
      ];
      lines.push(s.flag('keysFromLocker')
        ? 'And in the drawer of his locker, labeled, waiting: a set of keys on a foam fob shaped ' +
          'like a fish.'
        : 'His locker drawer is empty. His keys are already in my pocket.');
      return lines;
    },
    choices: [
      { label: function (s) {
          var talk = s.flag('knowsBoat') ? 'Tell him about his boat' : 'Talk to him about boats, as the note asks';
          return s.flag('keysFromLocker') ? 'Take the keys. ' + talk + ' first.' : talk + '.';
        }, tone: 'kind', to: 'a3_matron',
        act: function (s) { s.soften(14); s.scar(14); s.set('toldHimAboutTheBoat'); },
        toast: ['You talk to him about the river and the boat. His fingers keep tying.', 'good'] },
      { label: function (s) {
          return s.flag('keysFromLocker')
            ? 'Take the keys. Don\u2019t look at his face again.'
            : 'Walk away. Don\u2019t look at his face again.';
        }, to: 'a3_matron',
        act: function (s) { s.harden(8); s.scar(10); } },
      { label: function (s) {
          return s.flag('keysFromLocker') ? 'Take the keys, and end it for him.' : 'End it for him.';
        }, tone: 'cruel',
        hint: function (s) {
          if (s.has('morphine')) return 'you kill him with the morphine, and the nurse sees it';
          if (s.has('knife')) return 'you kill him with the knife, and the nurse sees it';
          return 'all you have is a pillow, and the nurse is watching';
        },
        to: 'a3_holloway_end' },
      { label: 'Open the window for him.', tone: 'kind', to: 'a3_matron',
        act: function (s) { s.soften(10); s.scar(8); s.set('openedTheWindow'); },
        toast: ['The hum in the ward shifts a little. Ninety-four heads turn toward the open window.', 'rot'] }
    ]
  });

  S.add({
    id: 'a3_holloway_end',
    chapter: CH,
    place: 'Ward 11 \u00b7 bed 11',
    enter: function (s) {
      s.harden(10); s.scar(22);
      /* a v1.9 save may hold the old pillow death; the pillow now fails */
      if (s.val('hollowayMethod') === 'pillow') {
        s.set('hollowayMethod', false); s.set('endedHolloway', false); s.set('triedThePillow');
      }
      if (!s.flag('hollowayMethod') && !s.flag('triedThePillow')) {
        if (s.has('morphine')) { s.take('morphine'); s.set('hollowayMethod', 'morphine'); }
        else if (s.has('knife')) s.set('hollowayMethod', 'knife');
        else s.set('triedThePillow');
      }
      /* hollowayMethod is only ever set on a real death */
      if (s.flag('hollowayMethod')) s.set('endedHolloway');
    },
    text: function (s) {
      var lines = [], how = s.val('hollowayMethod', '');
      if (!how) {
        lines.push('I take the pillow from the empty bed beside his and press it down over his face ' +
          'with both hands and all my weight.');
        lines.push('Under the pillow, the hum doesn\u2019t stop. It doesn\u2019t even change. ' +
          'I hold on until my arms shake, and the note comes up through the pillow as steady as ' +
          'before. Whatever is humming in him doesn\u2019t need the breath. ' +
          'His fingers keep tying the knot the whole time.');
        lines.push({ c: 'sep', t: '\u2042' });
        lines.push('The woman with the sponge lets me go on for a long time before she comes over. ' +
          'She takes the pillow out of my hands, puts it back on the empty bed, and straightens ' +
          'his blanket. She says, to him, not to me:');
        lines.push('<span class="said">"Sorry, Dennis. Nobody\u2019s doing that to you again."</span>');
        lines.push('Then she looks up.');
        lines.push('<span class="said">"They don\u2019t need the air," </span>she says. <span class="said">' +
          '"Not the way we do. You could hold that there all night. If you want to end something, ' +
          'end what puts them in these beds. Not him."</span>');
        return lines;
      }
      if (how === 'morphine') {
        lines.push(s.flag('morphineForMe')
          ? 'I use the ampoule I have carried since Rosco\u2019s, the one I told Odile was for me. ' +
            'It goes into the line in his arm.'
          : 'I use the ampoule of morphine from Rosco\u2019s. It goes into the line in his arm.');
        lines.push('It takes under a minute. He doesn\u2019t struggle. The fingers stop ' +
          'halfway through a bowline.');
      } else {
        lines.push('I use the knife, once, where it will be quickest. It takes under a minute. ' +
          'He doesn\u2019t struggle. The fingers stop halfway through a bowline.');
      }
      lines.push('That is the part I can\u2019t stop seeing: the knot left <em>halfway through</em>.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The woman with the sponge watches. She doesn\u2019t move ' +
        'or call out. When it\u2019s over she comes and straightens his blanket, ' +
        'folds his hands, and says, to him, not to me:');
      lines.push('<span class="said">"Okay, Dennis. You\u2019re all done now."</span>');
      lines.push('Then she looks up.');
      lines.push('<span class="said">"Ninety-three," </span>she says. <span class="said">' +
        '"Are you going to do ninety-three? Because if you are, I\u2019ll hold the door. And if ' +
        'you\u2019re not, you\u2019ve just done the one that was easiest for you and called it mercy."</span>');
      return lines;
    },
    choices: [
      { label: function (s) {
          return s.flag('endedHolloway')
            ? '"No. But I\u2019m going to end the thing that fills these beds."'
            : '"Then I\u2019m going to end the thing that fills these beds."';
        }, tone: 'risk',
        to: 'a3_matron', act: function (s) { s.set('sworeToEndIt'); } },
      { label: '"Yes. All ninety-three. Hold the door."', tone: 'cruel', to: 'a3_final',
        show: function (s) { return s.flag('endedHolloway'); },
        act: function (s) { s.set('choseTheWard'); s.harden(25); s.scar(30); } },
      { label: 'Open his window, as the note on his bed asks.', tone: 'kind', to: 'a3_matron',
        show: function (s) { return !s.flag('endedHolloway'); },
        act: function (s) { s.soften(10); s.scar(8); s.set('openedTheWindow'); },
        toast: ['The hum in the ward shifts a little. Ninety-four heads turn toward the open window.', 'rot'] },
      { label: function (s) {
          return s.flag('keysFromLocker') ? 'Say nothing. Take the keys and walk out.' : 'Say nothing. Walk out.';
        }, tone: 'cruel', to: 'a3_matron',
        act: function (s) { s.harden(14); s.scar(12); } },
      { label: function (s) {
          return s.flag('endedHolloway')
            ? '"I don\u2019t know. Help me decide."'
            : '"I don\u2019t know what to do. Help me decide."';
        }, to: 'a3_ward_ally' }
    ]
  });

  S.add({
    id: 'a3_ward_unstrap',
    chapter: CH,
    place: 'Ward 11',
    enter: function (s) {
      s.hurt(26); s.infect(18); s.scar(26); s.harden(10);
      s.set('unstrappedThem');
      /* cleared by a3_matron and a3_final; an ending reached straight from here happens on the ward */
      s.set('stillOnTheWard');
    },
    text: function (s) {
      var lines = [
        'I get four of them undone before anybody reaches me.',

        'They don\u2019t get up. That\u2019s almost funny. After weeks of wasting in a bed, none of them ' +
        'can stand. The first one slides off the ' +
        'mattress onto the pine floor like a dropped coat and lies there, humming.',

        'The second gets a hand in my hair and drags my face down toward its open mouth ' +
        'with a grip like a cramp. The woman with the sponge stops it: two blows across the ' +
        'forearm with a steel basin, and then she puts herself between me and the bed ' +
        'and <span class="wound">screams at me</span>. It\u2019s the first raised voice I\u2019ve ' +
        'heard in this building.',

        '<span class="said">"They CANNOT CONSENT! They can\u2019t consent to being saved either, ' +
        'you absolute \u2014 they are not a statement you get to make!"</span>',

        { c: 'sep', t: '\u2042' },

        'She\u2019s crying. She straps all four back in herself, checking each one\u2019s skin ' +
        'as she goes and apologizing to each of them by name.',

        'My scalp is bleeding. Something got into a scratch on my arm. I feel the hum settle ' +
        'in my back teeth and <em>stay</em>.'
      ];
      if (s.health < 65) {
        lines.push('My legs have started to shake, and the floor tilts when I turn my head. ' +
          'I was in no state for this before I started.');
      }
      return lines;
    },
    choices: [
      { label: 'Apologize. Properly. Then go and find whoever is in charge.', tone: 'kind', to: 'a3_matron',
        act: function (s) { s.soften(10); s.scar(10); } },
      { label: 'Say nothing. Go and find whoever is in charge.', to: 'a3_matron',
        act: function (s) { s.harden(6); } },
      { label: 'Keep going. All ninety-four.', tone: 'cruel',
        hint: function (s) {
          return s.health < 65
            ? 'you are hurt badly enough already that this could kill you'
            : 'you get hurt worse, and the infection goes deeper';
        },
        /* a body that was already failing gives out on the ward floor */
        to: function (s) { return s.health < 45 ? 'end_body_failed' : 'a3_final'; },
        act: function (s) { s.set('choseTheWard'); s.hurt(20); s.infect(20); s.harden(20); s.scar(20); } },
      { label: 'Go and wash the wound out. Right now.', tone: 'kind', to: 'a3_matron',
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
      'The office is at the end of the east wing, with MATRON painted on the door. ' +
      'The door stands open; the light is on over the desk.',

      'A desk. A chair. A kettle. A framed photograph of a baseball team from 1991. ' +
      'And on the desk, closed, squared to the edge, a hardcover ledger about four inches thick.',

      'Nine hundred names in a neat hand. Each with a date of admission, a date of ending, ' +
      'and a yield.',

      { c: 'sep', t: '\u2042' },

      'The last forty pages are different. Same handwriting, but the entries have grown ' +
      'a fourth column, headed:',

      { c: 'note', t: 'WAS IT NECESSARY? \u2014 my answer, written the same night, before I slept.' },

      'She has filled it in on every line. Nearly all say YES. ' +
      'Some say <em>I think so</em>. Eleven, scattered through May, say ' +
      '<span class="wound">NO</span>. Each of those has a line ruled under it and, ' +
      'beside it, in the same hand, a single word:',

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
    enter: function (s) { s.set('readTheLastPage'); s.set('heardNineWeeks'); },
    text: [
      'The last entry is dated yesterday, and it isn\u2019t a name.',

      { c: 'note', t: 'YIELD CONTINUES TO FALL. 1.2 units/donor and dropping. At this rate the ' +
        'treatment ends in nine weeks whatever we do.\n\nThe arithmetic I have been doing since May ' +
        'only worked while the yield held. It does not hold. Which means every name in this book ' +
        'after May 12 bought nothing, and I signed each one of them YES.\n\n' +
        'I will tell the next person who walks in here. Whoever they are. I will tell them all of it ' +
        'and I will not soften a word of it, and then I will abide by what they say, because I have ' +
        'proven conclusively that I cannot be trusted to be the one who decides.\n\n' +
        'If you are reading this, you are the next person who walked in here.\n\u2014 M.' },

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
    enter: function (s) {
      s.set('metTheMatron'); s.set('stillOnTheWard', false);
      if (s.flag('burnedTheLedger')) s.set('knowsTheCopy');
    },
    text: function (s) {
      var lines = [
        'The head of nursing is about sixty-five, in a cardigan, holding two mugs of tea. ' +
        'Everyone here still calls her by the old title, Matron. She hands me one of the mugs ' +
        'before she says a word.'
      ];
      if (s.flag('burnedTheLedger')) {
        lines.push('She looks at what is left of her ledger, curled and black on the desk, ' +
          'for a long moment.');
        lines.push('<span class="said">"There is a copy," </span>she says. <span class="said">' +
          '"Every page, in a box file under this desk. I did not write nine hundred names down ' +
          'to lose them to one match."</span>');
      }
      if (s.flag('sheSawYouRead')) {
        lines.push('<span class="said">"You have read it," </span>she says. <span class="said">' +
          '"Good. That saves us the worst forty minutes."</span>');
      } else {
        lines.push('<span class="said">"Sit down," </span>she says. <span class="said">' +
          '"I am going to tell you what we do here. All of it. I will not make it easier ' +
          'to hear, and you are not to make it easier to say by nodding."</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('She talks for eleven minutes. I hold my tea until it goes cold.');
      lines.push('They take in everyone. The well are fed, housed, and put to work. ' +
        'The turned go to Ward Eleven, where they are washed, fed, and strapped to their beds. ' +
        'Every morning at six, the staff draw blood from them.');
      lines.push('Dr. Aytoun makes a gray serum from that blood. It has stopped the hum in ' +
        'eleven of thirteen people who were bitten. I ask Matron to repeat the number. She does.');
      lines.push('<span class="said">"And since May 12," </span>she says, ' +
        '<span class="said">"when the wards filled and the yield began to fall, we have been asking ' +
        'people to volunteer for the beds. Eleven have. I wrote the words that asked them. ' +
        'I will not tell you I was coerced by circumstance. Circumstance does not ' +
        'write a consent form. I did."</span>');
      if (withTeddy(s)) {
        lines.push({ c: 'sep', t: '\u2042' });
        if (teddyInside(s)) {
          lines.push('She looks past me, through the open door and down the corridor, to where Teddy ' +
            'sits in a chair with a blanket somebody has put over his knees.');
          lines.push('<span class="said">"And before you ask about your friend: yes. ' +
            'He is precisely who I would ask. He is dying, he knows it, and a man ' +
            'in his condition yields almost nothing \u2014 one unit, perhaps two."</span>');
        } else {
          lines.push('I ask her about Teddy, who is waiting outside: seventy-one, one lung, ' +
            'and less breath every night.');
          lines.push('<span class="said">"Then yes," </span>she says. <span class="said">' +
            '"He is precisely who I would ask. He is dying, he knows it, and a man ' +
            'in his condition yields almost nothing \u2014 one unit, perhaps two."</span>');
        }
        lines.push('<span class="said">"Which is why I am not going to ask him. ' +
          'I want you to notice that I could, that it would be easy, and that I am not."</span>');
      }
      return lines;
    },
    choices: [
      { label: '"Why are you telling me this?"', to: 'a3_matron_why' },
      { label: '"Give me the treatment. I\u2019m infected."', tone: 'risk',
        show: function (s) { return s.infection > 0; },
        hint: treatmentHint('the infection may be too far along for it to work'),
        to: treatmentOutcome, act: tryTheTreatment },
      { label: '"This ends tonight. All of it."', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"Show me the serum."', to: 'a3_matron_serum' },
      { label: '"We\u2019re leaving. Now. All of us."', hint: 'you walk out without answering her', to: 'a3_refuse' },
      { label: 'Drink the tea and say nothing for a while.', to: 'a3_matron_why',
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
      'that person\u2019s blood saves four others. I would do April again tomorrow, and ' +
      'twice on Sundays."</span>',

      '<span class="said">"In May I wrote to a man with emphysema and asked whether he would ' +
      'consider converting, in exchange for a warm room for his daughter. He said yes. ' +
      'I witnessed it. Every night since, I have asked myself whether there is any ' +
      'real distance between what I did and holding a gun to his head. The answer keeps ' +
      'coming back <em>no</em>, and I keep doing it."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"Forty-one years I have worked in this building. Every name in it ' +
      'has been my decision. The last thing I can still do about it is ' +
      'hand the choice to a stranger who has walked four miles to get here and has not yet ' +
      'grown used to any of it."</span>',

      '<span class="said">"So. You have the whole picture. What happens to St. Amaranth Mercy?"</span>'
    ],
    choices: [
      { label: '"Show me the serum first."', to: 'a3_matron_serum' },
      { label: '"You don\u2019t get to hand this to me."', tone: 'risk', to: 'a3_matron_refuse' },
      { label: '"It ends. Tonight."', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"It continues. And I\u2019ll help you run it."', tone: 'cruel', to: 'a3_final',
        act: function (s) { s.set('acceptedTheOffice'); s.harden(16); } },
      { label: '"Give me the treatment and let me go."', tone: 'risk',
        show: function (s) { return s.infection > 0; },
        hint: treatmentHint('it may be too late for the dose to work'),
        to: treatmentOutcome, act: tryTheTreatment }
    ]
  });

  S.add({
    id: 'a3_matron_refuse',
    chapter: CH,
    place: "The Matron's office",
    enter: function (s) { s.set('heardNineWeeks'); },
    text: function (s) { return [
      'She takes it without argument. If anything, she looks relieved.',

      '<span class="said">"No," </span>she agrees. <span class="said">"I do not. That is quite right, ' +
      'and the most sensible thing anyone has said in this office since May."</span>',

      'She puts her mug down.',

      '<span class="said">"But you are standing in it now. That is the position. You did not ask ' +
      'for it, and it is not fair, and here you are. In about ninety seconds you will either ' +
      'do something or not, and both are the same size of decision."</span>',

      { c: 'sep', t: '\u2042' },

      (s.flag('readTheLastPage')
        ? '<span class="said">"You have read my last page, so you already know the one thing ' +
          'I would have told you. '
        : '<span class="said">"I will tell you the one thing I know that you do not. ') +
      'The yield is finished. Nine weeks at the outside. After that this building is ninety-four ' +
      'people in beds, a generator, and the forty of us who have made ourselves into the sort of ' +
      'people who did this."</span>',

      '<span class="said">"This hospital will not see five more years. What it does between ' +
      'now and the end is all that is left to decide."</span>'
    ]; },
    choices: [
      { label: '"Then it ends tonight."', tone: 'risk', to: 'a3_final',
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"Then give me the serum and we\u2019re even."', to: 'a3_matron_serum' },
      { label: function (s) {
          if (s.has('ledger')) return '"Then I\u2019m taking your ledger. People need to know what was done here."';
          return s.flag('burnedTheLedger')
            ? '"Then give me the copy. People need to know what was done here."'
            : '"Then give me the ledger. People need to know what was done here."';
        }, to: 'a3_final',
        show: function (s) { return !s.flag('burnedTheLedger') || s.flag('knowsTheCopy'); },
        act: function (s) { if (!s.has('ledger')) s.give('ledger'); s.set('tookTheLedger'); } },
      { label: '"Then I\u2019m taking my people and going."', hint: 'you leave the decision with her',
        to: 'a3_refuse' }
    ]
  });

  S.add({
    id: 'a3_matron_serum',
    chapter: CH,
    place: 'The dispensary',
    enter: function (s) { s.set('sawTheSerum'); if (!s.has('vial')) s.give('vial'); },
    text: [
      'Dr. Aytoun is asleep at her desk and doesn\u2019t wake. Matron takes a key off a hook ' +
      'and opens the cold cabinet herself.',

      'There are nine vials left. Nine, in a rack, in a gray rubber tray, in a hospital with ' +
      'ninety-four donors and a falling yield.',

      'The serum is gray, and the gray won\u2019t settle. When I hold the vial still for a second ' +
      'or two, I see that ' +
      '<span class="wound">it isn\u2019t still either</span>: whatever is in there is ' +
      'turning in a very slow circle without any help from me.',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"One dose arrests it," </span>she says. <span class="said">' +
      '"It does not reverse it. Whatever the hum has already taken of you, you do not get back. ' +
      'You simply stop giving it any more."</span>',

      '<span class="said">"Nine doses. The last nine that will ever exist, ' +
      'because the yield is done. You can see why I have not been sleeping."</span>',

      'She puts one in my hand without being asked.'
    ],
    choices: [
      { label: 'Take it. All nine. Walk out of this building tonight.', tone: 'cruel',
        hint: 'the hospital has none left for the next people bitten',
        to: 'end_serum',
        act: function (s) { s.give('vial', 8); s.set('tookAllNine'); s.harden(20); s.scar(10); } },
      { label: 'Take the one. Leave the other eight.', to: 'a3_final',
        act: function (s) { s.set('tookOne'); s.soften(6); } },
      { label: 'Take none of it.', tone: 'kind', to: 'a3_final',
        act: function (s) { s.take('vial'); s.set('tookNone'); s.soften(14); } },
      { label: 'Use it now, on yourself, in front of her.', tone: 'risk',
        show: function (s) { return s.infection > 0; },
        hint: treatmentHint('the infection may be past what one dose can stop'),
        to: treatmentOutcome, act: tryTheTreatment },
      { label: 'Ask her what happens to the eight if you take them.', to: 'a3_matron_eight' }
    ]
  });

  S.add({
    id: 'a3_matron_eight',
    chapter: CH,
    place: 'The dispensary',
    text: [
      '<span class="said">"Eight people bitten between now and the end of the year ' +
      'do not get them," </span>she says. <span class="said">"That is the entire ' +
      'consequence. They are not earmarked. There is no list. Eight strangers will ' +
      'walk up that drive in the next few months with a bite on them. You will never meet ' +
      'any of them, and they will die humming."</span>',

      'She says it flatly. She isn\u2019t trying to stop me.',

      '<span class="said">"I have made nine hundred decisions in this building, and the only thing ' +
      'I have learned worth passing on is this: do not pretend that the people you will never meet ' +
      'are not people. That is how a hospital gets to where this one is, ' +
      'one entirely reasonable step at a time."</span>'
    ],
    choices: [
      { label: function (s) {
          return s.flag('tookTheTreatment') ? 'Take one for the road. Leave seven.' : 'Take one. Leave eight.';
        }, to: 'a3_final',
        act: function (s) { if (!s.has('vial')) s.give('vial'); s.set('tookOne'); s.soften(8); } },
      { label: function (s) {
          return s.flag('tookTheTreatment') ? 'Take all eight anyway, and go.' : 'Take all nine anyway, and go.';
        }, tone: 'cruel', to: 'end_serum',
        act: function (s) { s.give('vial', 8); s.set('tookAllNine'); s.harden(22); s.scar(12); } },
      { label: function (s) {
          return s.flag('tookTheTreatment') ? 'Take nothing more.' : 'Take none.';
        }, tone: 'kind', to: 'a3_final',
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
    text: function (s) {
      var lines = [];
      if (!s.flag('metTheMatron')) {
        lines.push('Dr. Aytoun doesn\u2019t argue. She sends for the head of nursing, a woman of about ' +
          'sixty-five in a cardigan whom everyone calls Matron, and Matron walks me to the ' +
          'dispensary without asking me a single question.');
      }
      lines.push('It goes in slowly, into the back of my hand, over about ninety seconds. Matron talks ' +
        'the whole time, about nothing in particular: the hospital baseball team she played on, ' +
        'the 1991 county final, a catcher named Brenda who swore like a sailor.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The hum drains out of my back teeth first. Then my jaw, my sinuses, ' +
        'the long bones of my arms, the floor of my pelvis: places I didn\u2019t know it had ' +
        'reached, falling quiet one after another, like rooms in a house going dark.');
      lines.push('What it leaves behind is an <span class="cold">absence</span>, a gap where ' +
        'everything the hum had already taken used to be. I can feel its edges.');
      lines.push('I won\u2019t get that back, and nobody here pretends I will.');
      lines.push('<span class="said">"There," </span>she says, and puts a Band-Aid on it. ' +
        'The Band-Aid has a cartoon dinosaur on it, because that\u2019s what the hospital has.');
      return lines;
    },
    choices: [
      { label: '"Now show me where the serum comes from."', to: 'a3_treatment_source',
        show: function (s) { return !s.flag('sawWard11'); } },
      { label: '"Now it ends. Tonight."', tone: 'risk', to: 'a3_final',
        show: function (s) { return s.flag('metTheMatron') || s.flag('sawWard11'); },
        act: function (s) { s.set('declaredTheEnd'); } },
      { label: '"Thank you." And mean it, and hate that you mean it.', to: 'a3_final',
        act: function (s) { s.scar(12); s.set('thankedHer'); } },
      { label: 'Ask her for more doses, for the road.', tone: 'cruel', to: 'a3_matron_eight' }
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
      'Matron walks me from the dispensary to a window that looks into Ward Eleven. The nurse inside ' +
      'is cleaning a woman\u2019s mouth with a damp sponge. Each time the woman hums, the nurse ' +
      'stops to listen, then carries on as gently as before.',
      'Ninety-four beds. Ninety-four charts. Under the Band-Aid, the back of my hand still ' +
      'aches from the needle. I can put that hand flat against the glass. I can\u2019t give back ' +
      'what is in it.',
      'Matron stays beside me until I step away. Neither of us says thank you.'
    ],
    choices: [
      { label: 'Ask that the patients be named in every account of this place.', tone: 'kind',
        to: 'a3_final', act: function (s) { s.soften(8); s.set('askedForNames'); } },
      { label: 'Tell Matron you will close the ward tonight.', tone: 'risk',
        to: 'a3_final', act: function (s) { s.set('declaredTheEnd'); s.scar(6); } },
      { label: 'Turn away. You needed the dose; you can\u2019t look any longer.',
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
        'I walk back down the avenue of pruned lime trees, the lights of a working hospital ' +
        'behind me and nothing ahead but four miles of road and a river.'
      ];
      if (s.flag('knowsBoat')) {
        lines.push(s.flag('foundBoat')
          ? 'The boat will still be there: riding high, canopy zipped, three-quarters of a tank, ' +
            'on a river they won\u2019t cross.'
          : 'There\u2019s a boat at the sailing club, on a river they won\u2019t cross. ' +
            'I\u2019ve never been aboard.');
      }
      if (s.has('keys')) {
        lines.push('The keys are in my pocket, on their foam fish. The fob says LUCKY. ' +
          'I haven\u2019t decided yet whether that\u2019s a joke at my expense.');
      } else if (s.flag('foundBoat')) {
        lines.push('There are no keys. There\u2019s a boat with an empty ignition barrel and ' +
          'a note from a man to his wife. If he ever came to this hospital, they may have kept his coat.');
      } else if (s.flag('knowsBoat')) {
        lines.push('I have no keys. All I know of the boat is where it is.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.flag('tookTheTreatment') && s.alive('odile')) {
        lines.push('Odile sees the dinosaur Band-Aid on my hand. She checks the injection site ' +
          'without asking where it came from, then lets go.');
      } else if (s.flag('sawWard11') && s.alive('wren')) {
        lines.push(s.flag('wentInAlone')
          ? 'I tell Wren what I saw in the ward. She puts her pad away without ' +
            'showing me the page.'
          : 'Wren reads my face and puts her pad away without showing me the page.');
      }
      if (withTeddy(s)) {
        lines.push('Teddy manages the first two hundred yards on his own and then can\u2019t, ' +
          (s.alive('odile')
            ? 'and Odile takes one arm and I take the other without discussing it.'
            : 'so I take his weight and we keep going.'));
        if (teddyInside(s)) {
          if (s.flag('metTheMatron')) {
            lines.push('On the way down I tell him what Matron said. He hears me out, and after a ' +
              'while says: <span class="said">"One or two units. That is what I am worth \u2014 ' +
              'to them."</span>');
          } else if (s.flag('wasTriaged')) {
            lines.push('He was in Outpatients with me, and Dr. Aytoun told him more than she told me. ' +
              'He doesn\u2019t ask me anything. He looks up at the lit windows, then at the road. ' +
              '<span class="said">"I know what a bed costs,"</span> he says.');
          } else {
            lines.push('He heard everything the man at the desk said. He watches the lit windows ' +
              'until the trees hide them. <span class="said">"Then we keep walking,"</span> he says.');
          }
        } else if (!(s.flag('cameInTheFront') || s.flag('cameInTheBack') ||
            s.flag('sawThePit') || s.flag('foundTheOffice') ||
            s.flag('metTheMatron') || s.flag('sawWard11'))) {
          lines.push('He doesn\u2019t ask what I saw. I never went in, and he was beside me the ' +
            'whole time. He watches the lit windows until the trees hide them. ' +
            '<span class="said">"Then we keep walking,"</span> he says.');
          lines.push('<span class="said">"Thank you for turning around."</span>');
        } else {
          lines.push('<span class="said">"Was it bad, child?" </span>he asks.');
          if (s.flag('metTheMatron')) {
            lines.push('I tell him what Matron said. He hears me out, and after a while says: ' +
              '<span class="said">"One or two units. That is what I am worth \u2014 to them."</span>');
          } else if (s.flag('sawWard11')) {
            lines.push('I tell him what I saw. He looks up at the lit windows, then at the road. ' +
              '<span class="said">"I know what a bed costs,"</span> he says.');
          } else {
            lines.push('I tell him I went in, but came out before I knew enough. ' +
              'He watches the lit windows until the trees hide them. ' +
              '<span class="said">"Then we keep walking,"</span> he says.');
          }
          lines.push('<span class="said">"Thank you for coming back."</span>');
        }
      }
      return lines;
    },
    choices: [
      { label: function (s) {
          return s.flag('knowsBoat')
            ? 'Take the keys down to the river. Try the boat tonight.'
            : 'Take the keys down to the river. Find the boat named on the fob.';
        },
        show: function (s) { return s.has('keys'); },
        to: 'a3_final', act: function (s) { s.set('headingForTheBoat'); } },
      { label: 'Go back for the keys. You can\u2019t do this without them.',
        hint: 'you slip back into the hospital',
        show: function (s) { return !s.has('keys') && s.flag('knowsBoat'); }, to: 'a3_refuse_keys' },
      { label: 'Head for the river without keys. Decide before you reach the slip.',
        show: function (s) { return s.flag('knowsBoat'); },
        to: 'a3_final', act: function (s) { s.set('headingForTheBoat'); } },
      { label: 'Stop at the foot of the hill and decide there.',
        show: function (s) { return !s.flag('knowsBoat'); },
        to: 'a3_final', act: function (s) { s.soften(4); s.set('lookingForTheDoor'); } },
      { label: function (s) {
          return s.alive('wren')
            ? 'Keep walking until Wren has a door she can lock.'
            : 'Keep walking. Find somewhere with a door that locks.';
        }, tone: 'kind',
        to: 'a3_final', act: function (s) { s.set('lookingForTheDoor'); } },
      { label: 'Turn back. Decide what to do about the hospital.', tone: 'risk', to: 'a3_final',
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
    text: function (s) {
      var lines = [];
      lines.push(s.partyCount()
        ? 'I slip back in through the service door while the others wait at the end of the drive.'
        : 'I slip back in through the service door.');
      if (heardHolloway(s)) {
        lines.push('The property room keeps a card index. HOLLOWAY, D. is in the April section.');
      } else {
        lines.push('Everyone who got sick at this end of the county came up this hill, and the ' +
          'hospital keeps what they brought. A sign by the laundry points to PATIENT PROPERTY. ' +
          'I go through the card index for anything marked BOAT and find it in the April section: ' +
          'HOLLOWAY, D., KEYS (BOAT).');
      }
      lines.push('His wallet, ring, glasses, and boat keys are sealed in a labeled bag. I take the keys. ' +
        'The paper tears at the staple, a small sound in a building full of larger ones.');
      lines.push(s.partyCount()
        ? 'Outside, the others have been watching the door. They start walking with me ' +
          'before I say a word.'
        : 'Outside, nobody is waiting. I start walking.');
      return lines;
    },
    choices: [
      { label: function (s) {
          return s.partyCount() ? 'Take everyone to the boat.' : 'Go to the boat.';
        }, tone: 'kind', to: 'a3_final',
        act: function (s) { s.set('headingForTheBoat'); } },
      { label: 'Keep the keys to yourself until the river.', to: 'a3_final',
        act: function (s) { s.set('headingForTheBoat'); s.harden(5); } },
      { label: 'Show the keys to Teddy. Let him choose whether to come.', tone: 'kind',
        show: function (s) { return s.alive('teddy'); }, to: 'a3_final',
        act: function (s) { s.set('headingForTheBoat'); s.trust('teddy', 10); } },
      { label: 'Pocket them. Before the river, decide what happens to the hospital.',
        to: 'a3_final' }
    ]
  });

  /* ---------------------------------------------------------- the last choice */
  S.add({
    id: 'a3_final',
    chapter: 'III — The last of it',
    place: 'St. Amaranth Mercy',
    enter: function (s) {
      s.set('atTheEnd');
      s.set('stillOnTheWard', false);
      /* people you drove away do not wait around for the last decision */
      ['odile', 'bram', 'wren'].forEach(function (id) {
        if (s.alive(id) && s.who(id).trust <= 12 && !s.flag('left_' + id)) {
          s.set('left_' + id);
          s.part(id, 'walked away from me before the end');
          s.scar(6);
        }
      });
    },
    text: function (s) {
      var lines = [];
      if (s.flag('declaredTheEnd')) {
        lines.push('I\u2019ve said it out loud. Now it has to be done, ' +
          'by somebody, with their hands.');
      } else if (s.flag('headingForTheBoat')) {
        lines.push('The hill is behind me and the river ahead. It is day ' + s.day +
          ', and whatever is going to be decided will be decided before I reach the water.');
      } else if (s.flag('refusedTheMercy')) {
        lines.push('I stop at the end of the avenue, with the hospital behind me and the road ahead. ' +
          'I can still turn back. I can still keep walking.');
      } else if (s.flag('choseTheWard') && s.flag('endedHolloway')) {
        lines.push('I told the woman with the sponge I would do all ninety-three, and she went to ' +
          'hold the door. Out in the corridor, with a kettle boiling somewhere, I find I have to ' +
          'decide it all over again.');
      } else if (s.flag('choseTheWard')) {
        lines.push('I get through six more sets of straps before three of the staff pull me off ' +
          'the ward. They buckle everyone back in. My arm is bleeding again, I am standing in a ' +
          'corridor with a kettle boiling somewhere, and it still has to be decided.');
      } else {
        lines.push('It comes down to this, in a corridor before the next shift, with a kettle ' +
          'boiling somewhere and a ward full of people humming at a ceiling two rooms away.');
      }
      if (s.flag('offeredMyself')) {
        lines.push('I told Teddy I would take the bed instead of him, and I meant it.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (s.flag('heldAtTheBoat')) {
        lines.push(s.alive('teddy')
          ? 'The boat is still there, but the days I spent on it have gone into Teddy\u2019s ' +
            'breathing.' + (s.alive('wren') ? ' Wren has stopped writing to ask how long he has left.' : '')
          : 'The boat is still there. For days I held on at its mooring while the ' +
            'water kept them away. Up here there is no water.');
      }
      if (s.flag('tookFromTheChildren')) {
        lines.push(s.flag('gaveItBack')
          ? 'I left the stolen cans on the landing at Marlowe House. The sound of the ' +
            'children behind the door has followed me here.'
          : 'The cans from Marlowe House are still with me. Before I decide what the ' +
            'hospital owes anyone, I have to admit what I took from six children.');
      }
      if (!s.partyCount()) {
        lines.push('Everything I have is in my pockets. There is nobody left to hear what I choose.');
      } else if (s.flag('wentInAlone') && !s.flag('wasTriaged') && !s.flag('refusedTheMercy')) {
        lines.push('Everything I have is in my pockets. The others are still waiting for me ' +
          'at the end of the avenue.');
      } else {
        lines.push('Everything I have is in my pockets. The others are close enough to hear ' +
          'what I choose.');
      }
      var kit = [];
      if (s.has('vial')) kit.push(s.count('vial') > 1 ? s.count('vial') + ' vials of gray serum' : 'one vial of gray serum');
      if (s.has('ledger')) kit.push('the Matron\u2019s ledger');
      if (s.has('keys')) kit.push('a set of boat keys');
      if (s.has('lighter')) kit.push('a lighter');
      if (s.has('morphine')) kit.push('an ampoule of morphine');
      if (kit.length) {
        lines.push('I have ' + nameList(kit) + '.');
      }
      if (withTeddy(s)) {
        lines.push('And I have Teddy, who is running out of time, and who has walked four miles ' +
          'without once asking me to choose for him.');
      }
      lines.push('Decide.');
      return lines;
    },
    choices: [
      { label: function (s) {
          return s.flag('refusedTheMercy')
            ? 'Go back and set St. Amaranth Mercy on fire.'
            : 'Burn St. Amaranth Mercy to the ground.';
        },
        hint: 'everyone in the east wing dies in the fire',
        tone: 'cruel', show: function (s) { return s.has('lighter'); },
        to: 'end_burn' },

      { label: function (s) {
          if (!knowsMatron(s)) {
            return s.flag('refusedTheMercy')
              ? 'Go back and offer to help run the hospital.'
              : 'Offer to help run the hospital.';
          }
          return s.flag('refusedTheMercy')
            ? 'Go back and take the Matron\u2019s chair. Keep the hospital running.'
            : 'Take the Matron\u2019s chair. Keep the hospital running.';
        },
        hint: 'the hospital keeps running, with you in charge', tone: 'cruel',
        show: function (s) { return s.flag('metTheMatron') || s.flag('atTheMercy'); },
        to: 'end_matron' },

      { label: function (s) {
          if (s.has('ledger')) return 'Take the ledger and make the world read it.';
          if (s.flag('knowsTheCopy')) {
            return s.flag('refusedTheMercy')
              ? 'Go back for the Matron\u2019s copy of the ledger, and make the world read it.'
              : 'Take the Matron\u2019s copy of the ledger and make the world read it.';
          }
          return 'Take the hospital\u2019s records and make the world read them.';
        },
        hint: 'you carry the record out and make it public',
        show: function (s) {
          return s.has('ledger') || s.flag('knowsTheCopy') ||
            (s.flag('tookTheTreatment') && !s.flag('burnedTheLedger'));
        },
        to: 'end_ledger', act: function (s) {
          if (!s.has('ledger')) { s.give('ledger'); s.set('tookTheLedger'); }
        } },

      { label: function (s) {
          var who = s.partyCount() ? 'take everyone' : 'go';
          if (!s.has('keys')) return 'Fetch the boat keys, then ' + who + ' out on the tide.';
          if (!s.flag('knowsBoat')) return 'Find the boat these keys fit, and ' + who + ' out on the tide.';
          return s.partyCount()
            ? 'Take everyone to the boat and go out on the tide.'
            : 'Take the boat out on the tide.';
        },
        hint: function (s) {
          return s.partyCount() ? 'you leave by water, with whoever comes' : 'you leave by water, alone';
        },
        tone: 'kind',
        show: function (s) { return s.flag('knowsBoat') || s.flag('headingForTheBoat') || s.has('keys'); },
        to: function (s) {
          if (!s.has('keys')) return 'a3_boat_lastkeys';
          if (s.alive('teddy') && s.flag('theCompact')) return 'end_mercy_teddy';
          /* with nobody left there is nothing to decide; with somebody left
             there is, and it gets its own beat on the slipway */
          return s.partyCount() >= 1 ? 'a3_boat_who' : 'end_boat_alone';
        } },

      { label: function (s) {
          var where = knowsWardName(s) ? 'Ward Eleven' : 'the east wing';
          if (s.flag('refusedTheMercy')) return 'Go back and volunteer for a bed in ' + where + '.';
          return (s.flag('sawWard11') || s.flag('cameInTheBack'))
            ? 'Volunteer for bed ninety-five.'
            : 'Volunteer for a bed in ' + where + '.';
        },
        hint: 'you join the people in the beds', tone: 'rot',
        show: function (s) {
          return !s.flag('refusedTheMercy') || knowsWard(s) || s.flag('cameInTheFront') ||
            s.flag('cameInTheBack') || s.flag('sawThePit') || s.flag('wasTriaged');
        },
        to: 'end_ward' },

      { label: 'Find a room with a door that locks from the inside, and hold it.',
        hint: 'you leave with Wren and find her somewhere safe', tone: 'kind',
        show: function (s) { return s.alive('wren'); },
        to: 'end_door' },

      { label: 'Walk out into the dark and stop holding the note down.',
        hint: 'you give in to the hum, for good', tone: 'rot',
        show: function (s) { return !s.flag('arrested'); },
        to: 'end_hush' }
    ]
  });

  S.add({
    id: 'a3_boat_lastkeys',
    chapter: 'III — The last of it',
    place: 'The property room',
    enter: function (s) { if (!s.has('keys')) s.give('keys'); s.set('hasTheKeys'); },
    text: function (s) {
      var entered = s.flag('cameInTheFront') || s.flag('cameInTheBack') ||
        s.flag('sawThePit') || s.flag('wasTriaged');
      return [
      (s.flag('headingForTheBoat')
        ? (entered
          ? 'A boat is no use without its keys. I go back once more, in through the service door'
          : 'A boat is no use without its keys. I go back up the hill and in through the service door')
        : (entered
          ? 'A boat is no use without its keys. I take the service corridor to the property room'
          : 'A boat is no use without its keys. I slip in at the back and follow the signs down ' +
            'the service corridor to the property room')) +
      (s.partyCount()
        ? (s.flag('headingForTheBoat') ? ', while the others wait out on the road.' : ', while the others wait nearby.')
        : ', with nobody left to wait for me.'),
      'The property room has a card index. ' +
      (heardHolloway(s)
        ? 'HOLLOWAY, D. is in the April section. '
        : (s.flag('foundBoat') || s.flag('knowsTheCoats') || s.seen('a3_property')
          ? ''
          : 'Everyone who got sick at this end of the county came up this hill, and the hospital ' +
            'keeps what they brought. ') +
          'I work through the April cards until I find BOAT KEYS beside HOLLOWAY, D. ') +
      'His keys are in a sealed bag with his wallet and glasses. The foam fish on the fob ' +
      'says LUCKY.',
      'I take them. The bag tears at the staple. Outside, the river is still ' +
      'four miles off.'
    ]; },
    choices: [
      { label: function (s) {
          return s.flag('knowsBoat')
            ? 'Take the keys down to the slip and cast off before dawn.'
            : 'Take the keys down to the river, find the boat, and cast off before dawn.';
        }, tone: 'kind',
        to: function (s) {
          if (s.alive('teddy') && s.flag('theCompact')) return 'end_mercy_teddy';
          return s.partyCount() ? 'a3_boat_who' : 'end_boat_alone';
        }, act: function (s) { s.soften(5); } },
      { label: 'Keep the keys in your pocket until you reach the water.',
        to: function (s) {
          if (s.alive('teddy') && s.flag('theCompact')) return 'end_mercy_teddy';
          return s.partyCount() ? 'a3_boat_who' : 'end_boat_alone';
        }, act: function (s) { s.harden(5); } },
      { label: 'Put the keys away. Stay and take responsibility for this place.',
        tone: 'risk', to: 'end_matron', act: function (s) { s.scar(8); } }
    ]
  });

  /* ---------------------------------------------------------- the slipway */
  S.add({
    id: 'a3_boat_who',
    chapter: 'III — The last of it',
    place: 'Hadley Sailing Club',
    enter: function (s) { s.set('atTheSlip'); },
    text: function (s) {
      var party = s.party();
      var names = party.map(function (id) { return S.CAST[id].name; });
      var lines = [
        'The sailing club is a trailer office, a concrete slip, and a pontoon with four boats ' +
        'tied to it. Three are swamped and sitting on the bottom. LUCKY II is the fourth, ' +
        'and the key slides into the ignition as if it has been waiting.'
      ];
      if (!s.flag('knowsBoat')) {
        lines.unshift('I follow the river down to a sailing club and check each boat\u2019s name ' +
          'against the fish-shaped fob in my hand.');
      }
      lines.push('The engine will start. I know it will. That stopped being the ' +
        'question somewhere on the hill.');
      lines.push({ c: 'sep', t: '\u2042' });
      if (names.length === 1) {
        lines.push(names[0] + ' is forty feet behind me on the slip, out of breath and ' +
          'not hurrying. It hasn\u2019t occurred to ' + (PRONOUN[party[0]] || 'them') +
          ' that hurrying might be necessary.');
      } else {
        lines.push(nameList(names) +
          ' are strung out along the slip behind me in the dark. None of them is hurrying. ' +
          'It hasn\u2019t occurred to any of them that they might need to.');
      }
      lines.push('There\u2019s a throttle under my right hand, a rope on a cleat, and ' +
        'about ninety seconds in which this is still entirely my decision.');
      lines.push('If I cast off now, nobody beyond this slip would ever know. ' +
        'There is nobody left out there to tell.');
      return lines;
    },
    choices: [
      { label: 'Wait. Get every one of them aboard.', tone: 'kind',
        hint: function (s) {
          return s.partyCount() + 1 <= 4
            ? 'there is room for all of you'
            : 'five aboard a boat built for four';
        },
        to: 'end_boat_together',
        act: function (s) { s.soften(10); s.ease(6); } },

      { label: 'Ask them, once, out loud, whether they want to come.',
        hint: 'they each decide for themselves',
        to: 'end_boat_together',
        act: function (s) {
          s.soften(8); s.scar(4);
          s.party().forEach(function (id) { s.trust(id, 15); });
        } },

      { label: 'Cast off now, while they are still on the slip.', tone: 'cruel',
        hint: 'you leave alone, and they are left on the slip',
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
