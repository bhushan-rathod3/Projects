import { Menu, Modal, message, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore"; // ✅ Import Dark Mode store
import { useState } from "react";
import { MoonOutlined } from "@ant-design/icons"; // ✅ Use Crescent Moon Icon

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore(); // ✅ Dark Mode State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showLogoutModal = () => setIsModalOpen(true);
  const handleOk = () => {
    logout();
    message.success("Logged out successfully");
    navigate("/login", { replace: true });
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Menu mode="horizontal" style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
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
        </div>

        <div
          style={{
            marginLeft: "auto",
            paddingRight: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <MoonOutlined style={{ fontSize: "18px" }} />
          <Switch checked={isDarkMode} onChange={toggleDarkMode} />
        </div>
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
