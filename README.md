# zombie-cyoa
Current game version: **v1.11**.

A game I made with Copilot: a choose-your-own-adventure zombie game for the browser, like the ones from the dial-up days.

Open `ZombieChoiceAdventure/play.html` in a browser to play. You can change the reading pace and text size during play. In the journal, you can expand an entry to reread the full passage, including its day heading, without changing the story.

To validate the story on a computer with Node.js, run `node ZombieChoiceAdventure/_audit.js` from this folder. On Windows, `cscript //E:JScript ZombieChoiceAdventure\\_audit.js` also works. The audit returns a nonzero exit code when it detects a problem.
