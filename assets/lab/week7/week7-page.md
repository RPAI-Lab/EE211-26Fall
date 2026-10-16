---
layout: page
title: Lab Session - week-07 
description: written by Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/course-materials/' | relative_url }})

<br>

# Introducing OpenCV

> Last Update: 2026-10-15

<br>



<!-- ## 0. Setup VSCode for ROS Developing -->
<!--  -->
<!-- - Make sure you installe the `C/C++` extension: -->
<!--  -->
<!-- <img src="https://rpai-lab.github.io/EE211-25Fall/assets/lab/week7/imgs/pic0.png" alt="pic0" style="zoom:30%;" /> -->
<!--  -->
<!-- - `ctrl+shift+p` to open vscode control panel，click `C/C++: Edit Configurations (JSON)`, then a folder named `.vscode` will be generated. -->
<!--  -->
<!-- <img src="https://rpai-lab.github.io/EE211-25Fall/assets/lab/week7/imgs/pic1.png" alt="pic1" style="zoom:30%;" /> -->
<!--  -->
<!-- - open `.vscode/c_cpp_properties.json`, add ROS Path in the `includePath` section; Then you can enjoy the ROS code completion with vscode! -->
<!--  -->
<!-- <img src="https://rpai-lab.github.io/EE211-25Fall/assets/lab/week7/imgs/pic2.png" alt="pic2" style="zoom:45%;" /> -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->

## 0. Setup

Install OpenCV, then download the code materials into the `src/` of your workspace:

```bash
pip install opencv-python==4.11.0.86

mkdir -p ~/ros2_ws/src && cd ~/ros2_ws/src
curl -LO https://rpai-lab.github.io/EE211-26Fall/assets/lab/week7/ee211-25fall-lab-week7-code.zip
python3 -m zipfile -e ee211-25fall-lab-week7-code.zip .
cd ee211-lab-week7-code-materials/introduce_opencv
```

Run every script from inside `introduce_opencv/` with `python3 <name>.py`, since they load `./images/` and `./model/` by relative path. Any key closes the image windows. <span style="float: right;">📜 [code materials]({{ '/assets/lab/week7/ee211-25fall-lab-week7-code.zip' | relative_url }})</span>

## 1. An image is just a grid of numbers

**Scripts:** `image_capture_through_camera.py`

Run `image_capture_through_camera.py`, press `s` to save a frame, `q` to quit. A saved frame looks like `images/demo.jpg`, 1280 × 720 pixels:

<svg viewBox="0 0 680 395" width="100%" style="max-width: 680px; display: block; margin: 0 auto;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="demo.jpg with its pixel coordinates: (0, 0) at the top-left, (1279, 0) at the top-right, (0, 719) at the bottom-left, (1279, 719) at the bottom-right; x grows to the right, y grows downward.">
  <defs>
    <marker id="w7ar" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#4a6fa5"/></marker>
  </defs>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="14" fill="#3e4c59">
    <image href="{{ '/assets/lab/week7/imgs/demo_small.jpg' | relative_url }}" xlink:href="{{ '/assets/lab/week7/imgs/demo_small.jpg' | relative_url }}" x="100" y="60" width="480" height="270"/>
    <line x1="100" y1="22" x2="578" y2="22" stroke="#4a6fa5" stroke-width="2" marker-end="url(#w7ar)"/>
    <text x="340" y="14" text-anchor="middle" fill="#4a6fa5">x (column)</text>
    <line x1="80" y1="60" x2="80" y2="328" stroke="#4a6fa5" stroke-width="2" marker-end="url(#w7ar)"/>
    <text x="68" y="195" text-anchor="middle" fill="#4a6fa5" transform="rotate(-90 68 195)">y (row)</text>
    <g stroke="#3e4c59" stroke-width="1.5">
      <line x1="100" y1="40" x2="100" y2="58"/><line x1="580" y1="40" x2="580" y2="58"/>
      <line x1="100" y1="332" x2="100" y2="350"/><line x1="580" y1="332" x2="580" y2="350"/>
    </g>
    <text x="104" y="52">(0, 0)</text>
    <text x="576" y="52" text-anchor="end">(1279, 0)</text>
    <text x="104" y="348">(0, 719)</text>
    <text x="576" y="348" text-anchor="end">(1279, 719)</text>
    <text x="340" y="385" text-anchor="middle" font-size="13" fill="#7b8794">pixel (x, y) is frame[y, x]</text>
  </g>
