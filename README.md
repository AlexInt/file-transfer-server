# 跨平台文件传输系统

基于Web的文件传输解决方案，支持多平台文件上传和剪贴板内容同步。

## 主要功能
✅ 多文件上传（支持视频/图片/文档，最多6个文件，单个文件最大100MB）  
🎥 视频文件支持（MP4/MOV/AVI等常见格式）  
📋 剪贴板内容同步（支持文本/图片）  
📁 自动维护上传历史记录  
🖥️ 响应式设计适配移动设备

## 技术栈
- 前端：HTML5 File API + Fetch API
- 后端：Node.js + Express + Multer
- 存储系统：
  - 文件存储路径：`/uploads/`
  - 剪贴板存储路径：`/pasteboard/paste.txt`

## 快速开始
```bash
# 克隆项目
git clone https://github.com/your-repo/file-transfer-server.git

# 安装依赖
npm install express multer

# 创建存储目录（MacOS/Linux）
mkdir -p uploads pasteboard

# 启动服务（默认端口3000）
node server.js
```