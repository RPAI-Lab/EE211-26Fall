// Interactive demos for the week 7 lab page. Pure canvas, mirrors the OpenCV formulas.
(function () {
  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        var c = document.createElement('canvas');
        c.width = img.width; c.height = img.height;
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(ctx.getImageData(0, 0, img.width, img.height));
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  function el(tag, attrs, parent) {
    var e = document.createElement(tag);
    for (var k in attrs) {
      if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(e);
    return e;
  }

  // fmt: optional, turns the slider value into the text shown on the right
  function slider(box, label, min, max, step, value, onInput, fmt) {
    fmt = fmt || function (x) { return x; };
    var row = el('label', { style: 'display:flex;align-items:center;gap:10px;margin:6px 0;font-size:14px;' }, box);
    el('span', { text: label, style: 'min-width:120px;' }, row);
    var s = el('input', { type: 'range', min: min, max: max, step: step, value: value, style: 'flex:1;' }, row);
    var v = el('code', { text: fmt(value), style: 'width:120px;flex:none;text-align:right;white-space:nowrap;' }, row);
    s.addEventListener('input', function () { v.textContent = fmt(s.value); onInput(); });
    return s;
  }

  function checkbox(box, label, checked, onInput) {
    var row = el('label', { style: 'display:inline-flex;align-items:center;gap:6px;margin:6px 16px 6px 0;font-size:14px;' }, box);
    var c = el('input', { type: 'checkbox' }, row);
    c.checked = checked;
    el('span', { text: label }, row);
    c.addEventListener('change', onInput);
    return c;
  }

  // withOriginal: show the input image left of the result
  function setup(box, src, withOriginal) {
    box.style.cssText = 'border:1px solid #d7dce3;border-radius:8px;padding:12px;margin:12px 0 20px;';
    var row = el('div', { style: 'display:flex;gap:8px;justify-content:center;margin-bottom:8px;' }, box);
    var cs = 'width:100%;max-width:' + (withOriginal ? '49%' : '480px') + ';display:block;border-radius:4px;';
    var orig = withOriginal ? el('canvas', { style: cs }, row) : null;
    var canvas = el('canvas', { style: cs }, row);
    var info = el('div', { style: 'font-size:13px;color:#7b8794;text-align:center;' }, box);
    return loadImage(src).then(function (img) {
      canvas.width = img.width; canvas.height = img.height;
      if (orig) { orig.width = img.width; orig.height = img.height; orig.getContext('2d').putImageData(img, 0, 0); }
      return { img: img, ctx: canvas.getContext('2d'), info: info };
    });
  }

  function grayOf(img) {
    var d = img.data, g = new Uint8ClampedArray(img.width * img.height);
    for (var i = 0, j = 0; i < d.length; i += 4, j++) g[j] = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    return g;
  }

  function showMask(ctx, w, h, m) {
    var out = ctx.createImageData(w, h), o = out.data, n = 0;
    for (var j = 0; j < m.length; j++) {
      var v = m[j] ? 255 : 0; if (v) n++;
      o[4 * j] = o[4 * j + 1] = o[4 * j + 2] = v; o[4 * j + 3] = 255;
    }
    ctx.putImageData(out, 0, 0);
    return n;
  }

  var demos = {
    // cv2.threshold(gray, T, 255, cv2.THRESH_BINARY)
    threshold: function (box, src) {
      setup(box, src).then(function (s) {
        var g = grayOf(s.img), m = new Uint8Array(g.length);
        var t = slider(box, 'threshold T', 0, 255, 1, 128, draw);
        function draw() {
          var T = +t.value;
          for (var j = 0; j < g.length; j++) m[j] = g[j] > T;
          var n = showMask(s.ctx, s.img.width, s.img.height, m);
          s.info.textContent = 'white = gray > ' + T + ': ' + (100 * n / g.length).toFixed(1) + '% of pixels';
        }
        draw();
      });
    },

    // cv2.GaussianBlur(img, (k, k), 0)
    blur: function (box, src) {
      setup(box, src).then(function (s) {
        var w = s.img.width, h = s.img.height, d = s.img.data;
        var tmp = new Float32Array(d.length), out = s.ctx.createImageData(w, h);
        var k = slider(box, 'kernel size k', 1, 31, 2, 15, draw);
        function draw() {
          var K = +k.value, r = (K - 1) / 2;
          var sigma = 0.3 * ((K - 1) * 0.5 - 1) + 0.8, wt = [], sum = 0;
          for (var i = -r; i <= r; i++) { var e = Math.exp(-i * i / (2 * sigma * sigma)); wt.push(e); sum += e; }
          for (i = 0; i < wt.length; i++) wt[i] /= sum;
          var x, y, c, a, xx, yy;
          for (y = 0; y < h; y++) for (x = 0; x < w; x++) for (c = 0; c < 3; c++) {
            a = 0;
            for (i = -r; i <= r; i++) { xx = Math.min(w - 1, Math.max(0, x + i)); a += wt[i + r] * d[4 * (y * w + xx) + c]; }
            tmp[4 * (y * w + x) + c] = a;
          }
          var o = out.data;
          for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
            for (c = 0; c < 3; c++) {
              a = 0;
              for (i = -r; i <= r; i++) { yy = Math.min(h - 1, Math.max(0, y + i)); a += wt[i + r] * tmp[4 * (yy * w + x) + c]; }
              o[4 * (y * w + x) + c] = a;
            }
            o[4 * (y * w + x) + 3] = 255;
          }
          s.ctx.putImageData(out, 0, 0);
          s.info.textContent = 'kernel ' + K + '×' + K + ', sigma ≈ ' + sigma.toFixed(2);
        }
        draw();
      });
    },

    // cv2.cvtColor(img, cv2.COLOR_BGR2HSV) + two cv2.inRange + cv2.bitwise_or
    hsv: function (box, src) {
      setup(box, src, true).then(function (s) {
        var d = s.img.data, n = s.img.width * s.img.height;
        var H = new Float32Array(n), S = new Float32Array(n), V = new Float32Array(n), m = new Uint8Array(n);
        for (var j = 0; j < n; j++) {
          var r = d[4 * j], g = d[4 * j + 1], b = d[4 * j + 2];
          var mx = Math.max(r, g, b), mn = Math.min(r, g, b), df = mx - mn, h = 0;
          if (df) {
            if (mx === r) h = 60 * (g - b) / df;
            else if (mx === g) h = 120 + 60 * (b - r) / df;
            else h = 240 + 60 * (r - g) / df;
            if (h < 0) h += 360;
          }
          H[j] = h / 2; S[j] = mx ? 255 * df / mx : 0; V[j] = mx;
        }
        // strip(): a color bar above a slider; parts the filter drops are faded
        function strip(colorAt, left, right) {
          var wrap = el('div', { style: 'margin:10px 0 0 130px;width:calc(100% - 260px);' }, box);
          var ends = el('div', { style: 'display:flex;justify-content:space-between;font-size:11px;color:#7b8794;' }, wrap);
          el('span', { text: left }, ends); el('span', { text: right }, ends);
          var c = el('canvas', { width: 360, height: 14, style: 'display:block;width:100%;height:14px;border-radius:3px;' }, wrap);
          return { ctx: c.getContext('2d'), colorAt: colorAt };
        }
        function paint(st, keep) {
          for (var x = 0; x < 360; x++) {
            var t = x / 359, ok = keep(t);
            st.ctx.fillStyle = st.colorAt(t);
            st.ctx.globalAlpha = ok ? 1 : 0.15;
            st.ctx.clearRect(x, 0, 1, 14); st.ctx.fillRect(x, 0, 1, 14);
          }
          st.ctx.globalAlpha = 1;
        }
        var row = el('div', { style: 'font-size:14px;' }, box);
        var useLow = checkbox(row, 'range 1 (H near 0)', true, draw);
        var useHigh = checkbox(row, 'range 2 (H near 180)', true, draw);
        var hueStrip = strip(function (t) { return 'hsl(' + (360 * t) + ',100%,50%)'; }, 'H 0', 'H 180');
        var wd = slider(box, 'H range', 0, 40, 1, 10, draw, function (x) { return '0–' + x + ' & ' + (180 - x) + '–180'; });
        var sStrip = strip(function (t) { return 'hsl(356,' + (100 * t) + '%,' + (60 - 10 * t) + '%)'; }, 'S 0 gray', 'S 255 vivid');
        var smin = slider(box, 'S min', 0, 255, 1, 120, draw);
        var vStrip = strip(function (t) { return 'hsl(356,85%,' + (45 * t) + '%)'; }, 'V 0 black', 'V 255 bright');
        var vmin = slider(box, 'V min', 0, 255, 1, 70, draw);
        function draw() {
          var A = +wd.value, B = 180 - A, Sm = +smin.value, Vm = +vmin.value, lo = useLow.checked, hi = useHigh.checked;
          for (var j = 0; j < n; j++) {
            var h = H[j], ok = S[j] >= Sm && V[j] >= Vm && ((lo && h <= A) || (hi && h >= B));
            m[j] = ok;
          }
          var c = showMask(s.ctx, s.img.width, s.img.height, m);
          s.info.textContent = 'white = picked as red: ' + (100 * c / n).toFixed(1) + '% of pixels';
          paint(hueStrip, function (t) { var h = 180 * t; return (lo && h <= A) || (hi && h >= B); });
          paint(sStrip, function (t) { return 255 * t >= Sm; });
          paint(vStrip, function (t) { return 255 * t >= Vm; });
        }
        draw();
      });
    }
  };

  document.querySelectorAll('.cvdemo').forEach(function (box) {
    var f = demos[box.getAttribute('data-demo')];
    if (f) f(box, box.getAttribute('data-src'));
  });
})();
