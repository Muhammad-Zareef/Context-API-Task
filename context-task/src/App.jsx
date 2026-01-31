import { useState, createContext, useEffect } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css'
import Signup from './components/Signup';
import Login from './components/Login'
import NotFound from './components/NotFound';
import Home from './components/Home';

export const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/login",
    element: 
      <div>
        <Login />
      </div>
  },
  {
    path: "/signup",
    element: 
      <div>
        <Signup />
      </div>
  },
  {
    path: "/home",
    element: 
      <div>
        <Home />
      </div>
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
