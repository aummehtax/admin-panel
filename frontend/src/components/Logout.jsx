// components/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendUrl from "./BackendUrl";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post(`${backendUrl}/api/logout`, {}, {withCredentials: true});
 
      } catch (error) {
        console.error("Logout failed:", error); 
      } finally {
        navigate("/login");
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="text-white text-center mt-10">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;