# Hotel Management System (HMS)

A full-stack, comprehensive web application designed to manage hotel operations efficiently. This project handles essential hotel functionalities, such as room bookings, guest management, and administrative oversight. 

## 🛠 Tech Stack

### Frontend
- **React.js (Vite)**
- **React Router DOM** for navigation
- **Bootstrap** & **Custom CSS** for styling
- **Recharts** for data visualization 
- **Axios** for API requests

### Backend
- **Node.js** with **Express.js** 
- **MongoDB** with **Mongoose** for data storage
- **JSON Web Tokens (JWT)** for authentication
- **Bcryptjs** for secure password hashing
- **Cors** & **Morgan** for middleware

---

## 📂 Project Structure

```
HMS/
├── backend/                  # Express/Node.js backend
│   ├── src/
│   │   ├── config/           # Database configurations
│   │   ├── controllers/      # API logic and operations
│   │   ├── middlewares/      # Custom middlewares (auth, errors)
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API endpoints routing
│   │   ├── seed/             # Database seeding scripts
│   │   ├── utils/            # Helper functions
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # Entry point for backend
│   ├── .env                  # Backend environment variables
│   └── package.json          # Backend dependencies
├── src/                      # React frontend
│   ├── components/           # Reusable UI components
│   ├── context/              # Context API state management
│   ├── layouts/              # Reusable page layouts
│   ├── pages/                # Main view components
│   ├── services/             # API client functionalities
│   ├── styles/               # Global styling
│   ├── utils/                # Frontend helper elements
│   ├── App.jsx               # Main application wrapper
│   └── routes.jsx            # Frontend routes configuration
├── .env                      # Frontend environment variables
└── package.json              # Frontend dependencies
```

---

## 🚀 Getting Started

Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v16.0.0 or higher recommended)
- **npm** or **yarn**
- **MongoDB (Local instance or MongoDB Atlas URI)

Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd HMS
   cd frontend
   ```

2. Install Frontend Dependencies:
   ```bash
   npm install
   ```

3. Install Backend Dependencies:
   ```bash
   cd backend
   npm install
   cd ..
   ```

---

⚙️ Environment Variables

Create `.env` files in both the root directory and the `backend` directory.
Frontend (`HMS/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```
*(Adjust the API url if your backend runs on a different port)*

Backend (`HMS/backend/.env`):**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
```

---

Running the Application

Seed the Database (Optional but Recommended)
To populate your database with initial data (like an admin user or sample rooms), run the seed script:
```bash
cd backend
npm run seed
```

1. Start the Backend Server
From the root directory, navigate to the backend and start it:
```bash
cd backend
npm run dev
```
*The backend should now be running on `http://localhost:5000`*

### 2. Start the Frontend Development Server
Open a new terminal window, navigate to your root directory, and start the React app:
```bash
npm run dev
```
*The frontend should now be running on `http://localhost:5173` (or depending on Vite's assignment)*

---

Frontend Scripts (`/package.json`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to find issues in your code.
- `npm run preview`: Locally preview the production build.

Backend Scripts (`/backend/package.json`)
- `npm run dev`: Starts the server using `nodemon` for auto code reloading.
- `npm start`: Starts the server normally (for production).
- `npm run seed`: Runs the script to insert seed data into the database.

---
