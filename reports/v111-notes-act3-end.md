# v1.11 notes: Act 3 + endings (story-act3.js, story-endings.js)

**Verification**
- `_audit.js`: **RESULT: clean.** Structural, runtime, dead-end, choice-count and targeted checks all
  pass. No passage is below 1%, and no Act 3 passage or ending is on the reachability list.
- `reach.js`, 20,000 walks: the lowest Act 3 values are end_mercy_teddy **1.17%**, end_turned
  **1.38%**, end_body_failed **1.41%** and a3_teddy_asked **1.96%**. The full table is at the end.
- A separate 20,000-walk text check (`check-act3.js` in this folder) renders every passage on every
  walk. It found 0 runtime errors, 0 runs with two signal reveals, 0 runs with a repeated label or
  hint inside Act 3, and 0 runs where the telescope, shoe, spreading-out or Teddy beats appear twice.
- **No audit anchor changed.** Choice count and order in a3_refuse, a3_final, a3_boat_who and
  a3_boat_lastkeys are unchanged. Only labels changed: a3_final's last choice, a3_boat_who's first
  choice and a3_boat_lastkeys' first choice.
- Act 1 and Act 2 were being edited during my runs. Expect about ±0.2 points of noise.

---

## 1. PENDING REVIEW

**1. Where the signal is explained (task 1)**
- **What:** The first passage that offers a reveal sets `signalClue` (`'radio'` or `'records'`) and
  `signalClueAt`. Every other reveal is hidden for the rest of the run.
  - **Radio, at breakfast (a3_triage):** the boy who dries the boots works nights on Ward 11. "Somebody
    put one on in there in April, to keep them company. Every bed on the ward started pulling at its
    straps. Switch it off, and inside a minute they're quiet. Switch it on, and they start again. It
    took us a week to stop testing it." If you carry the crank radio, he adds: "So keep that off, if
    you go over there."
  - **Radio, on Ward 11 (a3_ward11):** a transistor radio sits on the sill with its batteries lined up
    beside it. The nurse: "Pav brought that in for them in April. For company… We switched it off,
    and they settled inside a minute. We tried it four times."
  - **Records, in the Matron's ledger (a3_office):** the April 11–12 pages note where each person was
    found and what they were doing. Examples: "in his rig on Hawksmoor Rd., CB on", "school bus,
    earbuds in", "county dispatch, at her desk, headset on". From the 13th her notes change: "HELD,
    BELL ST. HELD, IN HER KITCHEN. HELD."
  - **Records, in the property room (a3_property):** the April 11–12 shelf holds a radio, headphones,
    a car stereo faceplate and a scanner, each with a card saying "FOUND WITH". From the 13th the bags
    hold ordinary pockets again.
- **Measured:** radio reveals in 46% of runs (triage 26%, ward 20%), records in 12% (property room 9%,
  office 4%), and none in 41%. Readers usually reach triage or the ward before the office.
- **If yes:** keep.
- **If no:** say if you want the split closer to even. I could move the triage reveal later, or let
  the office reveal take priority.
- **Default:** as described.

| Answer |
|--------|
|        |

**2. When the telescope conversation happens (task 3)**
- **What:** The conversation needs `sawTelescope`, a signal reveal, and at least one of Bram, Odile
  or Wren present. It happens once:
  - **At breakfast,** straight after the radio reveal at triage, where everyone is at the table (6.3%
    of runs).
  - **Otherwise when the narrator rejoins the others:** on the walk down in a3_refuse (2.7%), or in
    a3_final (2.7%), but never in a3_final when the others are still waiting on the avenue.
    - The narrator opens with one line: "On the way down I tell the others what the nurse said about
      the radio" (or about the April records).
  - **The text:** Bram: "That telescope on the ninth floor at Marlowe House… Maybe whoever owned it
    saw something come down." He is mostly joking. Odile: "Whoever owned it was looking at Saturn."
    At breakfast she adds "Eat your oatmeal." Wren writes "or someone wanted us looking up", then puts
    the pad away before anyone can answer.
  - **Without Bram:** the narrator makes the half-joke instead. The beat is skipped unless Odile or
    Wren is there to answer.
- **If yes:** keep.
- **If no:** say where you'd prefer it.
- **Default:** as described.

| Answer |
|--------|
|        |

