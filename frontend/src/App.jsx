import { Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword"
import VerifyOtp from "./components/VerifyOtp"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      <Route path="/verify-otp" element={<VerifyOtp/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
  )
}

export default App