</svg>

The camera itself has a 3D frame, the one used by OpenCV and by ROS optical frames. Drag to look around:

<div id="cam3d" data-src="{{ '/assets/lab/week7/imgs/demo_small.jpg' | relative_url }}" style="margin:8px 0 0;"></div>

<p style="text-align:center;font-size:13px;color:#7b8794;">camera: <b>Z</b> out of the lens · <b>X</b> right · <b>Y</b> down, same directions as pixel x and y · world: <b>z</b> up</p>

<script src="{{ '/assets/lab/week7/cam3d.js' | relative_url }}"></script>

That `frame` is a NumPy array:

```python
frame.shape      # (720, 1280, 3): rows, columns, channels
frame[0, 0]      # top-left pixel: [B, G, R], not RGB!
frame[100:300, 200:400]   # cropping = slicing, rows (y) first
```

Pixel `(0, 0)` is the **top-left** corner and y grows **downward**. Indexing is `frame[y, x]`: row first.

> Try: add `print(frame.shape, frame[0, 0])` to the loop and point the camera at something red. Which of the three numbers is largest?

## 2. Black or white: threshold

**Scripts:** `image_preprocessing_segmentation.py`

One gray value per pixel, one cut: brighter than `T` → white, else black.

```python
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)
```

<div class="cvdemo" data-demo="threshold" data-src="{{ '/assets/lab/week7/imgs/demo_small.jpg' | relative_url }}"></div>

Drag `T` and watch what survives. Brightness alone cannot tell colors apart, which is why section 4 uses color instead.

## 3. Clean up before you cut: blur

**Scripts:** `image_preprocessing_filtering.py`

Noise turns into speckles after thresholding. Blurring first averages each pixel with its neighbors.

```python
blurred = cv2.GaussianBlur(img, (15, 15), 0)   # k must be odd
```

<div class="cvdemo" data-demo="blur" data-src="{{ '/assets/lab/week7/imgs/demo_small.jpg' | relative_url }}"></div>

## 4. Find the red: HSV

**Scripts:** `image_preprocessing_segmentation_single_color.py`

HSV describes a pixel by **H**ue (which color), **S**aturation (how vivid) and **V**alue (how bright). In OpenCV, H runs 0–180, and red sits at **both ends**:

<svg viewBox="0 0 680 84" width="100%" style="max-width: 680px; display: block; margin: 0 auto 12px;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hue bar from 0 to 180; red appears at both ends, 0 to 10 and 170 to 180.">
  <defs><linearGradient id="w7hue"><stop offset="0.000" stop-color="hsl(0,100%,50%)"/><stop offset="0.167" stop-color="hsl(60,100%,50%)"/><stop offset="0.333" stop-color="hsl(120,100%,50%)"/><stop offset="0.500" stop-color="hsl(180,100%,50%)"/><stop offset="0.667" stop-color="hsl(240,100%,50%)"/><stop offset="0.833" stop-color="hsl(300,100%,50%)"/><stop offset="1.000" stop-color="hsl(360,100%,50%)"/></linearGradient></defs>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="13" fill="#3e4c59">
    <rect x="40" y="30" width="600" height="24" fill="url(#w7hue)"/>
    <path d="M40.0,26 V20 H73.3 V26" fill="none" stroke="#c0392b" stroke-width="2"/>
    <path d="M606.7,26 V20 H640.0 V26" fill="none" stroke="#c0392b" stroke-width="2"/>
    <text x="40.0" y="13" fill="#c0392b">red: 0–10</text>
    <text x="640.0" y="13" text-anchor="end" fill="#c0392b">red: 170–180</text>
    <line x1="40.0" y1="54" x2="40.0" y2="60" stroke="#7b8794"/><text x="40.0" y="74" text-anchor="middle">0</text><line x1="140.0" y1="54" x2="140.0" y2="60" stroke="#7b8794"/><text x="140.0" y="74" text-anchor="middle">30</text><line x1="240.0" y1="54" x2="240.0" y2="60" stroke="#7b8794"/><text x="240.0" y="74" text-anchor="middle">60</text><line x1="340.0" y1="54" x2="340.0" y2="60" stroke="#7b8794"/><text x="340.0" y="74" text-anchor="middle">90</text><line x1="440.0" y1="54" x2="440.0" y2="60" stroke="#7b8794"/><text x="440.0" y="74" text-anchor="middle">120</text><line x1="540.0" y1="54" x2="540.0" y2="60" stroke="#7b8794"/><text x="540.0" y="74" text-anchor="middle">150</text><line x1="640.0" y1="54" x2="640.0" y2="60" stroke="#7b8794"/><text x="640.0" y="74" text-anchor="middle">180</text>
  </g>
