import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState("")

  let handleSubmit = async (e) => {
      e.preventDefault();
      
      const fullName = e.target.fullName.value
      const email = e.target.email.value
      const password = e.target.password.value
      const confirmPassword = e.target.confirmPassword.value

      console.log("Form data:", { fullName, email, password, confirmPassword });

      //validation

      if(!fullName || !email || !password || !confirmPassword){
        setError("All fields are required")
        return
      }

      if(password.length < 6){
        setError("Password must be at least 6 characters long!")
        return
      }

      if(password !== confirmPassword){
           setError("Passwords do not match!")
           return 
      }

      setError("")
      
      //validation


      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("Backend URL:", backendUrl);
        console.log("Full request URL:", `${backendUrl}/api/register`);

        const res = await axios.post(`${backendUrl}/api/register` , {fullName, email, password}, {withCredentials: true})

        console.log("success : ", res.data);

        e.target.reset()
        navigate("/");
        
      } catch (error) {
        setError(error.response?.data?.message || "Registration failed")
      }
      
  }

  return (
    <div className="register text-white w-full min-h-screen flex justify-center items-center select-none">

      <form onSubmit={(e) => handleSubmit(e)} className="rounded-md w-100 h-auto p-3 border">
        <div>
            <h1 className="text-2xl tracking-tighter">Create Account</h1>
            <h1 className="my-1 mb-3 tracking-tight text-gray-300">Enter your details to create your account</h1>
        </div>

        <div className="my-2">
            <label htmlFor="">FullName</label>
            <input name="fullName" type="text"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="John bhai" />
        </div>

        <div className="my-2">
            <label htmlFor="">Email</label>
            <input name="email" type="email"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="example@gmail.com"/>
        </div>

        <div className="my-2">
            <label htmlFor="">Password</label>
            <input name="password" type="password"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="•••••••••" />
        </div>

        <div className="my-2">
            <label htmlFor="">Confirm Password</label>
            <input name="confirmPassword" type="password"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="•••••••••"/>
        </div>

        {
          error ? 
          <p className="text-red-400 mb-2 text-sm">
            {error}
          </p> 
          :
          null
        }

        <button type="submit" className="w-full border rounded-md mt-5 text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Create Account</button>

        <div className="my-2 mt-3 flex justify-center ">
            <a href="/login" className="cursor-pointer ">Already have an account ? Login</a>
        </div>

      </form>

    </div>
  )
}

export default Register
