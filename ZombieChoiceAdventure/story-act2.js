/* ============================================================
   THE HUSH — Act II: the long way around
   Ferry Street to St. Amaranth Mercy. Four miles, unless we wait.
   ============================================================ */
(function () {
  'use strict';
  var S = window.Story;
  var CH = 'II — The Long Way Around';

  function withTeddy(s) { return s.alive('teddy'); }
  function teddyGone(s) { return !s.alive('teddy'); }
  function numberWord(n) {
    var w = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    return w[n] || String(n);
  }
  /* the narrator is at the barricade on the ninth floor, not at the street door */
  function atTheTop(s) { return s.flag('wentUpTheTower'); }
  /* Act I ended at first light (waited for morning, or sat with Teddy until the light came);
     two days on the boat reset the clock, and the last night there ends at dusk */
  function daylight(s) {
    return (s.flag('waited') || s.flag('satWithHim')) && !s.flag('heldAtTheBoat');
  }

  S.add({
    id: 'a2_lane',
    chapter: CH,
    place: 'The service lane',
    enter: function (s) { s.set('inTheLane'); },
    text: function (s) {
      var lines = [
        'The truck blocks the mouth of the lane from wall to wall: a refrigerated semi, white and ' +
        'enormous, its metal ticking in the cold. FRESH DAILY, in a font somebody once ' +
        'chose in a meeting.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy has to stop every twenty yards. I no longer pretend the stops are for ' +
          'everyone. Each time, Odile takes his pulse at the wrist and keeps the number to herself.');
      } else {
        lines.push('There are four of us now. I am walking faster than I should, and nobody ' +
          'has spoken since the yard wall.');
      }
      lines.push('There is no way around it, only over, under, or through, or back up the lane and ' +
        'out onto Ferry Street, where the fifty are.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('From inside the trailer, muffled by six inches of insulated panel, something is ' +
        '<em>humming</em>.');
      return lines;
    },
    choices: [
      { label: 'Open the trailer doors.', tone: 'risk', hint: 'find out what is humming', to: 'a2_lorry_open' },
      { label: 'Climb over the cab.', hint: 'exposed, but quick', to: 'a2_lorry_climb' },
      { label: 'Go under. There is clearance at the back axle.', tone: 'risk',
        hint: 'tight and dark, and you go first', to: 'a2_lorry_under' },
      { label: 'Back up the lane. Take Ferry Street after all.', tone: 'cruel',
        hint: 'right past the fifty; someone will get hurt', to: 'a2_ferry' },
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
        s.give('flask');
      }
    },
    text: [
      'The driver is still in it: seatbelt on, hands at ten and two, head back against the headrest, ' +
      'and a neat dark hole under the chin. He saw to it himself, in the first week by the look ' +
      'of him. Whatever he used is gone. Somebody got here before me.',

      'What they left: three loose rounds rolling in the door pocket, a road atlas open to ' +
      'the wrong county, and a photograph of a dog taped to the dash. Under the passenger seat, ' +
      'where they missed it, is a bottle of grain alcohol with an inch gone.',

      { c: 'note', t: 'Clipped to the sun visor, a delivery manifest. 14 TONS CHILLED. ' +
        'Under it, in ballpoint, in a different hand: THEY ARE NOT MEAT. DO NOT OPEN. 4/11' },

      'April 11, the day the Hush began. Somebody wrote that, left the trailer sealed, and ' +
      'walked away. It has been humming ever since.'
    ],
    choices: [
      { label: 'Open it anyway.', tone: 'risk', to: 'a2_lorry_open' },
      { label: 'Open it and burn it at once, with the bottle and the lighter.',
        tone: 'cruel', hint: 'you burn it before you know what\u2019s inside',
        show: function (s) { return s.has('lighter') && s.has('flask'); },
        to: 'a2_burn_lorry' },
      { label: 'Take the atlas and go over the cab. Leave the trailer shut.', to: 'a2_lorry_climb',
        act: function (s) { s.set('hasAtlas'); s.set('leftItSealed'); },
        toast: ['You take the road atlas.', 'item'] },
      { label: 'Take the photograph off the dash. Then over the cab.', tone: 'kind', to: 'a2_lorry_climb',
        hint: 'he kept it where he could see it',
        act: function (s) {
          s.set('leftItSealed'); s.soften(4); s.scar(3);
          s.keep('dogphoto', 'I never learned his name, or the dog\u2019s. I didn\u2019t want to leave it in that cab.');
        },
        toast: ['You peel it off carefully, so as not to tear the corners.', 'keepsake'] },
      { label: 'Tear the warning off the manifest, pocket it, and go over the cab.', to: 'a2_lorry_climb',
        hint: 'somebody tried to warn whoever came next',
        act: function (s) {
          s.set('leftItSealed'); s.scar(4);
          s.keep('manifest', 'Somebody wrote this on the first day to stop the next person from opening that trailer. I keep it because they tried.');
        },
        toast: ['THEY ARE NOT MEAT. DO NOT OPEN. 4/11', 'keepsake'] }
    ]
  });

  S.add({
    id: 'a2_lorry_open',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) { s.set('openedTheLorry'); s.scar(14); },
    text: function (s) { return [
      'The handle is a lever as long as my arm. It goes over with a clang I feel in ' +
      'my teeth.',

      'Fourteen tons, the plate on the door says, and six weeks without power. The air comes out ' +
      'first, sweet and thick enough to lean on. Bram is on his knees retching before the doors ' +
      'have finished swinging.',

      'They are standing up. All of them, shoulder to shoulder in the dark, packed as tight as a full ' +
      'elevator: maybe sixty people, who must have been loaded in alive and sealed in alive, and have ' +
      'been <span class="wound">standing in the dark ever since, humming</span>.',

      (daylight(s)
        ? 'At the far end a vent in the roof has rusted open, and one gray bar of morning comes down ' +
          'through it. Every face I can see is tipped up toward that bar, chins raised, mouths open, ' +
          'like a crowd under a balcony waiting for somebody to step out and speak.'
        : 'My flashlight finds the far end over their heads: a vent in the roof, rusted open onto the ' +
          'night. Every face I can see is tipped up toward that square of lesser dark, chins raised, ' +
          'mouths open, like a crowd under a balcony waiting for somebody to step out and speak.'),

      'Not one of them steps toward the doors. But the faces come down, very slowly, and turn ' +
      'toward the noise we have made, and the note they are holding does not waver.',

      { c: 'hum', t: 'h m m m m m m m' },

      (s.seen('a2_lorry_cab')
        ? 'They have been like this since April 11, neither dying nor leaving. '
        : 'They have been like this for weeks, neither dying nor leaving. ') +
      '<em>Waiting</em>, in a box, for something that hasn\u2019t happened yet.'
    ]; },
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
        toast: ['You leave sixty of them loose behind you.', 'bad'] }
    ]
  });

  S.add({
    id: 'a2_burn_lorry',
    chapter: CH,
    place: 'Quay Road',
    enter: function (s) {
      s.set('burnedTheLorry');
      s.set('openedTheLorry');
      if (s.has('flask')) s.take('flask');
      s.harden(12); s.scar(18);
    },
    text: function (s) {
      var lines = [];
      if (s.seen('a2_lorry_open')) {
        lines.push('I throw the grain alcohol in a wide arc through the open doors, and the lighter ' +
          'does the rest. What happens next is nothing like fire in a movie.');
      } else {
        lines.push('I pull the lever, and as the doors swing I throw the grain alcohol in a wide arc ' +
          'into the dark. The lighter does the rest. I get one look at them first: people, standing ' +
          'shoulder to shoulder, maybe sixty of them, their faces coming down toward the sound of the doors.');
        lines.push('What happens next is nothing like fire in a movie.');
      }
      lines.push('For the first four seconds the fire is blue and nearly silent. Then sixty people begin to ' +
        'burn in a steel box, and the humming does not stop. It <em>changes pitch</em>. ' +
        'Sixty voices climb the scale together until the sound is higher than any human ' +
        'throat should go, and it stays there for a long time.');
      lines.push('None of them runs. Not one tries to come out through the open doors. They stand in it, ' +
        'and the ones at the back lift their faces again toward the vent in the roof, where the smoke is going.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Wren has her hands over her ears. It is the first time I have seen her admit that a sound ' +
        'can reach her. Odile watches with her head on one side, as if she were taking notes.');
      lines.push('<span class="said">"They did not run,"</span> she says later, on the road, out of nowhere. ' +
        '<span class="said">"Pain is protective. It is only any use to something that still wants ' +
        'to live."</span>');
      return lines;
    },
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
    enter: function (s) { s.infect(14); s.scar(20); s.set('wentInside'); s.set('sawTheShoe'); },
    text: function (s) { return [
      'I step up into the trailer. Nobody stops me, the sixty included.',

      'Inside, I feel the humming more than I hear it: a <em>pressure</em> in the sinuses, the back ' +
      'teeth, the long bones. Walking into it is like wading chest-deep into a river.',

      'They part for me. Sixty bodies each shuffle half a step aside to open a corridor, without ' +
      'lowering their faces, the way a crowd makes room for a stretcher.',

      'At the far end, under the roof vent, they have left a space in all that packed flesh: ' +
      'a circle of bare floor about a yard across, ' +
      (daylight(s) ? 'with the gray light from the vent falling straight into it. '
        : 'with the vent a pale square directly over it. ') +
      'They stand around its edge shoulder to shoulder, chins raised, mouths open, faces turned up ' +
      'to the roof. In the middle of the circle, on its side and spotless, is ' +
      '<span class="cold">a child\u2019s shoe</span>.',

      'Not one of them is looking down at it. To me it looks like a vigil: sixty people keeping a ' +
      'place for a child since April, and none of them able to look at what they are keeping. ' +
      'I can\u2019t stop wondering whose child.',

      { c: 'hum', t: 'h m m m m m m m' },

      'I don\u2019t know what it means. My body knows something, though: my throat ' +
      'has opened and I am <span class="wound">humming with them</span>. I did not decide to.'
    ]; },
    choices: [
      { label: 'Take the shoe.', tone: 'rot', to: 'a2_quay',
        act: function (s) { s.set('tookTheShoe'); s.infect(8); s.scar(12); },
        toast: ['Nothing happens. The hum does not even change.', 'rot'] },
      { label: 'Leave it. Back out slowly, still humming.', to: 'a2_quay',
        act: function (s) { s.set('leftTheShoe'); s.infect(4); },
        toast: ['They shuffle back into place behind you.', 'rot'] },
      { label: 'Stop humming. Deliberately. Break it.', tone: 'risk', to: 'a2_inside_break' },
      { label: 'Back out and burn it with them inside.', tone: 'cruel',
        show: function (s) { return s.has('lighter') && s.has('flask'); },
        to: 'a2_burn_lorry' },
      { label: 'Call out for the others to come and see.', tone: 'cruel', to: 'a2_quay',
        act: function (s) { s.harden(12); s.scar(10); s.trust('bram', -20); s.trust('wren', -15); s.set('calledThemIn'); },
        toast: ['Nobody comes. Bram holds Wren by both arms at the doors.', 'bad'] }
    ]
  });

  S.add({
    id: 'a2_inside_break',
    chapter: CH,
    place: 'Inside the trailer',
    enter: function (s) { s.hurt(16); s.infect(16); s.scar(16); },
    text: [
      'I close my mouth. It is harder than holding in a sneeze in church.',

      'Sixty faces come down at once.',

      'They move slowly, with an institutional disappointment, like a committee. Two of them take ' +
      'my arms, not roughly, and fold them down against my sides. A third lifts both hands to my face, ' +
      'sets its thumbs on my bottom teeth, and <span class="wound">opens my mouth</span> ' +
      'with the patient strength of something that has all night. Then they hum into it, all of them, ' +
      'exactly together, and the note goes down my throat like cold water.',

      'I get out because Bram comes three steps up into that and takes a fistful of my collar. ' +
      'It costs me a boot, and a strip of skin off my cheek where one hand would not let go.'
    ],
    choices: [
      { label: 'Out. Run. Do not look back at the doors.', to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); } },
      { label: 'Close the doors behind you first.', to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); s.set('closedThemIn'); s.scar(6); } },
      { label: 'Burn it before they follow.', tone: 'cruel',
        show: function (s) { return s.has('lighter') && s.has('flask'); },
        to: 'a2_burn_lorry', act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); } },
      { label: 'Sit down on the curb and let your hands stop shaking first.',
        to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.set('bramSavedYou'); s.ease(6); s.scar(4); } },
      { label: 'Thank Bram. Out loud, in front of the others.', tone: 'kind', to: 'a2_quay',
        act: function (s) { s.trust('bram', 35); s.set('bramSavedYou'); s.soften(6); } },
      { label: 'Turn back toward them. Stop resisting the note.', tone: 'rot', to: 'end_turned',
        act: function (s) { s.infect(80); s.set('letTheNoteIn'); } }
    ]
  });

  S.add({
    id: 'a2_lorry_climb',
    chapter: CH,
    place: 'Quay Road',
    text: function (s) {
      var lines = [
        'Side mirror, door handle, cab roof, down the far side. Bram goes first and makes ' +
        'it look like something he does for exercise.'
      ];
      if (withTeddy(s)) {
        lines.push('Getting Teddy up and over takes eleven minutes and four hands. He keeps utterly ' +
          'silent the whole way, and when he finally coughs, on the far side, into both palms, ' +
          'he looks around at us in apology, like a man who has dropped a glass in a library.');
      } else {
        lines.push('It takes the four of us under a minute, now that nobody has to be lifted.');
      }
      lines.push(daylight(s)
        ? 'From the cab roof I can see the length of Quay Road, the river beyond it, ' +
          'and, four miles northeast on the hill, the long Victorian front of St. Amaranth Mercy. ' +
          'The sun is barely over the roofs, and every window in that front is lit, pale yellow against the stone. ' +
          '<em>Lit, with electric light.</em>'
        : 'From the cab roof I can see the length of Quay Road, the river beyond it, ' +
          'and, four miles northeast on the hill, the long Victorian front of St. Amaranth Mercy, ' +
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
      { label: 'Hum. Give them what they want and crawl out the other side.', tone: 'rot',
        to: 'a2_quay',
        act: function (s) { s.infect(14); s.set('hummedUnder'); s.scar(6); },
        toast: ['The footsteps stop, and you crawl out the far side unhurt.', 'rot'] }
    ]
  });

  S.add({
    id: 'a2_under_still',
    chapter: CH,
    place: 'Under the trailer',
    enter: function (s) { s.scar(12); },
    text: function (s) {
      var lines = [
        'We stop, all of us, flat on our backs in eleven inches of dark, under a trailer full of ' +
        'standing dead.',

        'Forty minutes.',

        'I think about June in the photo booth at the county fair, ' +
        'trying to get both our heads into the fourth frame. I have not said her name out loud ' +
        'for nineteen days. I count them twice to be sure.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy does not cough. Not once in forty minutes. Afterward he is gray to the lips ' +
          'and smiling like a boy who has won something.');
        lines.push({ c: 'whisper', t: 'He has bitten through his own bottom lip to do it.' });
      }
      lines.push('Eventually the footsteps overhead move away.');
      return lines;
    },
    choices: [
      { label: 'Out, and keep moving.', to: 'a2_quay',
        act: function (s) { s.scar(6); } },
      { label: 'Out, and say her name out loud. Once.', tone: 'kind', to: 'a2_quay',
        act: function (s) { s.set('saidHerName'); s.soften(8); s.ease(10); s.scar(4); },
        toast: ['You say June\u2019s name. The others look away and give you a moment.', 'good'] },
      { label: 'Out, and see to Teddy\u2019s mouth.', tone: 'kind',
        show: function (s) { return withTeddy(s); }, to: 'a2_quay',
        act: function (s) {
          s.trust('teddy', 25); s.soften(6);
          if (s.has('gauze')) {
            s.take('gauze');
            s.keep('gauzescrap', 'I kept the square of gauze I held to his lip. I\u2019ve meant to throw it away, and I haven\u2019t.');
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
      s.set('bramEye');
      /* without the cutters he fights with a length of railing, and keeps it */
      if (!s.has('cutters')) s.set('bramHasRailing');
    },
    text: function (s) { return [
      'We take Ferry Street because there is no time and no better idea, and Ferry Street takes ' +
      'something from each of us in exchange.',

      'I keep expecting a chase, and it never comes. What we walk into is a ' +
      '<em>crowd</em>, and I am going the wrong way through it. Each of them reaches for me ' +
      'as I pass with the same slow grip, trying to turn me around, to bring my face to theirs, ' +
      'to get my mouth open. All of them are humming the same note, and they never stop to breathe.',

      'Bram goes down outside the betting shop with three of them on him: two holding his arms, ' +
      'one with both hands on his face, working at his jaw. Its thumb slips into his eye socket ' +
      'and stays there, pressing, while it tries to turn his head. ' +
      'He gets an arm loose and comes up swinging the ' +
      (s.has('cutters') ? 'bolt cutters' : 'length of broken railing') +
      ', his <span class="wound">left eye nearly pushed out of its socket</span> and blood ' +
      'running down into his collar. ' +
      'He does not stop moving and he does not make a sound. Eleven years on cell blocks.',

      'We come out at the Quay Road end with everyone still on their feet. None of us expected that.'
    ]; },
    choices: [
      { label: 'Stop. Get his eye cleaned and covered before he takes another step.', tone: 'kind',
        to: 'a2_quay',
        act: function (s) { s.trust('bram', 25); s.soften(6); if (s.has('gauze')) s.take('gauze'); s.mend('bram'); } },
      { label: 'Keep moving. He can hold his hand over it.', tone: 'cruel', to: 'a2_quay',
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
    enter: function (s) {
      s.set('atTheQuay');
      s.set('blindManSeen');
      if (daylight(s)) s.set('sawTelescope');
    },
    text: function (s) {
      var day = daylight(s);
      var bram = s.who('bram');
      var lines = [];
      if (day) {
        lines.push('Quay Road runs along the water. To my left, the river, wide and brown in the morning light. ' +
          'To my right, the Fenwick Houses: four high-rises around a little shopping plaza, every ' +
          'window blank except one on the ninth floor of Marlowe House, where something keeps flashing.');
        lines.push('It catches the low sun, goes dark, and catches it again. I watch long enough to see it move: ' +
          'a short white tube on three legs, just inside the glass, swinging slowly along the road and back. ' +
          'A telescope on a tripod. Nobody buys one of those to watch a road. Whoever lives up there was ' +
          'looking at the planets before April, and has tipped it down to watch the street.');
      } else {
        lines.push('Quay Road runs along the water. To my left, the river, wide and black. ' +
          'To my right, the Fenwick Houses: four high-rises around a little shopping plaza, every ' +
          'window dark except one on the ninth floor of Marlowe House, where somebody has a candle lit.');
      }
      if (s.flag('sawTheLights')) {
        lines.push(day
          ? 'Ahead and above it all, four miles northeast, St. Amaranth Mercy has its lights on in ' +
            'broad day. We have all seen it now. Nobody has said yet what it means.'
          : 'Ahead and above it all, four miles northeast, St. Amaranth Mercy is lit up like ' +
            'an ocean liner. We have all seen it now. Nobody has said yet what it means.');
      } else {
        lines.push(day
          ? 'And ahead, four miles northeast, up on the hill: lights. Electric light in every window, ' +
            'pale but steady against the morning, in a county with no power. St. Amaranth Mercy.'
          : 'And ahead, four miles northeast, up on the hill: lights. Electric light, ' +
            'burning steadily, in a county with no power. St. Amaranth Mercy.');
        lines.push('We all stop walking at the same moment.');
        s.set('sawTheLights');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('Fifty yards along, a man stands by himself at the river railing in a cardigan buttoned ' +
        'wrong and one brown slipper. His face is tipped up, his mouth hangs open, and he is humming. ' +
        'Where his eyes should be there are two shallow hollows of old, shiny scar.');
      if (withTeddy(s)) {
        lines.push('Teddy stops so suddenly that Odile walks into him.' +
          (s.flag('gaggedHim') ? ' He peels the tape off his own mouth.' : '') +
          ' <span class="said">"Ansel,"</span> he says. <span class="said">"Ansel Dray. Second ' +
          'basses, nineteen years."</span> A breath. <span class="said">"The switch room went up at ' +
          'Corrigan Coil and took his eyes. He was back at rehearsal in three weeks and sang the whole ' +
          'Faur\u00e9 from memory."</span>');
        lines.push('He listens with his head on one side. ' +
          '<span class="said">"Always under the note. A hair flat, every Sunday, for nineteen ' +
          'years. I stood him next to the organ to pull him up."</span> His mouth works. <span class="said">' +
          '"Listen to him now. Ansel is finally hitting his note."</span>');
        lines.push('He sounds proud of him. As we pass, the blind man\u2019s chin comes down an inch, ' +
          'toward the sound of Teddy\u2019s breathing. Then it goes back up.');
      } else {
        lines.push('I know him. Half the town knew him: Ansel Dray, who sold the evening paper from a ' +
          'folding chair outside the bus depot on Ferry Street and made change by touch. He lost his ' +
          'eyes in the electrical fire at Corrigan Coil, years ago, and wore dark glasses after that. ' +
          'The glasses are gone.');
        if (s.flag('toldBramToGo')) {
          lines.push('I don\u2019t tell the others. Bram walks ahead of us, the way he has since I told him ' +
            'to go to Thornbury and he stayed anyway, and I find I don\u2019t want to give him anything, ' +
            'not even a name. I keep it.');
        } else if (bram.trust <= 25) {
          lines.push('I don\u2019t tell the others. Bram and I have barely spoken since the drugstore, and ' +
            'I find I don\u2019t want to give him anything, not even a name. I keep it.');
        } else {
          lines.push('I tell the others who he is. Bram looks at him for a long time.');
          lines.push('<span class="said">"Did he have family?"</span> he asks.');
          lines.push('I don\u2019t know. I only ever knew him from the chair.');
        }
      }
      if (s.flag('bramEye')) {
        lines.push(bram.state === 'hurt'
          ? 'Bram walks with the heel of his hand pressed to his left eye. When he takes it away, the lid ' +
            'is swollen shut and crusted dark, and he has to turn his whole head to see anything on that side.'
          : 'Bram walks with a dressing taped over his left eye. He has to turn his whole head to see ' +
            'anything on that side, and twice he misjudges the curb.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (withTeddy(s)) {
        lines.push('Odile takes me aside by the elbow. <span class="said">"He has two miles in him,"' +
          '</span> she says. <span class="said">"Perhaps three. Not four. I am telling you now, ' +
          'while it is still only information."</span>');
      }
      lines.push('The Sallow Walk, the old towpath along the river, is long and open. The way through the projects is short and close, ' +
        (day ? 'and it passes under that window.' : 'and it passes the candle.') +
        ' Then there is the culvert under the road.');
      if (s.flag('hasAtlas')) {
        lines.push('I open the atlas on the curb at the Thornbury page. The stream is a thin blue line ' +
          'that goes under Quay Road, comes up for thirty yards in the railroad cut, and goes under ' +
          'again at the embankment. So the culvert has a way out in the middle.');
      }
      return lines;
    },
    choices: [
      { label: 'The Sallow Walk, along the river.', hint: 'long, open, quiet', to: 'a2_river' },
      { label: 'Through the Fenwick Houses.', hint: 'short and close, and somebody is alive in there',
        to: 'a2_estate' },
      { label: 'The culvert.', tone: 'risk', hint: 'under the road: dark, but fast', to: 'a2_culvert' },
      { label: 'Rest here an hour first.', show: function (s) { return withTeddy(s); },
        tone: 'kind', hint: 'Teddy needs it', to: 'a2_rest' },
      { label: 'Ask the others what they want to do.', to: 'a2_ask' }
    ]
  });

  S.add({
    id: 'a2_ask',
    chapter: CH,
    place: 'Quay Road',
    text: function (s) {
      var lines = ['I ask. This group doesn\u2019t usually ask, and the question alone ' +
        'changes the mood.'];
      lines.push('<span class="said">"The projects,"</span> Bram says at once. ' +
        '<span class="said">"It\u2019s short. ' +
        (daylight(s) ? 'Somebody\u2019s watching the road through a telescope. That\u2019s a person' : 'A candle means a person') +
        ', and a person means a room that\u2019s ' +
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
      lines.push({ c: 'pad', t: 'water' });
      lines.push({ c: 'pad', t: 'they dont like water. ive watched. they stop at the edge' });
      return lines;
    },
    choices: [
      { label: 'Go with Wren. The river.', tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 20); s.set('tookWrensAdvice'); } },
      { label: 'Go with Bram. The projects.', to: 'a2_estate',
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
      'We give it an hour in the lee of an overturned dumpster.',

      'Teddy sleeps sitting up against my shoulder, and for a while his breathing eases. ' +
      'Odile sleeps too. I have never seen her sleep before, and that tells me ' +
      'more about how bad she thinks it is than anything she has said.',

      'Wren does not sleep. She sits watching the river with her chin on her knees, and when I ' +
      'look over she is opening and closing her mouth without a sound, over and over, ' +
      'the way I might try a door I was afraid was locked.',

      { c: 'whisper', t: 'She is checking whether her voice is still in there.' }
    ],
    choices: [
      { label: 'Tell her it will come back. Take the Sallow Walk with her.', tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 15); s.soften(5); } },
      { label: 'Let her have the silence. Lead the group through the projects.', tone: 'kind', to: 'a2_estate',
        act: function (s) { s.trust('wren', 10); s.scar(4); } },
      { label: 'Ask her to try. Out loud. Once.', tone: 'risk', to: 'a2_wren_voice' },
      { label: 'Wake everybody. Take the culvert.', to: 'a2_culvert' }
    ]
  });

  S.add({
    id: 'a2_wren_voice',
    chapter: CH,
    place: 'Quay Road',
    text: [
      'She looks at me for a long time. Then she nods, turns to face the water, and takes a breath.',

      'What comes out is a dry click, then a thin, cracked vowel about two seconds long. ' +
      'It is the ugliest and best sound I have heard since April.',

      'Her hand goes to her throat. She looks surprised.',

      'Forty yards away, on the far bank, something that has stood in the reeds all hour ' +
      'without moving turns its head.',

      { c: 'hum', t: 'h m m m m m m m' }
    ],
    choices: [
      { label: 'Get everyone up. Follow the river away from that sound.', to: 'a2_river',
        act: function (s) { s.trust('wren', 10); s.scar(8); s.set('wrenSpoke'); } },
      { label: 'Tell her it was worth it. Take the Sallow Walk beside her.', tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 30); s.soften(10); s.set('wrenSpoke'); s.set('worthIt'); },
        toast: ['She writes: "say that again when were not running." You do.', 'good'] },
      { label: 'Tell her never to do that again. Cut through the projects.', tone: 'cruel', to: 'a2_estate',
        act: function (s) { s.trust('wren', -30); s.harden(10); s.set('wrenSpoke'); s.set('silencedHer'); },
        toast: ['She closes her mouth. She does not open it again for a long time.', 'bad'] }
    ]
  });

  /* ---------------------------------------------------------- the river */
  S.add({
    id: 'a2_river',
    chapter: CH,
    place: 'The Sallow Walk',
    enter: function (s) { s.set('tookRiver'); },
    text: function (s) {
      var lines = [
        'Twice on the Sallow Walk I see them at the water\u2019s edge, standing shin-deep in the ' +
        'shallows with their chins raised and their mouths open, quite still, humming like a ' +
        'congregation that has forgotten to sit down.',

        'They do not come in after us. Whatever the water is to them, it is a wall.',

        { c: 'sep', t: '\u2042' },

        'Two miles on, where the path passes the old sailing club, four boats are still tied up at a ' +
        'floating dock. Three of them are swamped and sitting on the bottom.',

        'The fourth is a twenty-six-foot cabin cruiser riding high and rocking gently: ' +
        'canopy zipped, hull sound, <em>LUCKY II</em> across the transom.'
      ];
      if (s.flag('knowsHolloway')) {
        lines.push('Dennis Holloway\u2019s boat, then: the one the woman at Marlowe House told me about.');
      }
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
    text: function (s) { return [
      'She looks at the boat for a long moment, arms folded.',

      '<span class="said">"It is the best idea anybody has had in six weeks,"</span> she says. ' +
      '<span class="said">"Understand what it is before you fall in love with it. A hole ' +
      'in the water. No power, ' +
      (s.flag('hasAtlas') ? 'no charts but a road atlas that stops at the shoreline' : 'no charts') +
      ', no fuel we have counted, and a river that runs out to a ' +
      'sea none of us can sail."</span>',

      'She unfolds her arms.',

      '<span class="said">"But they stop at the water\u2019s edge. I have watched them do it four ' +
      'times since we got here. So, yes. Find the keys."</span>'
    ]; },
    choices: [
      { label: 'Board her and search.', to: 'a2_boat' },
      { label: 'Ask her to go aboard and check it while you watch the path.', to: 'a2_boat',
        act: function (s) { s.trust('odile', 10); s.set('odileWentAboard'); } },
      { label: 'Tell her the Mercy comes first. The boat will keep.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.set('knowsBoat'); } }
    ]
  });

  S.add({
    id: 'a2_boat',
    chapter: CH,
    place: 'LUCKY II',
    enter: function (s) { s.set('knowsBoat'); s.set('foundBoat'); },
    text: function (s) {
      var lines = [];
      if (s.flag('odileWentAboard')) {
        lines.push('Odile unzips the canopy and goes below while I watch the path. After a minute ' +
          'she calls me down.');
      } else {
        lines.push('The canopy unzips.');
      }
      lines.push('The cabin smells of mildew, old coffee, and sunscreen: an ' +
        'ordinary August, preserved under canvas like a specimen.');
      lines.push('Two berths. A gas burner. A paperback swollen with damp. A child\u2019s water wing. ' +
        'Half a bottle of supermarket ros\u00e9, still corked.');
      lines.push('The ignition is a round brass barrel on the bulkhead, and it is empty.');
      lines.push({ c: 'note', t: 'Taped inside the locker door, in marker, a note from a man to his wife: ' +
        'JEAN \u2014 KEYS ARE WHERE THEY ALWAYS ARE. STOP ASKING ME. x' });
      lines.push('The fuel gauge reads three-quarters. It is the most hopeful thing any of us ' +
        'has seen since April 11.');
      return lines;
    },
    choices: [
      { label: 'Search the boat properly for the keys.', to: 'a2_boat_search' },
      { label: 'Leave it. Come back when you have the keys.', to: 'a2_mercy_approach',
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
      (s.flag('secretBoat')
        ? 'I take the cabin apart alone in eleven minutes, with one crank flashlight, while the others ' +
          'wait on the dock.'
        : 'We take the cabin apart in eleven minutes, ' + (s.partyCount() + 1) +
          ' of us and one crank flashlight.'),

      '"Where they always are" turns out to mean somewhere else. The keys are not in the galley ' +
      'drawer, the chart table, the pocket of the rain slicker, or the coffee can, and nobody ' +
      'has taped them under the wheel.',

      { c: 'sep', t: '\u2042' },

      'What I do find, in the chart table, under a folded map of the estuary, is a hospital ' +
      'appointment card.',

      { c: 'note', t: 'ST. AMARANTH MERCY \u00b7 RESPIRATORY CLINIC\nMR. D. HOLLOWAY \u00b7 WARD 11 \u00b7 ' +
        'THURS 9:40 AM\nPLEASE BRING THIS CARD AND A LIST OF YOUR MEDICATIONS' },

      'D. Holloway, then, the man who wrote to Jean. If he went up the hill with the keys in ' +
      'his coat, they are four miles away, in the only building with lights.'
    ]; },
    choices: [
      { label: 'Take Holloway\u2019s appointment card to the Mercy.', to: 'a2_mercy_approach',
        act: function (s) { s.set('hollowayCard'); s.set('boatWillKeep'); },
        toast: ['You take the card: a name and a ward number.', 'item'] },
      { label: 'Take the card and tell nobody what it means.', tone: 'cruel',
        to: 'a2_mercy_approach',
        act: function (s) { s.set('hollowayCard'); s.set('boatWillKeep'); s.set('secretCard'); s.harden(10); } },
      { label: 'Leave the card. The boat is a fantasy and the Mercy is a plan.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.harden(5); } }
    ]
  });

  S.add({
    id: 'a2_boat_hotwire',
    chapter: CH,
    place: 'LUCKY II',
    enter: function (s) { s.hurt(5); s.scar(6); },
    text: function (s) {
      var tool = s.has('knife') ? 'the boning knife' : 'the jaws of the bolt cutters';
      return [
        (s.flag('heldAtTheBoat') ? 'Before we give up on the boat, I pry' : 'I pry') +
        ' the panel off with ' + tool + ' and work my hand into a loom of forty-year-old ' +
        'marine wiring, and over the next twenty minutes I learn that a diesel inboard with ' +
        'an electronic cutoff is not a \u201992 Civic.',

        'What I manage is the horn.',

        'One enormous blast across two hundred yards of open water. It rolls off the far bank ' +
        'and comes back at me, and then, like something being poured, the humming starts up all along ' +
        'the opposite shore at once.',

        { c: 'hum', t: 'h m m m m m m m' },

        'There are hundreds of them. The far bank has been full of them all along, ' +
        (daylight(s) ? 'standing back among the willows where I never thought to look' : 'standing in the dark') +
        ', and now every face over there has come down, and every one of them is turned toward me.',

        'They cannot cross. I am almost certain they cannot cross.'
      ];
    },
    choices: [
      { label: 'Get off the boat and get to the Mercy. Fast.', to: 'a2_mercy_approach',
        act: function (s) { s.scar(10); s.set('soundedTheHorn'); } },
      { label: 'Stay. Watch the far bank. Learn something.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('soundedTheHorn'); s.set('studiedThem'); s.scar(12); },
        toast: ['Not one of them steps into the water. After two hours the faces start going back up, one by one.', 'rot'] },
      { label: 'Apologize to the others. Properly.', tone: 'kind', to: 'a2_mercy_approach',
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
        'We stay at the dock for two days. The water keeps them off, and for two days ' +
        'it is possible to believe that is enough.',

        'They are the best days any of us has had since April. I eat canned peaches ' +
        'sitting on the cabin roof. Wren finds the paperback readable from page forty. Bram laughs once, ' +
        'at something Odile says about a horse, and the sound is so unfamiliar that everybody stops.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy gets worse, a little each day. On the second ' +
          'night a new sound starts under his breathing, a fine dry crackle like somebody crumpling ' +
          'paper in another room. Odile hears it from the cockpit and closes her eyes.');
      } else {
        lines.push('On the second night the far bank fills up and stays full. The humming goes on ' +
          'for nine hours without a break, and we stop pretending the water is enough.');
      }
      lines.push('There is almost no food left on this boat, and there are no keys. ' +
        'The lit building on the hill has beds in it, and people.');
      return lines;
    },
    choices: [
      { label: 'Everyone goes to the Mercy. Together.', to: 'a2_mercy_approach',
        act: function (s) { s.set('boatWillKeep'); s.soften(4); } },
      { label: 'Scout the hill alone. Tell them to follow when the road is clear.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('wentAlone'); s.set('boatWillKeep'); s.scar(8); s.soften(6); } },
      { label: function (s) {
          return withTeddy(s)
            ? 'Go up first with Bram. Odile and Wren bring Teddy up after you.'
            : 'Go up first with Bram. Odile and Wren follow an hour behind.';
        },
        to: 'a2_mercy_approach',
        act: function (s) { s.set('tookBram'); s.set('boatWillKeep'); } },
      { label: 'Stay one more day. Then go up to the Mercy.', tone: 'risk', to: 'a2_boat_lastnight',
        act: function (s) { s.hurt(10); s.scar(8); s.bump('daysWasted'); } },
      { label: 'Two days with nothing to do. Take the ignition panel off and try the wiring.',
        tone: 'risk', hint: 'noisy if it goes wrong',
        show: function (s) { return s.has('cutters') || s.has('knife'); }, to: 'a2_boat_hotwire' }
    ]
  });

  S.add({
    id: 'a2_boat_lastnight',
    chapter: CH,
    place: 'The Sallow Walk',
    dateEntry: true,
    enter: function (s) {
      if (!s.flag('leftBoatAfterLastNight')) {
        s.set('leftBoatAfterLastNight'); s.advance(1);
      }
      s.set('boatWillKeep');
    },
    text: function (s) {
      var lines = [
        'I argue for one more day and get it. By afternoon the last can is empty. The paperback lies ' +
        'face down in the cockpit, its pages swelling in the river mist.',
        'At dusk the humming starts again on the far bank. Nobody gets up to look anymore.'
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

  /* ---------------------------------------------------------- the projects */
  S.add({
    id: 'a2_estate',
    chapter: CH,
    place: 'The Fenwick Houses',
    enter: function (s) { s.set('tookEstate'); },
    text: function (s) { return [
      'The plaza is a concrete horseshoe of shuttered storefronts around a dry fountain. It is ' +
      'the quietest place I have been in six weeks, and I don\u2019t trust it. ' +
      'Something here is holding still.',

      daylight(s)
        ? 'The telescope is on the ninth floor of Marlowe House. From the courtyard I can see the end of ' +
          'the tube against the glass, and somebody behind it bending to the eyepiece, straightening up, ' +
          'stepping away, coming back.'
        : 'The candle is on the ninth floor of Marlowe House. From the courtyard I can see it moving ' +
          'behind the glass: somebody carrying a light from room to room.',

      { c: 'sep', t: '\u2042' },

      'Taped to the inside of the glass at the building entrance, at eye level and facing out, is a ' +
      'sheet of printer paper in forty-point type.',

      { c: 'note', t: 'WE HAVE CHILDREN IN HERE.\nWE HAVE NO FOOD TO SPARE AND NOTHING WORTH TAKING.\n' +
        'IF YOU ARE WELL, PLEASE WALK ON.\nIF YOU ARE BITTEN, PLEASE WALK ON.\nWE ARE SORRY. ' +
        'WE ARE SO SORRY. PLEASE WALK ON.' }
    ]; },
    choices: [
      { label: 'Walk on.', tone: 'kind', hint: 'as the sign asks', to: 'a2_mercy_approach',
        show: function (s) { return !daylight(s); },
        act: function (s) { s.soften(10); s.set('walkedOn'); s.scar(5); },
        toast: ['The candle goes out behind you as you pass.', 'good'] },
      { label: 'Walk on.', tone: 'kind', hint: 'as the sign asks', to: 'a2_mercy_approach',
        show: function (s) { return daylight(s); },
        act: function (s) { s.soften(10); s.set('walkedOn'); s.scar(5); },
        toast: ['When you look back from the road, the telescope has turned to follow you.', 'good'] },
      { label: 'Knock.', tone: 'risk', to: 'a2_estate_knock' },
      { label: 'Knock, and ask whoever answers to take in a sick old man.', tone: 'risk',
        show: function (s) { return withTeddy(s); }, to: 'a2_estate_beg' },
      { label: 'Try the shuttered stores. The sign says there is nothing worth taking. Check.',
        to: 'a2_estate_units' },
      { label: 'Go up. Nine floors. Take what they have.', tone: 'cruel', to: 'a2_estate_up' },
      { label: 'Shout up to them. Ask about the hospital.', tone: 'risk', hint: 'loud',
        to: 'a2_estate_shout' }
    ]
  });

  S.add({
    id: 'a2_estate_knock',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) { s.set('warnedAboutFront'); },
    text: function (s) { return [
      'I knock four times, slowly, with one knuckle, the way a person knocks.',

      daylight(s) ? 'Nine floors up, the telescope swings down toward the courtyard and stops.'
        : 'Nine floors up, the candle stops moving.',

      'Four minutes later a voice comes down the stairwell, thinned by distance: a woman, sixty or so ' +
      'by the sound of her, doing a very good job of sounding calm.',

      '<span class="said">"Please go away. I\u2019m not being unkind. There are six children in this ' +
      'building, two of them under four, and I can\u2019t \u2014 I won\u2019t \u2014 open this door. Please."</span>',

      'A pause. Then, quieter and much closer, as if she has come down two flights ' +
      'to say it properly:',

      '<span class="said">"If you\u2019re going up to the Mercy, don\u2019t go in the front. ' +
      'They\u2019re letting people in at the front."</span>'
    ]; },
    choices: [
      { label: '"Thank you." Then go.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.set('warnedAboutFront'); s.soften(8); s.set('walkedOn'); } },
      { label: 'Ask her what she means by that.', to: 'a2_estate_warning' },
      { label: 'Offer her the antibiotics through the mail slot.', tone: 'kind',
        show: function (s) { return s.has('pills'); }, to: 'a2_estate_gift' },
      { label: 'Tell her you have a sick old man and ask again.',
        show: function (s) { return withTeddy(s); },
        tone: 'risk', to: 'a2_estate_beg' },
      { label: 'Ask her whether anybody has gotten out of this town, and how.', to: 'a2_estate_holloway' }
    ]
  });

  S.add({
    id: 'a2_estate_warning',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) { s.set('warnedAboutFront'); s.set('knowsAboutMercy'); },
    text: function (s) {
      var lines = [];
      if (atTheTop(s)) {
        lines.push('I tell her through the door that nobody is going to break it down. We are on our ' +
          'way to St. Amaranth Mercy, and all I want to know is what is up there.');
        lines.push('The silence goes on so long that I think she has moved away from the door. Then, ' +
          'from just behind the barricade:');
      } else {
        lines.push('The stairwell is silent for so long that I think she has gone.');
      }
      lines.push('<span class="said">"My husband went up in the second week,"</span> she says. ' +
        '<span class="said">"Him and his brother. They were taking anybody then. Beds, hot water, a ' +
        'doctor. Real triage, lanyards, the whole show."</span>');
      lines.push('<span class="said">"His brother came back on May eleventh. Stood ' +
        (atTheTop(s) ? 'down there in the courtyard' : 'in that courtyard, where you\u2019re standing,') +
        ' and told me what the wards are for now. Then he asked to come up, and I said no, because of ' +
        'what he\u2019d helped them do. So he sat down against that fountain. He was still sitting ' +
        'there four days later."</span>');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"And they\u2019re not lying to you about the beds. ' +
        'There really are beds. There really is a doctor. Everything they tell you at the front door ' +
        'is true."</span>');
      lines.push('<span class="said">"Go in the back."</span>');
      return lines;
    },
    choices: [
      { label: '"What\u2019s in the wards?"', to: 'a2_estate_wards' },
      { label: 'Promise her you\u2019ll use the back. Then leave her alone.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(8); s.set('walkedOn'); } },
      { label: function (s) {
          return atTheTop(s)
            ? 'Slide the antibiotics under the door.'
            : 'Offer her the antibiotics through the mail slot.';
        },
        tone: 'kind', to: 'a2_estate_gift',
        /* the knock already offered them */
        show: function (s) { return s.has('pills') && !s.seen('a2_estate_knock'); } },
      { label: 'Ask her whether anybody has gotten out of this town, and how.', to: 'a2_estate_holloway',
        show: function (s) { return !s.seen('a2_estate_knock'); } },
      { label: '"Then we\u2019re not going up there."', to: 'a2_estate_notgoing' }
    ]
  });

  S.add({
    id: 'a2_estate_wards',
    chapter: CH,
    place: 'Marlowe House',
    enter: function (s) { s.set('knowsTheWards'); },
    text: function (s) {
      var lines = [];
      if (s.flag('theGift') && !atTheTop(s)) {
        lines.push('I knock again, and this time she comes down to the door. She tells me through ' +
          'the mail slot. It takes ninety seconds, in the flat, careful voice of somebody ' +
          'who has said it before to people who didn\u2019t believe her.');
      } else {
        lines.push('She tells me. It takes ninety seconds, in the flat, careful voice of somebody ' +
          'who has said it before to people who didn\u2019t believe her.');
      }
      if (s.flag('knowsTheCoats')) {
        lines.push('<span class="said">"When somebody goes onto a ward, they undress them and bag ' +
          'everything and put a label on it with the name. It all goes down to a property room, in ' +
          'case family comes asking. Nobody comes asking. You want to know why?"</span>');
      }
      lines.push('<span class="said">"They keep them alive. The turned ones. Strapped down, fed, washed. ' +
        'Properly washed, my husband\u2019s brother said. It\u2019s a real hospital; they\u2019re not ' +
        'animals about it. Whole wards of them, lying there humming at the ceiling."</span>');
      lines.push('<span class="said">"And they take the blood. A little every day, off every one of them. ' +
        'They do something to it, and what comes out the other end they give to people who\u2019ve ' +
        'been bitten. And it works. You need to hear that part properly. ' +
        '<em>It works.</em>"</span>');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('<span class="said">"The wards are full. Have been since April. So where do you suppose ' +
        'the new ones come from, when the old ones give out?"</span>');
      lines.push(atTheTop(s)
        ? 'Behind the barricade, a child says something, and a second voice hushes it.'
        : 'Nine floors up, a child says something, and a second voice hushes it.');
      return lines;
    },
    choices: [
      { label: function (s) {
          return atTheTop(s)
            ? 'Go back down without another word.'
            : 'Go. Say nothing to the others until you are clear of the projects.';
        },
        to: 'a2_mercy_approach', act: function (s) { s.scar(10); s.set('walkedOn'); } },
      { label: function (s) {
          return atTheTop(s)
            ? 'The others heard it too. Put it to a vote on the stairs.'
            : 'Tell the others in the courtyard, all of it. Put it to a vote.';
        },
        to: 'a2_vote',
        act: function (s) { s.set('toldThemTheWards'); s.trust('odile', 12); s.trust('bram', 10); s.trust('wren', 10); s.soften(5); } },
      { label: '"Then we\u2019re not going."', tone: 'kind', to: 'a2_estate_notgoing',
        /* the refusal was already offered earlier in this conversation */
        show: function (s) { return !s.seen('a2_estate_warning') && !s.seen('a2_estate_holloway'); } },
      { label: 'Ask her husband\u2019s name. In case you see him up there.', tone: 'kind',
        show: function (s) { return s.seen('a2_estate_warning') || s.seen('a2_estate_holloway'); },
        to: 'a2_mercy_approach',
        act: function (s) { s.set('knowsHerHusband'); s.set('walkedOn'); s.scar(8); s.soften(4); },
        toast: ['"Joe Pask. He has a swallow tattooed on his left hand." She says has, not had.', 'good'] }
    ]
  });

  S.add({
    id: 'a2_estate_notgoing',
    chapter: CH,
    place: 'The Fenwick Houses',
    text: function (s) {
      var lines = [
        atTheTop(s)
          ? 'I say it out loud on the stairs, and it lands like a dropped plate.'
          : 'I say it out loud in the courtyard, by the dry fountain, and it lands like a dropped plate.'
      ];
      lines.push('<span class="said">"Not going,"</span> Bram repeats. <span class="said">' +
        '"To the only building in this county that\u2019s got electricity."</span>');
      if (withTeddy(s)) {
        lines.push('<span class="said">"On the word of a frightened woman behind a door,"</span> ' +
          'he goes on, <span class="said">"you want to turn a dying man around and walk him away ' +
          'from a doctor."</span>');
      }
      if (s.flag('knowsTheWards')) {
        lines.push('Odile is quiet for a while. Then: <span class="said">"She said it works."</span>');
        lines.push('<span class="said">"She did say that,"</span> I agree.');
        lines.push('<span class="said">"Listen to me,"</span> Odile says. <span class="said">"In thirty ' +
          'years I have never heard anybody describe an atrocity and a cure in the same breath and be ' +
          'wrong about <em>both</em>."</span>');
      } else {
        lines.push('Odile is quiet for a while. Then: <span class="said">"She told you not to use the ' +
          'front door. She never said to stay away."</span>');
        lines.push('<span class="said">"No, she didn\u2019t,"</span> I agree.');
        lines.push('<span class="said">"Then she knows what is inside, and she still thinks there is ' +
          'a way in worth taking. I would like to know her reason before I decide it is not ' +
          'good enough."</span>');
      }
      return lines;
    },
    choices: [
      { label: 'Go anyway. In the back. Eyes open.', to: 'a2_mercy_approach',
        act: function (s) { s.set('warnedAboutFront'); s.scar(6); } },
      { label: function (s) {
          return s.flag('knowsBoat')
            ? 'Go to the river instead. Find Holloway\u2019s boat.'
            : 'Go to the river instead. Away from the Mercy.';
        },
        to: 'a2_river', act: function (s) { s.set('refusedMercy'); } },
      { label: 'Put it to a vote.', to: 'a2_vote',
        show: function (s) { return !s.seen('a2_estate_wards'); } },
      { label: 'Go alone. Send the others to the water.', tone: 'risk', to: 'a2_mercy_approach',
        act: function (s) { s.set('wentAlone'); s.set('sentThemToWater'); s.soften(8); s.scar(10); } }
    ]
  });

  S.add({
    id: 'a2_vote',
    chapter: CH,
    place: 'A show of hands',
    text: function (s) {
      var lines = [];
      if (s.seen('a2_culvert_turn')) {
        lines.push('At the far end of the culvert, under the embankment, I pass the tag around. ' +
          'Then I ask for a show of hands.');
      } else if (atTheTop(s)) {
        lines.push('A show of hands on the ninth-floor landing, with the barricade at our backs.');
      } else {
        lines.push('A show of hands by the dry fountain. The plaza around us is silent.');
      }
      lines.push('Bram: the Mercy. Straight away, and without apology.');
      lines.push('Odile: the Mercy, and she adds, <span class="said">"with my eyes open, and with ' +
        'something sharp in my coat."</span>');
      if (withTeddy(s)) {
        lines.push('Teddy keeps his hand down. <span class="said">"I am the reason you ' +
          'are going,"</span> he says. A breath. <span class="said">"The reason does not get a vote, ' +
          'child. Those are the rules."</span>');
      }
      lines.push({ c: 'whisper', t: 'Wren holds up the pad.' });
      lines.push({ c: 'pad', t: s.flag('knowsBoat') ? 'the boat' : 'the river' });
      lines.push({ c: 'pad', t: 'i know its not sensible. im voting for it anyway. you asked' });
      return lines;
    },
    choices: [
      { label: 'The Mercy. The majority has it.', to: 'a2_mercy_approach',
        act: function (s) { s.trust('wren', -10); } },
      { label: function (s) {
          return s.flag('knowsBoat')
            ? 'The boat. Overrule them. Wren is right.'
            : 'The river. Overrule them. Wren is right.';
        },
        tone: 'kind', to: 'a2_river',
        act: function (s) { s.trust('wren', 25); s.trust('bram', -15); s.soften(6); } },
      { label: 'The Mercy, but Odile and Wren wait at the foot of the hill until you signal.',
        to: 'a2_mercy_approach',
        act: function (s) { s.set('leftWrenBehind'); s.trust('wren', -5); s.trust('odile', -5); } },
      { label: 'Split up. Go up by two different roads and meet at the gate.', tone: 'risk',
        to: 'a2_mercy_approach',
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
    text: function (s) {
      var top = atTheTop(s);
      var lines = [
        top ? 'I slide four capsules of expired amoxicillin under the fire door.'
          : 'Four capsules of expired amoxicillin go through the mail slot.',

        (s.seen('a2_estate_knock')
          ? 'It isn\u2019t enough for six children.'
          : 'It isn\u2019t enough for however many children are in there.') +
        ' It isn\u2019t really enough for one. I do it anyway, and the foil strip ' +
        (top ? 'skids across the floor on the other side.' : 'lands with a small bright sound on the tiles inside.'),

        top ? 'A long silence. Then a voice, right behind the door and badly shaken, says:'
          : 'A long silence. Then the flap lifts an inch from the inside, and a voice, ' +
            'very close and badly shaken, says:',

        '<span class="said">"Oh. Oh, you absolute \u2014"</span> She doesn\u2019t finish.' +
        (top ? '' : ' The flap drops shut.'),

        { c: 'sep', t: '\u2042' },

        (top ? 'By the time we are back down in the courtyard, a bundle drops from the ninth-floor ' +
            'window and hits the concrete'
          : 'Four minutes later a bundle drops from a ninth-floor window and hits the courtyard') +
        ' with a crack: a knotted pillowcase holding nine cans of soup, a sleeve of crackers, ' +
        'a flashlight with a working battery, and a dish towel printed with a map of Cornwall.'
      ];
      return lines;
    },
    choices: [
      { label: 'Take it all. Say thank you to a window.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.give('tinned', 9); s.soften(6); s.set('theGift'); s.set('walkedOn'); } },
      { label: 'Take the food. Leave the flashlight. They need it more.', tone: 'kind',
        to: 'a2_mercy_approach',
        act: function (s) { s.give('tinned', 9); s.soften(12); s.set('theGift'); s.set('walkedOn'); } },
      { label: 'Take it and go back for the rest later.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.give('tinned', 9); s.harden(14); s.set('theGift'); s.set('plannedToReturn'); } },
      { label: 'Take it, then knock again. Ask her what happens at the Mercy.',
        show: function (s) { return !atTheTop(s); }, to: 'a2_estate_wards',
        act: function (s) { s.give('tinned', 9); s.soften(6); s.set('theGift'); } }
    ]
  });

  S.add({
    id: 'a2_estate_beg',
    chapter: CH,
    place: 'Marlowe House',
    text: function (s) {
      var lines = [];
      if (s.seen('a2_estate_knock')) {
        lines.push('I tell her about Teddy. I don\u2019t dress it up: seventy-one, one lung, ' +
          'less breath every night, and we\u2019re trying to get him four miles uphill.');
      } else {
        lines.push('I knock. Four minutes later a woman\u2019s voice comes down the stairwell, thinned ' +
          'by distance, asking me please to go away. There are children in the building.');
        lines.push('I tell her about Teddy instead. I don\u2019t dress it up: seventy-one, one lung, ' +
          'less breath every night, and we\u2019re trying to get him four miles uphill.');
      }
      lines.push('The stairwell is quiet for a long time.');
      lines.push('<span class="said">"I\u2019m going to say no,"</span> she says at last, <span class="said">' +
        '"and I\u2019ll have to live with having said it. I want you to know I understood what I was ' +
        'saying no to. I won\u2019t pretend to myself that I didn\u2019t."</span>');
      lines.push('<span class="said">"There are six of them upstairs. Two under four. That\u2019s all my ' +
        'reasoning, and it isn\u2019t enough, and it\u2019s still the answer."</span>');
      lines.push('Then the flap of the mail slot lifts, and a strip of amoxicillin comes through it, ' +
        'eight capsules, followed by a small bottle of water pushed through on its side.');
      return lines;
    },
    choices: [
      { label: 'Take it. Tell her she is not a bad person.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.give('pills', 8); s.soften(10); s.set('walkedOn'); } },
      { label: 'Take it and say nothing.', to: 'a2_mercy_approach',
        act: function (s) { s.give('pills', 8); s.scar(6); s.set('walkedOn'); } },
      { label: 'Leave it on the step. You will not be bought.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.harden(10); s.scar(8); } }
    ]
  });

  S.add({
    id: 'a2_estate_holloway',
    chapter: CH,
    place: 'Marlowe House',
    /* she names the boat out loud, which is how you come to know about it */
    enter: function (s) { s.set('knowsHolloway'); s.set('knowsBoat'); },
    text: [
      '<span class="said">"Nobody I know of,"</span> she says. <span class="said">"One man could have. ' +
      'Dennis Holloway. Boat at the sailing club. Chest like a bag of wrenches."</span>',

      'A pause, and when she speaks again the careful calm has slipped a little.',

      '<span class="said">"He went up the same week as my husband. Ward Eleven. He\u2019s why ' +
      'I know about Ward Eleven."</span>',

      '<span class="said">"If it\u2019s his boat you\u2019re after, you\u2019d better understand ' +
      'what you\u2019ll find in that bed. He won\u2019t be able to tell you anything. ' +
      'But he\u2019ll have his coat. They keep the coats. They\u2019re very organized about the coats."</span>'
    ],
    choices: [
      { label: 'Tell her you\u2019re sorry about her husband. Then go.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(6); s.set('walkedOn'); } },
      { label: 'Ask what she means about the coats.', to: 'a2_estate_wards',
        act: function (s) { s.set('knowsTheCoats'); } },
      { label: '"Then we\u2019re not going up there."', to: 'a2_estate_notgoing',
        show: function (s) { return !s.seen('a2_estate_warning'); } },
      { label: 'Ask her name.', to: 'a2_mercy_approach',
        show: function (s) { return s.seen('a2_estate_warning'); },
        act: function (s) { s.set('askedHerName'); s.set('walkedOn'); s.soften(6); },
        toast: ['"Ilse," she says, after a while. "Nobody has asked me that since April."', 'good'] }
    ]
  });

  S.add({
    id: 'a2_estate_shout',
    chapter: CH,
    place: 'The Fenwick Houses',
    enter: function (s) { s.scar(10); s.set('shoutedInTheCourtyard'); },
    text: function (s) { return [
      'I tip my head back and shout up nine floors of concrete.',

      daylight(s) ? 'On the ninth floor, the telescope jerks back from the glass, and the window is empty.'
        : 'The candle goes out.',

      'The plaza answers from every side. From the shuttered stores all around the horseshoe, ' +
      'behind the roll-down doors of the pharmacy, the betting shop, and the shop that ' +
      'sold phone cases, a humming starts in six places at once and draws together. They have ' +
      'been in there all along, shuffling in the dark among the stock.',

      { c: 'hum', t: 'h m m m m m m m' },

      'Bram has me by the arm before the echo has died.'
    ]; },
    choices: [
      { label: 'Run northeast. Don\u2019t stop until you\u2019re clear of the projects.', to: 'a2_mercy_approach',
        show: function (s) { return !s.flag('bramEye'); },
        act: function (s) { s.hurt(12); s.scar(10); } },
      { label: 'Run northeast on Bram\u2019s left. He can\u2019t see them coming on that side.', tone: 'kind',
        hint: 'they reach you instead of him',
        show: function (s) { return s.flag('bramEye'); }, to: 'a2_mercy_approach',
        act: function (s) { s.hurt(16); s.scar(10); s.soften(4); s.trust('bram', 15); s.set('tookHisBlindSide'); },
        toast: ['Hands catch your sleeve from his blind side, and you tear free. He never sees them.', 'bad'] },
      { label: 'Get into the stairwell. Up is a direction.', tone: 'risk', to: 'a2_estate_up',
        act: function (s) { s.hurt(8); } },
      { label: 'Run back to the river.', to: 'a2_river',
        act: function (s) { s.hurt(10); s.scar(8); } },
      { label: 'Shout again. Louder. Draw them away from the building.', tone: 'kind', to: 'a2_estate_draw' }
    ]
  });

  S.add({
    id: 'a2_estate_draw',
    chapter: CH,
    place: 'The Fenwick Houses',
    enter: function (s) {
      s.hurt(20); s.infect(8); s.scar(16); s.soften(16);
      s.set('drewThemOff');
    },
    text: [
      'I do the stupidest and most decent thing I have done since April 11. ' +
      'I walk backward into the middle of the plaza, shouting at the top of my voice, ' +
      'away from the building, away from the stairwell, away from the children behind that sign.',

      'They come. All of them, out of the stores and out of the dark, converging on the noise like ' +
      'water finding a drain.',

      'I get out through the dumpster enclosure with eleven seconds to spare. Before that, a hand ' +
      'gets my collar and another comes around from behind and takes my chin, and for a moment they ' +
      'are turning my face back toward them, gently, humming into my hair. I tear loose and leave ' +
      'them the coat\u2019s lining and a <span class="wound">fingernail gouge down the length of my back</span>. ' +
      'Odile, later, with professional distaste: <span class="said">"Not deep, but filthy."</span>',

      { c: 'sep', t: '\u2042' },

      'Ninety yards clear, on the access road, Bram stops me with a hand flat on my chest. ' +
      'I have not seen that look on him before.',

      '<span class="said">"Don\u2019t ever do that again,"</span> he says. His voice isn\u2019t steady. ' +
      '<span class="said">"And thank you. And don\u2019t ever do that again."</span>'
    ],
    choices: [
      { label: 'Let Odile see the back. Now, before it closes.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { if (s.has('gauze')) s.take('gauze'); s.heal(4); s.trust('odile', 15); } },
      { label: 'Say it was nothing. Keep walking.', to: 'a2_mercy_approach',
        act: function (s) { s.hurt(6); s.harden(4); s.scar(6); } },
      { label: '"I\u2019d do it again."', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(8); s.trust('bram', 20); s.trust('wren', 20); } },
      { label: 'Ask Bram whether he would have.', to: 'a2_mercy_approach',
        act: function (s) { s.trust('bram', -10); s.scar(6); },
        toast: ['He does not answer. He walks ahead for an hour.', 'bad'] }
    ]
  });

  S.add({
    id: 'a2_estate_units',
    chapter: CH,
    place: 'The Fenwick Houses',
    text: [
      'I try the shutters one by one, quietly, along the horseshoe.',

      'The pharmacy is stripped. So is the betting shop. Nobody has touched the phone-case ' +
      'shop in six weeks, because it sells phone cases.',

      'The last store is a butcher shop. The shutter is already up two feet, and the smell ' +
      'coming from under it is \u2014',

      { c: 'sep', t: '\u2042' },

      'Bleach, strong enough to make my eyes water, and recent. Somebody has scrubbed this ' +
      'place down in the last week.',

      'Inside, in the dark, every surface is clean and every blade racked and oiled. ' +
      'On the counter by the register, squared off in a neat pile, are forty or so ' +
      '<span class="wound">lanyards with photographs on them</span>.',

      { c: 'note', t: 'ST. AMARANTH MERCY \u00b7 VISITOR \u00b7 DAY PASS' }
    ],
    choices: [
      { label: 'Take one lanyard. Leave the rest just as they are.', tone: 'risk',
        to: 'a2_mercy_approach',
        act: function (s) { s.give('badge'); s.set('tookLanyard'); s.scar(12); s.set('sawTheButchers'); },
        toast: ['A visitor\u2019s day pass, with somebody else\u2019s face on it.', 'item'] },
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
    text: function (s) {
      var lines = [
        'Nine floors of stairwell in the dark. At the top, a fire door, and behind the fire door ' +
        'a barricade of furniture that went up in a hurry, early on, and has been added to ' +
        'ever since.'
      ];
      if (s.flag('shoutedInTheCourtyard')) {
        lines.push('Below us the humming fills the courtyard. None of it comes up the stairs.');
      }
      lines.push('I can hear them through it. Somebody is whispering a child through a nightmare. Somebody ' +
        'else is counting under their breath, over and over: a game, or a way of not screaming.');
      lines.push('The door will give. It will be slow and loud, but it will give. ' +
        (s.has('cutters') ? 'I have bolt cutters' : 'I can work at the hinges') +
        ', and the others are here to add their weight.');
      lines.push({ c: 'sep', t: '\u2042' });
      lines.push('On the other side of that door is whatever food they have left, and ' +
        (s.seen('a2_estate_knock') ? 'six children.' : 'the children from the sign.'));
      return lines;
    },
    choices: [
      { label: 'Go back down. All the way down. Now.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.soften(16); s.ease(6); s.set('turnedBackAtTheDoor'); },
        toast: ['Nobody says anything about it on the way down.', 'good'] },
      { label: 'Tell them through the door that you are leaving. Then leave.', to: 'a2_mercy_approach',
        act: function (s) { s.soften(6); s.set('turnedBackAtTheDoor'); } },
      { label: 'Talk to her through the door. Ask about the Mercy.', to: 'a2_estate_warning' },
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
      'who gets left. And every day there was a form to fill out afterward, with a name at ' +
      'the bottom, and the name was mine."</span>',

      '<span class="said">"There\u2019s no form now. So no. Down. We\u2019re going down."</span>'
    ],
    choices: [
      { label: 'Go down.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.trust('bram', 25); s.soften(12); s.set('turnedBackAtTheDoor'); } },
      { label: 'Go down, and apologize to him on the stairs.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.trust('bram', 35); s.soften(14); s.set('turnedBackAtTheDoor'); s.set('apologisedToBram'); } },
      { label: 'Overrule him. Take the door yourself.', tone: 'cruel', to: 'a2_estate_breakin',
        act: function (s) { s.trust('bram', -35); } },
      { label: 'Go down, but take the bolt cutters off him first.', tone: 'cruel',
        show: function (s) { return s.has('cutters'); },
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
    text: function (s) { var day = daylight(s); return [
      'It takes nineteen minutes, the loudest of the ' + (day ? 'day' : 'night') + ', and nobody ' +
      'inside the apartment stops screaming for any of it.',

      'They don\u2019t fight me. I wasn\u2019t ready for that. A woman in her sixties stands in ' +
      'front of six children with a bread knife held wrong, and when the barricade finally goes she ' +
      'says <span class="said">"take it, take it, take all of it, please just \u2014"</span> and steps aside.' +
      (day ? ' Behind her, at the window, a white telescope on a tripod is still pointed down at Quay Road.' : ''),

      'I take nine cans of soup, four capsules of amoxicillin, and a flashlight with a working battery ' +
      'from six children and a woman whose name I never asked.',

      { c: 'sep', t: '\u2042' },

      'Odile does not speak to me on the stairs. Wren walks eleven feet behind me for the rest ' +
      'of the ' + (day ? 'day' : 'night') + ' and won\u2019t come closer. When I stop, she stops, and the gap stays ' +
      'the same.',

      (day ? 'Nobody comes back to the window.' : 'Nobody relights the candle.')
    ]; },
    choices: [
      { label: 'Go. Do not look back at the window.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.harden(10); } },
      { label: 'Leave the pills on the step on the way out.', to: 'a2_mercy_approach',
        act: function (s) { s.take('pills', 4); s.soften(6); s.scar(8); s.set('leftThePills'); } },
      { label: 'Go back up and give all of it back.', tone: 'kind', to: 'a2_mercy_approach',
        act: function (s) { s.take('tinned', 9); s.take('pills', 4); s.soften(18); s.scar(14);
          s.trust('wren', 25); s.trust('odile', 20); s.set('gaveItBack'); },
        toast: ['She will not open the door again. You leave it all on the landing.', 'good'] },
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
        'The culvert carries the stream under Quay Road and the railroad and comes out, according to ' +
        'a sign nobody has read since 1987, on the far side of the embankment. It puts us ' +
        'two miles closer and spares us the open ground.',

        'It is four feet high. We go bent double through eight inches of cold water, single file, ' +
        'in the dark, for six hundred yards.'
      ];
      if (withTeddy(s)) {
        lines.push('Teddy can\u2019t go bent double. He goes on his hands and knees, his chest ' +
          'four inches above the water, and I can hear what that does to a man with one lung.');
      }
      if (s.flag('bramEye')) {
        lines.push('Bram comes behind me with one hand flat on the curve of the pipe. With one eye he ' +
          'can\u2019t judge the roof, and every few yards I hear his head knock against the concrete.');
      }
      if (s.flag('hasAtlas')) {
        lines.push('Two hundred yards in, the first pipe ends in the railroad cut, as the atlas showed: ' +
          'thirty yards of open ditch between steep banks, with the tracks along the top. Then the ' +
          'second pipe, under the embankment.');
      }
      lines.push('Five hundred yards in, the far end shows ahead: ' +
        (daylight(s) ? 'a coin of gray daylight' : 'a coin of night a shade paler than the pipe') +
        '. My flashlight finds the first of them a few yards short of it.');
      lines.push('It stands in the water at a slant, one shoulder against the curve of the pipe, its chin ' +
        'tipped toward the mouth. It does not turn around. We edge past it one at a time, close ' +
        'enough to touch, and it does not lower its face.');
      lines.push('There are more beyond it, nine in all, strung out through the last fifty yards, each ' +
        'one leaning at its own angle, each face tipped toward that round of ' +
        (daylight(s) ? 'light' : 'paler dark') + ', each one humming.');
      lines.push({ c: 'hum', t: 'h m m m m m m m' });
      return lines;
    },
    choices: [
      { label: 'Keep going. Do not touch any of them.', to: 'a2_mercy_approach',
        show: function (s) { return !s.flag('bramEye'); },
        act: function (s) { s.scar(12); s.hurt(6); } },
      { label: 'Keep going, and lead Bram by the hand. With one eye he can\u2019t judge the pipe.',
        tone: 'kind', hint: 'slower, and close to them the whole way',
        show: function (s) { return s.flag('bramEye'); }, to: 'a2_mercy_approach',
        act: function (s) { s.scar(14); s.hurt(6); s.soften(4); s.trust('bram', 12); s.set('ledBramThrough'); },
        toast: ['Halfway past the nine, a face comes within inches of his blind side. You pull him on.', 'rot'] },
      { label: 'Kill them. All nine. While their faces are turned away.', tone: 'cruel',
        show: function (s) { return s.has('knife') || s.has('cutters') || s.flag('bramHasRailing'); },
        to: 'a2_culvert_kill' },
      { label: 'Turn one of them around. You need to see its face.', tone: 'risk',
        to: 'a2_culvert_turn' },
      { label: 'Back out. Take the river after all.', to: 'a2_river',
        act: function (s) { s.scar(8); s.hurt(4); } },
      { label: 'Back out. Cut through the Fenwick Houses instead.', to: 'a2_estate',
        act: function (s) { s.scar(8); s.hurt(4); } },
      { label: 'Go back to the railroad cut and climb out. Follow the tracks instead.',
        hint: 'you skip the nine; the tracks are open ground',
        show: function (s) { return s.flag('hasAtlas'); }, to: 'a2_mercy_approach',
        act: function (s) { s.set('climbedOutAtTheCut'); s.scar(6); } }
    ]
  });

  S.add({
    id: 'a2_culvert_kill',
    chapter: CH,
    place: 'The culvert',
    enter: function (s) {
      s.harden(22); s.scar(22); s.hurt(10); s.infect(4);
      s.set('cullediInTheCulvert'); s.bump('killed', 9);
    },
    text: function (s) {
      var how = s.has('knife') ? 'I use the boning knife.'
        : (s.has('cutters') ? 'I use the bolt cutters.'
          : 'Bram hands me the length of railing he picked up on Ferry Street.');
      return [
        'Nine of them, faces tipped toward the opening, in eight inches of water, in a ' +
        'four-foot pipe. ' + how,

        'The first two die without lowering their faces. The third, as I reach it, brings both hands ' +
        'down to my face and takes hold of my jaw, very gently, thumbs at the hinge, and hums at me from ' +
        'four inches away until its hands stop working. After that every one of them does the same. ' +
        'None of them hits me. The work is wet, close, and repetitive, and the hum goes on in each one ' +
        'until it physically can\u2019t, and stops mid-note.',

        'The ninth one is small.',

        { c: 'sep', t: '\u2042' },

        'Nobody helps me, and nobody stops me. Bram holds the flashlight at the right angle for ' +
        'twenty minutes without being asked, and we both know that counts as helping.',

        'Afterward Wren won\u2019t walk through the water. Odile carries her the last fifty yards ' +
        'on her back. The water comes over the tops of Odile\u2019s boots and she says nothing about it.'
      ];
    },
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
    enter: function (s) { s.scar(18); s.infect(2); s.set('turnedOneAround'); },
    text: [
      'I put a hand on its shoulder. The fabric is sodden, and the flesh under it is ' +
      '<span class="cold">cold and firm</span>, like meat from the fridge. I turn it to face me.',

      'It lets me. It turns like a mannequin on a stand, and then its face is ' +
      'four inches from mine in the beam of the flashlight. Its hands come up, slowly, and settle ' +
      'on either side of my jaw. The thumbs find the hinge. Odile takes it by the wrists and lifts ' +
      'the hands away, one and then the other, and it lets her do that too.',

      'A woman of about thirty. Her eyes have gone the way they all go. The jaw hangs slack and ' +
      'the throat works steadily at the note. Across her face, under the dirt, run ' +
      '<span class="wound">long pale scars in a regular pattern</span>: ' +
      'four of them, parallel and evenly spaced, cheek to jaw.',

      'They are old, months old, healed flat and white, which puts them before April 11. Made with ' +
      'instruments, in a hospital I would guess, by somebody who was being careful.',

      'That stops me. Before April 11 there was no Hush, and no reason I can think of for anybody ' +
      'to cut a woman\u2019s face like this and then let it heal. I count back the months twice and get ' +
      'the same answer. Odile has seen it too. She says nothing, and from Odile that means she ' +
      'has no explanation either.',

      { c: 'note', t: 'On a cord around her neck, under the collar: ST. AMARANTH MERCY \u00b7 ' +
        'DONOR \u00b7 WARD 11 \u00b7 H-0441' },

      'Donor. Ward Eleven. And a four-digit number that somebody thought worth stamping into metal.'
    ],
    choices: [
      { label: 'Take the tag. Show the others and ask what they want to do.', to: 'a2_vote',
        act: function (s) { s.give('badge'); s.set('knowsTheWards'); s.set('hasDonorTag'); s.scar(10);
          s.trust('odile', 10); s.trust('bram', 10); } },
      { label: 'Take the tag. Tell nobody yet.', tone: 'cruel', to: 'a2_mercy_approach',
        act: function (s) { s.give('badge'); s.set('knowsTheWards'); s.set('hasDonorTag'); s.set('secretTag'); s.harden(10); } },
      { label: 'Turn her back toward the opening, the way she was.', tone: 'kind', to: 'a2_mercy_approach',
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
    place: 'St. Amaranth Mercy',
    enter: function (s) {
      s.set('atTheMercy');
      if (s.flag('wentAlone')) s.set('groupCaughtUp');
      if (s.alive('teddy')) s.set('teddyMadeIt');
    },
    text: function (s) {
      var teddy = s.alive('teddy');
      var lines = [
        'The hill takes an hour. The last quarter-mile is an avenue of lime trees, and somebody has ' +
        'been pruning them. Four miles of dead city did not get to me the way that does.'
      ];
      /* everyone who set out reaches the gate; how they get there depends on the plan */
      if (s.flag('groupCaughtUp')) {
        lines.push((s.flag('sentThemToWater')
          ? 'I sent the others to the river. They didn\u2019t go. When I turn at the gate, they are ' +
            'already coming up through the limes. '
          : 'I reach the gate ahead of the others. When I turn to signal that the road is ' +
            'clear, they are already coming up through the limes. ') +
          (teddy ? 'Bram has Teddy\u2019s arm. ' : 'Wren has the flashlight. ') +
          'None of them was willing to wait for my say-so.');
      } else if (s.flag('tookBram')) {
        lines.push('Bram and I reach the gate first and wait under the limes. Odile and Wren come up ' +
          'the avenue an hour behind us' + (teddy ? ', with Teddy between them.' : '.'));
      } else if (s.flag('splitTheGroup')) {
        lines.push('We reach the gate by two roads, twenty minutes apart. Bram counts heads twice.');
      } else if (s.flag('leftWrenBehind')) {
        lines.push('Odile and Wren stop at the foot of the avenue, as agreed, to wait for my signal.');
      }
      if (teddy) {
        lines.push(s.flag('leftWrenBehind')
          ? 'Teddy comes the rest of the way on Bram\u2019s arm. Nobody expected him to make it. ' +
            'At the gate he stops, straightens up as far as he can, and puts his collar right. ' +
            'He is seventy-one, and this is a hospital.'
          : 'Teddy makes it. Nobody expected him to, least of all Odile, who has walked ' +
            'every yard of it at his shoulder with a hand ready at his elbow. At the gate he stops, ' +
            'straightens up as far as he can, and puts his collar right. He is seventy-one, ' +
            'and this is a hospital.');
      } else if (s.flag('leftWrenBehind')) {
        lines.push('Bram and I walk the last stretch together. All the way here we have walked with ' +
          'a gap where Teddy would have been. Nobody steps into it.');
      } else {
        lines.push(s.partyCount()
          ? 'There are ' + numberWord(s.partyCount() + 1) + ' of us at the gate. All the way here we ' +
            'have walked with a gap where Teddy would have been. Nobody steps into it.'
          : 'I reach the gate alone. I still leave room beside me for Teddy.');
      }
      if (s.flag('heldAtTheBoat')) {
        lines.push('Down on the river the boat is still tied to the dock. I spent ' +
          (s.flag('leftBoatAfterLastNight') ? 'three days' : 'two days') +
          ' pretending its canopy was a roof. ' +
          (teddy ? 'Teddy keeps his eyes on the lit windows and not on me.' :
            'Nobody asks whether the extra nights changed anything.'));
      } else if (s.flag('tookFromTheChildren')) {
        lines.push(s.flag('gaveItBack')
          ? 'Bram reads the word <em>Mercy</em> over the entrance. I left the cans on the ' +
            'landing at Marlowe House, but neither of us can stop hearing the children behind that door.'
          : 'Bram reads the word <em>Mercy</em> over the entrance and looks at the cans I ' +
            'carried out of Marlowe House. Neither of us can call this place a refuge without ' +
            'thinking of those children.');
      } else if (s.flag('drewThemOff')) {
        lines.push('The scrape from the projects has bled through my shirt. Wren checks it ' +
          'without being asked. If it worked, the children at Marlowe House have had an hour of quiet.');
      } else if (s.flag('tookCulvert')) {
        lines.push((s.flag('climbedOutAtTheCut')
          ? 'My cuffs are still wet from the culvert, and my boots are gray with dust from the tracks. '
          : 'My cuffs are still wet from the culvert. ') +
          (s.flag('ledBramThrough')
            ? 'Bram let go of my hand at the mouth of the pipe, and neither of us has mentioned it. ' : '') +
          'When the hum rises behind the ' +
          'east wing, it is the same note I heard under the road.');
      } else if (s.flag('tookRiver')) {
        lines.push('For most of the walk the river kept them back. Up here there is no water ' +
          'between me and the humming from the east wing.');
      } else if (s.flag('tookEstate')) {
        lines.push('Somewhere below is Marlowe House, with its sign asking us to walk on. ' +
          'Up here is a place that says it takes in everyone.');
      }
      lines.push({ c: 'sep', t: '\u2042' });
      if (daylight(s)) {
        lines.push('St. Amaranth Mercy is a Victorian hospital with two modern wings. Every window ' +
          'is lit, in full daylight, as if electricity cost nothing. Somewhere behind the ' +
          'kitchens a generator runs with the deep, steady note of a machine that has been serviced.');
        lines.push('The front doors stand open onto a lobby under bright ceiling lights. ' +
          'Inside, at a desk under a sign that says RECEPTION, a man in a clean fleece sits reading a ' +
          'paperback, waiting.');
      } else {
        lines.push('St. Amaranth Mercy is a Victorian hospital with two modern wings. Every window ' +
          'is lit. Somewhere behind the kitchens a generator runs with the deep, ' +
          'steady note of a machine that has been serviced.');
        lines.push('The front doors stand open, and warm yellow light spills down the steps onto the gravel. ' +
          'Inside, at a desk under a sign that says RECEPTION, a man in a clean fleece sits reading a ' +
          'paperback, waiting.');
      }
      lines.push('Over the door, carved in 1874, is the hospital\u2019s motto:');
      lines.push({ c: 'note', t: 'WE TAKE IN ALL WHO COME' });
      if (s.flag('warnedAboutFront')) {
        lines.push('A woman in a high-rise told me: <em>go in the back.</em>');
      } else if (s.seen('a2_culvert_turn')) {
        lines.push('The tag in the culvert said Ward Eleven. I can still see the face above it.');
      }
      return lines;
    },
    choices: [
      { label: 'Walk up the steps and through the front door.', hint: 'straight to reception, in full view', to: 'a3_reception' },
      { label: 'Go around. Find the back.', tone: 'risk', hint: 'away from reception',
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
    text: function (s) { return [
      'An hour and a little more in the wet grass under the limes, watching a hospital work.',

      'A man crosses from the main building to the kitchens carrying a covered tray. ' +
      'Fifteen minutes later he comes back with it uncovered and empty. Two people in scrubs walk the ' +
      'perimeter of the east wing' + (daylight(s) ? '' : ' with flashlights') +
      ', talking, and one of them laughs at something.',

      'Then double doors open at the back of the east wing and four people wheel out ' +
      'a gurney with a shape on it under a sheet. They take it down a service road and come back ' +
      'eleven minutes later with the gurney empty.',

      'Twenty minutes later they do it again.' +
      (s.flag('bramEye') ? ' Bram counts the trips under his breath, his head turned to keep his good eye on the doors.' : ''),

      { c: 'sep', t: '\u2042' },

      'And every twenty minutes, as regular as breathing, from the east wing: ' +
      'the sound of a great many people humming in a large room with hard floors.',

      { c: 'hum', t: 'h m m m m m m m' },

      'The lights never so much as flicker. Everything here runs on a schedule.'
    ]; },
    choices: [
      { label: 'Front door. Walk in like a patient.', to: 'a3_reception' },
      { label: 'The service road. Follow where the gurneys go.', tone: 'risk', to: 'a3_service' },
      { label: 'The back of the east wing. Those double doors.', tone: 'risk', to: 'a3_back' },
      { label: 'Send one person in alone.', tone: 'risk', to: 'a3_split' },
      { label: 'Leave. Go back down to the river.', tone: 'kind',
        show: function (s) { return s.flag('knowsBoat'); }, to: 'a3_refuse' }
    ]
  });
})();
