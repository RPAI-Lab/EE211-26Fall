---
layout: page
title: Manual for the robot we use 
description: Robot Manual, written by Jielin Wu.
nav_exclude: true
---

[← Back]({{ '/assets/lab/week4/week4-page' | relative_url }})

<br>

# Robot Usage Guidelines

> Last Update: 2026-9-28

<br>

## Robot Configuration
The robot used in this project is a modified TurtleBot4[^tb4], built on a Create3[^create3] base, fitted with a LiDAR[^lidar], a pan-tilt mount, an arm[^arm], an IMU[^imu], and a depth camera[^camera]. A NUC sits on top as the onboard computer, running Ubuntu and ROS2.

<img src="{{ '/assets/project/imgs/platform-diagram.jpg' | relative_url }}" alt="labeled robot platform diagram" style="zoom:50%;" />

## Management & Maintenance
- Each group gets one robot for the rest of the semester. Do not swap robots between groups; if something goes wrong, go to a TA first.
- The robot stays in the lab (room 433, South Tower, College of Engineering).
- Someone must be around while the robot is charging. Never leave it charging overnight unattended.
- Damage is assessed case by case for compensation.

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

## Safety Notice
{: style="color: #e94c4c;"}

> Before you start debugging, make sure the surrounding area is clear and that you're already familiar with basic Ubuntu and ROS2 commands. Otherwise, you risk having to repeatedly repair the robot's hardware and software.

If a problem doesn't resolve itself, bring your logs and ask a TA for help.

## References

[^tb4]: [TurtleBot4 tutorials](https://turtlebot.github.io/turtlebot4-user-manual/overview/) (use the Humble version)
[^create3]: [Create3 base documentation](https://iroboteducation.github.io/create3_docs)
[^lidar]: [LiDAR](https://github.com/Slamtec/sllidar_ros2)
[^arm]: [Arm](https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros2/software_setup.html)
[^imu]: [IMU](https://github.com/ElettraSciComp/witmotion_IMU_ros/tree/ros2)
[^camera]: Depth camera: [realsense-ros](https://github.com/IntelRealSense/realsense-ros), [install guide](https://github.com/IntelRealSense/librealsense/blob/master/doc/distribution_linux.md#installing-the-packages)
[^manufacturer-guide]: [Robot manufacturer's guide](https://doc.iqr-robot.com/turtlebot4_user_manual/software/software.html)
[^light-ring]: [Create3 Buttons and Light Ring](https://iroboteducation.github.io/create3_docs/hw/face/)
