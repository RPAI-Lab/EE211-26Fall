---
layout: page
title: Lab Session - SLAM & Navigation
nav_exclude: true
---

[← Back]({{ '/course-materials/' | relative_url }})

<br>

# SLAM & Navigation

> Last Update: 2026-10-21

<br>

## Your task

1. Build a map of the area around your robot and save it.
2. Load the map, then click a goal in rviz2 and let the robot drive there by itself.
3. Send the robot to a goal from a Python script. Then make it visit three points in a row.

Everything runs on the robot. Open a terminal on the NUC through NoMachine for rviz2; teammates can use ssh for the other terminals ([robot doc]({{ '/assets/project/robot_doc' | relative_url }})).

Clear the area first: people walking around end up in the map.

## Tools

| Tool | What it does |
|---|---|
| `slam_toolbox` | builds a 2D map from the LiDAR (`/scan`) while tracking where the robot is |
| `map_saver_cli` | saves the map as an image (`.pgm`) plus its scale and origin (`.yaml`) |
| AMCL (localization) | finds where the robot is on a map you saved |
| Nav2 | plans a path to a goal and drives the robot along it, avoiding obstacles |
| rviz2 | shows the map and the robot; you click initial poses and goals here |
| `nav2_simple_commander` | sends Nav2 goals from Python |

## 1. Build a map

Each command in its own terminal:

```bash
ros2 launch iqr_tb4_bringup bringup.launch.py          # robot hardware, LiDAR included
ros2 launch turtlebot4_navigation slam.launch.py       # SLAM
ros2 launch turtlebot4_viz view_robot.launch.py        # rviz2 (in the NoMachine desktop)
ros2 run teleop_twist_keyboard teleop_twist_keyboard   # drive slowly until the map is complete
```

<img src="{{ '/assets/lab/slam/gifs/slam_mapping.gif' | relative_url }}" alt="slam_mapping.gif" style="width:100%;">

<p style="text-align:center;font-size:13px;color:#7b8794;">left: rviz2 (gray unknown · white free · black walls · red dots what the LiDAR sees now) · right: the teleop terminal and the key just pressed (simulation, 1.5× speed)</p>

Save it, then stop SLAM (`Ctrl+C`):

```bash
mkdir -p ~/your_name && cd ~/your_name
ros2 run nav2_map_server map_saver_cli -f my_map       # writes my_map.pgm and my_map.yaml
```

## 2. Navigate on your map

Keep bringup running, then:

```bash
ros2 launch turtlebot4_navigation localization.launch.py map:=/home/tony/your_name/my_map.yaml
ros2 launch turtlebot4_navigation nav2.launch.py params_file:=/opt/ros/humble/share/turtlebot4_navigation/config/nav2.yaml
ros2 launch turtlebot4_viz view_robot.launch.py
```

In rviz2:
**Step 1 · 2D Pose Estimate**: click the button, then press where the robot really is and drag toward the way it faces.

<img src="{{ '/assets/lab/slam/gifs/pose_estimate.gif' | relative_url }}" alt="pose_estimate.gif" style="width:100%;">

<p style="text-align:center;font-size:13px;color:#7b8794;">after this the laser (red) lines up with the walls and the costmaps appear (simulation)</p>

**Step 2 · Nav2 Goal**: click the button, then press at the goal and drag toward the final heading. The robot plans a path and drives there.

<img src="{{ '/assets/lab/slam/gifs/nav2_goal.gif' | relative_url }}" alt="nav2_goal.gif" style="width:100%;">

<p style="text-align:center;font-size:13px;color:#7b8794;">the Navigation 2 panel on the left shows ETA and distance remaining (simulation, 4× speed after the click)</p>

## 3. Navigate from code

One goal from the command line (x = 1 m, y = 0 in the map frame):

```bash
ros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose "{pose: {header: {frame_id: map}, pose: {position: {x: 1.0, y: 0.0}, orientation: {w: 1.0}}}}" --feedback
```

The same from Python. Save as `go_to.py`, set the initial pose in rviz2 first, then run `python3 go_to.py 1.0 0.0`:

```python
import sys
import rclpy
from geometry_msgs.msg import PoseStamped
from nav2_simple_commander.robot_navigator import BasicNavigator


def main():
    x, y = float(sys.argv[1]), float(sys.argv[2])
    rclpy.init()
    nav = BasicNavigator()
    nav.waitUntilNav2Active()

    goal = PoseStamped()
    goal.header.frame_id = 'map'
    goal.header.stamp = nav.get_clock().now().to_msg()
    goal.pose.position.x = x
    goal.pose.position.y = y
    goal.pose.orientation.w = 1.0

    nav.goToPose(goal)
    while not nav.isTaskComplete():
        pass
    print('result:', nav.getResult())
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

> Try: change the script so the robot visits three points, one after another. To read a point's coordinates, click **Publish Point**, then click that point on the map: the status bar at the bottom shows `[x, y, z]`.

<img src="{{ '/assets/lab/slam/gifs/publish_point.gif' | relative_url }}" alt="publish_point.gif" style="width:100%;">

<p style="text-align:center;font-size:13px;color:#7b8794;">after each click, the status bar (orange box) shows the point's [x, y, z] in metres (simulation)</p>

## Read more

- TurtleBot 4 manual: [Generating a map](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/generate_map.html), [Navigation](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/navigation.html), [TurtleBot 4 Navigator](https://turtlebot.github.io/turtlebot4-user-manual/tutorials/turtlebot4_navigator.html)
- [slam_toolbox](https://github.com/SteveMacenski/slam_toolbox) · [Nav2 documentation](https://docs.nav2.org/index.html)

<br>

<br>
