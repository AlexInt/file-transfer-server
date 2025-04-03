const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;

// 修改存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 保持存储目录不变
  },
  filename: (req, file, cb) => {
    // 保留原始文件名（包含扩展名）
    cb(null, file.originalname);
  }
});

// 更新upload配置
const upload = multer({
  storage: storage, // 使用diskStorage代替dest
  limits: {
    files: 6,
    fileSize: 1024 * 1024 * 1024 // 添加1GB文件大小限制
  }
});

// 提供静态文件服务
app.use(express.static("public"));

// 在express初始化后添加
app.use("/uploads", express.static("uploads"));

// 文件上传路由
app.post("/upload", upload.array("files[]"), (req, res) => {
  // 匹配前端字段名
  const files = req.files; // 现在会收到文件数组
  // 处理多个文件...
  res.json({
    success: true,
    files: files.map(f => ({ filename: f.filename }))
  });
});

// 创建上传目录
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const path = require('path');

// 确保粘贴板目录存在
const pasteDir = path.join(__dirname, 'pasteboard');
if (!fs.existsSync(pasteDir)) {
  fs.mkdirSync(pasteDir, { recursive: true });
}

// 新增粘贴板路由
app.post('/post-paste', express.json(), (req, res) => {
  try {
    const content = req.body.content;
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}]\n${content}\n\n`;
    
    // 追加写入文件
    fs.appendFileSync(
      path.join(pasteDir, 'paste.txt'), 
      logEntry,
      'utf8'
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('保存失败:', error);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.warn(`server只能在同一个局域网内访问`);
  console.log(`Local network access: http://${getLocalIP()}:${port}`);
});

// 获取本机局域网IP
function getLocalIP() {
  const interfaces = require("os").networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}
