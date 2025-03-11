# Recipe Sharing App

A full-stack **Recipe Sharing App** where users can browse, submit, and manage their favorite recipes. The app integrates **Vue.js (frontend)** and **Node.js + Express + TypeORM + SQLite (backend)** with authentication and role-based access control.

---

## 📌 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend API Setup](#backend-api-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)

---

## 🚀 Features

**User Authentication & Authorization**  
- **JWT-based authentication** with role-based access control (**Admin, Write, Read**).  
- Users can **log in, log out**, and manage sessions securely.  

**Recipe Management**  
- Users can **submit their own recipes** or fetch recipes from **TheMealDB API**.  
- Users can **edit or delete** their own recipes.  
- Admins can **manage all recipes** in the system.  

**Favorites System**  
- Users can **save recipes to their favorite list**.  
- A user can **only see their own favorites**, except for Admins who can see all.  

**Recent Activity Tracking**  
- Tracks user actions such as **submitting recipes, adding favorites, logging in/out**.  

**"Remember Me" Feature**  
- Saves username for **60 days** using cookies for easy login.  

**Secure RESTful API**  
- API built with **Node.js, Express.js, TypeORM, and SQLite** with CRUD operations.  

**Vue.js Frontend**  
- Built with **Vue 3 + TypeScript** and **BootstrapVue** for a modern UI.  
- Uses **Pinia** for state management and **Vue Router** for navigation.  

---

## 🛠️ Tech Stack

### **Frontend:**
- Vue.js 3  
- TypeScript  
- BootstrapVue  
- Pinia (state management)  
- Vue Router  
- Axios (API requests)  

### **Backend:**
- Node.js  
- Express.js  
- TypeORM  
- SQLite  
- JWT (Authentication)  

---

## ⚙️ Installation

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/recipe-sharing-app.git
cd recipe-sharing-app
```

### **2. Install Dependencies**
#### **Backend:**
```bash
cd backend
npm install
```

#### **Frontend:**
```bash
cd frontend
npm install
```

---

## 🔧 Backend API Setup

1. **Create the Database**  
   The API uses **SQLite**. TypeORM will auto-generate tables.  
2. **Run Migrations (If applicable)**  
   ```bash
   npm run typeorm migration:run
   ```
3. **Start the Backend Server**  
   ```bash
   npm start
   ```
   The backend server runs on `http://localhost:3000`.

---

## 🌍 Frontend Setup

1. **Configure Environment Variables**  
   Create a `.env` file inside `/frontend` with:  
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
2. **Start the Frontend Server**  
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## 📌 Usage

1. **Create an Admin User**  
   - Use Postman to create an admin user (see API docs below).  
2. **Login & Navigate**  
   - Admins can create users and manage recipes.  
   - Writers can add their own recipes and favorites.  
   - Readers can log in but have limited actions.  
3. **Interact with Recipes**  
   - Search recipes, add them to favorites, and manage submissions.  

---

## 📖 API Documentation

| Method | Endpoint            | Description                | Access Level |
|--------|---------------------|----------------------------|--------------|
| POST   | `/api/users/login`  | Authenticate user          | Public       |
| GET    | `/api/recipes`      | Fetch all recipes         | Read, Write, Admin |
| POST   | `/api/recipes`      | Add a new recipe          | Write, Admin |
| PUT    | `/api/recipes/:id`  | Update a recipe           | Write, Admin |
| DELETE | `/api/recipes/:id`  | Delete a recipe           | Admin        |
| GET    | `/api/favorites/:userId` | Get user’s favorite list | Write, Admin |
| POST   | `/api/favorites/add` | Add a recipe to favorites | Write, Admin |
| DELETE | `/api/favorites/:id` | Remove from favorites | Write, Admin |

---

## 🔐 Authentication & Authorization

- **Admin (`IhaveADMINaccess`)** → Full access to everything.  
- **Write (`IhaveWRITEaccess`)** → Can add/edit/delete their own recipes and manage favorites.  
- **Read (`IhaveREADaccess`)** → Can log in but cannot add/edit/delete recipes.  
