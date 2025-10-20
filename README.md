# AI视频混剪助手 V2.0

基于Vue 3 + TypeScript + Ant Design Vue的AI驱动视频混剪工具。

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **UI组件库**: Ant Design Vue
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **构建工具**: Vite
- **开发语言**: TypeScript
- **样式**: SCSS

## 特性

- 🤖 对话式AI交互界面
- 🎨 双主题切换（黑白简约/深色科技风）
- 💬 智能卡片系统
- 🎬 视频混剪功能
- 🎙️ AI口播配音
- 📱 响应式设计

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
frontend/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 通用组件
│   │   ├── AI/          # AI相关组件
│   │   ├── Layout/      # 布局组件
│   │   └── Common/      # 通用组件
│   ├── views/           # 页面组件
│   ├── stores/          # Pinia状态管理
│   ├── api/             # API接口
│   ├── utils/           # 工具函数
│   ├── types/           # TypeScript类型定义
│   ├── mock/            # Mock数据
│   ├── router/          # 路由配置
│   ├── App.vue
│   └── main.ts
├── public/
└── index.html
```

## 开发规范

详见项目根目录的 `.cursor/rules/hunjian-vue.mdc` 开发规则文档。

## License

MIT

