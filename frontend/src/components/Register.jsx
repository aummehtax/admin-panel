import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import backendUrl from "./BackendUrl";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"


const Register = () => {
  const navigate = useNavigate()
  const [showMsg, setShowMsg] = useState("")

  let handleSubmit = async (e) => {
      e.preventDefault();
      
      const fullName = e.target.fullName.value
      const email = e.target.email.value
      const password = e.target.password.value
      const confirmPassword = e.target.confirmPassword.value

      // console.log("Form data:", { fullName, email, password, confirmPassword });

      //validation

      if(!fullName || !email || !password || !confirmPassword){
        setShowMsg("All fields are required")
        return
      }

      if(password.length < 6){
        setShowMsg("Password must be at least 6 characters long!")
        return
      }

      if(password !== confirmPassword){
           setShowMsg("Passwords do not match!")
           return 
      }

      setShowMsg("")
      
      //validation


      try {
        

        const res = await axios.post(`${backendUrl}/api/register` , {fullName, email, password}, {withCredentials: true})

        setShowMsg(res.data.message || "Account created successfully")

        e.target.reset()
        navigate("/login");
        
      } catch (error) {
        setShowMsg(error.response?.data?.message || "Registration failed")
      }  
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                required
              />
            </div>

            {showMsg && (
              <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  {showMsg}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
