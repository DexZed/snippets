import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { createBrowserRouter, createRoutesFromChildren, matchRoutes, RouterProvider, useLocation, useNavigationType } from "react-router";
import { store } from "./app/store.ts";
import ListView from "./ui/listView.tsx";
import CreateForm from "./ui/CreateForm.tsx";
import EditBook from "./ui/EditBook.tsx";
import BorrowBook from "./ui/BorrowBook.tsx";
import BookDetails from "./ui/BookDetails.tsx";
import BorrowSummary from "./ui/BorrowSummary.tsx";
import * as Sentry from "@sentry/react";
import React from "react";


Sentry.init({
  dsn: "https://97593a715cfd042d24db7b790fd1a929@o4509655503470592.ingest.de.sentry.io/4509655505043536",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    })
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost","https://pirate-lib.web.app"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouterV6(
  createBrowserRouter,
);

const router = sentryCreateBrowserRouter([
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
      {
        path:"/books/:id",
        element:<><BookDetails></BookDetails></>
      },
      {
        path:"/borrow-summary",
        element:<><BorrowSummary></BorrowSummary></>
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
