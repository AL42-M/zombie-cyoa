/* ============================================================
   THE HUSH — procedural ambience
   Everything is synthesised with WebAudio. No audio files.
   Degrades to a silent no-op if WebAudio is unavailable.
   ============================================================ */
(function (root) {
  'use strict';

  var Ctx = root.AudioContext || root.webkitAudioContext || null;

  var A = {
    supported: !!Ctx,
    enabled: false,
    intensity: 0,
    _ctx: null,
    _master: null,
    _nodes: null,
    _beatTimer: null,
    _noiseBuf: null
  };

  function now() { return A._ctx ? A._ctx.currentTime : 0; }

  function noiseBuffer(ctx) {
    if (A._noiseBuf) return A._noiseBuf;
    var len = Math.floor(ctx.sampleRate * 3);
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var d = buf.getChannelData(0);
    // brownish noise: integrated white noise, gentler on the ears than white
    var last = 0;
    for (var i = 0; i < len; i++) {
      var w = Math.random() * 2 - 1;
      last = (last + 0.021 * w) / 1.021;
      d[i] = last * 3.2;
    }
    A._noiseBuf = buf;
    return buf;
  }

  function build() {
    var ctx = A._ctx;
    var master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // ---- low drone: two detuned saws through a heavy lowpass -------------
    var droneGain = ctx.createGain();
    droneGain.gain.value = 0.085;
    var droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 180;
    droneFilter.Q.value = 3;
    droneFilter.connect(droneGain);
    droneGain.connect(master);

    var oscs = [];
    [36.71, 36.71 * 1.003, 55.0].forEach(function (f, i) {
      var o = ctx.createOscillator();
      o.type = i === 2 ? 'triangle' : 'sawtooth';
      o.frequency.value = f;
      var g = ctx.createGain();
      g.gain.value = i === 2 ? 0.28 : 0.6;
      o.connect(g); g.connect(droneFilter);
      o.start();
      oscs.push(o);
    });

    // slow filter drift so the drone never sits still
    var lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    var lfoGain = ctx.createGain();
    lfoGain.gain.value = 70;
    lfo.connect(lfoGain); lfoGain.connect(droneFilter.frequency);
    lfo.start();

    // ---- room tone: filtered brown noise ---------------------------------
    var noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer(ctx);
    noise.loop = true;
    var noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 420;
    noiseFilter.Q.value = 0.65;
    var noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.05;
    noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(master);
    noise.start();

    // ---- the Hum: a choral cluster that rises with infection -------------
    var humGain = ctx.createGain();
    humGain.gain.value = 0;
    var humFilter = ctx.createBiquadFilter();
    humFilter.type = 'lowpass';
    humFilter.frequency.value = 900;
    humFilter.connect(humGain);
    humGain.connect(master);

    // a minor-second cluster — the interval the brain reads as "wrong"
    [146.83, 155.56, 220.0, 233.08].forEach(function (f, i) {
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      var g = ctx.createGain();
      g.gain.value = 0.16;
      // each voice breathes at its own rate: many throats, not one
      var breath = ctx.createOscillator();
      breath.frequency.value = 0.11 + i * 0.037;
      var breathGain = ctx.createGain();
      breathGain.gain.value = 0.12;
      breath.connect(breathGain); breathGain.connect(g.gain);
      breath.start();
      o.connect(g); g.connect(humFilter);
      o.start();
      oscs.push(o); oscs.push(breath);
    });

    A._nodes = { master: master, oscs: oscs, noise: noise, humGain: humGain, droneFilter: droneFilter };
    A._master = master;
  }

  function heartbeat() {
    if (!A.enabled || !A._ctx) return;
    var ctx = A._ctx, t = ctx.currentTime;
    var rate = 1.65 - A.intensity * 0.75; // faster as things get worse

    function thump(at, amp) {
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(64, at);
      o.frequency.exponentialRampToValueAtTime(28, at + 0.17);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(amp, at + 0.022);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.3);
      o.connect(g); g.connect(A._master);
      o.start(at); o.stop(at + 0.34);
    }
    var amp = 0.1 + A.intensity * 0.17;
    thump(t + 0.02, amp);
    thump(t + 0.26, amp * 0.62);

    A._beatTimer = root.setTimeout(heartbeat, rate * 1000);
  }

  A.start = function () {
    if (!A.supported) return false;
    try {
      if (!A._ctx) { A._ctx = new Ctx(); build(); }
      if (A._ctx.state === 'suspended') A._ctx.resume();
      A.enabled = true;
      A._master.gain.cancelScheduledValues(now());
      A._master.gain.setValueAtTime(Math.max(A._master.gain.value, 0.0001), now());
      A._master.gain.linearRampToValueAtTime(0.5, now() + 2.4);
      if (A._beatTimer) root.clearTimeout(A._beatTimer);
      heartbeat();
      return true;
    } catch (e) { A.supported = false; return false; }
  };

  A.stop = function () {
    if (!A._ctx || !A._master) { A.enabled = false; return; }
    try {
      A.enabled = false;
      A._master.gain.cancelScheduledValues(now());
      A._master.gain.setValueAtTime(A._master.gain.value, now());
      A._master.gain.linearRampToValueAtTime(0.0001, now() + 0.9);
      if (A._beatTimer) { root.clearTimeout(A._beatTimer); A._beatTimer = null; }
    } catch (e) { /* no-op */ }
  };

  A.toggle = function () {
    if (A.enabled) { A.stop(); return false; }
    return A.start();
  };

  /* 0..1 — drives heart rate, hum volume and drone brightness */
  A.setIntensity = function (v) {
    A.intensity = Math.max(0, Math.min(1, v || 0));
    if (!A._ctx || !A._nodes) return;
    try {
      var t = now();
      A._nodes.humGain.gain.cancelScheduledValues(t);
      A._nodes.humGain.gain.setValueAtTime(A._nodes.humGain.gain.value, t);
      A._nodes.humGain.gain.linearRampToValueAtTime(A.intensity * 0.3, t + 3);
      A._nodes.droneFilter.frequency.cancelScheduledValues(t);
      A._nodes.droneFilter.frequency.setValueAtTime(A._nodes.droneFilter.frequency.value, t);
      A._nodes.droneFilter.frequency.linearRampToValueAtTime(180 + A.intensity * 260, t + 3);
    } catch (e) { /* no-op */ }
  };

  /* short one-shot accents on significant events */
  A.sting = function (kind) {
    if (!A.enabled || !A._ctx) return;
    var ctx = A._ctx, t = ctx.currentTime;
    try {
      if (kind === 'blood') {
        var src = ctx.createBufferSource();
        src.buffer = noiseBuffer(ctx);
        src.playbackRate.value = 1.8;
        var f = ctx.createBiquadFilter();
        f.type = 'highpass'; f.frequency.value = 900;
        var g = ctx.createGain();
        g.gain.setValueAtTime(0.3, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
        src.connect(f); f.connect(g); g.connect(A._master);
        src.start(t); src.stop(t + 0.45);
      } else if (kind === 'rot') {
        var o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(240, t);
        o.frequency.exponentialRampToValueAtTime(58, t + 1.5);
        var g2 = ctx.createGain();
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.22, t + 0.1);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
        o.connect(g2); g2.connect(A._master);
        o.start(t); o.stop(t + 1.7);
      } else { // cold
        var o2 = ctx.createOscillator();
        o2.type = 'triangle';
        o2.frequency.setValueAtTime(880, t);
        o2.frequency.exponentialRampToValueAtTime(1320, t + 0.6);
        var g3 = ctx.createGain();
        g3.gain.setValueAtTime(0.0001, t);
        g3.gain.exponentialRampToValueAtTime(0.07, t + 0.08);
        g3.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
        o2.connect(g3); g3.connect(A._master);
        o2.start(t); o2.stop(t + 1);
      }
    } catch (e) { /* no-op */ }
  };

  root.Ambience = A;
})(typeof window !== 'undefined' ? window : globalThis);
