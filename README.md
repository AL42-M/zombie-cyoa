# THE HUSH — zombie-cyoa

A choice-driven zombie survival browser game, originally made with Copilot and inspired by the text-heavy web adventures of the dial-up era.

You begin on day forty-one after the Hush, at Rosco Drug & Sundry. Read a passage, choose an action, and carry its consequences into the next scene. The game combines branching fiction, supplies, infection, companion relationships, a journal, and keepsakes. It runs entirely in the browser with plain HTML, CSS, and JavaScript.

**Content notice:** The current game is adult survival horror, with graphic violence, body and medical horror, death, coercion, and psychological distress. Read the in-game warning before playing. A possible tone change is a future design decision, not something implemented in this update.

## Start here: current handoff

**Last documented work: 14 October 2026.**

- The playable source is the `ZombieChoiceAdventure` directory, not the ZIP archive.
- The current story registers **123 nodes, including 12 endings**, across three acts and the endings file.
- Phone layout repairs are implemented: narrow-screen controls wrap, buttons have a minimum 44 CSS-pixel height, infection effects no longer displace fixed panels, and enlarged-text layouts fit better.
- This was a compatibility and documentation pass, **not** the planned visual or narrative redesign.
- Work is on `copilot/fix-html-phone-browser-issues`. That task branch already existed when this session began; no second branch was needed. Nothing was merged during this work.
- The owner's actual phone/browser and method of opening the game are still unknown. Chromium phone emulation is useful evidence, not a substitute for testing that device.
- Next: confirm the affected device and launch method, review the design ground rules below, then agree on a start-screen and main-game layout before changing the wider UI.

## Contents