**3. Bram's eye: a new choice at triage (task 4)**
- **What:**
  - **Triage text:** if `bramEye` is set and Bram is alive, Dr. Aytoun examines his eye, and Bram
    tells her it's fine "looking a little to the left of her while he says it."
  - **New choice:** "Stay with Bram until he lets her treat the eye properly. The Matron can wait."
    Hint: "he won't ask for himself". It leads to a3_matron and sets `bramEyeTreated`.
    - **New stat numbers:** Bram's trust +12, humanity +4. These are new numbers on a new choice, so
      they need your approval.
    - **In a3_matron:** "He comes out with a clean dressing taped over the eye and thanks me as if I
      had done him a disservice."
  - **Consequences in the endings:**
    - end_door: "with a clean dressing over his eye and two spares in his pocket", or "on one good
      eye, turning his whole head at every corner".
    - end_boat_together: Bram keeps watch from the stern and "twice asks me what is moving on the
      left bank", with the dressing if it was treated.
  - **Also:**
    - a3_split: Bram checks his watch "holding it close to his good eye".
    - a3_boat_who: Bram comes down the slip with a hand on the rail. The first choice becomes "Wait. Go
      back up the slip, give Bram your arm on his blind side, and get every one of them aboard." This
      is a label change only; the order and the effects are unchanged.
- **Measured:** the eye is treated in 0.8% of runs. That is a choice, not a passage, so the 1% rule
  doesn't apply.
- **If yes:** keep.
- **If no:** remove the choice. Only the text beats remain.
- **Default:** added.

| Answer |
|--------|
|        |

**4. Unstrapping: one way in, and a harsher collapse (task 9)**
- **What:**
  - **Removed, as you asked:** a3_ward_question's "Ignore her. Start undoing the straps." and
    a3_ward_why's "Don't wait for her help…".
    - The only way in is now a3_ward11's "Start unstrapping them."
  - **Also removed, to keep end_body_failed above 1%:**
    - a3_ward11's "Walk out. Find the person in charge." The ward's follow-up passages all still lead
      to the Matron, so nothing is lost.
    - The unstrap scene's "Go and wash the wound out. Right now." Washing a wound can't touch the
      note, per bible §4, and the choice's cure(8) contradicted that (see item 5).
  - **The collapse gate:** below 65 → **below 70** when choosing "Keep going. All ninety-four." This
    is a single constant, `UNSTRAP_COLLAPSE`.
    - The warning line and warning hint use the same gate.
    - Since the scene itself costs 26 health, about 90% of readers who choose to keep going now die on
      the ward floor.
    - Survivors still reach a3_final's "six more sets of straps" text.
- **Measured:**
  - a3_ward_unstrap: 6.78% → 4.96%.
  - end_body_failed: 1.44% → 1.41%.
  - Without the two extra removals, end_body_failed measured 1.03–1.21%.
- **If yes:** keep.
- **If no:** I restore either removed choice. end_body_failed then falls to about 1.0–1.2%, which is
  at risk of the noise.
- **Default:** as described.

| Answer |
|--------|
|        |

**5. "Wash the wound" no longer cures (Blood rule)**
- **What:** The removed choice had `s.cure(8)`, so washing a scratch lowered Blood. Under bible §4 a
  wound doesn't carry the hum, so this was the bite myth working as a mechanic.
- **If yes:** stays removed.
- **If no:** I can put it back as a mood choice with no cure. Its hint would be "it cleans the cuts,
  and does nothing about the hum", and end_body_failed falls to about 1.1%.
- **Default:** removed.

| Answer |
|--------|
|        |

**6. Taking all nine vials past the threshold now fails (task 10)**
- **What:** "Take it. All nine." (a3_matron_serum) and "Take all eight/nine anyway" (a3_matron_eight)
  check the cure rule when chosen: more than 4 days, or Blood 34+.
  - If the dose will fail, the choice sets `serumFailed` and goes to end_turned.
  - The hint says so: "the hum may already be too deep in you for any of them to work".
  - **Note:** a3_final has no serum choice, so the routing is in the two Matron passages.
- **New end_turned opening:** "I walk down the lime avenue with nine vials knocking together inside my
  coat… Odile puts the first one into the back of my hand that night, by flashlight, and we wait for
  the quiet. Nothing goes quiet anywhere. She tries a second an hour later, and a third before
  morning. They go in gray and do nothing at all."
