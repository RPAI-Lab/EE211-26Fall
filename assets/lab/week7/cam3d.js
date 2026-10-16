// Drag-to-rotate 3D sketch of the world frame, a camera, its optical frame and image plane.
// Orthographic view on a 2D canvas, painter's algorithm; no external libraries.
(function () {
  var box = document.getElementById('cam3d');
  if (!box) return;

  // ---- scene, in world coordinates (z up) ----
  var C = [0.9, -0.9, 1.0];          // camera optical center
  var F = 1.3, W2 = 0.8, H2 = 0.45;   // image plane distance and half size (16:9)
  // optical frame: Z_c = world +x, X_c = world -y, Y_c = world -z
  function cam(xc, yc, zc) { return [C[0] + zc, C[1] - xc, C[2] - yc]; }
  var Pc = [0.55, 0.3, 3.2];    // a scene point, camera coordinates
  var P = cam(Pc[0], Pc[1], Pc[2]);
  var Pi = cam(Pc[0] * F / Pc[2], Pc[1] * F / Pc[2], F);

  var RED = '#d0453f', GREEN = '#3fa34d', BLUE = '#4a7bd0', INK = '#1f2933', GRAY = '#7b8794';

  // ---- view ----
  var yaw = 0.6, pitch = 0.42, scale = 112;
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;max-width:640px;height:auto;display:block;margin:0 auto;cursor:grab;touch-action:none;';
  box.appendChild(canvas);
  var hint = document.createElement('div');
  hint.style.cssText = 'font-size:13px;color:#7b8794;text-align:center;margin-top:4px;';
  hint.textContent = 'drag to rotate · double-click to reset';
  box.appendChild(hint);
  var CW = 640, CH = 400, dpr = window.devicePixelRatio || 1;
  canvas.width = CW * dpr; canvas.height = CH * dpr;
  var ctx = canvas.getContext('2d');

  var tex = new Image(), texReady = false;
  tex.onload = function () { texReady = true; draw(); };
  tex.src = box.getAttribute('data-src');

  // world -> [screen x, screen y, depth toward viewer]
  function view(p) {
    var x = p[0] - 2.1, y = p[1] + 0.75, z = p[2] - 0.75;            // look at the middle of the scene
    var cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    var r = sy * x - cy * y;                                 // screen right
    var f = cy * x + sy * y;                                 // horizontal, away from viewer
    var u = cp * z + sp * f;                                 // screen up
    var t = -cp * f + sp * z;                                // toward viewer
    return [CW / 2 + scale * r, CH / 2 - scale * u, t];
  }

  // ---- primitives ----
  var prims = [];
  function line(a, b, color, width, dash, arrow, pieces) {
    pieces = pieces || 8;
    for (var i = 0; i < pieces; i++) {
      var s = i / pieces, e = (i + 1) / pieces;
      var p0 = [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s, a[2] + (b[2] - a[2]) * s];
      var p1 = [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, a[2] + (b[2] - a[2]) * e];
      prims.push({ k: 'l', p: [p0, p1], c: color, w: width, d: dash, arrow: arrow && i === pieces - 1, from: a });
    }
  }
  function poly(pts, fill, stroke) { prims.push({ k: 'p', p: pts, c: fill, s: stroke }); }
  function dot(p, r, fill, stroke) { prims.push({ k: 'd', p: [p], r: r, c: fill, s: stroke }); }
  var labels = [];
  function label(p, text, color, dx, dy, bold) { labels.push({ p: p, t: text, c: color, dx: dx || 0, dy: dy || 0, b: bold }); }

  // world frame at the origin
  var O = [0, 0, 0];
  line(O, [1.0, 0, 0], RED, 3.5, null, true, 4);
  line(O, [0, 1.0, 0], GREEN, 3.5, null, true, 4);
  line(O, [0, 0, 0.8], BLUE, 3.5, null, true, 4);
  label([1.12, 0, 0], 'x', RED, 0, 4, true);
  label([0, 1.12, 0], 'y', GREEN, 0, 4, true);
  label([0, 0, 0.9], 'z', BLUE, 0, 0, true);
  label(O, 'world', INK, -8, 18);
  // a faint floor grid in the world x-y plane
  for (var g = -1; g <= 5; g++) line([g * 0.75, -2.1, 0], [g * 0.75, 0.9, 0], '#e3e8ee', 1, null, false, 4);
  for (g = -3; g <= 1; g++) line([-0.75, g * 0.7 + 0.2, 0], [3.75, g * 0.7 + 0.2, 0], '#e3e8ee', 1, null, false, 6);

  // camera body (box behind the lens) and lens (cylinder along world x)
  function cuboid(x0, x1, y0, y1, z0, z1, fill) {
    var v = function (i, j, k) { return [[x0, x1][i], [y0, y1][j], [z0, z1][k]]; };
    poly([v(0, 0, 0), v(0, 1, 0), v(0, 1, 1), v(0, 0, 1)], fill[0], GRAY);
    poly([v(1, 0, 0), v(1, 1, 0), v(1, 1, 1), v(1, 0, 1)], fill[0], GRAY);
    poly([v(0, 0, 0), v(1, 0, 0), v(1, 0, 1), v(0, 0, 1)], fill[1], GRAY);
    poly([v(0, 1, 0), v(1, 1, 0), v(1, 1, 1), v(0, 1, 1)], fill[1], GRAY);
    poly([v(0, 0, 1), v(1, 0, 1), v(1, 1, 1), v(0, 1, 1)], fill[2], GRAY);
    poly([v(0, 0, 0), v(1, 0, 0), v(1, 1, 0), v(0, 1, 0)], fill[2], GRAY);
  }
  cuboid(C[0] - 0.42, C[0] - 0.1, C[1] - 0.26, C[1] + 0.26, C[2] - 0.15, C[2] + 0.15, ['#cfd8e4', '#b9c6d6', '#e9eff7']);
  var N = 18, rl = 0.11, xl0 = C[0] - 0.1, xl1 = C[0];
  for (var i = 0; i < N; i++) {
    var a0 = 2 * Math.PI * i / N, a1 = 2 * Math.PI * (i + 1) / N;
    poly([[xl0, C[1] + rl * Math.cos(a0), C[2] + rl * Math.sin(a0)], [xl1, C[1] + rl * Math.cos(a0), C[2] + rl * Math.sin(a0)],
          [xl1, C[1] + rl * Math.cos(a1), C[2] + rl * Math.sin(a1)], [xl0, C[1] + rl * Math.cos(a1), C[2] + rl * Math.sin(a1)]], '#8a97a8', null);
  }
  var lensFace = [];
  for (i = 0; i < N; i++) { var a = 2 * Math.PI * i / N; lensFace.push([xl1, C[1] + rl * Math.cos(a), C[2] + rl * Math.sin(a)]); }
  poly(lensFace, '#3e4c59', GRAY);

  // frustum edges and the image plane with the photo
  var TL = cam(-W2, -H2, F), TR = cam(W2, -H2, F), BR = cam(W2, H2, F), BL = cam(-W2, H2, F);
  [TL, TR, BR, BL].forEach(function (q) { line(C, q, '#a9b4c2', 1, null, false, 6); });
  prims.push({ k: 'img', p: [TL, TR, BR, BL] });
  poly([TL, TR, BR, BL], null, '#3e4c59');
  // pixel axes from the top-left corner of the image plane
  line(TL, cam(-W2 + 0.45, -H2, F), RED, 2, null, true, 2);
  line(TL, cam(-W2, -H2 + 0.35, F), GREEN, 2, null, true, 2);
  label(TL, 'pixel (0, 0)', INK, -6, -8);
  label(cam(-W2 + 0.5, -H2, F), 'x', RED, 4, -4);
  label(cam(-W2, -H2 + 0.42, F), 'y', GREEN, -10, 4);

  // optical frame axes at the lens
  line(C, cam(0.55, 0, 0), RED, 2.5, null, true, 3);
  line(C, cam(0, 0.55, 0), GREEN, 2.5, null, true, 3);
  line(C, cam(0, 0, 3.9), BLUE, 2.5, null, true, 14);
  label(cam(0.66, 0, 0), 'X', RED, 0, 4, true);
  label(cam(0, 0.66, 0), 'Y', GREEN, 0, 6, true);
  label(cam(0, 0, 4.05), 'Z', BLUE, 0, 0, true);
  label([C[0] - 0.42, C[1] + 0.26, C[2] + 0.15], 'camera', INK, -60, -6);

  // a scene point and its ray to one pixel
  line(C, P, INK, 1.3, [5, 4], false, 14);
  dot(Pi, 4.5, '#ffffff', INK);
  dot(P, 5, INK, null);
  label(Pi, 'pixel (x, y)', INK, 8, 16, true);
  label(P, 'point (X, Y, Z)', INK, 9, 5, true);

  // ---- render ----
  function depth(pr) {
    var s = 0;
    for (var j = 0; j < pr.p.length; j++) s += view(pr.p[j])[2];
    return s / pr.p.length;
  }
  function arrowHead(a, b, color, w) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, h = 7 + w;
    ctx.beginPath();
    ctx.moveTo(b[0], b[1]);
    ctx.lineTo(b[0] - h * ux - h * 0.5 * uy, b[1] - h * uy + h * 0.5 * ux);
    ctx.lineTo(b[0] - h * ux + h * 0.5 * uy, b[1] - h * uy - h * 0.5 * ux);
    ctx.closePath(); ctx.fillStyle = color; ctx.fill();
  }
  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, CW, CH);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, CW, CH);
    var list = prims.slice().sort(function (p, q) { return depth(p) - depth(q); });
    list.forEach(function (pr) {
      var s = pr.p.map(view);
      ctx.setLineDash([]);
      if (pr.k === 'l') {
        ctx.beginPath(); ctx.moveTo(s[0][0], s[0][1]); ctx.lineTo(s[1][0], s[1][1]);
        ctx.strokeStyle = pr.c; ctx.lineWidth = pr.w; ctx.lineCap = 'round';
        if (pr.d) ctx.setLineDash(pr.d);
        ctx.stroke();
        if (pr.arrow) arrowHead(view(pr.from), s[1], pr.c, pr.w);
      } else if (pr.k === 'p') {
        ctx.beginPath(); ctx.moveTo(s[0][0], s[0][1]);
        for (var j = 1; j < s.length; j++) ctx.lineTo(s[j][0], s[j][1]);
        ctx.closePath();
        if (pr.c) { ctx.fillStyle = pr.c; ctx.fill(); }
        if (pr.s) { ctx.strokeStyle = pr.s; ctx.lineWidth = 1.2; ctx.stroke(); }
      } else if (pr.k === 'd') {
        ctx.beginPath(); ctx.arc(s[0][0], s[0][1], pr.r, 0, 2 * Math.PI);
        if (pr.c) { ctx.fillStyle = pr.c; ctx.fill(); }
        if (pr.s) { ctx.strokeStyle = pr.s; ctx.lineWidth = 2; ctx.stroke(); }
      } else if (pr.k === 'img' && texReady) {
        // orthographic view keeps the plane a parallelogram, so an affine map is exact
        var o = s[0], ex = [(s[1][0] - o[0]) / tex.width, (s[1][1] - o[1]) / tex.width],
            ey = [(s[3][0] - o[0]) / tex.height, (s[3][1] - o[1]) / tex.height];
        ctx.save();
        ctx.setTransform(dpr * ex[0], dpr * ex[1], dpr * ey[0], dpr * ey[1], dpr * o[0], dpr * o[1]);
        ctx.globalAlpha = 0.9; ctx.drawImage(tex, 0, 0);
        ctx.restore();
      }
    });
    ctx.setLineDash([]);
    ctx.font = '13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    ctx.lineJoin = 'round';
    labels.forEach(function (l) {
      var s = view(l.p), x = s[0] + l.dx, y = s[1] + l.dy;
      ctx.font = (l.b ? '600 ' : '') + (l.t.length === 1 ? '15px ' : '13px ') + 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 4; ctx.strokeText(l.t, x, y);
      ctx.fillStyle = l.c; ctx.fillText(l.t, x, y);
    });
  }

  // ---- interaction ----
  var dragging = false, lx = 0, ly = 0;
  canvas.addEventListener('pointerdown', function (e) { dragging = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    yaw -= (e.clientX - lx) * 0.01;
    pitch = Math.max(-1.4, Math.min(1.4, pitch + (e.clientY - ly) * 0.01));
    lx = e.clientX; ly = e.clientY; draw();
  });
  canvas.addEventListener('pointerup', function () { dragging = false; canvas.style.cursor = 'grab'; });
  canvas.addEventListener('dblclick', function () { yaw = 0.6; pitch = 0.42; draw(); });
  draw();
})();
