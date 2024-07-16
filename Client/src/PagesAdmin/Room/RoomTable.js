import React, { Fragment } from "react";
import { message, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { roomServ } from "../../Services/roomService";
import { setDataRoom } from "../../Redux/actions/actionRoom";
export default function RoomTable({ dataRoom }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
    },
    {
      title: "Mã vị trí",
      dataIndex: "maViTri",
      key: "maViTri",
    },
    {
      title: "Giá tiền",
      dataIndex: "giaTien",
      key: "giaTien",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (url) => {
        return <img className="w-80" src={url} alt="image" />;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, item) => {
        return (
          <Fragment>
            <div className="space-x-2">
              <Popconfirm
                title="Dữ liệu sẽ bị xóa?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  roomServ
                    .deleteRoom(item.id)
                    .then((res) => {
                      message.success("Xóa thành công");
                      dispatch(setDataRoom());
                    })
                    .catch((err) => {
                      message.error(err.response.data);
                      console.log(err);
                    });
                }}
              >
                <span className="hover:cursor-pointer font-bold text-red-500">
                  Delete
                </span>
              </Popconfirm>
              <span
                onClick={() => {
                  navigate(`/admin/editRoom/${item.id}`);
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
      dataSource={dataRoom}
      rowKey={(record) => record.id}
    />
  );
}
