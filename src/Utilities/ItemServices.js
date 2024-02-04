import {
  AirIcon,
  IronIcon,
  KichenIcon,
  ParkIcon,
  PoolIcon,
  RefrigeratorIcon,
  TiviIcon,
  WashIcon,
  WifiIcon,
} from "./IconSVG";

export let itemsHome = [
  {
    key: "tivi",
    icon: <TiviIcon />,
    name: "Tivi 32in",
  },
  {
    key: "dieuHoa",
    icon: <AirIcon />,
    name: "Điều hòa",
  },
  {
    key: "mayGiat",
    icon: <RefrigeratorIcon />,
    name: "Máy giặt miễn phí",
  },
  {
    key: "doXe",
    icon: <ParkIcon />,
    name: "Bãi đỗ xe",
  },
  {
    key: "banLa",
    icon: <IronIcon />,
    name: "Bàn là",
  },
  {
    key: "wifi",
    icon: <WifiIcon />,
    name: "Wifi",
  },
  {
    key: "bep",
    icon: <KichenIcon />,
    name: "Bếp",
  },
  {
    key: "banUi",
    icon: <WashIcon />,
    name: "Bàn ủi",
  },
  {
    key: "hoBoi",
    icon: <PoolIcon />,
    name: "Hồ bơi",
  },
];
export let renderComforts = (data, element, note) => {
  let keyArray = [];
  for (const key in data) {
    data[key] === true && keyArray.push(key);
  }
  let homeComforts = itemsHome.filter((item) => keyArray.includes(item.key));
  return homeComforts.map((item, i) => (
    <p key={i} className={element}>
      {item.icon}
      {note === "isRoom" && <span>{item.name}</span>}
    </p>
  ));
};
