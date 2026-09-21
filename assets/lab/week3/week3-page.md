---
layout: page
title: Lab Session - week-03
description: written by Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/course-materials/' | relative_url }})

<br>

# ROS2 Basic Setup

> Last Update: 2026-9-22

<br>

## 1. Environment Setup

- Install **ros2 humble** (bound to Ubuntu 22.04). <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debs.html)</span>
  - [tsinghua ros2 mirror](https://mirror.tuna.tsinghua.edu.cn/help/ros2/) · [ustc ros2 mirror](https://mirrors.ustc.edu.cn/help/ros2.html)
- Make sure you have separate `ROS_DOMAIN_ID` or set `ROS_LOCALHOST_ONLY` <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Configuring-ROS2-Environment.html)</span>


## 2. ROS2: First Try

- Play `turtlesim` <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html#)</span>


## 3. Configure compilation tools

- Install `colcon`, the compilation tool of ros2 <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Colcon-Tutorial.html)</span>
- Configure `colcon_cd` <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Colcon-Tutorial.html#setup-colcon-cd)</span>
- Configure your ros2 cli auto-completion <span style="color: #e94c4c;"> (highly recommended) </span> <span style="float: right;">📑 [See](https://colcon.readthedocs.io/en/released/user/installation.html#enable-completion)</span>

  ```bash
  echo "source /usr/share/colcon_argcomplete/hook/colcon-argcomplete.bash" >> ~/.bashrc
  ```


## 4. Introduce node, topic and service (optional)

- Understanding `nodes` <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html)</span>
- Understanding `topics` <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html)</span>
- Understanding `services` <span style="float: right;">📑 [See](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html)</span>

<br>

<br>