1. [Running the game](#running-the-game)
2. [Phone troubleshooting](#phone-troubleshooting)
3. [Playing and controls](#playing-and-controls)
4. [Project structure](#project-structure)
5. [Engine and story contracts](#engine-and-story-contracts)
6. [Saving and privacy](#saving-and-privacy)
7. [Validation and compatibility](#validation-and-compatibility)
8. [Design ground rules and roadmap](#design-ground-rules-and-roadmap)
9. [Future-agent workflow](#future-agent-workflow)
10. [Commit-linked change history](#commit-linked-change-history)
11. [Questions for the owner](#questions-for-the-owner)

## Running the game

### Recommended: serve the complete game directory

No package installation, bundler, framework, database, or build step is required. Use a current browser with JavaScript enabled. A small static HTTP server is more reliable than opening downloaded files on a phone.

If Python 3 is installed, use the following command. Replace `/absolute/path/to/zombie-cyoa` with the absolute location of your checkout:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory /absolute/path/to/zombie-cyoa/ZombieChoiceAdventure
```

Open **http://127.0.0.1:8000/** on that computer. Stop the server with Ctrl+C.

For a phone on the **same trusted local network**, start the server with:

```sh
python3 -m http.server 8000 --bind 0.0.0.0 --directory /absolute/path/to/zombie-cyoa/ZombieChoiceAdventure
```

Then open `http://YOUR-COMPUTER-LAN-IP:8000/` in Safari, Chrome, or another full browser on the phone. Replace the placeholder with the computer's local network address. **`localhost` on the phone refers to the phone, not the computer.** A firewall or Wi-Fi client isolation may prevent the connection.

The second command makes the game directory available to devices that can reach that computer. Use it only on a trusted network, do not forward the port to the internet, and stop the server afterward. Python's development server is not a production hosting setup.

### Static web hosting

The game can be hosted as static files. Keep the HTML, stylesheet, and all seven runtime JavaScript files together, with their names and relative locations intact. Use HTTPS for a public deployment.

- If the host publishes the contents of the game directory, open the site's root URL.
- If the host publishes the repository root, open `/ZombieChoiceAdventure/index.html` beneath that site's URL.
- There is no root-level game `index.html`, and no deployment workflow or confirmed live game URL is documented in this checkout.
- GitHub's source-file view is not the running game. A Pages site would require explicit hosting configuration; this task did not enable or publish one.

### Opening files directly

On desktop, opening the game directory's `index.html` can work because the scripts are classic scripts rather than JavaScript modules. This was checked in desktop Chromium. Keep the **whole directory**, not just the HTML file.

On phones, a Files app, attachment preview, ZIP preview, or in-app viewer may not execute JavaScript or allow the adjacent files to load. A stylesheet cannot repair those restrictions. Prefer a served URL opened in a full browser.

### About the ZIP

`ZombieChoiceAdventure.zip` is a historical bundled copy. It was **not regenerated** for the phone fixes and should not be treated as the latest release. Editing the unpacked source does not update the ZIP. Future release work should decide whether to regenerate versioned bundles or remove the ambiguous archive, with owner approval.

## Phone troubleshooting

| Symptom | What to check |
| --- | --- |
| Text appears but Begin does nothing | Open a served URL in a full browser. Confirm JavaScript is enabled and every referenced script loads. An isolated HTML download or preview may not work. |
| Plain, unstyled page | Make sure `style.css` is beside `index.html` and is being served successfully. Use the complete current source directory. |
| Menu partly off the side | Update to the source containing the phone fixes. The old toolbar did not wrap its buttons at narrow widths. |
| Menu, journal, or help vanishes after scrolling during an infected run | Update to the phone fixes. A filter on the entire body previously changed the positioning of fixed overlays. |
| Old behavior persists after an update | Reload the served page and confirm you are not opening the old ZIP or another copy. Avoid clearing site data unless you accept losing saves and ending discoveries. |
| No Continue button, or lost progress | Return to the same browser and exact site address. Private browsing, blocked storage, cleared site data, or a different host/port can make saves unavailable. |
| Sound is silent | Sound starts off. Tap **Sound: off** during play, check device volume and output, and try a full browser rather than a preview. Audio support and browser permission policies vary. |
| Phone cannot reach the local server | Check the computer's LAN address, server bind address, shared Wi-Fi, firewall, and network isolation. Do not use the phone's localhost address. |
| Scrolling is still slow | This update stops the continuously moving grain on coarse-pointer touch devices. Actual performance still depends on the device; record the model, browser, and scene. |

**Confirmed defects and repairs**

1. At a 320-pixel viewport, the old Menu button extended to about pixel 334, outside the screen. HUD buttons now wrap, and interactive controls have at least 44 pixels of height.
2. With infection effects active and the page scrolled 500 pixels, the old overlay's top was at −500 pixels. Infection tinting now applies to content regions rather than the body, so fixed panels and notifications retain viewport positioning.
3. At 200% root text sizing on a phone-sized viewport, status-grid content widened the layout. Grid tracks now shrink correctly; panel headings and button text can wrap.
4. Safe-area padding was added for notches and home indicators. Panels use dynamic viewport height where supported, retain a `vh` fallback, and scroll internally. These are defensive improvements; physical-device safe-area behavior still needs verification.
5. The skip-text prompt now says “tap or click.” A JavaScript-disabled explanation appears on the title screen, and the storage claim is qualified.

The user's original failure cannot be conclusively diagnosed without the affected phone and launch details. The reproducible bugs above are fixed independently of that uncertainty.

## Playing and controls

The current flow is **title → passage → choices → next passage or ending**. Text appears paragraph by paragraph. Tap/click the passage or the finish-text prompt to reveal it immediately; choices appear when the reveal finishes.

| Control | Action |
| --- | --- |
| Begin | Start a fresh run; replaces the active save. |
| Continue | Resume the active save when one is available. |
| Tap/click a choice | Take the offered action. Locked choices explain why they are unavailable. |
| 1–7 | Choose the corresponding action. During text reveal, the first press finishes the text instead. |
| Space / Enter | Finish an ongoing text reveal. |
| J / Journal | Review the recorded scenes and decisions. |
| K / Keepsakes | See the mementos carried in this run. |
| M / Sound | Toggle procedural ambience. |
| Esc / Menu | Open the menu during play; Escape closes an open panel. |
| Close / tap the panel backdrop | Close a panel. |
| Step back one choice | Restore a previous choice snapshot while history is available. |

Although the title currently says “no going back,” the implementation **does support rewind**. That wording/mechanics mismatch is a design-review item, not a change made here.

### Conditions and companions

The HUD describes four numeric conditions using words and meters:

| Display name | Internal field | Meaning |
| --- | --- | --- |
| Body | `health` | Physical condition; reaching zero can end the run. |
| Blood | `infection` | Infection progression; reaching 100 can end the run. |
| Self | `humanity` | The protagonist's remaining sense of self. |
| Weight | `trauma` | Psychological burden. |

New runs start with health 88, infection 0, humanity 72, and trauma 12 on day 41. Odile, Bram, Wren, and Teddy begin with the player. Companions have relationship trust and can be alive, hurt, dead, or gone. Supplies and flags affect which choices are shown or unlocked.

Keepsakes are distinct from usable inventory: the game presents them as records of what the player chose to carry, rather than resources to spend. A new run already includes the ring. The ending screen summarizes conditions, choices, surviving companions, and carried keepsakes.

## Project structure

The file names below describe the checkout's structure; runtime files live together in `ZombieChoiceAdventure`.

| File | Responsibility |
| --- | --- |
| `README.md` | Project overview, operating instructions, design decisions, and agent handoff history. |
| `ZombieChoiceAdventure.zip` | Historical bundle, not synchronized automatically with source changes. |
| `ZombieChoiceAdventure/index.html` | Title, gameplay and ending screens; HUD; overlay panel; script loading. |
| `ZombieChoiceAdventure/style.css` | Theme, typography, atmosphere, choices, panels, and responsive layout. |
| `ZombieChoiceAdventure/audio.js` | Optional Web Audio synthesis: drone, noise, hum, heartbeat, and event accents. |
| `ZombieChoiceAdventure/story-core.js` | `Story` registry, `GameState`, cast, items, mementos, and condition vocabulary. |
| `ZombieChoiceAdventure/story-act1.js` | Act I — The Hush. |
| `ZombieChoiceAdventure/story-act2.js` | Act II — The Long Way Round. |
| `ZombieChoiceAdventure/story-act3.js` | Act III — We Take In All Who Come. |
| `ZombieChoiceAdventure/story-endings.js` | Ending metadata and passages; each ending is also a registered node. |
| `ZombieChoiceAdventure/engine.js` | DOM rendering, choices, progression, persistence, panels, input, and boot audit. |
| `ZombieChoiceAdventure/_audit.js` | Existing Windows Script Host story validation and randomized route checks. Not loaded by the game. |
| `ZombieChoiceAdventure/_lens.js` | Existing Windows Script Host passage-size report. Not loaded by the game. |

The runtime has no external fonts, downloaded audio tracks, third-party JavaScript dependencies, accounts, backend, or network API. The atmosphere uses CSS effects and procedural sound.

**Script order matters:** audio → story core → act I → act II → act III → endings → engine. Story files populate `window.Story`; the engine starts after those registrations. Do not convert individual scripts to modules or add asynchronous loading without revisiting this contract and direct-file support.

## Engine and story contracts

### State and transitions

`GameState` owns serializable data: current node/day, the four conditions, inventory counts, flags, companion state/trust, visits, journal entries, route, deaths, number of choices, and keepsakes. Its mutation helpers live on the prototype.

A normal choice transition:

1. Takes a snapshot for rewind and records the decision.
2. Applies the choice's state changes.
3. Applies infection creep when infection is active and not arrested.
4. Resolves the choice destination, which can be a fixed ID or a function.
5. Overrides that destination for zero health or full infection, when the corresponding ending exists.
6. Enters the destination, updates the screen and conditions, reveals its text, and saves a non-ending run.

Infection creep advances every second qualifying choice and gets stronger at higher infection. Health failure takes precedence over infection failure when both thresholds are reached in that transition.

**Re-entry caution:** continue and rewind call the same node-entry path used by normal navigation. Entry hooks can therefore run again. Preserve existing one-time guards, and make new entry effects safe to repeat. Changing that behavior would be an engine task requiring dedicated regression checks.

### Scene and choice authoring

| Field or API | Contract |
| --- | --- |
| `Story.add` / `Story.addAll` | Register nodes with unique IDs. Duplicate IDs are rejected. |
| Node `text` | An array/string, or a state-dependent function returning text. Lines may be strings or objects with `t` (markup) and `c` (CSS class). |
| Node `enter` | Optional entry hook; account for repeated entry on continue/rewind. |
| Node `choices` | Array of choice definitions. The current validator expects 3–7 choices on ordinary nodes. |
| Choice `label` / `hint` | Text or a function of state. Hints should clarify the action without promising hidden outcomes. |
| Choice `show` | If false, omit the choice entirely. |
| Choice `when` / `lockHint` | If unavailable, display the choice as locked with an explanation. |
| Choice `act` | Apply the decision's state changes. |
| Choice `to` | Existing destination ID, or a function returning one. |
| Choice `tone` | Optional visual treatment: `kind`, `cruel`, `risk`, or `rot`. Not a substitute for clear wording. |
| `Story.ending` | Register an ending and its zero-choice node. |

Current audits expect ordinary scenes to show 3–7 choices and to leave at least one selectable. A redesign that changes that convention must update the validation expectations and keyboard help together, rather than padding scenes with repetitive actions.

Story prose and some labels are rendered as HTML. Treat them as **trusted, repository-authored content only**. Do not insert player input, URL parameters, fetched content, or imported save text into these HTML paths without an explicit validation/sanitization design.

## Saving and privacy

- `hush.save.v1` holds a JSON object with `state` and `history`. `history` contains serialized state snapshot **strings**, capped at 80.
- `hush.endings.v1` holds a map of discovered ending IDs to `true`.
- The journal keeps up to 120 entries.
- Entering a normal scene saves automatically. Reaching an ending records its discovery and removes the active-run save.
- Rewind at the ending remains possible while its in-memory history survives; reloading after an ending does not restore the completed run.
- Begin replaces the active run. Abandon asks for confirmation and removes it. Those actions do not intentionally erase the separate endings collection.
- Saves stay in that browser's storage for that origin. Switching browser, device, protocol, hostname, or port does not transfer them.
- Storage exceptions are caught so a blocked store does not prevent play. **There is currently no prominent save-failure indicator**, and saving is not guaranteed in restricted/private/file-preview contexts.
- No save export/import, cloud sync, service worker, or installable offline/PWA flow is implemented. A hosted page is not guaranteed to remain available offline.

Do not clear site data as a routine troubleshooting step: it can remove both the current run and discovered endings. Preserve the storage keys and existing node IDs unless a planned migration accompanies the change.

## Validation and compatibility

### Existing checks

There is no configured package-manager test runner, linter, build command, or CI workflow in this checkout.

**Browser boot audit:** Open the served game and inspect the browser console. The current baseline is:

```text
[THE HUSH] 123 nodes, 12 endings — graph OK.
```

This checks declared choice counts and static destinations. It skips function-based destinations, so it is **not proof that every state-dependent route works**. Runtime warnings also flag scenes with no selectable choices.

**Windows story audit:** With Windows Script Host/JScript available, replace the example absolute path and run:

```bat
cscript //nologo //E:JScript "C:\absolute\path\to\zombie-cyoa\ZombieChoiceAdventure\_audit.js"
cscript //nologo //E:JScript "C:\absolute\path\to\zombie-cyoa\ZombieChoiceAdventure\_lens.js"
```

The audit performs static graph checks, randomized walks, and targeted route/companion checks. Randomized coverage is not a mathematical guarantee. The lens reports passage lengths and markup using a default state; it is a measurement tool, not a browser-layout test.

Both scripts depend on `WScript` and ActiveX file reading. **They are not Node.js scripts.** Attempting the audit with Node in this Linux session failed with `ReferenceError: WScript is not defined`; the Windows-only checks were therefore not completed. No compatibility shim or new test framework was added.

### Browser checks performed in this update

Checks used the already-installed Playwright browser automation library and headless **Chromium 154.0.8037.0**. They were session smoke checks, not a newly committed automated suite.

| Check | Result / scope |
| --- | --- |
| 320×568 and 390×844 touch/mobile emulation | HUD controls fit and have at least 44-pixel height; beginning, choice selection, rewind, save/reload/continue passed. |
| 844×390 mobile landscape | The same control, panel, and save smoke checks passed. |
| 1280×800 desktop | The same control, panel, and save smoke checks passed. |
| Scrolled panels, infection levels 0 and 2–5 | Panels stayed within the viewport and could be closed. Infection levels were set directly for deterministic layout checks. |
| Long help panel | Internal scrolling and the Close control worked. |
| Enlarged text | 200% root font sizing at 320×568 and 390×844 no longer widened the viewport; panels remained within it. This is not a full OS text-scaling certification. |
| Keyboard and reduced motion | J, K, Escape, numeric choice input and text completion worked in the smoke run with reduced-motion preference. |
| Sound | The on/off controls and pressed state worked. Headless testing does not verify audible output or phone interruption behavior. |
| Ending persistence | A deliberately seeded ending saved its discovery and cleared the active run; the discovery survived reload. This does not certify every ending route. |
| Storage blocked | Beginning and taking a choice still worked, without persistence. |
| JavaScript disabled | The new explanation was visible. |
| Desktop direct-file launch | The complete source folder launched via `file://` in Chromium. |
| Browser errors / graph | No page JavaScript errors in the completed main smoke runs; boot reported graph OK. |

**Not verified:** physical iPhone/iPad Safari, Android hardware, WebKit/Firefox rendering, real notch/browser-bar changes, screen-reader behavior, exhaustive story traversal, or the Windows audit's randomized checks. No minimum supported browser versions have been certified. Modern CSS features have varying support on older browsers.

For each future UI change, repeat phone portrait/landscape and desktop checks; also check Begin/Continue, text reveal, locked choices, panels after scrolling in an infected state, save/reload, rewind, endings, touch, keyboard, enlarged text, and reduced motion.

## Design ground rules and roadmap

This section records the requested next work and a **proposed working template**. It is not a claim that a redesign or a new tone has been approved.

### Ground rules

1. **Get owner approval before merging.** Keep investigations and implementation on a reviewable task branch.
2. **Fix usability without silently rewriting the story.** Keep compatibility work separate from tone, balance, ending, and narrative changes.
3. **Design for reading on a phone first, then desktop.** Keep navigation reachable, allow scrolling and text enlargement, preserve zoom, and avoid hover-only interactions.
4. **Give each screen one clear purpose.** Separate starting/resuming, reading the situation, deciding, and seeing the consequence.
5. **Choices must differ meaningfully.** Each should represent a distinct intent, cost, risk, relationship decision, or source of information—not several phrasings of the same action.
6. **Make progress legible.** Show what changed, where the player is, and what the immediate problem is, without repeating the whole previous passage.
7. **Keep feedback proportional.** Avoid multiple presentations of the same consequence in prose, toast, and hint unless each adds useful information.
8. **Preserve accessibility and player control.** Keep touch and keyboard paths, readable contrast, motion preferences, optional sound, clear locked states, and visible panel dismissal.
9. **Protect saved progress.** Treat node IDs, state shape, and persistence keys as compatibility concerns.
10. **Agree on the tone before rewriting it.** Review audience, explicitness, emotional range, protagonist voice, and how bleak or hopeful the experience should be.

### Requested work queue

- [x] Investigate phone/browser problems and repair reproducible layout defects.
- [x] Establish project documentation, a handoff convention, and an initial design template.
- [ ] **Redesign the main game UI:** agree on the hierarchy of narrative, conditions, companions, navigation, feedback, and choices; prototype before broad implementation.
- [ ] **Redesign the start screen:** clarify Begin versus Continue, preserve the content warning, improve the route into play, and reconcile the “no going back” claim with rewind.
- [ ] **Redesign action presentation:** define a consistent choice structure, remove semantic repetition, and make the relationship between action and consequence clear.
- [ ] **Define flow:** map scene types, transitions, revisits, optional information, decision points, and endings; identify where players repeat actions or lose the thread.
- [ ] **Review tone:** obtain an explicit direction, then use a small approved sample before rewriting existing acts.
- [ ] Verify the compatibility repairs on the owner's phone and agree on a hosting/distribution method.
- [ ] Consider a visible save-failure state and, separately, portable validation tooling.

### Screen/scene design template

Use this specification for a proposal before implementation; it is not a required new JavaScript schema.

| Section | Questions to answer |
| --- | --- |
| Purpose | Why does this screen or scene exist? What should the player understand or decide? |
| Entry context | Where are we, who is present, and what relevant state brought us here? |
| Immediate situation | What is new now, without repeating the previous scene's full explanation? |
| Player intent | What distinct intentions can the player pursue? Which actions advance the scene, and which only provide information? |
| Choice presentation | What does each label promise? What useful, non-spoiling information belongs in its hint? Why might it be locked? |
| Consequence | What state, relationship, or narrative fact changes? Where is that change communicated once, clearly? |
| Exit / next beat | Where can this lead? Does every reachable state have a way forward? Is a revisit intentional? |
| Tone boundary | What emotional effect is intended, and what content requires a warning or owner decision? |
| Accessibility | Does this remain usable with touch, keyboard, enlarged text, reduced motion, and no sound? |
| Acceptance evidence | Which states/devices were checked, what did not work, and what remains unverified? |

Approve one representative start-screen/main-screen proposal and one scene/action example before applying a template throughout all three acts. Do not add filler choices just to satisfy a numerical rule; if the approved flow changes the rule, update the engine checks and authoring guidance together.

## Future-agent workflow

1. Read this handoff and inspect the actual working tree and recent commits. The README is a guide; executable code and Git history remain the source of truth.
2. Confirm the scope and branch. Do not merge without the owner's explicit permission.
3. Reproduce the reported problem before editing. Record device/browser, URL versus file launch, scene, relevant game state, and expected versus actual behavior.
4. Make one coherent change at a time. Avoid unrelated cleanup, framework migrations, dependency additions, or story rewrites in a UI repair.
5. Use the existing checks and an appropriate browser smoke pass. Distinguish a test that passed from one that could not run.
6. Review changes for secrets and security concerns. Do not place credentials, personal data, or real exported player saves in commits.
7. **Update this README alongside each meaningful change:** current handoff, affected technical instructions, validation evidence, remaining work, and a dated history entry.
8. Reference already-created implementation commits by hash. For the README's own commit, use its exact subject and Git history; a commit cannot contain its own final hash. Do not keep amending solely to chase a self-referential hash.
9. Finish with a plain-English report: findings, changes, tests, limitations, and decisions needed from the owner.
10. If an approach repeatedly fails without new evidence, stop it, preserve the last known-good state, and switch approach or ask a focused question. Do not loop on the same command.

**Change-entry template:** date; exact commit subject or existing hash; reason; affected behavior/files; validation actually performed; save/compatibility impact; known limitations; next step requiring approval.

Useful history commands, with the checkout's absolute path substituted:

```sh
git -C /absolute/path/to/zombie-cyoa log --oneline -10
git -C /absolute/path/to/zombie-cyoa log --oneline -- README.md
git -C /absolute/path/to/zombie-cyoa show COMMIT
```

Do not add separate planning files by default; keep the consolidated handoff here. No license file is present in this checkout, so do not assume redistribution rights or add a license without the owner's decision.

## Commit-linked change history

### 2026-10-14 — phone compatibility and documentation

- **[`d9b1430`](https://github.com/AL42-M/zombie-cyoa/commit/d9b1430) — Fix narrow phone controls and scrolled infection panels**
  - Repaired toolbar wrapping and touch-target height; moved infection filters off fixed-element ancestors.
  - Added safe-area spacing, viewport-aware scrollable panels, and reduced grain movement on touch devices.
  - Updated tap/click guidance and storage wording; added a no-JavaScript explanation.
  - Changed only the HTML and CSS; did not change narrative, state, storage keys, or routes.
  - Chromium portrait, landscape, desktop, infected/scrolled panel, choice and save/continue checks passed.
- **[`e0a1196`](https://github.com/AL42-M/zombie-cyoa/commit/e0a1196) — Keep phone status and panels within enlarged-text layouts**
  - A subsequent enlarged-text smoke check exposed additional overflow.
  - Made status grid tracks shrink and allowed panel headings/buttons to wrap.
  - Retesting at 200% root font sizing passed; additional keyboard, sound-toggle, ending persistence, blocked-storage and desktop direct-file smoke checks passed.
- **Documentation entry — Expand README with project guide and commit-linked handoff**
  - Replaced the original one-paragraph README with operating instructions, implementation contracts, honest validation limits, proposed redesign ground rules, and this history.
  - The exact documentation commit is discoverable with the README history command above; no self-referential hash is required.
  - Automated review/security results will be recorded below once completed.

**Left unchanged:** all runtime JavaScript and story passages; save schema; endings; procedural audio; ZIP archive; hosting configuration. The main UI/start-screen/action-flow redesign and tone decision remain open. No merge was performed.

### Imported baseline

- **[`967ddf5`](https://github.com/AL42-M/zombie-cyoa/commit/967ddf5) — Upload from copilot code project folder:** imported the game source and archive.
- **[`7511d81`](https://github.com/AL42-M/zombie-cyoa/commit/7511d81) — Harden HTML stripping in passage analyzer:** changed the analyzer's plain-text extraction.
- **[`f98c445`](https://github.com/AL42-M/zombie-cyoa/commit/f98c445) — Merge pull request #1 from AL42-M/copilot/initial-project-upload:** existing baseline before this task. This historical merge was not performed by the current task.

## Questions for the owner

1. Which phone model, OS, and browser had the problem? What exactly happened?
2. Were you opening an extracted folder, a single HTML file, the ZIP, a GitHub page, an attachment preview, or a hosted URL?
3. Should the primary delivery method be a website link, a downloadable offline folder, or eventually an installable offline app?
4. For the redesign, should the interface stay literary and minimal, or expose more explicit resource/relationship information?
5. Which tone should the next sample target: the existing intense horror, more restrained suspense, more hope, or another direction?
6. Should rewind remain a supported player feature? Should the wording change to match it?

These answers guide the next iteration; they were not needed to repair the reproducible CSS defects. Review the branch before authorizing any merge.
