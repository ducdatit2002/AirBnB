import React, { useState } from "react";
import {
  UserOutlined,
  HomeFilled,
  PayCircleFilled,
  CarFilled,
} from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { localServ } from "../Services/localService";
import { LogOutIcon } from "../Utilities/IconSVG";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<NavLink to="/admin/user">User</NavLink>, "sub1", <UserOutlined />),
  getItem(<NavLink to="/admin/room">Room</NavLink>, "sub2", <HomeFilled />),
  getItem(
    <NavLink to="/admin/position">Position</NavLink>,
    "sub3",
    <CarFilled />
  ),
  getItem(
    <NavLink to="/admin/booked">Booked</NavLink>,
    "sub4",
    <PayCircleFilled />
  ),
  getItem(<NavLink to="/">Home</NavLink>, "sub5", <LogOutIcon />),
];
export default function Admin({ Component }) {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();
  const localUser = localServ.user.get();
  if (localUser?.user.role !== "ADMIN") {
    message.warn("Bạn không đươc phép truy cập vào trang này");
    // setTimeout(() => {
    //   navigate("/");
    // }, 2000);
  }
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <NavLink to="/">
            <img
              src="http://demo1.cybersoft.edu.vn/logo.png"
              className=" p-1"
            />
          </NavLink>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Component />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
