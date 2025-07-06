# 📚 Library API

An Express + TypeScript REST API for managing a library system with book borrowing functionality using MongoDB and Mongoose.

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/DexZed/friendly-fiesta/tree/main/Assignment%203


cd Assignment 3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/library?retryWrites=true&w=majority
```

### 4. Start the server

```bash
npm run dev
```

The API should now be running at `http://localhost:3000`

---

## 🔐 Security & Middleware

- `cors` for cross-origin access.
- `express.json()` to parse incoming JSON.
- `morgan` for fancy HTTP request logging.

---

## 📦 API Endpoints

All endpoints are prefixed with `/api/books` unless otherwise noted.

### 1. Create Book

`POST /api/books`

Creates a new book.

### 2. Get All Books

`GET /api/books?filter=GENRE&sortBy=FIELD&sort=asc|desc&limit=NUMBER`

Supports filtering by genre, sorting, and limiting results.

### 3. Get Book by ID

`GET /api/books/:bookId`

Retrieves a specific book.

### 4. Update Book

`PUT /api/books/:bookId`

Updates fields in a book.

### 5. Delete Book

`DELETE /api/books/:bookId`

Deletes a book.

### 6. Borrow a Book

`POST /api/books/borrow`

Borrows a book, deducting available copies.

Request format:

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 1,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### 7. Borrowed Books Summary

`GET /api/books/borrow`

Returns aggregated list of borrowed books with `title`, `isbn`, and `totalQuantity`.

---

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose

---

## 📄 License

MIT
