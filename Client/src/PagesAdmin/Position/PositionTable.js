import React, { Fragment } from "react";
import { message, Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { positionSer } from "../../Services/positionService";
import { setDataPosition } from "../../Redux/actions/actionPosition";
export default function PositionTable({ dataPosition }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên vị trí",
      dataIndex: "tenViTri",
      key: "tenViTri",
    },
    {
      title: "Tỉnh thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (url) => {
        return <img className="w-80" src={url} alt="imagePosition" />;
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
                  positionSer
                    .deletePosition(item.id)
                    .then((res) => {
                      message.success("Xóa thành công");
                      dispatch(setDataPosition());
                    })
                    .catch((err) => {
                      message.error(err.response.data);
                      console.log(err);
                    });
                }}
              >
                {" "}
                <span className="hover:cursor-pointer font-bold text-red-500">
                  Delete
                </span>
              </Popconfirm>
              <span
                onClick={() => {
                  navigate(`/admin/editPosition/${item.id}`);
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
      dataSource={dataPosition}
      rowKey={(record) => record.id}
    />
  );
}
