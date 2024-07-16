import React, { Fragment } from "react";
import { message, Popconfirm, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { userServ } from "../../Services/userService";
import { setDataListUser } from "../../Redux/actions/actionUser";
import { useDispatch } from "react-redux";
export default function UserTable({ dataListUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Loại tài khoản",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        if (text === "ADMIN") {
          return <Tag color="red">ADMIN</Tag>;
        } else {
          return <Tag color="green">Khách</Tag>;
        }
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, user) => {
        return (
          <Fragment>
            <div className="space-x-2">
              <Popconfirm
                title="Dữ liệu sẽ bị xóa?"
                onConfirm={() => {
                  userServ
                    .deleteUser(user.id)
                    .then((res) => {
                      console.log(res);
                      message.success("Xóa thành công");
                      dispatch(setDataListUser());
                    })
                    .catch((err) => {
                      message.error(err.response.data);
                      console.log(err);
                    });
                }}
                okText="Yes"
                cancelText="No"
              >
                <span className="hover:cursor-pointer font-bold text-red-500">
                  Delete
                </span>
              </Popconfirm>
              <span
                onClick={() => {
                  navigate(`/admin/user/edit/${user.id}`);
                }}
                className="hover:cursor-pointer font-bold text-green-500"
              >
                Edit
              </span>
            </div>
          </Fragment>
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataListUser}
      rowKey={(record) => record.id}
    />
  );
}
