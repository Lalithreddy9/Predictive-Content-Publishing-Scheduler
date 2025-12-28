# 🧠 AI-Powered Content Recommendation & Scheduling Tool

An intelligent content scheduling platform that analyzes historical engagement data and uses AI to recommend **optimal publishing times** and **catchy subject lines**, combined with a **drag-and-drop calendar-based scheduler**.

This project demonstrates full-stack design, AI integration, data analysis, and real-world product UX.

---

## 📌 Problem Statement

Social media and content teams struggle to decide:
- *When* to post content for maximum engagement
- *What* subject lines or headlines perform best

This tool solves that problem by:
- Analyzing past engagement patterns
- Using AI to predict optimal posting times
- Generating high-performing headlines
- Allowing users to visually schedule content via a calendar

---

## ✨ Key Features

### 📊 Engagement Analytics Dashboard
- Displays historical posts with likes, comments, and shares
- Aggregated metrics (total engagement)
- Platform-aware indicators (LinkedIn, Twitter, Blog)

### 🤖 AI-Based Recommendations
- Uses AI (OpenAI / Claude compatible API) to:
  - Analyze engagement trends
  - Suggest **best publishing time**
  - Generate **catchy headlines**
- Prevents scheduling posts in the past
- Required input validation for reliable recommendations

### 📅 Drag-and-Drop Content Scheduler
- Monthly calendar view using **FullCalendar**
- Drag & drop rescheduling
- Auto-fills AI-recommended headlines and timings
- Real-time sync with backend

### 📤 Export & Integration
- Export scheduled posts as CSV
- Structured API ready for mock publishing integration

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- FullCalendar.io
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- MongoDB Aggregation Pipelines

### AI
- OpenAI / Claude compatible AI API
- Prompt-based analysis for engagement trends

---

## 🧠 AI Logic (High-Level)

1. Historical posts are fetched from MongoDB
2. Engagement patterns are summarized
3. AI is prompted with:
   - Platform
   - Audience
   - Posting goal
   - Past engagement trends
4. AI returns:
   - Recommended posting time
   - Optimized headline
5. User confirms and schedules post via calendar

---

## 📂 Project Structure
AI_Content_Scheduler/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Dashboard.jsx # Analytics & metrics
│ │ │ ├── Calendar.jsx # Drag & drop scheduler
│ │ │ └── AIScheduler.jsx # AI recommendation page
│ │ ├── components/
│ │ │ ├── Sidebar.jsx
│ │ │ ├── Layout.jsx
│ │ │ └── SchedulePostModal.jsx
│ │ ├── App.jsx
│ │ └── index.css
│
├── backend/
│ ├── models/
│ │ └── Post.js # Post & metrics schema
│ ├── routes/
│ │ ├── postRoutes.js
│ │ ├── aiRoutes.js
│ │ └── analyticsRoutes.js
│ ├── config/
│ │ └── db.js
│ └── server.js
│
├── sample_data/
│ └── seedPosts.js # Sample dataset
│
└── README.md

## 📊 Sample Dataset

The project includes a seeded dataset containing:
- Published posts
- Scheduled posts
- Engagement metrics (likes, comments, shares)
- Multiple platforms

Used for:
- AI analysis
- Analytics aggregation
- Calendar demo




## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/ai-content-scheduler.git
cd ai-content-scheduler


2️⃣ Backend Setup
cd backend
npm install
Create .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000
OPENAI_API_KEY=your_api_key
Run backend:
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔌 API Endpoints
Posts

GET /api/posts – Fetch all posts

POST /api/posts – Create new post

PUT /api/posts/:id – Update scheduled post

GET /api/posts/export/csv – Export CSV

AI

POST /api/ai/suggest – Get recommended headline & best time

Analytics

GET /api/analytics/summary – Aggregated engagement metrics

🧪 Validations Implemented

Required fields enforced for AI scheduling

Prevent scheduling posts in the past

Scrollable AI scheduler page for accessibility

Backend-safe date handling

🎯 Deliverables Checklist (Task-Aligned)

✅ React dashboard with metrics & calendar
✅ MongoDB storage with aggregation
✅ AI-based time & headline recommendations
✅ Drag-and-drop scheduler
✅ CSV export
✅ Sample dataset
✅ GitHub repository with README
✅ End-to-end demo-ready flow


🚀 Future Improvements

Multi-user authentication
AI confidence scoring
A/B testing recommendations
Direct platform publishing integration
AI recommendation history


👤 Author
Lalith Reddy Mallireddy
MERN Stack Developer | AI-Focused Full Stack Engineer

-