</svg>

Two pixels on the cap in `images/red.png`:

<svg viewBox="0 0 680 280" width="100%" style="max-width: 680px; display: block; margin: 0 auto 12px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="red.png with two pixels marked on the cap: one in light, one in shadow.">
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="13" fill="#3e4c59">
    <image href="{{ '/assets/lab/week7/imgs/red_small.jpg' | relative_url }}" xlink:href="{{ '/assets/lab/week7/imgs/red_small.jpg' | relative_url }}" x="170" y="10" width="340" height="258.2"/>
    <line x1="164" y1="100" x2="285.9" y2="112.6" stroke="#3e4c59" stroke-width="1.2"/><circle cx="285.9" cy="112.6" r="5" fill="none" stroke="#ffffff" stroke-width="3"/><circle cx="285.9" cy="112.6" r="5" fill="none" stroke="#1f2933" stroke-width="1.5"/><text x="160" y="104" text-anchor="end" font-weight="600" fill="#1f2933">cap, light</text><line x1="516" y1="154" x2="361.6" y2="179.6" stroke="#3e4c59" stroke-width="1.2"/><circle cx="361.6" cy="179.6" r="5" fill="none" stroke="#ffffff" stroke-width="3"/><circle cx="361.6" cy="179.6" r="5" fill="none" stroke="#1f2933" stroke-width="1.5"/><text x="520" y="158" text-anchor="start" font-weight="600" fill="#1f2933">cap, shadow</text>
  </g>
</svg>

