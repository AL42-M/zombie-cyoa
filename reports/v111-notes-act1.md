# v1.11 notes: Act 1 (story-act1.js)

Audit: `RESULT: clean`. No Act 1 passage is on the reachability list. Reach (10,000 walks): every Act 1
passage is at 1.41% or higher. The only node under 1% in reach.js is `end_body_failed` at 0.99%. That
ending belongs to the Act 3 agent and is being edited now. The audit's own walk does not flag it.

No conflicts with the storybible were found.

## 1. PENDING REVIEW

**1.1 Which three ways into Bram's first conversation remain (task 5, your "no" to 1.2)**
- **What:** a1_bram can now be reached in three ways:
  - from the radio: "Wind it again. Bram hears you and comes over." (the original v1.8 entry)
  - from the window: "Give Bram the count."
  - from the tested fire door: "Go back in and tell everyone. This is the way out."
- **Removed:**
  - a1_wren_truth: "Go ask Bram what he's been saying."
  - a1_window_study: "Go tell the others what you learned." It now leads to the council and keeps its
    trust gains and its toast.
  - a1_backdoor: "Go back inside and tell Bram."
- **Why these three:**
  - The radio and the window are where Bram is already sitting up and watching.
  - Removing the lane entry would make Bram's "I know about the lane" reply and the "go over the cork"
    branch of a1_bram_tonight unreachable.
  - "Tell Bram" from the yard repeated "tell everyone this is the way out" one screen later.
  - The Wren and study entries reached Bram too rarely to keep his follow-up scenes at or above 1%.
- **Reach:** a1_bram went from 10.4% to 8.9%. His five follow-up scenes are now 1.41–1.56% (they were
  1.66–2.51%).
- **If yes:** it stays.
- **If no:** name a different three. Swapping in the Wren entry would put his follow-up scenes near 1.1%.
- **Default:** radio, window, lane.

| Answer |
|--------|
|        |

