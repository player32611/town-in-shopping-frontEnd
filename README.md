# 城镇购物商城

一个基于 Next.js 16 构建的现代化电子商务平台前端应用。

## 技术栈

- **框架**: Next.js 16.2.1 (App Router)
- **React**: 19.2.4
- **UI 组件库**: Ant Design 6.x + @ant-design/nextjs-registry
- **样式方案**: Tailwind CSS 4.x + SCSS
- **状态管理**: Zustand 5.x
- **HTTP 客户端**: Axios
- **开发语言**: TypeScript 5.x

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── cart/              # 购物车页面
│   ├── productDetail/     # 商品详情页面
│   ├── productManage/     # 商品管理页面
│   ├── accountManage/     # 账户管理页面
│   └── search/            # 搜索页面
├── components/
│   ├── commen/            # 公共/可复用组件
│   └── ui/                # 页面级 UI 组件
├── services/              # API 服务层
│   ├── user.ts           # 用户相关 API
│   ├── product.ts        # 商品相关 API
│   ├── cart.ts           # 购物车相关 API
│   └── comment.ts        # 评论相关 API
├── store/                 # Zustand 状态管理
│   └── messageStore.ts   # 消息通知状态
├── types/                 # TypeScript 类型定义
├── lib/                   # 工具函数
│   ├── axios.ts          # Axios 实例配置
│   └── storage.ts        # SSR 安全的 localStorage 封装
└── public/                # 静态资源
```

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建 `.env.local` 文件并配置后端 API 地址：

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 生产构建

```bash
npm run build
npm run start
```

### 代码检查

```bash
npm run lint
```

## 功能模块

### 用户角色

- **管理员 (roleId=1)**: 系统管理权限
- **商家 (roleId=2)**: 商品管理权限
- **普通用户 (roleId=3)**: 浏览和购买商品

### 核心功能

| 页面     | 功能描述                         |
| -------- | -------------------------------- |
| 首页     | 商品展示与推荐                   |
| 商品详情 | 查看商品详细信息、加入购物车     |
| 购物车   | 管理购物车商品、结算             |
| 搜索     | 商品搜索与筛选                   |
| 商品管理 | 商家管理商品（上架、下架、编辑） |
| 账户管理 | 用户信息管理、余额查看           |

## 架构设计

### 客户端渲染

所有页面均采用 `"use client"` 指令，应用依赖客户端数据获取而非 Next.js 服务端组件。

### API 层设计

- API 调用集中在 `services/` 目录
- 每个服务文件对应一个业务域
- 使用查询参数传递数据（非请求体）
- 通过 Axios 拦截器自动附加 JWT Token

### 认证流程

- JWT Token 存储在 localStorage，键名为 `"token"`
- 用户信息（id、roleId、balance）存储在 localStorage
- 请求通过 Axios 拦截器自动携带 Token

### 状态管理

- **Zustand**: 全局状态管理（当前仅 `messageStore` 用于消息通知）
- **useState**: 页面级数据状态管理
- 消息通知统一通过 `messageStore` 处理，保证用户体验一致性

## 配置说明

### 图片配置

`next.config.ts` 中已配置允许所有远程主机名的图片加载（http/https）。

### ESLint 配置

使用 `eslint-config-next` 配置，支持 TypeScript 和 core-web-vitals 规则。

## 开发约定

- 所有 API 接口使用查询参数，不使用 JSON 请求体
- UI 文本使用中文
- 组件特定样式使用同级目录下的 `.scss` 文件
- 新增公共组件放置于 `components/commen/` 目录

## 许可证

私有项目
