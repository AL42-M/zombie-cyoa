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
      'Day 41. I have been marking the days on the stockroom wall. This is the first one I have put ' +
      'on paper. If somebody finds these pages, the beginning was nine seconds long: every radio ' +
      'stopped mid-sentence. People went into the street to look at the sky. Then came the humming. ' +
      'It has not stopped.',

      'I am awake because Teddy is drowning again. Three feet away, in the dark of the stockroom, ' +
      'he pulls air through the fluid in his throat. He is seventy-one and has one working lung. ' +
      'He used to conduct a choir. Even now, every breath of his carries.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Through the grate over the front window, the sound outside answers him. Not words. Not quite voices. ' +
      'A crowd of throats holding the same low note. When Teddy breathes they ' +
      'lean toward the glass.'
    ],
    choices: [
      { label: 'Go to Teddy.', hint: 'he is awake and he knows', tone: 'kind', to: 'a1_teddy' },
      { label: 'Check the front windows.', hint: 'count them', to: 'a1_window' },
      { label: 'Wake Odile.', hint: 'the only steady hands left', to: 'a1_odile' },
      { label: 'Search the dispensary.', hint: 'forty-one days and you still have not finished', to: 'a1_dispensary' },
      { label: 'Sit with Wren.', hint: "she has not slept either", tone: 'kind', to: 'a1_wren' },
      { label: 'Call everyone together. The street is already listening.', to: 'a1_hub' },
      { label: 'Crank the radio. Find out whether anyone else is still awake.', to: 'a1_radio' }
    ]
  });

  S.add({
    id: 'a1_hub',
    chapter: CH,
    place: PLACE,
    text: [
      'The stockroom smells of cardboard and the rubbing alcohol I spilled on the floor last week. ' +
      'Someone has stacked incontinence pads into a mattress. I wrote DAY 41 on the wall ' +
      'in grease pencil, under DAY 40, under thirty-nine others.',
      'I wake the others. Bram brings the wind-up torch; Wren brings her pad. Teddy breathes. ' +
      'The street breathes back. I have nothing prepared to say.'
    ],
    choices: [
      { label: 'Let Teddy speak before anyone votes.', tone: 'kind', to: 'a1_teddy_votes' },
      { label: 'Tell them you will carry him out tonight.', to: 'a1_depart',
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
      'He is sitting up against the shelving because lying down fills him faster. In the dark his face ' +
      'is a pale smudge with wet eyes. He lifts one hand and turns it over, an old conductor asking for ' +
      'a quieter passage.',

      '<span class="said">"I can hear me," he says. "That is the trouble. If I can hear me."</span>',

      'He does not finish it. He does not have to. Everyone in this room has done the arithmetic and ' +
      'everyone has pretended the sum came out differently.',

      '<span class="said">"Forty years I taught children to breathe from here."</span> He taps his belly, ' +
      'and the tap turns into a cough he fights down with both hands over his mouth, and the street ' +
      'outside shifts like a field under wind.'
    ],
    choices: [
      { label: 'Tell him he is coming with you. Whatever it costs.', tone: 'kind',
        hint: 'a promise you may not own', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.soften(5); s.trust('teddy', 20); s.scar(4); },
        toast: ['You promised.', 'good'] },
      { label: 'Ask him what he wants.', hint: 'and be ready to hear it', to: 'a1_teddy_wants' },
      { label: 'Say nothing. Hold his hand until the fit passes.', tone: 'kind',
        to: 'a1_hub', act: function (s) { s.soften(3); s.trust('teddy', 10); },
        toast: ['He stops shaking, eventually.', 'good'] },
      { label: 'Tell him the truth: he is going to get everyone killed.', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.harden(9); s.scar(6); s.trust('teddy', -25); s.set('toldTeddyTruth'); },
        toast: ['He nods. That is the worst part.', 'bad'] }
    ]
  });

  S.add({
    id: 'a1_teddy_wants',
    chapter: CH,
    place: PLACE,
    text: [
      'He takes a long time. Long enough that I hear Wren turn over in the dark, listening.',

      '<span class="said">"I want to not be the reason," he says. "That is all I have left to want. ' +
      'I was a reason for good things once. Four hundred children. I would like my last one to not be ' +
      'the other kind."</span>',

      'He finds my hand without looking and puts something in it. Cold, small, hospital-steel cold. ' +
      'A badge with the photograph scraped clean off.',

      { c: 'note', t: 'ST AMARANTH MERCY — WARD STAFF' },

      '<span class="said">"My niece worked there. She said they were still taking people in, three weeks ago. ' +
      'She said they had something."</span> A wet laugh. <span class="said">"She also said do not go. ' +
      'Both of those were in the same letter."</span>'
    ],
    choices: [
      { label: 'Take the badge. Promise him you will all go together.', tone: 'kind',
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
      '<span class="said">"A treatment." </span>He says the word the way I say a word in a language ' +
      'I do not speak. <span class="said">"She wrote that it works. She wrote it twice, which is how ' +
      'I know she was frightened of it."</span>',

      'He presses the badge into my palm and closes my fingers over it with both of his hands, ' +
      'the way I would close a wound.',

      '<span class="said">"Whatever it is, child, it comes out of somebody. Everything does now."</span>'
    ],
    choices: [
      { label: 'Take it. You will all go together.', tone: 'kind', to: 'a1_hub',
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
      'Odile is not asleep. I have never caught her asleep, though I have heard her snore through ' +
      'the stockroom wall. She opens her eyes before I reach her.',

      '<span class="said">"He has got maybe four days," she says, before you ask. "Fluid. I can hear it ' +
      'shifting when he turns. I put down a collie last spring that sounded kinder than that."</span>',

      'She spent thirty years operating on animals. She gives a prognosis without dressing it up.',

      '<span class="said">"I have one ampoule of morphine in my coat. One. Ask me what it is for and ' +
      'I will tell you I do not know yet."</span>'
    ],
    choices: [
      { label: 'Ask her to keep Teddy comfortable. Nothing more.', tone: 'kind',
        to: 'a1_hub', act: function (s) { s.trust('odile', 12); s.soften(3); } },
      { label: 'Ask her for the morphine.', tone: 'risk', to: 'a1_odile_morphine' },
      { label: 'Ask what she would do if he were an animal.', to: 'a1_odile_animal' },
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
      'She looks at me for a while. It is not a judgement. It is worse than that — it is an assessment, ' +
      'the same one she has given to nine hundred frightened animals, and it ends the same way: a decision ' +
      'made somewhere I cannot see.',

      'She takes the ampoule out of her coat and holds it up between two fingers. In the dark it is just ' +
      'a small glass absence.',

      '<span class="said">"You understand this is not mercy until the moment it is," she says. ' +
      '"Before that moment it is only a poison you are carrying around with Teddy\u2019s name on it."</span>'
    ],
    choices: [
      { label: 'Take it anyway.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.give('morphine'); s.harden(8); s.scar(5); s.trust('odile', -8); } },
      { label: 'Leave it with her. She will know when.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('odile', 15); s.soften(4); s.set('odileKeepsMorphine'); } },
      { label: 'Tell her it is for you, if it comes to that.', to: 'a1_hub',
        act: function (s) { s.give('morphine'); s.set('morphineForMe'); s.scar(9); s.trust('odile', 6); } }
    ]
  });

  S.add({
    id: 'a1_odile_animal',
    chapter: CH,
    place: PLACE,
    text: [
      '<span class="said">"If he were an animal," she says, "I would have done it on day thirty-six, ' +
      'and I would have cried in the car, and I would have slept."</span>',

      'She wipes her palms down her thighs. Twice. I have noticed she does this when she is deciding ' +
      'something she will not announce.',

      '<span class="said">"He is not an animal. So instead I lie here every night listening to a man ' +
      'I like drown an inch at a time, and I call that respecting him."</span>',

      { c: 'whisper', t: 'She does not say: and I resent him for it. But it is in the room with me.' }
    ],
    choices: [
      { label: 'Tell her she is a good person.', tone: 'kind', to: 'a1_hub',
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
      'The dispensary was cleaned out in the first week by people who knew what they were looking for, ' +
      'and then picked over for a month by people who did not. What is left is the sediment: ' +
      'hair-removal cream, three hundred pregnancy tests, a wall of reading glasses.',

      'Behind the counter, in a drawer somebody had already pulled out and dropped, I find a boning knife ' +
      'wrapped in a tea towel, a bottle of grain alcohol with a hand-written label, and most of a roll of duct tape.',

      'There is also a chemist\u2019s coat on a hook with a name badge reading ROSCO — SINCE 1974, and ' +
      'inside the coat, still in the pocket, a shopping list. <em>Milk. Bin bags. Ring Mum.</em>',

      { c: 'sep', t: '\u2042' },

      'I stand holding a dead man\u2019s shopping list in a dark room while the street hums, and ' +
      'for a moment the whole size of it tries to get into me at once.'
    ],
    choices: [
      { label: 'Pocket the list.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('keptTheList'); s.soften(5); s.scar(4); },
        toast: ['You will carry it the whole way.', 'good'] },
      { label: 'Put it back exactly where it was.', to: 'a1_hub',
        act: function (s) { s.scar(3); } },
      { label: 'Burn it. You cannot carry everyone\u2019s mother.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(7); s.ease(3); } },
      { label: 'Drink some of the alcohol.', tone: 'risk', to: 'a1_hub',
        act: function (s) { s.ease(8); s.hurt(4); s.take('flask'); s.set('drankIt'); },
        toast: ['It burns the edges off. It burns other things too.', 'weight'] }
    ]
  });

  S.add({
    id: 'a1_wren',
    chapter: CH,
    place: PLACE,
    text: [
      'Wren is fourteen and has not made a sound since the third day. Not a scream, not a word, not a ' +
      'cough — which in this room makes her the most valuable person alive, and everyone knows it, ' +
      'and nobody has been cruel enough to say it except Bram, once, out loud, on day twenty.',

      'She is awake. She passes me the pharmacy pad without being asked, the stub of pencil ' +
      'already threaded through the wire.',

      { c: 'whisper', t: 'you were going to ask me if im ok' },

      { c: 'whisper', t: 'everyone asks me that when theyve already decided something' }
    ],
    choices: [
      { label: 'Write back: "We have not decided anything."', to: 'a1_wren_lie',
        act: function (s) { s.set('liedToWren'); } },
      { label: 'Write back: "They want to leave Teddy."', tone: 'risk', to: 'a1_wren_truth',
        act: function (s) { s.set('toldWrenTruth'); s.soften(4); } },
      { label: 'Ask her what she wants.', tone: 'kind', to: 'a1_wren_wants' },
      { label: 'Hand the pad back and sit with her in silence.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.trust('wren', 12); s.soften(3); s.ease(4); },
        toast: ['It is the first hour of rest either of you has had.', 'good'] }
    ]
  });

  S.add({
    id: 'a1_wren_lie',
    chapter: CH,
    place: PLACE,
    text: [
      'She reads it. She looks at me for three full seconds, which from Wren is a speech.',
      'She takes the pad back and writes without hurrying, and turns it round.',
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
      'She does not look surprised. That is the thing about Wren that I have stopped being able to ' +
      'look at directly — nothing surprises her any more, and she is fourteen.',
      { c: 'whisper', t: 'bram said it on day 20' },
      { c: 'whisper', t: 'hes been saying it quieter since' },
      { c: 'whisper', t: 'if you leave teddy ill still come with you' },
      { c: 'whisper', t: 'i just wont be able to look at you' }
    ],
    choices: [
      { label: 'Swear to her that Teddy comes too.', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('sworeToWren'); s.trust('wren', 22); s.soften(6); } },
      { label: 'Tell her you do not know yet.', to: 'a1_hub',
        act: function (s) { s.trust('wren', 4); } },
      { label: 'Tell her that is a child\u2019s way to think.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(10); s.trust('wren', -20); s.scar(5); } },
      { label: 'Ask her what she wants.', to: 'a1_wren_wants' }
    ]
  });

  S.add({
    id: 'a1_wren_wants',
    chapter: CH,
    place: PLACE,
    text: [
      'The pencil hovers a long time.',
      { c: 'whisper', t: 'i want to go somewhere with a door that locks from the inside' },
      { c: 'whisper', t: 'and i want to be the one who locks it' },
      'She underlines <em>i</em> twice, hard enough to tear the paper, and then looks embarrassed ' +
      'about the tearing, and smooths it flat with her thumb.'
    ],
    choices: [
      { label: 'Promise her that door.', tone: 'kind', to: 'a1_hub',
        act: function (s) {
          s.set('promisedTheDoor'); s.trust('wren', 20); s.soften(6); s.scar(3);
          s.keep('padpage', 'She tore it off and gave it to me so that it would exist somewhere outside her own head.');
        },
        toast: ['She tears the page off and folds it into your hand.', 'keepsake'] },
      { label: 'Tell her there is no such place left.', tone: 'cruel', to: 'a1_hub',
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
        'The grate is a security shutter that Rosco pulled down forty-one days ago and never pulled up. ' +
        'Through the slats, Ferry Street is silver with moonlight and full of people standing still.'
      ];
      if (n <= 1) {
        lines.push('I count. I always count. Thirty-one in the stretch between the betting shop and ' +
          'the bus stop, which is six more than this morning. They are not milling. They are oriented — ' +
          'every head tilted a few degrees toward this window, the way sunflowers do a thing they cannot explain.');
      } else if (n === 2) {
        lines.push('Forty now. The new ones have come from the river end. One of them is wearing a ' +
          'high-visibility jacket that still has the reflective strip, and every time the moon moves ' +
          'it lights up like a small bad idea.');
      } else {
        lines.push('I stop counting at fifty-some. They have begun to overlap at the shoulders. ' +
          'When Teddy breathes, the whole street breathes in a half-second later, like an orchestra ' +
          'with a bad conductor.');
      }
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      lines.push('None of them are looking at me. That is the part the films got wrong. ' +
        'They do not look. They <em>listen</em>, with their whole ruined bodies, and a body that has ' +
        'stopped needing eyes will let its eyes go.');
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
      'An hour goes by. I learn three things, and I write them on the inside of my own skull ' +
      'because paper can be taken off I.',

      { c: 'note', t: 'ONE. They do not hunt. They converge. A sound is a drain and they are water.' },
      { c: 'note', t: 'TWO. A continuous sound pulls harder than a loud one. A scream turns heads. ' +
        'A man coughing all night turns a street.' },
      { c: 'note', t: 'THREE. When they hum together they stop moving. Whatever that is for, it is not for us.' },

      'The last one is the one I keep coming back to. Fifty bodies, perfectly still, all producing the ' +
      'same note — and in the middle of it, a kind of terrible patience, as though they are not waiting ' +
      'for me but for a date already in the diary.'
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
      'I put one knuckle against the glass and knock. Once. Not loud. The kind of knock I would ' +
      'use on a bathroom door in someone else\u2019s house.',

      'Thirty-one heads come round at the same instant, and the sound they make is not a roar. ' +
      'It is an inhale — fifty people at the top of a breath — and then the nearest one is already at ' +
      'the shutter, and it is <span class="wound">fast</span>, and its face comes through the slats as ' +
      'far as its cheekbones will allow and stops there, straining, mouth working, eyes gone milk-white ' +
      'and pointing in two different directions.',

      'I am close enough to smell it. Wet copper and sugar, like a butcher\u2019s bin in July.',

      'Behind I, Bram says a word I have not heard him use. Teddy has both hands over his own mouth.'
    ],
    choices: [
      { label: 'Back away slowly. Do not add a second sound.', to: 'a1_hub',
        act: function (s) { s.scar(10); s.set('studiedThem'); s.set('tappedTheGlass'); },
        toast: ['It holds the note for forty minutes before it lets go.', 'bad'] },
      { label: function (s) {
          return s.has('knife') ? 'Drive the knife through the slats into its eye.'
            : 'Tear a shelf bracket loose and drive it through the slats into its eye.';
        }, tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.harden(10); s.scar(8); s.hurt(3); s.set('tappedTheGlass'); s.set('firstKill'); },
        toast: ['It is the first one you do up close. It is not the last.', 'bad'] },
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
      'I do not decide to. my chest decides, the way it decides to yawn.',

      'The note comes up out of me low and even, and the thing at the shutter stops straining. ' +
      'Its jaw slackens. Its head tips — and then, in the street, the others tip too, one after another, ' +
      'a field of wheat going over in sequence.',

      { c: 'hum', t: 'h m m m m m m m' },

      'For nine seconds I am part of something enormous and calm and I understand, with my whole ' +
      'body and without a single word, that <em>it is not an infection, it is a recruitment</em>, and that ' +
      'it has been very patient with me.',

      'Then Odile has me by the collar and drags me down behind the counter and the spell comes off ' +
      'like a wet coat. There is <span class="wound">blood in my mouth</span>. I have been humming ' +
      'hard enough to tear something.'
    ],
    choices: [
      { label: 'Tell them exactly what happened.', to: 'a1_hub',
        act: function (s) { s.set('toldThemAboutHum'); s.trust('odile', -6); s.trust('bram', -14); s.scar(8); },
        toast: ['Bram does not sleep facing away from you again.', 'bad'] },
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
      'Past the staff toilet there is a fire door that opens onto a yard full of flattened boxes, ' +
      'and beyond the yard, a wall, and beyond the wall, the service lane that runs the length of ' +
      'Ferry Street behind the shops.',

      'The door has a push bar. Push bars are loud. Someone — Rosco, probably, in his last useful hour — ' +
      'has packed the mechanism with a folded tea towel and taped it in place.',

      'There is a bicycle in the yard with no front wheel, and chained to the bicycle, ' +
      'a pair of three-foot bolt cutters that somebody brought here to solve a problem and then ' +
      'never got to use.'
    ],
    choices: [
      { label: 'Take the bolt cutters.', to: 'a1_hub',
        act: function (s) { s.give('cutters'); },
        toast: ['Heavy to carry. Heavier to leave.', 'item'] },
      { label: 'Test the door. Quietly.', tone: 'risk', to: 'a1_backdoor_test' },
      { label: 'Leave it all. Tell no one this door exists.', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('secretDoor'); s.harden(9); },
        toast: ['A way out that only holds one person is not a way out. It is a plan.', 'bad'] },
      { label: 'Go back inside.', to: 'a1_hub' }
    ]
  });

  S.add({
    id: 'a1_backdoor_test',
    chapter: CH,
    place: PLACE,
    text: [
      'I lean on the bar a half-inch at a time. The tea towel does its work. The latch comes off its ' +
      'keeper with a sound like a knuckle cracking in another room.',

      'The lane is empty. Forty-one days and the lane is <em>empty</em> — because there is nothing in ' +
      'it that makes a noise, and so nothing has come to listen.',

      'At the far end, where the lane meets Quay Road, something large and white is parked across the ' +
      'opening. A refrigerated lorry. The compressor is dead, the doors are shut, and painted along ' +
      'the side in what was once a cheerful font: <em>FRESH DAILY</em>.'
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
          'The crank radio takes ninety turns to give me ninety seconds. I have done this every night ' +
          'for thirty-eight nights and I will do it tonight.',
          'Static. Static. Static. And then, at 1476 kHz, where there has never been anything, ' +
          'the thing that is always there now:',
          { c: 'hum', t: 'h m m m m m m m' },
          'The same note. Broadcast. Which means something out there is not just making this sound ' +
          'but <em>transmitting</em> it, on a frequency, with power, in a world where nothing has had ' +
          'power for six weeks.'
        ];
      }
      if (n === 2) {
        return [
          'Ninety turns. Ninety seconds.',
          'Tonight the hum has something underneath it. A rhythm, very faint, that I would call ' +
          'a metronome if I was feeling generous and a pulse if I was not.',
          { c: 'hum', t: 'h m m \u00b7 h m m \u00b7 h m m' },
          'Odile comes and stands behind me without a word and listens to the whole ninety seconds, ' +
          'and then goes back to her corner and lies down facing the wall.'
        ];
      }
      return [
        'Ninety turns. Ninety seconds.',
        'The rhythm is faster than it was. Not much. The way a held breath is faster at the end.',
        { c: 'hum', t: 'hm \u00b7 hm \u00b7 hm \u00b7 hm' },
        'I turn it off before the ninety seconds are up, which I have never done before, ' +
        'and I sit in the dark with my hand still on the crank.'
      ];
    },
    choices: [
      { label: 'Wind it once more. Bram hears you and comes over.', to: 'a1_bram' },
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
      'Bram Kessler spent eleven years as a corrections officer, which he will tell me meant ' +
      'keeping people safe, and which Wren will tell me meant deciding who got to eat.',

      'He is awake, sitting with his back to the shelves and the shutter in his sightline, ' +
      'the way he has sat every night. He does not look at me when he speaks.',

      '<span class="said">"It is a dinner bell," he says. "That is what it is. We are all standing ' +
      'inside a dinner bell waiting for it to stop ringing."</span>',

      'He turns his head finally. In the dark his face is reasonable, and tired, and that is what ' +
      'makes it frightening — nothing he is about to say will sound mad.',

      '<span class="said">"Four days. Odile says four days. That is four nights of him calling them ' +
      'in, and then he is gone anyway, and then we are three people in a shop with fifty of them ' +
      'at the glass. Tell me the version of that where waiting is the kind option."</span>'
    ],
    choices: [
      { label: '"We carry him. All of us. That is the version."', tone: 'kind', to: 'a1_bram_carry' },
      { label: '"Then we go tonight. All five of us, out the back."', to: 'a1_bram_tonight',
        show: function (s) { return s.flag('foundBackDoor'); } },
      { label: '"You want to kill him. Say it in those words."', tone: 'risk', to: 'a1_bram_sayit' },
      { label: '"You are right."', tone: 'cruel', to: 'a1_bram_agree' },
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
      'He rubs his face with both hands, hard, and when he takes them away he has arranged it ' +
      'into something more patient, and that is worse.',
      '<span class="said">"I am not a monster. I want you to hear that before I say the next part. ' +
      'I have a daughter in Thornbury, if Thornbury is still a word, and every night I do not leave ' +
      'this shop is a night I am choosing a man I met six weeks ago over her. I have done that forty ' +
      'times. I am asking you to notice that I have done it forty times."</span>'
    ],
    choices: [
      { label: '"I notice. And we still carry him."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.trust('bram', 6); s.soften(6); } },
      { label: '"Go to Thornbury, then. Alone. Tonight."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.trust('bram', -30); s.harden(8); s.set('toldBramToGo'); } },
      { label: '"Give me until morning."', to: 'a1_hub',
        act: function (s) { s.set('untilMorning'); s.trust('bram', 8); } },
      { label: 'Ask about the daughter.', tone: 'kind', to: 'a1_bram_daughter' }
    ]
  });

  S.add({
    id: 'a1_bram_daughter',
    chapter: CH,
    place: PLACE,
    text: [
      'He does not have a photograph. He tells me about her instead, in a flat inventory of facts, ' +
      'the way a man recites something to keep it from going soft at the edges.',
      '<span class="said">"Nine. Asthmatic. Frightened of the hoover. Her mother and I are not — ' +
      'were not — </span> he stops, repairs it, carries on. <span class="said">"She will be at her ' +
      'grandmother\u2019s. Her grandmother has a cellar and a shotgun and no imagination whatsoever, ' +
      'which right now I consider the finest combination of qualities in England."</span>',
      'He looks at the shutter.',
      '<span class="said">"Asthmatic," he says again. "She would sound like him."</span>',
      { c: 'whisper', t: 'And there it is. The real arithmetic, laid out on the floor between you.' }
    ],
    choices: [
      { label: '"Then you know exactly why we carry Teddy."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.trust('bram', 20); s.soften(8); },
        toast: ['Something goes out of him. Not agreement. Permission.', 'good'] },
      { label: '"Then you know exactly why he cannot come."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('agreedWithBram'); s.trust('bram', 22); s.harden(12); s.scar(6); } },
      { label: 'Say nothing. Let him sit with it.', to: 'a1_hub',
        act: function (s) { s.trust('bram', 6); s.scar(4); } },
      { label: 'Ask him to say it all again, slowly, and write it down.', tone: 'kind', to: 'a1_hub',
        hint: 'so that it is not only in one man\u2019s head',
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
      'For the first time in six weeks, Bram looks at me with something other than management.',
      '<span class="said">"Out the back. The lane."</span> He is already standing. ' +
      '<span class="said">"How far does it run?"</span>',
      'I tell him: the length of Ferry Street, to Quay Road, where a refrigerated lorry sits across ' +
      'the opening like a cork in a bottle.',
      '<span class="said">"A cork can be climbed,"</span> he says, and then, carefully, ' +
      'not looking at the corner where Teddy is: <span class="said">"Can he climb?"</span>'
    ],
    choices: [
      { label: '"Then we find a route he can manage."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('planLane'); s.trust('bram', 10); s.soften(5); } },
      { label: '"No. But we are not leaving him."', tone: 'kind', to: 'a1_hub',
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
      'He says it in those words. He does not flinch and he does not enjoy it.',
      '<span class="said">"I want to kill Teddy Alafuzo. Tonight, while he is asleep, with a pillow, ' +
      'because a pillow is quiet. I want Odile to do it because she knows how and because it would ' +
      'take her eleven seconds, and I want it to be a thing we all agreed to so that none of us can ' +
      'use it against the others later."</span>',
      'A pause exactly long enough to be deliberate.',
      '<span class="said">"And then I want to walk to Thornbury and hold my daughter and never think ' +
      'about this shop again, and I will not get that last part, and I know it, and I want it anyway."</span>'
    ],
    choices: [
      { label: '"No. And if you touch him I will stop you."', tone: 'kind', to: 'a1_hub',
        act: function (s) { s.set('promisedTeddy'); s.set('defiedBram'); s.trust('bram', -20); s.soften(8); } },
      { label: '"Teddy gets to decide. Not you, not me."', to: 'a1_hub',
        act: function (s) { s.set('teddyDecides'); s.trust('bram', -6); s.trust('teddy', 15); s.soften(5); } },
      { label: '"Then it is all of us, and it is Odile, and it is tonight."', tone: 'cruel',
        to: 'a1_hub', act: function (s) { s.set('agreedWithBram'); s.trust('bram', 25); s.harden(15); s.scar(10); } },
      { label: '"I will do it. Not Odile. Me."', tone: 'cruel', to: 'a1_hub',
        act: function (s) { s.set('claimedTheKilling'); s.trust('bram', 12); s.harden(18); s.scar(14); } }
    ]
  });

  S.add({
    id: 'a1_bram_agree',
    chapter: CH,
    place: PLACE,
    text: [
      'Two words and the room changes temperature.',
      'He does not look triumphant. He looks like a man who has been holding a door shut and has ' +
      'just felt it stop pushing from the other side, and is now realising he must walk through it.',
      '<span class="said">"Right," he says. "Right."</span>',
      'In the corner, Teddy coughs. Neither of us turns round. That is the first thing I do ' +
      'together as accomplices: not turning round.'
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
        'Bram pulls the wind-up torch from his coat and points it at the floor. He has found the ' +
        'service door behind the staff toilet: a yard, a wall, an empty lane. Now there is a way out, ' +
        'and no excuse to postpone choosing who goes through it.',
        'I bring them together in that narrow pool of light. Four faces. One of them is already ' +
        'crying, and it is not the one I would have guessed.'
      ];
      if (s.flag('agreedWithBram') || s.flag('claimedTheKilling')) {
        lines.push('Bram does the talking, because I have already told him he could. He is brief, ' +
          'and reasonable, and he uses the word <em>we</em> eleven times, and every single one of them ' +
          'is a small thin hook going into me.');
      } else if (s.flag('promisedTeddy')) {
        lines.push('I do the talking. I say the word <em>together</em> and I watch Bram\u2019s ' +
          'jaw set, and I keep going anyway.');
      } else {
        lines.push('Nobody wants to be the one who starts. The silence goes on so long that ' +
          'Teddy himself ends it, which is a cruelty none of us intended and all of us allowed.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"I would like to say something," </span> Teddy says, ' +
        '<span class="said">"while it is still a conversation and not a vote."</span>');
      lines.push('He has to stop twice to get through it.');
      lines.push('<span class="said">"I am not frightened of dying. I am frightened of being the ' +
        'reason. Those are different sizes of thing and only one of them is yours to fix."</span>');
      return lines;
    },
    choices: [
      { label: 'All five of you go, tonight, out the back. He is carried if he needs carrying.',
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
      'I put it to him. All of it, in order, without softening the parts that cannot be softened.',

      'He listens like a man being read a weather forecast for a country he is about to leave. ' +
      'When I finish he is quiet for a long moment, and then he does something nobody expects: ' +
      'he smiles, and it is a real one.',

      '<span class="said">"Thank you," he says. "That is the first time in forty-one days anybody ' +
      'has asked me a question that had my name in it."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"Here is what I want. I want to come with you as far as my body manages, ' +
      'and when it stops managing, I want to be the one who says so, and I want one of you to not ' +
      'argue with me on that night. That is all. That is the whole will and testament."</span>'
    ],
    choices: [
      { label: 'Agree. All of it. Shake his hand on it.', tone: 'kind', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('theCompact'); s.soften(12); s.trust('teddy', 30); s.trust('wren', 20); s.trust('odile', 10); } },
      { label: 'Agree out loud. Decide privately that you will argue.', to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('secretlyWillArgue'); s.soften(4); s.scar(6); } },
      { label: '"No. You come, and you keep coming, and that is not up for discussion."',
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
      'I say: morning. Everyone agrees with the enormous relief of people who have been given ' +
      'permission to not be the one.',

      'Nobody sleeps. At four, Teddy\u2019s breathing changes — thicker, and with a catch at the ' +
      'top of each one, a tiny click like a key turning.',

      'At five, the humming outside stops.',

      { c: 'sep', t: '\u2042' },

      'It does not fade. It <em>stops</em>, all of it, all at once, fifty throats closing on the same ' +
      'beat, and the silence that comes down is the exact shape and weight of the Hush itself, ' +
      'and every person in this room has heard that silence before.',

      'Wren is already up with her shoes on. She was always the fastest to understand.'
    ],
    choices: [
      { label: 'Out the back. Now. Everyone. Carry him.', tone: 'kind',
        show: function (s) { return s.flag('foundBackDoor'); },
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.set('ranFromIt'); s.soften(8); s.scar(8); } },
      { label: 'Out the back. Now. Leave him. There is no time.', tone: 'cruel',
        show: function (s) { return s.flag('foundBackDoor'); },
        to: 'a1_leave_teddy',
        act: function (s) { s.set('route', 'left'); s.set('ranFromIt'); s.harden(14); s.scar(12); } },
      { label: 'Hold the shutter. Whatever is coming, meet it here.', tone: 'risk',
        to: 'a1_shutter' },
      { label: 'Go to the window and look.', tone: 'risk', to: 'a1_shutter',
        act: function (s) { s.set('lookedFirst'); s.scar(5); } },
      { label: 'Go to Teddy. Whatever happens next, do not let it happen to him alone.',
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

      'Not through the shutter — through the <em>window frame</em>, the whole aluminium assembly ' +
      'pulled out of forty-year-old brick by thirty pairs of hands acting as one machine, and the ' +
      'noise of it is the loudest thing I have heard since the world ended.',

      'Bram has the shelving over before I have finished turning round. Odile has Teddy under the ' +
      'arms. Wren is at the fire door with both hands on the bar, and she is looking back at me, ' +
      'and she is not making a sound, and her face is <span class="wound">asking</span>.'
    ],
    choices: [
      { label: 'Get Teddy. Both of you. Go.', tone: 'kind',
        to: 'a1_depart',
        act: function (s) { s.set('route', 'together'); s.set('tookTeddy'); s.hurt(10); s.soften(10); s.scar(10); } },
      { label: 'Go. Just go. He is already behind you.', tone: 'cruel',
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
      'I put my back against the stockroom frame and my boots against the floor and I make ' +
      'myself the cork.',

      'Hands. That is what it is, up close — not teeth, not first. <span class="wound">Hands</span>, ' +
      'dozens of them, pulling at my coat and my hair and my jaw, every one of them trying to ' +
      'get I turned round and quiet and part of it. Something takes a strip off my forearm. ' +
      'Something presses its open mouth against my ear and <em>hums</em>, directly into my skull, ' +
      'and for one bright second I want to let go.',

      'Then Bram has my belt in his fist and hauls, and the fire door bangs, and I am in the yard ' +
      'on my hands and knees being sick into flattened cardboard while five feet of steel-reinforced ' +
      'fire door bows inward and holds.',

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
      s.keep('fork', 'He pressed it into my hand at the end and said: it is no use to me, I already know the note.');
    },
    text: [
      'I leave him the revolver with its one chamber that matters, and the lighter, and the ' +
      'unopened bottle of water, and I arrange these things on a shelf beside him like an offering ' +
      'at a shrine I do not believe in.',

      'He says thank you. That is the detail that will not come out of me afterwards, not with ' +
      'drink, not with time, not with anything. <em>He says thank you,</em> and he means it, ' +
      'and he pats my hand twice.',

      { c: 'sep', t: '\u2042' },

      'Wren will not take my arm at the fire door. She goes through ahead of me and does not look ' +
      'back and does not look at me, and from that moment there is a distance between the two of us ' +
      'exactly the width of an old man in a dark room.',

      'Nine minutes later, four streets away, I hear a single shot behind me, and then the humming ' +
      'changes direction.'
    ],
    choices: [
      { label: 'Keep walking. Do not let anyone stop.', tone: 'cruel', to: 'a2_lane',
        act: function (s) { s.harden(8); } },
      { label: 'Stop. Let everyone hear it properly. It is owed.', to: 'a2_lane',
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
      s.keep('fork', 'It was in his coat pocket, in the dark, afterwards. Nobody saw me take it and I have never explained it.');
    },
    text: function (s) {
      var mine = s.flag('byMyHand');
      var lines = [
        'It is done in the hour before dawn, in a stockroom, by the light of a wind-up torch ' +
        'that somebody has turned to face the wall.'
      ];
      if (s.has('morphine') || s.flag('morphineForMe') || s.flag('odileKeepsMorphine')) {
        lines.push('There is morphine, which makes it kinder, which makes it longer, which makes it ' +
          'something I will have to describe to myself for the rest of my life in a sentence ' +
          'that keeps changing its verbs.');
      } else {
        lines.push('There is no morphine left for it, which means it is done with a folded coat and ' +
          'a knee, and it takes much, much longer than eleven seconds.');
      }
      lines.push(mine
        ? 'My hands. I insisted on that and I was right to insist and I will never be ' +
          'glad of it. He does not fight. That is the part that comes back — <em>he helps me</em>, ' +
          'at the start, getting the angle right, the way a man holds a ladder steady for someone else.'
        : 'Odile\u2019s hands, thirty years practised, perfectly steady, and her face the whole time ' +
          'is doing something that is not calm but is wearing calm\u2019s clothes. Afterwards she ' +
          'washes to the elbow in grain alcohol and does not speak for nine hours.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Wren watches from the doorway. Nobody notices in time. Nobody thinks to send her away ' +
        'because nobody in this room is thinking about anything except the one thing, and that failure — ' +
        'that small ordinary failure of attention — is the one I will be answering for.');
      lines.push('Outside, within a minute, the humming eases. The street relaxes. ' +
        'The arithmetic was correct, and that is the obscenity of it: <em>the arithmetic was correct.</em>');
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
      'She is in the yard, under the wall, with her back against the brick and the pad on her knees. ' +
      'She does not look up. She writes, and tears the page off, and holds it out sideways without ' +
      'turning her head.',
      { c: 'whisper', t: 'i know why' },
      { c: 'whisper', t: 'thats the worst bit. i know why and its still the worst thing ive ever seen' },
      { c: 'whisper', t: 'dont tell me it was mercy. tell me it was arithmetic. i can live next to arithmetic' }
    ],
    choices: [
      { label: '"It was arithmetic."', to: 'a2_lane',
        act: function (s) { s.trust('wren', 18); s.harden(5); s.scar(6); s.set('toldHerArithmetic'); },
        toast: ['She folds the paper into a square and keeps it.', 'good'] },
      { label: '"It was mercy, and I will not pretend otherwise."', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('wren', -12); s.soften(5); s.scar(8); } },
      { label: '"It was both and that is why it is unbearable."', to: 'a2_lane',
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
      'She is at the sink with her sleeves pushed past the elbow, washing hands that are already clean, ' +
      'in a shop with no running water, using grain alcohol out of a measuring jug.',
      '<span class="said">"Do not thank me," she says, without turning. "I have been thanked for this ' +
      'nine hundred times and it has never once been the right thing to say."</span>',
      'She pours again. Washes again.',
      '<span class="said">"Ask me instead whether I will do it again. The answer is yes. ' +
      'That is what I am now. Somebody in this group had to become that, and I had the training, ' +
      'and so the job came to me the way jobs do."</span>'
    ],
    choices: [
      { label: '"You are not only that."', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.trust('odile', 20); s.soften(6); } },
      { label: '"Good. We will need you to be."', tone: 'cruel', to: 'a2_lane',
        act: function (s) { s.trust('odile', 8); s.harden(12); s.set('madeHerTheKnife'); } },
      { label: '"Next time it is my hands."', to: 'a2_lane',
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
      'Getting Teddy over the yard wall takes four minutes and costs everybody something. Odile goes ' +
      'first and takes his weight from above. Bram makes a step of his hands and says nothing at all ' +
      'about any of it, and the not-saying is the most generous thing he has ever done.',

      'Wren goes last, after me, and pulls the fire door closed behind her so carefully that it does ' +
      'not make a sound.',

      { c: 'sep', t: '\u2042' },

      'The lane is empty and cold and smells of old fat from the chip shop extractors. At the far end, ' +
      'white across the opening, the refrigerated lorry waits with its doors shut.',

      'Teddy is between me and Odile with an arm over each of our shoulders. He weighs almost nothing. ' +
      'That is somehow the worst discovery of the night — six weeks of rationing have made a seventy-one ' +
      'year old man into something I can carry one-handed.',

      'He is trying very hard not to breathe loudly. I can feel him trying, through my shoulder, ' +
      'every single step.'
    ],
    choices: [
      { label: 'Head for the lorry.', to: 'a2_lane' },
      { label: 'Tell him to stop trying. Breathe. Let it be loud.', tone: 'kind', to: 'a2_lane',
        act: function (s) { s.soften(8); s.trust('teddy', 20); s.trust('wren', 10); s.set('letHimBreathe'); },
        toast: ['He sobs once, with relief, and then breathes properly.', 'good'] },
      { label: 'Gag him with the tape. It is that or nothing.', tone: 'cruel',
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
