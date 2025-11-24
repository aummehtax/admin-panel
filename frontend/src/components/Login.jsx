
const Login = () => {
  return (
<div className="login text-white w-full min-h-screen flex justify-center items-center select-none">
      
      <form action="" className="rounded-md w-100 h-auto p-3 border">
        <div>
            <h1 className="text-2xl tracking-tighter">Login Account</h1>
        </div>

        <div className="my-2">
            <label htmlFor="">Email</label>
            <input type="email"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="example@gmail.com"/>
        </div>

        <div className="my-2">
            <label htmlFor="">Password</label>
            <input type="password"className="w-full rounded-md outline-0 border px-2 py-1" placeholder="•••••••••" />
        </div>

        <div className="my-2 mt-3">
            <a href="/forgot-password" className="cursor-pointer ">Forgot Password ?</a>
        </div>

        <button type="submit" className="w-full border rounded-md mt-5 text-[18px] cursor-pointer py-2 active:scale-[0.9] duration-200">Login Account</button>

        <div className="my-2 mt-3 flex justify-center ">
            <a href="/register" className="cursor-pointer ">Don't have an account ? Register</a>
        </div>

      </form>

</div>
  )
}

export default Login
