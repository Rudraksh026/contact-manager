import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Layout/AppLayout";
import { ContactInfo } from "./components/ContactInfo";
import { AddContact } from "./components/AddContact";
import { Logout } from "./components/Logout";

export const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [ 
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/contact",
          element: <ContactInfo />,
        },
        {
          path: "/add-contact",
          element: <AddContact />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};
