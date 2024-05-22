import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage";
import DashboardPage from "../components/DashboardPage";
import ExpensesPage from "../components/ExpensesPage";
import FriendPage from "../components/FriendPage/FriendPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/expenses",
        element: <ExpensesPage />,
      },
      {
        path: "/friend/:friendId",
        element: <FriendPage />,
      }
    ],
  },
]);
