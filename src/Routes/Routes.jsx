import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import AddTask from "../Pages/Addtask/AddTask";
import TaskList from "../Pages/TaskList/TaskList";
import Edittask from "../Pages/Edittask/Edittask";
import PrivateRoute from "./PrivateRoute";
import Errorpage from "../Pages/Errorpage/Errorpage";
import AddOn from "../Pages/AddOn/AddOn";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addtask",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "tasklist",
        element: (
          <PrivateRoute>
            <TaskList></TaskList>
          </PrivateRoute>
        ),
      },
      {
        path: "edittask/:id",
        element: (
          <PrivateRoute>
            <Edittask></Edittask>
          </PrivateRoute>
        ),
      },
      {
        path: "addOn",
        element: (
          <PrivateRoute>
            <AddOn></AddOn>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
