export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
  updateAvailability?: () => void;
}
export type BookForm = Omit<Book, "updateAvailability">;
export interface Borrow {
  book: string;
  quantity: number;
  dueDate: string;
}
export interface ApiSingleBookResponse {
  success: boolean;
  message: string;
  data: Book;
}
// Define the full API response type
export interface ApiBooksResponse {
  success: boolean;
  message: string;
  data: Book[];
}
// Borrow response from post
export interface BorrowResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    book: string;
    quantity: number;
    dueDate: string;
  };
}

export interface BorrowSummaryItem {
  _id: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
  };
}

export interface ApiBorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
}
