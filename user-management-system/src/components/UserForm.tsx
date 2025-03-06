import { useForm } from "react-hook-form";
import { User } from "../types";
import { Button, Input, Form } from "antd";

type Props = {
  initialValues?: Partial<User>;
  onSubmit: (values: Omit<User, "id">) => void;
};

const UserForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const { register, handleSubmit } = useForm<Omit<User, "id">>({
    defaultValues: initialValues,
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Name">
        <Input
          {...register("first_name", { required: true })}
          placeholder="First Name"
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UserForm;
