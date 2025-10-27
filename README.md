# 📝 Blogio – Modern Blogging Platform

**Blogio** is a modern full-stack blogging platform built with **Next.js 15**, **tRPC**, **Drizzle ORM**, and **PostgreSQL**. It allows users to create, edit, and manage blog posts with category assignment, providing a clean and responsive experience.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | Next.js 15 (App Router) |
| API Layer | tRPC |
| ORM | Drizzle ORM |
| Database | PostgreSQL (Neon) |
| Validation | Zod |
| Data Fetching | React Query (via tRPC) |
| Styling | Tailwind CSS + shadcn/ui |
| Language | TypeScript |
| Editor | Rich Text Editor |

---

## 🔧 Setup

Follow these simple steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/isonikrish/blogio.git
cd blogio
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
#### Create a .env file in the root directory and add:
```bash

DATABASE_URL="your_neon_database_url"
```

### 4. Run Database Migrations
```bash
npm drizzle-kit push
```
### 5. Start the Development Server
```bash
npm run dev
```
---

## 🔧 Features Implemented

### 🔴 Core Features (Priority 1)
- [x] Blog post CRUD (create, read, update, delete)
- [x] Category CRUD
- [x] Assign categories to posts
- [x] Blog listing page
- [x] Individual post view
- [x] Category-based filtering
- [x] Responsive navigation
- [x] Clean, minimal UI

### 🟡 Expected Features (Priority 2)
- [x] Landing page (Header, Hero, Features, Footer)
- [x] Dashboard for post management
- [x] Draft vs Published status
- [x] Loading and error states
- [x] Mobile-responsive design
- [x] Rich Text editor

### 🟢 Bonus Features (Priority 3)
- [ ] Dark mode
- [x] Post statistics (reading time, word count)
- [x] Search functionality
- [ ] SEO meta tags
- [ ] Pagination

---

