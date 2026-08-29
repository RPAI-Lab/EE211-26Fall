# EE211 课程网站开发说明

本说明由codex撰写，本站使用 Jekyll 和 Just the Docs 主题构建，并通过 GitHub Pages 发布。

## 环境准备

安装jekyll，可参考[here](https://download.csdn.net/blog/column/12552633/136139323)

首次运行时，脚本会通过 `bundle install` 自动安装 `Gemfile` 中声明的依赖。

```bash
gem install bundler
```

## 本地预览

在仓库根目录执行：

```bash
./preview.sh
```

浏览器访问 <http://127.0.0.1:4000/>。页面内容修改后会自动刷新；修改 `_config.yml` 后需要重启预览服务。

如需更换监听地址或端口：

```bash
HOST=0.0.0.0 PORT=4100 ./preview.sh
```

## 内容管理

- `README.md`：网站首页。
- `_config.yml`：站点名称、地址、主题和导航等全局配置。
- `schedule.md` 和 `_schedules/`：课程安排。
- `_modules/`：每周课程内容及课件链接。
- `_announcements/`：课程公告。
- `_staffers/`：课程人员信息。
- `course-materials.md`：课程资料页面。
- `HW_and_Project.md`：作业与项目页面。
- `assets/`：图片、课件、实验资料和下载文件。

新增 Markdown 页面时，应参考现有页面填写顶部的 Front Matter。链接到本站资源时，优先使用 `relative_url`，避免把学期路径写死。例如：

```liquid
[Course Materials]({{ '/course-materials/' | relative_url }})
```

## 构建与部署

发布前建议先本地预览，并确认页面、链接和下载文件正常。生产构建可单独执行：

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

生成的网站位于 `_site/`，仅用于本地检查，不需要提交。GitHub Pages 配置为从 `main` 分支的 `/ (root)` 发布后，每次推送 `main` 都会自动重新构建并部署网站：

```bash
git add .
git commit -m "Update course website"
git push origin main
```

<!-- 仓库首次使用时需要配置 `origin`： -->
<!--  -->
<!-- ```bash -->
<!-- git remote add origin https://github.com/RPAI-Lab/EE211-26Fall.git -->
<!-- ``` -->

部署完成后，网站地址为 <https://rpai-lab.github.io/EE211-26Fall/>。

## 日常维护

1. 从 `main` 分支拉取最新内容。
2. 修改课程内容或上传资源。
3. 运行 `./preview.sh` 检查页面。
4. 提交修改并推送到 `main`，等待 GitHub Pages 自动部署。

`_site/`、Jekyll 缓存和本地依赖目录均为生成内容，不应手动修改或提交。
