import { Router, Request, Response } from "express";
import { BooksModel, BorrowModel } from "../../mongodb/schema/book.schema";

console.log("Borrow controller file was loaded at:", new Date().toLocaleTimeString());
const controller = Router();

// 1. Create Book
controller.post("/books", async (req: Request, res: Response) => {
  try {
    const book = await BooksModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
  }
});
// 2. Get All Books
controller.get("/books", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "0",
    } = req.query;
    const query: any = {};
    if (filter) query.genre = filter;
    const books = await BooksModel.find(query)
      .sort({ [sortBy.toString()]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving books", error });
  }
});
// 7. Borrow Summary (Aggregation)
controller.get("/borrow", async (_req: Request, res: Response) => {
  try {
    const summary = await BorrowModel.aggregate([
      {
        $addFields: {
          book_id_object: {
            $cond: {
              if: { $eq: [{ $type: "$book" }, "string"] },
              then: { $toObjectId: "$book" },
              else: "$book",
            },
          },
        },
      },
      {
        $group: {
          _id: "$book_id_object",
          totalQuantity: { $sum: "$quantity" },
          createdAt: { $min: "$createdAt" },
          updatedAt: { $max: "$updatedAt" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
     console.error("AGGREGATION FAILED:", error); 
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrow summary",
      error,
    });
  }
});
// 3. Get Book by ID
controller.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await BooksModel.findById(req.params.bookId);
    if (!book) throw new Error("Book not found");
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Book not found", error });
  }
});

// 4. Update Book
controller.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await BooksModel.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!book) throw new Error("Book not found");
    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Validation failed", error });
  }
});

// 5. Delete Book
controller.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    await BooksModel.findByIdAndDelete(req.params.bookId);
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Book not found", error });
  }
});

// 6. Borrow a Book

controller.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    console.log("Request Body:", req.body);
    
    const book = await BooksModel.findById(bookId);
    if (!book) throw new Error("Book not found");
    if (book.copies < quantity) throw new Error("Not enough copies available");

    book.copies -= quantity;
    book.updateAvailability();
    await book.save();

    const borrow = await BorrowModel.create({
      book: bookId,
      quantity,
      dueDate,
    });
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    console.error("Borrow Error:", error);
    res.status(400).json({
      success: false,
      message: "Borrowing failed",
      error: error?.errors || error?.message || error,
    });
  }
});

controller.use((req, _res, next) => {
  console.log("Incoming route:", req.originalUrl);
  next();
});

export default controller;
