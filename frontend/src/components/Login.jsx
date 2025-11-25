import axios from "axios"
import { useState } from "react"
import backendUrl from "./BackendUrl"

const Login = () => {

  const [error, setError] = useState("")

  let handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    //validation

    if(!email || !password){
      setError("Email & Password is required")
      return
    }

    if(password.length < 6){
      setError("Password must be at least 6 characters long!")
      return
    }

    setError("")

    //validation

    try {
      const res = await axios.post(`${backendUrl}/api/login`, {email, password} , {withCredentials: true})
      console.log("response : ", res);

      e.target.reset()

      
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed")
    }
  }

  return (
<div className="login text-white w-full min-h-screen flex justify-center items-center select-none">
      
      <form onSubmit={(e) => handleSubmit(e)} action="" className="rounded-md w-100 h-auto p-3 border">
        <div>
            <h1 className="text-2xl tracking-tighter">Login Account</h1>
        </div>

        <div className="my-2">
            <label htmlFor="">Email</label>
            <input name="email" type="email"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="example@gmail.com"/>
        </div>

        <div className="my-2">
            <label htmlFor="">Password</label>
            <input name="password" type="password"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="•••••••••" />
        </div>

        <div className="my-2 mt-3">
            <a href="/forgot-password" className="cursor-pointer ">Forgot Password ?</a>
        </div>

         {
          error ? 
          <p className="text-red-400 mb-2 text-sm">
            {error}
          </p> 
          :
          null
        }

        <button type="submit" className="w-full border rounded-md mt-5 text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Login Account</button>

        <div className="my-2 mt-3 flex justify-center ">
            <a href="/" className="cursor-pointer ">Don't have an account ? Register</a>
        </div>

      </form>

</div>
  )
}

export default Login
