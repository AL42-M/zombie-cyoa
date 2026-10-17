/* ============================================================
   THE HUSH — Act I: Rosco Drug & Sundry
   Night of day forty-one. Four people, one door, one lung.
   ============================================================ */
(function () {
  'use strict';
  var S = window.Story;
  var CH = 'I — The Hush';
  var PLACE = 'Rosco Drug & Sundry';

  S.add({
    id: 'start',
    chapter: CH,
    place: PLACE,
    text: [
      'Day 41. I\u2019ve marked every day on the stockroom wall, but this is the first I\u2019ve put ' +
      'on paper. If someone finds these pages, this is how it began. For nine seconds, every radio ' +
      'stopped mid-sentence. People went out into the street to look at the sky. Then the humming ' +
      'started, and it hasn\u2019t stopped since.',

      'I\u2019m awake because Teddy is drowning again. He\u2019s three feet away in the dark, dragging ' +
      'each breath through the fluid in his chest. Seventy-one, one working lung, a choirmaster for ' +
      'most of his life. Even now, his breathing carries.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Out in the street, beyond the shutter, something answers him. Not words. Not quite voices. ' +
      'A crowd holding one low note. Each time Teddy breathes in, the crowd leans towards the glass.'
    ],
    choices: [
      { label: 'Go to Teddy.', hint: 'he\u2019s awake, and he knows', tone: 'kind', to: 'a1_teddy' },
      { label: 'Check the front window.', hint: 'count them', to: 'a1_window' },
      { label: 'Wake Odile.', hint: 'the only steady hands left', to: 'a1_odile' },
      { label: 'Search the dispensary.', hint: 'forty-one days, and you still haven\u2019t finished', to: 'a1_dispensary' },
      { label: 'Sit with Wren.', hint: 'she hasn\u2019t slept either', tone: 'kind', to: 'a1_wren' },
      { label: 'Call everyone together. The street is already listening.', to: 'a1_hub' },
      { label: 'Crank the radio. Find out whether anyone else is still awake.', to: 'a1_radio' }
    ]
  });

  S.add({
    id: 'a1_hub',
    chapter: CH,
    place: PLACE,
    text: [
      'The stockroom smells of cardboard and the surgical spirit I spilled last week. Someone has ' +
      'stacked incontinence pads into a mattress. On the wall, in grease pencil, DAY 41 sits under ' +
      'DAY 40, under thirty-nine more.',
      'I wake the others. Bram brings the wind-up torch; Wren brings her pad. Teddy breathes, and ' +
      'the street breathes back. I haven\u2019t worked out what to say.'
    ],
    choices: [
      { label: 'Let Teddy speak before anyone votes.', tone: 'kind', to: 'a1_teddy_votes' },
      { label: 'Tell them you\u2019ll carry him out tonight.', to: 'a1_depart',
        act: function (s) { s.set('tookTeddy'); s.set('route', 'together'); s.trust('teddy', 15); } },
      { label: 'Put every option on the table. Even the worst one.', to: 'a1_council' }
    ]
  });

  S.add({
    id: 'a1_teddy',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('spokeToTeddy'); },
    text: [
      'He\u2019s propped against the shelving; lying flat fills his chest faster. In the dark his face ' +
      'is a pale smudge with wet eyes. He lifts one hand and turns it palm-down, an old conductor asking ' +
      'for a quieter passage.',

      '<span class="said">"I can hear myself,"</span> he says. <span class="said">"That\u2019s the ' +
      'trouble. If I can hear myself\u2014"</span>',

      'He doesn\u2019t finish. He doesn\u2019t need to. Everyone in this room has done the arithmetic, ' +
      'and everyone has pretended to get a different answer.',

      '<span class="said">"Forty years I taught children to breathe from here."</span> He taps his ' +
      'belly. The tap turns into a cough, and he forces it down with both hands over his mouth. ' +
      'Outside, the street shifts like a field in the wind.'
    ],
    choices: [
      { label: 'Tell him he\u2019s coming with you, whatever it costs.', tone: 'kind',
        hint: 'it may not be yours to promise', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.soften(5); s.trust('teddy', 20); s.scar(4); },
        toast: ['You promised.', 'good'] },
      { label: 'Ask him what he wants.', hint: 'and be ready to hear it', to: 'a1_teddy_wants' },
      { label: 'Say nothing. Hold his hand until the fit passes.', tone: 'kind',
        to: 'a1_hub', act: function (s) { s.soften(3); s.trust('teddy', 10); },
        toast: ['Eventually, he stops shaking.', 'good'] },
      { label: 'Tell him the truth: he\u2019s going to get everyone killed.', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.harden(9); s.scar(6); s.trust('teddy', -25); s.set('toldTeddyTruth'); },
        toast: ['He nods, as if you\u2019ve told him the time.', 'bad'] }
    ]
  });

  S.add({
    id: 'a1_teddy_wants',
    chapter: CH,
    place: PLACE,
    text: [
      'He takes his time. Long enough for me to hear Wren turn over in the dark to listen.',

      '<span class="said">"I don\u2019t want to be the reason,"</span> he says. <span class="said">"It\u2019s ' +
      'all I have left to want. I was a reason for good things once. Four hundred children."</span> ' +
      'A breath. <span class="said">"I\u2019d like my last one not to be the other kind."</span>',

      'He finds my hand without looking and presses something into it: small, cold, hard-edged. ' +
      'A staff badge with the photograph scraped off.',

      { c: 'note', t: 'ST AMARANTH MERCY — WARD STAFF' },

      '<span class="said">"My niece worked there. Three weeks ago she said they were still taking ' +
      'people in. She said they had something."</span> A wet laugh. <span class="said">"She also said ' +
      'don\u2019t go. Same letter."</span>'
    ],
    choices: [
      { label: 'Take the badge. Promise him you\u2019ll all go together.', tone: 'kind',
        to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('promisedTeddy'); s.soften(4); s.trust('teddy', 18); } },
      { label: 'Take the badge. Promise nothing.', to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.harden(3); } },
      { label: 'Refuse it. A dead man\u2019s errand is still an errand.', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.harden(7); s.trust('teddy', -15); s.scar(3); } },
      { label: 'Ask what "something" means.', to: 'a1_teddy_something' }
    ]
  });

  S.add({
    id: 'a1_teddy_something',
    chapter: CH,
    place: PLACE,
    text: [
      '<span class="said">"A treatment."</span> He says it like a word from a language he doesn\u2019t ' +
      'speak. <span class="said">"She wrote that it works. She wrote it twice. That\u2019s how I know ' +
      'it frightened her."</span>',

      'He folds my fingers shut over the badge with both his hands, like someone pressing a dressing ' +
      'onto a wound.',

      '<span class="said">"Whatever it is, child, it comes out of somebody. Everything does now."</span>'
    ],
    choices: [
      { label: 'Take it. You\u2019ll all go together.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('promisedTeddy'); s.soften(4); s.trust('teddy', 18); } },
      { label: 'Take it, and keep the Mercy to yourself for now.', to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('hidMercy'); s.harden(4); } },
      { label: 'Take it and tell him plainly you may leave him behind.', tone: 'cruel',
        to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('toldTeddyTruth'); s.harden(8); s.trust('teddy', -20); } }
    ]
  });

  S.add({
    id: 'a1_odile',
    chapter: CH,
    place: PLACE,
    text: [
      'Odile isn\u2019t asleep. I\u2019ve never once caught her asleep, though I\u2019ve heard her ' +
      'snoring through the stockroom wall. Her eyes open before I reach her.',

      '<span class="said">"Four days. Perhaps,"</span> she says, before I can ask. <span class="said">' +
      '"Fluid. I hear it shift when he turns over. I put down a collie last spring that sounded better ' +
      'than he does."</span>',

      'Thirty years of telling farmers the truth about their animals. She sees no reason to stop now.',

      '<span class="said">"I have one ampoule of morphine in my coat. One. Ask me what it is for and ' +
      'I will tell you I do not know yet."</span>'
    ],
    choices: [
      { label: 'Ask her to keep Teddy comfortable. Nothing more.', tone: 'kind',
        to: 'a1_hub', act: function (s) { s.trust('odile', 12); s.soften(3); } },
      { label: 'Ask her for the morphine.', tone: 'risk', to: 'a1_odile_morphine' },
      { label: 'Ask what she\u2019d do if he were an animal.', to: 'a1_odile_animal' },
      { label: 'Ask her to teach you to do it yourself.', tone: 'cruel',
        to: 'a1_hub',
        act: function (s) { s.set('learnedTheHands'); s.harden(10); s.scar(8); s.trust('odile', 8); },
        toast: ['She shows you where. Twice, so you remember.', 'bad'] },
      { label: 'Say nothing about Teddy at all.', to: 'a1_hub',
        act: function (s) { s.trust('odile', -5); } }
    ]
  });

  S.add({
    id: 'a1_odile_morphine',
    chapter: CH,
    place: PLACE,
    text: [
      'She looks at me for a while. Not judging. Assessing, the way she must have assessed nine hundred ' +
      'frightened animals on a steel table, and it ends the same way: with a decision made somewhere I ' +
      'can\u2019t see.',

      'She takes the ampoule from her coat and holds it up between two fingers. In the dark it\u2019s ' +
      'barely there, a glint of glass.',

      '<span class="said">"You understand it is not mercy until the moment it is,"</span> she says. ' +
      '<span class="said">"Until then it is poison. Poison you carry about with Teddy\u2019s name on it."</span>'
    ],
    choices: [
      { label: 'Take it anyway.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.give('morphine'); s.harden(8); s.scar(5); s.trust('odile', -8); } },
      { label: 'Leave it with her. She\u2019ll know when.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('odile', 15); s.soften(4); s.set('odileKeepsMorphine'); } },
      { label: 'Tell her it\u2019s for you, if it comes to that.', to: 'a1_hub',
        act: function (s) { s.give('morphine'); s.set('morphineForMe'); s.scar(9); s.trust('odile', 6); } }
    ]
  });

  S.add({
    id: 'a1_odile_animal',
    chapter: CH,
    place: PLACE,
    text: [
      '<span class="said">"If he were an animal,"</span> she says, <span class="said">"I would have done ' +
      'it on day thirty-six. I would have cried in the car. And I would have slept."</span>',

      'She wipes her palms down her thighs, twice. She does that when she\u2019s deciding something ' +
      'she won\u2019t say out loud.',

      '<span class="said">"He is not an animal. So instead I lie here every night listening to a man ' +
      'I like drown an inch at a time, and I call that respect."</span>',

      { c: 'whisper', t: 'She doesn\u2019t add: and I resent him for it. It\u2019s in the room anyway.' }
    ],
    choices: [
      { label: 'Tell her she\u2019s a good person.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('odile', 10); s.soften(3); },
        toast: ['She says: "That is not the compliment you think it is."', 'good'] },
      { label: 'Ask her to do it tonight.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('askedOdileToKill'); s.harden(12); s.scar(7); s.trust('odile', -12); } },
      { label: 'Ask her to teach you instead.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('learnedTheHands'); s.harden(10); s.scar(8); s.trust('odile', 8); } },
      { label: 'Leave her to it.', to: 'a1_hub' }
    ]
  });

  S.add({
    id: 'a1_dispensary',
    chapter: CH,
    place: PLACE,
    enter: function (s) {
      if (!s.flag('lootedDispensary')) {
        s.set('lootedDispensary');
        s.give('knife');
        s.give('flask');
        s.give('tape');
      }
    },
    text: [
      'The dispensary was stripped in the first week by people who knew what they were after, then ' +
      'picked over for a month by people who didn\u2019t. What\u2019s left is sediment: ' +
      'hair-removal cream, three hundred pregnancy tests, a wall of reading glasses.',

      'Behind the counter, in a drawer someone yanked out and dropped, I find a boning knife wrapped ' +
      'in a tea towel, a bottle of grain alcohol with a handwritten label, and most of a roll of duct tape.',

      'A chemist\u2019s coat hangs on a hook, its name badge reading ROSCO \u2014 SINCE 1974. In the ' +
      'pocket there\u2019s a shopping list. <em>Milk. Bin bags. Ring Mum.</em>',

      { c: 'sep', t: '\u2042' },

      'I stand in the dark holding a dead man\u2019s shopping list while the street hums, and for a ' +
      'moment all of it, every list, every mum nobody rang, tries to get in at once.'
    ],
    choices: [
      { label: 'Pocket the list.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('keptTheList'); s.soften(5); s.scar(4); },
        toast: ['You\u2019ll carry it the whole way.', 'good'] },
      { label: 'Put it back exactly where it was.', to: 'a1_hub',
        act: function (s) { s.scar(3); } },
      { label: 'Burn it. You can\u2019t carry everyone\u2019s mother.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(7); s.ease(3); } },
      { label: 'Drink some of the alcohol.', tone: 'risk', to: 'a1_hub',
        act: function (s) { s.ease(8); s.hurt(4); s.take('flask'); s.set('drankIt'); },
        toast: ['It takes the edge off, and the lining of your throat with it.', 'weight'] }
    ]
  });

  S.add({
    id: 'a1_wren',
    chapter: CH,
    place: PLACE,
    text: [
      'Wren is fourteen and hasn\u2019t made a sound since the third day. Not a scream, not a word, not ' +
      'a cough. In this room that makes her the most valuable person alive. Everyone knows it. Only Bram ' +
      'has said it out loud, once, on day twenty, and he wasn\u2019t really talking about her.',

      'She\u2019s awake. She hands me the pharmacy pad before I\u2019ve said a word, the stub of pencil ' +
      'threaded through the wire. She\u2019s already written on it.',

      { c: 'whisper', t: 'you were going to ask me if im ok' },

      { c: 'whisper', t: 'everyone asks me that when theyve already decided something' }
    ],
    choices: [
      { label: 'Write back: "We haven\u2019t decided anything."', to: 'a1_wren_lie',
        act: function (s) { s.set('liedToWren'); } },
      { label: 'Write back: "They want to leave Teddy."', tone: 'risk', to: 'a1_wren_truth',
        act: function (s) { s.set('toldWrenTruth'); s.soften(4); } },
      { label: 'Ask her what she wants.', tone: 'kind', to: 'a1_wren_wants' },
      { label: 'Hand the pad back and sit with her in silence.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('wren', 12); s.soften(3); s.ease(4); },
        toast: ['It\u2019s the first hour\u2019s rest either of you has had.', 'good'] }
    ]
  });

  S.add({
    id: 'a1_wren_lie',
    chapter: CH,
    place: PLACE,
    text: [
      'She reads it, then looks at me for three full seconds, which from Wren is a speech.',
      'She takes the pad back, writes without hurrying, and turns it round.',
      { c: 'whisper', t: 'ok' },
      { c: 'whisper', t: 'ill pretend i believe that if you pretend you said it kindly' }
    ],
    choices: [
      { label: 'Tell her the truth after all.', tone: 'kind', to: 'a1_wren_truth',
        act: function (s) { s.set('toldWrenTruth'); s.soften(5); s.trust('wren', 8); } },
      { label: 'Let it stand.', to: 'a1_hub',
        act: function (s) { s.harden(6); s.trust('wren', -12); } },
      { label: 'Ask her what she wants.', to: 'a1_wren_wants' }
    ]
  });

  S.add({
    id: 'a1_wren_truth',
    chapter: CH,
    place: PLACE,
    text: [
      'She isn\u2019t surprised. Nothing surprises her now. She\u2019s fourteen, and I can\u2019t hold ' +
      'her eye for long.',
      { c: 'whisper', t: 'bram said it on day 20' },
      { c: 'whisper', t: 'hes been saying it quieter since' },
      { c: 'whisper', t: 'if you leave teddy ill still come with you' },
      { c: 'whisper', t: 'i just wont be able to look at you' }
    ],
    choices: [
      { label: 'Swear to her that Teddy comes too.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('sworeToWren'); s.trust('wren', 22); s.soften(6); } },
      { label: 'Tell her you don\u2019t know yet.', to: 'a1_hub',
        act: function (s) { s.trust('wren', 4); } },
      { label: 'Tell her that\u2019s a child\u2019s way of thinking.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(10); s.trust('wren', -20); s.scar(5); } },
      { label: 'Ask her what she wants.', to: 'a1_wren_wants' }
    ]
  });

  S.add({
    id: 'a1_wren_wants',
    chapter: CH,
    place: PLACE,
    text: [
      'The pencil hovers for a long time.',
      { c: 'whisper', t: 'i want to go somewhere with a door that locks from the inside' },
      { c: 'whisper', t: 'and i want to be the one who locks it' },
      'She underlines <em>i</em> twice, hard enough to tear the paper, then looks embarrassed and ' +
      'smooths the tear flat with her thumb.'
    ],
    choices: [
      { label: 'Promise her that door.', tone: 'kind', to: 'a1_hub',
        act: function (s) {
          s.set('promisedTheDoor'); s.trust('wren', 20); s.soften(6); s.scar(3);
          s.keep('padpage', 'She tore it off and gave it to me so it would exist somewhere outside her head.');
        },
        toast: ['She tears the page off and folds it into your hand.', 'keepsake'] },
      { label: 'Tell her there\u2019s no such place left.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(8); s.trust('wren', -14); } },
      { label: 'Tell her about St Amaranth Mercy.', show: function (s) { return s.flag('knowsMercy'); },
        to: 'a1_hub', act: function (s) { s.set('wrenKnowsMercy'); s.trust('wren', 10); } },
      { label: 'Say nothing. Sit with her.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('wren', 8); s.ease(4); } }
    ]
  });

  S.add({
    id: 'a1_window',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.bump('windowChecks'); },
    text: function (s) {
      var n = s.val('windowChecks');
      var lines = [
        'Rosco pulled the security shutter down forty-one days ago, and nobody has raised it since. ' +
        'Through the slats, Ferry Street is silver with moonlight and full of people standing still.'
      ];
      if (n <= 1) {
        lines.push('I count. I always count. Thirty-one between the betting shop and the bus stop, ' +
          'six more than this morning. They aren\u2019t milling about. Every head is tilted a few ' +
          'degrees towards this window, like compass needles.');
      } else if (n === 2) {
        lines.push('Forty now. The new ones have come up from the river end. One of them is in a ' +
          'hi-vis jacket, and every time the moon comes out its reflective strip lights up like a ' +
          'small bad idea.');
      } else {
        lines.push('I give up counting somewhere past fifty. They\u2019re standing shoulder to shoulder. ' +
          'When Teddy breathes in, the whole street breathes in half a second later, like a choir ' +
          'dragging behind its conductor.');
      }
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('None of them is looking at me. The films got that wrong. They don\u2019t look; ' +
        'they <em>listen</em>, with their whole ruined bodies, and a body that has stopped needing ' +
        'its eyes lets them go.');
      return lines;
    },
    choices: [
      { label: 'Keep watching. Learn how they move.', to: 'a1_window_study' },
      { label: 'Check the back of the shop for another way out.', to: 'a1_backdoor' },
      { label: 'Go back to the others.', to: 'a1_hub' },
      { label: 'Tap the glass. You need to know how fast they are.', tone: 'risk', to: 'a1_window_tap' }
    ]
  });

  S.add({
    id: 'a1_window_study',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('studiedThem'); },
    text: [
      'An hour goes by. I learn three things. I\u2019m writing them here, but I\u2019ve learned them by ' +
      'heart as well, because paper can be taken off me.',

      { c: 'note', t: 'ONE. They do not hunt. They converge. A sound is a drain and they are water.' },
      { c: 'note', t: 'TWO. A continuous sound pulls harder than a loud one. A scream turns heads. ' +
        'A man coughing all night turns a street.' },
      { c: 'note', t: 'THREE. When they hum together they stop moving. Whatever that is for, it is not for us.' },

      'The third is the one I keep turning over. By the end of the hour there are nearly fifty of ' +
      'them, motionless, all holding the same note, and under it is a kind of patience, as if they ' +
      'aren\u2019t waiting for me at all but for an appointment already in the diary.'
    ],
    choices: [
      { label: 'Go and tell the others what you learned.', to: 'a1_hub',
        act: function (s) { s.trust('bram', 10); s.trust('odile', 8); },
        toast: ['Bram listens. Properly, for once.', 'good'] },
      { label: 'Keep it to yourself. Knowledge is the last currency.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(7); s.set('hoardedKnowledge'); } },
      { label: 'Check the back of the shop.', to: 'a1_backdoor' },
      { label: 'Go back to the others.', to: 'a1_hub' }
    ]
  });

  S.add({
    id: 'a1_window_tap',
    chapter: CH,
    place: PLACE,
    text: [
      'I put one knuckle to the glass and knock. Once, not loud: the knock I\u2019d use on a bathroom ' +
      'door in someone else\u2019s house.',

      'Thirty-one heads turn at once. The sound they make isn\u2019t a roar; it\u2019s an intake of ' +
      'breath, thirty-one people filling their lungs together. Then the nearest is at the shutter. ' +
      'It\u2019s <span class="wound">fast</span>. Its face pushes between the slats until its cheekbones ' +
      'jam, and there it stays, straining, mouth working, milk-white eyes pointing two different ways.',

      'I\u2019m close enough to smell it: wet copper and sugar, like a butcher\u2019s bin in July.',

      'Behind me, Bram says a word I\u2019ve never heard him use. Teddy has both hands clamped over his mouth.'
    ],
    choices: [
      { label: 'Back away slowly. Don\u2019t add a second sound.', to: 'a1_hub',
        act: function (s) { s.scar(10); s.set('studiedThem'); s.set('tappedTheGlass'); },
        toast: ['It holds the note for forty minutes before it lets go.', 'bad'] },
      { label: function (s) {
          return s.has('knife') ? 'Drive the knife through the slats into its eye.'
            : 'Tear a shelf bracket loose and drive it through the slats into its eye.';
        }, tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(10); s.scar(8); s.hurt(3); s.set('tappedTheGlass'); s.set('firstKill'); },
        toast: ['Your first one up close. Not your last.', 'bad'] },
      { label: 'Stand still and hum back at it.', tone: 'rot', to: 'a1_hum_back' },
      { label: 'Run for the stockroom.', tone: 'risk', to: 'a1_hub',
        act: function (s) { s.scar(12); s.hurt(5); s.trust('bram', -10); s.set('tappedTheGlass'); } }
    ]
  });

  S.add({
    id: 'a1_hum_back',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('hummedBack'); s.infect(8); },
    text: [
      'I don\u2019t decide to. My chest decides, the way it decides to yawn.',

      'The note rises out of me, low and even, and the one pressed against the shutter stops straining. ' +
      'Its jaw slackens. Its head tips, and out in the street the others tip too, one after another, ' +
      'like passengers nodding off on a night bus.',

      { c: 'hum', t: 'h m m m m m m m' },

      'For nine seconds I\u2019m part of something enormous and calm, and I understand, with my whole ' +
      'body and without words, that <em>this isn\u2019t an infection. It\u2019s a recruitment.</em> ' +
      'And it has been very patient with me.',

      'Then Odile has me by the collar and drags me down behind the counter, and the spell peels off ' +
      'like a wet coat. There\u2019s <span class="wound">blood in my mouth</span>. I\u2019ve been ' +
      'humming hard enough to tear something.'
    ],
    choices: [
      { label: 'Tell them exactly what happened.', to: 'a1_hub',
        act: function (s) { s.set('toldThemAboutHum'); s.trust('odile', -6); s.trust('bram', -14); s.scar(8); },
        toast: ['Bram never sleeps with his back to you again.', 'bad'] },
      { label: 'Tell them you panicked. Nothing more.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('hidTheHum'); s.harden(6); s.scar(10); } },
      { label: 'Say nothing and wash your mouth out.', to: 'a1_hub',
        act: function (s) { s.set('hidTheHum'); s.scar(6); } }
    ]
  });

  S.add({
    id: 'a1_backdoor',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('foundBackDoor'); },
    text: [
      'Past the staff toilet, a fire door opens onto a yard of flattened boxes. Beyond the yard is ' +
      'a wall, and beyond the wall, the service lane that runs behind the shops for the length of ' +
      'Ferry Street.',

      'The door has a push bar, and push bars are loud. Someone\u2014Rosco, probably, in his last ' +
      'useful hour\u2014has packed the mechanism with a folded tea towel and taped it in place.',

      'In the yard there\u2019s a bicycle with no front wheel, and chained to it, a pair of three-foot ' +
      'bolt cutters that someone brought to solve a problem and never got to use.'
    ],
    choices: [
      { label: 'Take the bolt cutters.', to: 'a1_hub',
        act: function (s) { s.give('cutters'); },
        toast: ['Heavy to carry. Heavier to leave.', 'item'] },
      { label: 'Test the door. Quietly.', tone: 'risk', to: 'a1_backdoor_test' },
      { label: 'Leave it all. Tell no one this door exists.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('secretDoor'); s.harden(9); },
        toast: ['A way out that only you know about isn\u2019t a way out. It\u2019s a plan.', 'bad'] },
      { label: 'Go back inside.', to: 'a1_hub' }
    ]
  });

  S.add({
    id: 'a1_backdoor_test',
    chapter: CH,
    place: PLACE,
    text: [
      'I lean on the bar half an inch at a time. The tea towel does its job. The latch slips its ' +
      'keeper with a sound like a knuckle cracking in another room.',

      'The lane is empty. Forty-one days, and the lane is <em>empty</em>, because nothing in it makes ' +
      'a sound, so nothing has come to listen.',

      'At the far end, where the lane meets Quay Road, something large and white is parked across the ' +
      'opening: a refrigerated lorry. The compressor is dead, the doors are shut, and along the side, ' +
      'in lettering somebody once thought cheerful: <em>FRESH DAILY</em>.'
    ],
    choices: [
      { label: 'Take the bolt cutters and go back in.', to: 'a1_hub',
        act: function (s) { s.give('cutters'); s.set('scoutedLane'); } },
      { label: 'Go back in and tell everyone. This is the way out.', to: 'a1_hub',
        act: function (s) { s.set('scoutedLane'); s.set('sharedTheLane'); s.trust('bram', 14); s.trust('odile', 10); } },
      { label: 'Go back in and say nothing about the lane.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('scoutedLane'); s.set('secretDoor'); s.harden(9); } }
    ]
  });

  S.add({
    id: 'a1_radio',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.bump('radioTries'); },
    text: function (s) {
      var n = s.val('radioTries');
      if (n <= 1) {
        return [
          'Ninety turns of the handle for ninety seconds of radio. I\u2019ve done it every night for ' +
          'thirty-eight nights, and I do it again tonight.',
          'Static, static, static. Then, at 1476 kHz, where there used to be nothing, the sound ' +
          'that\u2019s always there now:',
          { c: 'hum', t: 'h m m m m m m m' },
          'The same note, broadcast. Something out there isn\u2019t just making this sound; it\u2019s ' +
          '<em>transmitting</em> it, on a set frequency, with power, when nothing has had power for ' +
          'six weeks.'
        ];
      }
      if (n === 2) {
        return [
          'Ninety turns. Ninety seconds.',
          'Tonight there\u2019s something under the hum: a faint rhythm I\u2019d call a metronome if ' +
          'I were feeling generous, and a pulse if I weren\u2019t.',
          { c: 'hum', t: 'h m m \u00b7 h m m \u00b7 h m m' },
          'Odile comes and stands behind me without a word and listens to all ninety seconds. Then ' +
          'she goes back to her corner and lies down facing the wall.'
        ];
      }
      return [
        'Ninety turns. Ninety seconds.',
        'The rhythm is quicker than it was. Not by much: the way a heartbeat quickens near the end of ' +
        'a held breath.',
        { c: 'hum', t: 'hm \u00b7 hm \u00b7 hm \u00b7 hm' },
        'I switch it off before the ninety seconds are up, which I\u2019ve never done, and sit in the ' +
        'dark with my hand still on the crank.'
      ];
    },
    choices: [
      { label: 'Wind it again. Bram hears you and comes over.', to: 'a1_bram' },
      { label: 'Put it away.', to: 'a1_hub' },
      { label: 'Put it away and call everyone together.', to: 'a1_council' },
      { label: 'Hum along with it, quietly, just to see.', tone: 'rot',
        show: function (s) { return !s.flag('hummedBack'); }, to: 'a1_hum_back' }
    ]
  });

  S.add({
    id: 'a1_bram',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('spokeToBram'); },
    text: [
      'Bram was a prison officer for eleven years. He says the job was keeping people safe. Wren, ' +
      'on her pad, put it another way: deciding who got to eat.',

      'He\u2019s awake, sitting with his back to the shelves and the shutter in his line of sight, ' +
      'as he does every night. He doesn\u2019t look at me when he speaks.',

      '<span class="said">"It\u2019s a dinner bell,"</span> he says. <span class="said">"That\u2019s ' +
      'what it is. We\u2019re all sitting inside a dinner bell, waiting for it to stop ringing."</span>',

      'At last he turns his head. In the dark his face is reasonable and tired, and that\u2019s what ' +
      'frightens me: nothing he\u2019s about to say will sound mad.',

      '<span class="said">"Four days. Odile says four days. That\u2019s four nights of him calling them ' +
      'in, and then he goes anyway, and we\u2019re four people in a shop with fifty of them at the ' +
      'glass. Tell me the version of that where waiting is the kind option."</span>'
    ],
    choices: [
      { label: '"We carry him. All of us. That\u2019s the version."', tone: 'kind', to: 'a1_bram_carry' },
      { label: '"Then we go tonight. All five of us, out the back."', to: 'a1_bram_tonight',
        show: function (s) { return s.flag('foundBackDoor'); } },
      { label: '"You want to kill him. Say it. In those words."', tone: 'risk', to: 'a1_bram_sayit' },
      { label: '"You\u2019re right."', tone: 'cruel', to: 'a1_bram_agree' },
      { label: 'Walk away before he finishes.', to: 'a1_hub',
        act: function (s) { s.trust('bram', -10); } }
    ]
  });

  S.add({
    id: 'a1_bram_carry',
    chapter: CH,
    place: PLACE,
    text: [
      'He laughs once, without any air in it.',
      '<span class="said">"Carry him. Through fifty of them. While he sounds like that."</span>',
      'He scrubs at his face with both hands, and when he lowers them he has arranged it into ' +
      'something more patient. I preferred the first face.',
      '<span class="said">"I\u2019m not a monster. I want you to hear that before I say the next bit. ' +
      'I\u2019ve got a daughter in Thornbury, if there\u2019s still a Thornbury, and every night I ' +
      'don\u2019t leave this shop, I\u2019m choosing a man I met six weeks ago over her. I\u2019ve done ' +
      'that forty times. I\u2019m asking you to notice I\u2019ve done it forty times."</span>'
    ],
    choices: [
      { label: '"I notice. And we still carry him."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.trust('bram', 6); s.soften(6); } },
      { label: '"Go to Thornbury, then. Alone. Tonight."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.trust('bram', -30); s.harden(8); s.set('toldBramToGo'); } },
      { label: '"Give me until morning."', to: 'a1_hub',
        act: function (s) { s.set('untilMorning'); s.trust('bram', 8); } },
      { label: 'Ask about his daughter.', tone: 'kind', to: 'a1_bram_daughter' }
    ]
  });

  S.add({
    id: 'a1_bram_daughter',
    chapter: CH,
    place: PLACE,
    text: [
      'He has no photograph, so he tells me about her instead: a flat list of facts, recited like ' +
      'something he\u2019s afraid of losing.',
      '<span class="said">"Nine. Asthmatic. Frightened of the hoover. Her mother and I are\u2014' +
      'were\u2014"</span> He stops there and starts again. <span class="said">"She\u2019ll be at her ' +
      'gran\u2019s. Her gran\u2019s got a cellar, a shotgun and no imagination whatsoever, which right ' +
      'now I\u2019d call the finest combination of qualities in England."</span>',
      'He looks at the shutter.',
      '<span class="said">"Asthmatic,"</span> he says again. <span class="said">"She\u2019d sound like him."</span>',
      { c: 'whisper', t: 'There it is: the real arithmetic, laid out on the floor between us.' }
    ],
    choices: [
      { label: '"Then you know exactly why we carry Teddy."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.trust('bram', 20); s.soften(8); },
        toast: ['Something goes out of him. Not agreement. Permission.', 'good'] },
      { label: '"Then you know exactly why he can\u2019t come."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('agreedWithBram'); s.trust('bram', 22); s.harden(12); s.scar(6); } },
      { label: 'Say nothing. Let him sit with it.', to: 'a1_hub',
        act: function (s) { s.trust('bram', 6); s.scar(4); } },
      { label: 'Ask him to say it all again, slowly, and write it down.', tone: 'kind', to: 'a1_hub',
        hint: 'so it isn\u2019t only in one man\u2019s head',
        act: function (s) {
          s.trust('bram', 14); s.soften(5); s.scar(3);
          s.keep('facts', 'He dictated. I wrote. Neither of us said why. We both knew.');
        },
        toast: ['Nine facts about a nine-year-old, in your handwriting.', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a1_bram_tonight',
    chapter: CH,
    place: PLACE,
    text: [
      'For the first time in six weeks, Bram looks at me as if I\u2019m not something to be managed.',
      '<span class="said">"Out the back. The lane."</span> He\u2019s already on his feet. ' +
      '<span class="said">"How far does it run?"</span>',
      'I tell him: the length of Ferry Street to Quay Road, where a refrigerated lorry is wedged ' +
      'across the end like a cork in a bottle.',
      '<span class="said">"Then we go over the cork,"</span> he says. Then, carefully, not looking ' +
      'at Teddy\u2019s corner: <span class="said">"Can he climb?"</span>'
    ],
    choices: [
      { label: '"Then we find a route he can manage."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('planLane'); s.trust('bram', 10); s.soften(5); } },
      { label: '"No. But we\u2019re not leaving him."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('planLane'); s.trust('bram', 4); s.soften(7); } },
      { label: '"No."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('planLane'); s.set('agreedWithBram'); s.trust('bram', 18); s.harden(11); } },
      { label: '"We go tonight and we decide at the lorry."', to: 'a1_hub',
        act: function (s) { s.set('planLane'); s.set('deferredIt'); s.trust('bram', 8); s.scar(5); } }
    ]
  });

  S.add({
    id: 'a1_bram_sayit',
    chapter: CH,
    place: PLACE,
    text: [
      'He says it, in those words. He doesn\u2019t flinch, and he doesn\u2019t enjoy it.',
      '<span class="said">"I want to kill Teddy Alafuzo. Tonight, while he\u2019s asleep, with a pillow, ' +
      'because a pillow is quiet. I want Odile to do it, because she knows how and it would take her ' +
      'eleven seconds. And I want us all to agree to it, so none of us can hold it over the others ' +
      'later."</span>',
      'He pauses, just long enough for me to know it\u2019s deliberate.',
      '<span class="said">"Then I want to walk to Thornbury, hold my daughter, and never think about ' +
      'this shop again. I won\u2019t get that last part. I know. I want it anyway."</span>'
    ],
    choices: [
      { label: '"No. And if you touch him, I\u2019ll stop you."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('defiedBram'); s.trust('bram', -20); s.soften(8); } },
      { label: '"Teddy gets to decide. Not you, not me."', to: 'a1_hub',
        act: function (s) { s.set('teddyDecides'); s.trust('bram', -6); s.trust('teddy', 15); s.soften(5); } },
      { label: '"Then it\u2019s all of us, it\u2019s Odile, and it\u2019s tonight."', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.set('agreedWithBram'); s.trust('bram', 25); s.harden(15); s.scar(10); } },
      { label: '"I\u2019ll do it. Not Odile. Me."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('claimedTheKilling'); s.trust('bram', 12); s.harden(18); s.scar(14); } }
    ]
  });

  S.add({
    id: 'a1_bram_agree',
    chapter: CH,
    place: PLACE,
    text: [
      'Two words, and the room changes temperature.',
      'He doesn\u2019t look triumphant. He looks like a man who has been leaning on a door to hold it ' +
      'shut, felt the pressure on the other side give way, and realised he now has to walk through it.',
      '<span class="said">"Right,"</span> he says. <span class="said">"Right."</span>',
      'In the corner, Teddy coughs. Neither of us turns round. It\u2019s the first thing Bram and I ' +
      'do together as accomplices.'
    ],
    choices: [
      { label: 'Take it back. Immediately.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('bram', -14); s.soften(6); s.scar(6); } },
      { label: 'Tell him it has to be Odile.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('agreedWithBram'); s.harden(12); s.scar(8); s.trust('bram', 15); } },
      { label: 'Tell him it has to be you.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('claimedTheKilling'); s.harden(18); s.scar(14); s.trust('bram', 12); } },
      { label: 'Tell him Teddy decides.', to: 'a1_hub',
        act: function (s) { s.set('teddyDecides'); s.trust('teddy', 15); s.soften(4); } }
    ]
  });

  /* ---------------------------------------------------------- the council */
  S.add({
    id: 'a1_council',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('toldAboutTeddy'); s.set('foundBackDoor'); },
    text: function (s) {
      var lines = [
        'Bram takes the wind-up torch from his coat and points it at the floor. He\u2019s been out ' +
        'through the fire door behind the staff toilet: a yard, a wall, an empty lane beyond. So ' +
        'there\u2019s a way out, and no excuse left for putting off who goes through it.',
        'I gather them into the small circle of light. Four faces. One of them is already crying, ' +
        'and it\u2019s not the one I\u2019d have guessed.'
      ];
      if (s.flag('agreedWithBram') || s.flag('claimedTheKilling')) {
        lines.push('Bram does the talking, because I\u2019ve already said he could. He\u2019s brief ' +
          'and reasonable, and he says <em>we</em> eleven times. I feel every one of them catch, ' +
          'like a small hook.');
      } else if (s.flag('promisedTeddy')) {
        lines.push('I do the talking. I say <em>together</em>, watch Bram\u2019s jaw set, and ' +
          'keep going.');
      } else {
        lines.push('Nobody wants to go first. The silence lasts so long that Teddy ends it himself, ' +
          'a cruelty none of us intended and all of us allowed.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"I\u2019d like to say something,"</span> Teddy says, ' +
        '<span class="said">"while it\u2019s still a conversation. Before it\u2019s a vote."</span>');
      lines.push('He has to stop twice to get through the rest.');
      lines.push('<span class="said">"I\u2019m not frightened of dying. I\u2019m frightened of being ' +
        'the reason. Those are different sizes of thing. Only one of them is yours to fix."</span>');
      return lines;
    },
    choices: [
      { label: 'All five of you go out the back tonight. He\u2019s carried if he needs carrying.',
        tone: 'kind', hint: 'the hard road',
        show: function (s) { return s.flag('foundBackDoor'); },
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.soften(10); s.scar(5); s.trust('teddy', 25); s.trust('wren', 15); } },
      { label: 'Leave him the revolver and the lighter. Let him choose his own hour.',
        tone: 'cruel', hint: 'a kindness shaped like abandonment',
        to: 'a1_leave_teddy',
        act: function (s) { s.set('route', 'left'); } },
      { label: 'Odile does it. Tonight. While he sleeps.', tone: 'cruel',
        hint: 'eleven seconds',
        show: function (s) { return !s.flag('odileKeepsMorphine') || true; },
        to: 'a1_smother',
        act: function (s) { s.set('route', 'killed'); } },
      { label: 'You do it. Nobody else carries this.', tone: 'cruel',
        hint: 'with your own hands',
        show: function (s) { return s.flag('learnedTheHands') || s.has('morphine') || s.flag('claimedTheKilling'); },
        to: 'a1_smother',
        act: function (s) { s.set('route', 'killed'); s.set('byMyHand'); } },
      { label: 'Put it to Teddy. His lungs, his vote.', hint: 'and live with his answer',
        to: 'a1_teddy_votes' },
      { label: 'Refuse to decide. Wait for morning.', hint: 'morning is in four hours',
        to: 'a1_wait' }
    ]
  });

  S.add({
    id: 'a1_teddy_votes',
    chapter: CH,
    place: PLACE,
    text: [
      'I put it to him: all of it, in order, without softening what can\u2019t be softened.',

      'He listens like a man hearing the weather forecast for a country he\u2019s about to leave. ' +
      'When I finish, he\u2019s quiet for a long moment. Then he smiles, and it\u2019s a real smile.',

      '<span class="said">"Thank you,"</span> he says. <span class="said">"Forty-one days. That\u2019s ' +
      'the first question anyone\u2019s asked me with my name in it."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"Here\u2019s what I want. I come with you as far as this body manages. When ' +
      'it stops managing, I\u2019m the one who says so. And on that night, one of you doesn\u2019t argue ' +
      'with me."</span> A breath. <span class="said">"That\u2019s all. That\u2019s the whole will and ' +
      'testament."</span>'
    ],
    choices: [
      { label: 'Agree. All of it. Shake his hand on it.', tone: 'kind', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('theCompact'); s.soften(12); s.trust('teddy', 30); s.trust('wren', 20); s.trust('odile', 10); } },
      { label: 'Agree out loud. Decide privately that you\u2019ll argue.', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('secretlyWillArgue'); s.soften(4); s.scar(6); } },
      { label: '"No. You come, you keep coming, and that\u2019s not up for discussion."',
        tone: 'kind', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.soften(8); s.trust('teddy', 10); s.scar(4); } },
      { label: 'Overrule him. He stays.', tone: 'cruel', to: 'a1_leave_teddy',
        act: function (s) { s.set('route', 'left'); s.set('overruledHim'); s.harden(15); s.scar(10); } }
    ]
  });

  S.add({
    id: 'a1_wait',
    chapter: CH,
    place: PLACE,
    dateEntry: true,
    enter: function (s) { s.advance(1); s.set('waited'); },
    text: [
      'Last night I said we\u2019d wait for morning. Nobody argued. Bram put the torch down, ' +
      'and Wren took her shoes off again.',

      'None of us has slept. At four, Teddy\u2019s breathing changed: thicker, with a catch at the ' +
      'top of each breath, a small click like a key turning.',

      'At five, the humming outside stops.',

      { c: 'sep', t: '\u2042' },

      'It doesn\u2019t fade. It <em>stops</em>, fifty throats cutting off on the same beat. ' +
      'For a moment all I can hear is the shutter ticking in the cold and Teddy trying to breathe. ' +
      'The last time the world went this quiet was the Hush.',

      'Wren is already up with her shoes on. She\u2019s always the first to understand.'
    ],
    choices: [
      { label: 'Out the back. Now. Everyone. Carry him.', tone: 'kind',
        show: function (s) { return s.flag('foundBackDoor'); },
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('ranFromIt'); s.soften(8); s.scar(8); } },
      { label: 'Out the back. Now. Leave him. There\u2019s no time.', tone: 'cruel',
        show: function (s) { return s.flag('foundBackDoor'); },
        to: 'a1_leave_teddy',
        act: function (s) { s.set('route', 'left'); s.set('ranFromIt'); s.harden(14); s.scar(12); } },
      { label: 'Hold the shutter. Whatever\u2019s coming, meet it here.', tone: 'risk',
        to: 'a1_shutter' },
      { label: 'Go to the window and look.', tone: 'risk', to: 'a1_shutter',
        act: function (s) { s.set('lookedFirst'); s.scar(5); } },
      { label: 'Go to Teddy. Whatever happens next, don\u2019t let it happen to him alone.',
        tone: 'kind', show: function (s) { return s.alive('teddy'); }, to: 'a1_shutter',
        act: function (s) { s.soften(8); s.trust('teddy', 20); s.scar(4); } },
      { label: 'Get everyone into the stockroom and put the shelving across the door.',
        to: 'a1_shutter', act: function (s) { s.trust('bram', 10); s.ease(4); } }
    ]
  });

  S.add({
    id: 'a1_shutter',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.hurt(8); s.scar(12); },
    text: [
      'They come through the front in the ninth second.',

      'Not through the shutter: through the <em>window frame</em>. Thirty pairs of hands working ' +
      'as one machine tear the whole aluminium assembly out of forty-year-old brick, and it\u2019s ' +
      'the loudest thing I\u2019ve heard since the world ended.',

      'Bram has the shelving over before I\u2019ve finished turning round. Odile has Teddy under the ' +
      'arms. Wren is at the fire door with both hands on the bar, looking back at me. She doesn\u2019t ' +
      'make a sound. Her face is <span class="wound">asking</span>.'
    ],
    choices: [
      { label: 'Get Teddy. Both of you. Go.', tone: 'kind',
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.hurt(10); s.soften(10); s.scar(10); } },
      { label: 'Go. Just go. He\u2019s already behind you.', tone: 'cruel',
        to: 'a1_leave_teddy',
        act: function (s) { s.set('route', 'left'); s.set('leftHimRunning'); s.harden(12); s.scar(16); } },
      { label: 'Stand in the doorway and buy them the seconds.', tone: 'risk',
        to: 'a1_doorway' },
      { label: 'Get Wren out first. Everything else second.', tone: 'kind',
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('wrenFirst'); s.set('tookTeddy'); s.hurt(14); s.soften(8); s.trust('wren', 25); s.scar(10); } }
    ]
  });

  S.add({
    id: 'a1_doorway',
    chapter: CH,
    place: PLACE,
    enter: function (s) {
      s.hurt(18); s.scar(14); s.infect(10);
      s.set('heldTheDoor');
      s.trust('bram', 20); s.trust('wren', 20); s.trust('odile', 15); s.trust('teddy', 20);
    },
    text: [
      'I brace my back against the stockroom doorframe, plant my boots, and make myself into the door.',

      'Up close it isn\u2019t teeth, not at first. It\u2019s <span class="wound">hands</span>, dozens ' +
      'of them, pulling at my coat, my hair, my jaw, all of them trying to turn me round and quieten ' +
      'me and make me part of it. Something takes a strip off my forearm. Something presses its open ' +
      'mouth to my ear and <em>hums</em>, straight into my skull, and for one bright second I want ' +
      'to let go.',

      'Then Bram has my belt in his fist and hauls. The fire door bangs shut, and I\u2019m on my ' +
      'hands and knees in the yard, being sick onto flattened cardboard, while the steel door bulges ' +
      'in its frame and holds.',

      { c: 'hum', t: 'h m m m m m m m' }
    ],
    choices: [
      { label: 'Get up. Get them to the lane.', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); } },
      { label: 'Check your arm first.', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('sawTheWound'); s.scar(6); },
        toast: ['Four parallel grazes. Beaded. Not deep. Not nothing.', 'rot'] },
      { label: 'Say nothing about the humming in your ear. Ever.', tone: 'cruel',
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('hidTheHum'); s.harden(6); s.scar(8); } }
    ]
  });

  /* ---------------------------------------------------------- the three roads */
  S.add({
    id: 'a1_leave_teddy',
    chapter: CH,
    place: PLACE,
    enter: function (s) {
      s.part('teddy', 'left at Rosco Drug & Sundry');
      s.harden(14); s.scar(16);
      s.trust('wren', -30); s.trust('odile', -15); s.trust('bram', 10);
      s.take('revolver');
      s.take('lighter');
      s.keep('fork', 'He pressed it into my hand at the end. "No use to me," he said. "I already know the note."');
    },
    text: [
      'I leave him the revolver, with the one chamber that matters, the lighter, and the unopened ' +
      'bottle of water. I set them out on the shelf beside him like offerings at a shrine I ' +
      'don\u2019t believe in.',

      '<em>He says thank you.</em> He means it. He pats my hand twice, as if I\u2019m the one who ' +
      'needs steadying.',

      { c: 'sep', t: '\u2042' },

      'Wren won\u2019t take my arm at the fire door. She goes through ahead of me and doesn\u2019t ' +
      'look back, and from then on there\u2019s a distance between us exactly the width of an old ' +
      'man in a dark room.',

      'Nine minutes later, near the far end of the lane, I hear a single shot behind me. Then the ' +
      'humming changes direction.'
    ],
    choices: [
      { label: 'Keep walking. Don\u2019t let anyone stop.', tone: 'cruel', to: 'a2_lane',
        act: function (s) { s.harden(8); } },
      { label: 'Stop. Let everyone hear it properly. He\u2019s owed that much.', to: 'a2_lane',
        act: function (s) { s.scar(10); s.soften(4); s.trust('wren', 8); s.trust('odile', 6); } },
      { label: 'Tell them it was something else. A car backfiring. Anything.', tone: 'cruel',
        to: 'a2_lane', act: function (s) { s.harden(10); s.scar(6); s.trust('wren', -10); } }
    ]
  });

  S.add({
    id: 'a1_smother',
    chapter: CH,
    place: PLACE,
    enter: function (s) {
      var how = s.flag('byMyHand') ? 'by my hand' : 'by Odile\u2019s hand';
      s.kill('teddy', how);
      s.harden(s.flag('byMyHand') ? 24 : 16);
      s.scar(s.flag('byMyHand') ? 26 : 20);
      s.trust('wren', -40); s.trust('odile', s.flag('byMyHand') ? 5 : -20); s.trust('bram', 20);
      if (s.has('morphine')) s.take('morphine');
      s.keep('fork', 'It was in his coat pocket afterwards, in the dark. Nobody saw me take it, and I\u2019ve never explained why.');
    },
    text: function (s) {
      var mine = s.flag('byMyHand');
      var lines = [
        'It\u2019s done in the hour before dawn, in a stockroom, by the light of a wind-up torch ' +
        'someone has turned to face the wall.'
      ];
      if (s.has('morphine') || s.flag('morphineForMe') || s.flag('odileKeepsMorphine')) {
        lines.push('There\u2019s morphine. It makes it kinder, and it makes it longer, and I already ' +
          'know I\u2019ll be describing it to myself in a sentence that keeps changing its verbs.');
      } else {
        lines.push('There\u2019s no morphine for it, so it\u2019s done with a folded coat and a knee, ' +
          'and it takes far longer than eleven seconds.');
      }
      lines.push(mine
        ? 'My hands. I insisted, I was right to insist, and I\u2019ll never be glad of it. He ' +
          'doesn\u2019t fight. What keeps coming back is this: <em>he helps me</em>, at the start, ' +
          'getting the angle right, the way a man steadies a ladder for someone else.'
        : 'Odile\u2019s hands, thirty years practised and steady. Her face the whole time is doing ' +
          'something that isn\u2019t calm but is wearing calm\u2019s clothes. Afterwards she washes ' +
          'to the elbow in grain alcohol and barely says a word.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Wren watches from the doorway. None of us notices in time to send her away; none ' +
        'of us can think about anything but the one thing. Of all tonight\u2019s failures, that ' +
        'small, ordinary one is the one I can\u2019t excuse.');
      lines.push('Within a minute, the humming outside eases. The street relaxes. The arithmetic ' +
        'was right. That\u2019s the obscene part: <em>the arithmetic was right.</em>');
      return lines;
    },
    choices: [
      { label: 'Go to Wren.', tone: 'kind', to: 'a1_after_wren' },
      { label: 'Go to Odile.', show: function (s) { return !s.flag('byMyHand'); }, to: 'a1_after_odile' },
      { label: 'Wash. Pack. Leave within the hour.', tone: 'cruel', to: 'a2_lane',
        act: function (s) { s.harden(10); s.set('leftImmediately'); } },
      { label: 'Sit with the body until the light comes.', to: 'a2_lane',
        act: function (s) { s.scar(10); s.soften(5); s.set('satWithHim'); } }
    ]
  });

  S.add({
    id: 'a1_after_wren',
    chapter: CH,
    place: PLACE,
    text: [
      'She\u2019s in the yard with her back against the wall and the pad on her knees. She doesn\u2019t ' +
      'look up. She writes, tears the page off, and holds it out sideways without turning her head.',
      { c: 'whisper', t: 'i know why' },
      { c: 'whisper', t: 'thats the worst bit. i know why and its still the worst thing ive ever seen' },
      { c: 'whisper', t: 'dont tell me it was mercy. tell me it was arithmetic. i can live next to arithmetic' }
    ],
    choices: [
      { label: '"It was arithmetic."', to: 'a2_lane',
        act: function (s) { s.trust('wren', 18); s.harden(5); s.scar(6); s.set('toldHerArithmetic'); },
        toast: ['She folds the paper into a square and keeps it.', 'good'] },
      { label: '"It was mercy, and I won\u2019t pretend otherwise."', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('wren', -12); s.soften(5); s.scar(8); } },
      { label: '"It was both. That\u2019s why it\u2019s unbearable."', to: 'a2_lane',
        act: function (s) { s.trust('wren', 12); s.scar(10); s.soften(3); } },
      { label: 'Sit down beside her and say nothing at all.', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('wren', 20); s.soften(6); s.ease(5); } }
    ]
  });

  S.add({
    id: 'a1_after_odile',
    chapter: CH,
    place: PLACE,
    text: [
      'She\u2019s at the sink with her sleeves pushed past the elbow, washing hands that are already ' +
      'clean, in a shop with no running water, with grain alcohol from a measuring jug.',
      '<span class="said">"Do not thank me,"</span> she says, without turning. <span class="said">"I have ' +
      'been thanked for this nine hundred times. It has never once been the right thing to say."</span>',
      'She pours again. Washes again.',
      '<span class="said">"Ask me instead whether I will do it again. The answer is yes. That is what I ' +
      'am now. Somebody in this group had to become it. I had the training, so the job came to me, ' +
      'the way jobs do."</span>'
    ],
    choices: [
      { label: '"You\u2019re not only that."', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('odile', 20); s.soften(6); } },
      { label: '"Good. We\u2019ll need you to be."', tone: 'cruel', to: 'a2_lane',
        act: function (s) { s.trust('odile', 8); s.harden(12); s.set('madeHerTheKnife'); } },
      { label: '"Next time it\u2019s my hands."', to: 'a2_lane',
        act: function (s) { s.set('learnedTheHands'); s.trust('odile', 14); s.scar(8); s.harden(6); } },
      { label: 'Take the jug off her gently and stop her washing.', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('odile', 24); s.soften(8); s.ease(4); } }
    ]
  });

  S.add({
    id: 'a1_depart',
    chapter: CH,
    place: 'The service lane',
    enter: function (s) { s.set('tookTeddy'); s.set('route', 'together'); },
    text: [
      'Getting Teddy over the yard wall takes four minutes and costs everyone something. Odile goes ' +
      'first and takes his weight from above. Bram makes a step of his hands and says nothing about ' +
      'any of it, which is the most generous thing I\u2019ve seen him do.',

      'Wren comes over last, after me. Even scrambling down a brick wall in the dark, she doesn\u2019t ' +
      'make a sound.',

      { c: 'sep', t: '\u2042' },

      'The lane is empty and cold and smells of old fat from the chip-shop extractors. At the far ' +
      'end, white across the opening, the refrigerated lorry waits with its doors shut.',

      'Teddy walks between Odile and me with an arm over each of our shoulders. He weighs almost ' +
      'nothing. Six weeks of rationing have made a seventy-one-year-old man into something I could ' +
      'carry with one arm.',

      'He\u2019s trying very hard not to breathe loudly. I can feel him trying, through my shoulder, ' +
      'at every step.'
    ],
    choices: [
      { label: 'Head for the lorry.', to: 'a2_lane' },
      { label: 'Tell him to stop trying. Breathe. Let it be loud.', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.soften(8); s.trust('teddy', 20); s.trust('wren', 10); s.set('letHimBreathe'); },
        toast: ['He sobs once, with relief, and then breathes properly.', 'good'] },
      { label: 'Gag him with the tape. It\u2019s that or nothing.', tone: 'cruel',
        show: function (s) { return s.has('tape'); }, to: 'a2_lane',
        act: function (s) { s.take('tape'); s.harden(14); s.scar(10); s.trust('teddy', -25); s.trust('wren', -25); s.set('gaggedHim'); },
        toast: ['He lets you. He lifts his chin to help you do it.', 'bad'] },
      { label: 'Give him the photo strip to hold. Something to grip.', tone: 'kind',
        show: function (s) { return s.has('photo'); }, to: 'a2_lane',
        act: function (s) { s.take('photo'); s.give('_photoWithTeddy'); s.soften(6); s.trust('teddy', 15); s.scar(4); s.set('gavePhoto'); } }
    ]
  });

  for (var i = 0; i < S.order.length; i++) {
    var node = S.get(S.order[i]);
    for (var j = 0; j < node.choices.length; j++) {
      if (node.id !== 'start' && node.choices[j].to === 'a1_hub') {
        node.choices[j].to = 'a1_council';
      }
    }
  }
})();
