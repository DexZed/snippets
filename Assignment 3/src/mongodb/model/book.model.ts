import { Document, Types } from 'mongoose';

export interface Books extends Document {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
   updateAvailability: () => void;
}

export interface Borrow extends Document {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}