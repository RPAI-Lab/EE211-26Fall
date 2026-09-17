---
layout: page
title: Ubuntu Dual-Boot Install
description: Do this before Week 2.
nav_exclude: true
---

[← Back]({{ '/assets/lab/week2/week2-page' | relative_url }})

<br>

# Ubuntu Dual-Boot Install

> Do this over the weekend, before Week 2. Bring problems to class or office hours — don't struggle alone.

### Step 1: Download the ISO

`https://mirrors.sustech.edu.cn/ubuntu-releases/22.04/ubuntu-22.04.5-desktop-amd64.iso` (4.4GB)

### Step 2: Burn a USB drive

1. Install [Rufus](https://rufus.ie/)
2. Select the ISO you downloaded + your USB drive
3. Click burn, wait (10-20 min — start this ahead of time, don't wait around on it)

Single-disk laptop: you need a USB drive. Two-disk laptop (two physical drives): put the ISO on the other drive instead, no USB needed.

### Step 3: Shrink a partition for Ubuntu

**Before you shrink anything, check the "About BitLocker" and "About Secure Boot" sections at the end of this page — do both checks by default.**

Minimum 64GB. 256GB is safer.

1. Right-click the Windows icon (bottom-left) → Disk Management

   <img src="{{ '/assets/lab/week2/imgs/dualboot/1.jpg' | relative_url }}" alt="Disk Management from Start menu" style="zoom:60%;" />

2. Right-click any partition (doesn't have to be C:, same physical disk is fine) → Shrink Volume

   <img src="{{ '/assets/lab/week2/imgs/dualboot/2.jpg' | relative_url }}" alt="Shrink Volume menu" style="zoom:60%;" />

3. Enter 262144 (256GB, 1GB=1024MB) → Shrink

   <img src="{{ '/assets/lab/week2/imgs/dualboot/3.jpg' | relative_url }}" alt="Shrink dialog with size in MB" style="zoom:60%;" />

4. Leave the new "Unallocated" space alone

   <img src="{{ '/assets/lab/week2/imgs/dualboot/4.jpg' | relative_url }}" alt="Unallocated space after shrink" style="zoom:60%;" />

### Step 4: Boot into the installer from that partition

1. Search "Advanced startup" → Restart now (or Settings → System → Recovery → Advanced startup → Restart now)

   <img src="{{ '/assets/lab/week2/imgs/dualboot/5.jpg' | relative_url }}" alt="Search Advanced startup" style="zoom:60%;" />

   <img src="{{ '/assets/lab/week2/imgs/dualboot/6.jpg' | relative_url }}" alt="Advanced startup in Settings" style="zoom:60%;" />

2. On the blue menu, choose "Use a device"

   <img src="{{ '/assets/lab/week2/imgs/dualboot/7.jpg' | relative_url }}" alt="Choose an option, Use a device" style="zoom:60%;" />

3. Pick your USB drive ("EFI USB Device"). Two-disk users pick the matching partition/DVD option

   <img src="{{ '/assets/lab/week2/imgs/dualboot/8.jpg' | relative_url }}" alt="Use a device submenu, EFI USB Device" style="zoom:60%;" />

4. It stops at this GRUB menu — wait for it to auto-continue or hit Enter (default is "Try or Install Ubuntu")

   <img src="{{ '/assets/lab/week2/imgs/dualboot/web-grub-try-or-install.webp' | relative_url }}" alt="GRUB menu, Try or Install Ubuntu" style="zoom:60%;" />

   (Source: [dev.to](https://dev.to/hystou/step-by-step-installation-of-ubuntu-2204-lts-2-1kgi))

### Step 5: Partition (choose "Something else" in the installer)

1. Wi-Fi: connect to `SUSTech-wifi-5G`, no password needed. Skip it if it fails — you can connect after install

   <img src="{{ '/assets/lab/week2/imgs/dualboot/10.jpg' | relative_url }}" alt="Wireless network selection" style="zoom:60%;" />

2. Updates and other software → Minimal installation

   <img src="{{ '/assets/lab/week2/imgs/dualboot/11.jpg' | relative_url }}" alt="Minimal installation selected" style="zoom:60%;" />

3. Installation type → "Something else"

   <img src="{{ '/assets/lab/week2/imgs/dualboot/12.jpg' | relative_url }}" alt="Installation type, Something else" style="zoom:60%;" />

4. Find the "free space" block you just freed up in Windows (units are MB here — the number won't match the 256GB from Windows exactly, that's normal, just 1024-based rounding)

   <img src="{{ '/assets/lab/week2/imgs/dualboot/13.jpg' | relative_url }}" alt="Partition list, free space highlighted" style="zoom:60%;" />

5. Select it, click "+" bottom-left, create three partitions, all "Primary" ("Logical" is only for when you run out of primary partition slots and need an extended partition — not our case). Just put everything under `/`, no need to split off `/home` or anything else — that's a Windows C:/D: habit, doesn't carry over here, and slicing it up too much just wastes space:

   | Partition | Size | Mount point |
   |---|---|---|
   | EFI | 100MB | `/boot/efi` |
   | swap | 2GB | swap |
   | root | rest of the space | `/` |

   Screenshots below are from a different machine — numbers won't match the table, just follow the steps:

   Use as "EFI System Partition":

   <img src="{{ '/assets/lab/week2/imgs/dualboot/14.jpg' | relative_url }}" alt="Create EFI partition" style="zoom:60%;" />

   Use as "swap area":

   <img src="{{ '/assets/lab/week2/imgs/dualboot/15.jpg' | relative_url }}" alt="Create swap partition" style="zoom:60%;" />

   Use as "Ext4 journaling file system", Mount point `/`:

   <img src="{{ '/assets/lab/week2/imgs/dualboot/16.jpg' | relative_url }}" alt="Create root partition" style="zoom:60%;" />

6. "Device for boot loader installation" at the bottom → pick the EFI partition you just created (screenshot below picked `/dev/nvme0n1p6` — yours will differ, just don't pick the whole disk)

   <img src="{{ '/assets/lab/week2/imgs/dualboot/17.jpg' | relative_url }}" alt="Final partition list with boot loader device" style="zoom:60%;" />

7. Install Now → check the partitions in the confirmation dialog → Continue

   <img src="{{ '/assets/lab/week2/imgs/dualboot/18.jpg' | relative_url }}" alt="Write changes to disk confirmation" style="zoom:60%;" />

### Step 6: Create your account, reboot

1. Fill in name / computer name / username / password — anything works, just remember it. Keep it short — you'll type it constantly (`sudo` needs it every time). Our lab robots' password is a single space.

   <img src="{{ '/assets/lab/week2/imgs/dualboot/19.jpg' | relative_url }}" alt="Who are you, account setup" style="zoom:60%;" />

2. Install takes about 5 min. Click Restart Now when done

   <img src="{{ '/assets/lab/week2/imgs/dualboot/20.jpg' | relative_url }}" alt="Installation Complete, Restart Now" style="zoom:60%;" />

3. When it stops on this screen, pull the USB drive, hit Enter

   <img src="{{ '/assets/lab/week2/imgs/dualboot/web-remove-install-medium.png' | relative_url }}" alt="Please remove the installation medium" style="zoom:60%;" />

   (Source: [ubuntu.com](https://ubuntu.com/tutorials/install-ubuntu-desktop))

You're in the Ubuntu desktop. See you at Week 2.

### (Optional) Want Windows as the default at boot?

Dual boot defaults to Ubuntu. To switch:

1. Open a terminal, run `sudo nano /etc/default/grub`
2. Change `GRUB_DEFAULT` to `"Windows Boot Manager (on /dev/nvme0n1p1)"` (device name depends on your machine)
3. `Ctrl+O` to save (not Ctrl+S), `Ctrl+X` to exit

   <img src="{{ '/assets/lab/week2/imgs/dualboot/21.jpg' | relative_url }}" alt="nano editing /etc/default/grub" style="zoom:60%;" />

4. Run `sudo update-grub`, check the output for `Found Windows Boot Manager`

   <img src="{{ '/assets/lab/week2/imgs/dualboot/22.jpg' | relative_url }}" alt="update-grub output" style="zoom:60%;" />

Reboot — the GRUB menu will default to Windows Boot Manager.

### About BitLocker (if your disk is encrypted)

A lot of laptops (especially ones that shipped with Windows 11) quietly turn on "Device Encryption" (consumer BitLocker) by default — you may not even know it's on. If you don't deal with this, the dual-boot install can leave Windows stuck on a recovery screen at next boot, asking for a 48-digit recovery key you probably don't have handy.

Check before you install: Settings → Privacy & security → Device encryption. If it's on:

1. **Save your recovery key first**: open `https://aka.ms/myrecoverykey` in a browser (sign in with the Microsoft account tied to this PC), and save/screenshot the key somewhere you can reach it (your phone).
2. **Suspend BitLocker protection** — no need to fully decrypt (faster, good enough): open PowerShell as Administrator and run:
   ```
   manage-bde -protectors -disable C:
   ```
   Or the GUI way: Control Panel → BitLocker Drive Encryption → Suspend protection.
3. Once dual boot is installed and Windows boots fine, you can turn protection back on from the same place.

Skip this and the worst case is Windows won't boot at all until you recover it with that key — so step 1 is always saving the key before anything else, not after something goes wrong.

### About Secure Boot (check this before you install, don't wait for the error)

Turn Secure Boot off before you install, not after hitting an error. It can reject Ubuntu's bootloader — you'll see "Verification failed: (0x1A) Security Violation" and can't boot in. Cause: older shim vs. newer firmware, or a 2023 Windows update that revoked older shim versions. Not worth guessing which applies — just turn it off now.

1. Boot into BIOS/UEFI: same path as Step 4, into "Advanced startup", but this time pick "Troubleshoot" → UEFI Firmware Settings (not "Use a device")
2. Find Secure Boot under the Boot or Security tab and set it to Disabled:

   <img src="{{ '/assets/lab/week2/imgs/dualboot/web-secure-boot-bios.jpg' | relative_url }}" alt="Disabling Secure Boot in BIOS" style="zoom:60%;" />

   (Source: [It's FOSS](https://itsfoss.com/disable-secure-boot-windows/) — this is a different motherboard's screen as an example; where Secure Boot lives and what it looks like varies by manufacturer, but the steps are the same)

3. Save and exit (usually F10, or Save & Exit from the menu), then go back to Step 3 and continue

No downside for this course or Windows — it's just one less bootloader check. Already hit the error? Same steps, then reboot — no reinstall needed.

### References

- Stuck? Video: [8-min real-machine dual boot install (Bilibili)](https://www.bilibili.com/video/BV1hL411r7p2/)
- Want to remove the dual boot later: [Uninstalling Windows10/Ubuntu dual boot (Bilibili)](https://www.bilibili.com/video/BV1554y1n7zv/)
- Text version of Steps 3-4: [Installing Ubuntu dual boot without a USB drive](https://www.owenyoung.com/blog/windows-10-ubuntu-22-dual-system-without-usb-flash-drive)