- **New end_turned close:** "There are six vials left in my coat. Odile has the coat now. I hope she
  carries them back up the hill."
- **Measured:** 0.15% of runs.
- **If yes:** keep.
- **If no:** revert to the old behavior, where the dose works that night.
- **Default:** done.

| Answer |
|--------|
|        |

**7. Repeated actions: what I fixed, and what remains**
- **Fixed (conversation chains that re-offered the same thing):**
  - **Reception → east wing → treatment → who decides:**
    - "Fill in the form. Truthfully." appeared up to three times. Each instance now has its own
      wording:
      - "\"That's enough for one night.\" Fill in the form and take the bed."
      - "Do as he says. Sleep, and ask Dr. Aytoun in the morning."
      - "Sleep on it. Meet her in the morning, rested."
      - "\"In the morning, then.\" Fill in the form and take the bed."
    - The second "Lie about the skin" in a3_ask_treatment is removed. It always repeated the one at
      reception.
  - **a3_matron → a3_matron_why:**
    - Removed a3_matron's "This ends tonight. All of it." The answer now belongs to her question in
      a3_matron_why.
    - Removed a3_matron_why's "Show me the serum first." and "Give me the treatment and let me go."
      a3_matron had just offered both.
  - **a3_matron_refuse:** "Then it ends tonight." repeated a3_matron_why. It is now "\"Then you end it,
    tonight, and I'll stand next to you while you do.\"" The effect is the same (`declaredTheEnd`).
  - **a3_matron_serum → a3_matron_eight:** every choice repeated. Her "eight people" answer now comes
    in the serum scene, without being asked, and "Ask her what happens to the eight" is removed.
    - a3_matron_eight is reached only from "Ask her for more doses, for the road" after the
      treatment. That choice is hidden if you've already been in the serum scene.
    - A new choice replaces it there: "Sit for a minute with your hand flat on your knee, and let the
      quiet in it settle." It leads to a3_final with ease 6, a new number.
    - The treatment scene's "Now it ends. Tonight." shows only after Ward 11. Otherwise the next
      passage, a3_treatment_source, offers that.
    - a3_matron_eight's "ends tonight" is hidden after Ward 11.
  - **a3_ward_help** no longer offers "Why do you stay?", which a3_ward11 had just offered.
  - **a3_ward_question's** "Help me stop it." is hidden if a3_ward_why already offered "Then help me
    stop it."
- **Not fixed:** Act 3 is built as a hub. The service road, the trench, the chapel, the chapel keys
  and the property room each offer "find the Matron", "go to Ward 11", "the records" and "leave".
  - Labels and hints are now unique in every run (checked over 20,000 walks), but the destinations
    repeat.
  - Removing them all would leave several passages with fewer than 3 choices, and would mean
    restructuring the act.
- **If yes:** keep. Tell me whether you want the hub restructured in a later release.
- **If no:** say which fixes to revert.
- **Default:** as described.

| Answer |
|--------|
|        |

**8. Names (task 14)**
- **What:**
  - **The chapel → the Arimathea Chapel.** a3_service: "named it for Joseph of Arimathea, who gave his
    own tomb to a stranger." Place label: "The Arimathea Chapel".
  - **The north field → Sexton's Field.** "The old maps call it Sexton's Field." Place labels for
    a3_pit_read and end_burn; end_burn and end_ward text.
  - **The road west → Old Cleveholt Road.** It leads west toward Cleveholt, where end_ledger's first
    reading happens. end_ledger place label and text.
  - **The river path → the Sallow Walk** ("sallow" is an old word for willow). Used in
    end_boat_together's "as they did along the Sallow Walk".
- **Conflict to resolve:** Act 2 still calls it "The river path" (a2_river place label and text). The
  name won't connect unless Act 2 uses it too.
- **If yes:** Act 2 (or the coordinator) renames it to "the Sallow Walk".
- **If no:** I change end_boat_together back to "along the river path".
- **Default:** renamed on my side only.

| Answer |
|--------|
|        |

