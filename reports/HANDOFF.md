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
