# 🏷️ Bidora — MERN Stack Auction Platform

Bidora is a full-stack auction web application built using the **MERN stack**, where users can create auctions, place bids, comment on items, and manage their listings, while admins have full control over users, items, and comments.

This project is designed to be **production-ready**, modular, and scalable.

---

## 🚀 Features

### 👤 User Features

* User registration & authentication (JWT based)
* Create auction items
* Edit & delete own items
* Upload **single image via URL** per item
* View all auctions (active & closed)
* Place bids on active auctions
* Close own auctions
* Comment on auction items
* Browse items by category
* View only active auctions
* Watch clean, responsive UI with Tailwind CSS

---

### 🛠️ Admin Features

* Admin dashboard
* View all users
* Edit or delete users
* View all auction items
* Edit or delete any item
* Activate / deactivate auctions
* View & delete comments
* Full platform moderation

---

## 🧱 Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS (CDN)
* Vanilla JavaScript

### Backend

* Node.js
* Express.js
* JWT Authentication
* Mongoose

### Database

* MongoDB

---

## 📂 Project Structure

```
auctionare/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## 🔐 Authentication & Roles

* **Users** authenticate using JWT
* Token stored securely in `localStorage`
* Role-based access control:

  * `user`
  * `admin`

---

## 🖼️ Image Handling

* Each auction item supports **one image**
* Image is provided via **public image URL**
* Examples:

  * Unsplash
  * Cloudinary
  * CDN-hosted images
* No local file uploads required

---

## ⚙️ Environment Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/KrishKorat/Bidora.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 🔗 API Overview

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Items

* `GET /api/items`
* `GET /api/items/:id`
* `POST /api/items`
* `PUT /api/items/:id`
* `DELETE /api/items/:id`
* `PATCH /api/items/:id/close`

### Bids

* `POST /api/bids/:itemId`

### Comments

* `POST /api/comments/:itemId`

### Admin

* `GET /api/admin/items`
* `PUT /api/admin/items/:id`
* `DELETE /api/admin/items/:id`
* `GET /api/admin/users`
* `PUT /api/admin/users/:id`
* `DELETE /api/admin/users/:id`

---