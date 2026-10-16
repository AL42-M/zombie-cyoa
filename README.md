# zombie-cyoa
Current game version: **v1.5**.

Game I made using copilot code, a choose your own adventure style zombie browser game like those when we had dialup connections. 

Open `ZombieChoiceAdventure/play.html` in a browser to play. Reading pace and text size can be changed during play; journal entries from new runs can be expanded to reread the full passage, including dated entry breaks, without changing the story.

To validate the story on a computer with Node.js, run `node ZombieChoiceAdventure/_audit.js` from this folder. On Windows, `cscript //E:JScript ZombieChoiceAdventure\\_audit.js` also works. The audit returns a nonzero exit code when it detects a problem.