**9. The intake form and staff vocabulary (task 7)**
- **What:**
  - **Reception form:** "ANY BREAK IN THE SKIN" → "and then, in a different typeface, ANY CLOSE
    EXPOSURE (HELD, MOUTH OPENED, JOINED IN)". Staff know better than bites; the different typeface
    shows the box was added later.
  - **Labels and hints:** "Fill it in. Lie about the skin." → "Fill it in. Lie in the last box." The
    truthful hint: "you hide nothing, wounds included" → "you hide nothing, including what has
    touched you".
  - **"Bitten" → staff words:**
    - a3_matron: "eleven of thirteen people who were bitten" → "who came to the hospital exposed".
    - a3_matron_eight: "Eight people bitten…" → "exposed", and "with a bite on them" → "with the hum
      already in them".
    - Serum hint: "the next people bitten" → "the next people who need it".
  - **Laypeople keep "bitten".** The narrator's "I always expected teeth" in end_turned stays.
- **If yes:** keep.
- **If no:** say which ones to revert.
- **Default:** done.

| Answer |
|--------|
|        |

**10. How Teddy's illness lands (task 6)**
- **Teddy alive, at triage:** Dr. Aytoun: "And it isn't the hum. People bring me their old men and ask
  me that first. His glands are clean. It's pneumonia, in the one lung he has left, and that's all it
  ever was." The narrator: "All it ever was: a cold stockroom, one lung, and a sound the crowd outside
  Rosco's could not leave alone."
