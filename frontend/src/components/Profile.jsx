import { useEffect, useState } from "react"
import DashboardReuse from "./DashboardReuse"
import backendUrl from "./BackendUrl"
import axios from "axios"

const Profile = () => {

  let [file, setFile] = useState(null)
  const [avatar, setAvatar] = useState("")
  const [showMsg, setShowMsg] = useState("")
  const [showMsgPass, setShowMsgPass] = useState("")
  const [uploading, setUploading] = useState(false)
  const [profileInfoResponse, setProfileInfoResponse] = useState([])

  const [inputFullname , setInputFullname] = useState("")
  const [inputEmail , setInputEmail] = useState("")
  const [currentPass, setCurrentPass] = useState("")  
  const [newPass, setNewPass] = useState("")  
  const [confirmPass, setConfirmPass] = useState("")  


  

  const uploadImage = async(fileAsset) => {
    if(!fileAsset) return null

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file" , fileAsset)
      formData.append("upload_preset",  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

      const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,formData)
      console.log("cloudinary: ", response);
      
      
      if(response.data.secure_url){
        setShowMsg("Image uploaded successfully!")
        return response.data.secure_url
      }

    } catch (error) {
      setShowMsg("Failed to upload image")
      return null
    }
    finally{
      setUploading(false)
    }

  }

  const fetchProfileData = async() => {
        try {
          const res = await axios.get(`${backendUrl}/api/profile`,{withCredentials: true})
          setProfileInfoResponse(res.data.data)
          setInputFullname(res.data.data.fullName)
          setInputEmail(res.data.data.email)
          setAvatar(res.data.data.avatar)

          setShowMsg(res.data.message)
          
        } catch (error) {
          setShowMsg(error.response?.data?.message || "something went wrong")
        }
  }

  useEffect(() => {
    fetchProfileData()
  },[])


  let handleSubmit = async(e) => {
    e.preventDefault()

    try { 
      let cloudinaryUrl = avatar

      //if user select file upload in cloudinary
      if(file){
         cloudinaryUrl = await uploadImage(file) 
         if(!cloudinaryUrl){
          setShowMsg("Failed to upload image. Please try again.")
          return
         }
      }

      //send data to backend
      const res = await axios.post(`${backendUrl}/api/profile/update` , {cloudinaryUrl, inputFullname, inputEmail} , {withCredentials: true})
      setShowMsg(res.data.message || "Profile update successfully")
      setFile(null)
      await fetchProfileData()

    } catch (error) {
      setShowMsg(error.response?.data?.message || "Something went wrong")
    }
  }


  //change password

  let handleChangePassword = async(e) => {
    e.preventDefault()

    if(!newPass || !confirmPass || !currentPass){
        setShowMsgPass("Please fill all fields")
        return
    }
    if(newPass !== confirmPass){
        setShowMsgPass("Password do not match")
        return
    }
    if(newPass.length < 6){
      setShowMsgPass("Password must be at least 6 characters")
      return
    }

    try {
      const res = await axios.post(`${backendUrl}/api/profile/changepassword` , {newPass, currentPass} , {withCredentials: true})
      setShowMsgPass(res.data.message)

    } catch (error) {
      setShowMsgPass(error.response?.data?.message || "something went wrong")
    }

  }
  
  return (
<div>
        <DashboardReuse></DashboardReuse>
<div className="data-panel select-none text-white w-[86.4%] max-h-[92.6vh] min-h-[92.6vh] absolute right-1  top-16 overflow-y-scroll p-3 px-80">



<div className="profile-panel border mt-5 rounded-md p-3 h-auto w-full">

<div className="absolute left-1/2">
{
  showMsg ? 
  <p className="text-yellow-300 mb-2 text-sm mt-3 text-center">
    {showMsg}
  </p> 
  :
  null
} 
</div>

  <h1 className="text-2xl tracking-tighter">Profile Information</h1>
  
  <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-5">
    
   <div className="flex gap-5 items-center ">
     <img src={avatar || "https://res.cloudinary.com/aumcloud003/image/upload/v1765907546/Facebook_Default_Profile_ieizol.jpg"} alt="" className="circle w-40 h-40 rounded-full "/>
    <button className="border relative h-8 rounded-md w-40 flex justify-center items-center">
      <span className="absolute  pointer-events-none">Change Avatar</span>
      <input type="file" accept="image/*" onChange={(e) => {
        const selectedFile = e.target.files[0]
        if(selectedFile){
          setFile(selectedFile) //store actual file
          setAvatar(URL.createObjectURL(selectedFile)) //store preview
        }
      }} className="absolute inset-0 opacity-0 cursor-pointer"/>
    </button>
   </div>

    <div className="flex flex-col gap-2">
       <div className="my-2">
            <label htmlFor="">FullName</label>
            <input value={inputFullname} onChange={(e) => setInputFullname(e.target.value)} type="text"className="w-full rounded-md outline-0 border px-2 py-1" />
       </div>

       <div className="my-2">
            <label htmlFor="">Email</label>
            <input value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} type="email"className="w-full rounded-md outline-0 border px-2 py-1"  />
       </div>

       <div className="my-2">
            <label htmlFor="">Role</label>
            <input disabled value={profileInfoResponse?.roles || ""}  type="text"className="w-full rounded-md outline-0 border px-2 py-1"  />
       </div>
       
      <div>
         <button  type="submit" className="rounded-md px-3 py-1 border my-2 mt-4 cursor-pointer active:scale-[0.9] duration-200">
          {uploading ? "Saving..." : "Save Changes"}
         </button>
      </div>
    </div> 


  </form>

</div>



<div className="password-panel border rounded-md p-3 h-auto w-full mt-13">
<div className="absolute left-1/2">
    {
  showMsgPass ? 
  <p className="text-yellow-300  text-sm mt-3 text-center">
    {showMsgPass}
  </p> 
  :
  null
} 
</div>
  
  <h1 className="text-2xl tracking-tighter">Change Password</h1>
  
  <form onSubmit={handleChangePassword} className="mt-3 flex flex-col gap-5">
    <div className="flex flex-col gap-2">
       <div className="my-2">
            <label htmlFor="">Current Password</label>
            <input value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} type="password"className="w-full rounded-md outline-0 border px-2 py-1" />
       </div>

       <div className="my-2">
            <label htmlFor="">New Password</label>
            <input value={newPass} onChange={(e) => setNewPass(e.target.value)} type="password"className="w-full rounded-md outline-0 border px-2 py-1"  />
       </div>

       <div className="my-2">
            <label htmlFor="">Confirm New Password</label>
            <input value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} type="password"className="w-full rounded-md outline-0 border px-2 py-1"  />
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
