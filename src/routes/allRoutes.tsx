import React from "react";
import App from "../App";
import { retryFn } from "../utils/common";
import AuthRoute from "./authRoute";
import PageNotFound from "../components/PageNotFound";

const Home = React.lazy(() => retryFn(() => import("../views/Home")));
const EditTask = React.lazy(() => retryFn(() => import("../views/EditTask")));
const TaskDetails = React.lazy(() => retryFn(() => import("../views/TaskDetails")));

export const routes = [
  {
    metaTitle: "Taskify",
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      ///////////////////AUTHENTICATION AND LAYOUT INJECTION/////////////////////////////
      {
        metaTitle: "Home",
        element: <AuthRoute />,
        scopes: [],
        // path: "/",
        // errorElement: <ErrorPage />,
        children: [
          {
            metaTitle: "Home",
            path: "/",
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        metaTitle: "Add Task",
        element: <AuthRoute />,
        children: [
          {
            metaTitle: "Add Task",
            path: "/addTask",
            index: true,
            element: <EditTask />,
          },
        ],
      },
      {
        metaTitle: "Edit Task",
        element: <AuthRoute />,
        children: [
          {
            metaTitle: "Edit Task",
            path: "/editTask/:id",
            index: true,
            element: <EditTask />,
          },
        ],
      },
      {
        metaTitle: "Task Details",
        element: <AuthRoute />,
        children: [
          {
            metaTitle: "Task Details",
            path: "/task/:id",
            index: true,
            element: <TaskDetails />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      /////////////////////////////////////////////////////////////////////
    ],
  },
];

export default routes;
