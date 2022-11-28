import './App.css'
import Home from './pages/home'
import DashboardAdmin from './pages/dashboard_admin'
import Dashboard from './pages/dashboard'
import { AuthWrapper } from './pages/authwrapper'
import "./styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from "react"

function App() {

  const [userLoggedState, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("userLogged"))
  )

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  )

  useEffect(() => {
    localStorage.setItem("userLogged", JSON.stringify(userLoggedState))
    localStorage.setItem("userData", JSON.stringify(userData))
  }, [userLoggedState])

  const logIn = () => setUserLogged(true)
  const logOut = () => setUserLogged(false)

  const logInUserData = (value) => setUserData(value)
  //const logOutUserData = () => setUserData(userData)

  console.log('userLoggedState App.js => ', userLoggedState)
  console.log('userData App.js => ', userData)

  return (
    <div className="App">
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path='/' element={<Home logIn={logIn} logInUserData={logInUserData} />} />
            <Route path="/home" element={<Home logIn={logIn} logInUserData={logInUserData} />} />
            <Route element={<AuthWrapper />}>
              <Route path="/dashboard" element={<Dashboard logOut={logOut} userData={userData} />} />
              <Route path='/dashboard-admin' element={<DashboardAdmin logOut={logOut} userData={userData} />} />
            </Route>
          </Routes>
        </Router>
      </React.StrictMode>
    </div>
  )
}

export default App
