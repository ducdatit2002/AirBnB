import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
import { NavLink } from "react-router-dom";
import PositionTable from "./PositionTable";
import {
  searchPostion,
  setDataPosition,
} from "../../Redux/actions/actionPosition";
const { Search } = Input;
export default function Position() {
  const { dataPosition } = useSelector((state) => state.positionReducer);
  const dispatch = useDispatch();
  const [dataSearch, setDataSearch] = useState("");
  useEffect(() => {
    dispatch(setDataPosition());
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(searchPostion(dataSearch));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dataSearch]);

  const onSearch = (e) => {
    setDataSearch(e.target.value);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl">Quản lý Vị Trí</h1>
      <div>
        <NavLink to="/admin/addPosition">
          <Button>Thêm vị trí</Button>
        </NavLink>
      </div>
      <Search
        placeholder="Nhập id vị trí"
        allowClear
        onChange={onSearch}
        style={{
          width: 600,
        }}
        className="py-2"
      />
      <PositionTable dataPosition={dataPosition} />
    </div>
  );
}
