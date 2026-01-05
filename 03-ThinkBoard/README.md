---

# ThinkBoard (MERN Notes-taking Website)

A full-stack notes-taking application built using the **MERN Stack** (MongoDB, Express, React, Node.js) that allows users to **create, read, update, and delete notes**.

---

## Features

* Add new notes
* View all notes
* Read individual notes details
* Edit existing notes
* Delete notes

---

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB
* **API Client:** Axios

---

## Project Structure

```
/frontend
/backend
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KrishKorat/ThinkBoard.git
cd ThinkBoard
```

---

## Backend Setup

### Navigate to Backend Folder

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Environment Variables (`.env`)

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=url_from_redis
UPSTASH_REDIS_REST_TOKEN=secret_token
```

### Start Backend Server

```bash
npm run dev
```

or

```bash
npm start
```

Backend will run on:

```
http://localhost:5000
```

---

## Frontend Setup

### Navigate to Frontend Folder

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Frontend Server

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## Screenshots

### Home Page

<img src="images/thinkboard-01.png" alt="Home Page" />

### Add Note Page

<img src="images/thinkboard-02.png" alt="Add Page" width="700px"/>

### Note Detail and Edit Page

<img src="images/thinkboard-03.png" alt="Detail and Edit Page" width="700px"/>

