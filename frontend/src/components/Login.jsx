import axios from "axios";
import { useState } from "react";
import backendUrl from "./BackendUrl";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const Login = () => {
  let navigate = useNavigate();
  const { refreshUser } = useUser();
  const [showMsg, setShowMsg] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // validation

    if (!email || !password) {
      setShowMsg("Email & Password is required");
      return;
    }

    if (password.length < 6) {
      setShowMsg("Password must be at least 6 characters long!");
      return;
    }

    setShowMsg("");

    //validation

    try {
      const res = await axios.post(
        `${backendUrl}/api/login`,
        { email, password },
        { withCredentials: true }
      );

      setShowMsg(res.data.message);

      // Update user context with fresh data
      await refreshUser();

      e.target.reset();

      if (
        res.data.data.user.roles === "admin" ||
        res.data.data.user.roles === "moderator"
      ) {
        toast.success("admin/moderator logged in successfully");
        navigate("/dashboard");
      }
      if (res.data.data.user.roles === "user") {
        toast.success("user logged in successfully");
        navigate("/unauthorized");
      }
    } catch (error) {
      console.log(error);

      setShowMsg(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
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
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {showMsg && (
              <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                  {showMsg}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
              </span>
              <a
                href="/"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
