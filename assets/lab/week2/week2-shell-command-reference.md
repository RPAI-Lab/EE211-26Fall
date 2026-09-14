---
layout: page
title: Shell Command Cheat Sheet
description: Commands covered in the Week2 lab.
nav_exclude: true
---

[← Back]({{ '/assets/lab/week2/week2-page' | relative_url }})

<br>

# Ubuntu Shell Command Cheat Sheet

## Files and directories

```bash
touch test.py      # create an empty file; if it already exists, just update its modified time
ls                  # list the current directory's contents
rm test.py          # delete a file
ls -l               # add detail (permissions, size, modified time); aliased to ll on many systems
ls -a               # also show hidden files (dotfiles like .bashrc)
ls -la              # both of the above together
ll
ls .bashrc
```

```bash
mkdir ee211                 # create a folder
cd ee211                     # enter the folder (change directory)
cd ..                        # go back up one level (.. = parent directory)
mkdir -p ee211/week2         # create nested directories in one shot, no need to mkdir the parent first
rm -r ee211                  # delete a non-empty folder (-r = recursive)
```

```bash
cp test.py test.py.bak      # copy a file under a new name, i.e. make a backup (.bak is just a naming convention)
cp -r week2 week2_1         # copy an entire folder (needs -r too)
mv week2_1 week2_2          # rename a folder
mv test.py test2.py          # rename a file
```

```bash
ls /                            # the root — the top of the filesystem
ls ~                            # your home directory (equal to /home/<your-username>)
ls ..                           # the parent directory, one level up
ls .                            # the current directory
```

```bash
pwd    # print the full path of where you currently are (print working directory)
cd                             # no argument: jump straight back to your home directory, ~
cd ~/ee211                     # same folder via ~
cd ./ee211                     # or `cd ee211`, relative path (relative to where you are now)
cd /home/<your-username>/ee211 # absolute path (written out in full from /)
```

## Terminal operations + shortcuts

```bash
# common utility commands
<command> --help    # forgot how a command works? e.g. ls --help
clear                 # clear the screen (same as Ctrl+L — only clears the view, scrollback is still there)
history                # show your full command history
```

| Shortcut | What it does |
|---|---|
| `Ctrl+Alt+T` | Open a terminal |
| `Super+↑` (or double-click the title bar) | Maximize the terminal while keeping the title bar (Super = the Windows key) |
| `Ctrl+Shift+=` / `Ctrl+-` | Increase / decrease font size |
| `Ctrl+Shift+T` | New tab |
| `Alt+<number>` | Jump to that numbered tab, e.g. `Alt+1` |
| Tab | Autocomplete a command or filename — type part of it and hit Tab; hit it twice if you're unsure to list all candidates |
| `Ctrl+Shift+↑` / `Ctrl+Shift+↓` | Scroll the terminal output |
| `Ctrl+A` / `Ctrl+E` | Jump cursor to start / end of line |
| `Ctrl+←` / `Ctrl+→` | Jump cursor forward/back by one word |
| `Ctrl+K` | Delete everything from the cursor to the end of the line |
| ↑ / ↓ | Cycle through command history — hit Enter on one to rerun it |
| `Ctrl+D` | Close the current terminal window |
| `Ctrl+Shift+C` / `Ctrl+Shift+V` | Copy / paste (plain `Ctrl+C`/`Ctrl+V` don't work in a terminal — `Ctrl+C` is taken by "interrupt the current command"); `Ctrl+Y` also pastes |

## Text editors

```bash
nano file.txt   # open/create a file. Ctrl+O to save (not Ctrl+S!), Ctrl+X to exit
vim file.txt     # open/create a file
```

nano shows its own shortcuts at the bottom of the screen:

<img src="{{ '/assets/lab/week2/imgs/shell-reference/nano-hints.png' | relative_url }}" alt="nano's built-in shortcut bar" style="zoom:50%;" />

Common vim operations:

| Key | What it does |
|---|---|
| `dd` | Delete the whole line |
| `u` | Undo |
| `Ctrl+R` | Redo |
| `yy` | Copy (yank) the whole line |
| `p` | Paste |

vim doesn't show shortcuts on-screen the way nano does. For anything beyond the five above, see the [Vim Cheat Sheet](https://vim.rtorr.com/) (MIT-licensed, community-maintained).

## APT + switching mirrors

```bash
sudo apt install <package-name>   # install a package (sudo = run as admin)
sudo apt remove <package-name>    # uninstall, keeps the config files
sudo apt purge <package-name>     # uninstall and wipe the config/cache too (generally the one to use)
sudo apt autoremove                 # clean up packages the system thinks nothing depends on (use with care — this can sweep up ROS dependencies too)
sudo apt update                      # refresh the package index against whatever source is currently configured
```

Switching to the Tsinghua mirror (see the [Tsinghua open-source mirror help page](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/) for the exact steps — make sure you pick the right Ubuntu version):

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak   # back up before touching anything
sudo vim /etc/apt/sources.list                            # open the config file, paste in the Tsinghua mirror config to replace the contents, :wq to save and quit
sudo apt update                                            # pick up the new source
```

**Checkpoint**: after switching mirrors, install a small tool — if a graphical window pops up, that confirms both the mirror switch and your display setup are working.

```bash
sudo apt install x11-apps
xclock   # or xeyes
```
