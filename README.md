# CourseHub 🎓

**CourseHub** is a student-driven forum platform where students can collaborate and assist each other with course materials. Users can join different courses, post discussions, comment, like posts, and follow one another. 

This project is built using **Python Flask** for the backend and **React** for the frontend. **MongoDB Atlas** is used to store user data and posts, while **Supabase** handles authentication and file storage.

View the project demo without having to run the application: : https://www.youtube.com/watch?v=SAqRzDYyfaU

## 🚀 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#%EF%B8%8F-getting-started)
- [Backend Setup (Flask)](#-backend-setup-flask)
- [Frontend Setup (React)](#-frontend-setup-react)
- [Run the Application](#%EF%B8%8F-running-the-application)

---

## ✨ Features

- **User Authentication** (via Supabase)
- **Create and Manage User Profiles**
- **Join Courses** and create posts
- **Like, Comment**, and **Follow** other users
- **Real-time Updates** on posts and comments
- Clean and modern UI built with **React**

---

## 📁 Project Structure

```bash
CourseHub/                   # Root
│
├── backend/                 # Flask backend (Python)
│   ├── app.py               # Entry point for running the Flask app
│   ├── config.py            # Configurations (e.g., MongoDB, Supabase)
│   ├── models/              # MongoDB document structures
│   ├── routes/              # Route handlers for API/endpoints
│   ├── utils/               # Utility functions
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
│
├── frontend/                # React frontend
│   ├── public/              # Public assets (index.html, favicon, etc.)
│   ├── src/                 # React components and pages
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/          # Custom UI elements (buttons, inputs, etc.) for standardization
│   │   ├── utils/           # Utility functions for reusable logic and helpers
│   │   ├── pages/           # Application pages (e.g., Home, Profile)
│   │   ├── services/        # API services to connect with Flask backend
│   │   ├── App.js           # Main React app
│   │   └── index.js         # React entry point
│   ├── package.json         # Node.js dependencies
│   └── .env                 # Environment variables
│
└── .gitignore               # Git ignore file

```

---

## 🛠️ Getting Started

### Prerequisites

- **Python 3.8 or higher**
- **Node.js (version 14 or higher)**
- **Git**

### Clone the Repository

First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yourusername/CourseHub.git
cd CourseHub
```

## 🔧 Backend Setup (Flask)

### 1. Navigate to the Backend Folder:

```bash
cd backend
```

### 2. Create and Activate a Virtual Environment:

```bash
python3 -m venv venv
source venv/bin/activate  # MacOS
venv\Scripts\activate  # Windows
```

### 3. Install Dependencies:

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables:

Create a `.env` file inside the `backend/` directory with the following content: **(I will give you one)**

```bash
FLASK_APP=run.py
FLASK_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
SUPABASE_URL=https://your-supabase-instance.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

5. Run the Backend:

```bash
flask run
```

The Flask server will be running at [http://localhost:5000](http://localhost:5000).

---

## 🌐 Frontend Setup (React)

### 1. Navigate to the Frontend Folder:

```bash
cd frontend
```

### 2. Install Dependencies:

```bash
npm install
```

### 3. Configure Environment Variables:

Create a `.env` file inside the `frontend/` directory with the following content: **(I will give you one)**

```bash
REACT_APP_SUPABASE_URL=https://your-supabase-instance.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
REACT_APP_API_URL=http://localhost:5000  # Flask backend URL
```

### 4. Run the Frontend:

```bash
npm run
```

The React app will be running at [http://localhost:3000](http://localhost:3000).

---

## ▶️ Running the Application

To run the entire application locally:

### 1. Run the Backend:

```bash
cd backend
flask run
```

### 2. Run the Frontend:

```bash
cd frontend
npm start
```

You can now access the frontend at [http://localhost:3000](http://localhost:3000) and interact with the backend running at [http://localhost:5000](http://localhost:5000).
