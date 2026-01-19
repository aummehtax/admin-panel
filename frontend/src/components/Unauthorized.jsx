import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Unauthorized = () => {
  const { isAuthenticated, isAdmin, isModerator } = useUser();

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
      </div>
    </div>
  );
};

export default Unauthorized;
