import { message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userServ } from "../../Services/userService";
export default function Avatar() {
  let { user } = useSelector((state) => state.userReducer);
  const [imgURL, setImgURL] = useState(user.user.avatar);
  const onChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("load", () => {
      return setImgURL(reader.result);
    });
    let newData = {
      formFile: e.target.files[0],
    };
    const formData = new FormData();
    for (const key in newData) {
      formData.append(key, newData[key]);
    }
    userServ
      .postAvatar(formData)
      .then((res) => {
        message.success("Avatar đã được cập nhật, xin hãy đăng nhập lại");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>Thay đổi avatar</p>
      <input className="my-2" onChange={onChange} type="file" />
      <br />
      {imgURL ? <img className="h-32" src={imgURL} alt="avatar" /> : ""}
    </div>
  );
}