<svg viewBox="0 0 700 188" width="100%" style="max-width: 700px; display: block; margin: 0 auto 12px;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cap in light vs in shadow: B, G, R all change; H stays at 178 and 177; V drops from 210 to 156.">
  <defs><linearGradient id="w7hue3"><stop offset="0.000" stop-color="hsl(0,100%,50%)"/><stop offset="0.167" stop-color="hsl(60,100%,50%)"/><stop offset="0.333" stop-color="hsl(120,100%,50%)"/><stop offset="0.500" stop-color="hsl(180,100%,50%)"/><stop offset="0.667" stop-color="hsl(240,100%,50%)"/><stop offset="0.833" stop-color="hsl(300,100%,50%)"/><stop offset="1.000" stop-color="hsl(360,100%,50%)"/></linearGradient></defs>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="13" fill="#3e4c59"><text x="230" y="22" text-anchor="middle" font-weight="600" fill="#1f2933">B G R</text><text x="390" y="22" text-anchor="middle" font-weight="600" fill="#1f2933">H</text><text x="525" y="22" text-anchor="middle" font-weight="600" fill="#1f2933">S</text><text x="635" y="22" text-anchor="middle" font-weight="600" fill="#1f2933">V</text><rect x="8" y="50" width="28" height="28" rx="4" fill="rgb(210,55,67)" stroke="#a9b4c2"/><text x="44" y="69" fill="#1f2933">cap, light</text><rect x="160" y="48" width="130" height="8" fill="#eef1f5"/><rect x="160" y="48" width="34.2" height="8" fill="#4a7bd0"/><text x="295" y="56" font-size="11">67</text><rect x="160" y="59" width="130" height="8" fill="#eef1f5"/><rect x="160" y="59" width="28.0" height="8" fill="#3fa34d"/><text x="295" y="67" font-size="11">55</text><rect x="160" y="70" width="130" height="8" fill="#eef1f5"/><rect x="160" y="70" width="107.1" height="8" fill="#d0453f"/><text x="295" y="78" font-size="11">210</text><rect x="330" y="56" width="120" height="12" fill="url(#w7hue3)"/><path d="M448.7,54 l-6,-9 h12 z" fill="#1f2933"/><text x="448.7" y="82" text-anchor="middle" font-size="11">178</text><rect x="480" y="56" width="90" height="12" fill="#eef1f5"/><rect x="480" y="56" width="66.4" height="12" fill="#7392bd"/><text x="542.4" y="66" font-size="11" text-anchor="end" fill="#ffffff">188</text><rect x="590" y="56" width="90" height="12" fill="#eef1f5"/><rect x="590" y="56" width="74.1" height="12" fill="#7392bd"/><text x="660.1" y="66" font-size="11" text-anchor="end" fill="#ffffff">210</text><rect x="8" y="114" width="28" height="28" rx="4" fill="rgb(156,20,33)" stroke="#a9b4c2"/><text x="44" y="133" fill="#1f2933">cap, shadow</text><rect x="160" y="112" width="130" height="8" fill="#eef1f5"/><rect x="160" y="112" width="16.8" height="8" fill="#4a7bd0"/><text x="295" y="120" font-size="11">33</text><rect x="160" y="123" width="130" height="8" fill="#eef1f5"/><rect x="160" y="123" width="10.2" height="8" fill="#3fa34d"/><text x="295" y="131" font-size="11">20</text><rect x="160" y="134" width="130" height="8" fill="#eef1f5"/><rect x="160" y="134" width="79.5" height="8" fill="#d0453f"/><text x="295" y="142" font-size="11">156</text><rect x="330" y="120" width="120" height="12" fill="url(#w7hue3)"/><path d="M448.0,118 l-6,-9 h12 z" fill="#1f2933"/><text x="448.0" y="146" text-anchor="middle" font-size="11">177</text><rect x="480" y="120" width="90" height="12" fill="#eef1f5"/><rect x="480" y="120" width="78.4" height="12" fill="#7392bd"/><text x="554.4" y="130" font-size="11" text-anchor="end" fill="#ffffff">222</text><rect x="590" y="120" width="90" height="12" fill="#eef1f5"/><rect x="590" y="120" width="55.1" height="12" fill="#7392bd"/><text x="641.1" y="130" font-size="11" text-anchor="end" fill="#ffffff">156</text><rect x="152" y="40" width="170" height="116" rx="6" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="5 3"/><text x="234.0" y="178" text-anchor="middle" font-size="12" fill="#c0392b">all three change</text><rect x="328" y="40" width="130" height="116" rx="6" fill="none" stroke="#3fa34d" stroke-width="1.5" stroke-dasharray="5 3"/><text x="391.0" y="178" text-anchor="middle" font-size="12" fill="#3fa34d">same color</text><rect x="582" y="40" width="106" height="116" rx="6" fill="none" stroke="#4a6fa5" stroke-width="1.5" stroke-dasharray="5 3"/><text x="635.0" y="178" text-anchor="middle" font-size="12" fill="#4a6fa5">takes the light</text></g>
</svg>

