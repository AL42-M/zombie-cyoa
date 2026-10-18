# Handoff: the next build (v1.12) and open discussions

The user paused here on 2026-10-18. Everything below is **decided but not yet built**, unless it is
marked as a discussion. Read `captainslog.txt` and `storybible.md` first. The bible is the canon.

The reports, with the user's answers, are in this folder:
- `v1.9-report.md`
- `v1.10-report-with-answers.md`
- `v1.11-report-with-answers.md`
- the per-file notes from v1.11: `v111-notes-*.md`

The v1.11 answer boxes are filled in. A blank box means the default stays.

## A. Build queue for v1.12 (all approved by the user)

### From the v1.11 report answers
1. **1.5: music terms.** Only Teddy uses music terms (note names, bars). Everyone else describes the
   hum in plain words. Check all files.
2. **1.8: Odile's diagnosis.** She hedges ("probably", "likely" pneumonia). Someone in the same scene
   doubts her and fears that keeping Teddy endangers everyone.
3. **2.6: no reused buttons.** Any choice offered again later in a run gets a new label AND a new
   hint. No button may look reused, even word for word.
4. **2.6: open item.** The "THEY ARE NOT MEAT" manifest scene (a2_lorry_cab) is flagged for the
   user's personal rework. Don't rewrite it without them.
5. **2.8: Teddy's gag (canon in bible §4).**
   - **Scene:** on the Ferry Street route, when Teddy is gagged with tape and with the group, a host
     tears the tape off to hum into his mouth. Someone must break or kill it to free him, within
     seconds, so he stays uninfected.
   - **The point:** the horror is the human-level intelligence of removing the blocker, not the
     violence.
   - **Also fix:** a2_lorry_climb (coughing into his palms) and a2_under_still (biting through his
     lip) so they account for the tape.
6. **3.8:** Sexton's Field becomes **Rockton's Field**, everywhere, including place labels.
7. **3.9:** the hospital staff's exposure words include "GRABBED" (exposed / held / grabbed).
8. **4.1:** Teddy's departure line (`goneNote` in story-core) becomes "We left Teddy behind. It's too
   quiet now."
9. **4.3: the Act 3 hub restructure.** Act 3 still offers the same destinations (the Matron, Ward 11,
   the records, leaving) from several conversations. Plan this as a structural pass of its own. The
   user approved planning it as the next major task.

### From the creative discussion (canon in storybible.md)
10. **Violence (§4).** The turned are relentless and brutal in pursuit of the open jaw. They never let
    go: they break jaws, bones and windpipes. Rescue means crippling or killing the host. Rewrite the
    easy rescues:
    - the Act 1 doorway (Bram hauls you out by your belt)
    - the Act 2 trailer (Bram pulls you out by the collar)
    - the Ferry Street fight

    Then check every encounter. Hospital hosts are crippled or strapped securely.
11. **The hum gets in only through the mouth and ears (§4).** Check every Blood source against this.
12. **No way back (§2).** The turned are hosts. Holloway's knot and the blind man's note are habit,
    which observers mistake for a person. Keep staff behavior, but don't let the narration claim the
    person is still inside.
13. **Mouth care.**
    - Explain it once, in the scene with the Ward 11 nurse: the endless hum dries and cracks lips and
      throats until they bleed or choke.
    - Cut the phrase down from its current 18 uses.
    - Add a scene detail: a host outside dies of this, and the group around it shifts to even out the
      gaps.
14. **Spreading out (§3).** They space themselves evenly and stand still, and re-space when one stops
    humming.
15. **Eyes (§3).**
    - **The turned never blink.** Odile notices it first.
    - **The stages:** recently turned eyes are red, raw and crusted with pupils still visible.
      Long-turned eyes are chalk-white and scarred, with no pupil.
    - **The culvert woman** in Act 2 has red eyes. The group wonders why, and Odile explains if she's
      present and on reasonable terms.
    - **Add 2–3 later choices** that let the narrator comment on a turned's eyes and what they mean.
    - **Update existing descriptions:** "milky" in Act 1, and the trailer.

