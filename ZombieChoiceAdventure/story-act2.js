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
        'The lorry fills the mouth of the lane from wall to wall, white and enormous and softly ticking ' +
        'as the night cools it. FRESH DAILY, in a font chosen by somebody in a meeting.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy has to stop every twenty yards. I have stopped pretending this is a rest for ' +
          'everybody. Odile counts his breaths with two fingers on his wrist and does not report the number.');
      } else {
        lines.push('There are four of us now, and I am walking faster than I should, and nobody ' +
          'has said a single word since the yard wall.');
      }
      lines.push('There is no way past it. There is over it, or through it, or back up the lane and out ' +
        'onto Ferry Street itself, which is where the fifty are.');
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
      'The driver is still in it. Seatbelt on, hands at ten and two, head back against the rest — ' +
      'and a neat dark hole under the chin where he solved the whole problem himself in the first week ' +
      'with a weapon that is no longer in the cab, because somebody got here before me.',

      'What they did not take: three loose rounds rolling in the door pocket, a road atlas open at ' +
      'the wrong county, and a photograph taped to the dash of a dog.',

      { c: 'note', t: 'Clipped to the sun visor, a delivery manifest. 14 TONNES CHILLED. ' +
        'Under it, in biro, in a different hand: THEY ARE NOT MEAT. DO NOT OPEN. 11/4' },

      'The day the Hush began. Somebody wrote that warning and then walked away and ' +
      'left the trailer sealed, and the trailer has been humming ever since.'
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
          s.keep('dogphoto', 'I did not know him. I know the dog\u2019s face better than I know most of the living.');
        },
        toast: ['You peel it off carefully, so as not to tear the corners.', 'keepsake'] },
      { label: 'Tear the biro line off the manifest and pocket it.', to: 'a2_lorry_climb',
        hint: 'the last handwriting of the old world',
        act: function (s) {
          s.set('leftItSealed'); s.scar(4);
          s.keep('manifest', 'On the first day, somebody still believed a warning was a thing worth writing.');
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
      'The handle is a lever as long as my arm and it goes over with a clang that I feel in ' +
      'my teeth.',

      'Fourteen tonnes of chilled capacity. Six weeks without power. What comes out first is the ' +
      'air, and the air is a physical object — warm, sweet, thick enough to lean on, and it puts ' +
      'Bram on his knees retching before the doors have finished swinging.',

      'They are standing up. All of them. Shoulder to shoulder in the dark, packed the way a lift ' +
      'is packed, perhaps sixty people who were loaded in alive and sealed in alive and have been ' +
      '<span class="wound">standing in there in the dark for thirty days humming</span>.',

      'Nothing moves. Nothing comes out. Sixty faces turn, very slowly, in the half-light, ' +
      'and the note they are holding does not falter at all.',

      { c: 'hum', t: 'h m m m m m m m' },

      'They have been doing this since the eleventh of April. Not dying. Not leaving. ' +
      '<em>Waiting</em>, in a box, for something that has not happened yet.'
    ],
    choices: [
      { label: 'Close the doors. Very, very slowly.', to: 'a2_quay',
        act: function (s) { s.scar(10); s.set('closedThemIn'); },
        toast: ['The lever goes back over. Nothing follows you.', 'bad'] },
      { label: 'Burn it. Now, while they are still standing still.', tone: 'cruel',
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
      'Grain alcohol goes in a wide arc off the end of the trailer and the lighter does the rest, ' +
      'and the thing that happens next is not like fire in a film.',

      'It is fast and blue and almost silent for the first four seconds. Then sixty people begin to ' +
      'burn in an enclosed steel box, and the humming does not stop — it <em>changes pitch</em>, ' +
      'rising together, sixty throats going up the scale in perfect unison until it is a sound that ' +
      'does not belong in a human throat at all, and holds there, and holds, and holds.',

      'Nobody runs. Not one of them tries to come out of the open doors. They stand in it.',

      { c: 'sep', t: '\u2042' },

      'Wren has her hands over her ears, which is the first time in forty-one days she has admitted ' +
      'that a sound can reach her. Odile is watching with her head tilted, taking notes behind her eyes.',

      '<span class="said">"They did not run,"</span> she says afterwards, on the road, out of nowhere. ' +
      '<span class="said">"Pain is a survival instinct. You only feel it if something still wants ' +
      'to survive."</span>'
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
      'I step up into the trailer and nobody stops me, and that includes the sixty.',

      'Inside, the humming is not a sound. It is a <em>pressure</em>, in the sinuses and the back ' +
      'teeth and the long bones, and walking into it is like walking chest-deep into a river.',

      'They part for me. That is the thing I will not be able to explain afterwards to anyone ' +
      'who was outside. Sixty bodies shuffle a half-step each to make a corridor, without looking, ' +
      'the way a crowd makes room for a stretcher.',

      'At the far end of the trailer, against the bulkhead, there is a space cleared in the middle ' +
      'of all that packed flesh — a circle of empty floor about a yard across — and in the centre of ' +
      'it, lying on its side, perfectly clean, is <span class="cold">a child\u2019s shoe</span>.',

      'They are standing around it. All of them. They have been standing around it for thirty days.',

      { c: 'hum', t: 'h m m m m m m m' },

      'I do not know what it means. my body knows something, though, because my own throat ' +
      'has opened and I am <span class="wound">humming with them</span>, and I did not decide to.'
    ],
    choices: [
      { label: 'Take the shoe.', tone: 'rot', to: 'a2_quay',
        act: function (s) { s.set('tookTheShoe'); s.infect(10); s.scar(12); },
        toast: ['Nothing happens. That is somehow worse.', 'rot'] },
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
      'I close my mouth. It takes everything I have, and it feels — precisely — like holding ' +
      'a sneeze, or standing up in a church.',

      'Sixty heads come round at once.',

      'Not fast. That is what I will remember. They turn to me with a kind of slow institutional ' +
      'disappointment, like a committee, and the nearest one lifts both hands and puts them on my ' +
      'face — not clawing, not biting, just <span class="wound">holding my jaw and trying to open it</span> ' +
      'with the patient strength of something that has all night.',

      'I get out because Bram comes three steps up into that and gets a fistful of my collar. ' +
      'I lose a boot and a strip of cheek doing it.'
    ],
    choices: [
      { label: 'Out. Run. Do not look back at the doors.', to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); } },
      { label: 'Close the doors behind you first.', to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); s.set('closedThemIn'); s.scar(6); } },
      { label: 'Burn it before it follows.', tone: 'cruel',
        show: function (s) { return s.has('lighter') && s.has('flask'); },
        to: 'a2_burn_lorry', act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); } },
      { label: 'Sit down on the kerb and let your hands stop shaking first.',
        to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); s.ease(6); s.scar(4); } },
      { label: 'Thank Bram. Out loud, in front of the others.', tone: 'kind', to: 'a2_quay',
        act: function (s) { s.trust('bram', 35); s.set('bramSavedYou'); s.soften(6); } },
      { label: 'Stop resisting. Let them open your mouth.', tone: 'rot', to: 'end_turned',
        act: function (s) { s.infect(80); s.set('letTheNoteIn'); } }
    ]
  });

  S.add({
    id: 'a2_lorry_climb',
    chapter: CH,
    place: 'Quay Road',
    text: function (s) {
      var lines = [
        'Wing mirror, door handle, across the bonnet, down the far side. Bram goes first and makes ' +
        'it look like a thing he does for exercise.'
      ];
      if (withTeddy(s)) {
        lines.push('Getting Teddy up and over takes eleven minutes, four hands, and a silence from him ' +
          'so total and so deliberate that when he finally does cough, on the far side, into both palms, ' +
          'he looks around at all of us with naked apology, like a man who has dropped a glass in a library.');
      } else {
        lines.push('It takes under a minute for the four of us. I am getting good at this. ' +
          'That is its own kind of grief.');
      }
      lines.push('From the top of the cab I can see the whole of Quay Road, the river beyond it, ' +
        'and four miles north-east, up on the hill, lit — <em>actually lit, with electric light</em> — ' +
        'the long Victorian frontage of St Amaranth Mercy.');
      lines.push('There is a building with power in a county that has had none for six weeks.');
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
        'Eleven inches of clearance at the rear axle, forty feet of diesel-smelling dark, and I go ' +
        'first because I suggested it.',

        'Halfway under, flat on my back, I learn that the humming is louder down here — conducted ' +
        'through the chassis, through the floor pan, through the six inches of panel directly above ' +
        'my face. Sixty of them, standing on the other side of that panel.',

        'And then, above me, through the steel: a sound like a shoe placed carefully down.',
        'And then another.',
        '<em>They are following me along the trailer.</em>'
      ];
      if (withTeddy(s)) {
        lines.push('Behind me in the dark, Teddy is coming through on his elbows, and his breathing ' +
          'in this enclosed space is the loudest thing in the county.');
      }
      return lines;
    },
    choices: [
      { label: 'Keep going. Fast. Everyone, now.', to: 'a2_quay',
        act: function (s) { s.hurt(6); s.scar(8); } },
      { label: 'Stop. Absolute stillness until they lose you.', tone: 'risk', to: 'a2_under_still' },
      { label: 'Back out. Take your chances on Ferry Street instead.', to: 'a2_ferry',
        act: function (s) { s.scar(6); } },
      { label: 'Hum. Give them what they want and walk out the other side.', tone: 'rot',
        to: 'a2_quay',
        act: function (s) { s.infect(14); s.set('hummedUnder'); s.scar(6); },
        toast: ['The footsteps stop. You crawl out unharmed, and that frightens you more.', 'rot'] }
    ]
  });

  S.add({
    id: 'a2_under_still',
    chapter: CH,
    place: 'Under the trailer',
    enter: function (s) { s.scar(12); s.advance(0); },
    text: function (s) {
      var lines = [
        'We stop. All of us. Flat on our backs in eleven inches of dark under fourteen tonnes of ' +
        'standing dead.',

        'Forty minutes.',

        'Forty minutes under a lorry. I think of June in the photo booth at the county fair, ' +
        'trying to fit both our heads into the fourth frame. I have not said her name aloud ' +
        'for nineteen days. I count them twice to be sure.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy does not cough. Not once, in forty minutes. I will never know what that ' +
          'cost him and he will never tell me, and when I finally crawl out he is grey to the lips ' +
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
            s.keep('gauzescrap', 'I kept the square I took off him. I cannot say why. I tried to throw it away and could not.');
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
      'I take Ferry Street because there is no time and no better idea, and Ferry Street takes ' +
      'something from each of us in exchange.',

      'It is not a chase. I keep expecting it to become a chase and it never does — it is a ' +
      '<em>crowd</em>, and I am going the wrong way through it, and every single one of them is ' +
      'reaching as I pass with that same slow grip, trying to turn me round, trying ' +
      'to get my face toward them, trying to get my mouth open.',

      'Bram goes down at the betting shop with three of them on him and comes up again with the ' +
      (s.has('cutters') ? 'bolt cutters' : 'broken length of railing') +
      ' swinging and a <span class="wound">flap of his scalp hanging over one eye</span>. ' +
      'He does not stop moving. He does not make a sound. Eleven years of corrections.',

      'I come out at the Quay Road end with everyone still upright. None of us expected that.'
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
        'Quay Road runs along the water. On my left, the river, black and wide and moving. ' +
        'On my right, the Fenwick estate — four tower blocks and a shopping precinct, every window ' +
        'dark except one on the ninth floor of Marlowe House, where somebody has a candle.'
      ];
      if (s.flag('sawTheLights')) {
        lines.push('Ahead and above it all, four miles north-east, St Amaranth Mercy is lit up like ' +
          'a liner. We have all seen it now. Nobody has said what it means yet.');
      } else {
        lines.push('And ahead, four miles north-east, up on the hill: lights. Electric lights, ' +
          'burning steadily, in a county with no power. St Amaranth Mercy.');
        lines.push('Everybody stops walking at the same moment.');
        s.set('sawTheLights');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (withTeddy(s)) {
        lines.push('Odile takes me aside by the elbow. <span class="said">"Two miles," she says. ' +
          '"He has two miles in him, maybe three. Not four. I am telling you now, while it is still ' +
          'information and not an emergency."</span>');
      }
      lines.push('There is the river path, which is long and quiet and open. There is the estate, ' +
        'which is short and close and has a candle in it. There is the culvert under the road, ' +
        'which is neither.');
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
      var lines = ['I ask. It is not a thing this group does, and the asking itself changes ' +
        'the temperature of the night.'];
      lines.push('<span class="said">"Estate," </span> Bram says immediately. ' +
        '<span class="said">"Short. And a candle means a person, and a person means a room that has ' +
        'held, and I would like to see a room that has held."</span>');
      lines.push('<span class="said">"River," </span> says Odile. <span class="said">"Open ground. ' +
        'I can see what is coming and I can hear what is coming, and I have had enough of corridors ' +
        'for one lifetime."</span>');
      if (withTeddy(s)) {
        lines.push('<span class="said">"The short one," </span> Teddy says. <span class="said">' +
          '"Whichever it is. Do not choose the long one on my account, because the long one is the ' +
          'one where you have to decide about me halfway down it."</span>');
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
      'I give it an hour in the lee of an overturned skip, and the hour costs me the last of the dark.',

      'Teddy sleeps sitting up against my shoulder and his breathing gets easier for a while, ' +
      'and Odile sleeps for the first time in my presence in forty-one days, which tells me ' +
      'more about how bad she thinks it is than anything she has said.',

      'Wren does not sleep. Wren sits watching the river with her chin on her knees, and when I ' +
      'look over she is doing something with her mouth — opening it, closing it, silently, ' +
      'over and over, the way I would test a door I was afraid was locked.',

      { c: 'whisper', t: 'She is checking whether her voice is still in there.' }
    ],
    choices: [
      { label: 'Tell her it will come back. Take the river path with her.', tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 15); s.soften(5); } },
      { label: 'Let her have the silence. Lead the group through the estate.', tone: 'kind', to: 'a2_estate',
        act: function (s) { s.trust('wren', 10); s.scar(4); } },
      { label: 'Ask her to try. Out loud. Once.', tone: 'risk', to: 'a2_wren_voice' },
      { label: 'Wake everybody. Take the culvert before the light goes.', to: 'a2_culvert' }
    ]
  });

  S.add({
    id: 'a2_wren_voice',
    chapter: CH,
    place: 'Quay Road',
    text: [
      'She looks at me for a long time. Then she nods, and turns to face the water, and takes a breath.',

      'What comes out is not a word. It is a dry click, and then a thin cracked vowel about two ' +
      'seconds long, and it is the ugliest, most wonderful sound I have heard since the world ended.',

      'Her hand goes straight to her own throat, surprised.',

      'And out on the water, forty yards out, on the far bank — something that had been standing ' +
      'still in the reeds for the whole hour turns its head.',

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
        'Wren is right about the water. Twice on the river path I see them at the edge of it — ' +
        'standing in the shallows up to the shins, facing out, perfectly still, humming at the far bank ' +
        'like a congregation facing an altar nobody can see.',

        'They do not come in after me. Whatever the water is to them, it is a wall.',

        { c: 'sep', t: '\u2042' },

        'Two miles up, where the path passes the old sailing club, there is a pontoon with four boats ' +
        'still moored to it, and three of them are swamped and on the bottom.',

        'The fourth is a twenty-six foot cabin cruiser, riding high, rocking gently, ' +
        'with its canopy zipped and its hull intact and the name <em>LUCKY II</em> across the transom.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy stops dead when he sees it and puts a hand on my arm and does not say ' +
          'anything at all, and the hand is shaking.');
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
      'She looks at the boat for a long moment with her arms folded.',

      '<span class="said">"I think it is the best idea anybody has had in six weeks," she says, ' +
      '"and I think you should understand what it is before you fall in love with it. It is a hole ' +
      'in the water. No power, no charts, no fuel we have counted, and a river that goes out to a ' +
      'sea none of us can sail."</span>',

      'She unfolds her arms.',

      '<span class="said">"But they stop at the edge of the water. I have watched them do it four ' +
      'times tonight. So yes. Yes. Find the keys."</span>'
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

      'There is a fuel gauge and it reads three-quarters, and that is the single most hopeful object ' +
      'any of us have seen since the eleventh of April.'
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
      'I take the cabin apart in eleven minutes with ' + (s.partyCount() + 1) +
      ' of us and one wind-up torch.',

      'Where they always are turns out to mean: not here. Not in the galley drawer, not in the chart ' +
      'table, not in the pocket of the oilskin, not taped under the wheel, not in the tin marked TEA.',

      { c: 'sep', t: '\u2042' },

      'What I do find, in the chart table, under a folded map of the estuary, is a hospital ' +
      'appointment card.',

      { c: 'note', t: 'ST AMARANTH MERCY \u00b7 RESPIRATORY OUTPATIENTS\nMR D. HOLLOWAY \u00b7 WARD 11 \u00b7 ' +
        'THURS 09:40\nPLEASE BRING THIS CARD AND A LIST OF YOUR MEDICATIONS' },

      'The card has the same name as the note in the locker. If the keys are still in ' +
      'Dennis Holloway\u2019s coat, they are four miles up the hill, in the only building with lights.'
    ]; },
    choices: [
      { label: 'Take Holloway\u2019s appointment card to the Mercy.', to: 'a2_mercy_approach',
        act: function (s) { s.set('hollowayCard'); s.set('boatWillKeep'); },
        toast: ['Ward 11. A name. A room number.', 'item'] },
      { label: 'Take the card and tell nobody what it means.', tone: 'cruel',
        to: 'a2_mercy_approach',
        act: function (s) { s.set('hollowayCard'); s.set('boatWillKeep'); s.set('secretCard'); s.harden(10); } },
      { label: 'Leave the card. The boat is a fantasy and the Mercy is a plan.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.harden(5); } },
      { label: 'Hide the family aboard and go to the Mercy alone.', tone: 'risk',
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
      ' and I get my hand into a loom of forty-year-old ' +
      'marine wiring and I learn, over the following twenty minutes, that a diesel inboard with ' +
      'an electronic cut-off is not a Vauxhall Astra.',

      'What I achieve is: the horn.',

      'One single enormous blast across two hundred yards of open water, rolling off the far bank, ' +
      'coming back at me, and then — like something being poured — the humming starts up all along ' +
      'the opposite shore at once.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Hundreds. Not dozens. The far bank of the river has been full of them this entire time, ' +
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
        'I hold at the pontoon for two days, because the water is a wall and because for two days ' +
        'it is possible to believe that a wall is the same thing as a home.',

        'It is the best time any of us have had. That is the cruelty of it. I eat tinned peaches ' +
        'sitting on the coachroof. Wren finds the paperback readable from page forty. Bram laughs once, ' +
        'at something Odile says about a horse, and the sound is so unfamiliar that everybody stops.'
      ];
      if (withTeddy(s)) {
        lines.push('And Teddy gets worse. Not dramatically. The way a tide comes in. On the second ' +
          'night his breathing acquires a new sound underneath the old one — a fine dry crackle, ' +
          'like someone screwing up paper in another room — and Odile hears it from the cockpit and ' +
          'closes her eyes.');
      } else {
        lines.push('And on the second night the far bank fills up, and stays full, and the humming ' +
          'does not stop for nine hours, and we all stop pretending that the wall is a home.');
      }
      lines.push('There is almost no food left on this boat. There are no keys on this boat. ' +
        'The lit building four miles north-east has both beds and people to answer to.');
      return lines;
    },
    choices: [
      { label: 'Everyone goes to the Mercy. Together.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.soften(4); } },
      { label: 'Scout the hill alone. Tell them to follow when the road is clear.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('wentAlone'); s.set('boatWillKeep'); s.scar(8); s.soften(6); } },
      { label: 'Take Bram. Leave Odile and Wren with the boat.', to: 'a2_mercy_approach',
        act: function (s) { s.set('tookBram'); s.set('boatWillKeep'); } },
      { label: 'Stay one more day, then follow the others up to the Mercy.', tone: 'risk', to: 'a2_boat_lastnight',
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
        'I bargain for one more day. By afternoon the last tin is empty. The paperback lies open ' +
        'face-down in the cockpit, its pages swelling as the river mist comes in.',
        'At dusk the humming starts on the far bank again. Nobody gets up to look. That is when ' +
        'I understand what staying has bought me: not safety, only practice at ignoring it.'
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
      'The precinct is a concrete horseshoe of shuttered units with a dry fountain in the middle, ' +
      'and it is the quietest place I have been in six weeks — not the quiet of nothing here, ' +
      'but the quiet of something holding still.',

      'The candle is on the ninth floor of Marlowe House. From the courtyard I can see it moving ' +
      'about behind the glass: somebody walking from room to room with a light, ' +
      'in a dead city.',

      { c: 'sep', t: '\u2042' },

      'Taped inside the glass of the tower entrance, at eye height, facing out, there is a sheet ' +
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
      { label: 'Try the other units. They said nothing worth taking — check.', to: 'a2_estate_units' },
      { label: 'Go up. Nine floors. Take what they have.', tone: 'cruel', to: 'a2_estate_up' },
      { label: 'Shout up to them. Ask about the hospital.', tone: 'risk', to: 'a2_estate_shout' }
    ]
  });

  S.add({
    id: 'a2_estate_knock',
    chapter: CH,
    place: 'Marlowe House',
    text: [
      'I knock. Four times, slowly, with my knuckle, in the way that is unmistakably a person ' +
      'and not a thing.',

      'Nine floors up the candle stops moving.',

      'Four minutes later a voice comes down the stairwell, thinned by distance, a woman in her sixties ' +
      'doing an extremely good job of sounding calm.',

      '<span class="said">"Please go away. I am not being unkind. There are six children in this ' +
      'flat and two of them are under four and I cannot — I will not — open this door. Please."</span>',

      'A pause. Then, more quietly, and from much closer, as though she has come down two flights ' +
      'to say it properly:',

      '<span class="said">"If you are going up to the Mercy, do not go in the front. ' +
      'They are letting people in the front."</span>'
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
      'The silence from the stairwell goes on long enough that I think she has gone.',

      '<span class="said">"My husband went up in the second week," she says. "With his brother. ' +
      'They were taking anybody then. Beds, hot water, a doctor. Proper triage, lanyards, ' +
      'the whole performance."</span>',

      '<span class="said">"His brother came back on the eleventh of May and stood in that courtyard ' +
      'where you are standing and told me what the wards are for now. And then he asked to come up, ' +
      'and I said no, because of what he had helped them do, and he sat down against that fountain ' +
      'and he was still sitting there four days later."</span>',

      { c: 'sep', t: '\u2042' },

      '<span class="said">"They are not lying to you about the beds. That is the thing. ' +
      'There really are beds. There is really a doctor. Everything they tell you at the front door ' +
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
      'She tells me. It takes ninety seconds and she does it in the flat, careful voice of a woman ' +
      'who has had to say it before to people who did not believe her.',

      '<span class="said">"They keep them alive. The turned ones. Strapped, fed, washed — properly ' +
      'washed, she said he said, it is a real hospital, they are not animals about it. Whole wards of ' +
      'them lying there humming at the ceiling."</span>',

      '<span class="said">"And they take the blood. Every day, a little, off every one of them, ' +
      'and they do something to it, and what comes out the other end they give to the well ones ' +
      'as a treatment. And it works. That is the part you need to hear properly. ' +
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
      lines.push('<span class="said">"Not going," </span> Bram repeats. <span class="said">' +
        '"To the only building in this county with electricity in it."</span>');
      if (withTeddy(s)) {
        lines.push('<span class="said">"On the word of a frightened woman through a door," </span>' +
          'he says, <span class="said">"you want to turn a dying man around and walk him back ' +
          'down the hill."</span>');
      }
      lines.push('Odile says nothing for a long moment. Then: <span class="said">"She said it works."</span>');
      lines.push('<span class="said">"She did say that," </span> I agree.');
      lines.push('<span class="said">"No," </span> Odile says. <span class="said">"Listen to me. ' +
        'I am not arguing with you. I am telling you that in thirty years I have never once heard ' +
        'anybody describe an atrocity and a cure in the same breath and be wrong about <em>both</em>."</span>');
      return lines;
    },
    choices: [
      { label: 'Go anyway. In the back. Eyes open.', to: 'a2_mercy_approach',
        act: function (s) { s.set('warnedAboutFront'); s.scar(6); } },
      { label: 'Go to the river instead. Find the boat.', to: 'a2_river',
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
      var lines = ['Hands, in a dry fountain, while the precinct holds its breath.'];
      lines.push('Bram: the Mercy. Immediately, without apology.');
      lines.push('Odile: the Mercy, and she says <span class="said">"with my eyes open, and with ' +
        'something sharp in my coat."</span>');
      if (withTeddy(s)) {
        lines.push('Teddy does not raise his hand at all. <span class="said">"I am the reason you ' +
          'are going," </span>he says. <span class="said">"I do not get a vote on it. That is not ' +
          'humility, it is procedure."</span>');
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
      'Four capsules of expired amoxicillin go through a letterbox in a tower block before we leave.',

      'It is not enough for six children. It is not enough for one child, really. I do it anyway, ' +
      'and the foil strip makes a small bright sound on the hall tiles on the other side.',

      'A long silence. Then the letterbox flap lifts an inch from the inside and a voice says, ' +
      'very close and quite broken:',

      '<span class="said">"Oh. Oh, you absolute — "</span> and does not finish, and the flap closes.',

      { c: 'sep', t: '\u2042' },

      'Four minutes later a bundle comes out of a ninth floor window and lands in the courtyard ' +
      'with a crack: a pillowcase, knotted, containing nine tins of soup, a packet of dry crackers, ' +
      'a torch with a working battery, and a tea towel with a map of Cornwall on it.'
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
      'I tell her about Teddy. I do not perform it. I just say it: seventy-one, one lung, ' +
      'less breath each night, and we are trying to get him four miles uphill.',

      'The stairwell is quiet for a long time.',

      '<span class="said">"I am going to say no," </span> she says at last, <span class="said">' +
      '"and I am going to have to live with having said it, and I want you to know that I understood ' +
      'exactly what I was saying no to. I am not going to pretend to myself that I did not."</span>',

      '<span class="said">"There are six of them up here. Two are under four. That is the whole ' +
      'of my reasoning and it is not enough and it is still the answer."</span>',

      'Something comes through the letterbox: a bottle of water and a blister pack of co-codamol, ' +
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
      '<span class="said">"Dennis," </span> she says immediately. <span class="said">"Dennis Holloway. ' +
      'Boat at the sailing club. Chest like a bag of spanners."</span>',

      'A pause, and when she speaks again the careful calm has slipped a little.',

      '<span class="said">"He went up the same week as my husband. Ward Eleven. He is why ' +
      'I know about Ward Eleven."</span>',

      '<span class="said">"If your business up there is with Dennis Holloway, then you had better ' +
      'understand what you are going to find in that bed. He will not be able to tell you anything. ' +
      'But he will have his coat. They keep the coats. They are very organised about the coats."</span>'
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
      'I put my head back and I shout up nine floors in a concrete courtyard.',

      'The candle goes out instantly.',

      'And the precinct answers. Not from one direction. From the shuttered units all around the ' +
      'horseshoe, from behind the roller doors of the chemist and the bookmaker and the shop that ' +
      'sold phone cases — a humming that starts in six places at once and converges, because they ' +
      'have been in there the whole time, standing in the dark among the stock, waiting for exactly this.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Bram has me by the arm before the echo is finished.'
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
      'I do the single most stupid and most decent thing I have done since the eleventh of April: ' +
      'I walk backwards into the middle of the precinct shouting at the top of my lungs, ' +
      'away from the tower, away from the stairwell, away from six children and two under four.',

      'They come. All of them, out of the units, out of the dark, converging on the noise like water ' +
      'finding the drain — and the drain is me.',

      'I get out through the bin store by eleven seconds and a torn coat and a line of ' +
      '<span class="wound">fingernail down the length of my back</span> that Odile will later ' +
      'describe, with professional disgust, as "not deep, but filthy".',

      { c: 'sep', t: '\u2042' },

      'Ninety yards clear, on the slip road, Bram stops me with a hand flat on my chest and ' +
      'looks at me with an expression I have not seen on him before.',

      '<span class="said">"Do not ever do that again," </span> he says, and his voice is not steady, ' +
      '<span class="said">"and thank you, and do not ever do that again."</span>'
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

      'The chemist is stripped. The bookmaker is stripped. The phone case shop has been untouched ' +
      'by anybody in six weeks because it is a shop that sells phone cases.',

      'The last unit is a butcher\u2019s, and the shutter is already up two feet, and the smell ' +
      'coming out from under it is — ',

      { c: 'sep', t: '\u2042' },

      'It is not what I think. It is bleach. Industrial, eye-watering, recent. ' +
      'Somebody has cleaned a butcher\u2019s shop, thoroughly, within the last week.',

      'Inside, in the dark, every surface is scrubbed, every blade is racked and oiled, ' +
      'and on the counter by the till, stacked and squared off, is a neat pile of forty-odd ' +
      '<span class="wound">lanyards with photographs on them</span>.',

      { c: 'note', t: 'ST AMARANTH MERCY \u00b7 VISITOR \u00b7 DAY PASS' }
    ],
    choices: [
      { label: 'Take one lanyard. Leave the rest exactly as they are.', tone: 'risk',
        to: 'a2_mercy_approach',
        act: function (s) { s.give('badge'); s.set('tookLanyard'); s.scar(12); s.set('sawTheButchers'); },
        toast: ['+ Mercy day pass', 'item'] },
      { label: 'Take the lot and burn them in the fountain.', tone: 'cruel', to: 'a2_mercy_approach',
        show: function (s) { return s.has('lighter'); },
        act: function (s) { s.harden(8); s.scar(14); s.set('burnedTheLanyards'); s.set('sawTheButchers'); } },
      { label: 'Take a boning knife and a cleaver and go.', to: 'a2_mercy_approach',
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
      'Nine floors of stairwell in the dark, and at the top, a fire door, and behind the fire door ' +
      'a barricade of furniture that six adults built in a hurry in the first week and have been ' +
      'improving ever since.',

      'I can hear them through it. Somebody is whispering a child through a nightmare. Somebody ' +
      'else is counting, very quietly, over and over, which is either a game or a way of not screaming.',

      'The door will come. Not quickly, not quietly, but it will come — ' +
      (s.has('cutters') ? 'I have bolt cutters' : 'I can work at the hinges') +
      ' and leverage, and the others are here to help.',

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
      'I step back from the door and I say, out loud, in front of Odile and Wren: ' +
      '<span class="said">"You decide."</span>',

      'And Bram understands exactly what I have just done to him, and his face says so.',

      '<span class="said">"No," </span>he says. <span class="said">"No, you do not get to do that. ' +
      'You do not get to hand me the knife and then stand there being the one who did not hold it."</span>',

      'He looks at the barricade for a long moment. Somewhere behind it, the counting continues.',

      '<span class="said">"Eleven years I did this. Every day. Who eats, who waits, who gets moved, ' +
      'who gets left. And every single day there was a form to fill in afterwards, and a name at ' +
      'the bottom of the form, and the name was mine."</span>',

      '<span class="said">"There is no form now. So no. Down. We are going down."</span>'
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
      'It takes nineteen minutes and it is the loudest nineteen minutes of the night, and nobody ' +
      'inside that flat stops screaming for any of it.',

      'They do not fight me. That is what I was not ready for. A woman in her sixties stands in ' +
      'front of six children with a bread knife held wrong, and when the barricade finally goes she ' +
      'says <span class="said">"take it, take it, take all of it, please just — "</span> and steps aside.',

      'I take nine tins of soup, four capsules of amoxicillin and a torch with a working battery ' +
      'from six children and a woman whose name I never asked for.',

      { c: 'sep', t: '\u2042' },

      'Odile does not speak to me on the stairs. Wren walks eleven feet behind me for the rest ' +
      'of the night and will not come closer, and when I stop, she stops, maintaining the distance ' +
      'exactly, like a tide line.',

      'The candle does not come back on.'
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
        'The culvert takes the stream under Quay Road and the railway and comes out, according to ' +
        'the sign nobody has read since 1987, on the far side of the embankment — which puts me ' +
        'two miles closer and saves me the open ground.',

        'It is four feet high. I go bent double in eight inches of cold water, in single file, ' +
        'in the dark, for six hundred yards.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy cannot go bent double. Teddy goes on his hands and knees in eight inches ' +
          'of water with his chest four inches above it, and what that does to a man with one lung ' +
          'is a thing I will hear for the rest of my life.');
      }
      lines.push('Four hundred yards in, my torch finds the first of them.');
      lines.push('It is standing in the water facing the wall, as though it walked in here and ran ' +
        'out of instructions. It does not turn around. We edge past it one at a time, close ' +
        'enough to touch, and it does not turn around.');
      lines.push('There are nine more. All facing the walls. All humming.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      return lines;
    },
    choices: [
      { label: 'Keep going. Do not touch any of them.', to: 'a2_mercy_approach',
        act: function (s) { s.scar(12); s.hurt(6); } },
      { label: 'Kill them. All nine. While they are facing the wall.', tone: 'cruel',
        show: function (s) { return s.has('knife') || s.has('cutters'); },
        to: 'a2_culvert_kill' },
      { label: 'Turn one of them around. You need to see its face.', tone: 'risk',
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
      'Nine of them, facing the wall, in eight inches of water, in a four foot pipe.',

      'It is not a fight. There is no word for what it is. It is work — wet, close, repetitive work, ' +
      'and the only sound any of them make is the hum, which continues in each one until it physically ' +
      'cannot, and then stops mid-note.',

      'The ninth one is small.',

      { c: 'sep', t: '\u2042' },

      'Nobody helps me. Nobody stops me either. Bram holds the torch at the correct angle for ' +
      'twenty minutes without being asked, and that is a kind of participation, and both of us ' +
      'know it, and neither of us will ever describe it that way.',

      'Afterwards Wren will not walk through the water. Odile carries her the last two hundred yards ' +
      'on her back, and the water comes up over Odile\u2019s boots, and she says nothing about it at all.'
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

      'It lets me. It turns like a mannequin on a stand, and when it comes round, its face is ' +
      'four inches from mine in the torchlight.',

      'It is a woman of about thirty. The eyes have gone the way they all go. The jaw is slack and ' +
      'the throat is working steadily with the note. And across the whole of her face, ' +
      'under the dirt, are <span class="wound">long pale scars in a regular pattern</span> — ' +
      'parallel, evenly spaced, four of them, running cheek to jaw.',

      'They are old. Months old. They were made before the eleventh of April, in a hospital, ' +
      'with instruments, by someone who was being careful.',

      { c: 'note', t: 'On a cord around her neck, under the collar: ST AMARANTH MERCY \u00b7 ' +
        'DONOR \u00b7 WARD 11 \u00b7 H-0441' },

      'Donor. Ward Eleven. And a number with four digits that somebody thought worth stamping into metal.'
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
        'The hill takes an hour. The last quarter mile is an avenue of lime trees that somebody has ' +
        'been pruning, and that detail — <em>somebody has been pruning</em> — does something to the ' +
        'back of my neck that four miles of dead city did not.'
      ];
      if (s.flag('groupCaughtUp')) {
        lines.push('I reach the gate ahead of the others. When I turn to signal the road is ' +
          'clear, they are already coming through the limes. ' +
          (s.alive('teddy') ? 'Bram has Teddy\u2019s arm; ' : 'Wren has the torch; ') +
          'none of them wanted to wait for my permission to finish the walk.');
      }
      if (s.alive('teddy')) {
        lines.push('Teddy makes it. Nobody expected it, least of all Odile, who has been walking at ' +
          'his shoulder for four miles with her hand ready at his elbow. At the gate he stops and ' +
          'straightens up as far as he can get and fixes his collar, because he is going into a ' +
          'hospital and he is seventy-one and that is what he does.');
      } else {
        lines.push(s.partyCount()
          ? 'There are ' + (s.partyCount() + 1) + ' of us at the gate. We have walked all this way ' +
            'with a space where Teddy would have been. Nobody steps into it.'
          : 'I reach the gate alone. I still leave room beside me for Teddy.');
      }
      if (s.flag('heldAtTheBoat')) {
        lines.push('The boat is still tied to the pontoon. I spent ' +
          (s.flag('leftBoatAfterLastNight') ? 'three days' : 'two days') +
          ' pretending its canopy was a roof; now the warmth in the windows is an accusation. ' +
          (s.alive('teddy') ? 'Teddy keeps his eyes on the light, not on me.' :
            'Nobody asks whether the extra nights would have changed anything.'));
      } else if (s.flag('tookFromTheChildren')) {
        lines.push(s.flag('gaveItBack')
          ? 'Bram sees the word <em>Mercy</em> over the entrance. I left the tins on the ' +
            'landing at Marlowe House, but neither of us can stop hearing the children behind the door.'
          : 'Bram sees the word <em>Mercy</em> over the entrance and looks at the tins I ' +
            'carried out of Marlowe House. Neither of us can call this building a refuge without ' +
            'thinking of the children I left behind.');
      } else if (s.flag('drewThemOff')) {
        lines.push('The scrape from the estate has bled through its dressing. Wren checks it ' +
          'without being asked. In the tower behind me, six children have had an hour of quiet.');
      } else if (s.flag('tookCulvert')) {
        lines.push('My cuffs are still wet with culvert water. When the hum rises behind the ' +
          'east wing, it finds the same note I heard beneath the road.');
      } else if (s.flag('tookRiver')) {
        lines.push('For most of the walk the river held them back. Up here there is no water ' +
          'between me and the sound in the east wing.');
      } else if (s.flag('tookEstate')) {
        lines.push('Somewhere below, a candle is still burning on the ninth floor. I have ' +
          'come to a place that says it takes in everyone.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('St Amaranth Mercy is a Victorian infirmary with two modern wings, and every window ' +
        'in it is lit, and there is a generator running somewhere behind the kitchens with the deep ' +
        'steady note of a machine that has been serviced.');
      lines.push('The front doors stand open. Warm yellow light spills down the steps onto the gravel. ' +
        'Inside, at a desk, under a sign reading RECEPTION, a man in a clean fleece is reading a ' +
        'paperback and waiting.');
      lines.push('Above the door, carved in 1874, the motto of the hospital:');
      lines.push({ c: 'note', t: 'WE TAKE IN ALL WHO COME' });
      if (s.flag('warnedAboutFront')) {
        lines.push('A woman in a tower block told me: <em>go in the back.</em>');
      } else if (s.flag('knowsTheWards')) {
        lines.push('The tag from the culvert said Ward Eleven. I cannot forget the face above it.');
      }
      return lines;
    },
    choices: [
      { label: 'Walk up the steps and through the front door.', hint: 'as invited', to: 'a3_reception' },
      { label: 'Go round. Find the back.', tone: 'risk', hint: 'away from reception',
        to: 'a3_back' },
      { label: 'Send one person in and keep the rest outside.', tone: 'risk', to: 'a3_split' },
      { label: 'Watch the building for an hour first.', to: 'a2_watch' },
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
    enter: function (s) { s.set('watchedTheMercy'); s.advance(0); },
    text: [
      'An hour in the wet grass under the lime trees, watching a hospital work.',

      'At 03:10 a man crosses from the main building to the kitchens carrying a covered tray. ' +
      'At 03:25 he comes back with it uncovered and empty. At 03:40 two people in scrubs walk the ' +
      'perimeter of the east wing with torches, talking, and one of them laughs at something.',

      'At 04:00, a set of double doors opens at the back of the east wing and four people wheel out ' +
      'a trolley with a shape on it under a sheet, and take it down a service road, and come back ' +
      'eleven minutes later with the trolley empty.',

      'At 04:20 they do it again.',

      { c: 'sep', t: '\u2042' },

      'And every twenty minutes, all night, from the east wing, with the regularity of a tide: ' +
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