<svg viewBox="0 0 700 170" width="100%" style="max-width: 700px; display: block; margin: 0 auto 12px;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="S runs from gray to vivid red: the floor is at 12, below S min 120; the cap is at 188 and 222. V runs from black to bright red: the cap in shadow is at 156 and in light at 210, both above V min 70.">
  <defs><linearGradient id="w7S"><stop offset="0.00" stop-color="#d2d2d2"/><stop offset="0.12" stop-color="#d2b8ba"/><stop offset="0.25" stop-color="#d29ea2"/><stop offset="0.38" stop-color="#d28489"/><stop offset="0.50" stop-color="#d26970"/><stop offset="0.62" stop-color="#d24f58"/><stop offset="0.75" stop-color="#d2353f"/><stop offset="0.88" stop-color="#d21a27"/><stop offset="1.00" stop-color="#d2000e"/></linearGradient><linearGradient id="w7V"><stop offset="0.00" stop-color="#000000"/><stop offset="0.12" stop-color="#1f0406"/><stop offset="0.25" stop-color="#3f090c"/><stop offset="0.38" stop-color="#5f0d13"/><stop offset="0.50" stop-color="#7f1119"/><stop offset="0.62" stop-color="#9f161f"/><stop offset="0.75" stop-color="#bf1a25"/><stop offset="0.88" stop-color="#df1f2b"/><stop offset="1.00" stop-color="#ff2332"/></linearGradient></defs>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="13" fill="#3e4c59"><text x="156" y="45" text-anchor="end" font-weight="600" fill="#1f2933">S</text><rect x="170" y="30" width="480" height="22" rx="3" fill="url(#w7S)"/><text x="170" y="24" font-size="11">0 gray</text><text x="650" y="24" font-size="11" text-anchor="end">255 vivid</text><line x1="395.9" y1="28" x2="395.9" y2="54" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="4 3"/><text x="395.9" y="24" font-size="11" text-anchor="middle" fill="#c0392b">S min 120</text><path d="M192.6,54 l-5,8 h10 z" fill="#1f2933"/><text x="192.6" y="76" font-size="11" text-anchor="middle">floor 12</text><path d="M523.9,54 l-5,8 h10 z" fill="#1f2933"/><text x="523.9" y="76" font-size="11" text-anchor="middle">cap 188</text><path d="M587.9,54 l-5,8 h10 z" fill="#1f2933"/><text x="587.9" y="76" font-size="11" text-anchor="middle">222</text><text x="156" y="125" text-anchor="end" font-weight="600" fill="#1f2933">V</text><rect x="170" y="110" width="480" height="22" rx="3" fill="url(#w7V)"/><text x="170" y="104" font-size="11">0 black</text><text x="650" y="104" font-size="11" text-anchor="end">255 bright</text><line x1="301.8" y1="108" x2="301.8" y2="134" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="4 3"/><text x="301.8" y="104" font-size="11" text-anchor="middle" fill="#c0392b">V min 70</text><path d="M463.6,134 l-5,8 h10 z" fill="#1f2933"/><text x="463.6" y="156" font-size="11" text-anchor="middle">shadow 156</text><path d="M565.3,134 l-5,8 h10 z" fill="#1f2933"/><text x="565.3" y="156" font-size="11" text-anchor="middle">light 210</text></g>
</svg>

<div class="cvdemo" data-demo="hsv" data-src="{{ '/assets/lab/week7/imgs/red_small.jpg' | relative_url }}"></div>

> Try: untick range 2. The cap is gone: it lives at 170–180.
>
> Then set `H range` to 40 and `S min` to 10. The floor floods in.

The same three sliders in code:

```python
H_RANGE, S_MIN, V_MIN = 10, 120, 70

hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
lo1, hi1 = (0, S_MIN, V_MIN), (H_RANGE, 255, 255)
lo2, hi2 = (180 - H_RANGE, S_MIN, V_MIN), (180, 255, 255)
range1 = cv2.inRange(hsv, lo1, hi1)   # H near 0
range2 = cv2.inRange(hsv, lo2, hi2)   # H near 180
red_mask = cv2.bitwise_or(range1, range2)
```

The script does the same with the numbers written out.

## 5. From white pixels to a position

**Scripts:** `image_preprocessing_draw_and_detect.py`

<div style="display:flex;gap:8px;justify-content:center;margin:12px 0 16px;"><figure style="margin:0;flex:1;max-width:220px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/step_mask.jpg' | relative_url }}" alt="step_mask.jpg" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;"><code>red_mask</code></figcaption></figure><div style="align-self:center;font-size:20px;color:#7b8794;">→</div><figure style="margin:0;flex:1;max-width:220px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/step_contour.jpg' | relative_url }}" alt="step_contour.jpg" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;"><code>findContours</code>: outline</figcaption></figure><div style="align-self:center;font-size:20px;color:#7b8794;">→</div><figure style="margin:0;flex:1;max-width:220px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/step_center.jpg' | relative_url }}" alt="step_center.jpg" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;"><code>moments</code>: (443, 351)</figcaption></figure></div>

