import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Book, BookForm } from "../utils/Customtypes";

interface BookFormState {
  form: BookForm;
}

const initialState: BookFormState = {
  form: {
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 0,
    available: true,
  },
};

export const bookFormSlice = createSlice({
  name: "bookForm",
  initialState,
  reducers: {
    // For updating individual fields
    updateBookForm: <K extends keyof BookForm>(
      state: BookFormState,
      action: PayloadAction<{ field: K; value:BookForm[K] }>
    ) => {
      state.form[action.payload.field] = action.payload.value;
    },
    // Pre-filling form when editing a book
    prefillBookForm: (state, action: PayloadAction<Book>) => {
      const { updateAvailability, ...rest } = action.payload;
      state.form = { ...rest };
      
    },
     // For resetting form back to empty (useful after submission)
     resetBookForm: (state) =>{
      state.form = initialState.form;
     }
  },
});

export const { updateBookForm, prefillBookForm, resetBookForm } = bookFormSlice.actions;
export default bookFormSlice.reducer;