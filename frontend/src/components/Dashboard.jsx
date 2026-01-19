import { useEffect, useState } from "react";
import axios from "axios";
import backendUrl from "./BackendUrl";
import { SectionCards } from "@/components/section-cards";
import { UserDataTable } from "@/components/user-data-table";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const Dashboard = () => {
  const [response, setResponse] = useState([]);
  const { user: currentUser } = useUser();

  // Calculate statistics using useMemo for better performance
  const totalUsers = response.length;
  const adminCount = response.filter(
    (user) => user.roles.toLowerCase() === "admin"
  ).length;
  const moderatorCount = response.filter(
    (user) => user.roles.toLowerCase() === "moderator"
  ).length;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/dashboard`, {
          withCredentials: true,
        });
        setResponse(res.data.data.allUser);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "something went wrong");
      }
    };

    fetchDashboardData();
  }, []);

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const res = await axios.patch(
        `${backendUrl}/api/dashboard/edit/${userId}`,
        { editRoles: newRole },
        { withCredentials: true }
      );

      setResponse(res.data.data.allUser);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (
      currentUser &&
      currentUser._id === id &&
      currentUser.roles === "admin"
    ) {
      toast.error("You cannot delete your own account");
      return;
    }

    try {
      const res = await axios.delete(
        `${backendUrl}/api/dashboard/delete/${id}`,
        { withCredentials: true }
      );
      setResponse(res.data.data.allUser);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-4 p-4">
      <SectionCards
        totalUsers={totalUsers}
        adminCount={adminCount}
        moderatorCount={moderatorCount}
      />
      <UserDataTable
        data={response}
        onDelete={handleDelete}
        onUpdateRole={handleUpdateRole}
      />
    </div>
  );
};

export default Dashboard;
