
const DashboardReuse = () => {
  return (
<div className="dashboardReuse text-white relative w-full min-h-screen select-none">
      <div className="navbar w-full h-15 border-b"></div>

      <div className="sideBar flex flex-col border-r absolute w-63 h-full top-0 pt-15">
          <a href="/dashboard" className="border m-3 px-2 py-2 rounded-md active:scale-[0.9] duration-200 cursor-pointer">Dashboard</a>
          <a href="/profile" className="border m-3 px-2 py-2 rounded-md active:scale-[0.9] duration-200 cursor-pointer">Profile</a>
      </div>
</div>
  )
}

export default DashboardReuse
