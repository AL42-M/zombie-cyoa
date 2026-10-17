/* ============================================================
   THE HUSH — Act II: the long way round
   Ferry Street to St Amaranth Mercy. Four miles, unless we wait.
   ============================================================ */
(function () {
  'use strict';
  var S = window.Story;
  var CH = 'II — The Long Way Round';

  function withTeddy(s) { return s.alive('teddy'); }
  function teddyGone(s) { return !s.alive('teddy'); }

  S.add({
    id: 'a2_lane',
    chapter: CH,
    place: 'The service lane',
    enter: function (s) { s.set('inTheLane'); },
    text: function (s) {
      var lines = [
        'The lorry blocks the mouth of the lane from wall to wall, white and enormous, ticking softly ' +
        'as the night cools it. FRESH DAILY, in a font somebody once chose in a meeting.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy has to stop every twenty yards. I no longer pretend the stops are for ' +
          'everyone. Each time, Odile takes his pulse at the wrist and keeps the number to herself.');
      } else {
        lines.push('There are four of us now. I am walking faster than I should, and nobody ' +
          'has spoken since the yard wall.');
      }
      lines.push('There is no way round it, only over, under or through, or back up the lane and out ' +
        'onto Ferry Street, where the fifty are.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('From inside the trailer, muffled by six inches of insulated panel, something is ' +
        '<em>humming</em>.');
      return lines;
    },
    choices: [
      { label: 'Open the trailer doors.', tone: 'risk', hint: 'you need to know', to: 'a2_lorry_open' },
      { label: 'Climb over the cab.', hint: 'exposed, but quick', to: 'a2_lorry_climb' },
      { label: 'Go under. There is clearance at the back axle.', tone: 'risk',
        hint: 'tight, dark, and you go first', to: 'a2_lorry_under' },
      { label: 'Back up the lane. Take Ferry Street after all.', tone: 'cruel',
        hint: 'fifty of them, one of you', to: 'a2_ferry' },
      { label: 'Check the cab first. Keys, maps, anything.', to: 'a2_lorry_cab' }
    ]
  });

  S.add({
    id: 'a2_lorry_cab',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) {
      if (!s.flag('searchedCab')) {
        s.set('searchedCab');
        s.give('bullets', 3);
      }
    },
    text: [
      'The driver is still in it: seatbelt on, hands at ten to two, head back against the rest, and a ' +
      'neat dark hole under the chin. He saw to it himself, in the first week by the look of him. ' +
      'Whatever he used is gone. Somebody got here before me.',

      'What they left: three loose rounds rolling in the door pocket, a road atlas open at ' +
      'the wrong county, and a photograph of a dog taped to the dash.',

      { c: 'note', t: 'Clipped to the sun visor, a delivery manifest. 14 TONNES CHILLED. ' +
        'Under it, in biro, in a different hand: THEY ARE NOT MEAT. DO NOT OPEN. 11/4' },

      'The eleventh of April, the day the Hush began. Somebody wrote that, left the trailer ' +
      'sealed and walked away. It has been humming ever since.'
    ],
    choices: [
      { label: 'Open it anyway.', tone: 'risk', to: 'a2_lorry_open' },
      { label: 'Climb over the cab. Leave it sealed.', to: 'a2_lorry_climb',
        act: function (s) { s.set('leftItSealed'); } },
      { label: 'Go under the back axle.', tone: 'risk', to: 'a2_lorry_under' },
      { label: 'Take the atlas.', to: 'a2_lorry_climb',
        act: function (s) { s.set('hasAtlas'); s.set('leftItSealed'); },
        toast: ['+ road atlas', 'item'] },
      { label: 'Take the photograph off the dash.', tone: 'kind', to: 'a2_lorry_climb',
        hint: 'somebody loved that dog enough to tape it up',
        act: function (s) {
          s.set('leftItSealed'); s.soften(4); s.scar(3);
          s.keep('dogphoto', 'I never knew him. I know the dog\u2019s face better than most living ones.');
        },
        toast: ['You peel it off carefully, so as not to tear the corners.', 'keepsake'] },
      { label: 'Tear the biro line off the manifest and pocket it.', to: 'a2_lorry_climb',
        hint: 'the last handwriting of the old world',
        act: function (s) {
          s.set('leftItSealed'); s.scar(4);
          s.keep('manifest', 'On the first day, somebody still thought a warning was worth writing.');
        },
        toast: ['THEY ARE NOT MEAT. DO NOT OPEN. 11/4', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a2_lorry_open',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) { s.set('openedTheLorry'); s.scar(14); },
    text: [
      'The handle is a lever as long as my arm. It goes over with a clang I feel in ' +
      'my teeth.',

      'Fourteen tonnes of chilled capacity, six weeks without power. The air comes out first, ' +
      'warm and sweet and thick enough to lean on, and it has Bram on his knees retching before ' +
      'the doors have finished swinging.',

      'They are standing up. All of them, shoulder to shoulder in the dark, packed as tight as a full ' +
      'lift: perhaps sixty people, who must have been loaded in alive and sealed in alive and have been ' +
      '<span class="wound">standing in the dark ever since, humming</span>.',

      'Nothing comes out. Sixty faces turn towards the light, very slowly, ' +
      'and the note they are holding does not waver.',

      { c: 'hum', t: 'h m m m m m m m' },

      'They have been like this since the eleventh of April, neither dying nor leaving. ' +
      '<em>Waiting</em>, in a box, for something that hasn\u2019t happened yet.'
    ],
    choices: [
      { label: 'Close the doors. Very, very slowly.', to: 'a2_quay',
        act: function (s) { s.scar(10); s.set('closedThemIn'); },
        toast: ['The lever goes back over. Nothing follows you.', 'bad'] },
      { label: 'Burn it. Now, while they are standing still.', tone: 'cruel',
        show: function (s) { return s.has('lighter') && s.has('flask'); },
        to: 'a2_burn_lorry' },
      { label: 'Walk in. Find out what they are waiting for.', tone: 'rot',
        to: 'a2_inside_lorry' },
      { label: 'Leave the doors open and run.', tone: 'cruel', to: 'a2_quay',
        act: function (s) { s.harden(10); s.scar(12); s.set('leftDoorsOpen'); },
        toast: ['Sixty of them, loose behind you, somewhere.', 'bad'] }
    ]
  });

  S.add({
    id: 'a2_burn_lorry',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) {
      s.set('burnedTheLorry');
      if (s.has('flask')) s.take('flask');
      s.harden(12); s.scar(18);
    },
    text: [
      'I throw the grain alcohol in a wide arc through the open doors, and the lighter does the rest. ' +
      'What happens next is nothing like fire in a film.',

      'It is fast and blue and almost silent for the first four seconds. Then sixty people begin to ' +
      'burn in a steel box, and the humming does not stop. It <em>changes pitch</em>. ' +
      'Sixty voices climb the scale together, in unison, until the sound is higher than any human ' +
      'throat should go, and it stays there. It holds, and holds.',

      'None of them runs. Not one tries to come out through the open doors. They stand in it.',

      { c: 'sep', t: '\u2042' },

      'Wren has her hands over her ears: the first time in forty-one days she has admitted ' +
      'that a sound can reach her. Odile watches with her head on one side, as if she were taking notes.',

      '<span class="said">"They did not run,"</span> she says later, on the road, out of nowhere. ' +
      '<span class="said">"Pain is protective. It is only any use to something that still wants ' +
      'to live."</span>'
    ],
    choices: [
      { label: 'Get everyone moving. Now. The whole town saw that.', to: 'a2_quay',
        act: function (s) { s.set('townSawTheFire'); } },
      { label: 'Stay until it is finished. Somebody should.', to: 'a2_quay',
        act: function (s) { s.scar(14); s.soften(4); s.set('watchedItBurn'); } },
      { label: 'Tell Wren it was mercy.', to: 'a2_quay',
        act: function (s) { s.trust('wren', -10); s.harden(6); } },
      { label: 'Tell Wren the truth: you do not know what it was.', tone: 'kind', to: 'a2_quay',
        act: function (s) { s.trust('wren', 14); s.soften(5); s.scar(6); } }
    ]
  });

  S.add({
    id: 'a2_inside_lorry',
    chapter: CH,
    place: 'Inside the trailer',
    enter: function (s) { s.infect(22); s.scar(20); s.set('wentInside'); },
    text: [
      'I step up into the trailer. Nobody stops me, the sixty included.',

      'Inside, the humming stops being a sound. It is a <em>pressure</em> in the sinuses, the back ' +
      'teeth, the long bones, and walking into it is like wading chest-deep into a river.',

      'They part for me. Sixty bodies each shuffle half a step aside to open a corridor, without ' +
      'looking, the way a crowd makes room for a stretcher.',

      'At the far end, against the bulkhead, they have left a space in all that packed flesh: ' +
      'a circle of bare floor about a yard across. In the middle of it, on its side and spotless, ' +
      'is <span class="cold">a child\u2019s shoe</span>.',

      'Every one of them is turned towards it. They have stood round it since April.',

      { c: 'hum', t: 'h m m m m m m m' },

      'I don\u2019t know what it means. My body knows something, though: my throat ' +
      'has opened and I am <span class="wound">humming with them</span>. I did not decide to.'
    ],
    choices: [
      { label: 'Take the shoe.', tone: 'rot', to: 'a2_quay',
        act: function (s) { s.set('tookTheShoe'); s.infect(10); s.scar(12); },
        toast: ['Nothing happens. The hum does not even change.', 'rot'] },
      { label: 'Leave it. Back out slowly, still humming.', to: 'a2_quay',
        act: function (s) { s.set('leftTheShoe'); s.infect(4); },
        toast: ['They close the corridor behind you like water.', 'rot'] },
      { label: 'Stop humming. Deliberately. Break it.', tone: 'risk', to: 'a2_inside_break' },
      { label: 'Call out for the others to come and see.', tone: 'cruel', to: 'a2_quay',
        act: function (s) { s.harden(12); s.scar(10); s.trust('bram', -20); s.trust('wren', -15); s.set('calledThemIn'); },
        toast: ['Nobody comes. Bram holds Wren by both arms at the doors.', 'bad'] }
    ]
  });

  S.add({
    id: 'a2_inside_break',
    chapter: CH,
    place: 'Inside the trailer',
    enter: function (s) { s.hurt(16); s.infect(6); s.scar(16); },
    text: [
      'I close my mouth. It takes everything I have. It feels like holding in a sneeze, ' +
      'or standing up in church in the middle of the prayers.',

      'Sixty heads come round at once.',

      'Not fast. They turn to me with a slow, institutional disappointment, like a committee, ' +
      'and the nearest one lifts both hands to my face. It does not claw or bite. It is ' +
      '<span class="wound">holding my jaw and trying to open it</span>, ' +
      'with the patient strength of something that has all night.',

      'I get out because Bram comes three steps up into that and takes a fistful of my collar. ' +
      'It costs me a boot and a strip of skin off my cheek.'
    ],
    choices: [
      { label: 'Out. Run. Do not look back at the doors.', to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); } },
      { label: 'Close the doors behind you first.', to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); s.set('closedThemIn'); s.scar(6); } },
      { label: 'Burn it before they follow.', tone: 'cruel',
        show: function (s) { return s.has('lighter') && s.has('flask'); },
        to: 'a2_burn_lorry', act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); } },
      { label: 'Sit down on the kerb and let your hands stop shaking first.',
        to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); s.ease(6); s.scar(4); } },
      { label: 'Thank Bram. Out loud, in front of the others.', tone: 'kind', to: 'a2_quay',
        act: function (s) { s.trust('bram', 35); s.set('bramSavedYou'); s.soften(6); } },
      { label: 'Turn back towards them. Stop resisting the note.', tone: 'rot', to: 'end_turned',
        act: function (s) { s.infect(80); s.set('letTheNoteIn'); } }
    ]
  });

  S.add({
    id: 'a2_lorry_climb',
    chapter: CH,
    place: 'Quay Road',
    text: function (s) {
      var lines = [
        'Wing mirror, door handle, cab roof, down the far side. Bram goes first and makes ' +
        'it look like something he does for exercise.'
      ];
      if (withTeddy(s)) {
        lines.push('Getting Teddy up and over takes eleven minutes and four hands. He keeps utterly ' +
          'silent the whole way, and when he finally coughs, on the far side, into both palms, ' +
          'he looks round at us in apology, like a man who has dropped a glass in a library.');
      } else {
        lines.push('It takes the four of us under a minute. We are quick now. ' +
          'I would rather we weren\u2019t.');
      }
      lines.push('From the cab roof I can see the length of Quay Road, the river beyond it, ' +
        'and, four miles north-east on the hill, the long Victorian front of St Amaranth Mercy, ' +
        'lit. <em>Lit, with electric light.</em>');
      lines.push('A building with power, in a county that has had none for six weeks.');
      return lines;
    },
    choices: [
      { label: 'Down the far side. Keep moving.', to: 'a2_quay' },
      { label: 'Sit on the cab a moment and look at the lights.', to: 'a2_quay',
        act: function (s) { s.ease(5); s.soften(3); s.set('sawTheLights'); } },
      { label: 'Point the lights out to the others.', to: 'a2_quay',
        act: function (s) { s.set('sawTheLights'); s.set('toldThemLights'); s.trust('wren', 10); s.trust('teddy', 10); } },
      { label: 'Say nothing about the lights. Decide later.', tone: 'cruel', to: 'a2_quay',
        act: function (s) { s.set('sawTheLights'); s.set('hidTheLights'); s.harden(8); } }
    ]
  });

  S.add({
    id: 'a2_lorry_under',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) { s.scar(8); s.set('wentUnder'); },
    text: function (s) {
      var lines = [
        'Eleven inches of clearance at the rear axle and forty feet of dark that smells of diesel. ' +
        'I go first, because it was my idea.',

        'Halfway along, flat on my back, I find that the humming is louder down here. It comes ' +
        'through the chassis and the floor pan, through the six inches of panel just above ' +
        'my face. However many of them there are, they are standing on the other side of it.',

        'Then, above me, through the steel: a sound like a shoe being set down carefully.',
        'Then another.',
        '<em>They are following me along the trailer.</em>'
      ];
      if (withTeddy(s)) {
        lines.push('Behind me in the dark Teddy is coming through on his elbows, and in this space ' +
          'his breathing is the loudest thing in the county.');
      }
      return lines;
    },
    choices: [
      { label: 'Keep going. Fast. Everyone, now.', to: 'a2_quay',
        act: function (s) { s.hurt(6); s.scar(8); } },
      { label: 'Stop. Lie absolutely still until they lose you.', tone: 'risk', to: 'a2_under_still' },
      { label: 'Back out. Take your chances on Ferry Street instead.', to: 'a2_ferry',
        act: function (s) { s.scar(6); } },
      { label: 'Hum. Give them what they want and crawl out the other side.', tone: 'rot',
        to: 'a2_quay',
        act: function (s) { s.infect(14); s.set('hummedUnder'); s.scar(6); },
        toast: ['The footsteps stop. You crawl out unharmed, and that frightens you more.', 'rot'] }
    ]
  });

  S.add({
    id: 'a2_under_still',
    chapter: CH,
    place: 'Under the trailer',
    enter: function (s) { s.scar(12); },
    text: function (s) {
      var lines = [
        'We stop, all of us, flat on our backs in eleven inches of dark under fourteen tonnes of ' +
        'standing dead.',

        'Forty minutes.',

        'I think about June in the photo booth at the county fair, ' +
        'trying to get both our heads into the fourth frame. I have not said her name aloud ' +
        'for nineteen days. I count them twice to be sure.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy does not cough. Not once in forty minutes. Afterwards he is grey to the lips ' +
          'and smiling like a boy who has won something.');
        lines.push({ c: 'whisper', t: 'He has bitten through his own bottom lip to do it.' });
      }
      lines.push('Eventually the footsteps overhead move away.');
      return lines;
    },
    choices: [
      { label: 'Out, and straight on to the Mercy.', to: 'a2_quay',
        act: function (s) { s.scar(6); } },
      { label: 'Out, and say her name out loud. Once.', tone: 'kind', to: 'a2_quay',
        act: function (s) { s.set('saidHerName'); s.soften(8); s.ease(10); s.scar(4); },
        toast: ['June. The others pretend not to hear, which is a kindness.', 'good'] },
      { label: 'Out, and see to Teddy\u2019s mouth.', tone: 'kind',
        show: function (s) { return withTeddy(s); }, to: 'a2_quay',
        act: function (s) {
          s.trust('teddy', 25); s.soften(6);
          if (s.has('gauze')) {
            s.take('gauze');
            s.keep('gauzescrap', 'I kept the square I took off his lip. I have tried to throw it away. I can\u2019t.');
          }
        } },
      { label: 'Out, and do not speak to anybody for an hour.', to: 'a2_quay',
        act: function (s) { s.harden(5); s.scar(8); } }
    ]
  });

  S.add({
    id: 'a2_ferry',
    chapter: CH,
    place: 'Ferry Street',
    enter: function (s) {
      s.hurt(22); s.infect(12); s.scar(20);
      s.wound('bram');
    },
    text: function (s) { return [
      'We take Ferry Street because there is no time and no better idea, and Ferry Street takes ' +
      'something from each of us in exchange.',

      'It is not a chase. I keep expecting it to turn into one, and it never does. It is a ' +
      '<em>crowd</em>, and I am going the wrong way through it, and each of them reaches for me ' +
      'as I pass with the same slow grip, trying to turn me round, to bring my face to theirs, ' +
      'to get my mouth open.',

      'Bram goes down outside the betting shop with three of them on him and comes up again swinging the ' +
      (s.has('cutters') ? 'bolt cutters' : 'length of broken railing') +
      ', a <span class="wound">flap of scalp hanging over one eye</span>. ' +
      'He does not stop moving and he does not make a sound. Eleven years on prison landings.',

      'We come out at the Quay Road end with everyone still on their feet. None of us expected that.'
    ]; },
    choices: [
      { label: 'Stop and get the scalp closed. Now, before he loses the eye.', tone: 'kind',
        to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.soften(6); if (s.has('gauze')) s.take('gauze'); s.mend('bram'); } },
      { label: 'Keep moving. He can hold it on with his hand.', tone: 'cruel', to: 'a2_quay',
        act: function (s) { s.harden(10); s.trust('bram', -15); } },
      { label: 'Check everyone else first.', to: 'a2_quay',
        act: function (s) { s.soften(4); s.trust('wren', 10); } },
      { label: 'Check your own arm.', to: 'a2_quay',
        act: function (s) { s.set('sawTheWound'); s.scar(8); },
        toast: ['Three new grazes. You do not mention them.', 'rot'] }
    ]
  });

  /* ---------------------------------------------------------- the crossroads */
  S.add({
    id: 'a2_quay',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) { s.set('atTheQuay'); },
    text: function (s) {
      var lines = [
        'Quay Road runs along the water. To my left, the river, wide and black and moving. ' +
        'To my right, the Fenwick estate: four tower blocks and a shopping precinct, every window ' +
        'dark except one on the ninth floor of Marlowe House, where somebody has a candle lit.'
      ];
      if (s.flag('sawTheLights')) {
        lines.push('Ahead and above it all, four miles north-east, St Amaranth Mercy is lit up like ' +
          'a liner. We have all seen it now. Nobody has said yet what it means.');
      } else {
        lines.push('And ahead, four miles north-east, up on the hill: lights. Electric light, ' +
          'burning steadily, in a county with no power. St Amaranth Mercy.');
        lines.push('We all stop walking at the same moment.');
        s.set('sawTheLights');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (withTeddy(s)) {
        lines.push('Odile takes me aside by the elbow. <span class="said">"He has two miles in him,"' +
          '</span> she says. <span class="said">"Perhaps three. Not four. I am telling you now, ' +
          'while it is still information and not an emergency."</span>');
      }
      lines.push('The river path: long, quiet, open. The estate: short, close, with a candle in it. ' +
        'And the culvert under the road, which is neither.');
      return lines;
    },
    choices: [
      { label: 'The river path.', hint: 'long, open, quiet', to: 'a2_river' },
      { label: 'Through the estate.', hint: 'short, close, and somebody is alive in there', to: 'a2_estate' },
      { label: 'The culvert.', tone: 'risk', hint: 'under the road. dark. fast.', to: 'a2_culvert' },
      { label: 'Rest here an hour first.', show: function (s) { return withTeddy(s); },
        tone: 'kind', to: 'a2_rest' },
      { label: 'Ask the others what they want to do.', to: 'a2_ask' }
    ]
  });

  S.add({
    id: 'a2_ask',
    chapter: CH,
    place: 'Quay Road',
    text: function (s) {
      var lines = ['I ask. It is not something this group does, and the asking alone ' +
        'changes the mood.'];
      lines.push('<span class="said">"Estate,"</span> Bram says at once. ' +
        '<span class="said">"It\u2019s short. A candle means a person, and a person means a room that\u2019s ' +
        'held. I\u2019d like to see a room that\u2019s held."</span>');
      lines.push('<span class="said">"River,"</span> says Odile. <span class="said">"Open ground. ' +
        'I can see what is coming and I can hear it. I have had enough of corridors ' +
        'for one lifetime."</span>');
      if (withTeddy(s)) {
        lines.push('<span class="said">"The short one,"</span> Teddy says. <span class="said">' +
          '"Whichever that is."</span> A breath. <span class="said">"Not the long one for my sake, ' +
          'child. The long one is where you have to decide about me. Halfway down."</span>');
      }
      lines.push({ c: 'whisper', t: 'Wren writes one word and holds it up.' });
      lines.push({ c: 'whisper', t: 'water' });
      lines.push({ c: 'whisper', t: 'they dont like water. ive watched. they stop at the edge' });
      return lines;
    },
    choices: [
      { label: 'Go with Wren. The river.', tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 20); s.set('tookWrensAdvice'); } },
      { label: 'Go with Bram. The estate.', to: 'a2_estate',
        act: function (s) { s.trust('bram', 15); } },
      { label: 'Go with Odile. The river.', to: 'a2_river',
        act: function (s) { s.trust('odile', 15); } },
      { label: 'Overrule all of them. The culvert.', tone: 'risk', to: 'a2_culvert',
        act: function (s) { s.harden(6); s.trust('bram', -5); s.trust('odile', -5); s.trust('wren', -5); } }
    ]
  });

  S.add({
    id: 'a2_rest',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) { s.ease(8); s.heal(6); s.set('rested'); },
    text: [
      'We give it an hour in the lee of an overturned skip, and the hour costs us the last of the dark.',

      'Teddy sleeps sitting up against my shoulder, and for a while his breathing eases. ' +
      'Odile sleeps too, the first time I have seen her sleep in forty-one days. That tells me ' +
      'more about how bad she thinks it is than anything she has said.',

      'Wren does not sleep. She sits watching the river with her chin on her knees, and when I ' +
      'look over she is opening and closing her mouth, silently, over and over, ' +
      'the way I might try a door I was afraid was locked.',

      { c: 'whisper', t: 'She is checking whether her voice is still in there.' }
    ],
    choices: [
      { label: 'Tell her it will come back. Take the river path with her.', tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 15); s.soften(5); } },
      { label: 'Let her have the silence. Lead the group through the estate.', tone: 'kind', to: 'a2_estate',
        act: function (s) { s.trust('wren', 10); s.scar(4); } },
      { label: 'Ask her to try. Out loud. Once.', tone: 'risk', to: 'a2_wren_voice' },
      { label: 'Wake everybody. Take the culvert before it gets light.', to: 'a2_culvert' }
    ]
  });

  S.add({
    id: 'a2_wren_voice',
    chapter: CH,
    place: 'Quay Road',
    text: [
      'She looks at me for a long time. Then she nods, turns to face the water and takes a breath.',

      'What comes out is not a word. It is a dry click, then a thin, cracked vowel about two ' +
      'seconds long: the ugliest and best sound I have heard since April.',

      'Her hand goes to her throat. She looks surprised.',

      'Forty yards away, on the far bank, something that has stood in the reeds all hour ' +
      'without moving turns its head.',

      { c: 'hum', t: 'h m m m m m m m' }
    ],
    choices: [
      { label: 'Get everyone up. Follow the river away from that sound.', to: 'a2_river',
        act: function (s) { s.trust('wren', 10); s.scar(8); s.set('wrenSpoke'); } },
      { label: 'Tell her it was worth it. Take the river path beside her.', tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 30); s.soften(10); s.set('wrenSpoke'); s.set('worthIt'); },
        toast: ['She writes: "say that again when were not running". You do.', 'good'] },
      { label: 'Tell her never to do that again. Cut through the estate.', tone: 'cruel', to: 'a2_estate',
        act: function (s) { s.trust('wren', -30); s.harden(10); s.set('wrenSpoke'); s.set('silencedHer'); },
        toast: ['She closes her mouth. She does not open it again for a long time.', 'bad'] }
    ]
  });

  /* ---------------------------------------------------------- the river */
  S.add({
    id: 'a2_river',
    chapter: CH,
    place: 'The river path',
    enter: function (s) { s.set('tookRiver'); },
    text: function (s) {
      var lines = [
        'Twice on the river path I see them at the water\u2019s edge, ' +
        'standing in the shallows up to the shins, facing out, quite still, humming at the far bank ' +
        'like a congregation facing an altar nobody else can see.',

        'They do not come in after us. Whatever the water is to them, it is a wall.',

        { c: 'sep', t: '\u2042' },

        'Two miles on, where the path passes the old sailing club, four boats are still moored to a ' +
        'pontoon. Three of them are swamped and sitting on the bottom.',

        'The fourth is a twenty-six-foot cabin cruiser riding high and rocking gently: ' +
        'canopy zipped, hull sound, <em>LUCKY II</em> across the transom.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy stops dead when he sees it and puts a hand on my arm. He says nothing. ' +
          'The hand is shaking.');
      }
      return lines;
    },
    choices: [
      { label: 'Board her.', tone: 'kind', to: 'a2_boat' },
      { label: 'Walk past. The Mercy is the plan.', to: 'a2_mercy_approach',
        act: function (s) { s.set('walkedPastBoat'); s.scar(6); } },
      { label: 'Board her, and do not tell the others what you find.', tone: 'cruel',
        to: 'a2_boat', act: function (s) { s.set('secretBoat'); s.harden(8); } },
      { label: 'Ask Odile what she thinks. Honestly.', to: 'a2_boat_odile' }
    ]
  });

  S.add({
    id: 'a2_boat_odile',
    chapter: CH,
    place: 'The sailing club',
    text: [
      'She looks at the boat for a long moment, arms folded.',

      '<span class="said">"It is the best idea anybody has had in six weeks,"</span> she says. ' +
      '<span class="said">"Understand what it is before you fall in love with it. A hole ' +
      'in the water. No power, no charts, no fuel we have counted, and a river that runs out to a ' +
      'sea none of us can sail."</span>',

      'She unfolds her arms.',

      '<span class="said">"But they stop at the water\u2019s edge. I have watched them do it four ' +
      'times since we got here. So, yes. Find the keys."</span>'
    ],
    choices: [
      { label: 'Board her and search.', to: 'a2_boat' },
      { label: 'Ask her to go aboard and check it while you watch the path.', to: 'a2_boat',
        act: function (s) { s.trust('odile', 10); } },
      { label: 'Tell her the Mercy comes first. The boat will keep.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.set('knowsBoat'); } }
    ]
  });

  S.add({
    id: 'a2_boat',
    chapter: CH,
    place: 'LUCKY II',
    enter: function (s) { s.set('knowsBoat'); s.set('foundBoat'); },
    text: [
      'The canopy unzips. The cabin smells of mildew, old coffee and sun cream — the smell of an ' +
      'ordinary August, preserved under canvas like a specimen.',

      'Two berths. A gas ring. A paperback swollen fat with damp. A child\u2019s armband. ' +
      'Half a bottle of supermarket rosé, still corked.',

      'The ignition is a round brass barrel on the bulkhead, and it is empty.',

      { c: 'note', t: 'Taped inside the locker door, in marker pen, a note from a man to his wife: ' +
        'JEAN \u2014 KEYS ARE WHERE THEY ALWAYS ARE. STOP ASKING ME. x' },

      'The fuel gauge reads three-quarters. It is the most hopeful thing any of us ' +
      'has seen since the eleventh of April.'
    ],
    choices: [
      { label: 'Search the boat properly for the keys.', to: 'a2_boat_search' },
      { label: 'Leave it. Come back with the keys from somewhere.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); } },
      { label: 'Try to hotwire it with what you have.', tone: 'risk',
        show: function (s) { return s.has('cutters') || s.has('knife'); }, to: 'a2_boat_hotwire' },
      { label: 'Move everyone aboard and hold here. Let the Mercy wait.', tone: 'risk',
        to: 'a2_boat_hold' }
    ]
  });

  S.add({
    id: 'a2_boat_search',
    chapter: CH,
    place: 'LUCKY II',
    enter: function (s) { s.set('searchedBoat'); },
    text: function (s) { return [
      'We take the cabin apart in eleven minutes, ' + (s.partyCount() + 1) +
      ' of us and one wind-up torch.',

      'Where they always are turns out to mean: not here. Not in the galley drawer, not in the chart ' +
      'table, not in the pocket of the oilskin, not taped under the wheel, not in the tin marked TEA.',

      { c: 'sep', t: '\u2042' },

      'What I do find, in the chart table, under a folded map of the estuary, is a hospital ' +
      'appointment card.',

      { c: 'note', t: 'ST AMARANTH MERCY \u00b7 RESPIRATORY OUTPATIENTS\nMR D. HOLLOWAY \u00b7 WARD 11 \u00b7 ' +
        'THURS 09:40\nPLEASE BRING THIS CARD AND A LIST OF YOUR MEDICATIONS' },

      'Mr D. Holloway, then: the man who wrote to Jean. If he went up the hill with the keys in ' +
      'his coat, they are four miles away, in the only building with lights.'
    ]; },
    choices: [
      { label: 'Take Holloway\u2019s appointment card to the Mercy.', to: 'a2_mercy_approach',
        act: function (s) { s.set('hollowayCard'); s.set('boatWillKeep'); },
        toast: ['Ward 11. A name. A place to start.', 'item'] },
      { label: 'Take the card and tell nobody what it means.', tone: 'cruel',
        to: 'a2_mercy_approach',
        act: function (s) { s.set('hollowayCard'); s.set('boatWillKeep'); s.set('secretCard'); s.harden(10); } },
      { label: 'Leave the card. The boat is a fantasy and the Mercy is a plan.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.harden(5); } },
      { label: 'Hide the others aboard and go to the Mercy alone.', tone: 'risk',
        to: 'a2_boat_hold', act: function (s) { s.set('hollowayCard'); } },
      { label: 'Take the card up the hill. Leave the river behind.',
        to: 'a2_mercy_approach', act: function (s) { s.set('hollowayCard'); s.set('boatWillKeep'); } }
    ]
  });

  S.add({
    id: 'a2_boat_hotwire',
    chapter: CH,
    place: 'LUCKY II',
    enter: function (s) { s.hurt(5); s.scar(6); },
    text: function (s) { return [
      'I get the panel off with ' + (s.has('knife') ? 'the knife' : 'the bolt cutters') +
      ' and my hand into a loom of forty-year-old ' +
      'marine wiring, and over the next twenty minutes I learn that a diesel inboard with ' +
      'an electronic cut-off is not a Vauxhall Astra.',

      'What I manage is the horn.',

      'One enormous blast across two hundred yards of open water. It rolls off the far bank ' +
      'and comes back at me, and then, like something being poured, the humming starts up all along ' +
      'the opposite shore at once.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Not dozens: hundreds. The far bank has been full of them all along, ' +
      'standing in the dark, and now every one of them is facing me.',

      'They cannot cross. I am almost certain they cannot cross.'
    ]; },
    choices: [
      { label: 'Get off the boat and get to the Mercy. Fast.', to: 'a2_mercy_approach',
        act: function (s) { s.scar(10); s.set('soundedTheHorn'); } },
      { label: 'Stay. Watch the far bank. Learn something.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('soundedTheHorn'); s.set('studiedThem'); s.scar(12); s.infect(6); },
        toast: ['They hold the note for two hours. Not one of them steps into the water.', 'rot'] },
      { label: 'Apologise to the others. Properly.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.set('soundedTheHorn'); s.soften(6); s.trust('bram', 8); s.trust('odile', 8); } },
      { label: 'Blame the boat. Blame anything.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.set('soundedTheHorn'); s.harden(8); s.trust('bram', -12); s.trust('wren', -8); } }
    ]
  });

  S.add({
    id: 'a2_boat_hold',
    chapter: CH,
    place: 'LUCKY II',
    dateEntry: true,
    enter: function (s) { s.advance(2); s.set('heldAtTheBoat'); },
    text: function (s) {
      var lines = [
        'We stay at the pontoon for two days, because the water is a wall, and for two days ' +
        'it is possible to believe that a wall is the same thing as a home.',

        'They are the best days any of us has had since April. I eat tinned peaches ' +
        'sitting on the coachroof. Wren finds the paperback readable from page forty. Bram laughs once, ' +
        'at something Odile says about a horse, and the sound is so unfamiliar that everybody stops.'
      ];
      if (withTeddy(s)) {
        lines.push('And Teddy gets worse. Not dramatically; the way a tide comes in. On the second ' +
          'night a new sound starts under his breathing, a fine dry crackle like somebody screwing ' +
          'up paper in another room. Odile hears it from the cockpit and closes her eyes.');
      } else {
        lines.push('On the second night the far bank fills up and stays full. The humming goes on ' +
          'for nine hours without a break, and we stop pretending that the wall is a home.');
      }
      lines.push('There is almost no food left on this boat, and there are no keys. ' +
        'The lit building four miles north-east has beds in it, and people.');
      return lines;
    },
    choices: [
      { label: 'Everyone goes to the Mercy. Together.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.soften(4); } },
      { label: 'Scout the hill alone. Tell them to follow when the road is clear.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('wentAlone'); s.set('boatWillKeep'); s.scar(8); s.soften(6); } },
      { label: 'Take Bram. Leave Odile and Wren with the boat.', to: 'a2_mercy_approach',
        act: function (s) { s.set('tookBram'); s.set('boatWillKeep'); } },
      { label: 'Stay one more day. Then go up to the Mercy.', tone: 'risk', to: 'a2_boat_lastnight',
        act: function (s) { s.hurt(10); s.scar(8); s.bump('daysWasted'); } }
    ]
  });

  S.add({
    id: 'a2_boat_lastnight',
    chapter: CH,
    place: 'The river path',
    dateEntry: true,
    enter: function (s) {
      if (!s.flag('leftBoatAfterLastNight')) {
        s.set('leftBoatAfterLastNight'); s.advance(1);
      }
      s.set('boatWillKeep');
    },
    text: function (s) {
      var lines = [
        'I argue for one more day and get it. By afternoon the last tin is empty. The paperback lies ' +
        'face down in the cockpit, its pages swelling in the river mist.',
        'At dusk the humming starts again on the far bank. Nobody gets up to look. Staying has ' +
        'bought us nothing but practice at ignoring it.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy asks me to help him off the boat. He does not ask for the Mercy. ' +
          'He looks at the path up the hill and waits for me to take his arm.');
      }
      return lines;
    },
    choices: [
      { label: 'Help the others up the hill.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.trust('wren', 10); s.soften(5); } },
      { label: 'Go ahead alone. Find out if the beds are real.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('wentAlone'); s.scar(6); } },
      { label: 'Leave the boat behind without looking at it again.', to: 'a2_mercy_approach',
        act: function (s) { s.harden(5); } }
    ]
  });

  /* ---------------------------------------------------------- the estate */
  S.add({
    id: 'a2_estate',
    chapter: CH,
    place: 'Fenwick estate',
    enter: function (s) { s.set('tookEstate'); },
    text: [
      'The precinct is a concrete horseshoe of shuttered units round a dry fountain. It is ' +
      'the quietest place I have been in six weeks, and it is not an empty quiet. ' +
      'Something here is holding still.',

      'The candle is on the ninth floor of Marlowe House. From the courtyard I can see it moving ' +
      'behind the glass: somebody carrying a light from room to room, ' +
      'in a dead city.',

      { c: 'sep', t: '\u2042' },

      'Taped to the inside of the glass at the tower entrance, at eye level and facing out, is a sheet ' +
      'of A4 in forty-point type.',

      { c: 'note', t: 'WE HAVE CHILDREN IN HERE.\nWE HAVE NO FOOD TO SPARE AND NOTHING WORTH TAKING.\n' +
        'IF YOU ARE WELL, PLEASE WALK ON.\nIF YOU ARE BITTEN, PLEASE WALK ON.\nWE ARE SORRY. ' +
        'WE ARE SO SORRY. PLEASE WALK ON.' }
    ],
    choices: [
      { label: 'Walk on.', tone: 'kind', hint: 'as asked', to: 'a2_mercy_approach',
        act: function (s) { s.soften(10); s.set('walkedOn'); s.scar(5); },
        toast: ['The candle goes out behind you as you pass. Relief, from nine floors up.', 'good'] },
      { label: 'Knock.', tone: 'risk', to: 'a2_estate_knock' },
      { label: 'Try the shuttered units. They said nothing worth taking — check.', to: 'a2_estate_units' },
      { label: 'Go up. Nine floors. Take what they have.', tone: 'cruel', to: 'a2_estate_up' },
      { label: 'Shout up to them. Ask about the hospital.', tone: 'risk', to: 'a2_estate_shout' }
    ]
  });

  S.add({
    id: 'a2_estate_knock',
    chapter: CH,
    place: 'Marlowe House',
    text: [
      'I knock four times, slowly, with one knuckle: the way a person knocks, ' +
      'and nothing else does.',

      'Nine floors up, the candle stops moving.',

      'Four minutes later a voice comes down the stairwell, thinned by distance: a woman, sixty or so ' +
      'by the sound of her, doing a very good job of sounding calm.',

      '<span class="said">"Please go away. I\u2019m not being unkind. There are six children in this ' +
      'flat, two of them under four, and I can\u2019t — I won\u2019t — open this door. Please."</span>',

      'A pause. Then, quieter and much closer, as if she has come down two flights ' +
      'to say it properly:',

      '<span class="said">"If you\u2019re going up to the Mercy, don\u2019t go in the front. ' +
      'They\u2019re letting people in at the front."</span>'
    ],
    choices: [
      { label: '"Thank you." Then go.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.set('warnedAboutFront'); s.soften(8); s.set('walkedOn'); } },
      { label: 'Ask her what she means by that.', to: 'a2_estate_warning' },
      { label: 'Offer her the antibiotics through the letterbox.', tone: 'kind',
        show: function (s) { return s.has('pills'); }, to: 'a2_estate_gift' },
      { label: 'Tell her you have a sick old man and ask again.', tone: 'risk',
        show: function (s) { return withTeddy(s); }, to: 'a2_estate_beg' },
      { label: 'Force the door.', tone: 'cruel', to: 'a2_estate_up' }
    ]
  });

  S.add({
    id: 'a2_estate_warning',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) { s.set('warnedAboutFront'); s.set('knowsAboutMercy'); },
    text: [
      'The stairwell is silent for so long that I think she has gone.',

      '<span class="said">"My husband went up in the second week,"</span> she says. <span class="said">"Him ' +
      'and his brother. They were taking anybody then. Beds, hot water, a doctor. Proper triage, lanyards, ' +
      'the whole performance."</span>',

      '<span class="said">"His brother came back on the eleventh of May. Stood in that courtyard, ' +
      'where you\u2019re standing, and told me what the wards are for now. Then he asked to come up, ' +
      'and I said no, because of what he\u2019d helped them do. So he sat down against that fountain. ' +
      'He was still sitting there four days later."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"And they\u2019re not lying to you about the beds. ' +
      'There really are beds. There really is a doctor. Everything they tell you at the front door ' +
      'is true."</span>',

      '<span class="said">"Go in the back."</span>'
    ],
    choices: [
      { label: '"What is in the wards?"', to: 'a2_estate_wards' },
      { label: '"Thank you." Leave her alone. Go.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(8); s.set('walkedOn'); } },
      { label: 'Offer her the antibiotics through the letterbox.', tone: 'kind',
        show: function (s) { return s.has('pills'); }, to: 'a2_estate_gift' },
      /* she is the only local you will meet who is still answering questions.
         without the card you do not have the name yet, so you ask the larger one. */
      { label: function (s) {
          return s.flag('hollowayCard')
            ? 'Ask if she has seen a man called Holloway.'
            : 'Ask her whether anybody has got out of this town, and how.';
        },
        to: 'a2_estate_holloway' }
    ]
  });

  S.add({
    id: 'a2_estate_wards',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) { s.set('knowsTheWards'); },
    text: [
      'She tells me. It takes ninety seconds, in the flat, careful voice of somebody ' +
      'who has said it before to people who didn\u2019t believe her.',

      '<span class="said">"They keep them alive. The turned ones. Strapped down, fed, washed — properly ' +
      'washed, he said, it\u2019s a real hospital, they\u2019re not animals about it. Whole wards of ' +
      'them, lying there humming at the ceiling."</span>',

      '<span class="said">"And they take the blood. A little every day, off every one of them. ' +
      'They do something to it, and what comes out the other end they give to the well ones ' +
      'as a treatment. And it works. You need to hear that part properly. ' +
      '<em>It works.</em>"</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"The wards are full. Have been since April. So where do you suppose ' +
      'the new ones come from, when the old ones give out?"</span>',

      'Nine floors up, a child says something, and a second voice hushes it.'
    ],
    choices: [
      { label: '"Thank you." Go. Say nothing to the others until you are clear of the estate.',
        to: 'a2_mercy_approach', act: function (s) { s.scar(10); s.set('walkedOn'); } },
      { label: 'Tell the others immediately, in the courtyard.', to: 'a2_mercy_approach',
        act: function (s) { s.set('toldThemTheWards'); s.trust('odile', 12); s.trust('bram', 10); s.trust('wren', 10); s.soften(5); } },
      { label: '"Then we are not going."', tone: 'kind', to: 'a2_estate_notgoing' },
      { label: 'Offer her the antibiotics through the letterbox.', tone: 'kind',
        show: function (s) { return s.has('pills'); }, to: 'a2_estate_gift' }
    ]
  });

  S.add({
    id: 'a2_estate_notgoing',
    chapter: CH,
    place: 'Fenwick estate',
    text: function (s) {
      var lines = [
        'I say it out loud in the courtyard, by the dry fountain, and it lands like a dropped plate.'
      ];
      lines.push('<span class="said">"Not going,"</span> Bram repeats. <span class="said">' +
        '"To the only building in this county that\u2019s got electricity."</span>');
      if (withTeddy(s)) {
        lines.push('<span class="said">"On the word of a frightened woman behind a door,"</span> ' +
          'he goes on, <span class="said">"you want to turn a dying man round and walk him away ' +
          'from a doctor."</span>');
      }
      lines.push('Odile is quiet for a while. Then: <span class="said">"She said it works."</span>');
      lines.push('<span class="said">"She did say that,"</span> I agree.');
      lines.push('<span class="said">"No,"</span> Odile says. <span class="said">"Listen to me. ' +
        'I am not arguing with you. I am telling you that in thirty years I have never ' +
        'heard anybody describe an atrocity and a cure in the same breath and be wrong about <em>both</em>."</span>');
      return lines;
    },
    choices: [
      { label: 'Go anyway. In the back. Eyes open.', to: 'a2_mercy_approach',
        act: function (s) { s.set('warnedAboutFront'); s.scar(6); } },
      { label: 'Go to the river instead. Away from the Mercy.', to: 'a2_river',
        show: function (s) { return !s.flag('knowsBoat'); }, act: function (s) { s.set('refusedMercy'); } },
      { label: 'Put it to a vote.', to: 'a2_vote' },
      { label: 'Go alone. Send the others to the water.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('wentAlone'); s.soften(8); s.scar(10); } }
    ]
  });

  S.add({
    id: 'a2_vote',
    chapter: CH,
    place: 'Fenwick estate',
    text: function (s) {
      var lines = ['A show of hands by the dry fountain. The precinct around us does not make a sound.'];
      lines.push('Bram: the Mercy. Straight away, and without apology.');
      lines.push('Odile: the Mercy, and she adds, <span class="said">"with my eyes open, and with ' +
        'something sharp in my coat."</span>');
      if (withTeddy(s)) {
        lines.push('Teddy keeps his hand down. <span class="said">"I am the reason you ' +
          'are going,"</span> he says. A breath. <span class="said">"The reason does not get a vote. ' +
          'Not modesty, child. Just the rules."</span>');
      }
      lines.push({ c: 'whisper', t: 'Wren holds up the pad.' });
      lines.push({ c: 'whisper', t: 'the boat' });
      lines.push({ c: 'whisper', t: 'i know its not sensible. im voting for it anyway. you asked' });
      return lines;
    },
    choices: [
      { label: 'The Mercy. The majority has it.', to: 'a2_mercy_approach',
        act: function (s) { s.trust('wren', -10); } },
      { label: 'The boat. Overrule them. Wren is right.', tone: 'kind', to: 'a2_river',
        show: function (s) { return !s.flag('knowsBoat'); },
        act: function (s) { s.trust('wren', 25); s.trust('bram', -15); s.soften(6); } },
      { label: 'The Mercy, but Wren stays here with Odile.', to: 'a2_mercy_approach',
        act: function (s) { s.set('leftWrenBehind'); s.trust('wren', -5); s.trust('odile', -5); } },
      { label: 'Split up. Half to each.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('splitTheGroup'); s.scar(8); s.trust('bram', -8); } }
    ]
  });

  S.add({
    id: 'a2_estate_gift',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) {
      s.take('pills', 4);
      s.soften(14); s.ease(8);
      s.set('gaveThePills');
    },
    text: [
      'Four capsules of expired amoxicillin go through the letterbox.',

      'It isn\u2019t enough for six children. It isn\u2019t really enough for one. I do it anyway, ' +
      'and the foil strip lands with a small bright sound on the tiles inside.',

      'A long silence. Then the flap lifts an inch from the inside, and a voice, ' +
      'very close and badly shaken, says:',

      '<span class="said">"Oh. Oh, you absolute —"</span> She doesn\u2019t finish. The flap drops shut.',

      { c: 'sep', t: '\u2042' },

      'Four minutes later a bundle drops from a ninth-floor window and hits the courtyard ' +
      'with a crack: a knotted pillowcase holding nine tins of soup, a packet of crackers, ' +
      'a torch with a working battery and a tea towel printed with a map of Cornwall.'
    ],
    choices: [
      { label: 'Take it all. Say thank you to a window.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.give('tinned', 9); s.soften(6); s.set('theGift'); s.set('walkedOn'); },
        toast: ['+ nine tins of soup', 'item'] },
      { label: 'Take the food. Leave the torch — they will need it more.', tone: 'kind',
        to: 'a2_mercy_approach',
        act: function (s) { s.give('tinned', 9); s.soften(12); s.set('theGift'); s.set('walkedOn'); } },
      { label: 'Take it and go back for the rest later.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.give('tinned', 9); s.harden(14); s.set('theGift'); s.set('plannedToReturn'); } }
    ]
  });

  S.add({
    id: 'a2_estate_beg',
    chapter: CH,
    place: 'Marlowe House',
    text: [
      'I tell her about Teddy. I don\u2019t dress it up: ' +
      'seventy-one, one lung, less breath every night, and we are trying to get him four miles uphill.',

      'The stairwell is quiet for a long time.',

      '<span class="said">"I\u2019m going to say no,"</span> she says at last, <span class="said">' +
      '"and I\u2019ll have to live with having said it. I want you to know I understood what I was ' +
      'saying no to. I won\u2019t pretend to myself that I didn\u2019t."</span>',

      '<span class="said">"There are six of them upstairs. Two under four. That\u2019s all my ' +
      'reasoning, and it isn\u2019t enough, and it\u2019s still the answer."</span>',

      'Then something comes through the letterbox: a bottle of water and a blister pack of co-codamol, ' +
      'eight tablets, most of a box.'
    ],
    choices: [
      { label: 'Take it. Tell her she is not a bad person.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.give('pills', 8); s.soften(10); s.set('walkedOn'); } },
      { label: 'Take it and say nothing.', to: 'a2_mercy_approach',
        act: function (s) { s.give('pills', 8); s.scar(6); s.set('walkedOn'); } },
      { label: 'Leave it on the step. You will not be bought.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.harden(10); s.scar(8); } },
      { label: 'Force the door while she is at the letterbox.', tone: 'cruel', to: 'a2_estate_up' }
    ]
  });

  S.add({
    id: 'a2_estate_holloway',
    chapter: CH,
    place: 'Marlowe House',
    /* she names the boat out loud, which is how you come to know about it */
    enter: function (s) { s.set('knowsHolloway'); s.set('knowsBoat'); },
    text: [
      '<span class="said">"Dennis,"</span> she says, without having to think. <span class="said">"Dennis Holloway. ' +
      'Boat at the sailing club. Chest like a bag of spanners."</span>',

      'A pause, and when she speaks again the careful calm has slipped a little.',

      '<span class="said">"He went up the same week as my husband. Ward Eleven. He\u2019s why ' +
      'I know about Ward Eleven."</span>',

      '<span class="said">"If it\u2019s his boat you\u2019re after, you\u2019d better understand ' +
      'what you\u2019ll find in that bed. He won\u2019t be able to tell you anything. ' +
      'But he\u2019ll have his coat. They keep the coats. They\u2019re very organised about the coats."</span>'
    ],
    choices: [
      { label: '"Thank you." Go.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(6); s.set('walkedOn'); } },
      { label: 'Ask what she means about the coats.', to: 'a2_estate_wards',
        act: function (s) { s.set('knowsTheCoats'); } },
      { label: 'Offer her the antibiotics through the letterbox.', tone: 'kind',
        show: function (s) { return s.has('pills'); }, to: 'a2_estate_gift' }
    ]
  });

  S.add({
    id: 'a2_estate_shout',
    chapter: CH,
    place: 'Fenwick estate',
    enter: function (s) { s.scar(10); s.set('shoutedInTheCourtyard'); },
    text: [
      'I tip my head back and shout up nine floors of concrete.',

      'The candle goes out.',

      'The precinct answers, and not from one direction. From the shuttered units all round the ' +
      'horseshoe, from behind the roller doors of the chemist and the bookmaker and the shop that ' +
      'sold phone cases, a humming starts in six places at once and draws together. They have ' +
      'been in there all along, standing in the dark among the stock, waiting for this.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Bram has me by the arm before the echo has died.'
    ],
    choices: [
      { label: 'Run. North-east. Do not stop at the estate edge.', to: 'a2_mercy_approach',
        act: function (s) { s.hurt(12); s.scar(10); } },
      { label: 'Get into the stairwell. Up is a direction.', tone: 'risk', to: 'a2_estate_up',
        act: function (s) { s.hurt(8); } },
      { label: 'Back to the river. The water stops them.', to: 'a2_river',
        act: function (s) { s.hurt(10); s.scar(8); } },
      { label: 'Shout again. Louder. Draw them off the tower.', tone: 'kind', to: 'a2_estate_draw' }
    ]
  });

  S.add({
    id: 'a2_estate_draw',
    chapter: CH,
    place: 'Fenwick estate',
    enter: function (s) {
      s.hurt(20); s.infect(8); s.scar(16); s.soften(16);
      s.set('drewThemOff');
    },
    text: [
      'I do the stupidest and most decent thing I have done since the eleventh of April. ' +
      'I walk backwards into the middle of the precinct, shouting at the top of my voice, ' +
      'away from the tower, away from the stairwell, away from the children behind that sign.',

      'They come. All of them, out of the units and out of the dark, converging on the noise like water ' +
      'finding a drain. I am the drain.',

      'I get out through the bin store with eleven seconds to spare, a torn coat and a ' +
      '<span class="wound">fingernail gouge down the length of my back</span>. Odile, later, ' +
      'with professional distaste: <span class="said">"Not deep, but filthy."</span>',

      { c: 'sep', t: '\u2042' },

      'Ninety yards clear, on the slip road, Bram stops me with a hand flat on my chest. ' +
      'I have not seen that look on him before.',

      '<span class="said">"Don\u2019t ever do that again,"</span> he says. His voice isn\u2019t steady. ' +
      '<span class="said">"And thank you. And don\u2019t ever do that again."</span>'
    ],
    choices: [
      { label: 'Let Odile see the back. Now, before it closes.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { if (s.has('gauze')) s.take('gauze'); s.cure(4); s.trust('odile', 15); } },
      { label: 'Say it was nothing. Keep walking.', to: 'a2_mercy_approach',
        act: function (s) { s.infect(6); s.harden(4); s.scar(6); } },
      { label: '"I would do it again."', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(8); s.trust('bram', 20); s.trust('wren', 20); } },
      { label: 'Ask Bram whether he would have.', to: 'a2_mercy_approach',
        act: function (s) { s.trust('bram', -10); s.scar(6); },
        toast: ['He does not answer. He walks ahead for an hour.', 'bad'] }
    ]
  });

  S.add({
    id: 'a2_estate_units',
    chapter: CH,
    place: 'Fenwick precinct',
    text: [
      'I try the shutters one by one, quietly, along the horseshoe.',

      'The chemist is stripped. The bookmaker is stripped. Nobody has touched the phone-case shop ' +
      'in six weeks, because it is a shop that sells phone cases.',

      'The last unit is a butcher\u2019s. The shutter is already up two feet, and the smell ' +
      'coming from under it is —',

      { c: 'sep', t: '\u2042' },

      'It isn\u2019t what I think. It is bleach: industrial, eye-watering, recent. ' +
      'Somebody has cleaned a butcher\u2019s shop, thoroughly, in the last week.',

      'Inside, in the dark, every surface is scrubbed and every blade racked and oiled. ' +
      'On the counter by the till, squared off in a neat pile, are forty-odd ' +
      '<span class="wound">lanyards with photographs on them</span>.',

      { c: 'note', t: 'ST AMARANTH MERCY \u00b7 VISITOR \u00b7 DAY PASS' }
    ],
    choices: [
      { label: 'Take one lanyard. Leave the rest just as they are.', tone: 'risk',
        to: 'a2_mercy_approach',
        act: function (s) { s.give('badge'); s.set('tookLanyard'); s.scar(12); s.set('sawTheButchers'); },
        toast: ['+ Mercy day pass', 'item'] },
      { label: 'Take the lot and burn them in the fountain.', tone: 'cruel', to: 'a2_mercy_approach',
        show: function (s) { return s.has('lighter'); },
        act: function (s) { s.harden(8); s.scar(14); s.set('burnedTheLanyards'); s.set('sawTheButchers'); } },
      { label: 'Take a boning knife and a bone saw and go.', to: 'a2_mercy_approach',
        act: function (s) { s.give('knife'); s.give('saw'); s.set('sawTheButchers'); s.scar(8); } },
      { label: 'Back out. Do not touch anything. Somebody is still using this room.', tone: 'kind',
        to: 'a2_mercy_approach', act: function (s) { s.scar(10); s.set('sawTheButchers'); } }
    ]
  });

  S.add({
    id: 'a2_estate_up',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) { s.set('wentUpTheTower'); },
    text: function (s) { return [
      'Nine floors of stairwell in the dark. At the top, a fire door, and behind the fire door ' +
      'a barricade of furniture that went up in a hurry, early on, and has been added to ' +
      'ever since.',

      'I can hear them through it. Somebody is whispering a child through a nightmare. Somebody ' +
      'else is counting under their breath, over and over: a game, or a way of not screaming.',

      'The door will give. Not quickly and not quietly, but it will give. ' +
      (s.has('cutters') ? 'I have bolt cutters' : 'I can work at the hinges') +
      ', and the others are here to add their weight.',

      { c: 'sep', t: '\u2042' },

      'On the other side of that door there are nine tins of soup, a torch with a working battery, ' +
      'four capsules of something, and six children.'
    ]; },
    choices: [
      { label: 'Go back down. All the way down. Now.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(16); s.ease(6); s.set('turnedBackAtTheDoor'); },
        toast: ['Nobody says anything about it, then or ever.', 'good'] },
      { label: 'Knock. When no one opens, leave the door intact.', to: 'a2_mercy_approach',
        act: function (s) { s.soften(6); s.set('turnedBackAtTheDoor'); } },
      { label: 'Take the door.', tone: 'cruel', to: 'a2_estate_breakin' },
      { label: 'Let Bram decide.', tone: 'risk', to: 'a2_estate_bramdecides' }
    ]
  });

  S.add({
    id: 'a2_estate_bramdecides',
    chapter: CH,
    place: 'Marlowe House',
    text: [
      'I step back from the door and say, in front of Odile and Wren: ' +
      '<span class="said">"You decide."</span>',

      'Bram understands what I have just done to him. It is all over his face.',

      '<span class="said">"No,"</span> he says. <span class="said">"No, you don\u2019t get to do that. ' +
      'You don\u2019t get to hand me the knife and then stand there being the one who didn\u2019t hold it."</span>',

      'He looks at the barricade for a long moment. Behind it, the counting goes on.',

      '<span class="said">"Eleven years I did this. Every day. Who eats, who waits, who gets moved, ' +
      'who gets left. And every day there was a form to fill in afterwards, with a name at ' +
      'the bottom, and the name was mine."</span>',

      '<span class="said">"There\u2019s no form now. So no. Down. We\u2019re going down."</span>'
    ],
    choices: [
      { label: 'Go down.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.trust('bram', 25); s.soften(12); s.set('turnedBackAtTheDoor'); } },
      { label: 'Go down, and apologise to him on the stairs.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.trust('bram', 35); s.soften(14); s.set('turnedBackAtTheDoor'); s.set('apologisedToBram'); } },
      { label: 'Overrule him. Take the door yourself.', tone: 'cruel', to: 'a2_estate_breakin',
        act: function (s) { s.trust('bram', -35); } },
      { label: 'Go down, but take the bolt cutters off him first.', tone: 'cruel',
        to: 'a2_mercy_approach',
        act: function (s) { s.trust('bram', -15); s.harden(8); s.set('turnedBackAtTheDoor'); } }
    ]
  });

  S.add({
    id: 'a2_estate_breakin',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) {
      s.harden(30); s.scar(28);
      s.trust('wren', -50); s.trust('odile', -40); s.trust('bram', -25);
      s.give('tinned', 9); s.give('pills', 4);
      s.set('tookFromTheChildren');
    },
    text: [
      'It takes nineteen minutes, the loudest of the night, and nobody ' +
      'inside the flat stops screaming for any of it.',

      'They don\u2019t fight me. I wasn\u2019t ready for that. A woman in her sixties stands in ' +
      'front of six children with a bread knife held wrong, and when the barricade finally goes she ' +
      'says <span class="said">"take it, take it, take all of it, please just —"</span> and steps aside.',

      'I take nine tins of soup, four capsules of amoxicillin and a torch with a working battery ' +
      'from six children and a woman whose name I never asked.',

      { c: 'sep', t: '\u2042' },

      'Odile does not speak to me on the stairs. Wren walks eleven feet behind me for the rest ' +
      'of the night and won\u2019t come closer. When I stop, she stops, and the gap stays ' +
      'the same.',

      'Nobody relights the candle.'
    ],
    choices: [
      { label: 'Go. Do not look back at the window.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.harden(10); } },
      { label: 'Leave the pills on the step on the way out.', to: 'a2_mercy_approach',
        act: function (s) { s.take('pills', 4); s.soften(6); s.scar(8); s.set('leftThePills'); } },
      { label: 'Go back up and give all of it back.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.take('tinned', 9); s.take('pills', 4); s.soften(18); s.scar(14);
          s.trust('wren', 25); s.trust('odile', 20); s.set('gaveItBack'); },
        toast: ['She will not open the door again. You leave it on the landing.', 'good'] },
      { label: 'Tell the others this is what surviving looks like.', tone: 'cruel',
        to: 'a2_mercy_approach',
        act: function (s) { s.harden(14); s.trust('wren', -15); s.trust('odile', -15); } }
    ]
  });

  /* ---------------------------------------------------------- the culvert */
  S.add({
    id: 'a2_culvert',
    chapter: CH,
    place: 'The culvert',
    enter: function (s) { s.set('tookCulvert'); s.scar(10); },
    text: function (s) {
      var lines = [
        'The culvert carries the stream under Quay Road and the railway and comes out, according to ' +
        'a sign nobody has read since 1987, on the far side of the embankment. It puts us ' +
        'two miles closer and spares us the open ground.',

        'It is four feet high. We go bent double through eight inches of cold water, single file, ' +
        'in the dark, for six hundred yards.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy can\u2019t go bent double. He goes on his hands and knees, his chest ' +
          'four inches above the water, and I can hear what that does to a man with one lung.');
      }
      lines.push('Four hundred yards in, my torch finds the first of them.');
      lines.push('It is standing in the water facing the wall, as if it walked in here and ran ' +
        'out of instructions. It does not turn round. We edge past it one at a time, close ' +
        'enough to touch, and it does not turn round.');
      lines.push('There are more beyond it: nine in all, each one facing a wall, each one humming.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      return lines;
    },
    choices: [
      { label: 'Keep going. Do not touch any of them.', to: 'a2_mercy_approach',
        act: function (s) { s.scar(12); s.hurt(6); } },
      { label: 'Kill them. All nine. While they are facing the wall.', tone: 'cruel',
        show: function (s) { return s.has('knife') || s.has('cutters'); },
        to: 'a2_culvert_kill' },
      { label: 'Turn one of them round. You need to see its face.', tone: 'risk',
        to: 'a2_culvert_turn' },
      { label: 'Back out. Take the river after all.', to: 'a2_river',
        act: function (s) { s.scar(8); s.hurt(4); } }
    ]
  });

  S.add({
    id: 'a2_culvert_kill',
    chapter: CH,
    place: 'The culvert',
    enter: function (s) {
      s.harden(22); s.scar(22); s.hurt(10);
      s.set('cullediInTheCulvert'); s.bump('killed', 9);
    },
    text: [
      'Nine of them, facing the wall, in eight inches of water, in a four-foot pipe.',

      'It is not a fight. It is work: wet, close, repetitive work. The only sound any of them ' +
      'makes is the hum, which goes on in each one until it physically can\u2019t, ' +
      'and stops mid-note.',

      'The ninth one is small.',

      { c: 'sep', t: '\u2042' },

      'Nobody helps me. Nobody stops me either. Bram holds the torch at the right angle for ' +
      'twenty minutes without being asked. That is a kind of taking part. We both ' +
      'know it. Neither of us will say so.',

      'Afterwards Wren won\u2019t walk through the water. Odile carries her the last two hundred yards ' +
      'on her back. The water comes over the tops of Odile\u2019s boots and she says nothing about it.'
    ],
    choices: [
      { label: 'Keep going. It is done.', to: 'a2_mercy_approach' },
      { label: 'Be sick first.', to: 'a2_mercy_approach',
        act: function (s) { s.scar(6); s.soften(4); } },
      { label: 'Say out loud that it had to be done.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.harden(10); s.trust('wren', -20); s.trust('odile', -10); } },
      { label: 'Carry the small one out of the water.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(14); s.scar(16); s.set('carriedTheSmallOne');
          s.trust('wren', 15); s.trust('odile', 12); } }
    ]
  });

  S.add({
    id: 'a2_culvert_turn',
    chapter: CH,
    place: 'The culvert',
    enter: function (s) { s.scar(18); s.infect(6); s.set('turnedOneAround'); },
    text: [
      'I put a hand on its shoulder — the fabric is sodden and underneath it the flesh is ' +
      '<span class="cold">cold and quite firm</span>, like meat out of a fridge — and I turn it ' +
      'to face me.',

      'It lets me. It turns like a mannequin on a stand, and then its face is ' +
      'four inches from mine in the torchlight.',

      'A woman of about thirty. Her eyes have gone the way they all go. The jaw hangs slack and ' +
      'the throat works steadily at the note. Across her face, under the dirt, run ' +
      '<span class="wound">long pale scars in a regular pattern</span>: ' +
      'four of them, parallel and evenly spaced, cheek to jaw.',

      'They are old, months old, which puts them before the eleventh of April. Made with ' +
      'instruments, in a hospital I would guess, by somebody who was being careful.',

      { c: 'note', t: 'On a cord around her neck, under the collar: ST AMARANTH MERCY \u00b7 ' +
        'DONOR \u00b7 WARD 11 \u00b7 H-0441' },

      'Donor. Ward Eleven. And a four-digit number that somebody thought worth stamping into metal.'
    ],
    choices: [
      { label: 'Take the tag. Show the others.', to: 'a2_mercy_approach',
        act: function (s) { s.give('badge'); s.set('knowsTheWards'); s.set('hasDonorTag'); s.scar(10);
          s.trust('odile', 10); s.trust('bram', 10); } },
      { label: 'Take the tag. Tell nobody yet.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.give('badge'); s.set('knowsTheWards'); s.set('hasDonorTag'); s.set('secretTag'); s.harden(10); } },
      { label: 'Turn her back to the wall, the way she was.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.set('knowsTheWards'); s.soften(8); s.scar(12); } },
      { label: 'End her.', tone: 'cruel', show: function (s) { return s.has('knife'); },
        to: 'a2_mercy_approach',
        act: function (s) { s.set('knowsTheWards'); s.harden(12); s.scar(14); s.bump('killed'); } }
    ]
  });

  /* ---------------------------------------------------------- arrival */
  S.add({
    id: 'a2_mercy_approach',
    chapter: CH,
    place: 'St Amaranth Mercy',
    enter: function (s) {
      s.set('atTheMercy');
      if (s.flag('wentAlone')) s.set('groupCaughtUp');
      if (s.alive('teddy')) s.set('teddyMadeIt');
    },
    text: function (s) {
      var lines = [
        'The hill takes an hour. The last quarter-mile is an avenue of lime trees, and somebody has ' +
        'been pruning them. Four miles of dead city did not get to me the way that does.'
      ];
      if (s.flag('groupCaughtUp')) {
        lines.push('I reach the gate ahead of the others. When I turn to signal that the road is ' +
          'clear, they are already coming up through the limes. ' +
          (s.alive('teddy') ? 'Bram has Teddy\u2019s arm; ' : 'Wren has the torch; ') +
          'none of them was willing to wait for my say-so.');
      }
      if (s.alive('teddy')) {
        lines.push('Teddy makes it. Nobody expected him to, least of all Odile, who has walked ' +
          'every yard of it at his shoulder with a hand ready at his elbow. At the gate he stops, ' +
          'straightens up as far as he can and puts his collar right. He is seventy-one, ' +
          'and this is a hospital.');
      } else {
        lines.push(s.partyCount()
          ? 'There are ' + (s.partyCount() + 1) + ' of us at the gate. All the way here we have ' +
            'walked with a gap where Teddy would have been. Nobody steps into it.'
          : 'I reach the gate alone. I still leave room beside me for Teddy.');
      }
      if (s.flag('heldAtTheBoat')) {
        lines.push('Down on the river the boat is still tied to the pontoon. I spent ' +
          (s.flag('leftBoatAfterLastNight') ? 'three days' : 'two days') +
          ' pretending its canopy was a roof, and the warm windows up here feel like an accusation. ' +
          (s.alive('teddy') ? 'Teddy keeps his eyes on the light, not on me.' :
            'Nobody asks whether the extra nights would have changed anything.'));
      } else if (s.flag('tookFromTheChildren')) {
        lines.push(s.flag('gaveItBack')
          ? 'Bram reads the word <em>Mercy</em> over the entrance. I left the tins on the ' +
            'landing at Marlowe House, but neither of us can stop hearing the children behind that door.'
          : 'Bram reads the word <em>Mercy</em> over the entrance and looks at the tins I ' +
            'carried out of Marlowe House. Neither of us can call this place a refuge without ' +
            'thinking of those children.');
      } else if (s.flag('drewThemOff')) {
        lines.push('The scrape from the estate has bled through my shirt. Wren checks it ' +
          'without being asked. Back in the tower, the children have had an hour of quiet.');
      } else if (s.flag('tookCulvert')) {
        lines.push('My cuffs are still wet from the culvert. When the hum rises behind the ' +
          'east wing, it is the same note I heard under the road.');
      } else if (s.flag('tookRiver')) {
        lines.push('For most of the walk the river kept them back. Up here there is no water ' +
          'between me and the humming from the east wing.');
      } else if (s.flag('tookEstate')) {
        lines.push('Somewhere below is Marlowe House, with its sign asking us to walk on. ' +
          'Up here I have come to a place that says it takes in everyone.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('St Amaranth Mercy is a Victorian infirmary with two modern wings. Every window ' +
        'is lit. Somewhere behind the kitchens a generator runs with the deep, ' +
        'steady note of a machine that has been serviced.');
      lines.push('The front doors stand open, and warm yellow light spills down the steps onto the gravel. ' +
        'Inside, at a desk under a sign that says RECEPTION, a man in a clean fleece sits reading a ' +
        'paperback, waiting.');
      lines.push('Over the door, carved in 1874, is the hospital\u2019s motto:');
      lines.push({ c: 'note', t: 'WE TAKE IN ALL WHO COME' });
      if (s.flag('warnedAboutFront')) {
        lines.push('A woman in a tower block told me: <em>go in the back.</em>');
      } else if (s.flag('knowsTheWards')) {
        lines.push('The tag from the culvert said Ward Eleven. I can still see the face above it.');
      }
      return lines;
    },
    choices: [
      { label: 'Walk up the steps and through the front door.', hint: 'as invited', to: 'a3_reception' },
      { label: 'Go round. Find the back.', tone: 'risk', hint: 'away from reception',
        to: 'a3_back' },
      { label: 'Send one person in and keep the rest outside.', tone: 'risk', to: 'a3_split' },
      { label: 'Watch the building for a while first.', to: 'a2_watch' },
      { label: 'Turn around. Go back to the river.', tone: 'kind',
        show: function (s) { return s.flag('knowsBoat'); }, to: 'a3_refuse' },
      { label: 'Ask for a bed for Teddy before you ask for one for yourself.', tone: 'kind',
        show: function (s) {
          return s.flag('heldAtTheBoat') && s.alive('teddy') &&
            (!s.flag('wentAlone') || s.flag('groupCaughtUp'));
        },
        to: 'a3_reception',
        act: function (s) { s.set('askedForTeddysBed'); s.trust('teddy', 12); s.scar(4); } },
      { label: 'Tell the receptionist what happened at Marlowe House.', tone: 'risk',
        show: function (s) { return s.flag('tookFromTheChildren'); },
        to: 'a3_reception',
        act: function (s) { s.set('confessedAtReception'); s.trust('wren', 8); s.scar(8); } }
    ]
  });

  S.add({
    id: 'a2_watch',
    chapter: CH,
    place: 'The lime avenue',
    enter: function (s) { s.set('watchedTheMercy'); },
    text: [
      'An hour and a little more in the wet grass under the lime trees, watching a hospital work.',

      'A man crosses from the main building to the kitchens carrying a covered tray. ' +
      'Fifteen minutes later he comes back with it uncovered and empty. Two people in scrubs walk the ' +
      'perimeter of the east wing with torches, talking, and one of them laughs at something.',

      'Then double doors open at the back of the east wing and four people wheel out ' +
      'a trolley with a shape on it under a sheet. They take it down a service road and come back ' +
      'eleven minutes later with the trolley empty.',

      'Twenty minutes later they do it again.',

      { c: 'sep', t: '\u2042' },

      'And every twenty minutes, as regular as breathing, from the east wing: ' +
      'the sound of a great many people humming in a large room with hard floors.',

      { c: 'hum', t: 'h m m m m m m m' },

      'The lights never so much as flicker. Whatever else St Amaranth Mercy is, it is not improvising.'
    ],
    choices: [
      { label: 'Front door. Walk in like a patient.', to: 'a3_reception' },
      { label: 'The service road. Follow where the trolleys go.', tone: 'risk', to: 'a3_service' },
      { label: 'The back of the east wing. Those double doors.', tone: 'risk', to: 'a3_back' },
      { label: 'Send one person in alone.', tone: 'risk', to: 'a3_split' },
      { label: 'Leave. All of this is a warning and you have had four of them.', tone: 'kind',
        show: function (s) { return s.flag('knowsBoat'); }, to: 'a3_refuse' }
    ]
  });
})();
