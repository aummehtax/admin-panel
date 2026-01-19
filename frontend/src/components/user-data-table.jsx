import { useState } from "react"
import { format } from "date-fns"
import { useUser } from "@/contexts/UserContext"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Check, Shield, UserCheck, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react"

export function UserDataTable({ data, onDelete, onUpdateRole }) {
  const { user: currentUser } = useUser()


  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [editingUserId, setEditingUserId] = useState(null)
  const [editRole, setEditRole] = useState("")

  const filteredData = data.filter(user => {
    const matchesSearch = searchTerm === "" ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "All Roles" ||
      user.roles.toLowerCase() === roleFilter.toLowerCase()

    return matchesSearch && matchesRole
  })

  const handleEdit = (user) => {
    // Check if current user is an admin
    if (!currentUser || currentUser.roles !== "admin") {
      toast.error("Only admins can edit user roles")
      return
    }


    if (currentUser._id === user._id) {
      toast.error("You cannot change your own role")
      return
    }

    setEditingUserId(user._id)
    setEditRole(user.roles)
  }

  const handleDeleteConfirm = (userId) => {
    if (onDelete) {
      onDelete(userId)
    }
  }

  const handleSave = () => {
    if (editingUserId && onUpdateRole) {
      onUpdateRole(editingUserId, editRole)
    }
    setEditingUserId(null)
    setEditRole("")
  }

  const handleCancel = () => {
    setEditingUserId(null)
    setEditRole("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Roles">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          List of all users in the system
        </CardDescription>
      </CardHeader>
      <CardContent> 
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead >User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="hidden md:table-cell">Updated At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.fullName} />
                        <AvatarFallback>
                          {user.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium capitalize">{user.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {editingUserId === user._id ? (
                      <Select value={editRole} onValueChange={setEditRole}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant="secondary"
                        className={`flex items-center gap-1 ${
                          user.roles === 'admin'
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : user.roles === 'moderator'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                        } hover:opacity-80`}
                      >
                        {user.roles === 'admin' ? (
                          <Shield className="h-3 w-3" />
                        ) : user.roles === 'moderator' ? (
                          <UserCheck className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        {user.roles.charAt(0).toUpperCase() + user.roles.slice(1)}
                      </Badge>
                    )}
                  </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(user.createdAt), "dd MMM yyyy 'at' h:mm a")}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(user.updatedAt), "dd MMM yyyy 'at' h:mm a")}
                      </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingUserId === user._id ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleSave}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancel}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(user)}
                            disabled={currentUser && currentUser._id === user._id && currentUser.roles === "admin"}
                            title={currentUser && currentUser._id === user._id && currentUser.roles === "admin" ? "You cannot edit your own role" : "Edit user role"}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={currentUser && currentUser._id === user._id && currentUser.roles === "admin"}
                                title={currentUser && currentUser._id === user._id && currentUser.roles === "admin" ? "You cannot delete your own account" : "Delete user"}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the
                                  account for <strong>{user.fullName}</strong> ({user.email}) and remove all associated data.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteConfirm(user._id)} className="bg-destructive  hover:bg-destructive/90">
                                  Delete Account
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </CardContent>
      </Card>
    </div>
  )
}