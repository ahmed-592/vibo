
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import FeedPages from './Pages/FeedPages';
import PostDetails from './Pages/PostDetails';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';

import ProtectedRoute from './Components/ProtectedRoute';
import AuthProtectedRoute from './Components/AuthProtectedRoute';
import MainLayout from './Layout/MainLayout';
import AuthLayout from './Layout/AuthLayout';
import ChangePassword from './Components/ChangePassword';
import NotFound from './Pages/NotFound';


export default function App() {




  const routing = createBrowserRouter([
    {path:"" , element: <MainLayout/> , children: [
      {index:true , element:<ProtectedRoute><FeedPages/></ProtectedRoute>},
      {path:"post-details/:id" , element:<ProtectedRoute><PostDetails/></ProtectedRoute>},
      {path:"profile" , element:<ProtectedRoute><Profile/></ProtectedRoute>},
      {path:"change-password" , element:<ProtectedRoute><ChangePassword/></ProtectedRoute>},
      {path:"*" , element:<ProtectedRoute><NotFound/></ProtectedRoute>},
    ]},

    {path:"" , element: <AuthLayout/> , children: [
      {path:"register" , element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
      {path:"login" , element:<AuthProtectedRoute><Login/> </AuthProtectedRoute>},
    ]}
    
  ])

  
  return <>
  <RouterProvider router={routing} />
  </>

    
    
  
}
