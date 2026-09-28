---
layout: page
title: Connecting to the Robot & Team Conventions
description: Robot Connection, written by Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/assets/lab/week4/week4-page' | relative_url }})

<br>

# Connecting to the Robot & Team Conventions

> Last Update: 2026-9-26

<br>

## 1. Connect via ssh (recommended)

ssh supports multiple clients at once, so everyone in your group can be connected at the same time.

If `ssh` is not found on your machine, install the client:

```bash
sudo apt install openssh-client
```

Then connect:

```bash
ssh <usr_name>@<ip>
# e.g. ssh tony@<robot's WiFi IP>
```

### Shortcut: save the robot as an alias

Typing the full address every time gets old. Open (or create) your ssh config with nano:

```bash
nano ~/.ssh/config
```

Add one block per robot, then save with `Ctrl+O`, exit with `Ctrl+X`:

```
Host robot
    HostName <robot's WiFi IP>
    User <usr_name>
```

Now `ssh robot` does the same thing as the full command.

## 2. Write code with VSCode Remote-SSH (recommended)

Install the **Remote SSH** extension in VSCode. It reads `~/.ssh/config`, so the aliases above show up directly — pick one and you get a full editing experience on the robot, just like working locally. This is what we recommend for writing code this semester.

## 3. NoMachine (when you need a GUI)

ssh only gives you a terminal. When you need a graphical interface — visualization, camera preview, that sort of thing — use NoMachine: it streams the NUC's whole desktop.

- Download NoMachine for your OS: [https://download.nomachine.com/](https://download.nomachine.com/)

```bash
sudo apt install ./<pkg_name>.deb
# or
sudo dpkg -i ./<pkg_name>.deb
```

- Make sure your PC and the robot's NUC are on the same local network, then check you can ping it:

```bash
ping <remote_ip>
```

- If the ping succeeds, connect via NoMachine, making sure the IP and username are correct.

⚠️ NoMachine accepts only one client at a time. Coordinate within your group.

## 4. Last resort: borrow a monitor

If neither ssh nor NoMachine works, come find a TA and borrow a monitor and keyboard/mouse, and plug them directly into the NUC.

## 5. Network settings: `ROS_DOMAIN_ID` and `ROS_LOCALHOST_ONLY`

1. **Match `ROS_DOMAIN_ID`.** Each robot has its own ID (`echo $ROS_DOMAIN_ID` on the NUC); set every computer in your group to the same number.
2. **Turn `ROS_LOCALHOST_ONLY` off.** Remove it from `~/.bashrc` or set it to `0`; otherwise ROS2 on your computer won't find the robot's topics.

## 6. Code conventions

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
