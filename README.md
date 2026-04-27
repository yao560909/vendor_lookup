# README
## vendor_lookup

## About

This is the official Wails React-TS template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.

## 构建 
### macOS 应用

wails build -platform darwin/universal -clean

说明：
- -platform darwin/universal：构建 macOS 通用二进制（支持 Intel 和 Apple Silicon）
- -clean：构建前清理 bin 目录
- 输出位置：build/bin/vendor_lookup.app

### 创建 DMG 文件

cd ./build/bin

# 创建临时文件夹
mkdir -p dmg_tmp

# 复制 .app 文件
cp -r vendor_lookup.app dmg_tmp/

# 创建 Applications 快捷方式（方便用户拖拽安装）
ln -s /Applications dmg_tmp/Applications

# 生成 DMG
hdiutil create -volname "vendor_lookup" -srcfolder dmg_tmp -ov -format UDZO vendor_lookup.dmg

# 清理临时文件
rm -rf dmg_tmp

参数说明：
- -volname "vendor_lookup"：DMG 挂载时的卷名
- -srcfolder dmg_tmp：源文件夹
- -ov：覆盖已存在的 DMG
- -format UDZO：压缩格式（节省空间）
- -hdiutil 是 macOS 下用于操作磁盘镜像（.dmg）的命令行工具，属于系统自带工具

  ---
最终输出

- DMG 位置：build/bin/vendor_lookup.dmg

  ---
注意事项

1. Wails v2.x 的 "installer": "dmg" 配置不生效，需手动创建 DMG
2. 确保已安装 Xcode Command Line Tools（提供 hdiutil 命令）
3. 通用二进制构建时间较长（约 5 分钟）

