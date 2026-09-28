---
layout: page
title: Lab Session - week-04
description: written by Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/course-materials/' | relative_url }})

<br>

# Topic: Publisher & Subscriber

> Last Update: 2026-9-26

<br>

## 1. Connect to your robot

- Robot usage & safety notes <span style="float: right;">📑 [See]({{ '/assets/project/robot_doc' | relative_url }})</span>
- Connecting to the robot & team conventions (ssh / VSCode Remote-SSH / NoMachine, network settings, git, workspace layout) <span style="float: right;">📑 [See]({{ '/assets/project/remote_connection' | relative_url }})</span>

## 2. Create a ROS2 Package

Click any box for the official tutorial on that piece:

<svg viewBox="0 0 900 546" width="100%" style="max-width: 900px; display: block; margin: 0 auto;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="Left: a workspace folder tree. src holds a package whose code file defines nodes and the connections they use; install holds the built executable. ros2 pkg create makes the package, colcon build turns the code into the executable. ros2 run or ros2 launch takes the executable, crosses out of the folder, and enters the ROS graph on the right, where dots are nodes and each connection type has its own line style and tutorial.">
  <style>
    .font { font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    .shell { fill: #fbfcfd; stroke: #d7dce3; stroke-width: 1.5; }
    .rt    { fill: #f4f8fd; stroke: #c6d7ea; stroke-width: 1.5; }
    .chip  { fill: #e9eff7; }
    .tree  { stroke: #b9c2ce; stroke-width: 1.5; fill: none; stroke-linecap: round; }
    .act   { stroke: #4a6fa5; stroke-width: 2; fill: none; }
    .dot   { fill: #a9bdd6; }
    .dir   { fill: #ffffff; stroke: #a9b4c2; stroke-width: 1.4; }
    .src   { fill: #ffffff; stroke: #a9b4c2; stroke-width: 1.4; }
    .bin   { fill: #cfd8e4; stroke: #a9b4c2; stroke-width: 1.4; }
    .e-topic  { stroke: #7392bd; stroke-width: 1.8; fill: none; }
    .e-service{ stroke: #7392bd; stroke-width: 1.8; fill: none; stroke-dasharray: 8 4; }
    .e-action { stroke: #7392bd; stroke-width: 1.8; fill: none; stroke-dasharray: 3 3; }
    .e-param  { stroke: #7392bd; stroke-width: 1.8; fill: none; stroke-dasharray: 1.5 3.5; stroke-linecap: round; }
    .t-root { font-size: 15px; font-weight: 600; fill: #1f2933; dominant-baseline: middle; }
    .t-item { font-size: 14px; fill: #3e4c59; dominant-baseline: middle; }
    .t-note { font-size: 12px; fill: #7b8794; dominant-baseline: middle; }
    .t-code { font-size: 11px; fill: #6d8a6d; dominant-baseline: middle; }
    .t-more { font-size: 15px; fill: #a9b4c2; dominant-baseline: middle; }
    .t-hd   { font-size: 16px; font-weight: 600; fill: #1f2933; dominant-baseline: middle; }
    .t-verb { font-size: 12.5px; font-weight: 600; fill: #35507a; dominant-baseline: middle; }
    .t-node { font-size: 13px; font-weight: 600; fill: #4a6fa5; text-anchor: end; dominant-baseline: middle; }
    .t-leg  { font-size: 12.5px; fill: #40566f; dominant-baseline: middle; }
    .lnk { cursor: pointer; }
    .lnk:hover .chip { fill: #d3e0f0; }
    .lnk:hover .t-leg, .lnk:hover .t-verb { fill: #24405f; }
  </style>

  <defs>
    <marker id="b" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#4a6fa5"/>
    </marker>
  </defs>

  <g class="font">
    <!-- LEFT PANEL: workspace on disk -->
    <rect class="shell" x="36" y="20" width="500" height="486" rx="12"/>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#create-a-new-directory" href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#create-a-new-directory" target="_blank" rel="noopener">
      <rect class="chip" x="50" y="40" width="118" height="24" rx="6"/>
      <text class="t-root" x="58" y="52">~/xxx_ws/</text>
    </a>

    <g class="tree">
      <line x1="78" y1="68" x2="78" y2="332"/>
      <path d="M78,94 H100 V276"/>
      <path d="M100,120 H122 V224"/>
      <path d="M122,146 H144 V172 H166"/><path d="M122,198 H144"/><path d="M122,224 H144"/>
      <path d="M100,250 H122"/><path d="M100,276 H122"/>
      <path d="M78,332 H100 V488"/>
      <path d="M100,358 H122 V410"/>
      <path d="M122,384 H144"/><path d="M122,410 H144"/>
      <path d="M100,436 H122"/><path d="M100,462 H122"/><path d="M100,488 H122"/>
    </g>

    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html#packages-in-a-workspace" href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html#packages-in-a-workspace" target="_blank" rel="noopener">
      <rect class="chip" x="102" y="82" width="118" height="24" rx="6"/>
      <path class="dir" d="M109.2,90.7 H116 L119,87.2 H129.0 Q130.0,87.2 130.0,88.4 V100.8 Q130.0,102.0 128.8,102.0 H109.2 Q108,102.0 108,100.8 V91.9 Q108,90.7 109.2,90.7 Z"/>
      <text class="t-item" x="138" y="94">src/</text>
      <rect class="chip" x="124" y="108" width="150" height="24" rx="6"/>
      <path class="dir" d="M131.2,116.7 H138 L141,113.2 H151.0 Q152.0,113.2 152.0,114.4 V126.8 Q152.0,128.0 150.8,128.0 H131.2 Q130,128.0 130,126.8 V117.9 Q130,116.7 131.2,116.7 Z"/>
      <text class="t-item" x="160" y="120">{package0}/</text>
      <rect class="chip" x="124" y="238" width="150" height="24" rx="6"/>
      <path class="dir" d="M131.2,246.7 H138 L141,243.2 H151.0 Q152.0,243.2 152.0,244.4 V256.8 Q152.0,258.0 150.8,258.0 H131.2 Q130,258.0 130,256.8 V247.9 Q130,246.7 131.2,246.7 Z"/>
      <text class="t-item" x="160" y="250">{package1}/</text>
      <rect class="chip" x="124" y="264" width="34" height="24" rx="6"/>
      <text class="t-more" x="130" y="276">…</text>
    </a>

    <a class="lnk" xlink:href="https://docs.ros2.org/latest/api/rclpy/api/node.html#rclpy.node.Node" href="https://docs.ros2.org/latest/api/rclpy/api/node.html#rclpy.node.Node" target="_blank" rel="noopener">
      <rect class="chip" x="146" y="134" width="106" height="24" rx="6"/>
      <path class="src" d="M152,134.5 H166.0 L174.0,142.5 V157.5 H152 Z"/><path class="src" d="M166.0,134.5 V142.5 H174.0"/>
      <text class="mono t-item" x="182" y="146">code0.py</text>
      <rect class="chip" x="168" y="160" width="156" height="24" rx="6"/>
      <text class="mono t-code" x="176" y="172">node = Node('talker')</text>
      <rect class="chip" x="146" y="186" width="106" height="24" rx="6"/>
      <path class="src" d="M152,186.5 H166.0 L174.0,194.5 V209.5 H152 Z"/><path class="src" d="M166.0,186.5 V194.5 H174.0"/>
      <text class="mono t-item" x="182" y="198">code1.py</text>
      <rect class="chip" x="146" y="212" width="34" height="24" rx="6"/>
      <text class="t-more" x="152" y="224">…</text>
    </a>

    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#build-the-workspace-with-colcon" href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#build-the-workspace-with-colcon" target="_blank" rel="noopener">
      <rect class="chip" x="102" y="320" width="118" height="24" rx="6"/>
      <path class="dir" d="M109.2,328.7 H116 L119,325.2 H129.0 Q130.0,325.2 130.0,326.4 V338.8 Q130.0,340.0 128.8,340.0 H109.2 Q108,340.0 108,338.8 V329.9 Q108,328.7 109.2,328.7 Z"/>
      <text class="t-item" x="138" y="332">install/</text>
      <rect class="chip" x="124" y="346" width="150" height="24" rx="6"/>
      <path class="dir" d="M131.2,354.7 H138 L141,351.2 H151.0 Q152.0,351.2 152.0,352.4 V364.8 Q152.0,366.0 150.8,366.0 H131.2 Q130,366.0 130,364.8 V355.9 Q130,354.7 131.2,354.7 Z"/>
      <text class="t-item" x="160" y="358">{package0}/</text>
      <rect class="chip" x="124" y="424" width="150" height="24" rx="6"/>
      <path class="dir" d="M131.2,432.7 H138 L141,429.2 H151.0 Q152.0,429.2 152.0,430.4 V442.8 Q152.0,444.0 150.8,444.0 H131.2 Q130,444.0 130,442.8 V433.9 Q130,432.7 131.2,432.7 Z"/>
      <text class="t-item" x="160" y="436">{package1}/</text>
      <rect class="chip" x="124" y="450" width="34" height="24" rx="6"/>
      <text class="t-more" x="130" y="462">…</text>
    </a>

    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#source-the-overlay" href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html#source-the-overlay" target="_blank" rel="noopener">
      <rect class="chip" x="124" y="476" width="130" height="24" rx="6"/>
      <path class="src" d="M130,476.5 H144.0 L152.0,484.5 V499.5 H130 Z"/><path class="src" d="M144.0,476.5 V484.5 H152.0"/>
      <text class="mono t-item" x="160" y="488">setup.bash</text>
    </a>

    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html#add-an-entry-point" href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html#add-an-entry-point" target="_blank" rel="noopener">
      <rect class="chip" x="146" y="372" width="134" height="24" rx="6"/>
      <rect class="bin" x="152" y="372" width="22" height="26" rx="5"/>
      <text class="mono t-item" x="182" y="384">executable0</text>
      <rect class="chip" x="146" y="398" width="34" height="24" rx="6"/>
      <text class="t-more" x="152" y="410">…</text>
    </a>

    <path class="act" d="M314,120 H280" marker-end="url(#b)"/>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html#create-a-package" href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html#create-a-package" target="_blank" rel="noopener">
      <rect class="chip" x="328" y="108" width="136" height="24" rx="6"/>
      <text class="mono t-verb" x="396" y="120" text-anchor="middle">ros2 pkg create</text>
    </a>

    <path class="act" d="M250,198 H480 Q492,198 492,210 V372 Q492,384 480,384 H300" marker-end="url(#b)"/>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Colcon-Tutorial.html#build-the-workspace" href="https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Colcon-Tutorial.html#build-the-workspace" target="_blank" rel="noopener">
      <rect class="chip" x="376" y="266" width="104" height="24" rx="6"/>
      <text class="mono t-verb" x="428" y="278" text-anchor="middle">colcon build</text>
    </a>

    <path class="act" d="M290,384 H322 V472 Q322,484 334,484 H578" marker-end="url(#b)"/>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html#ros2-run" href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html#ros2-run" target="_blank" rel="noopener">
      <rect class="chip" x="356" y="454" width="80" height="24" rx="6"/>
      <text class="mono t-verb" x="396" y="466" text-anchor="middle">ros2 run</text>
    </a>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html" href="https://docs.ros.org/en/humble/Tutorials/Intermediate/Launch/Launch-Main.html" target="_blank" rel="noopener">
      <rect class="chip" x="444" y="454" width="88" height="24" rx="6"/>
      <text class="mono t-verb" x="488" y="466" text-anchor="middle">ros2 launch</text>
    </a>

    <!-- RIGHT PANEL: the ROS graph, running -->
    <rect class="rt" x="580" y="20" width="284" height="486" rx="12"/>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html#the-ros-2-graph" href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html#the-ros-2-graph" target="_blank" rel="noopener">
      <rect class="chip" x="594" y="38" width="128" height="28" rx="6"/>
      <text class="t-hd" x="602" y="52">ROS graph</text>
    </a>

    <line class="e-topic"   x1="670" y1="170" x2="762" y2="122"/>
    <line class="e-service" x1="670" y1="170" x2="762" y2="222"/>
    <line class="e-action"  x1="762" y1="122" x2="826" y2="172"/>
    <line class="e-param"   x1="762" y1="222" x2="826" y2="172"/>

    <circle class="dot" cx="762" cy="122" r="7"/>
    <circle class="dot" cx="762" cy="222" r="7"/>
    <circle class="dot" cx="826" cy="172" r="7"/>
    <circle cx="670" cy="170" r="19" fill="none" stroke="#4a6fa5" stroke-width="1.6" stroke-dasharray="4 3"/>
    <circle cx="670" cy="170" r="8" fill="#4a6fa5"/>

    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html#nodes-in-ros-2" href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html#nodes-in-ros-2" target="_blank" rel="noopener">
      <rect class="chip" x="592" y="156" width="62" height="28" rx="6"/>
      <text class="t-node" x="646" y="170">Node</text>
    </a>

    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html#background" href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html#background" target="_blank" rel="noopener">
      <rect class="chip" x="594" y="305" width="140" height="26" rx="6"/>
      <line class="e-topic" x1="604" y1="318" x2="642" y2="318"/>
      <text class="t-leg" x="654" y="318">Topic</text>
    </a>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html#background" href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html#background" target="_blank" rel="noopener">
      <rect class="chip" x="594" y="341" width="140" height="26" rx="6"/>
      <line class="e-service" x1="604" y1="354" x2="642" y2="354"/>
      <text class="t-leg" x="654" y="354">Service</text>
    </a>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html#background" href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html#background" target="_blank" rel="noopener">
      <rect class="chip" x="594" y="377" width="140" height="26" rx="6"/>
      <line class="e-action" x1="604" y1="390" x2="642" y2="390"/>
      <text class="t-leg" x="654" y="390">Action</text>
    </a>
    <a class="lnk" xlink:href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Parameters/Understanding-ROS2-Parameters.html#background" href="https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Parameters/Understanding-ROS2-Parameters.html#background" target="_blank" rel="noopener">
      <rect class="chip" x="594" y="413" width="140" height="26" rx="6"/>
      <line class="e-param" x1="604" y1="426" x2="642" y2="426"/>
      <text class="t-leg" x="654" y="426">Parameter</text>
    </a>
  </g>
</svg>

- Create your ros2 packages in `<your_ros2_ws>/src/`  <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html#packages-in-a-workspace)</span>

## 3. Learn to use `topic`

Implement simple `publisher` and `subscriber` with:
- python <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html)</span>
- c++ <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Cpp-Publisher-And-Subscriber.html)</span>

<br>

<br>
