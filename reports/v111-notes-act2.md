# v1.11 notes: story-act2.js (Act II)

Verification (live folder, with the other agents' in-progress files loaded):
- `_audit.js`: **RESULT: clean.** No structural problems, runtime errors, dead ends or choice-count violations. Every
  targeted check passes. No passage is below the 1% minimum, and no Act II passage is on the list.
- `reach.js` (10,000 walks): every Act II passage is at **1.52% or higher**. The rarest are a2_estate_notgoing (1.52%)
  and a2_boat_hotwire (1.53%).
- I made no changes to the choices in `a2_mercy_approach`, `a2_lorry_open` or `a2_boat`. All audit anchors are unchanged.
  The code is ES3 only, and no ids or flags were renamed or removed. I only touched story-act2.js.
- One thing for the coordinator, outside my file: `end_body_failed` measured 0.90% in one reach run and 1.02% in the
  next. The Act 3 agent is changing that gate.

## 1. PENDING REVIEW

**1. Marlowe House by day: the telescope, and why "Walk on" now has two versions (your item 2.9)**
- **What the reader sees:** Act II takes place in daylight when you left the drugstore at dawn (you waited for morning,
  or sat with Teddy's body). At night, the ninth-floor sign of life is still a candle. By day, the washing is gone, and
  the text now reads like this on Quay Road:
  "every window blank except one on the ninth floor of Marlowe House, where something keeps flashing. / It catches the
  low sun, goes dark, and catches it again. I watch long enough to see it move: a short white tube on three legs, just
  inside the glass, swinging slowly along the road and back. A telescope on a tripod. Nobody buys one of those to watch
  a road. Whoever lives up there was looking at the planets before April, and has tipped it down to watch the street."
  - Later passages follow it. The telescope swings down toward the courtyard when you knock. It jerks back from the glass
    when you shout. If you break in, you see it at the window. Bram says, "Somebody's watching the road through a
    telescope. That's a person."
  - `sawTelescope` is set at Quay Road on every daylight run, for the Act 3 aliens beat.
  - The view from the cab roof (a2_lorry_climb) changed from "The morning is gray" to "The sun is barely over the roofs", so there is
    sun for the glint.
- **The "Walk on" explanation you asked for:** in the courtyard, the woman's sign says PLEASE WALK ON. If you choose
  "Walk on.", the game shows a small pop-up message (a "toast") as you leave. The pop-up text is fixed: it can't change
  with the time of day. In v1.8 it said "The candle goes out behind you as you pass", which is wrong in daylight. In
  v1.10 I replaced it with a neutral line that worked at any hour. Now there are two "Walk on." choices with the same
  label, and the game only ever shows one of them:
  - **Night:** "The candle goes out behind you as you pass." This is the original v1.8 line.
  - **Day:** "When you look back from the road, the telescope has turned to follow you."
- **If yes:** it stays.
- **If no:** tell me what to change.
- **Default:** done.

| Answer |
|--------|
|        |

**2. The blind man on Quay Road (`blindManSeen`): new names and details**
- **What:** he stands alone at the river railing in "a cardigan buttoned wrong and one brown slipper", face tipped up and
  humming: "Where his eyes should be there are two shallow hollows of old, shiny scar." Every run passes Quay Road, so
  the flag is set on every run that gets that far.
  - **Invented names:** the man is **Ansel Dray**. The factory is **Corrigan Coil**, and the fire started when "the switch
    room went up".
  - **Teddy present:** "Ansel Dray. Second basses, nineteen years… He was back at rehearsal in three weeks and sang the
    whole Fauré from memory." Then: "Always under the note. A hair flat, every Sunday, for nineteen years… Listen to him
    now. Ansel is finally hitting his note." "He sounds proud of him." As you pass, the man's chin dips toward Teddy's
    breathing and then goes back up.
  - **No Teddy:** the narrator knows him as the man "who sold the evening paper from a folding chair outside the bus
    depot on Ferry Street and made change by touch."
    - If Bram's trust is above 25 and you never told him to leave: "I tell the others who he is." Bram asks, "Did he have
      family?" "I don't know. I only ever knew him from the chair."
    - If you told him to go (`toldBramToGo`): "I don't tell the others. Bram walks ahead of us, the way he has since I
      told him to go to Thornbury and he stayed anyway…" This is also the Act II acknowledgment that he stayed.
    - If his trust is 25 or below: "Bram and I have barely spoken since the drugstore…"
  - **The gag:** if you gagged Teddy in Act 1 (`gaggedHim`), he "peels the tape off his own mouth" before he speaks.
- **If yes:** it stays.
- **If no:** name what to change. The names and the newspaper job are easy to swap.
- **Default:** done.

| Answer |
|--------|
|        |

**3. Bram's eye (`bramEye`): which eye, and how the sight choices work**
- **What:**
  - On Ferry Street: "Bram goes down outside the betting shop with three of them on him: two holding his arms, one with
    both hands on his face, working at his jaw. Its thumb slips into his eye socket and stays there, pressing, while it
    tries to turn his head." He comes up "his left eye nearly pushed out of its socket". It is the **left** eye, and the
    Act 3 agent should match it.
  - The first choice is now "Stop. Get his eye cleaned and covered before he takes another step."
  - **Two later choices reflect his sight.** Each one replaces the ordinary version of the same choice when `bramEye` is
    set, so the reader is never offered both:
    - **a2_culvert:** "Keep going, and lead Bram by the hand. With one eye he can't judge the pipe." It costs more trauma
      (scar 14 instead of 12), gives Bram trust +12 and soften +4, and sets `ledBramThrough`. The Mercy arrival adds:
      "Bram let go of my hand at the mouth of the pipe, and neither of us has mentioned it."
    - **a2_estate_shout:** "Run northeast on Bram's left. He can't see them coming on that side." Hint: "they reach you
      instead of him". It costs hurt 16 instead of 12, gives Bram trust +15 and soften +4, and sets `tookHisBlindSide`.
  - **Text follow-through** appears on Quay Road (a hand pressed to the eye, or a dressing, depending on whether you
    treated it), in the culvert ("every few yards I hear his head knock against the concrete") and in a2_watch (Bram
    counts the gurney trips "his head turned to keep his good eye on the doors").
- **Alternative:** show the sight version next to the ordinary one, so protecting him is a choice against not
  protecting him. I didn't do this, because the two would read as near-duplicates.
- **If yes:** it stays as it is.
- **If "show both":** I add the ordinary choice back on bramEye runs.
- **Default:** replacement variants.

| Answer |
|--------|
|        |

**4. Blood numbers, and two non-Blood stat swaps**

The whole table is in the CHANGELOG. The decisions are:
- **Changed:** walking into the trailer is now 14, and breaking out of it is now 16.
  - **Why:** walking into the trailer is heavy, dense exposure, but no jaw is held. Breaking out is now an actual jaw
    held open and hummed into. That is the strongest exposure, so it is no longer smaller than walking in.
- **Removed:** watching the far bank for two hours, from across the water, now adds nothing (6 → 0).
- **Two stat swaps, because a wound doesn't spread the hum (§4):**
  - "Let Odile see the back": `cure(4)` → `heal(4)`.
  - "Say it was nothing": `infect(6)` → `hurt(6)`, because a filthy, untreated scratch hurts your health.
- **New numbers:**
  - The culvert kill adds `infect(4)`. Eight of them hold your jaw and hum at four inches. That is prolonged close
    exposure, and it's weak.
  - Turning one around goes from 6 to 2. Its hands rest on your jaw, but it doesn't pry.
- **Measured over 10,000 random runs (the same Act 1/3 files, Act II before vs. after):**
  - Blood 34 or higher on arrival at the Mercy: **2.8% → 1.2%**.
  - Runs that cross 34 at any point before treatment: **7.4% → 5.6%**.
  - So some realistic runs still cross the threshold. The main ones break out of the trailer, or take the shoe after an
    Act 1 exposure. Most runs don't cross it.
- **If yes:** the numbers stay.
- **If no:** say which ones to move. The `cure`→`heal` and `infect`→`hurt` swaps can be reverted on their own.
- **Default:** done.

| Answer |
|--------|
|        |

**5. Repeated actions: what I removed, and what replaced it**
- **What:** I found every place in Act II where a run offered the same action twice within one continuous scene.
  - **Removed:**
    - a2_lorry_cab: "Climb over the cab. Leave it sealed." and "Go under the back axle." The lane had just offered both.
      The three "take" choices now say that you go over the cab. For example: "Take the atlas and go over the cab. Leave
      the trailer shut."
    - a2_lorry_under: "Back out. Take your chances on Ferry Street instead." The lane offers Ferry Street.
    - a2_boat_search: "Keep the card, but stay aboard for now." a2_boat had already offered "Move everyone aboard and hold
      here."
    - a2_estate_knock: "Force the door." a2_estate_beg: "Force the door while she is still at the mail slot." Both
      repeat the courtyard's "Go up. Nine floors. Take what they have."
    - a2_estate_units: "Knock at Marlowe House…" The courtyard had already offered "Knock."
  - **Hidden when already offered in the same conversation:**
    - In a2_estate_warning, after a knock: the antibiotics, and "Ask her whether anybody has gotten out…"
    - In a2_estate_notgoing, after the wards conversation: "Put it to a vote."
  - **Replaced with new actions:**
    - a2_estate_warning: "Thank you." → "Promise her you'll use the back. Then leave her alone."
    - a2_estate_holloway: "Thank you." → "Tell her you're sorry about her husband. Then go." If you already said "Then we're
      not going up there" earlier, a new choice replaces that line: "Ask her name." It leads to the toast: "Ilse," she
      says, after a while. "Nobody has asked me that since April." This sets `askedHerName`.
    - a2_estate_wards: the second "Thank you." was dropped from the exit. A repeated refusal is replaced by "Ask her
      husband's name. In case you see him up there." It leads to the toast: "Joe Pask. He has a swallow tattooed on his
      left hand." She says has, not had. This sets `knowsHerHusband`, which Act 3 could use on the wards.
    - a2_estate_up: "Knock. When no one opens…" → "Tell them through the door that you are leaving. Then leave."
- **Names invented:** Ilse (the woman) and Joe Pask (her husband). "A woman whose name I never asked" stays in the
  break-in. That is a different route, so the two never meet.
- **Reach:** every Act II passage stays at 1.52% or higher. See the table in the CHANGELOG.
- **If yes:** it stays.
- **If no:** name the choice to restore.
- **Default:** done.

| Answer |
|--------|
|        |

**6. Re-offers I did not change (your call)**
- **What:** after a detour that changes the situation, these choices offer a route again:
  - **a2_lorry_cab, "Open it anyway."** This comes after reading THEY ARE NOT MEAT. DO NOT OPEN, so the reader is
    defying a warning.
  - **a2_ask:** "Go with Wren. The river." / "Go with Bram. The projects." / "Go with Odile. The river." / "Overrule all of
    them. The culvert." These re-offer the Quay Road routes as siding with a person.
  - **a2_culvert:** "Back out. Take the river after all." / "Back out. Cut through the Fenwick Houses instead." These come
    after meeting the nine.
  - **a2_boat_odile:** "Board her and search." and "Tell her the Mercy comes first." a2_river offered "Board her." and
    "Walk past."
- **Why I left them:** each one is a fresh decision, made with new information or a new person in it. Removing them would
  cut the defy-the-warning beat, the group discussion, and the turn-back from the culvert.
- **If yes (keep):** nothing changes.
- **If no:** I rework each one into a new action or remove it, and re-check reach.
- **Default:** kept.

| Answer |
|--------|
|        |

**7. The culvert: where the nine stand**
- **What:** the nine no longer face the walls 400 yards in. They now stand in the last fifty yards before the far mouth.
  Each one leans at its own angle, and "each face [is] tipped toward that round of light". At night it's "paler dark".
  - The first one "does not lower its face" as you pass.
  - Kill label: "…While their faces are turned away."
  - Return label: "Turn her back toward the opening, the way she was."
  - Wren is carried "the last fifty yards" instead of two hundred.
  - Nobody explains why they stand there.
- **The kill and turn branches now follow §4:**
  - Kill: the turned take your jaw "very gently, thumbs at the hinge, and hum at me from four inches away until its hands
    stop working… None of them hits me."
  - Turn: its hands settle on your jaw, and Odile lifts them away by the wrists.
- **If yes:** it stays.
- **If no:** tell me what to change.
- **Default:** done.

| Answer |
|--------|
|        |

**8. Teddy's gag before Quay Road (an existing gap, not fixed)**
- **What:** if you gagged Teddy in Act 1, two Act II passages before Quay Road still don't mention the tape:
  - a2_lorry_climb has him cough "into both palms".
  - a2_under_still has him bite through his lip.
- I only handled the gag at the blind man, where he peels the tape off.
- **If yes:** I add gag variants to those two passages.
- **If no:** they stay as they are.
- **Default:** not changed.

| Answer |
|--------|
|        |

## 2. CHANGELOG (Act II, v1.11)

### Added
- **Shared flags:**
  - `sawTheShoe`: set in a2_inside_lorry, the only route that sees the shoe. From the open doors the crowd hides it, and
    the burn-from-the-cab route gets "one look".
  - `sawTelescope`: set in a2_quay on daylight runs.
  - `bramEye`: set in a2_ferry.
  - `blindManSeen`: set in a2_quay.
- **Local flags:**
  - `ledBramThrough`: led Bram through the culvert.
  - `tookHisBlindSide`: ran on Bram's blind side at a2_estate_shout.
  - `askedHerName`: a2_estate_holloway.
  - `knowsHerHusband`: a2_estate_wards.
- **The blind man on Quay Road** (pending item 2).
- **Bram's sight choices and text** (pending item 3).

### Changed: prose, before → after
- **a2_lorry_open:**
  - Before: "Nothing comes out. Sixty faces turn toward the light, very slowly, and the note they are holding does not
    waver."
  - After: (day) "At the far end a vent in the roof has rusted open, and one gray bar of morning comes down through it.
    Every face I can see is tipped up toward that bar, chins raised, mouths open, like a crowd under a balcony waiting
    for somebody to step out and speak. / Not one of them steps toward the doors. But the faces come down, very slowly,
    and turn toward the noise we have made…"
  - The night version: "My flashlight finds the far end over their heads… that square of lesser dark…"
- **a2_inside_lorry:**
  - Before: "At the far end, against the bulkhead… a circle of bare floor… Every one of them is turned toward it. They
    have stood around it since April."
  - After: "At the far end, under the roof vent… a circle of bare floor about a yard across, with the gray light from the
    vent falling straight into it [night: with the vent a pale square directly over it]. They stand around its edge
    shoulder to shoulder, chins raised, mouths open, faces turned up to the roof… / Not one of them is looking down at
    it. To me it looks like a vigil: sixty people keeping a place for a child since April, and none of them able to look
    at what they are keeping. I can't stop wondering whose child."
  - The narrator reads meaning into the shoe. Nothing explains the vent.
- **a2_burn_lorry:**
  - Before: "all turning toward the light."
  - After: "their faces coming down toward the sound of the doors."
  - Before: "They stand in it."
  - After: "They stand in it, and the ones at the back lift their faces again toward the vent in the roof, where the
    smoke is going."
- **a2_inside_break:**
  - Before: "The nearest one lifts both hands to my face, takes hold of my jaw, and tries to open my mouth…"
  - After: "Two of them take my arms, not roughly, and fold them down against my sides. A third lifts both hands to my
    face, sets its thumbs on my bottom teeth, and opens my mouth… Then they hum into it, all of them, exactly together,
    and the note goes down my throat like cold water." The cheek: "where one hand would not let go."
- **a2_ferry:**
  - Before: "a flap of scalp hanging over one eye"
  - After: the thumb in the socket (pending item 3).
  - The crowd: "All of them are humming the same note, and they never stop to breathe."
  - Labels:
    - "Stop and get the scalp closed…" → "Stop. Get his eye cleaned and covered before he takes another step."
    - "He can hold it on with his hand." → "He can hold his hand over it."
- **a2_river:**
  - Before: "facing the far bank… like a congregation facing an altar nobody else can see."
  - After: "with their chins raised and their mouths open, quite still, humming like a congregation that has forgotten to
    sit down."
- **a2_boat_hotwire:**
  - Before: "now every one of them is facing me."
  - After: "now every face over there has come down, and every one of them is turned toward me."
  - The watch toast: "Not one of them steps into the water. After two hours the faces start going back up, one by one."
- **a2_estate_shout:**
  - Before: "standing in the dark among the stock"
  - After: "shuffling in the dark among the stock" (§3: with no line of sight out, they fumble).
- **a2_estate_draw:**
  - Before: "with eleven seconds to spare, a torn coat, and a fingernail gouge"
  - After: "a hand gets my collar and another comes around from behind and takes my chin, and for a moment they are
    turning my face back toward them, gently, humming into my hair. I tear loose and leave them the coat's lining and a
    fingernail gouge…"
- **a2_culvert / a2_culvert_kill / a2_culvert_turn:** see pending item 7.
- **Washing → telescope:** a2_quay, a2_ask, a2_estate, a2_estate_knock, a2_estate_shout and a2_estate_breakin. See
  pending item 1.

### Blood (infection) values, old → new

| Where | Old | New | Reason (storybible §4) |
|---|---|---|---|
| a2_inside_lorry (walk in) | 22 | 14 | Heavy: dense, close and brief. No jaw is held. |
| a2_inside_lorry "Take the shoe." | 10 | 8 | More time at the dense center. Still heavy, not large. |
| a2_inside_lorry "Leave it… still humming" | 4 | 4 | Kept: brief involuntary humming. |
| a2_inside_break | 6 | 16 | Large: the jaw is held open and they hum into it. Bram pulls you out quickly. |
| a2_inside_break "Stop resisting the note." | 80 | 80 | Kept: surrender is agreement. |
| a2_lorry_under "Hum." | 14 | 14 | Kept: humming along on purpose. |
| a2_ferry | 12 | 12 | Kept: heavy, a dense crowd with hands at your jaw. |
| a2_boat_hotwire "Stay. Watch the far bank." | 6 | 0 | Hearing them across the water does nothing. |
| a2_estate_draw (enter) | 8 | 8 | Kept: a converging crowd and a hand on your chin, brief. |
| a2_estate_draw "Let Odile see the back." | −4 (cure) | 0 (heal 4 instead) | A wound doesn't carry the hum. |
| a2_estate_draw "Say it was nothing." | 6 | 0 (hurt 6 instead) | Same reason. The dirt hurts your health instead. |
| a2_culvert_kill | 0 | 4 | Weak: prolonged close humming, with jaws held but not pried. |
| a2_culvert_turn | 6 | 2 | Hands rest on your jaw, with no prying. Close to nothing. |

### Removed
- Seven duplicate choices. See pending item 5.

### Reachability (10,000 uniform walks, v1.11 start → final)

| Passage | Before | After |
|---|---|---|
| a2_estate_notgoing | 2.13% | 1.52% |
| a2_boat_hotwire | 1.59% | 1.53% |
| a2_estate_bramdecides | 2.25% | 1.66% |
| a2_estate_draw | 1.85% | 1.72% |
| a2_estate_gift | 2.55% | 1.87% |
| a2_culvert_kill | 2.41% | 1.90% |
| a2_inside_break | 1.67% | 1.96% |
| a2_estate_holloway | 2.37% | 2.15% |
| a2_estate_breakin | 3.18% | 2.27% |
| a2_boat_lastnight | 3.30% | 2.47% |
| a2_estate_warning | 3.95% | 3.16% |
| a2_estate_knock | 8.69% | 7.08% |
| a2_estate_up | 10.99% | 8.84% |
| a2_boat_hold | 13.39% | 9.90% |
| a2_ferry | 25.81% | 19.72% |
| a2_lorry_under | 23.04% | 20.11% |

- The other Act II passages are within noise.
- Full lists:
  - `files\reach-v111-act2-before.txt`
  - `files\reach-v111-act2-after.txt`
- No audit anchor phrases changed.
