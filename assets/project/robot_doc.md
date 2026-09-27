---
layout: page
title: Manual for the robot we use 
description: Robot Manual, written by Jielin Wu.
nav_exclude: true
---

[← Back]({{ '/course-materials/' | relative_url }})

<br>

# Robot Usage Guidelines

> Last Update: 2026-9-26

<br>

## Robot Configuration
The robot used in this project is a modified TurtleBot4[^tb4], built on a Create3[^create3] base, fitted with a LiDAR[^lidar], a pan-tilt mount, an arm[^arm], an IMU[^imu], and a depth camera[^camera]. A NUC sits on top as the onboard computer, running Ubuntu and ROS2.

<img src="{{ '/assets/project/imgs/platform-diagram.jpg' | relative_url }}" alt="labeled robot platform diagram" style="zoom:50%;" />

## Management & Maintenance
- Each group is assigned one modified robot for the duration of the project and is responsible for keeping and maintaining it.
- Do not swap robots between groups except in special circumstances.
- Do not take the robot out of the lab (room 433, South Tower, College of Engineering) without permission.
- Any damage will be assessed for compensation on a case-by-case basis (normal wear from regular use excluded).

## Power-On & Charging
- Power-on order: press the power button on the chassis first, or just place it on the charging dock — the light ring spins white while the chassis boots, and a "happy sound" plays once it's ready.[^light-ring] The NUC has its own separate power button[^manufacturer-guide]; press that next and give the NUC its own time to finish booting Ubuntu before you try to connect — the chassis light ring only tells you the chassis is ready, not the NUC.
- The robot comes with a charging dock for the chassis and a separate charger (standard adapter) for the NUC battery.
- Charge the NUC and the chassis separately.
- Charging takes a while, so plug the robot in promptly after each day's use.
- Charging stations are set up where the robots are stored, with enough outlets for all of them.

<img src="{{ '/assets/project/imgs/nuc-power-button.jpg' | relative_url }}" alt="NUC power button" style="zoom:50%;" />
<img src="{{ '/assets/project/imgs/chassis-power-button.jpg' | relative_url }}" alt="chassis power button" style="zoom:50%;" />
<img src="{{ '/assets/project/imgs/light-ring.gif' | relative_url }}" alt="chassis light ring spinning white during boot" style="zoom:50%;" />
<img src="{{ '/assets/project/imgs/robot-on-dock.jpg' | relative_url }}" alt="robot placed on charging dock" style="zoom:50%;" />
<img src="{{ '/assets/project/imgs/chargers.jpg' | relative_url }}" alt="chassis dock and NUC charger side by side" style="zoom:50%;" />

## Use & Debugging
- To debug: ssh into the NUC first (lets everyone in your group connect at once); NoMachine if you need a GUI; borrowing a monitor from your TA is the last resort.[^remote-connection]
- Be careful about safety while debugging.

<span style="color: red; font-size: 18px">
    <strong>
<i>
 **Safety Notice**
</i>
    </strong>
</span> 

> Before you start debugging, make sure the surrounding area is clear and that you're already familiar with basic Ubuntu and ROS2 commands. Otherwise, you risk having to repeatedly repair the robot's hardware and software.

If a problem doesn't resolve itself, bring your logs and ask a TA for help.

[^tb4]: [TurtleBot4 tutorials](https://turtlebot.github.io/turtlebot4-user-manual/overview/) (use the Humble version)
[^create3]: [Create3 base documentation](https://iroboteducation.github.io/create3_docs)
[^lidar]: [LiDAR](https://github.com/Slamtec/sllidar_ros2)
[^arm]: [Arm](https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros2/software_setup.html)
[^imu]: [IMU](https://github.com/ElettraSciComp/witmotion_IMU_ros/tree/ros2)
[^camera]: Depth camera: [realsense-ros](https://github.com/IntelRealSense/realsense-ros), [install guide](https://github.com/IntelRealSense/librealsense/blob/master/doc/distribution_linux.md#installing-the-packages)
[^manufacturer-guide]: [Robot manufacturer's guide](https://doc.iqr-robot.com/turtlebot4_user_manual/software/software.html) (certificate currently expired)
[^remote-connection]: [Three Ways of Remote Connection to the robot]({{ '/assets/project/remote_connection' | relative_url }})
[^light-ring]: [Create3 Buttons and Light Ring](https://iroboteducation.github.io/create3_docs/hw/face/)
