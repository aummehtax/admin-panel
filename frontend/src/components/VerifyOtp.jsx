import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import backendUrl from './BackendUrl';

const VerifyOtp = () => {
    let navigate = useNavigate()
    let location = useLocation()
    const userId = location.state?.userId

    const [otp, setOtp] = useState('');
    const [showMsg, setShowMsg] = useState("") 

  let handleSubmit = async (e) => {
    e.preventDefault()

    if(!otp){
      setShowMsg("OTP invalid")
      return
    }

    setShowMsg("")
    
   try {
      const res = await axios.post(`${backendUrl}/api/verify-otp`, {userId, otp})

      setShowMsg(res.data.message)

      navigate("/reset-password", {state: {userId: res.data.data.userId}})
      
    } catch (error) {
      setShowMsg(error.response?.data?.message || "OTP invalid")
    }

  }

  return (
<div className="verifyOtp text-white w-full min-h-screen flex justify-center items-center select-none">
      
      <form onSubmit={(e) => handleSubmit(e)} action=""  className="rounded-md w-100 h-auto p-3 border">
        <div>
            <h1 className="text-2xl tracking-tighter">Reset Password</h1>
            <h1 className="my-1 mb-3 tracking-tight text-gray-300">Enter the verification code sent to your email</h1>
        </div>

       <div className='flex justify-start'>
         <div className='flex justify-center border w-33 py-1 rounded-md '>
  
        <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />} />
        </div>
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

            <button type="submit" className="w-[70%] border rounded-md mt-5 text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Verify Otp</button>

            <a href="/forgot-password" className="w-[30%] border rounded-md mt-5 flex justify-center text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Cancel</a>
        </div>


      </form>

</div>
  )
}

export default VerifyOtp
