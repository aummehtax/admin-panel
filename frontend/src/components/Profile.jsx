import { useEffect, useState } from "react";
import backendUrl from "./BackendUrl";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const Profile = () => {
  let [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false);
  const [profileInfoResponse, setProfileInfoResponse] = useState([]);

  const [inputFullname, setInputFullname] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const uploadImage = async (fileAsset) => {
    if (!fileAsset) return null;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", fileAsset);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        toast.success("Image uploaded successfully!");
        return response.data.secure_url;
      }
    } catch {
      toast.error("Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/profile`, {
        withCredentials: true,
      });
      setProfileInfoResponse(res.data.data);
      setInputFullname(res.data.data.fullName);
      setInputEmail(res.data.data.email);
      setAvatar(res.data.data.avatar);

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let cloudinaryUrl = avatar;

      //if user select file upload in cloudinary
      if (file) {
        cloudinaryUrl = await uploadImage(file);
        if (!cloudinaryUrl) {
          toast.error("Failed to upload image. Please try again.");
          return;
        }
      }

      //send data to backend
      const res = await axios.post(
        `${backendUrl}/api/profile/update`,
        { cloudinaryUrl, inputFullname, inputEmail },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Profile update successfully");
      setFile(null);
      await fetchProfileData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  //change password

  let handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPass || !confirmPass || !currentPass) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Password do not match");
      return;
    }
    if (newPass.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/profile/changepassword`,
        { newPass, currentPass },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={avatar || profileInfoResponse?.avatar}
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {profileInfoResponse?.fullName?.charAt(0).toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  📷
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                      setAvatar(URL.createObjectURL(selectedFile));
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Profile Picture</p>
                <p className="text-xs text-muted-foreground">
                  Click the camera icon to change your avatar
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  value={inputFullname}
                  onChange={(e) => setInputFullname(e.target.value)}
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  disabled
                  value={profileInfoResponse?.roles || ""}
                  type="text"
                  className="bg-muted"
                />
              </div>
            </div>

            <Button type="submit" disabled={uploading}>
              {uploading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Change Section */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  type="password"
                  placeholder="Enter current password"
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  value={newPass}
                  autoComplete="off"
                  onChange={(e) => setNewPass(e.target.value)}
                  type="password"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  value={confirmPass}
                  autoComplete="off"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