```python
contours, _ = cv2.findContours(red_mask, cv2.RETR_EXTERNAL,
                               cv2.CHAIN_APPROX_SIMPLE)
cap = max(contours, key=cv2.contourArea)  # biggest = the cap
M = cv2.moments(cap)
cx, cy = int(M['m10'] / M['m00']), int(M['m01'] / M['m00'])
print(cx, cy)   # 443 351
```

**Shapes:** `cv2.approxPolyDP` simplifies the outline (gray) to a polygon (blue), then counts the corners.

<div style="display:flex;gap:8px;justify-content:center;margin:12px 0 16px;"><figure style="margin:0;flex:1;max-width:180px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/shape_tri.png' | relative_url }}" alt="shape_tri.png" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;">3 corners: Triangle</figcaption></figure><figure style="margin:0;flex:1;max-width:180px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/shape_rect.png' | relative_url }}" alt="shape_rect.png" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;">4 corners: Rectangle</figcaption></figure><figure style="margin:0;flex:1;max-width:180px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/shape_circ.png' | relative_url }}" alt="shape_circ.png" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;">more: Circle</figcaption></figure></div>

## 6. Beyond color

**Scripts:** `image_preprocessing_feature_detect_and_extrect.py`, `face_detaction.py`

**SIFT**: finds distinctive points, then finds the same points again after the object turns, shrinks or moves.

<img src="{{ '/assets/lab/week7/imgs/sift_match.jpg' | relative_url }}" alt="SIFT matches between demo.jpg and the same photo rotated 30 degrees and shrunk to 60%" style="width:100%;">

<p style="text-align:center;font-size:13px;color:#7b8794;">left: <code>demo.jpg</code> · right: rotated 30°, shrunk to 60% · green: same point found in both</p>

**Face detection** (uses your camera): one box per face, returned as `(x, y, w, h)`.

<svg viewBox="0 0 680 262" width="100%" style="max-width: 600px; display: block; margin: 8px auto 16px;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A camera frame with one detected face box; x and y measure from the top-left corner of the frame to the top-left corner of the box, w and h are its width and height.">
  <defs><marker id="w7fa" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="#4a6fa5"/></marker></defs>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="14" fill="#4a6fa5">
    <rect x="150" y="24" width="380" height="214" fill="#f4f6f8" stroke="#a9b4c2" stroke-width="1.5"/>
    <text x="150" y="16" fill="#3e4c59">(0, 0)</text>
    <circle cx="385.0" cy="125.0" r="42" fill="#dde3ea"/>
    <circle cx="370.0" cy="117.0" r="5" fill="#a9b4c2"/><circle cx="400.0" cy="117.0" r="5" fill="#a9b4c2"/>
    <path d="M369.0,141.0 q16,12 32,0" fill="none" stroke="#a9b4c2" stroke-width="3" stroke-linecap="round"/>
    <rect x="330" y="64" width="110" height="130" fill="none" stroke="#3fa34d" stroke-width="3"/>
    <line x1="152" y1="64" x2="328" y2="64" stroke="#4a6fa5" stroke-width="1.5" stroke-dasharray="5 3" marker-start="url(#w7fa)" marker-end="url(#w7fa)"/>
    <text x="240.0" y="58" text-anchor="middle">x</text>
    <line x1="330" y1="26" x2="330" y2="62" stroke="#4a6fa5" stroke-width="1.5" stroke-dasharray="5 3" marker-start="url(#w7fa)" marker-end="url(#w7fa)"/>
    <text x="322" y="49.0" text-anchor="end">y</text>
    <line x1="330" y1="210" x2="440" y2="210" stroke="#4a6fa5" stroke-width="1.5" marker-start="url(#w7fa)" marker-end="url(#w7fa)"/>
    <text x="385.0" y="228" text-anchor="middle">w</text>
    <line x1="456" y1="64" x2="456" y2="194" stroke="#4a6fa5" stroke-width="1.5" marker-start="url(#w7fa)" marker-end="url(#w7fa)"/>
    <text x="466" y="134.0">h</text>
  </g>
