import { Schema, model } from 'mongoose';
import { Books, Borrow } from '../model/book.model';

const bookSchema = new Schema<Books>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    required: true,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
  },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true
  }
  
});
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

const borrowSchema = new Schema<Borrow>({
  book: { type: Schema.Types.ObjectId, ref: 'books', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true }
},{ timestamps: true });

export const BorrowModel = model<Borrow>('borrow', borrowSchema);
export const BooksModel = model<Books>('books', bookSchema);