**1.2 Fixing repeated actions in Act 1 (the "no repeated actions" rule)**
- **What:** I went through every route in the file. Some menus offered the same action twice in one run,
  so I removed or replaced the repeated choice. Stat effects stay with the version that remains.
  - a1_hub → council:
    - The hub offered "Tell them you'll carry him out tonight." The council then offered the same thing.
      The hub choice is now "Say nothing. Let Bram start." It leads to the council, where Bram makes the
      case in his own way: "He never uses the word. He says *options*, and every time he says it, he
      looks at Odile."
    - The council's "Put it to Teddy" is now hidden after the hub, because the hub already offered "Let
      Teddy speak before anyone votes."
  - a1_wren → a1_wren_lie → a1_wren_truth: each of these offered "Ask her what she wants." It now
    appears once: in wren_lie, or in wren_truth if you didn't lie to her.
  - a1_odile → a1_odile_animal: "Ask her to teach you" appeared in both. It is removed from the second.
  - a1_bram → a1_bram_carry / a1_bram_sayit: "Ask about his daughter" appeared up to twice. Only
    a1_bram keeps it.
  - a1_teddy → a1_teddy_wants → a1_teddy_something offered the promise to go "together" up to three
    times.
    - In a1_teddy_wants, the promise is hidden if you already spoke to Teddy.
    - In a1_teddy_something it is replaced by "Take it, and ask him about his niece." The toast reads:
      "She sang alto for him at twelve, a little flat. He never once told her."
  - a1_backdoor → a1_backdoor_test both offered the bolt cutters.
    - The second offer is replaced by "Stand in the empty lane for a minute before you go back in."
      (hint: "the bolt cutters stay in the yard").
    - Its toast reads: "The hum still comes over the roofs, but nothing in the lane is making it."
    - About a third of the readers who reach the yard still find the cutters, the same as before.
  - The opening menu offers going to Teddy, going to Wren, and calling everyone together. Later menus
    repeated those actions, so I replaced them:
    - a1_radio:
      - "Put it away and go sit with Wren." is removed.
      - "…call everyone together" is now "Write 1476 on the wall, under the day count."
    - a1_bram: "Walk away from him. Go to Teddy." is now "Get up and walk away while he's still talking."
      It still costs Bram's trust, and it leads to the council.
    - a1_window_study:
      - "Check the back of the drugstore" is removed. a1_window had just offered it.
      - "Go back and call everyone together" is replaced by "Copy the three notes onto a page for Wren."
        It gives Wren +8 trust and +2 humanity, and its toast reads "She reads them twice and puts the
        page inside her shoe."
    - a1_window: "Go back to the others." is removed. This also lifts Bram's reach.
    - a1_wren_wants: "Say nothing. Sit with her." repeated a1_wren's "sit with her in silence." It is now
      "Write back: 'Me too.'", with the same effects.
  - **Follow-through labels** (same choice, new wording when you've already committed):
    - Council, if you promised Teddy: "Keep your promise. All five of you go out the back tonight…"
    - Council, if you asked Bram for the night: "Take the night you asked Bram for. Nothing happens
      before morning."
    - Council, if you told Bram that Teddy decides: "Do what you told Bram. Let Teddy decide, in front of
      everyone."
- **If yes:** it stays.
- **If no:** name any item to revert.
- **Default:** all applied.

| Answer |
|--------|
|        |

**1.3 The Teddy dilemma comes back three times. I treated that as escalation, not repetition.**
- **What:** on the waiting route, carrying Teddy out or leaving him is offered three times:
  - at the council
  - again at dawn, after the humming stops (a1_wait)
  - again when the front is torn out (a1_shutter)
- **Why I kept it:**
  - Each time the stakes are new: a vote, then a run with no time, then a breach.
  - Cutting the dawn versions would make the flags `ranFromIt` and `leftHimRunning` impossible to set.
    Text in Act 1 and later depends on them.
- **If yes:** it stays.
- **If no:** I can make waiting lead straight to the breach. That cuts one of the three.
- **Default:** kept.

| Answer |
|--------|
|        |

**1.4 Blood values (task 9)**

| Where | Old | New | Why (storybible §4) |
|---|---|---|---|
| a1_hum_back (humming along at the glass or with the radio) | 8 | 12 | Humming in agreement is a large exposure. It's broken off after nine seconds, so it's smaller than being held. |
| a1_doorway (held, jaw pried open, hummed into) | 10 | 16 | This is the strongest kind of exposure: held with the jaw open while they hum into you. Bram pulls the narrator free quickly. |

- **Effect at triage** (Act 3, 20,000 random runs, with the current Act 2 and 3 files):

  | Act 1 exposure | Runs | Average Blood | Past 34 |
  |---|---|---|---|
  | Neither | 4,677 | 7 | 1.3% |
  | Hummed only | 302 | 23 | 8.6% |
  | Held at the doorway only | 159 | 27 | 22.6% |
  | Both | 8 | 44 | 100% |

  Some realistic runs cross the cure threshold, and most don't. These figures will move when Act 2's
  numbers settle.
- **If yes:** they stay.
- **If no:** give other numbers.
- **Default:** 12 and 16.

| Answer |
|--------|
|        |

**1.5 What Teddy hears (task 2): new facts in his lines**
- **What:**
  - **a1_teddy.** He takes out the tuning fork that later becomes his keepsake. He presses its stem to
    the bone behind his ear, so it rings only inside his head, and listens to the street against it:
    > "D flat. A hair under. Every one of them under by the same hair. I never got a choir to agree on a
    > pitch for one whole bar, and nobody rehearsed these people." … "There's a woman out there in a
    > bathrobe, singing bass. And not one of them has stopped to breathe. I've been listening for six
    > weeks."
  - **The council,** only for readers who didn't hear the a1_teddy version:
    > "They're all on the same pitch. Every one of them. I never had a choir that could hold that for a
    > whole bar."
  - **a1_wait,** when the street goes silent: he closes his hand the way a conductor ends a held note.
    > "Nobody gave them the cutoff."
- **New facts:**
  - The note is D flat, slightly under.
  - Women sing in the same low register as the men.
  - The turned never pause to breathe. Act 2 already says "they never stop to breathe," and Act 3 says
    the hum "doesn't need the breath," so this is consistent.
  - The keepsake line "I already know the note" now pays off.
- **Reach:** about 95% of runs hear one version, 14% in a1_teddy and 81% at the council.
- **If yes:** it stays.
- **If no:** say which fact to drop. The pitch name and the bass-singing woman are the most specific.
- **Default:** as written.

| Answer |
|--------|
|        |

**1.6 The radio's pulse (task 4)**
- **What:** I deleted the two unreachable variants: the pulse "speeding up" and Odile listening. The
  radio is visited at most once per run. I moved one constant fact into the reachable text:
  > "Under it there's a slow pulse, about fifty beats to the minute. I time it against my watch every
  > night. It has never changed."
- **Why:** the storybible says the pulse is constant. Without this line the pulse would appear nowhere in
  the game.
- **If yes:** it stays.
- **If no:** I remove the line, and the pulse goes unmentioned. Or give a different rate.
- **Default:** the line, at fifty beats a minute.

| Answer |
|--------|
|        |

**1.7 The last line of the smothering scene (you approved it in v1.10; I changed it to fit the canon)**
- **Before:** "…the humming outside drops, and the crowd in the street goes slack. Through the slats I
  watch their heads turn away from our window, one after another, until none of them is facing us."
- **After:** "…the humming outside settles, and the crowd in the street goes slack. Through the slats I
  watch their heads come away from our window and tip back, one after another, until every face in the
  street is turned up and none of them is facing us."
- **Why:**
  - When nothing draws them, they go back to the upward pose (storybible §3).
  - Their hum doesn't stop when they're idle, so "drops" became "settles."
- **If yes:** it stays.
- **If no:** I restore the v1.10 line.
- **Default:** the new line.

| Answer |
|--------|
|        |

**1.8 How Teddy's illness is established (task 1)**
- **What:**
  - **start:** "Six weeks of nights on a concrete floor have gone into that lung and stayed there."
  - **Odile (a1_odile):** "It is pneumonia, in the only lung he has. The other came out years ago; he
    showed me the scar. Six weeks on a cold floor did the rest. I have no stethoscope. I have my ear
    against his back…"
- **Why:**
  - The narrator never makes a diagnosis.
  - Odile does, but she's a veterinarian with no stethoscope. A suspicious reader can still doubt her,
    and Bram's "then he goes anyway" stays ambiguous.
- **If yes:** it stays.
- **If no:** I make Odile's line vaguer, for example "fluid, in the only lung he has".
- **Default:** as written.

| Answer |
|--------|
|        |

**1.9 For the coordinator: things other files should know**
- **The turned never breathe.** Teddy's line makes this explicit. Text elsewhere should not have the
  turned "draw a breath." I removed the two places in Act 1 that did, in a1_window and a1_window_tap.
- **The doorway wound** is now "a strip of skin two fingers wide," not "four parallel grazes." The flag
  `sawTheWound` is unchanged. Act 2's own toast ("Three new grazes") describes a different wound.
- **`wrenKnowsMercy`** can be set on about 1.8% of runs (it was 0.4%). Wren can now overhear Teddy
  without that flag being set: he never says the hospital's name aloud. The flag is set only when the
  narrator tells her.
- **New flags** (all Act 1 only): `heardTeddyEar`, `letBramStart`, `wrenHeardTeddy`, `askedAboutNiece`,
  `sharedWhatILearned`.
- **No action needed** unless you disagree.

| Answer |
|--------|
|        |

## 2. CHANGELOG

### v1.11: Act 1

#### Added
- **Teddy's ear** (a1_teddy, the council, a1_wait): the tuning fork, the pitch, the voices perfectly in
  tune, nobody breathing, and the cutoff nobody gave. See item 1.5.
- **Wren and the Mercy** (your yes to 2.11): a new exit after Teddy's badge speech, "Take the badge
  across to Wren. She heard most of that."
  - a1_wren_wants opens with: "She heard most of what Teddy said; I can tell by how carefully she
    doesn't look at the badge in my fist."
  - Its Mercy choice then reads "Show her the badge. Tell her the rest about St. Amaranth Mercy."
  - The Mercy choice is shown on 1.8% of runs (it was 0.4%).
  - The exit in a1_teddy_something is now worded "Take it to Wren. She should see it."
- **Bram stays** (task 7): if you told him "Go to Thornbury, then. Alone. Tonight.", the council opens
  with "Bram is still here. After I told him to go, he packed his bag, set it by the fire door, and sat
  back down with the shutter in his line of sight. Neither of us has mentioned it."
- **The council after the hub** now matches the reader's choice:
  - "Let Bram start" is item 1.2.
  - "Put every option on the table": "I put all of it on the table, the worst of it included, and then I
    run out of words."
  - Before, both opened with "Nobody wants to go first."
- **The breach** (a1_shutter): "The note comes in with them, every throat starting on the same beat, and
  every face in the room turns to the corner where Teddy is breathing."
- **The radio pulse** is item 1.6.

#### Changed
- **The front window** (a1_window):
  - Before: "They aren't milling around. Every head is tilted a few degrees toward this window, like
    compass needles."
  - After: "Their heads are tipped back and their mouths hang open, and every one of them is humming.
    / Behind me, Teddy drags in a breath. Thirty-one faces come down out of the moonlight and swing
    toward this window, all together, like compass needles. When his breath goes out, they stay on us a
    while longer before the chins lift again."
  - The closing line now ends "They're listening."
  - The two unreachable variants are gone; the window is visited only once. The safety-vest detail moved
    into the version that remains.
- **The window notes** (a1_window_study):
  - **THREE, before:** "When they hum together they stop moving."
  - **THREE, after:** "When nothing is calling them, they stand still, put their heads back, and hum
    with their mouths open. They did it through the rain on day thirty and never closed their mouths.
    Whatever that is for, it is not for us."
  - **New:** twice in the hour Teddy's breathing eases, and "the heads leave the window one by one and
    tip back until every face is turned up into the dark." The passage ends: "Then Teddy wakes coughing,
    and nearly fifty faces come down at once."
- **Tapping the glass** (a1_window_tap):
  - Before: "Thirty-one heads turn at once, and thirty-one people draw a breath together."
  - After: "Thirty-one faces come down at once and turn to the glass."
  - "mouth working" became "mouth open on the note."
- **Humming back at the glass** (a1_hum_back):
  - Before: "Its head tips, and out in the street the others tip too, one after another, like passengers
    nodding off on a night bus."
  - After: "Its head tips back, mouth open, and out in the street the others tip back too, one after
    another, until every face is turned up again, as if I had given the right answer."
- **The doorway** (a1_doorway), task 3:
  - Before: "Dozens of them pull at my coat, my hair, my jaw… Something takes a strip off my forearm.
    Something presses its open mouth to my ear and hums…"
  - After: "They don't hit me. Two of them take my wrists and fold my arms down to my sides, firmly, the
    way a nurse holds a child still for a shot. A third puts its fingers in the corner of my mouth and
    works my jaw open, patient, a little at a time, and all three hum the same note into my face… I
    wrench my right arm back. The grip on it doesn't give, and a strip of skin comes off my forearm in
    its fingers. The note goes into my open mouth and down, and for one bright second I want to
    *answer* it. / Then Bram has my belt in his fist and hauls, and their hands let go of me one finger
    at a time."
  - Its choice "Say nothing about the humming in your ear" is now "Say nothing about what they hummed
    into you."
  - Its arm toast is now "A strip of skin two fingers wide is gone from your forearm. It bleeds more than
    it hurts."
- **Leaving the yard** (a1_depart): "every time they hit it" became "every time they lean their weight
  into it."
- **The hub:** "Teddy breathes, and the street breathes back" became "…and the street answers."
- **a1_teddy:**
  - "Outside, the street shifts like a field in the wind" became "Out in the street, heads come down and
    turn toward the shutter, all together, like wheat going over in a gust."
  - "Hold his hand until the fit passes" became "Hold his hand," because the fit now passes in the text.
    The toast is now "His hand is cold, and he lets you keep it."
- **Teddy's illness** is item 1.8.
- **The smothering's last line** is item 1.7.
- **Naming** (task 8), "the store" became "the drugstore" in five places:
  - two choice labels ("Check the back of the drugstore…")
  - Bram, twice ("this drugstore")
  - a1_depart ("the drugstore stays silent")
  - "the shops" in the service lane is unchanged. It means the street's other businesses.
- **Sky wording** (task 10): "sky" appears once in Act 1, in the premise ("People went out into the
  street to look at the sky"). All new text uses "heads tipped back," "turned up," and "chins lift."

#### Removed
- a1_radio's unreachable second and third variants (task 4).
- The three Bram entries (item 1.1) and the repeated choices (item 1.2).

#### Blood
- a1_hum_back: 8 → 12.
- a1_doorway: 10 → 16.
- See item 1.4.

#### Reach (10,000 walks, before → after)

| Passage | Before | After |
|---|---|---|
| a1_bram | 10.42% | 8.86% |
| a1_bram_carry | 1.66% | 1.56% |
| a1_bram_agree | 1.68% | 1.48% |
| a1_bram_sayit | 1.78% | 1.50% |
| a1_bram_tonight | 1.83% | 1.41% |
| a1_bram_daughter | 2.51% | 1.54% |
| a1_teddy_something | 1.71% | 1.44% |
| a1_backdoor_test | 1.53% | 2.31% |
| a1_backdoor | 6.26% | 6.82% |
| a1_window_study | 2.84% | 3.71% |
| a1_window_tap | 3.00% | 3.55% |
| a1_hum_back | 4.32% | 5.52% |
| a1_wren_wants | 7.70% | 4.27% |
| a1_teddy | 15.77% | 14.11% |
| a1_wren | 18.90% | 14.02% |

Every other Act 1 passage is within noise of its v1.10 figure. A 20,000-walk run gave the same
picture: the rarest Act 1 passage was 1.44%.

#### Flags added
- `heardTeddyEar`
- `letBramStart`
- `wrenHeardTeddy`
- `askedAboutNiece`
- `sharedWhatILearned`

No ids or flags were renamed or deleted. The bramIntro values `wren`, `study`, and `yard` are no longer
set, and their text branches in a1_bram were removed.
