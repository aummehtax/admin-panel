import { useState } from "react"
import DashboardReuse from "./DashboardReuse"

const Profile = () => {

  let [avatar, setAvatar] = useState("")
  
  return (
<div>
        <DashboardReuse></DashboardReuse>
<div className="data-panel select-none text-white w-[86.4%] max-h-[92.6vh] min-h-[92.6vh] absolute right-1  top-16 overflow-y-scroll p-3 px-80">

<div className="profile-panel border mt-5 rounded-md p-3 h-auto w-full">

  <h1 className="text-2xl tracking-tighter">Profile Information</h1>
  
  <form className="mt-3 flex flex-col gap-5">
    
   <div className="flex gap-5 items-center ">
     <img src={avatar} alt="" className="circle w-40 h-40 rounded-full border"/>
    <button className="border relative h-8 rounded-md w-40 flex justify-center items-center">
      <span className="absolute  pointer-events-none">Change Avatar</span>
      <input type="file" onChange={(e) => {
        const file = e.target.files[0]
        if(file){
          setAvatar(URL.createObjectURL(file)) //creates temporary url
        }
      }} className="absolute inset-0 opacity-0 cursor-pointer"/>
    </button>
   </div>

    <div className="flex flex-col gap-2">
       <div className="my-2">
            <label htmlFor="">FullName</label>
            <input type="text"className="w-full rounded-md outline-0 border px-2 py-1" />
       </div>

       <div className="my-2">
            <label htmlFor="">Email</label>
            <input type="email"className="w-full rounded-md outline-0 border px-2 py-1"  />
       </div>

       <div className="my-2">
            <label htmlFor="">Role</label>
            <input type="text"className="w-full rounded-md outline-0 border px-2 py-1"  />
       </div>
       
      <div>
         <button type="submit" className="rounded-md px-3 py-1 border my-2 mt-4 cursor-pointer active:scale-[0.9] duration-200">Save Changes</button>
      </div>
    </div> 


  </form>

</div>

<div className="password-panel border rounded-md p-3 h-auto w-full mt-13">

  <h1 className="text-2xl tracking-tighter">Change Password</h1>
  
  <form className="mt-3 flex flex-col gap-5">
    <div className="flex flex-col gap-2">
       <div className="my-2">
            <label htmlFor="">Current Password</label>
            <input type="password"className="w-full rounded-md outline-0 border px-2 py-1" />
       </div>

       <div className="my-2">
            <label htmlFor="">New Password</label>
            <input type="password"className="w-full rounded-md outline-0 border px-2 py-1"  />
       </div>

       <div className="my-2">
            <label htmlFor="">Confirm New Password</label>
            <input type="password"className="w-full rounded-md outline-0 border px-2 py-1"  />
       </div>
       
       <div>
       <button type="submit" className="rounded-md px-3 py-1 border my-2 mt-4 cursor-pointer active:scale-[0.9] duration-200">Save Changes</button>
       </div>
    </div>
  </form>

</div>

</div>

</div>
  )
}

export default Profile
