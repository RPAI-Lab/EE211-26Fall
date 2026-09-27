---
layout: page
title: Connecting to the Robot & Team Conventions
description: Robot Connection, written by Siyuan Wang.
nav_exclude: true
---

[← Back]({{ '/course-materials/' | relative_url }})

<br>

# Connecting to the Robot & Team Conventions

> Last Update: 2026-9-26

<br>

## 0. Power On

- Press the power button on the chassis, or place the chassis on the charging dock — it boots on its own. The light ring spins white while booting, and a "happy sound" plays when it's ready.
- The NUC on the pan-tilt has its own separate power button. Press it, then wait for Ubuntu to finish booting. The chassis being ready does **not** mean the NUC is ready — they are two separate machines.

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

⚠️ NoMachine accepts only one client at a time — if several people use it together you will fight over the mouse. Coordinate within your group.

- If the ping succeeds but the remote desktop connects to a black screen, ssh into the robot and run:

```bash
sudo /etc/NX/nxserver --restart
```

## 4. Last resort: borrow a monitor

If neither ssh nor NoMachine works, come find a TA and borrow a monitor and keyboard/mouse, and plug them directly into the NUC.

## 5. Network settings: `ROS_DOMAIN_ID` and `ROS_LOCALHOST_ONLY`

For two machines to see each other over ROS2, two things must hold:

1. **Turn `ROS_LOCALHOST_ONLY` off.** Setting it to `1` keeps ROS2 traffic on the local loopback — great for solo practice, but it makes your computer completely blind to the robot. For cross-machine work, remove it or set it to `0` in `~/.bashrc`.
2. **Match `ROS_DOMAIN_ID`.** Each robot NUC is already configured with a unique domain ID — run `echo $ROS_DOMAIN_ID` on the robot to see it. Every computer in your group must be set to the same number. If they don't match, DDS discovery never happens and you receive nothing.

## 6. Code conventions

- **Manage your code with git on GitHub.** Create an **organization** for your group at [github.com/settings/organizations](https://github.com/settings/organizations) — one organization per group — and put your group's repository inside it. That's how your group syncs code with each other, and how you get back to an earlier version when something breaks.
- **Keep your own code out of the robot's existing workspace.** The workspace already on the NUC (`~/ros2_ws`) holds the official drivers; editing it in place is a quick way to break the robot for everyone. Create your own workspace instead, one per student, all under a course folder:

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

  Replace `{studentN}` with your own name, and put everything you write under that workspace's `src/`.
