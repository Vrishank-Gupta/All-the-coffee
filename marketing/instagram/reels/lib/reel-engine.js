// Shared engine for the 1080x1920 tool reels. A reel page has a #stage with .scene sections
// (data-from / data-to: sentence numbers, data-tr: push | zoom | rise | glitch) and .el elements
// that appear at data-at (a sentence position: "6.55" is 55% into sentence 6) with data-fx
// (up | pop | left | right | rise). The page calls REEL.init({...}) with its captions and an
// onSeek(t) hook for anything custom. render-reel.py calls window.seek(t) for each frame and
// window.setAvatar() to put the presenter's video frames in the ring.
(function () {
  const clamp = (x) => Math.max(0, Math.min(1, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3);
  const easeIn = (x) => Math.pow(clamp(x), 3);
  const easeInOut = (x) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  const easeExpo = (x) => (x = clamp(x)) === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  const back = (x) => { x = clamp(x); const c = 1.9; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };
  const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const $ = (id) => document.getElementById(id);

  const FX = {
    up: (p) => [p, `translateY(${50 * (1 - p)}px)`, 10 * (1 - p)],
    pop: (p) => [clamp(p * 3), `scale(${0.5 + 0.5 * back(p)})`, 0],
    left: (p) => [p, `translateX(${-160 * (1 - easeExpo(p))}px)`, 8 * (1 - p)],
    right: (p) => [p, `translateX(${160 * (1 - easeExpo(p))}px)`, 8 * (1 - p)],
    rise: (p) => [p, `translateY(${400 * (1 - easeExpo(p))}px) rotate(${-6 * (1 - easeExpo(p))}deg)`, 0],
    drop: (p) => [clamp(p * 2), `translateY(${-90 * (1 - back(p))}px) scale(${0.9 + 0.1 * back(p)})`, 0],
  };
  const TR = {
    push: { in: (p) => [p, `translateX(${260 * (1 - p)}px) scale(${0.94 + 0.06 * p})`, 14 * (1 - p)], out: (q) => [1 - q, `translateX(${-260 * q}px) scale(${1 - 0.06 * q})`, 14 * q] },
    zoom: { in: (p) => [p, `scale(${1.18 - 0.18 * p})`, 18 * (1 - p)], out: (q) => [1 - q, `scale(${1 - 0.12 * q})`, 18 * q] },
    rise: { in: (p) => [p, `translateY(${120 * (1 - p)}px)`, 12 * (1 - p)], out: (q) => [1 - q, '', 0] },
    glitch: { in: (p) => [p < 1 ? (Math.floor(p * 12) % 2 ? 1 : 0.4) : 1, `translateX(${(1 - p) * 30 * Math.sin(p * 80)}px)`, 0], out: (q) => [1 - q, `scale(${1 - 0.1 * q})`, 16 * q] },
  };

  const R = { clamp, lerp, easeOut, easeIn, easeInOut, easeExpo, back, inr, $ };
  window.REEL = R;

  R.init = function (cfg) {
    const T = window.TIMINGS, W = window.WORDS, LEVELS = window.LEVELS || [];
    const DURATION = T[T.length - 1].end + (cfg.tail ?? 1.5);
    window.DURATION = DURATION;
    const at = (v) => { const i = Math.floor(v), f = v - i; if (i >= T.length) return DURATION; const s = T[i]; return s.start + f * (s.end - s.start); };
    const start = (i) => i >= T.length ? DURATION + 1 : T[i].start - 0.15;
    Object.assign(R, { T, DURATION, at, start });
    const scenes = [...document.querySelectorAll('.scene')];

    function show(el, t0, t, dur = 0.55) {
      const fx = el.dataset.fx || 'up';
      const p = fx === 'up' ? easeOut((t - t0) / dur) : clamp((t - t0) / dur);
      const [o, tr, blur] = FX[fx](p);
      el.style.opacity = o;
      el.style.transform = tr;
      el.style.filter = blur > 0.05 ? `blur(${blur}px)` : '';
    }
    R.show = show;

    function scene(s, t) {
      const a = start(+s.dataset.from), b = start(+s.dataset.to);
      const visible = t >= a && t < b + 0.4;
      s.style.display = visible ? 'flex' : 'none';
      if (!visible) return false;
      const tr = TR[s.dataset.tr || 'push'];
      const p = easeExpo((t - a) / 0.55), q = easeIn((t - b) / 0.4);
      const [o1, t1, b1] = tr.in(p), [o2, t2, b2] = q > 0 ? tr.out(q) : [1, '', 0];
      const cam = 1 + 0.03 * clamp((t - a) / Math.max(1, Math.min(b, DURATION) - a));
      s.style.opacity = Math.min(o1, o2);
      s.style.transform = `${t1} ${t2} scale(${cam})`;
      const bl = Math.max(b1, b2);
      s.style.filter = bl > 0.05 ? `blur(${bl}px)` : '';
      for (const el of s.querySelectorAll('.el')) if (el.dataset.at) show(el, at(+el.dataset.at) - 0.1, t);
      return true;
    }

    // A cursor that glides to an element inside a scene and clicks it at time tc. Returns the
    // press scale for the element (dips while clicked).
    R.click = function (cur, rip, scn, el, t0, tc, t) {
      const sr = scn.getBoundingClientRect(), er = el.getBoundingClientRect();
      const k = sr.width / scn.offsetWidth;
      const bx = (er.left + er.width / 2 - sr.left) / k, by = (er.top + er.height / 2 - sr.top) / k;
      const p = easeInOut((t - t0) / (tc - t0));
      cur.style.opacity = clamp((t - t0 + 0.1) / 0.15) * (1 - clamp((t - tc - 0.6) / 0.2));
      cur.style.transform = `translate(${lerp(bx + 280, bx - 8, p)}px, ${lerp(by + 240, by - 6, p)}px) scale(${t > tc && t < tc + 0.15 ? 0.85 : 1})`;
      const c = (t - tc) / 0.4, rs = 40 + 180 * easeOut(c);
      rip.style.opacity = c > 0 && c < 1 ? 1 - c : 0;
      Object.assign(rip.style, { width: rs + 'px', height: rs + 'px', left: bx - rs / 2 + 'px', top: by - rs / 2 + 'px' });
      return c > 0 && c < 0.5 ? 1 - 0.08 * Math.sin(Math.PI * c * 2) : 1;
    };

    // Captions: each caption word gets a time by its position in the sentence, read off
    // Whisper's word timings (the caption wording or script can differ from what Whisper wrote).
    const capWords = cfg.captions.map((c, i) => {
      const ws = W[i], parts = c.split(' ');
      const wlen = ws.reduce((n, w) => n + w[0].length + 1, 0), clen = c.length + 1;
      let acc = 0;
      const marks = ws.map((w) => { const f = acc / wlen; acc += w[0].length + 1; return [f, w[1]]; });
      marks.push([1, ws[ws.length - 1][2]]);
      acc = 0;
      return parts.map((p) => {
        const f = acc / clen; acc += p.length + 1;
        let j = 0; while (j < marks.length - 2 && marks[j + 1][0] <= f) j++;
        const [f0, t0] = marks[j], [f1, t1] = marks[j + 1];
        return [p, lerp(t0, t1, (f - f0) / (f1 - f0))];
      });
    });
    let capShown = -1, capSpans = [];

    let avatar = null;
    window.setAvatar = (base, count, fps, hold) => { avatar = { base, count, fps, hold }; };

    window.seek = function (t) {
      if ($('g1')) $('g1').style.transform = `translate(${-120 + 80 * Math.sin(t * 0.25)}px, ${180 + 90 * Math.cos(t * 0.2)}px)`;
      if ($('g2')) $('g2').style.transform = `translate(${560 + 90 * Math.cos(t * 0.22)}px, ${1080 + 120 * Math.sin(t * 0.18)}px)`;
      if ($('brand')) show($('brand'), 0.1, t, 0.7);
      const sv = scenes.map((s) => scene(s, t));
      cfg.onSeek?.(t, sv, scenes);

      let c = -1;
      T.forEach((s, i) => { if (t >= s.start - 0.1) c = i; });
      if (c !== capShown) {
        capShown = c;
        $('cap').innerHTML = c >= 0 ? capWords[c].map(([w]) => `<span>${w}</span>`).join('') : '';
        capSpans = [...$('cap').children];
      }
      if (c >= 0) capWords[c].forEach(([, wt], i) => {
        const next = i + 1 < capWords[c].length ? capWords[c][i + 1][1] : T[c].end;
        const el = capSpans[i], p = easeOut((t - wt + 0.05) / 0.18);
        el.style.color = t >= wt - 0.05 && t < next - 0.05 ? 'var(--amber)' : 'var(--cream)';
        el.style.opacity = 0.28 + 0.72 * p;
        el.style.transform = `translateY(${8 * (1 - p)}px)`;
      });
      $('caption').style.opacity = c >= 0 ? clamp((t - T[0].start + 0.1) / 0.3) : 0;
      $('progress').style.width = (clamp(t / DURATION) * 100) + '%';

      if ($('ring')) {
        $('ring').style.transform = `scale(${back((t - 0.05) / 0.6)})`;
        if ($('ai')) $('ai').style.opacity = clamp((t - 0.4) / 0.4);
        let lv = 0;
        for (let k = -2; k <= 2; k++) lv += LEVELS[Math.max(0, Math.min(LEVELS.length - 1, Math.round(t * 30) + k))] || 0;
        lv /= 5;
        $('ring').style.boxShadow = `0 0 ${24 + 70 * lv}px rgba(242, 189, 124, ${0.12 + 0.5 * lv})`;
        if (avatar) {
          const i = Math.floor(t * avatar.fps);
          const n = i < avatar.count ? i + 1 : avatar.hold;
          const src = `${avatar.base}/f${String(n).padStart(5, '0')}.jpg`;
          const face = $('face');
          if (face.getAttribute('src') !== src) { face.src = src; return face.decode(); }
        }
      }
    };

    if (!location.search.includes('render')) {
      const t0 = performance.now();
      (function loop() { window.seek(((performance.now() - t0) / 1000) % DURATION); requestAnimationFrame(loop); })();
    } else {
      window.seek(0);
    }
  };
})();
