/* temporary: measure passage sizes. run with cscript //E:JScript */
if (!Array.prototype.forEach) { Array.prototype.forEach = function (fn) { for (var i = 0; i < this.length; i++) fn(this[i], i, this); }; }
if (!Object.keys) { Object.keys = function (o) { var k = []; for (var p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p); return k; }; }

function readFile(path) {
  var st = new ActiveXObject('ADODB.Stream');
  st.Type = 2; st.Charset = 'utf-8'; st.Open(); st.LoadFromFile(path);
  var s = st.ReadText(); st.Close();
  if (s.length && s.charCodeAt(0) === 0xFEFF) s = s.substring(1);
  return s;
}

var DIR = WScript.ScriptFullName.replace(/\\[^\\]*$/, '\\');
var window = {};
['story-core.js', 'story-act1.js', 'story-act2.js', 'story-act3.js', 'story-endings.js'].forEach(function (f) {
  eval(readFile(DIR + f));
});
var Story = window.Story;

function plain(h) {
  var s = String(h), out = '', inTag = false;
  for (var i = 0; i < s.length; i++) {
    if (s.charAt(i) === '<') { inTag = true; continue; }
    if (s.charAt(i) === '>') { inTag = false; continue; }
    if (!inTag) out += s.charAt(i);
  }
  return out;
}

var rows = [], chars = [], paras = [];
var s = new Story.GameState();
Story.order.forEach(function (id) {
  var node = Story.nodes[id];
  var lines;
  try { lines = Story.textOf(node, s); } catch (e) { return; }
  var total = 0;
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];
    total += plain((l && typeof l === 'object') ? (l.t || '') : l).length;
  }
  chars.push(total);
  paras.push(lines.length);
  rows.push({ id: id, chars: total, paras: lines.length, choices: (node.choices || []).length });
});

rows.sort(function (a, b) { return b.chars - a.chars; });
function pct(arr, p) { var c = arr.slice(0).sort(function (a, b) { return a - b; }); return c[Math.floor(c.length * p)]; }

WScript.Echo('nodes measured: ' + rows.length);
WScript.Echo('chars  min/med/p90/max: ' + pct(chars, 0) + ' / ' + pct(chars, 0.5) + ' / ' + pct(chars, 0.9) + ' / ' + pct(chars, 0.999));
WScript.Echo('paras  min/med/p90/max: ' + pct(paras, 0) + ' / ' + pct(paras, 0.5) + ' / ' + pct(paras, 0.9) + ' / ' + pct(paras, 0.999));
WScript.Echo('');
WScript.Echo('--- 12 longest passages ---');
for (var r = 0; r < 12; r++) {
  WScript.Echo('  ' + rows[r].chars + ' chars, ' + rows[r].paras + ' paras, ' + rows[r].choices + ' choices   ' + rows[r].id);
}
WScript.Echo('');
WScript.Echo('--- 6 shortest ---');
for (var q = rows.length - 6; q < rows.length; q++) {
  WScript.Echo('  ' + rows[q].chars + ' chars, ' + rows[q].paras + ' paras   ' + rows[q].id);
}

/* how many have inline block-level markup that must not be split badly */
var withNote = 0, withHum = 0, withWhisper = 0;
Story.order.forEach(function (id) {
  var lines;
  try { lines = Story.textOf(Story.nodes[id], s); } catch (e) { return; }
  var joined = '';
  for (var i = 0; i < lines.length; i++) { var l = lines[i]; joined += (l && typeof l === 'object') ? (l.t || '') : l; }
  if (/class="note"/.test(joined)) withNote++;
  if (/class="hum"/.test(joined)) withHum++;
  if (/class="whisper"/.test(joined)) withWhisper++;
});
WScript.Echo('');
WScript.Echo('passages containing .note blocks:    ' + withNote);
WScript.Echo('passages containing .hum blocks:     ' + withHum);
WScript.Echo('passages containing .whisper blocks: ' + withWhisper);
