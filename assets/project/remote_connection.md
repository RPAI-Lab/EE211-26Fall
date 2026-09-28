---
layout: page
title: Connecting to the Robot & Team Conventions
description: Robot Connection, written by Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/assets/lab/week4/week4-page' | relative_url }})

<br>

# Connecting to the Robot & Team Conventions

> Last Update: 2026-9-28

<br>

## 0. Login info

| | |
|---|---|
| Username | `tony` |
| Password | a single space |
| IP | `192.168.8.xx`, where `xx` is your robot's number (121–130) |

## 1. Connect via ssh (recommended)

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

## 2. NoMachine (when you need a GUI)

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

## 3. Last resort: borrow a monitor

If neither ssh nor NoMachine works, come find a TA and borrow a monitor and keyboard/mouse, and plug them directly into the NUC.

## 4. ROS2 environment variables: `ROS_DOMAIN_ID` and `ROS_LOCALHOST_ONLY`

1. **Match `ROS_DOMAIN_ID`.** Each robot has its own ID (`echo $ROS_DOMAIN_ID` on the NUC); set every computer in your group to the same number.
2. **Turn `ROS_LOCALHOST_ONLY` off.** Remove it from `~/.bashrc` or set it to `0`; otherwise ROS2 on your computer won't find the robot's topics.

## 5. Code conventions

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
