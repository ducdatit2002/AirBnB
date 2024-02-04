import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { useNavigate, Link } from "react-router-dom";
import News from "../News/News";
import { dataBanner } from "../../Assets/dataBaner";
import { useDispatch } from "react-redux";
import { setLoadingOn } from "../../Redux/actions/actionsSpiner";
import { setLoadingOff } from "../../Redux/actions/actionsSpiner";
import { CloseIcon } from "../../Utilities/IconSVG";
import { positionSer } from "../../Services/positionService";
export default function HomePage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [positionFamous, setPositionFamous] = useState("");
  const [popHide, setPopHide] = useState(true);
  useEffect(() => {
    dispatch(setLoadingOn());
    positionSer
      .getPositionFamous()
      .then((res) => {
        setPositionFamous(res.data.content);
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        dispatch(setLoadingOff());
        console.log(err);
      });
  }, []);
  let getDataItem = (value) => {
    navigate(`/detail/${value.id}`);
  };
  let renderFamous = () => {
    return positionFamous.data?.map((item, i) => {
      return (
        <div className="flex items-center" key={i}>
          <img
            onClick={() => {
              getDataItem(item);
            }}
            className="w-24 h-24 ease-in-out shadow-lg rounded-full hover:shadow-blue-500/50 mx-2 hover:scale-110 hover:cursor-pointer duration-300"
            src={item.hinhAnh}
            alt={item.tenViTri}
          />
          <h2>{item.tenViTri + "," + item.tinhThanh}</h2>
        </div>
      );
    });
  };
  let renderPopUp = () => {
    return (
      <div className="h-screen w-screen fixed left-0 top-0 flex justify-center items-center py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center space-x-10 justify-center">
            <h2 className="text-center text-5xl md:text-6xl tracking-tighter font-bold text-red-500">
              Sale 50 % off
            </h2>
            <div className="w-full md:w-1/2">
              <button
                onClick={() => {
                  setPopHide(false);
                }}
                className="p-2 absolute"
              >
                <CloseIcon />
              </button>
              <Link to={"/detail/7"} state={{ isSale: true }}>
                <img
                  className="rounded-2xl"
                  src="https://a25hotel.com/files/images/tour/03252020082945892-xenhatrangdalat1.jpg"
                  alt="hotel_banner"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div>
        <Carousel autoplay effect="fade">
          {dataBanner.map((item, i) => {
            return (
              <div key={i}>
                <img
                  className="w-full h-80  lg:h-screen md:h-96"
                  src={item.imgUrl}
                  alt="bannerImg"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <section className="container mx-auto py-10">
        <h1 className="font-bold text-3xl">Điểm đến nổi tiếng</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {renderFamous()}
        </div>
      </section>
      <hr className="w-1/2 mx-auto" />
      <section className="container mx-auto pt-8">
        <h1 className="font-bold text-3xl">Ở bất cứ đâu</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 py-2">
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://a0.muscache.com/im/pictures/6bf49eb6-e24a-4103-a859-cc9fb9d9e367.jpg?im_w=960"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Toàn bộ nhà</h3>
          </section>
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://a0.muscache.com/im/pictures/0adc1aec-bd6f-4f10-8536-a3bb6faecd20.jpg?im_w=960"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Gần gũi thiên nhiên</h3>
          </section>
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://www.vietnambooking.com/wp-content/uploads/2017/10/khach-san-co-cho-phep-thu-cung-vao-hay-khong-7-7-2018-2.jpg"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Mang theo thú cưng</h3>
          </section>
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://a0.muscache.com/im/pictures/miso/Hosting-29172819/original/8dae018e-ee08-4956-ab90-4a451e96e424.jpeg?im_w=1200"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Chỗ ở độc đáo</h3>
          </section>
        </div>
      </section>
      <hr className="w-1/2 mx-auto" />
      {popHide && renderPopUp()}
      <div className="container py-5 mx-auto">
        <h1 className="font-bold mb-8 text-3xl">Review</h1>
        <News />
      </div>
    </>
  );
}
