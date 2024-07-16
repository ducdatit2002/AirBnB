import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { NavLink } from "react-router-dom";
import { searchRoom, setDataRoom } from "../../Redux/actions/actionRoom";
import RoomTable from "./RoomTable";
const { Search } = Input;
export default function Room() {
  const { dataRoom } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const [dataSearch, setDataSearch] = useState("");
  useEffect(() => {
    dispatch(setDataRoom());
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(searchRoom(dataSearch));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dataSearch]);
  const onSearch = (e) => {
    setDataSearch(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Quản lý Phòng</h1>
      <div>
        <NavLink to="/admin/addRoom">
          <Button>Thêm phòng</Button>
        </NavLink>
      </div>
      <Search
        placeholder="Nhập id phòng muốn tìm"
        allowClear
        onChange={onSearch}
        style={{
          width: 600,
        }}
        className="py-2"
      />
      <RoomTable dataRoom={dataRoom} />
    </div>
  );
}
