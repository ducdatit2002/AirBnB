import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { roomServ } from "../../Services/roomService";
import { dataUrlImage } from "../../Assets/dataImage";
import ServicesRoom from "./ServicesRoom";
import CommentRoom from "./CommentRoom";
import { randomName } from "../../Utilities/randomName";
import { randomNumber } from "../../Utilities/randomNumber";
import { useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../Redux/actions/actionsSpiner";
import RulesRoom from "./RulesRoom";
import { arrayDisabledDays } from "../../Utilities/functionDay";
export default function Room() {
  let dispatch = useDispatch();
  let { id: idRoom, ["*"]: positionRoom } = useParams();
  const [dataSer, setData] = useState(null);
  const [dataComment, setComment] = useState({ content: [], average: null });
  const [isStatus, setStatus] = useState({
    disDates: null,
    disDatesFormat: null,
  });
  useEffect(() => {
    roomServ
      .getDataRoom(idRoom)
      .then((res) => {
        let index_img = randomNumber(dataUrlImage.length);
        let name = randomName();
        let newImage = dataUrlImage.slice(index_img, index_img + 6);
        let star = randomNumber(50, 40) / 10;
        let newData = {
          ...res.data.content,
          newImage,
          star,
          name,
          positionRoom,
        };
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    roomServ
      .getStatusRoom()
      .then((res) => {
        let data = res.data.content.filter((item) => {
          return item.maPhong == idRoom;
        });
        setStatus({
          ...isStatus,
          disDates: arrayDisabledDays(data).disDates,
          disDatesFormat: arrayDisabledDays(data).disDatesFormat,
        });
      })
      .catch((err) => console.log("err: ", err));
  }, []);

  // useEffect(() => {
  //   dispatch(setLoadingOn());
  //   roomServ
  //     .getCommentRoom(idRoom)
  //     .then((res) => {
  //       let totalComment = res.data.content.length;
  //       let star = 0;
  //       if (totalComment) {
  //         star =
  //           res.data.content.reduce((total, item) => {
  //             return item.saoBinhLuan + total;
  //           }, 0) / totalComment;
  //       }
  //       let newDataComment = res.data.content.map(
  //         (item, i) =>
  //           (item = {
  //             ...item,
  //             avatar: `https://i.pravatar.cc/60?img=${i}`,
  //           })
  //       );
  //       setComment({...dataComment,
  //         content: newDataComment,
  //         average: Math.round(star),
  //       });
  //       dispatch(setLoadingOff());
  //     })
  //     .catch((err) => {
  //       dispatch(setLoadingOff());
  //       console.log(err);
  //     });
  // }, []);
  //Xử lí khi api lấy bình luận theo phong bị lỗi
  useEffect(() => {
    dispatch(setLoadingOn());
    roomServ
      .getDataComment()
      .then((res) => {
        let dataFilter = res.data.content.filter(
          (item) => item.maPhong == idRoom
        )
        let totalComment = dataFilter.length;
        let star = 0;
        if (totalComment) {
          star =
            dataFilter.reduce((total, item) => {
              return item.saoBinhLuan + total;
            }, 0) / totalComment;
        }
        let newDataComment = dataFilter.map(
          (item, i) =>
            (item = {
              ...item,
              avatar: `https://i.pravatar.cc/60?img=${i}`,
            })
        );
        setComment({...dataComment,
          content: newDataComment,
          average: Math.round(star),
        });
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        dispatch(setLoadingOff());
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-auto pt-20 px-5 md:px-16 lg:pt-24 sm:px-10">
      {dataSer && (
        <>
          <ServicesRoom
            totalPeople={dataComment.content.length}
            averageStar={dataComment.average}
            isStatus={isStatus}
            dataSer={dataSer}
          />
        </>
      )}

      <CommentRoom idRoom={idRoom} dataComment={dataComment.content} />
      <hr />
      <RulesRoom />
    </div>
  );
}
