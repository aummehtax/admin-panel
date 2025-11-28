import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import backendUrl from './BackendUrl'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children , requiredRole}) => {  
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
    return <div className="text-white text-center mt-10">Loading...</div>
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace></Navigate>
  }

  if(requiredRole && !requiredRole.includes(userRole)){

    return <Navigate to="/unauthorized" replace></Navigate>
  }


  return children

}

export default ProtectedRoutes
