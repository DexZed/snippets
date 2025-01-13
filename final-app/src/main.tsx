import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import ErrorPage from './routes/error';
import SignIn from './routes/Sign-In/SignIn';
import SignUp from './routes/Register/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,

    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/signIn",
        element: <><SignIn/></>,
      },
      {
        path: "/register",
        element: <><SignUp/></>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
