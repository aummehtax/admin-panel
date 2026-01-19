import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import backendUrl from './BackendUrl'
import { Navigate, Outlet } from "react-router-dom"
import LoadingSpinner from './LoadingSpinner'

const ProtectedRoutes = ({requiredRole}) => {  
  const [isAuthenticated, setAuthenticated] = useState(null)
  const [userRole , setUserRole] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/current-user`, {withCredentials: true})

            setAuthenticated(true)
            setUserRole(res.data.data.user.roles) 
            

        } catch (error) {
            console.error("Authentication failed : ", error); 
            setAuthenticated(false)  
        }
    }

    checkAuth()
  }, [])


  if(isAuthenticated === null){
    return <LoadingSpinner message="Verifying access..." />
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace></Navigate>
  }

  if(requiredRole && !requiredRole.includes(userRole)){

    return <Navigate to="/unauthorized" replace></Navigate>
  }


return <Outlet />;

}

export default ProtectedRoutes
