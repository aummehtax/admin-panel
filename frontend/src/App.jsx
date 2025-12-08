import { Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword"
import VerifyOtp from "./components/VerifyOtp"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Logout from "./components/Logout"
import ResetPassword from "./components/ResetPassword"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      <Route path="/verify-otp" element={<VerifyOtp/>}></Route>
      <Route path="/logout" element={<Logout/>}></Route>
      <Route path="/reset-password" element={<ResetPassword/>}></Route>
      
      //protected routes #only accessible when logged in
      <Route path="/profile" element={<ProtectedRoutes requiredRole={["admin","moderator"]}><Profile/></ProtectedRoutes>}></Route>
      <Route path="/dashboard" element={<ProtectedRoutes requiredRole={["admin","moderator"]}><Dashboard/></ProtectedRoutes>}></Route>
      //protected routes 

      <Route path="/unauthorized" element={<div>⛔ Access Denied - Only admin/moderator can access</div>}></Route>
    </Routes>
  )
}     

export default App
