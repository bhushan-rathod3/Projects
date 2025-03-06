import {
  Table,
  Button,
  Input,
  Space,
  message,
  Popconfirm,
  Spin,
  Alert,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser, User } from "../api/users";
import { useState, useReducer } from "react";

// Pagination & Sorting State
const reducer = (
  state: { page: number; sort: string },
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};

const Users = () => {
  const [search, setSearch] = useState("");
  const [state, dispatch] = useReducer(reducer, { page: 1, sort: "asc" });

  const queryClient = useQueryClient();

  // Fetch Users
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", state.page],
    queryFn: () => getUsers(state.page),
  });

  // Delete User Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      message.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      message.error("Failed to delete user");
    },
  });

  if (isLoading) return <Spin />;
  if (isError) return <Alert message="Error fetching users" type="error" />;

  // Filter Users Based on Search
  const filteredUsers = data?.data.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      <Space style={{ marginBottom: "16px" }}>
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Button
          onClick={() =>
            dispatch({
              type: "SET_SORT",
              payload: state.sort === "asc" ? "desc" : "asc",
            })
          }
        >
          Sort: {state.sort === "asc" ? "Ascending" : "Descending"}
        </Button>
      </Space>

      <Table
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{
          current: state.page,
          total: data?.total,
          pageSize: data?.per_page,
          onChange: (page) => dispatch({ type: "SET_PAGE", payload: page }),
        }}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (url: string) => (
              <img
                src={url}
                alt="avatar"
                style={{ width: 50, borderRadius: "50%" }}
              />
            ),
          },
          {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
            sorter: (a, b) =>
              state.sort === "asc"
                ? a.first_name.localeCompare(b.first_name)
                : b.first_name.localeCompare(a.first_name),
          },
          {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Actions",
            key: "actions",
            render: (_: any, record: User) => (
              <Space>
                <Button type="link" href={`/users/${record.id}`}>
                  View
                </Button>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => deleteMutation.mutate(record.id)}
                >
                  <Button type="link" danger loading={deleteMutation.isPending}>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Users;
