// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ApiBooksResponse,
  ApiBorrowSummaryResponse,
  Book,
  Borrow,
  BorrowResponse,
} from "../utils/Customtypes";
// Base URL : https://friendly-fiesta-qsms.onrender.com, http://localhost:3000/api
// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://friendly-fiesta-qsms.onrender.com/api" }),
  tagTypes: ["Books", "Borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query<ApiBooksResponse, undefined>({
      query: () => "books",
      providesTags: ["Books"],
    }),
    getSingleBook: builder.query<Book, string>({
      query: (id) => `books/${id}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<ApiBooksResponse, Partial<Book>>({
      query: (book) => {
        return {
          url: "/books",
          method: "POST",
          body: book,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            bookApi.util.updateQueryData("getBooks", undefined, (draft) => {
              draft.data.push(...data.data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<Book, Book>({
      query: (book) => {
        return {
          url: `/books/${book._id}`,
          method: "PUT",
          body: book,
        };
      },
      async onQueryStarted(book, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookApi.util.updateQueryData("getBooks", undefined, (draft) => {
            const index = draft.data.findIndex((b: Book) => b._id === book._id);
            if (index !== -1) {
              draft.data[index] = book;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookApi.util.updateQueryData("getBooks", undefined, (draft) => {
            const index = draft.data.findIndex((b: Book) => b._id === id);
            if (index !== -1) {
              draft.data.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Books"],
    }),
    getBorrowSummary: builder.query<ApiBorrowSummaryResponse, undefined>({
      query: () => "borrow",
      providesTags: ["Borrow"],
    }),
    createBorrow: builder.mutation<BorrowResponse, Borrow>({
      query: (borrow) => {
        return {
          url: "/borrow",
          method: "POST",
          body: borrow,
        };
      },
      invalidatesTags: ["Borrow"],
    }),
    
    
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation,
  useGetBorrowSummaryQuery,
} = bookApi;