- **Teddy dead or left behind, at a3_final (48% of runs):** "Teddy isn't here, and it has taken me
  until now to see what I missed at Rosco's. In all the time I knew him he never hummed, not once,
  not even in his sleep. The hum never had him. He was a sick old man with one lung, breathing too
  loudly in a cold room," followed by one of:
  - "and I killed him for the noise." (your hand)
  - "and we killed him for the noise." (Odile's)
  - "and I left him there with one round in a revolver." (left behind)
- **Note:** "never hummed" relies on Act 1. Teddy currently only whispers the pitch and uses a tuning
  fork. If the Act 1 agent has Teddy hum, this line needs to change.
- **If yes:** keep.
- **If no:** say how much softer you want it.
- **Default:** as described.

| Answer |
|--------|
|        |

**11. How far the daylight variants go (task 11)**
- **What:** Act 3 and the endings use `byDay`: Act 2's `daylight(s)` and not yet triaged. Those
  readers reach the hospital by day, so everything before a night's sleep happens that afternoon and
  evening.
  - **The triage bed:** "It is still light out. I mean to lie down for an hour… I sleep through the
    evening and the whole night."
  - **Teddy's compact** looks "past the front doors and down the hill" rather than "into the dark".
  - **On the slip:** "in the last of the light".
  - **The boat-keys label:** "cast off before dark".
  - **The hush label:** "Walk out past the lime trees and stop holding the note down."
  - **end_hush:** they arrive "out of the hedges and the low ground".
  - **end_boat_together:** "six in the evening", Odile opens the wine "as the sun goes down", and the
    estuary opens "at about eight, and the light over the sea goes the orange of any ordinary evening".
  - **end_boat_alone:** "a brown river at six in the evening", and the estuary opens at eight.
- **Unchanged:**
  - Triaged readers keep the dawn wording. They spend a day at the hospital and leave before the
    next dawn.
  - end_burn (ten after five, at dawn), end_ledger (at dawn) and end_serum (that night) already fit
    both.
- **If yes:** keep.
- **If no:** say where it still reads wrong.
- **Default:** as described.

| Answer |
|--------|
|        |

**12. The shoe line (task 5)**
- **What:** In a3_final, only when `sawTheShoe` is set: "I keep coming back to the shoe in the truck on
  Quay Road. I took the cleared floor around it for a vigil. But not one of the sixty was looking at
  it. Every face in that truck was turned up, away from it, and I no longer know what they were
  standing there for."
- **The question:** It mentions the raised faces, which the reader saw, but not the vent. Is that
  too close to explaining?
- **If yes:** keep.
- **If no:** I cut "Every face in that truck was turned up, away from it".
- **Default:** kept.

| Answer |
|--------|
|        |

---

## 2. CHANGELOG (v1.11, Act 3 + endings)

### Added
- **The signal reveal,** once per run (pending item 1).
  - **New helpers:** `revealSignal`, `signalHere`.
  - **New flags:** `signalClue` (`'radio'` or `'records'`) and `signalClueAt` (the passage id).
- **The telescope conversation** (pending item 2).
  - **New helpers:** `placeAliens`, `aliensBeat`, `talkers`.
  - **New flag:** `aliensAt`.
- **Spreading out (task 2).** The narrator sees it once per run:
  - **From the triage window,** in daylight: "They stand forty or fifty yards apart across the wet
    grass, chins raised, spaced as evenly as fence posts. All the time I watch, not one of them moves
    nearer to another."
  - **Or on the walk down (a3_refuse):**
    - By night, the narrator hears them: "It comes from single places, one voice here and the next a
      long way off… In town they crowd together. Out here every field has one, and none of them has
      company."
    - By day, a visual version.
  - **New flags:** `sawThemSpread`, `spreadAt`. It appears in 65.6% of runs.
- **Ward 11 (task 8):**
  - "All of them are humming at the ceiling." → "All of them are humming. The ones in the beds along
    the windows lie still, chins raised a little, faces turned to the glass, as easy as people dozing on
    a porch. The ones in the middle rows are not easy. They strain against the sheepskin toward the
    windows, every neck craned the same way, toward the light [or toward the black glass, by night],
    and the straps creak all down the ward."
  - **Holloway:** "His is one of the window beds. Apart from the fingers, he is as quiet as anyone on
    the ward, his face tipped up to the glass."
  - **a3_treatment_source:** "The beds along the windows lie quiet. In the middle rows, every head is
    straining the same way, toward the glass, as far as the straps allow."
- **Wren and the Mercy (task 12)** echoes `wrenKnowsMercy`:
  - **a3_split:** a new pad line, "and ask them if the doors lock from the inside".
  - **end_matron:** new pad lines when the door wasn't promised: "you told me about this place at
    roscos" / "i thought it was the door".
  - **end_ward:** "you told me about this place like it was good news".
  - **end_door:** "At Rosco's, when she asked me for a door, I told her about a hospital that takes in
    all who come. It was the wrong answer, and she has been kind enough never to say so." There is a
    variant for readers who didn't see a1_wren_wants.
  - **end_boat_together:** "At Rosco's I told her about a hospital that takes in all who come. She
    doesn't look back at the hill once."
- **Bram's eye** (pending item 3). New flag: `bramEyeTreated`. New helper: `bramSeesBadly`.
- **Taking all nine and failing** (pending item 6). New flag: `serumFailed`. New helpers:
  `trySerumOnTheRoad`, `serumOutcome`.
- **Teddy's illness** (pending item 10).
- **The shoe** (pending item 12).
- **Daylight** (pending item 11). New helper: `byDay`, in both files.

### Changed: text (before → after)
- **The unstrapping assault (task 4/9):**
  - "The second gets a hand in my hair and drags my face down toward its open mouth with a grip like a
    cramp." → "The second is quicker than anything that thin should be. It has my wrist, then my jaw,
    its thumb hooked into the corner of my mouth, working it open. The third gets a hand into my hair
    from the next bed and holds my head still for it. They hum into my open mouth together, perfectly
    in tune and in no hurry at all."
  - "My scalp is bleeding. Something got into a scratch on my arm." → "My scalp is bleeding where the
    hand tore loose, and the grip on my wrist has taken a strip of skin off my forearm. They had my
    mouth open for five seconds, maybe six."
  - **Keep going hint:** "the infection goes deeper" → "they will hold you again".
- **end_turned, ward version:** "Whatever got into the scratch on my arm doesn't wait." → "What they
  hummed into me on the ward floor doesn't wait."
- **end_hush (task 13):**
  - "…shallow water, facing walls, because that is where they are needed." → "…shallow water, tipped
    to whatever opening they can find, because that is where they are needed."
  - "in a culvert, facing a wall, in exactly the right place" → "in a culvert, my face tipped to the
    bright round mouth of it, in exactly the right place".
  - "stop holding the note down" is unchanged.
- **a3_property:** "The fourth one I open holds…" → "Near the end of the month, one bag holds…".
  Holloway was admitted on 4/23, so the fourth April bag couldn't be his.
- **a3_final:** "a ward full of people humming at a ceiling two rooms away" → "a ward full of people
  humming two rooms away". The ceiling contradicted the new ward, and not every reader there has seen
  it.
- **The serum scene** now includes the Matron's unprompted "If you take the rest, eight people exposed
  between now and the end of the year do not get them…" (pending item 7).
- **Names** (pending item 8). **Staff vocabulary and the form** (pending item 9).
- **Repeated-action fixes** (pending item 7).

### Blood (infection) values, old → new
| Where | Old | New | Why |
|---|---|---|---|
| a3_ward11 (entering the ward) | infect 4 | **0** | Hearing them on a ward adds nothing (bible §4 and §7). |
| a3_ward_unstrap "Go and wash the wound out" | cure 8 | **choice removed** | Washing a wound can't touch the note (pending item 5). |
| a3_ward_unstrap (entering: jaw held open, hummed into) | infect 18 | 18 | Large: a jaw held open. |
| a3_ward_unstrap "Keep going. All ninety-four." | infect 20 | 20 | Large: held again, and longer. |
| a3_matron_treat | cure 100 | 100 | The treatment. |

- **The cure threshold still matters:**
  - Failed treatment, the failed nine-vial walk-out and the truck route together reach end_turned in
    1.38% of runs. Without them it would be about 0.3%.
  - Most treated readers are still inside the window: a3_matron_treat is 9.30%.

### Removed
- a3_ward_question's "Ignore her. Start undoing the straps."
- a3_ward_why's "Don't wait for her help. Start undoing the straps."
- a3_ward11's "Walk out. Find the person in charge."
- a3_ward_unstrap's "Go and wash the wound out. Right now."
- a3_ask_treatment's duplicate "Fill it in. Lie about the skin."
- a3_matron's "This ends tonight. All of it."
- a3_matron_why's "Show me the serum first." and "Give me the treatment and let me go."
- a3_matron_serum's "Ask her what happens to the eight if you take them."
- a3_ward_help's "Why do you stay?"

### Reachability (reach.js, 20,000 walks; before = repo when I started, after = final)

| passage | before | after |
|---|---|---|
| end_mercy_teddy | 1.38% | 1.17% |
| end_turned | 1.55% | 1.38% |
| end_body_failed | 1.44% | 1.41% |
| a3_teddy_asked | 2.20% | 1.96% |
| a3_chapel_keys | 1.93% | 2.03% |
| a3_holloway_end | 1.60% | 2.11% |
| end_boat_alone | 2.36% | 2.16% |
| a3_treatment_source | 1.97% | 2.29% |
| a3_ask_holloway | 2.24% | 2.39% |
| a3_ask_treatment | 2.18% | 2.44% |
| a3_matron_eight | 7.32% | **2.49%** |
| a3_chapel_exit | 2.48% | 2.56% |
| a3_ward_ally | 2.89% | 3.08% |
| a3_ward_new | 2.05% | 3.24% |
| end_ledger | 3.64% | 3.39% |
| a3_ask_decides | 3.33% | 4.00% |
| a3_lastpage | 3.65% | 4.04% |
| end_boat_together | 4.13% | 4.28% |
| a3_ward_help | 4.09% | 4.73% |
| a3_ward_why | 5.10% | 4.85% |
| end_serum | 5.27% | 4.85% |
| a3_ward_unstrap | 6.78% | **4.96%** |
| a3_ward_holloway | 6.14% | 8.00% |
| a3_matron_refuse | 4.65% | **9.29%** |
| a3_matron_treat | 12.40% | **9.30%** |
| a3_ward_question | 8.05% | 9.50% |
| a3_ask_east | 8.63% | 9.63% |
| a3_matron_why | 21.06% | **26.94%** |
| a3_refuse | 45.57% | 49.54% |
| a3_final | 90.22% | 91.01% |

- Every other Act 3 passage and ending moved less than 1 point.
- **end_mercy_teddy, the lowest at 1.17%,** measured 1.17–1.40% across my runs. It depends mostly on
  how often Teddy survives Act 1, which the Act 1 agent was changing at the same time. I didn't change
  any route into it.
- Raw output in this folder:
  - `reach-v111-act3-before.txt` and `reach-v111-act3-after.txt`
  - `audit-v111-act3-before.txt` and `audit-v111-act3-after.txt`
  - `check-act3.js`, the text check
  - `reach-health.js`, which measured health in the unstrap scene

### Notes for the coordinator
- **No anchor changes needed.**
- `captainslog.txt` isn't mine. Please log v1.11 there.
- **Pre-existing, not changed:** end_boat_alone uses `Array.prototype.indexOf`. It works in browsers
  and the audit, but fails in a bare WSH script without a polyfill. That's why `check-act3.js` adds
  one.
