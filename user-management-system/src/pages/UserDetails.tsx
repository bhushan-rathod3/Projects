import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Form, message, Result } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api/users";
import { useUpdateUser } from "../hooks/useUsers";
import { User } from "../types";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const updateUserMutation = useUpdateUser();

  const {
    data: user,
    isPending,
    isError,
  } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUserById(Number(id)),
    enabled: !!id,
  });

  const onFinish = (values: Partial<User>) => {
    updateUserMutation.mutate(
      { id: Number(id), user: values },
      {
        onSuccess: () => {
          message.success("User updated successfully!");
          navigate("/users");
        },
        onError: () => {
          message.error("Failed to update user");
        },
      }
    );
  };

  if (isPending) return <p>Loading...</p>;
  if (isError || !user)
    return (
      <Result
        status="404"
        title="User Not Found"
        subTitle="Sorry, this user does not exist."
      />
    );

  return (
    <Form layout="vertical" onFinish={onFinish} initialValues={user}>
      <Form.Item label="First Name" name="first_name">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="last_name">
        <Input />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={updateUserMutation.isPending}
      >
        Update User
      </Button>
    </Form>
  );
};

export default UserDetails;
