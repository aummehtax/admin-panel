# 🔐 Admin Panel (MERN Stack)

> ⚠️ **Note:**  
> This project uses a **simple UI** and is **not responsive**.  
> The primary focus of this project is the **backend implementation**.  
> The backend follows **industry-standard practices** with a **professional folder structure**, proper authentication, authorization, and role-based access control.


### 🧪 Moderator Login Credentials (For Testing)
Use the following credentials to access and test the admin panel:

Email: **testing@gmail.com**  
Password: **testing123**

---

## 📌 About Admin Panel

This is a **role-based Admin Panel** built using the **MERN stack**.  
Access is restricted to **Admins** and **Moderators** only.  
These test credentials are provided so others can log in and verify that the admin panel is working.

---

## 🚀 Features

- Role-based access control (RBAC)
- Admin & Moderator authentication
- Admin can edit user roles and delete users
- Moderator can delete normal users and other moderators
- Moderator cannot edit roles
- Moderator cannot delete Admin accounts
- JWT-based authentication
- Forgot password using **Nodemailer**
- OTP-based password reset via email
- Protected frontend and backend routes
- Deployed on **Vercel** (Frontend & Backend)
- Database hosted on **MongoDB Atlas**

---

### 🛡️ Admin
- Access admin panel
- Edit roles of **any user**
- Delete **any user**
- Full system control

### 🧹 Moderator
- Access admin panel
- Delete **normal users**
- Delete **other moderators**
- ❌ Cannot edit user roles
- ❌ Cannot delete Admin accounts

### 🚫 Normal User
- ❌ No access to admin panel

---

## 🔑 Permission Matrix

| Action                     | Admin | Moderator | User |
|----------------------------|-------|-----------|------|
| Access Admin Panel         | ✅    | ✅        | ❌   |
| Edit User Roles            | ✅    | ❌        | ❌   |
| Delete Normal Users        | ✅    | ✅        | ❌   |
| Delete Moderator           | ✅    | ✅        | ❌   |
| Delete Admin               | ❌    | ❌        | ❌   |
