import { useNavigate } from "react-router-dom"
import axios from "axios"
import backendUrl from "./BackendUrl.js"
import { useState } from "react"

const ForgotPassword = () => {
  let navigate = useNavigate()
  const [showMsg, setShowMsg] = useState("") 
  
  let handleSubmit = async (e) => {
    e.preventDefault()
    
    const email = e.target.email.value
    
    try {
      const res = await axios.post(`${backendUrl}/api/forgot-password`, {email}, {withCredentials: true}) 

      const userId = res.data.data.user._id

      setShowMsg(res.data.message)
      navigate("/verify-otp", {state: {userId: userId}})
      
      
    } catch (error) {
      setShowMsg(error.response?.data?.message || "Invalid email")
    }

  }
  
  return (
<div className="forgotPassword text-white w-full min-h-screen flex justify-center items-center select-none">
      
      <form onSubmit={(e) => handleSubmit(e)}  action="" className="rounded-md w-100 h-auto p-3 border">
        <div>
            <h1 className="text-2xl tracking-tighter">Reset Password</h1>
            <h1 className="my-1 mb-3 tracking-tight text-gray-300">Enter your email to receive a verification code  </h1>
        </div>

        <div className="my-2">
            <label htmlFor="">Email</label>
            <input name="email" type="email"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="example@gmail.com"/>
        </div>

         {
          showMsg ? 
          <p className="text-yellow-300 mb-2 text-sm">
            {showMsg}
          </p> 
          :
          null
        }

        <div className="flex gap-2">

            <button type="submit" className="w-[70%] border rounded-md mt-5 text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Send Otp</button>

            <a href="/login" className="w-[30%] border rounded-md mt-5 flex justify-center text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Cancel</a>
        </div>


      </form>

</div>
  )
}

export default ForgotPassword
