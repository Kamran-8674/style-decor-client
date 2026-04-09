import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import PrivateRoute from "./PrivateRoute";
import Decorator from "../pages/decorator/Decorator";
import DashboardLayout from "../layouts/DashboardLayout";
import MyBookings from "../pages/dahsboard/myBookings/MyBookings";
import AddServices from "../pages/dahsboard/AddServices/AddServices";
import Services from "../pages/services/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'services',
          Component:Services
        },

        {
          path:'decorator',
          element:<PrivateRoute><Decorator></Decorator></PrivateRoute>
        },
        {
          path:'coverage',
          Component:Coverage,
          loader: ()=> fetch('/serviceCenters.json').then(res=>res.json())
        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login

      },
      {
        path:'register',
        Component:Register
      }
    ]
  },
  {
    path:'dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[

      {
        path:'add-service',
        Component:AddServices
      },
      {
        path:'my-bookings',
        Component:MyBookings

      }

    ]
    
  }
]);