### Process
- **Version:** the next build is v1.12.
- **Commit:** with the subject "v1.12".
- **Report:** use the two-section format, with an Answer box after every pending item.
- **Verify** with `_audit.js` and the reach measurement (every passage and ending at 1% or more).

## B. Discussions to have with the user (don't build these yet)
- **The hum in depth (bible §8):** how it works, the stages of infection, the four-day clock, the
  treatment and serum, and Blood values.
- **The "THEY ARE NOT MEAT" scene:** the user will rework it.

## C. Open items to work on (added 2026-10-18 by the user; not yet built)

These are new open items from the user. Discuss the approach with the user before building them.

1. **Choices need an immediate, visible effect (player feedback).**
   - **The problem:** some choices move straight on to an unrelated scene, so nothing seems to happen.
     - In the drugstore dispensary (`a1_dispensary`, story-act1.js), pocketing, burning or putting back Rosco's grocery
       list, or drinking the grain alcohol, all go straight back to `a1_hub`, and the next scene (for
       example Bram talking) never mentions what was done.
     - On the radio (`a1_radio`), humming along leads to `a1_hum_back`, where the group confronts the
       narrator, and the story then jumps straight to Bram talking about Teddy.
   - **The goal:** every action has an immediate effect in text, and scenes don't jump plainly from
     one to the next.
   - **The user's idea:** each choice writes itself into the journal, which suits the game's theme of
     found footage in written form. Questions to settle with the user: whether this is a short
     first-person line after every choice, or only after choices that would otherwise go unmentioned;
     whether it appears at the top of the next passage, as its own short passage, or both; and how it
     fits with the existing journal screen and toasts.
   - **Then:** audit every choice whose destination ignores it (starting with returns to hubs) and
     add the missing beat. Keep the bible, the writing standards and the "no repeated actions" rule.

2. **Research crank radios: do radios that need no power exist?**
   - The narrator's radio is a crank radio (`radio` item in story-core.js; `a1_radio`: "Ninety turns
     of the handle for ninety seconds of radio"). Bram also has a crank flashlight.
   - Starting notes for the discussion (to be checked before any story change):
     - Hand-crank radios are real. They turn a small generator (a dynamo) that charges a built-in
       battery or capacitor. The Freeplay wind-up radio from the 1990s made them well known; modern
       emergency radios usually also have a solar panel. A minute of cranking typically gives several
       minutes or more of listening, so "ninety turns for ninety seconds" is on the stingy side but
       believable for a worn or cheap set.
     - Truly unpowered radios also exist: a crystal radio (and the wartime "foxhole radio") runs only
       on the energy of the received signal. It needs a long wire antenna and a ground, plays faintly
       through an earpiece, and only picks up strong AM stations. 1476 kHz is in the AM band, so a
       crystal set could hear the hum broadcast.
     - Either way, the receiver needing no mains power is realistic. The open mystery stays the
       transmitter, which needs real power.
   - **Decide with the user:** keep the crank radio, adjust the crank-to-listening ratio, or add a
     crystal or foxhole radio somewhere in the story.

3. **Restructure the project files.**
   - **The problem:** the user finds the current file layout confusing.
   - **The current layout:** root has `README.md`, `captainslog.txt`, `storybible.md`,
     `ZombieChoiceAdventure-1.0-donottouch.zip`, `reports/` (handoff, reports and notes from several
     versions) and `ZombieChoiceAdventure/` (the game: `play.html`, `style.css`, `engine.js`,
     `audio.js`, `story-core.js`, `story-act1.js` to `story-act3.js`, `story-endings.js`, and the
     helper scripts `_audit.js` and `_lens.js`).
   - **The goal:** a thorough restructure so a human can find things: game files, tools, documentation,
     reports and archives clearly separated, with a short map of the folders in the README.
   - **Before moving anything:** propose the new layout to the user and get approval. Moving files
     changes paths used by GitHub Pages (`ZombieChoiceAdventure/play.html`), the README, the audit
     command, `.github/copilot-instructions.md`, this handoff and the captain's log. The preserved
     ZIP must stay unchanged (it can be moved only with the user's permission).
