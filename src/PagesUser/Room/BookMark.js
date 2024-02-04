import React, { useState, useEffect } from "react";
import { message } from "antd";
import { localLike, localServ } from "../../Services/localService";
import { BookMarkIcon, HeartIcon } from "../../Utilities/IconSVG";
export default function BookMark({ id }) {
  let dataLocal = localLike.like.get();
  let userInfo = localServ.user.get();
  const [isBookMark, setIsBookMark] = useState(false);
  useEffect(() => {
    dataLocal.includes(id) && setIsBookMark(true);
  }, []);
  const changeIcon = () => {
    if (!userInfo) {
      message.error("Bạn cần đăng nhập để thực hiện chức năng này");
      return;
    } else {
      setIsBookMark(!isBookMark);
      let i = dataLocal.findIndex((item) => item === id);
      i === -1 ? dataLocal.push(id) : dataLocal.splice(i, 1);
      localLike.like.set(dataLocal, "key");
    }
  };
  return (
    <>
      {isBookMark ? (
        <HeartIcon changeIcon={changeIcon} />
      ) : (
        <BookMarkIcon changeIcon={changeIcon} />
      )}
    </>
  );
}
