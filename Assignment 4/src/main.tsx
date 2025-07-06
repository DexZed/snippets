import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";
import { store } from "./app/store.ts";
import ListView from "./ui/listView.tsx";
import CreateForm from "./ui/CreateForm.tsx";
import EditBook from "./ui/EditBook.tsx";
import BorrowBook from "./ui/BorrowBook.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index:true,
        element: <><ListView></ListView></>,
      },
      {
        path:"/create-book",
        element:<><CreateForm/></>
      },
      {
        path:"/edit-book/:id",
        element:<><EditBook></EditBook></>
      },
      {
        path:"/borrow/:id",
        element:<><BorrowBook></BorrowBook></>
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
    
  </StrictMode>
);
