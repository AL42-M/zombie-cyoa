/* ============================================================
   THE HUSH — Act I: Rosco Drug & Sundry
   Night of day forty-one. Five people, one door, one lung.
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
      'most of his life. Six weeks of nights on a concrete floor have gone into that lung and stayed ' +
      'there. His breathing carries the length of the room.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Out in the street, beyond the shutter, something answers him: a crowd holding one low note, ' +
      'too even to be voices. Each time Teddy breathes in, the crowd leans toward the glass.'
    ],
    choices: [
      { label: 'Go to Teddy.', hint: 'he\u2019s awake and knows what his breathing does', tone: 'kind', to: 'a1_teddy' },
      { label: 'Check the front window.', hint: 'count them', to: 'a1_window' },
      { label: 'Wake Odile.', hint: 'she\u2019ll tell you how long he has', to: 'a1_odile' },
      { label: 'Search the dispensary.', hint: 'there may still be something worth taking', to: 'a1_dispensary' },
      { label: 'Sit with Wren.', hint: 'she hasn\u2019t slept either', tone: 'kind', to: 'a1_wren' },
      { label: 'Call everyone together. The street is already listening.', to: 'a1_hub' },
      { label: 'Crank the radio. Find out whether anyone else is still awake.', to: 'a1_radio' }
    ]
  });

  S.add({
    id: 'a1_hub',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('calledTogether'); },
    text: [
      'The stockroom smells of cardboard and the rubbing alcohol I spilled last week. Someone has ' +
      'stacked incontinence pads into a mattress. On the wall, in grease pencil, DAY 41 sits under ' +
      'DAY 40, under thirty-nine more.',
      'I wake the others. Bram brings the crank flashlight; Wren brings her pad. Teddy breathes, and ' +
            'the street answers. I haven\u2019t worked out what to say.'
    ],
    choices: [
      { label: 'Let Teddy speak before anyone votes.', tone: 'kind', to: 'a1_teddy_votes' },
      { label: 'Say nothing. Let Bram start.', hint: 'Bram makes his case first',
        to: 'a1_council', act: function (s) { s.set('letBramStart'); } },
      { label: 'Put every option on the table. Even the worst one.', to: 'a1_council' }
    ]
  });

  S.add({
    id: 'a1_teddy',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('spokeToTeddy'); s.set('heardTeddyEar'); },
    text: [
      'He\u2019s propped against the shelving; lying flat fills his chest faster. In the dark his face ' +
      'is a pale smudge with wet eyes. He lifts one hand and turns it palm-down, an old conductor asking ' +
      'for a quieter passage.',

      '<span class="said">"I can hear myself,"</span> he says. <span class="said">"That\u2019s the ' +
      'trouble. If I can hear myself\u2014"</span>',

      'He doesn\u2019t finish. He doesn\u2019t have to. We\u2019ve all worked it out, and we\u2019ve all ' +
      'pretended we haven\u2019t.',

      '<span class="said">"Forty years I taught children to breathe from here."</span> He taps his ' +
      'belly. The tap turns into a cough, and he forces it down with both hands over his mouth. ' +
      'Out in the street, heads come down and turn toward the shutter, all together, like wheat going ' +
      'over in a gust.',

      'When it passes, he takes a tuning fork from his coat pocket, taps it on his knee, and presses ' +
      'the stem to the bone behind his ear, so it rings inside his skull and nowhere else. He listens to ' +
      'the street against it with his eyes shut.',

      '<span class="said">"D flat,"</span> he whispers. <span class="said">"A hair under. Every one of ' +
      'them under by the same hair. I never got a choir to agree on a pitch for one whole bar, and ' +
      'nobody rehearsed these people."</span> He puts the fork away. <span class="said">"There\u2019s ' +
      'a woman out there in a bathrobe, singing bass. And not one of them has stopped to breathe. ' +
      'I\u2019ve been listening for six weeks."</span>'
    ],
    choices: [
      { label: 'Tell him he\u2019s coming with you, whatever it costs.', tone: 'kind',
        hint: 'the others haven\u2019t agreed to this', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.soften(5); s.trust('teddy', 20); s.scar(4); },
        toast: ['You promised.', 'good'] },
      { label: 'Ask him what he wants.', hint: 'he may ask for something hard', to: 'a1_teddy_wants' },
      { label: 'Say nothing. Hold his hand.', tone: 'kind',
        to: 'a1_hub', act: function (s) { s.soften(3); s.trust('teddy', 10); },
        toast: ['His hand is cold, and he lets you keep it.', 'good'] },
      { label: 'Tell him the truth: he\u2019s going to get everyone killed.', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.harden(9); s.scar(6); s.trust('teddy', -25); s.set('toldTeddyTruth'); },
        toast: ['He nods. He already knew.', 'bad'] }
    ]
  });

  S.add({
    id: 'a1_teddy_wants',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('askedTeddy'); },
    text: function (s) {
      var lines = [];
      if (!s.flag('spokeToTeddy')) {
        lines.push('I go to Teddy\u2019s corner, crouch beside him, and ask him what he wants.');
      }
      lines.push('He takes his time. Across the room, Wren has gone still to listen.');
      lines.push('<span class="said">"I don\u2019t want to be the reason,"</span> he says. <span class="said">"It\u2019s ' +
        'all I have left to want. I was a reason for good things once. Four hundred children."</span> ' +
        'A breath. <span class="said">"I\u2019d like my last one not to be the other kind."</span>');
      lines.push('He finds my hand without looking and presses something into it: small, cold, hard-edged. ' +
        'A staff badge with the photograph scraped off.');
      lines.push({ c: 'note', t: 'ST. AMARANTH MERCY \u2014 WARD STAFF' });
      lines.push('<span class="said">"My niece worked there. Three weeks ago she said they were still taking ' +
        'people in. She said they had something."</span> A wet laugh. <span class="said">"She also said ' +
        'don\u2019t go. Same letter."</span>');
      return lines;
    },
    choices: [
      { label: 'Take the badge. Promise him you\u2019ll all go together.', tone: 'kind',
        show: function (s) { return !s.flag('spokeToTeddy'); },
        to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('promisedTeddy'); s.soften(4); s.trust('teddy', 18); } },
      { label: 'Take the badge. Promise nothing.', to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.harden(3); } },
      { label: 'Refuse it. A dead man\u2019s errand is still an errand.', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.harden(7); s.trust('teddy', -15); s.scar(3); } },
      { label: 'Ask what "something" means.', to: 'a1_teddy_something' },
      { label: 'Take the badge across to Wren. She heard most of that.', to: 'a1_wren_wants',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('badgeToWren'); s.set('wrenHeardTeddy'); } }
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
      { label: 'Take it, and ask him about his niece.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('askedAboutNiece'); s.soften(4); s.trust('teddy', 12); },
        toast: ['She sang alto for him at twelve, a little flat. He never once told her.', 'good'] },
      { label: 'Take it, and keep the Mercy to yourself for now.', to: 'a1_hub',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('hidMercy'); s.harden(4); } },
      { label: 'Take it to Wren. She should see it.', to: 'a1_wren_wants',
        act: function (s) { s.give('badge'); s.set('knowsMercy'); s.set('badgeToWren'); } },
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
      '"It is pneumonia, in the only lung he has. The other came out years ago; he showed me the scar. ' +
      'Six weeks on a cold floor did the rest. I have no stethoscope. I have my ear against his back, and ' +
      'I hear the fluid shift when he turns over. I put down a collie last spring that sounded better ' +
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
      'She looks at me for a long while, the way she must have looked at nine hundred frightened ' +
      'animals on a steel table, and makes up her mind somewhere I can\u2019t see.',

      'She takes the ampoule from her coat and holds it up between two fingers. In the dark it\u2019s ' +
      'barely there, a glint of glass.',

      '<span class="said">"Understand that until it is used, it is poison,"</span> she says. ' +
      '<span class="said">"Poison you carry around with Teddy\u2019s name on it."</span>'
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

      { c: 'whisper', t: 'She doesn\u2019t say that she resents him for it. I can hear it anyway, in how she says <em>respect</em>.' }
    ],
    choices: [
      { label: 'Tell her she\u2019s a good person.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('odile', 10); s.soften(3); },
        toast: ['She doesn\u2019t believe you, but she lets you say it.', 'good'] },
      { label: 'Ask her to do it tonight.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('askedOdileToKill'); s.harden(12); s.scar(7); s.trust('odile', -12); } },
      { label: 'Go ask Teddy what he wants.', tone: 'kind', to: 'a1_teddy_wants' },
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
      'in a dish towel, a bottle of grain alcohol with a handwritten label, and most of a roll of duct tape.',

      'A pharmacist\u2019s white coat hangs on a hook, its name badge reading ROSCO \u2014 SINCE 1974. ' +
      'In the pocket there\u2019s a grocery list. <em>Milk. Trash bags. Call Mom.</em>',

      { c: 'sep', t: '\u2042' },

      'I stand in the dark holding a dead man\u2019s grocery list while the street hums, and for a ' +
      'moment all of it, every list, every mom nobody called, tries to get in at once.'
    ],
    choices: [
      { label: 'Pocket the list.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('keptTheList'); s.soften(5); s.scar(4); },
        toast: ['You fold it small and put it away.', 'good'] },
      { label: 'Put it back exactly where it was.', to: 'a1_hub',
        act: function (s) { s.scar(3); } },
      { label: 'Burn it. You can\u2019t carry everyone\u2019s mother.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(7); s.ease(3); } },
      { label: 'Drink some of the alcohol.', tone: 'risk', to: 'a1_hub',
        act: function (s) { s.ease(8); s.hurt(4); s.take('flask'); s.set('drankIt'); },
        toast: ['It takes the edge off and burns your throat raw.', 'weight'] },
      { label: 'Check the back of the drugstore while you\u2019re up.', to: 'a1_backdoor' }
    ]
  });

  S.add({
    id: 'a1_wren',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('sawWren'); },
    text: [
      'Wren is fourteen and hasn\u2019t made a sound since the third day. She doesn\u2019t even cough ' +
      'out loud; she has learned to swallow it. In this room that makes her the most valuable person ' +
      'alive. Everyone knows it. Only Bram has said it out loud, once, on day twenty, and he wasn\u2019t ' +
      'really talking about her.',

      'She\u2019s awake. She hands me the pharmacy pad before I\u2019ve said a word, the stub of pencil ' +
      'threaded through the wire. She\u2019s already written on it.',

      { c: 'pad', t: 'you were going to ask me if im ok' },

      { c: 'pad', t: 'everyone asks me that when theyve already decided something' }
    ],
    choices: [
      { label: 'Write back: "We haven\u2019t decided anything."', to: 'a1_wren_lie',
        act: function (s) { s.set('liedToWren'); } },
      { label: 'Write back: "They want to leave Teddy."', tone: 'risk', to: 'a1_wren_truth',
        act: function (s) { s.set('toldWrenTruth'); s.soften(4); } },
      { label: 'Hand the pad back and sit with her in silence.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('wren', 12); s.soften(3); s.ease(4); },
        toast: ['It\u2019s the first real rest either of you has had in days.', 'good'] }
    ]
  });

  S.add({
    id: 'a1_wren_lie',
    chapter: CH,
    place: PLACE,
    text: [
      'She reads it, then looks at me for three full seconds, which from Wren is a speech.',
      'She takes the pad back, writes without hurrying, and turns it around.',
      { c: 'pad', t: 'ok' },
      { c: 'pad', t: 'ill pretend i believe that if you pretend you said it kindly' }
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
      'She isn\u2019t surprised. She\u2019s fourteen, and I can\u2019t hold her eye for long.',
      { c: 'pad', t: 'bram said it on day 20' },
      { c: 'pad', t: 'hes been saying it quieter since' },
      { c: 'pad', t: 'if you leave teddy ill still come with you' },
      { c: 'pad', t: 'i just wont be able to look at you' }
    ],
    choices: [
      { label: 'Swear to her that Teddy comes too.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('sworeToWren'); s.trust('wren', 22); s.soften(6); } },
      { label: 'Tell her you don\u2019t know yet.', to: 'a1_hub',
        act: function (s) { s.trust('wren', 4); } },
      { label: 'Tell her that\u2019s a child\u2019s way of thinking.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(10); s.trust('wren', -20); s.scar(5); } },
      { label: 'Ask her what she wants.', show: function (s) { return !s.flag('liedToWren'); }, to: 'a1_wren_wants' },
      { label: 'Go ask Teddy what he wants.', tone: 'kind', to: 'a1_teddy_wants' }
    ]
  });

  S.add({
    id: 'a1_wren_wants',
    chapter: CH,
    place: PLACE,
    text: function (s) {
      var lines = [];
      if (s.flag('wrenHeardTeddy')) {
        lines.push((s.flag('sawWren') ? 'I go back to Wren. ' : 'I cross the stockroom to Wren. ') +
          'She heard most of what Teddy said; I can tell by how carefully she doesn\u2019t look at the ' +
          'badge in my fist. Before I tell her anything, I ask her what she wants.');
      } else if (s.flag('badgeToWren')) {
        lines.push(s.flag('sawWren')
          ? 'I go back to Wren with the badge shut in my fist. Before I tell her anything, I ask her ' +
            'what she wants.'
          : 'I cross the stockroom with the badge shut in my fist and sit down beside Wren. Before I tell ' +
            'her anything, I ask her what she wants.');
      }
      lines.push('The pencil hovers for a long time.');
      lines.push({ c: 'pad', t: 'i want to go somewhere with a door that locks from the inside' });
      lines.push({ c: 'pad', t: 'and i want to be the one who locks it' });
      lines.push('She underlines <em>i</em> twice, hard enough to tear the paper, then looks embarrassed and ' +
      'smooths the tear flat with her thumb.');
      return lines;
    },
    choices: [
      { label: 'Promise her that door.', tone: 'kind', to: 'a1_hub',
        act: function (s) {
          s.set('promisedTheDoor'); s.trust('wren', 20); s.soften(6); s.scar(3);
          s.keep('padpage', 'She gave it to me when I promised her the door. I think she wanted someone else to hold on to it.');
        },
        toast: ['She tears the page off and folds it into your hand.', 'keepsake'] },
      { label: 'Tell her there\u2019s no such place left.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(8); s.trust('wren', -14); } },
      { label: function (s) {
          return s.flag('wrenHeardTeddy') ? 'Show her the badge. Tell her the rest about St. Amaranth Mercy.'
            : 'Tell her about St. Amaranth Mercy.';
        }, show: function (s) { return s.flag('knowsMercy'); },
        to: 'a1_hub', act: function (s) { s.set('wrenKnowsMercy'); s.trust('wren', 10); },
        toast: ['She reads the badge twice before she hands it back.', 'good'] },
      { label: 'Write back: "Me too."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('wren', 8); s.ease(4); },
        toast: ['She looks at it for a long time, then puts the pad face down between you.', 'good'] }
    ]
  });

  S.add({
    id: 'a1_window',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.bump('windowChecks'); },
    text: [
      'Rosco pulled the security shutter down forty-one days ago, and nobody has raised it since. ' +
      'Through the slats, Ferry Street is silver with moonlight and full of people standing still.',

      'I count. I always count. Thirty-one between the betting shop and the bus stop, six more than ' +
      'this morning. One of the new ones is wearing a safety vest, and its reflective strip flashes ' +
      'whenever the moon clears the clouds. Their heads are tipped back and their mouths hang open, ' +
      'and every one of them is humming.',

      'Behind me, Teddy drags in a breath. Thirty-one faces come down out of the moonlight and swing ' +
      'toward this window, all together, like compass needles. When his breath goes out, they stay ' +
      'on us a while longer before the chins lift again.',

      { c: 'hum', t: 'h m m m m m m m' },

      'None of them is looking at me, exactly. Their eyes have gone milky and loose, as if they ' +
      'stopped needing them weeks ago. They\u2019re listening.'
    ],
    choices: [
      { label: 'Keep watching. Learn how they move.', to: 'a1_window_study' },
      { label: 'Check the back of the drugstore for another way out.', to: 'a1_backdoor' },
      { label: 'Give Bram the count.', to: 'a1_bram',
        act: function (s) { s.set('bramIntro', 'window'); } },
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
      'heart as well, because paper can be taken from me.',

      { c: 'note', t: 'ONE. They go wherever the sound is. A sound is a drain and they are water.' },
      { c: 'note', t: 'TWO. A continuous sound pulls harder than a loud one. A scream turns heads. ' +
        'A man coughing all night turns a street.' },
      { c: 'note', t: 'THREE. When nothing is calling them, they stand still, put their heads back, and hum ' +
        'with their mouths open. They did it through the rain on day thirty and never closed their ' +
        'mouths. Whatever that is for, it is not for us.' },

      'The third is the one I keep turning over. Twice in the hour Teddy slips into a shallower sleep ' +
      'and his breathing eases, and both times I watch the street let go of us. The heads leave the ' +
      'window one by one and tip back until every face is turned up into the dark, all holding the ' +
      'same note. They\u2019re as patient as people in a waiting room who know their names will be ' +
      'called, and I don\u2019t think they\u2019re waiting for me.',

      'Then Teddy wakes coughing, and nearly fifty faces come down at once.'
    ],
    choices: [
      { label: 'Tell the others what you learned.', to: 'a1_hub',
        act: function (s) { s.trust('bram', 10); s.trust('odile', 8); s.set('sharedWhatILearned'); },
        toast: ['For once, Bram really listens.', 'good'] },
      { label: 'Keep what you learned to yourself.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(7); s.set('hoardedKnowledge'); } },
      { label: 'Copy the three notes onto a page for Wren.', tone: 'kind', to: 'a1_hub',
        hint: 'only Wren gets them',
        act: function (s) { s.trust('wren', 8); s.soften(2); },
        toast: ['She reads them twice and puts the page inside her shoe.', 'good'] }
    ]
  });

  S.add({
    id: 'a1_window_tap',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('atTheGlass'); },
    text: [
      'I put one knuckle to the glass and knock. Once, not loud: the knock I\u2019d use on a bathroom ' +
      'door in someone else\u2019s house.',

      'Thirty-one faces come down at once and turn to the glass. Then the nearest is at the shutter. ' +
      'It\u2019s <span class="wound">fast</span>. Its face pushes between the slats until its ' +
      'cheekbones jam, and there it stays, straining, mouth open on the note, milk-white eyes pointing ' +
      'two different ways.',

      'I\u2019m close enough to smell it: wet copper and sugar, like a butcher\u2019s dumpster in July.',

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
        toast: ['It\u2019s the first one you\u2019ve killed up close.', 'bad'] },
      { label: 'Stand still and hum back at it.', tone: 'rot', to: 'a1_hum_back' },
      { label: 'Run for the stockroom.', tone: 'risk', to: 'a1_hub',
        act: function (s) { s.scar(12); s.hurt(5); s.trust('bram', -10); s.set('tappedTheGlass'); } }
    ]
  });

  S.add({
    id: 'a1_hum_back',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('hummedBack'); s.infect(12); },
    text: function (s) {
      var atGlass = s.flag('atTheGlass');
      return [
        'I don\u2019t decide to. My chest decides, the way it decides to yawn.',

        atGlass
          ? 'The note rises out of me, low and even, and the one pressed against the shutter stops ' +
            'straining. Its jaw slackens. Its head tips back, mouth open, and out in the street the others ' +
            'tip back too, one after another, until every face is turned up again, as if I had given the ' +
            'right answer.'
          : 'The note rises out of me, low and even, and settles onto the one coming out of the radio. ' +
            'Out in the street, the crowd\u2019s note shifts to meet it, until the radio, the street, and ' +
            'I are holding the same sound.',

        { c: 'hum', t: 'h m m m m m m m' },

        'For nine seconds I\u2019m part of something enormous and calm, and I understand with my whole ' +
        'body, without words, that it is <em>recruiting</em> me. It wants me out in the street with the ' +
        'others, holding the note. It has been very patient with me.',

        (atGlass
          ? 'Then Odile has me by the collar and drags me down behind the counter, and the spell peels off '
          : 'Then Odile has me by the collar, with her other hand over my mouth, and the spell peels off ') +
        'like a wet coat. There\u2019s <span class="wound">blood in my mouth</span>. I\u2019ve been ' +
        'humming hard enough to tear something.'
      ];
    },
    choices: [
      { label: 'Tell them exactly what happened.', to: 'a1_hub',
        act: function (s) { s.set('toldThemAboutHum'); s.trust('odile', -6); s.trust('bram', -14); s.scar(8); },
        toast: ['Bram doesn\u2019t turn his back on you for the rest of the night.', 'bad'] },
      { label: 'Tell them you panicked. Nothing more.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('hidTheHum'); s.harden(6); s.scar(10); } },
      { label: 'Say nothing and rinse the blood out of your mouth.', to: 'a1_hub',
        act: function (s) { s.set('hidTheHum'); s.scar(6); } }
    ]
  });

  S.add({
    id: 'a1_backdoor',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('foundBackDoor'); s.set('sawTheYard'); },
    text: [
      'Past the staff restroom, a fire door opens onto a yard of flattened boxes. Beyond the yard is ' +
      'a wall, and beyond the wall, the service lane that runs behind the shops for the length of ' +
      'Ferry Street.',

      'The door has a push bar, and push bars are loud. Someone, probably Rosco in his last useful ' +
      'hour, has packed the mechanism with a folded dish towel and taped it in place.',

      'In the yard there\u2019s a bicycle with no front wheel, and propped against it, a pair of ' +
      'three-foot bolt cutters that someone brought to solve a problem and never got to use.'
    ],
    choices: [
      { label: 'Take the bolt cutters.', to: 'a1_hub',
        act: function (s) { s.give('cutters'); },
        toast: ['You take the bolt cutters. They\u2019re heavy.', 'item'] },
      { label: 'Test the door. Quietly.', tone: 'risk', to: 'a1_backdoor_test' },
      { label: 'Leave it all. Tell no one this door exists.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('secretDoor'); s.harden(9); },
        toast: ['As far as you know, nobody else has seen it.', 'bad'] }
    ]
  });

  S.add({
    id: 'a1_backdoor_test',
    chapter: CH,
    place: PLACE,
    text: [
      'I lean on the bar half an inch at a time. The dish towel does its job. The latch slips its ' +
      'keeper with a sound like a knuckle cracking in another room.',

      'The lane is empty. Forty-one days, and the lane is <em>empty</em>, because nothing in it makes ' +
      'a sound, so nothing has come to listen.',

      'At the far end, where the lane meets Quay Road, something large and white is parked across the ' +
      'opening: a refrigerated truck. The compressor is dead, the doors are shut, and along the side, ' +
      'in lettering somebody once thought cheerful: <em>FRESH DAILY</em>.'
    ],
    choices: [
      { label: 'Stand in the empty lane for a minute before you go back in.', tone: 'kind', to: 'a1_hub',
        hint: 'the bolt cutters stay in the yard',
        act: function (s) { s.set('scoutedLane'); s.ease(5); },
        toast: ['The hum still comes over the roofs, but nothing in the lane is making it.', 'good'] },
      { label: 'Go back in and tell everyone. This is the way out.', to: 'a1_bram',
        act: function (s) { s.set('scoutedLane'); s.set('sharedTheLane'); s.trust('bram', 14); s.trust('odile', 10); s.set('bramIntro', 'lane'); } },
      { label: 'Go back in and say nothing about the lane.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('scoutedLane'); s.set('secretDoor'); s.harden(9); } }
    ]
  });

  S.add({
    id: 'a1_radio',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.bump('radioTries'); },
    text: [
      'Ninety turns of the handle for ninety seconds of radio. I\u2019ve done it every night for ' +
      'thirty-eight nights, and I do it again tonight.',
      'Static, static, static. Then, at 1476 kHz, where there used to be nothing, the sound ' +
      'that\u2019s always there now:',
      { c: 'hum', t: 'h m m \u00b7 h m m \u00b7 h m m' },
      'The same note, broadcast. Under it there\u2019s a slow pulse, about fifty beats to the ' +
      'minute. I time it against my watch every night. It has never changed.',
      'Something out there is <em>transmitting</em> this, on a fixed frequency, with power, when ' +
      'nothing has had power for six weeks.'
    ],
    choices: [
      { label: 'Wind it again. Bram hears you and comes over.', to: 'a1_bram',
        act: function (s) { s.set('bramIntro', 'radio'); } },
      { label: 'Write 1476 on the wall, under the day count.', to: 'a1_hub',
        hint: 'then wake the others' },
      { label: 'Hum along with it, quietly, just to see.', tone: 'rot',
        show: function (s) { return !s.flag('hummedBack'); }, to: 'a1_hum_back' }
    ]
  });

  S.add({
    id: 'a1_bram',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.set('spokeToBram'); },
    text: function (s) {
      var from = s.val('bramIntro', '');
      var lines = [
        'Bram was a corrections officer for eleven years. He says the job was keeping people safe. ' +
        'Wren, on her pad, put it another way: deciding who got to eat.'
      ];
      if (from === 'radio') {
        lines.push('He sits down beside me with his back to the shelves, where he can see the shutter, ' +
          'and listens to the whole ninety seconds without a word. When he speaks, he doesn\u2019t look at me.');
      } else if (from === 'window') {
        lines.push('He\u2019s sitting up with his back to the shelves, where he can see the shutter. I give ' +
          'him the count. He doesn\u2019t ask me to repeat it, and when he speaks, he doesn\u2019t look at me.');
      } else if (from === 'lane') {
        lines.push('Bram is the first one I tell. He hears me out with his back to the shelves and his ' +
          'eyes on the shutter, and he doesn\u2019t look at me when he answers.');
        lines.push('<span class="said">"I know about the lane,"</span> he says. <span class="said">"I\u2019ve ' +
          'been out there myself. It doesn\u2019t change anything. He\u2019ll be just as loud out there as ' +
          'he is in here."</span>');
      } else {
        lines.push('He\u2019s awake, sitting with his back to the shelves and the shutter in his line of ' +
          'sight, as he is every night. He doesn\u2019t look at me when he speaks.');
      }
      lines.push('<span class="said">"It\u2019s a dinner bell,"</span> he says. <span class="said">"That\u2019s ' +
        'what it is. We\u2019re all sitting inside a dinner bell, waiting for it to stop ringing."</span>');
      lines.push('When he finally turns his head, his face is tired and reasonable. Nothing he says next ' +
        'is going to sound crazy, and that scares me more than shouting would.');
      lines.push('<span class="said">"Four days. Odile says four days. That\u2019s four nights of him calling ' +
        'them in, and then he goes anyway, and we\u2019re four people in a drugstore with fifty of them at the ' +
        'glass. Tell me the version of that where waiting is the kind option."</span>');
      return lines;
    },
    choices: [
      { label: '"We carry him. All of us. That\u2019s the version."', tone: 'kind', to: 'a1_bram_carry' },
      { label: '"Then we go tonight. All five of us, out the back."', to: 'a1_bram_tonight' },
      { label: '"You want to kill him. Say it. In those words."', tone: 'risk', to: 'a1_bram_sayit' },
      { label: '"You\u2019re right."', tone: 'cruel', to: 'a1_bram_agree' },
      { label: 'Ask him about his daughter.', tone: 'kind', to: 'a1_bram_daughter' },
      { label: 'Get up and walk away while he\u2019s still talking.', to: 'a1_hub',
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
      '<span class="said">"I\u2019m not a monster. I want you to hear that before I say the next part. ' +
      'You know I\u2019ve got a daughter in Thornbury, if there\u2019s still a Thornbury. Every night I ' +
      'don\u2019t leave this drugstore, I\u2019m choosing a man I met six weeks ago over her. I\u2019ve done ' +
      'that forty times. I\u2019m asking you to notice I\u2019ve done it forty times."</span>'
    ],
    choices: [
      { label: '"I notice. And we still carry him."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.trust('bram', 6); s.soften(6); } },
      { label: '"Go to Thornbury, then. Alone. Tonight."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.trust('bram', -30); s.harden(8); s.set('toldBramToGo'); } },
      { label: '"Give me until morning."', to: 'a1_hub',
        act: function (s) { s.set('untilMorning'); s.trust('bram', 8); } }
    ]
  });

  S.add({
    id: 'a1_bram_daughter',
    chapter: CH,
    place: PLACE,
    text: [
      'He has no photograph, so he tells me about her instead: a flat list of facts, recited like ' +
      'something he\u2019s afraid of losing.',
      '<span class="said">"Nine. Asthmatic. Frightened of the vacuum cleaner. Her mother and I are\u2014' +
      'were\u2014"</span> He stops there and starts again. <span class="said">"She\u2019ll be at her ' +
      'grandma\u2019s. Her grandma\u2019s got a storm cellar, a shotgun, and no imagination whatsoever, ' +
      'which right now I\u2019d call the finest combination of qualities in the state."</span>',
      'He looks at the shutter.',
      '<span class="said">"Asthmatic,"</span> he says again. <span class="said">"She\u2019d sound like him."</span>',
      { c: 'whisper', t: 'He has been doing this arithmetic for six weeks, and his daughter is in every line of it.' }
    ],
    choices: [
      { label: '"Then you know exactly why we carry Teddy."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.trust('bram', 20); s.soften(8); },
        toast: ['His shoulders drop. He doesn\u2019t agree, but he stops arguing.', 'good'] },
      { label: '"Then you know exactly why he can\u2019t come."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('agreedWithBram'); s.trust('bram', 22); s.harden(12); s.scar(6); } },
      { label: 'Say nothing. Let him sit with it.', to: 'a1_hub',
        act: function (s) { s.trust('bram', 6); s.scar(4); } },
      { label: 'Ask him to say it all again, slowly, and write it down.', tone: 'kind', to: 'a1_hub',
        hint: 'so it isn\u2019t only in one man\u2019s head',
        act: function (s) {
          s.trust('bram', 14); s.soften(5); s.scar(3);
          s.keep('facts', 'He dictated and I wrote. Neither of us said why.');
        },
        toast: ['You write down everything he tells you about her.', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a1_bram_tonight',
    chapter: CH,
    place: PLACE,
    text: function (s) {
      var lines = [
        'For the first time in six weeks, Bram looks at me as if I\u2019m not something to be managed.'
      ];
      if (s.flag('scoutedLane')) {
        lines.push('<span class="said">"How far did you get?"</span> He\u2019s already on his feet.');
        lines.push('I tell him: all the way to the end, where the lane meets Quay Road and a refrigerated ' +
          'truck is wedged across the opening like a cork in a bottle.');
        lines.push('<span class="said">"Then we go over the cork,"</span> he says.');
      } else {
        lines.push('<span class="said">"The lane,"</span> he says. He\u2019s already on his feet. ' +
          '<span class="said">"I\u2019ve been out there. Yard, wall, then the lane, empty as far as I went. ' +
          'Something big is parked across the far end, where it meets Quay Road. A truck, I think. ' +
          'We\u2019ll get past it."</span>');
      }
      lines.push('Then, carefully, not looking at Teddy\u2019s corner: <span class="said">"Can he climb?"</span>');
      return lines;
    },
    choices: [
      { label: '"Then we find a route he can manage."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('planLane'); s.trust('bram', 10); s.soften(5); } },
      { label: '"No. But we\u2019re not leaving him."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('planLane'); s.trust('bram', 4); s.soften(7); } },
      { label: '"No."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('planLane'); s.set('agreedWithBram'); s.trust('bram', 18); s.harden(11); } },
      { label: '"We go tonight and we decide at the truck."', to: 'a1_hub',
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
      'this drugstore again. I won\u2019t get that last part. I know. I want it anyway."</span>'
    ],
    choices: [
      { label: '"No. And if you touch him, I\u2019ll stop you."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('defiedBram'); s.trust('bram', -20); s.soften(8); } },
      { label: '"Teddy gets to decide. Neither of us does."', to: 'a1_teddy_wants',
        act: function (s) { s.set('teddyDecides'); s.trust('bram', -6); s.trust('teddy', 15); s.soften(5); } },
      { label: '"Then it\u2019s all of us, it\u2019s Odile, and it\u2019s tonight."', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.set('agreedWithBram'); s.trust('bram', 25); s.harden(15); s.scar(10); } },
      { label: '"I\u2019ll do it myself. Leave Odile out of it."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('claimedTheKilling'); s.trust('bram', 12); s.harden(18); s.scar(14); } }
    ]
  });

  S.add({
    id: 'a1_bram_agree',
    chapter: CH,
    place: PLACE,
    text: [
      'Two words. I hear them come out of my mouth in an ordinary voice.',
      'He doesn\u2019t look triumphant. He looks like a man who has been leaning on a door to hold it ' +
      'shut, felt the pressure on the other side give way, and realized he now has to walk through it.',
      '<span class="said">"Right,"</span> he says. <span class="said">"Right."</span>',
      'In the corner, Teddy coughs. Neither of us turns around. It\u2019s the first thing Bram and I ' +
      'do together as accomplices.'
    ],
    choices: [
      { label: 'Take it back. Immediately.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('bram', -14); s.soften(6); s.scar(6); } },
      { label: 'Tell him it has to be Odile.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('agreedWithBram'); s.harden(12); s.scar(8); s.trust('bram', 15); } },
      { label: 'Tell him it has to be you.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('claimedTheKilling'); s.harden(18); s.scar(14); s.trust('bram', 12); } },
      { label: 'Tell him Teddy decides. Go ask him.', to: 'a1_teddy_wants',
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
      var lines = [];
      if (s.flag('toldBramToGo')) {
        lines.push('Bram is still here. After I told him to go, he packed his bag, set it by the fire door, ' +
          'and sat back down with the shutter in his line of sight. Neither of us has mentioned it.');
      }
      if (s.flag('planLane')) {
        lines.push('Bram points the crank flashlight at the floor and tells them about the back way: the ' +
          'fire door behind the staff restroom, the yard, the wall, the lane. He and I have already been ' +
          'over it. So there\u2019s a way out, and no excuse left for putting off who goes through it.');
      } else if (s.flag('secretDoor')) {
        lines.push('Bram points the crank flashlight at the floor. He\u2019s been out through the fire door ' +
          'behind the staff restroom, he tells us: a yard, a wall, an empty lane beyond. I had decided to ' +
          'keep that door to myself, and he has known about it all along. So there\u2019s a way out, and ' +
          'no excuse left for putting off who goes through it.');
      } else if (s.flag('sawTheYard')) {
        lines.push('I tell them about the fire door behind the staff restroom: the yard, the wall, ' +
          (s.flag('scoutedLane') ? 'and the lane beyond it, empty all the way to the truck at Quay Road.'
            : 'and the lane beyond it.') +
          ' Bram only nods; he\u2019s been out there himself. So there\u2019s a way out, and no excuse ' +
          'left for putting off who goes through it.');
      } else {
        lines.push('Bram points the crank flashlight at the floor. He\u2019s been out through the fire door ' +
          'behind the staff restroom, he tells us: a yard, a wall, an empty lane beyond. So there\u2019s ' +
          'a way out, and no excuse left for putting off who goes through it.');
      }
      lines.push((s.flag('calledTogether')
        ? 'They\u2019re all here in the small circle of light. '
        : 'I gather them into the small circle of light. ') +
        'Four faces. One of them is already crying, and I wouldn\u2019t have guessed which.');
      if (s.flag('agreedWithBram') || s.flag('claimedTheKilling')) {
        lines.push('Bram does the talking. He and I have already agreed, and he knows it. He\u2019s brief ' +
          'and reasonable, and he says <em>we</em> eleven times. I feel each one catch, like a small hook.');
      } else if (s.flag('promisedTeddy')) {
        lines.push('I do the talking. I say <em>together</em>, watch Bram\u2019s jaw set, and ' +
          'keep going.');
      } else if (s.flag('letBramStart')) {
        lines.push('I don\u2019t say anything, and Bram takes that as permission. He never uses the word. ' +
          'He says <em>options</em>, and every time he says it, he looks at Odile.');
      } else if (s.flag('calledTogether')) {
        lines.push('I put all of it on the table, the worst of it included, and then I run out of words. ' +
          'Nobody wants to go next. The silence goes on until Teddy has to end it himself.');
      } else {
        lines.push('Nobody wants to go first. The silence goes on until Teddy has to end it himself, and ' +
          'none of us stops him.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"I\u2019d like to say something,"</span> Teddy says, ' +
        '<span class="said">"while it\u2019s still a conversation. Before it\u2019s a vote."</span>');
      lines.push('He has to stop twice to get through the rest.');
      lines.push('<span class="said">"Dying, I can face. Being the reason, I can\u2019t. Only one of ' +
        'those is yours to fix."</span>');
      if (!s.flag('heardTeddyEar')) {
        lines.push('Nobody answers him. He turns his head toward the shutter and listens to the street ' +
          'with his eyes half shut, the way he must have listened to forty years of warm-ups.');
        lines.push('<span class="said">"They\u2019re all on the same pitch,"</span> he says, to nobody in ' +
          'particular. <span class="said">"Every one of them. I never had a choir that could hold that ' +
          'for a whole bar."</span>');
      }
      return lines;
    },
    choices: [
      { label: function (s) {
          return s.flag('promisedTeddy')
            ? 'Keep your promise. All five of you go out the back tonight, and he\u2019s carried if he needs it.'
            : 'All five of you go out the back tonight. He\u2019s carried if he needs carrying.';
        },
        tone: 'kind', hint: 'slow and loud, and everyone is exposed',
        show: function (s) { return s.flag('foundBackDoor'); },
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.soften(10); s.scar(5); s.trust('teddy', 25); s.trust('wren', 15); } },
      { label: 'Leave him Rosco\u2019s revolver and your lighter. Let him choose his own hour.',
        tone: 'cruel', hint: 'he stays behind alone, and the rest of you leave quietly',
        to: 'a1_leave_teddy',
        act: function (s) { s.set('route', 'left'); } },
      { label: 'Odile does it. Tonight. While he sleeps.', tone: 'cruel',
        hint: 'quick and quiet, but hard on Odile',
        show: function (s) { return !s.flag('odileKeepsMorphine') || true; },
        to: 'a1_smother',
        act: function (s) { s.set('route', 'killed'); } },
      { label: 'You do it. Nobody else carries this.', tone: 'cruel',
        hint: 'harder on you, easier on Odile',
        show: function (s) { return s.flag('learnedTheHands') || s.has('morphine') || s.flag('claimedTheKilling'); },
        to: 'a1_smother',
        act: function (s) { s.set('route', 'killed'); s.set('byMyHand'); } },
      { label: function (s) {
          return s.flag('teddyDecides') ? 'Do what you told Bram. Let Teddy decide, in front of everyone.'
            : 'Put it to Teddy. His lungs, his vote.';
        }, hint: 'let him decide what happens to him',
        show: function (s) { return !s.flag('calledTogether'); },
        to: 'a1_teddy_votes' },
      { label: function (s) {
          return s.flag('untilMorning') ? 'Take the night you asked Bram for. Nothing happens before morning.'
            : 'Refuse to decide. Wait for morning.';
        }, hint: 'morning is four hours away',
        to: 'a1_wait' }
    ]
  });

  S.add({
    id: 'a1_teddy_votes',
    chapter: CH,
    place: PLACE,
    text: function (s) {
      var lines = [
        'I put it to him: all of it, in order, without softening what can\u2019t be softened.',

        'He listens like a man hearing the weather forecast for a country he\u2019s about to leave. ' +
        'When I finish, he\u2019s quiet for a while. Then he smiles, and it\u2019s a real smile.'
      ];
      if (s.flag('askedTeddy')) {
        lines.push('<span class="said">"Thank you,"</span> he says. <span class="said">"That\u2019s twice ' +
          'tonight somebody has asked me. Forty-one days, and then twice in one night."</span>');
      } else {
        lines.push('<span class="said">"Thank you,"</span> he says. <span class="said">"Forty-one days. ' +
          'That\u2019s the first question anyone\u2019s asked me with my name in it."</span>');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"Here\u2019s what I want. I come with you as far as this body manages. ' +
        'When it stops managing, I\u2019m the one who says so. And on that night, one of you doesn\u2019t ' +
        'argue with me."</span> A breath. <span class="said">"That\u2019s all. That\u2019s my whole will."</span>');
      return lines;
    },
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
      'Last night I said we\u2019d wait for morning. Nobody argued. Bram put the flashlight down, ' +
      'and Wren took her shoes off again.',

      'None of us has slept. At four, Teddy\u2019s breathing changed: thicker, with a catch at the ' +
      'top of each breath, a small click like a key turning.',

      'At five, the humming outside stops.',

      { c: 'sep', t: '\u2042' },

      'It doesn\u2019t fade. It <em>stops</em>, fifty throats cutting off on the same beat. ' +
      'For a moment all I can hear is the shutter ticking in the cold and Teddy trying to breathe. ' +
      'The last time the world went this quiet was the Hush.',

      'Teddy lifts one hand off the blanket and closes it on nothing, the gesture a conductor uses to ' +
      'end a held note. <span class="said">"Nobody gave them the cutoff,"</span> he whispers.',

      'Wren is already up with her shoes on.'
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
      { label: 'Stay at Teddy\u2019s side. Whatever happens next, don\u2019t let it happen to him alone.',
        tone: 'kind', show: function (s) { return s.alive('teddy'); }, to: 'a1_shutter',
        act: function (s) { s.soften(8); s.trust('teddy', 20); s.scar(4); s.set('wentToTeddy'); } },
      { label: 'Get everyone into the stockroom and put the shelving across the door.',
        to: 'a1_shutter', act: function (s) { s.trust('bram', 10); s.ease(4); s.set('barricaded'); } }
    ]
  });

  S.add({
    id: 'a1_shutter',
    chapter: CH,
    place: PLACE,
    enter: function (s) { s.hurt(8); s.scar(12); s.set('breached'); },
    text: function (s) {
      var lines = ['They come through the front in the ninth second.'];
      lines.push('They don\u2019t bother with the shutter. Thirty pairs of hands take hold of the ' +
        '<em>window frame</em>, working as one machine, and tear the whole aluminum assembly out of ' +
        'forty-year-old brick. It\u2019s the loudest thing I\u2019ve heard since the world ended.' +
        (s.flag('lookedFirst') ? ' I\u2019m close enough to feel the grit hit my face.' : ''));
      lines.push('The note comes in with them, every throat starting on the same beat, and every face ' +
        'in the room turns to the corner where Teddy is breathing.');
      lines.push((s.flag('barricaded')
          ? 'The shelving we dragged across the stockroom door goes over in the first rush.'
          : 'Bram has the shelving over before I\u2019ve finished turning around.') +
        (s.flag('wentToTeddy')
          ? ' I already have Teddy under one arm; Odile takes the other.'
          : ' Odile has Teddy under the arms.') +
        ' Wren is at the fire door with both hands on the bar, looking back at me. She doesn\u2019t ' +
        'make a sound. Her face is <span class="wound">asking</span>.');
      return lines;
    },
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
      s.hurt(18); s.scar(14); s.infect(16);
      s.set('heldTheDoor');
      s.trust('bram', 20); s.trust('wren', 20); s.trust('odile', 15); s.trust('teddy', 20);
    },
    text: [
      'I brace my back against the stockroom doorframe, plant my boots, and make myself into the door.',

      'They don\u2019t hit me. Two of them take my wrists and fold my arms down to my sides, firmly, ' +
      'the way a nurse holds a child still for a shot. A third puts its fingers in the corner of my ' +
      'mouth and works my jaw open, patient, a little at a time, and all three hum the same note into ' +
      'my face, close enough that I feel it in my fillings.',

      'I wrench my right arm back. The grip on it doesn\u2019t give, and a strip of skin comes off my ' +
      'forearm in its fingers. The note goes into my open mouth and down, and for one bright second I ' +
      'want to <em>answer</em> it.',

      'Then Bram has my belt in his fist and hauls, and their hands let go of me one finger at a time. ' +
      'The fire door bangs shut, and I\u2019m on my hands and knees in the yard, being sick onto ' +
      'flattened cardboard, while the steel door bulges in its frame and holds.',

      { c: 'hum', t: 'h m m m m m m m' }
    ],
    choices: [
      { label: 'Get up. Get them to the lane.', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); } },
      { label: 'Check your arm first.', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('sawTheWound'); s.scar(6); },
        toast: ['A strip of skin two fingers wide is gone from your forearm. It bleeds more than it hurts.', 'rot'] },
      { label: 'Say nothing about what they hummed into you. Ever.', tone: 'cruel',
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
      if (s.flag('leftHimRunning')) {
        s.keep('fork', 'He got it into my hand as I let go of him. I didn\u2019t find it until we were out in the lane.');
      } else if (s.flag('ranFromIt')) {
        s.keep('fork', 'He pressed it into my hand as I pulled away. "No use to me," he said. "I already know the note."');
      } else {
        s.keep('fork', 'He pressed it into my hand at the end. "No use to me," he said. "I already know the note."');
      }
    },
    text: function (s) {
      var lines = [];
      if (s.flag('leftHimRunning')) {
        lines.push('<span class="said">"Leave him,"</span> I say, and Odile lets go when I do. Teddy slides ' +
          'down the shelving until he\u2019s sitting on the floor. I push Rosco\u2019s revolver into his ' +
          'hands, with the one round left in it, and my lighter after it.');
        lines.push('He doesn\u2019t argue. He\u2019s already looking past me, at the door.');
      } else if (s.flag('ranFromIt')) {
        lines.push('There\u2019s no time to do it properly. I push Rosco\u2019s revolver into his lap, with ' +
          'the one round left in it, and my lighter after it.');
        lines.push('He closes his hand over mine for a second and says thank you. Then he lets me go.');
      } else {
        lines.push('I leave him Rosco\u2019s revolver, with the one round left in it, my lighter, and the ' +
          'unopened bottle of water. I set them on the shelf beside him, where he can reach them without ' +
          'sitting up.');
        lines.push('<em>He says thank you.</em> He means it. He pats my hand twice, as if I\u2019m the one ' +
          'who needs steadying.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (!s.flag('foundBackDoor')) {
        lines.push('Bram knows a way out: the fire door behind the staff restroom, then over the yard wall.');
      }
      lines.push('Wren won\u2019t take my arm at the fire door. She goes through ahead of me and doesn\u2019t ' +
        'look back, and all the way down the lane she keeps a body\u2019s width between us.');
      lines.push('Nine minutes later, near the far end of the lane, I hear a single shot behind me. Then the ' +
        'humming changes direction.');
      return lines;
    },
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
      if (s.has('morphine')) {
        s.take('morphine');
        s.set('teddyMorphine');
        /* the ampoule kept "for me" is gone now; later scenes must not reuse it */
        s.set('morphineForMe', false);
      }
      s.keep('fork', 'It was in his coat pocket afterward, in the dark. Nobody saw me take it, and I haven\u2019t told anyone why.');
    },
    text: function (s) {
      var mine = s.flag('byMyHand');
      var lines = [
        'It\u2019s done in the hour before dawn, in a stockroom, by the light of a crank flashlight ' +
        'someone has turned to face the wall.'
      ];
      if (s.flag('teddyMorphine') || s.flag('odileKeepsMorphine')) {
        lines.push('There\u2019s morphine. It makes it kinder and slower. I\u2019ve written this sentence ' +
          'three times, and each time I\u2019ve changed the verbs.');
      } else {
        lines.push('Odile has an ampoule of morphine in her coat, and she doesn\u2019t use it. She says she ' +
          'does not know yet what it is for, and nobody asks her twice. So it\u2019s done with a folded ' +
          'coat and a knee, and it takes much longer than it should.');
      }
      lines.push(mine
        ? 'My hands. I insisted, I was right to insist, and I\u2019ll never be glad of it. He ' +
          'doesn\u2019t fight. At the start he even helps me, tilting his head to get the angle right, ' +
          'like a man steadying a ladder for someone else.'
        : 'Odile\u2019s hands, thirty years practiced and steady. She keeps her face still the whole ' +
          'time, and I can see in her jaw what that costs her. Afterward she washes to the elbow in ' +
          'rubbing alcohol and barely says a word.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Wren watches from the doorway. None of us notices her in time to send her away. Of ' +
        'everything we did tonight, that is the part I can\u2019t excuse.');
      lines.push('Within a minute the humming outside settles, and the crowd in the street goes slack. ' +
        'Through the slats I watch their heads come away from our window and tip back, one after another, ' +
        'until every face in the street is turned up and none of them is facing us.');
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
      { c: 'pad', t: 'i know why' },
      { c: 'pad', t: 'thats the worst part. i know why and its still the worst thing ive ever seen' },
      { c: 'pad', t: 'dont tell me it was mercy. tell me it was arithmetic. i can live next to arithmetic' }
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
      'clean, in a drugstore with no running water, with rubbing alcohol poured from a measuring cup.',
      '<span class="said">"Do not thank me,"</span> she says, without turning. <span class="said">"I have ' +
      'been thanked for this nine hundred times. It has never once been the right thing to say."</span>',
      'She pours again. Washes again.',
      '<span class="said">"Ask me instead whether I will do it again. The answer is yes. That is what I ' +
      'am now. Somebody in this group had to become it, and I had the training."</span>'
    ],
    choices: [
      { label: '"You\u2019re not only that."', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('odile', 20); s.soften(6); } },
      { label: '"Good. We\u2019ll need you to be."', tone: 'cruel', to: 'a2_lane',
        act: function (s) { s.trust('odile', 8); s.harden(12); s.set('madeHerTheKnife'); } },
      { label: '"Next time it\u2019s my hands."', to: 'a2_lane',
        act: function (s) { s.set('learnedTheHands'); s.trust('odile', 14); s.scar(8); s.harden(6); } },
      { label: 'Gently take the cup from her and stop her washing.', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('odile', 24); s.soften(8); s.ease(4); } }
    ]
  });

  S.add({
    id: 'a1_depart',
    chapter: CH,
    place: 'The service lane',
    enter: function (s) { s.set('tookTeddy'); s.set('route', 'together'); },
    text: function (s) {
      var lines = [];
      if (s.flag('breached')) {
        lines.push('There\u2019s no time to be careful with him. Behind us the fire door shudders every ' +
                  'time they lean their weight into it. Odile goes up the yard wall first and hauls Teddy by his coat while Bram ' +
          'shoves from below. He scrapes over the top and drops, and none of us stops to ask what it cost him.');
        lines.push((s.flag('wrenFirst')
            ? 'Wren is already over; I put her there before anything else.'
            : 'Wren is over before any of us.') +
          (s.flag('heldTheDoor')
            ? ' I go last, one-handed, with my arm bleeding into my sleeve.'
            : ' I go last.'));
      } else if (s.flag('ranFromIt')) {
        lines.push('Nobody waits to be ready. Odile goes up the yard wall first and reaches down for Teddy, ' +
          'Bram shoves him up from below, and he comes over in one bad, scraping minute, biting down on ' +
          'every sound it costs him.');
        lines.push('Wren is over before I am. Behind us, the drugstore stays silent.');
      } else {
        if (!s.flag('foundBackDoor')) {
          lines.push('Bram knows the way out. He\u2019s been through the fire door behind the staff restroom ' +
            'before: across the yard, then over the wall.');
        }
        lines.push('Getting Teddy over the yard wall takes four minutes and costs everyone something. Odile ' +
          'goes first and takes his weight from above. Bram makes a step of his hands and says nothing ' +
          'about any of it, which is the most generous thing I\u2019ve seen him do.');
        lines.push('Wren comes over last, after me. Even scrambling down a brick wall in the dark, she ' +
          'doesn\u2019t make a sound.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('The lane is empty and cold and smells of old grease from the fryer vents of the chicken ' +
        'place. At the far end, white across the opening, ' +
        (s.flag('scoutedLane') || s.flag('planLane')
          ? 'the refrigerated truck waits with its doors shut.'
          : 'a refrigerated truck waits with its doors shut.'));
      lines.push('Teddy walks between Odile and me with an arm over each of our shoulders. He weighs almost ' +
        'nothing. Six weeks of rationing have made a seventy-one-year-old man into something I could ' +
        'carry with one arm.');
      lines.push('He\u2019s trying very hard not to breathe loudly. I can feel him trying, through my shoulder, ' +
        'at every step.');
      return lines;
    },
    choices: [
      { label: 'Head for the truck.', to: 'a2_lane' },
      { label: 'Tell him to stop trying. Breathe. Let it be loud.', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.soften(8); s.trust('teddy', 20); s.trust('wren', 10); s.set('letHimBreathe'); },
        toast: ['He sobs once, with relief, and stops holding his breath.', 'good'] },
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
