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
import ServiceDetails from "../pages/services/ServiceDetails";
import BookingPage from "../pages/booking/BookingPage";
import Payment from "../pages/dahsboard/payment/Payment";
import PaymentSuccess from "../pages/dahsboard/payment/PaymentSuccess";
import PaymentCancel from "../pages/dahsboard/payment/PaymentCancel";
import PaymentHistory from "../pages/dahsboard/paymentHistory/PaymentHistory";
import ApproveDecorator from "../pages/dahsboard/approveDecorator/ApproveDecorator";
import UsersManagement from "../pages/dahsboard/users management/UsersManagement";
import AdminRoute from "./AdminRoute";

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
          path:'service/:id',
          Component:ServiceDetails

        },
        {
          path:'booking/:id',
          // Component:BookingPage
          element:<PrivateRoute><BookingPage></BookingPage></PrivateRoute>

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
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[

      {
        path:'add-service',
        Component:AddServices
      },
      {
        path:'my-bookings',
        Component:MyBookings

      },
      {
        path:'payment-history',
        Component:PaymentHistory

      },
      {
        path:'payment/:bookingId',
        Component:Payment
      },
      {
        path:'payment-success',
        Component:PaymentSuccess
      },
      {
        path:'payment-cancel',
        Component:PaymentCancel
      },
      {
        path:'approve-decorator',
        Component:ApproveDecorator
      },
      {
        path:'users-management',
        Component:UsersManagement
        // element:<AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      }

    ]
    
  }
]);