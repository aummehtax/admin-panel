import axios from 'axios'
import React, { useState } from 'react'
import backendUrl from './BackendUrl'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {

  const [newPass, setNewPass] = useState("")  
  const [confirmPass, setConfirmPass] = useState("")  
  const [showMsg, setShowMsg] = useState("") 

  const navigate = useNavigate()
  const location = useLocation()
  const userId = location.state?.userId //get userIf from verify-otp page

  let handleSubmit = async (e) => {
    
    e.preventDefault()

    //validation
    if(!newPass || !confirmPass){
        setShowMsg("Please fill all fields")
        return
    }
    if(newPass !== confirmPass){
        setShowMsg("Password do not match")
        return
    }
    if(newPass.length < 6){
      setShowMsg("Password must be at least 6 characters")
      return
    }
    if(!userId){
      setShowMsg("Session expired. Please try again.")
      return
    }
    //validation

    setShowMsg("")

    try {
        const res = await axios.post(`${backendUrl}/api/reset-password`, {newPass, userId}, {withCredentials: true})

        setShowMsg(res.data.message)
        setNewPass("")
        setConfirmPass("")
        
        setTimeout(() => {
            navigate("/login")
        }, 2000);

    } catch (error) {
        setShowMsg(error.response?.data?.message || "Invalid")
    }
  }

  return (
<div className="verifyOtp text-white w-full min-h-screen flex justify-center items-center select-none">
      
      <form onSubmit={(e) => handleSubmit(e)} action=""  className="rounded-md w-100 h-auto p-3 border">
        <div>
            <h1 className="text-2xl tracking-tighter">Reset Password</h1>
            <h1 className="my-1 mb-3 tracking-tight text-gray-300">Enter new password</h1>
        </div>

       <div className='flex flex-col gap-3 justify-start '>

        <input type="password" placeholder='New Password' className='border rounded-md px-3 py-2 outline-0' value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
        <input type="password" placeholder='Confirm Password' className='border rounded-md px-3 py-2 outline-0' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>

       </div>

         {
          showMsg ? 
          <p className="text-yellow-300 mb-2 text-sm mt-3">
            {showMsg}
          </p> 
          :
          null
        }

        <div className="flex gap-2">

            <button type="submit" className="w-[70%] border rounded-md mt-5 text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Reset Password</button>

            <a href="/forgot-password" className="w-[30%] border rounded-md mt-5 flex justify-center text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Cancel</a>
        </div>


      </form>

</div>
  )
}

export default ResetPassword
