import React from "react";
import GoogleMapReact from "google-map-react";
import { MapIcon } from "../../Utilities/IconSVG";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { randomNumber } from "../../Utilities/randomNumber";
const MyMark = ({ item, center }) => {
  const content = (
    <div className="flex flex-col w-80 md:w-96">
      <Link
        to={`/room/${item.id}/${center[0]}/${center[1]}`}

        className="hover:cursor-pointer text-base font-semibold text-blue-400 hover:text-blue-700 duration-300 "
      >
        {item.tenPhong}
      </Link>
      <img className="mx-auto" src={item.hinhAnh[0].urlImage} alt="img_new" />
    </div>
  );
  return (
    <Popover content={content}>
      <MapIcon />
      <span className="font-semibold text-base text-gray-100">
        {item.giaTien + ""}$
      </span>
    </Popover>
  );
};
export default function SimpleMap({ dataBook, currentPosition }) {
  let { lat, lng } = currentPosition.center;


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {lat?<GoogleMapReact center={[lat, lng]} defaultZoom={12}>
        {dataBook?.map((item, i) => {
          return (
            <MyMark
              key={i}
              lat={lat + randomNumber(10) * 0.009}
              lng={lng + randomNumber(10) * 0.009}
              item={item}
              center={[lat,lng]}
            />
          );
        })}
      </GoogleMapReact>:""}
    </div>
  );
}
