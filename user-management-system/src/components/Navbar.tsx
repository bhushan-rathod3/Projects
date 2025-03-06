import { Menu, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showLogoutModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    logout();
    message.success("Logged out successfully");
    navigate("/login", { replace: true });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home" onClick={() => navigate("/")}>
          Home
        </Menu.Item>
        <Menu.Item key="users" onClick={() => navigate("/users")}>
          Users
        </Menu.Item>
        {isAuthenticated ? (
          <Menu.Item
            key="logout"
            onClick={showLogoutModal}
            style={{ color: "red" }}
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item key="login" onClick={() => navigate("/login")}>
            Login
          </Menu.Item>
        )}
      </Menu>

      <Modal
        title="Confirm Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        Are you sure you want to logout?
      </Modal>
    </>
  );
};

export default Navbar;
