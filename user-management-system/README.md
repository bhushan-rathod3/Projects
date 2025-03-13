## Demo Videos

- A demo of the user dashboard, showcasing the regular user functionality.
- [**User View**](https://drive.google.com/file/d/1_PoQSPr16XWk-iTXDZsU_WsN2KFiqx2S/view?usp=sharing)

- A demo of the admin dashboard, showcasing the admin functionality.
- [**Admin View**](https://drive.google.com/file/d/1ZndX9GvZY8U-D7FqixgJLQB9h7MJ-9YT/view?usp=sharing)

  Admin Credentials - 
  id -  admin@dashboard.com
  pass - admin123

- Dark Mode
- [**Dark Mode**](https://drive.google.com/file/d/1F0xJ4lhUm1moD7UUdRnq3pw29V6KBFHs/view?usp=sharing)

# 🛠 User Management System (Admin Dashboard)

This **User Management System** is built with **React, Vite, Zustand, and Ant Design**, using the **ReqRes API** for user data.  
It includes **authentication, user CRUD operations, role-based access (Admin vs. User), search, sorting, pagination**, and partial updates.

---

## 🚀 Features

### ✅ **Authentication System**

- Login & Register using the ReqRes API.
- Admin-only access for **user management** (edit, delete, add users).
- Uses **Zustand** for global state management.

### ✅ **User Management (CRUD)**

- View all users (`GET /users`).
- View user details (`GET /users/{id}`).
- Create new users (`POST /users`).
- Edit user details (`PUT /users/{id}`).
- Delete users (`DELETE /users/{id}`).

### ✅ **Additional Features**

- 🔎 **Search & Sort Users** (by name, ascending/descending).
- 📄 **Pagination for better UX**.
- 🎭 **Role-Based Access System** (Admin vs. Regular Users).
- 🌙 **Dark-Mode**
