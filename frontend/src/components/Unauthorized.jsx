import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Unauthorized = () => {
  const { isAuthenticated, isAdmin, isModerator, logout } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && (isAdmin || isModerator)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">⛔</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          Only admin and moderator users can access this area.
        </p>
        <p className="text-sm text-gray-500">
          Please contact an administrator if you believe this is an error.
        </p>
        <Button
          variant="destructive"
          className="w-full mt-4 hover:scale-105 transition-all duration-300"
          onClick={logout}
        >
          <LogOut className="size-4 mr-2" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
