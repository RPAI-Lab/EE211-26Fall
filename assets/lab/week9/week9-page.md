---
layout: page
title: Lab Session - week-09 
description: written by Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/course-materials/' | relative_url }})

<br>

# Play with Our Robot Hardware

> Last Update: 2025-11-03

<br>

<!-- Table of contents -->
<!-- {: .no_toc .text-delta } -->
<!--  -->
<!-- 1. TOC -->
<!-- {:toc} -->
<!-- {:.no_toc} -->




## Prerequisites


- Read this Doc <span style="float: right;">📑  [Robot Hardware Guide](https://rpai-lab.github.io/EE211-25Fall/assets/project/robot_doc)</span>

- Make sure your ROS_DOMAIN_ID is unique, or LOCALHOST_ONLY




## Template workspace `src` folder

- Download the template code <span style="float: right;">📜  [Template Packages](https://raw.githubusercontent.com/RPAI-Lab/EE211-25Fall/refs/heads/main/assets/project/Robot_Workspace_SRC/src.tar.xz)</span>

The structure of `src` should be like:
```
src
├── interbotix_ros_core
├── interbotix_ros_manipulators
├── interbotix_ros_toolboxes
├── iqr_tb4_ros
├── pan_tilt_ros
├── realsense-ros
└── witmotion_ros_driver
```

Please check it carefully


## Basic Operations You May Refer to


<br>

***Hardware Startup***

- `ros2 launch iqr_tb4_bringup bringup.launch.py`: Launch the hardware setup


***Keyboard Teleopration***

- `ros2 run teleop_twist_keyboard teleop_twist_keyboard`: Send velocity command to topic `/cmd_vel`


***Rviz2 Visualization***

- `ros2 launch iqr_tb4_description display.launch.py`: Visualize the "digital twin" of the robot 


***SLAM***

- `ros2 launch turtlebot4_navigation slam.launch.py`: Launch slam_toolbox's slam functionality 


- `ros2 launch turtlebot4_viz view_robot.launch.py`: Launch rviz2 for visualization during slam


- `ros2 run nav2_map_server map_saver_cli -f <name_of_your_saved_map>`: Save the map you constructed


***Navigation***

- `ros2 launch turtlebot4_navigation localization.launch.py map:=<name_of_your_saved_map.yaml>`: Start localization 


- `ros2 launch turtlebot4_navigation nav2.launch.py`: Launch nav2


- `ros2 launch turtlebot4_viz view_robot.launch.py`: Launch rviz2 for visualization during navigation


***4-dof Arm***

- You should place the arm in a configuration as below during rest: 

<img src="https://rpai-lab.github.io/EE211-25Fall/assets/lab/week9/imgs/pic0.jpg" alt="name" style="zoom:8%;" />

- Here is a demo script that shows how to control the arm: <span style="float: right;">📜  [arm_control_demo.py](https://rpai-lab.github.io/EE211-25Fall/assets/project/Robot_Workspace_SRC/scripts/arm_controller_demo.py)</span>

<br>

***Pan-Tilt***

- `ros2 launch pan_tilt_bringup panTilt_bringup.launch.py`, then the pan-tilt topics are ready for you, you can publish to these topics to control the pan-tilt.

e.g.
```bash
ros2 topic pub /pan_tilt_cmd_deg pan_tilt_msgs/msg/PanTiltCmdDeg "{yaw: 30.0, pitch: 30.0, speed: 5}"
```

***Camera***

- `ros2 run realsense2_camera realsense2_camera_node` or `ros2 launch realsense2_camera rs_camera.launch.py` to start the camera node. Then visualize the camera image by using rviz2 or rqt_image_view.



<br>

<br>
