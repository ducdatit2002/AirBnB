import React, { useState } from "react";
import { Rate, Input, message } from "antd";
import { useSelector } from "react-redux";
import { roomServ } from "../../Services/roomService";
const { TextArea } = Input;
const today = new Date();
const date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
const initialization = {
  ngayBinhLuan: date,
  noiDung: "",
  saoBinhLuan: 3,
};
export default function AddComment({ idRoom }) {
  let { user:userInfo } = useSelector((state) => state.userReducer);
  const [getData, setGetData] = useState(initialization);
  const onChangeRate = (e) => {
    setGetData({ ...getData, saoBinhLuan: e });
  };
  const sendValue = () => {
    if (!userInfo) {
      message.error("Bạn cần đăng nhập để thực hiện chức năng này");
      return;
    }
    let newData = {
      ...getData,
      maPhong: idRoom,
      maNguoiBinhLuan: userInfo.user.id,
    };

    newData.noiDung
      ? roomServ
          .postComment(newData)
          .then((res) => {
            message.success(
              "Gửi bình luận thành công, bình luận của bạn đang được cập nhật"
            );
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            message.error("Gửi bình luận thất bại, xin bạn quay lại sau");
            console.log(err.response.data);
          })
      : message.error("Nội dung không được để trống");
  };
  const onChangeText = (e) => {
    setGetData({ ...getData, noiDung: e.target.value });
  };

  return (
    <div>
      <TextArea
        rows={4}
        showCount
        maxLength={200}
        onChange={onChangeText}
        placeholder=""
      />
      <button
        onClick={() => {
          sendValue();
        }}
        className="bg-white hover:bg-gray-100 my-1 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Gửi
      </button>{" "}
      <Rate onChange={onChangeRate} defaultValue={3} />
    </div>
  );
}
