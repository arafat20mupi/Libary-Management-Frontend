
# 📚 Library Management System

A full-stack web application that allows users to manage a library's book inventory, borrow books, and view borrowing summaries.


## 🚀 Features

### 🔸 Books Management
- Create, update, and delete books
- Track available copies and availability status

### 🔸 Borrowing System
- Users can borrow books
- Summary report of borrowed books with total count and demand status

### 🔸 Admin Panel
- Edit book details
- Delete entries
- View borrow summaries in a dashboard

---

## 🧱 Tech Stack

| Layer     | Technology                      |
|-----------|----------------------------------|
| Frontend  | React.js, TypeScript, Tailwind CSS |
| State     | Redux Toolkit with RTK Query     |
| Backend   | Express.js, TypeScript, Mongoose |
| Database  | MongoDB                          |
| Hosting   | Frontend - Netlify, Backend - Vercel |


## 🖥️ Live Demo

Frontend: [https://libaryms.netlify.app](https://libaryms.netlify.app)  
Backend (API): e.g., `https://libary-management-nu.vercel.app`


## ⚙️ Installation & Setup

### ✅ Prerequisites
- Node.js
- MongoDB
- Git



### 🔹 Backend Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/library-api.git
   cd library-api
```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add environment variables:
   Create a `.env` file with the following:

   ```
   PORT=3000
   DATABASE_URI=mongodb://localhost:27017/libraryDB
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. API will be available at `http://localhost:3000/api`

---

### 🔹 Frontend Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/library-frontend.git
   cd library-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment:
   Create a `.env` file and add:

   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. Start the frontend server:

   ```bash
   npm run dev
   ```

---

## 🛠️ API Endpoints

### 🔸 Books

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /api/books      | Get all books     |
| POST   | /api/books      | Create a new book |
| PATCH  | /api/books/\:id | Update a book     |
| DELETE | /api/books/\:id | Delete a book     |

### 🔸 Borrowing

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | /api/borrow/\:bookId | Borrow a book (by ID)      |
| GET    | /api/borrow/summary  | Get borrowed books summary |

---

## 🌐 Deployment

### Netlify

* Frontend hosted at: `https://libaryms.netlify.app`
* Redirect handling for SPA:

  ```
  // public/_redirects
  /*    /index.html   200
  ```

### Render (or Railway)

* Use "Web Service"
* Set build/start command:

  ```
  npm install
  npm run build
  npm start
  ```

---

## 📦 Folder Structure

```
📁 library-frontend/
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── redux/
  │   ├── interface/
  │   └── App.tsx

📁 library-api/
  ├── src/
  │   ├── app/
  │   │   ├── routes/
  │   │   ├── controllers/
  │   │   └── models/
  │   └── server.ts
```

---

## 🤝 Contributing

Feel free to fork the project and submit a pull request!


## ✍️ Author

Developed by [Arafat Islam](https://github.com/arafat20mupi)
📧 Contact: [arafatislam6619@gmail.com](mailto:arafatislam6619@gmail.com)

