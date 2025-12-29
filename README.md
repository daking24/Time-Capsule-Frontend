# 🚀 Time Capsule (Frontend)

> "Send a message across time."

Welcome to the Mission Control interface for **Time Capsule**, a full-stack application that allows users to send messages, photos, and videos to their future selves.

🔗 **Live Mission Control**: [Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/daking24/Time-Capsule-Frontend)

## 📡 Mission Overview
This is the **Frontend** component of the Time Capsule architecture. It provides a premium, "Space/Royal" themed user experience for:
*   **Composing Letters**: Writing text, uploading images, or recording video/audio messages.
*   **Time Travel Scheduling**: Selecting a delivery date in the future.
*   **Flight Logs**: A dashboard to track sealed capsules and review delivered ones.
*   **Identity Management**: Login/Register with JWT authentication.

## 🛠️ Tech Stack
*   **Core**: React 18, Vite
*   **Styling**: TailwindCSS, CSS Variables (Royal Gold/Deep Space Blue theme)
*   **Motion**: Framer Motion (Page transitions, loading animations)
*   **Routing**: React Router DOM v6
*   **State**: Context API (AuthContext)
*   **Date**: Date-fns, React Datepicker
*   **Media**: React Media Recorder

## ⚙️ Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/daking24/Time-Capsule-Frontend.git
    cd Time-Capsule-Frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root:
    ```env
    VITE_API_BASE_URL=http://localhost:8000
    ```
    *(Note: For production, this should point to your Render backend URL)*

4.  **Launch Mission**
    ```bash
    npm run dev
    ```
    Access via `http://localhost:5173`.

## 🚢 Deployment (Vercel)

This project is optimized for deployment on **Vercel**.

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  **Critical**: Set the Environment Variable in Vercel:
    *   `VITE_API_BASE_URL`: `https://your-backend-service.onrender.com`
4.  Deploy!

## 🤝 Backend Companion
This frontend requires the **Time Capsule Backend** to function (User auth, database storage, email scheduling).
*   **Backend Repo**: [Time-Capsule-Backend](https://github.com/daking24/Time-Capsule-Backend)

---
*Built with 💫 by Daking24*
