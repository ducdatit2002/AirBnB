import React, { useState, useEffect } from "react";
import "./header.css";
import {
  AirBnbLogo,
  LoginIcon,
  LogOutIcon,
  MenuHidden,
} from "../../Utilities/IconSVG";
import { AutoComplete, Modal, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { localLike, localServ } from "../../Services/localService";
import LoginSign from "../../PagesUser/LoginSign/LoginSign";
import { positionSer } from "../../Services/positionService";
export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  let { user: userInfo } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [dataSearch, setDataSearch] = useState("");
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    positionSer
      .getPosition()
      .then((res) => {
        let newData = res.data.content.map((item) => {
          return {
            value: item.tinhThanh,
            key: item.id,
          };
        });
        setDataSearch(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let prevScrollpos = window.pageYOffset;
  const toggleVisible = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    prevScrollpos = currentScrollPos;
  };
  window.addEventListener("scroll", toggleVisible);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSelect = (value, data) => {
    navigate(`/detail/${data.key}`);
  };
  const confirm = (e) => {
    localServ.user.remove();
    localLike.like.remove();
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const menu = (
    <Menu
      items={[
        {
          label:
            userInfo &&
            (userInfo.user.role === "ADMIN" ? (
              <Link to={"/admin"}>
                <span className="font-semibold text-blue-500 hover:text-blue-700 duration-300">
                  Dành cho Amin
                </span>
              </Link>
            ) : (
              <Link to={"/"}>
                <span className="font-semibold text-blue-500 hover:text-blue-700 duration-300">
                  Xin chào {userInfo.user.name}
                </span>
              </Link>
            )),
          key: "0",
        },
        {
          label: <Link to={"/userInfo"}>Thông tin</Link>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Popconfirm
              title="Dữ liệu like room sẽ bị xóa?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <a className="font-semibold">
                <LogOutIcon />
              </a>
            </Popconfirm>
          ),
          key: "3",
        },
      ]}
    />
  );
  const menu_hidden = (
    <Menu
      items={[
        {
          label: (
            <a
              onClick={() => {
                setIsModalOpen(true);
                setIsLogin(true);
              }}
            >
              Sign up
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a
              onClick={() => {
                setIsModalOpen(true);
                setIsLogin(false);
              }}
            >
              Đăng ký
            </a>
          ),
          key: "1",
        },
      ]}
    />
  );
  return (
    <header
      style={{ display: visible ? "inline" : "none" }}
      className=" text-gray-800 w-full shadow fixed z-10"
    >
      <div className="container flex items-center justify-between h-16 mx-auto">
        <Modal
          destroyOnClose
          footer={false}
          open={isModalOpen}
          onCancel={handleCancel}
        >
          <LoginSign isLogin={isLogin} />
        </Modal>
        <Link
          to={"/"}
          className="text-red-500 hover:text-blue-500 duration-300"
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
        >
          <AirBnbLogo />
        </Link>
        <AutoComplete
          onSelect={onSelect}
          size="large"
          style={{
            width: 300,
          }}
          allowClear
          options={dataSearch}
          placeholder="Nhập địa điểm cần đến"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <div className="items-center flex-shrink-0">
          {userInfo ? (
            <>
              <Dropdown trigger={["hover"]} overlay={menu}>
                <Space>
                  <img
                    className="w-10 h-12 rounded-full"
                    src={
                      userInfo.user.avatar
                        ? userInfo.user.avatar
                        : "https://i.pravatar.cc/100"
                    }
                    alt="avatar"
                  />
                  <DownOutlined />
                </Space>
              </Dropdown>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsLogin(false);
                }}
                className="self-center text-lg font-bold hidden lg:inline-block text-gray-100 hover:text-red-500 duration-300 px-8 py-3 rounded"
              >
                Đăng ký 
              </button>{" "}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsLogin(true);
                }}
                className="self-center p-3 hidden lg:inline-block font-semibold rounded text-gray-100 bg-red-500 hover:bg-blue-500 duration-500"
              >
                <LoginIcon />
              </button>
            </>
          )}
        </div>
        {userInfo ? (
          ""
        ) : (
          <button className="p-4 lg:hidden">
            <Dropdown trigger={["hover"]} overlay={menu_hidden}>
              <Space>
                <MenuHidden />
              </Space>
            </Dropdown>
          </button>
        )}
      </div>
    </header>
  );
}



