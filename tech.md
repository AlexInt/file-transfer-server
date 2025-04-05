## 技术架构
### 系统组件
```bash
├── server.js        # <mcsymbol name="Express服务" filename="server.js" path="/Users/firefish/Desktop/file-transfer-server/server.js" startline="1" type="function"></mcsymbol>
├── public/
│   └── index.html  # <mcsymbol name="前端界面" filename="index.html" path="/Users/firefish/Desktop/file-transfer-server/public/index.html" startline="1" type="class"></mcsymbol>
├── uploads/         # 文件存储目录
└── pasteboard/      # 剪贴板存储目录
```

### 关键接口
1. 文件上传接口：
```http
POST /upload
Content-Type: multipart/form-data
Params: files[] (文件数组)
```

2. 剪贴板接口：
```http
POST /post-paste 
Content-Type: application/json
Body: { content: string }
```

---

## 部署规范
### 环境要求
- Node.js v16+
- 磁盘空间：建议预留2倍最大单文件容量

### 安装步骤
```bash
# 安装依赖
npm install express multer

# 创建存储目录（MacOS）
mkdir -p /Users/firefish/Desktop/file-transfer-server/{uploads,pasteboard}

# 启动服务（默认端口3000）
node /Users/firefish/Desktop/file-transfer-server/server.js
```

### 访问方式
```bash
本机访问：http://localhost:3000
局域网访问：http://[服务器IP]:3000
```

---

## 测试用例
| 测试场景 | 预期结果 | 验证方法 |
|---------|---------|---------|
| 上传5个图片文件 | 全部成功上传，生成下载链接 | 查看响应结果和uploads目录 |
| 粘贴截图+文本 | 内容保存至paste.txt，保留格式 | 检查文件存储内容 |
| 上传7个文件 | 前端拦截并提示错误 | 界面显示错误提示 |
| 1.1GB文件上传 | 服务端拒绝并返回错误 | 查看服务器日志 |

---