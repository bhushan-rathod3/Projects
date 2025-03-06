import { useUsers } from "../hooks/useUsers";
import { CreateUserPayload } from "../types/user";
import { Form, Input, Button, Typography, notification, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Title } = Typography;

const UserForm = () => {
  const { createUserMutation } = useUsers(1);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const onFinish = (values: CreateUserPayload) => {
    createUserMutation.mutate(
      { ...values, avatar: "" },
      {
        onSuccess: () => {
          notification.success({
            message: "User Created",
            description: "User added successfully!",
            duration: 2,
          });

          setIsSuccess(true);

          setTimeout(() => {
            navigate("/users");
          }, 2000);
        },
        onError: () => {
          notification.error({
            message: "User Creation Failed",
            description: "Something went wrong",
            duration: 3,
          });
        },
      }
    );
  };

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: "2rem",
        marginTop: "4rem",
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        Create User
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input disabled={isSuccess} />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input disabled={isSuccess} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input disabled={isSuccess} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createUserMutation.isPending}
            block
            disabled={isSuccess}
          >
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;
