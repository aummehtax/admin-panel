import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import backendUrl from './BackendUrl'
import { Navigate, Outlet } from "react-router-dom"
import LoadingSpinner from './LoadingSpinner'

const PublicRoutes = () => {
  const [isAuthenticated, setAuthenticated] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
        try {
            await axios.get(`${backendUrl}/api/current-user`, {withCredentials: true})
            setAuthenticated(true)
        } catch {
            setAuthenticated(false)
        }
    }

    checkAuth()
  }, [])

 
  if(isAuthenticated === null){
    return <LoadingSpinner message="Checking authentication..." />
  }

  if(isAuthenticated){
    return <Navigate to="/dashboard" replace />
  }


  return <Outlet />
}

export default PublicRoutes