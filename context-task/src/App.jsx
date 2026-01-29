import { useState, createContext } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css'
import Signup from './components/Signup';

const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <div>
        Hello World
      </div>,
  },
  {
    path: "/signup",
    element: 
      <div>
        <Signup />
      </div>,
  },
]);

function App() {
  const [count, setCount] = useState(0)

  function handleSignup() {
    
  }

  return (
    <>
      <UserContext.Provider value={handleSignup}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
