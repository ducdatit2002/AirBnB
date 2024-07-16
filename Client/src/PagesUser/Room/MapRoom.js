import React from "react";
import GoogleMapReact from "google-map-react";
import { HomeMapIcon } from "../../Utilities/IconSVG";
export default function MapRoom({ positionRoom }) {
  let center = [+positionRoom.split("/")[0], +positionRoom.split("/")[1]];
  return (
    <div className="h-screen">
      {isNaN(center[0]) ? (
        <span className="text-lg font-bold">
          Dữ liệu đang cập nhật xin bạn quay lại sau
        </span>
      ) : (
        <GoogleMapReact center={center} defaultZoom={12}>
          <HomeMapIcon lat={center[0]} lng={center[1]} />
        </GoogleMapReact>
      )}
    </div>
  );
}
