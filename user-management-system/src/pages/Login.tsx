import { useAuth } from "../hooks/useAuth";
import { register } from "../api/auth";
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
  const [showRegister, setShowRegister] = useState(false);
  const [form] = Form.useForm();

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

  const handleRegister = (values: { email: string; password: string }) => {
    register(values.email, values.password)
      .then(() => {
        setModal({
          open: true,
          title: "Registration Successful",
          content:
            "Your account has been created successfully! You can now log in.",
        });

        form.resetFields();
        setShowRegister(false);
      })
      .catch(() => {
        setModal({
          open: true,
          title: "Registration Failed",
          content: "Could not create an account. Please try again.",
        });
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
          {showRegister ? "Register" : "Login"}
        </Title>

        <Form
          layout="vertical"
          form={form}
          onFinish={showRegister ? handleRegister : handleLogin}
        >
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
          <Button type="primary" htmlType="submit" block>
            {showRegister ? "Register" : "Login"}
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          {showRegister ? (
            <>
              <Text>Already have an account? </Text>
              <Text
                type="secondary"
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={() => {
                  form.resetFields();
                  setShowRegister(false);
                }}
              >
                Login
              </Text>
            </>
          ) : (
            <>
              <Text>Don't have an account? </Text>
              <Text
                type="secondary"
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={() => {
                  form.resetFields();
                  setShowRegister(true);
                }}
              >
                Register
              </Text>
            </>
          )}
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
