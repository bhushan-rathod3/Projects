import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import useAuthStore from "../../store/authStore";
import { Button, Form, Input, message } from "antd";

interface RegisterFormValues {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await register(data);
      if (response && response.data.token) {
        setToken(response.data.token);
        navigate("/users");
      } else {
        message.error("Registration failed: Token not received");
      }
    } catch (error: any) {
      message.error(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input {...register("email")} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password {...register("password")} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
