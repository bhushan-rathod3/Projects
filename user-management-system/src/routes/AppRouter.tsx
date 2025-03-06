import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Login from "../pages/Login";
import Users from "../pages/Users";
import UserForm from "../pages/UserForm";
import UserDetails from "../pages/UserDetails";

const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/users" : "/login"} replace />
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/users" replace /> : <Login />}
      />
      {isAuthenticated ? (
        <>
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default AppRouter;
