# CP Calendar 竞赛日历

自动聚合洛谷、牛客、Codeforces、LeetCode、AtCoder 五大平台竞赛信息的日历网站。

## 在线预览

https://ib5ijvac44pyu.ok.kimi.link

## 功能特性

- **五大平台竞赛信息自动聚合** - Codeforces API、LeetCode GraphQL、AtCoder/洛谷/牛客网页爬取
- **日历视图** - 月视图/列表视图切换，竞赛日期标注
- **倒计时** - 下一场竞赛实时倒计时
- **平台筛选器** - 按需显示/隐藏各平台竞赛
- **时区和时间格式设置**
- **响应式设计** - 支持桌面/平板/移动端

## 技术栈

- 前端: React 19 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion
- 后端: tRPC + Drizzle ORM + Hono + MySQL
- 爬虫: Cheerio + Fetch API

## 项目结构

```
├── api/              # 后端 API
│   ├── routers/      # tRPC 路由 (contest.list, contest.refresh)
│   └── scrapers/     # 各平台爬虫
├── db/               # 数据库 schema
├── contracts/        # 共享类型
├── src/
│   ├── components/   # React 组件 (Navbar, Footer, ContestCard, CountdownTimer...)
│   ├── context/      # AppContext (全局状态管理)
│   ├── pages/        # 页面 (Home, Calendar, Settings)
│   └── providers/    # tRPC Provider
```

## 本地开发

```bash
npm install
cp .env.example .env  # 配置 DATABASE_URL
npm run db:push       # 推送数据库 schema
npm run dev           # 启动开发服务器
```

## API 端点

| tRPC Endpoint | 描述 |
|-------------|------|
| `contest.list` | 获取所有 upcoming 竞赛 |
| `contest.refresh` | 从所有平台爬取并更新竞赛数据 |

## 数据来源

| 平台 | 方式 | 地址 |
|------|------|------|
| Codeforces | 官方 API | https://codeforces.com/api/contest.list |
| LeetCode | GraphQL | https://leetcode.com/graphql |
| AtCoder | 网页爬取 | https://atcoder.jp/contests/ |
| 洛谷 | 网页爬取 | https://www.luogu.com.cn/contest/list |
| 牛客 | 网页爬取 | https://ac.nowcoder.com/acm/contest/vip-index |

---

Made with love for competitive programmers
