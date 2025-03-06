import { Table, Button } from "antd";
import { User } from "../types";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "first_name", key: "first_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: User) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button onClick={() => onDelete(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return <Table dataSource={users} columns={columns} rowKey="id" />;
};

export default UserTable;
