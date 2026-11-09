---
layout: page
title: Homework & Project 
description: Course Homework and Project.
---

<!-- ## Table of contents -->
{: .no_toc .text-delta }

1. TOC
{:toc}
{:.no_toc}
---


# Homework

<br>

**Assignment 1**
<br>

**Assignment 2**
<br>

**Assignment 3**
<br>

---

# Final Project



**Project Description & Grading**

The project requires autonomous completion of navigation, pick & place and visual detection tasks on the robot.
Baseline 70 points + bonus 30 points, 100 in total. The final demo takes place in Week 15: each group gets one run, bonus items are checked in the same run with the same code, and a group that fails may retry once if time allows. Any tools, including AI agents, may be used during preparation.

<img src="https://rpai-lab.github.io/EE211-25Fall/assets/images/proj_description_pic1.png" alt="map illustration" style="zoom:25%;" />


### Pick & Place <span style="float: right;">42 points</span>
> Pick the target cube, then place it onto the target area

- Pick the cube from a fixed pose, then place.  		<span style="float: right; color: #7253ed;">32 points</span>
- Pick the cube from a random pose within an area, then place.  		<span style="float: right; color: #7253ed;">+10 points</span>
<br>

### Navigation <span style="float: right;">38 points</span>
> Navigate autonomously across the given map

- Navigate on a map with fixed obstacles 				<span style="float: right; color: #7253ed;">28 points</span>
- Navigate on a map with randomly placed obstacles  				<span style="float: right; color: #7253ed;">+10 points</span>


### Detection <span style="float: right;">15 points</span>
> Stop when the red light is on, continue when the green light is on, stop when the stop sign is detected

- Detect traffic lights and stop signs via camera    				<span style="float: right; color: #7253ed;">10 points</span>
- Detect them with YOLO  				<span style="float: right; color: #7253ed;">+5 points</span>


### System Analysis <span style="float: right;">+5 points</span>
> Submit a concise report (2 pages max) with figures before Week 14; data must be your own measurements. One item +3, both +5

- Performance optimization
  - Reduce detection latency; report before and after
  - Reduce CPU load on the NUC; report before and after
- Calibration & alignment
  - Align camera and lidar timestamps
  - Automate hand-eye calibration

<br>

---

<br>

