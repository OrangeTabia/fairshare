import { createBrowserRouter } from "react-router-dom";

import LandingPageSwapper from "./LandingPageSwapper";
import DashboardPage from "../components/DashboardPage";
import ExpensesPage from "../components/ExpensesPage";
import FriendPage from "../components/FriendPage/FriendPage";


export const router = createBrowserRouter([
  {
    element: <LandingPageSwapper />,
    children: [
      {
        path: "/",
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
