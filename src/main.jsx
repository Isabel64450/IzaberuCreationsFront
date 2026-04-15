import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RegistrationForm from './pages/authentification/Registration.form.jsx'
import Home from "../src/pages/Home.jsx"
import LoginForm from "./pages/authentification/Login.jsx"
import ForgotPassword from './pages/authentification/ForgotPassword.jsx'
import ResetPassword from './pages/authentification/ResetPassword.jsx'
import CreateProduct from './pages/adminPages/products/CreatedProduct.jsx'
import Gallery from './pages/Gallery.jsx'
import { AuthProvider } from '../src/contex/AuthContext.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import { CartProvider } from './contex/CartContex'
import Checkout from './pages/Checkout.jsx'
import AdminProducts from './pages/adminPages/products/AdminProducts.jsx'
import AdminEditProduct from './pages/adminPages/products/AdminEditProduct.jsx'
import Artist from './pages/Artist.jsx'
import AdminEvents from "./pages/adminPages/events/AdminEvents";
import AdminNewEvent from "./pages/adminPages/events/AdminNewEvent";
import AdminEditEvent from "./pages/adminPages/events/AdminEditEvent";
import UsersList from './pages/adminPages/users/UsersList.jsx'
import EditUser from './pages/adminPages/users/EditUser.jsx'
import VerifyEmailPage from './pages/authentification/VerifyEmail.jsx'

const EmptyLayout =() => <Outlet />

const router = createBrowserRouter([
{path:'/',element: <App/>,
  children:[
    {index: true, element: <Home/>},
    {path:"login", element: <LoginForm/>},
    {path: '/forgot-password',element: <ForgotPassword/>},
    { path: '/reset-password/:token', element: <ResetPassword/> },
    { path: '/verify-email/:token', element: <VerifyEmailPage/> },
    {path: '/gallery',element: <Gallery/>},
    {path: '/artist', element: <Artist/>},
    {path:'/products/:productId',element:<ProductDetail/>},
     { path: '/cart', element: <Cart /> },
     {path: '/checkout', element:<Checkout/>}    
    
  ]
},{
  element: <EmptyLayout/>,
  children:[{path:'/register', element:<RegistrationForm/>},
    { path: '/admin/products/new', element: <CreateProduct /> },
    {path: '/admin/products', element: <AdminProducts />},
    {path: '/admin/products/:id', element: <AdminEditProduct/>},
    { path: "/admin/events", element: <AdminEvents /> },
{ path: "/admin/events/new", element: <AdminNewEvent /> },
{ path: "/admin/events/:id", element: <AdminEditEvent /> },
{ path: "/admin/users", element: <UsersList /> },
{ path: "/admin/users/edit/:id", element: <EditUser /> }
    
   
]
  
}



])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
 <RouterProvider router ={router}/>

      </CartProvider>
     
      
    </AuthProvider>
    
  </React.StrictMode>,
)
