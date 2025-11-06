# 🧩 Redis Leaderboard API & Frontend

A **real-time leaderboard system** built with **FastAPI**, **Redis**, and **React**.  
Users can submit scores and see the leaderboard update instantly via **WebSockets**.  
Built as part of a performance-optimization learning project (Week 1: Redis Caching & Performance Boosting).

---

## 🚀 Features

- ⚡ **FastAPI backend** for high-performance APIs  
- 🧠 **Redis caching** using sorted sets (`ZSET`) for efficient leaderboard ranking  
- 🕒 **TTL-based caching** with automatic invalidation  
- 🔄 **Live leaderboard updates** via WebSockets  
- 🎨 **Beautiful React frontend** using TailwindCSS  
- 🧰 Modular project structure with caching utilities and route separation  

---

## 🏗️ Project Structure

### **Backend (FastAPI + Redis)**
```
leaderboard-api-redis-be/
│
├── app/
│   ├── main.py
│   ├── redis_client.py
│   ├── routes/
│   │   ├── submit.py
│   │   ├── leaderboard.py
│   │   └── ws_leaderboard.py
│   ├── utils/
│   │   └── ws_manager.py
│   └── cache_updater.py
│
├── requirements.txt
└── README.md
```

### **Frontend (React + TailwindCSS)**
```
leaderboard-api-redis-fe/
│
├── src/
│   ├── components/
│   │   └── Leaderboard.jsx
│   ├── services/
│   │   └── websocket.js
│   ├── index.js
│   ├── index.css
│   └── App.js
│
├── package.json
└── README.md
```

---

## 🧰 Backend Setup

### 1️⃣ Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

### 2️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Run Redis
Make sure Redis is running locally:
```bash
redis-server
```

### 4️⃣ Start FastAPI server
```bash
uvicorn app.main:app --reload
```

Server will run on:  
👉 http://127.0.0.1:8000

---

## 💻 Frontend Setup

### 1️⃣ Install dependencies
```bash
cd leaderboard-api-redis-fe
npm install
```

### 2️⃣ Start React app
```bash
npm start
```

Frontend runs on:  
👉 http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/submit?username={name}&score={score}` | Submit user score |
| `GET`  | `/leaderboard?limit=10` | Fetch top leaderboard entries |
| `WS`   | `/ws/leaderboard` | Subscribe to live leaderboard updates |

---

## ⚙️ Redis Concepts Used

- **Sorted Sets (`ZADD`, `ZREVRANGE`)** for ranking  
- **Cache-aside pattern** for performance  
- **TTL (Time-To-Live)** for auto invalidation  
- **Pub/Sub (WebSocket)** for real-time updates  

---

## 🎨 Preview

| Default View | Live Update |
|---------------|-------------|
| ![Leaderboard UI](https://via.placeholder.com/400x250?text=Leaderboard+UI) | ![WebSocket Update](https://via.placeholder.com/400x250?text=Live+Update) |

---

