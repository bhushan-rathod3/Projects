import { useReducer, useState } from "react";
import {
  Table,
  Button,
  message,
  Pagination,
  Avatar,
  Space,
  Popconfirm,
  Input,
  Select,
  Spin,
} from "antd";
import { useUsers } from "../hooks/useUsers";
import { useDelayedResponse } from "../hooks/useDelayedResponse";
import { useAuthStore } from "../store/authStore";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface UsersState {
  currentPage: number;
  searchQuery: string;
  sortOrder: "asc" | "desc" | null;
}

type UsersAction =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: "asc" | "desc" | null };

const reducer = (state: UsersState, action: UsersAction): UsersState => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_SORT":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
};

const initialState: UsersState = {
  currentPage: 1,
  searchQuery: "",
  sortOrder: null,
};

const Users = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isLoading, isError, deleteUserMutation } = useUsers(
    state.currentPage
  );
  const { isLoading: isDelayedLoading } = useDelayedResponse();
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  if (isError) {
    message.error("Failed to load users");
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    dispatch({ type: "SET_SEARCH", payload: value });
    if (!data?.data) return;
    setFilteredUsers(
      data.data.filter(
        (user: User) =>
          user.first_name.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value)
      )
    );
  };

  const handleSortChange = (order: "asc" | "desc" | null) => {
    dispatch({ type: "SET_SORT", payload: order });
  };

  const sortedUsers = [
    ...(state.searchQuery ? filteredUsers : data?.data || []),
  ].sort((a, b) => {
    if (!state.sortOrder) return 0;
    return state.sortOrder === "asc"
      ? a.first_name.localeCompare(b.first_name)
      : b.first_name.localeCompare(a.first_name);
  });

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => <Avatar src={avatar} size="large" />,
    },
    { title: "Name", dataIndex: "first_name", key: "first_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space>
          {isAdmin && (
            <Button
              onClick={() => navigate(`/users/${record.id}`)}
              type="primary"
              icon={<EditOutlined />}
            />
          )}
          {isAdmin && (
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => deleteUserMutation.mutate(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      {isAdmin && (
        <Button
          type="primary"
          onClick={() => navigate("/users/new")}
          style={{ marginBottom: "1rem" }}
        >
          Add User
        </Button>
      )}

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Input
          placeholder="Search Users"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ width: "50%" }}
        />
        <Select
          defaultValue=""
          style={{ width: 150 }}
          onChange={(value) => handleSortChange(value as "asc" | "desc" | null)}
          options={[
            { value: "", label: "Sort by Name" },
            { value: "asc", label: "A → Z" },
            { value: "desc", label: "Z → A" },
          ]}
        />
      </div>

      {isDelayedLoading && (
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}

      <Table
        columns={columns}
        dataSource={sortedUsers}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        bordered
      />
      <Pagination
        current={state.currentPage}
        total={data?.total}
        pageSize={data?.per_page || 6}
        onChange={(page) => dispatch({ type: "SET_PAGE", payload: page })}
        style={{ marginTop: "1rem", textAlign: "center" }}
      />
    </div>
  );
};

export default Users;
