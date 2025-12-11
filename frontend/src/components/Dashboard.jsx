import { useEffect, useState } from "react";
import DashboardReuse from "./DashboardReuse"
import axios from "axios";
import backendUrl from "./BackendUrl";

const Dashboard = () => {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Roles");
  const [searchValue , setSearchValue] = useState("")
  const [showMsg, setShowMsg] = useState("")
  const options = ["All Roles", "Admin", "Moderator", "User"];

  const [response, setResponse] = useState([])
  const [adminCount, setAdminCount] = useState(0)
  const [totalUser , setTotalUser] = useState(0)
  
  useEffect(() => {
   const fetchDashboardData = async() => {
      try {
        const res = await axios.get(`${backendUrl}/api/dashboard`,{withCredentials: true})
        setResponse(res.data.data.allUser)
        setShowMsg(res.data.message)

      } catch (error) {
        setShowMsg(error.response?.data?.message || "invalid")
      }
   }

   fetchDashboardData()
  },[])

  //for total users & admin
  useEffect(() => {
      if(response && response.length > 0){
        setTotalUser(response.length)

        const adminMatch = response.filter(user => user.roles.toLowerCase() === "admin")
        setAdminCount(adminMatch.length)
      }
  },[response])

  const filterUsers = response.filter((user) => {

    const matchesSearch = searchValue === "" || user.fullName.toLowerCase().includes(searchValue.toLowerCase())

    const matchesRoles = selected === "All Roles" || user.roles.toLowerCase() === selected.toLowerCase()

    return matchesRoles && matchesSearch
  })


  return (
<div>

<DashboardReuse></DashboardReuse>
<div className="data-panel select-none text-white w-[86.4%] max-h-[92.6vh] min-h-[92.6vh] absolute right-1  top-16 overflow-y-scroll p-3">
        
        <div className="flex gap-4">
            <div className="box border w-[20%] p-2 rounded-md flex flex-col gap-5">
            <div className="flex justify-between">
                <h1 className="text-2xl tracking-tight">Total Users</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b9b8f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <h1 className="text-3xl tracking-tight text-zinc-100">{totalUser}</h1>
        </div>
        
        <div className="box border w-[20%] p-2 rounded-md flex flex-col gap-5">
            <div className="flex justify-between">
                <h1 className="text-2xl tracking-tight">Admin Count</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b9b8f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-icon lucide-shield"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
            </div>
            <h1 className="text-3xl tracking-tight text-zinc-100">{adminCount}</h1>
        </div>
        </div>

        <div className="search-and-select mt-10 flex gap-4">

          <div>
            <div className="relative">
                    <input value={searchValue} onChange={(e) => {setSearchValue(e.target.value) , filterUsers}} type="text"className="border w-90 h-9 rounded-md p-2 ps-8 outline-0" placeholder="Search users..." />
                <div className="absolute top-2 left-2  w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
                </div>
            </div>
          </div>

          <div>
              <div className="relative w-40">
                    
                    <div onClick={() => setOpen(!open)} className="border h-9 rounded-md p-2 cursor-pointer  flex justify-between items-center" >
                        <span>{selected}</span>
                        <span>
                            {
                                open ?
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                            }
                        </span>
                    </div>

                    {/* dropdown options */}
                    {open && (
                        <div className="absolute bg-[#5052b4] text-white top-10 left-0 w-full border rounded-md shadow-md z-50">
                        {options.map((item) => (
                            <div key={item} onClick={() => { setSelected(item); setOpen(false);}} className="p-2 hover:bg-[#a3a0f08f] cursor-pointer">
                            {item}
                            </div>
                        ))}
                        </div>
                    )}
              </div>
          </div>

        
        </div>

        <div className="data-view w-full h-auto border border-b-0 rounded-md mt-7 "> 

          <div className="data-nav flex justify-between font-bold    w-full h-10 border-b p-3">
            <div className="w-[150px]">Name</div>
            <div className="w-[250px]">Email</div>
            <div className="w-[120px]">Role</div>
            <div className="w-[150px]">Created At</div>
            <div className="w-[150px]">Actions</div>
          </div>
          
          

          <div className="w-full h-auto flex flex-col">
                  {
                    filterUsers && filterUsers.length > 0 ? 
                    filterUsers.map((element, index) => (
                      <div key={element._id || index} className="flex justify-between border-b rounded-b-md p-3 hover:bg-[#9492df8f]">
                        <div className="w-[150px]">{element.fullName}</div>
                        <div className="w-[250px]">{element.email}</div>
                        <div className="w-[120px]">{element.roles}</div>
                        <div className="w-[150px]">
                          {new Date(element.createdAt).toLocaleDateString('en-GB')}
                        </div>
                        <div className="w-[150px] flex gap-6">
                          <div className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-pen">
                              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                            </svg>
                          </div>
                          <div className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash">
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                              <path d="M3 6h18"/>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                    :
                    <div className="text-center p-4 text-gray-400">No users found</div>
                  }
            </div>
            

         

        </div>

        {
          showMsg ? 
          <p className="text-yellow-300 mb-2 text-sm mt-3 text-center">
            {showMsg}
          </p> 
          :
          null
        }

</div>


</div>
  )
}

export default Dashboard
