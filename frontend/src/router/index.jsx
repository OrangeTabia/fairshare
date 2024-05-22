import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
// import LandingPage from "./LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <h1>Dashboard Page</h1>,
      },
      {
        path: "/expenses",
        element: <h1>Expenses Page</h1>,
      },
    ],
  },
]);
