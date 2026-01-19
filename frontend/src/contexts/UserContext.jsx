/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import backendUrl from "../components/BackendUrl";

// Create the User Context
const UserContext = createContext();

// Custom hook to use the User Context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// User Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${backendUrl}/api/current-user`, {
        withCredentials: true,
      });
      setUser(response.data.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Update user data (for profile updates)
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUserData,
    }));
  };

  const logout = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/logout`,
        {},
        { withCredentials: true }
      );
      clearUser();
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Logout failed",
      };
    }
  };

  const clearUser = () => {
    setUser(null);
    setError(null);
  };

  const refreshUser = () => {
    fetchCurrentUser();
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const value = {
    user,
    loading,
    error,
    updateUser,
    clearUser,
    refreshUser,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.roles === "admin",
    isModerator: user?.roles === "moderator",
    isUser: user?.roles === "user",
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
