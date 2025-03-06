import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { Button, Input, Form, Modal, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
  const { loginMutation } = useAuth();
  const { setToken } = useAuthStore();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, title: "", content: "" });

  const handleLogin = (values: { email: string; password: string }) => {
    if (
      values.email === "admin@dashboard.com" &&
      values.password === "admin123"
    ) {
      setToken("admin-token", true);
      setModal({
        open: true,
        title: "Admin Login Successful",
        content: "Welcome, Admin!",
      });

      setTimeout(() => navigate("/users", { replace: true }), 2000);
      return;
    }

    loginMutation.mutate(values, {
      onSuccess: (data) => {
        setToken(data.token, false);
        setModal({
          open: true,
          title: "Login Successful",
          content: "You have logged in successfully!",
        });

        setTimeout(() => navigate("/users", { replace: true }), 2000);
      },
      onError: (err: any) => {
        setModal({
          open: true,
          title: "Login Failed",
          content: err.response?.data?.error || "Invalid credentials",
        });
      },
    });
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 400,
          margin: "auto",
          marginTop: "4rem",
          padding: "2rem",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
            block
          >
            Login
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Text>Don't have an account? </Text>
          <Text
            type="secondary"
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Text>
        </div>
      </Card>

      <Modal
        title={modal.title}
        open={modal.open}
        onOk={() => setModal({ open: false, title: "", content: "" })}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        {modal.content}
      </Modal>
    </>
  );
};

export default Login;
