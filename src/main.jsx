import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/layout/Main';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import AuthProvider from './components/provider/AuthProvider';
import Register from './components/pages/register/Register';
import { Toaster } from 'react-hot-toast';
import Error from './components/pages/error/Error';
import AddFood from './components/pages/addFood/AddFood';
import ManageFood from './components/pages/manageFood/ManageFood';
import FoodRequest from './components/pages/foodRequest/FoodRequest';
import AvailableFood from './components/pages/availableFood/AvailableFood';
import PrivateRoute from './components/router/PrivateRoute';
import FoodDetails from './components/pages/foodDetails/foodDetails';
import Update from './components/pages/manageFood/Update';
import Manage from './components/pages/manageFood/Manage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>
      }, {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/addFood',
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path: '/availableFood',
        element: <AvailableFood></AvailableFood>
      },
      {
        path: '/manageFood',
        element: <PrivateRoute><ManageFood></ManageFood></PrivateRoute>
      },
      {
        path: '/foodRequest',
        element: <PrivateRoute><FoodRequest></FoodRequest></PrivateRoute>
      },
      {
        path: '/details/:id',
        element: <FoodDetails></FoodDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/foods/${params.id}`)
      },
      {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`http://localhost:5000/foods/${params.id}`)
      },
      {
        path: '/manage/:id',
        element: <PrivateRoute><Manage></Manage></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/foods/${params.id}`)
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster />
  </React.StrictMode>,
)
