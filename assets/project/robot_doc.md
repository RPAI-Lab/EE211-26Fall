---
layout: page
title: Safety Notes & Robot Usage
description: Robot Manual, written by Jielin Wu and Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/assets/lab/week4/week4-page' | relative_url }})

<br>

# Safety Notes & Robot Usage

> Last Update: 2026-9-28

<br>

## Robot Configuration
The robot used in this project is a modified TurtleBot4[^tb4], built on a Create3[^create3] base, fitted with a LiDAR[^lidar], a pan-tilt mount, an arm[^arm], an IMU[^imu], and a depth camera[^camera]. A NUC sits on top as the onboard computer, running Ubuntu and ROS2.

<img src="{{ '/assets/project/imgs/platform-diagram.jpg' | relative_url }}" alt="labeled robot platform diagram" style="zoom:50%;" />

## Safety Notice
{: style="color: #e94c4c;"}
- Each group gets one robot for the rest of the semester. Do not swap robots between groups; if something goes wrong, go to a TA first.
- The robot stays in the lab (room 433, South Tower, College of Engineering), and its use must follow SUSTech's lab safety regulations[^lab-safety].
- Take care of the robot. Any damage is assessed case by case for compensation.

## Power-On & Charging
The robot has two power rails: the chassis and the pan-tilt.

**Chassis.** The Create3 chassis has three power states[^light-ring]:

| State | What it means | How to get there |
|---|---|---|
| **On** | Chassis running | From Standby: hold the center (power) button for 1 s.<br>From Storage: place it on the dock, wait ~2–3 min for the "happy sound". |
| **Standby** | Chassis asleep; charging circuitry and payload power stay on | Hold button 1 (left of center, one dot) for 10 s |
| **Storage** (off) | Battery disconnected from the chassis and payload | Hold the center (power) button for 7 s |

**Pan-tilt & NUC.** Switch on the pan-tilt's main power, then press the NUC's own power button[^manufacturer-guide]. Wait for Ubuntu to boot before connecting.

**Charging.** The chassis charges on its dock; the NUC charges from its own adapter. The robot drains fast, so charge both after every day's use.

## Login info

| | |
|---|---|
| Username | `tony` |
| Password | a single space |
| IP | `192.168.8.xx`, where `xx` is your robot's number (121–130) |

## Connect via ssh (recommended)

ssh supports multiple clients at once, so everyone in your group can be connected at the same time.

If `ssh` is not found on your machine, install the client:

```bash
sudo apt install openssh-client
```

Then connect:

```bash
ssh tony@192.168.8.xx
# e.g. robot 121: ssh tony@192.168.8.121
```

### Shortcut: save the robot as an alias

Typing the full address every time gets old. Open (or create) your ssh config with nano:

```bash
nano ~/.ssh/config
```

Add one block per robot, then save with `Ctrl+O`, exit with `Ctrl+X`:

```
Host robot
    HostName 192.168.8.xx
    User tony
```

Now `ssh robot` does the same thing as the full command.

To skip the password too, copy your key to the robot once (run `ssh-keygen` first if you don't have a key yet):

```bash
ssh-copy-id robot
```

### Write code with VSCode Remote-SSH

Install the **Remote - SSH** extension; the aliases above show up in it directly.

<img src="{{ '/assets/project/imgs/vscode-remote-ssh.jpg' | relative_url }}" alt="Remote - SSH extension in the VSCode marketplace" style="zoom:50%;" />

## NoMachine (when you need a GUI)

ssh only gives you a terminal. When you need a graphical interface — visualization, camera preview, that sort of thing — use NoMachine: it streams the NUC's whole desktop.

- Download NoMachine for your OS: [https://download.nomachine.com/](https://download.nomachine.com/)

<img src="{{ '/assets/project/imgs/nomachine-download.jpg' | relative_url }}" alt="NoMachine download page" style="zoom:40%;" />

```bash
sudo apt install ./<pkg_name>.deb
# or
sudo dpkg -i ./<pkg_name>.deb
```

- Make sure your PC and the robot's NUC are on the same local network, then check you can ping it:

```bash
ping 192.168.8.xx
```

- If the ping succeeds, connect via NoMachine, making sure the IP and username are correct.

⚠️ NoMachine accepts only one client at a time. Coordinate within your group.

## Last resort: borrow a monitor

If neither ssh nor NoMachine works, come find a TA and borrow a monitor and keyboard/mouse, and plug them directly into the NUC.

## ROS2 environment variables: `ROS_DOMAIN_ID` and `ROS_LOCALHOST_ONLY`

1. **Match `ROS_DOMAIN_ID`.** Each robot has its own ID (`echo $ROS_DOMAIN_ID` on the NUC); set every computer in your group to the same number.
2. **Turn `ROS_LOCALHOST_ONLY` off.** Remove it from `~/.bashrc` or set it to `0`; otherwise ROS2 on your computer won't find the robot's topics.

## Code conventions

- **Use git.** Create one GitHub [organization](https://github.com/settings/organizations) per group and keep your group's repository there.
- **Don't touch `~/ros2_ws`** on the NUC — it holds the official drivers. Each student creates their own workspace:

  ```
  ~/
  ├── ros2_ws/                  # already on the robot — official drivers, do not touch
  │   └── src/
  └── EE211_26Fall/
      ├── {student0}_ws/
      │   └── src/
      ├── {student1}_ws/
      │   └── src/
      └── {student2}_ws/
          └── src/
  ```

  Replace `{studentN}` with your name.

## References

[^tb4]: [TurtleBot4 tutorials](https://turtlebot.github.io/turtlebot4-user-manual/overview/) (use the Humble version)
[^create3]: [Create3 base documentation](https://iroboteducation.github.io/create3_docs)
[^lidar]: [LiDAR](https://github.com/Slamtec/sllidar_ros2)
[^arm]: [Arm](https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros2/software_setup.html)
[^imu]: [IMU](https://github.com/ElettraSciComp/witmotion_IMU_ros/tree/ros2)
[^camera]: Depth camera: [realsense-ros](https://github.com/IntelRealSense/realsense-ros), [install guide](https://github.com/IntelRealSense/librealsense/blob/master/doc/distribution_linux.md#installing-the-packages)
[^manufacturer-guide]: [Robot manufacturer's guide](https://doc.iqr-robot.com/turtlebot4_user_manual/software/software.html)
[^light-ring]: [Create3 Buttons and Light Ring](https://iroboteducation.github.io/create3_docs/hw/face/)
[^lab-safety]: [南方科技大学实验室安全管理暂行办法 (SUSTech Lab Safety Management Regulations)](https://static.crf.sustech.edu.cn/upload/file/20200909/15996422828134.pdf)