</svg>

`minNeighbors` is how many overlapping boxes must agree before a face counts:

<div style="display:flex;gap:8px;justify-content:center;margin:12px 0 4px;"><figure style="margin:0;flex:1;max-width:220px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/face_mn0.jpg' | relative_url }}" alt="face_mn0.jpg" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;"><code>minNeighbors=0</code>: 47 boxes</figcaption></figure><figure style="margin:0;flex:1;max-width:220px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/face_mn1.jpg' | relative_url }}" alt="face_mn1.jpg" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;"><code>minNeighbors=1</code>: 3 boxes</figcaption></figure><figure style="margin:0;flex:1;max-width:220px;text-align:center;"><img src="{{ '/assets/lab/week7/imgs/face_mn5.jpg' | relative_url }}" alt="face_mn5.jpg" style="width:100%;border-radius:4px;"><figcaption style="font-size:13px;margin-top:4px;"><code>minNeighbors=5</code>: 1 box</figcaption></figure></div>

<p style="text-align:center;font-size:13px;color:#7b8794;">photo: NASA, public domain</p>

> Try: run `face_detaction.py` with `minNeighbors` set to 0, 1 and 5, and point the camera at yourself.

## 7. Find the red cap with your robot

**Scripts:** `red_finder.py` (code below)

Same code, real camera: the RealSense on the robot publishes images, your node finds the red cap in every frame.

1. ssh into the robot of your group (see the [robot doc]({{ '/assets/project/robot_doc' | relative_url }})). Work in your own folder so you do not overwrite your teammates: `mkdir -p ~/your_name && cd ~/your_name`
2. **One person per group** starts the camera: `ros2 launch realsense2_camera rs_launch.py`
3. Find the color image topic: `ros2 topic list | grep color`, then check it runs: `ros2 topic hz <that topic>`
4. Save the node below as `red_finder.py`, set `TOPIC` to what you found, run `python3 red_finder.py`

```python
import cv2
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

TOPIC = '/camera/color/image_raw'   # from: ros2 topic list | grep color
H_RANGE, S_MIN, V_MIN = 10, 120, 70  # section 4

class RedFinder(Node):
    def __init__(self):
        super().__init__('red_finder')
        self.bridge = CvBridge()
        self.create_subscription(Image, TOPIC, self.callback, 10)

    def callback(self, msg):
        image = self.bridge.imgmsg_to_cv2(msg, 'bgr8')   # ROS image -> OpenCV array

        # section 4: pick out red
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        lo1, hi1 = (0, S_MIN, V_MIN), (H_RANGE, 255, 255)
        lo2, hi2 = (180 - H_RANGE, S_MIN, V_MIN), (180, 255, 255)
        range1 = cv2.inRange(hsv, lo1, hi1)   # H near 0
        range2 = cv2.inRange(hsv, lo2, hi2)   # H near 180
        mask = cv2.bitwise_or(range1, range2)

        # section 5: biggest red blob -> center
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            return
        cap = max(contours, key=cv2.contourArea)
        if cv2.contourArea(cap) < 500:
            return
        M = cv2.moments(cap)
        cx, cy = int(M['m10'] / M['m00']), int(M['m01'] / M['m00'])
        self.get_logger().info(f'red cap at ({cx}, {cy})', throttle_duration_sec=0.5)

def main():
    rclpy.init()
    rclpy.spin(RedFinder())

if __name__ == '__main__':
    main()
```

> Try: slide the cap from left to right in front of the camera. Which number changes? Now lift it up. Check against the picture in section 1.
>
> Then hold up something else red. What does your node print now, and why?

<script src="{{ '/assets/lab/week7/cv-demo.js' | relative_url }}"></script>

<br>

<br>
