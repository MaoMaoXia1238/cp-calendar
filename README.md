# CP Calendar 竞赛日历

自动聚合洛谷、牛客、Codeforces、LeetCode、AtCoder 五大平台竞赛信息的日历网站。

## 在线预览

https://ib5ijvac44pyu.ok.kimi.link

## 功能特性

- 五大平台竞赛信息自动聚合
- 日历视图（月视图/列表视图）
- 下一场竞赛倒计时
- 平台筛选器
- 时区和时间格式设置
- Three.js 粒子虫洞动画背景
- 响应式设计

## 技术栈

- 前端: React 19 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + Three.js
- 后端: tRPC + Drizzle ORM + Hono + MySQL
- 爬虫: Codeforces API, AtCoder/LeetCode/洛谷/牛客 页面抓取

## 支持的竞赛平台

| 平台 | 数据来源 |
|------|----------|
| Codeforces | 官方 API |
| LeetCode | GraphQL API |
| AtCoder | 网页爬取 |
| 洛谷 | 网页爬取 |
| 牛客 | 网页爬取 |

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/MaoMaoXia1238/cp-calendar.git
cd cp-calendar

# 安装依赖
npm install

# 配置数据库
# 复制 .env.example 为 .env，配置 DATABASE_URL

# 推送数据库 schema
npm run db:push

# 启动开发服务器
npm run dev
```

## 项目结构

```
├── api/              # 后端 API (tRPC routers + scrapers)
│   ├── routers/      # tRPC 路由
│   └── scrapers/     # 各平台爬虫
├── db/               # 数据库 schema
├── contracts/        # 共享类型
├── src/
│   ├── components/   # React 组件
│   ├── context/      # React Context
│   ├── pages/        # 页面 (Home, Calendar, Settings)
│   └── providers/    # tRPC Provider
```
