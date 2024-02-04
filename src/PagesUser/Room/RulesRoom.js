import React from "react";
import { memo } from "react";
import {
  TimeIcon,
  PhoneIcon,
  LockIcon,
  SmokeIcon,
  PartyIcon,
  PetIcon,
  SafetyIcon,
  CarbonIcon,
  ExitIcon,
  SmileIcon,
  StoreIcon,
  FireIcon,
} from "../../Utilities/IconSVG";
let itemsRule = [
  { icon: <TimeIcon />, describe: "Check-in: After 4:00 PM" },
  { icon: <TimeIcon />, describe: "Checkout: 10:00 AM" },
  { icon: <LockIcon />, describe: "Khóa điện tử" },
  { icon: <SmokeIcon />, describe: "Không hút thuốc" },
  { icon: <PartyIcon />, describe: "Không tổ chức tiêc, giữ yên tĩnh" },
  { icon: <PetIcon />, describe: "Được phép mang theo thú nuôi" },
];
let itemsSafety = [
  { icon: <SafetyIcon />, describe: "Phòng ngừa lây nhiễm COVID-19" },
  { icon: <CarbonIcon />, describe: "Cảnh báo khí Carbon" },
  { icon: <FireIcon />, describe: "Chuông báo cháy" },
  { icon: <ExitIcon />, describe: "Lối thoát hiểm" },
];
let itemsContact = [
  {
    icon: <StoreIcon />,
    describe: "Có thể tự check-in-out.",
  },
  { icon: <SmileIcon />, describe: "Phòng chờ khi bạn tới sớm." },
  {
    icon: <PhoneIcon />,
    describe: "Mọi thắc mắc xin liên hệ số 093456456.",
  },
];
function RulesRoom() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-2 md:py-5 md:gap-5">
      <section>
        <p className="text-2xl font-bold">Qui Định</p>
        {itemsRule.map((item,i) => (
          <div key={i} className="flex items-center text-base space-x-2 space-y-1 ">
            {item.icon}
            <span className="flex">{item.describe}</span>
          </div>
        ))}
      </section>
      <section>
        <p className="text-2xl font-bold">Hệ Thống An Toàn</p>
        {itemsSafety.map((item,i) => (
          <div key={i} className="flex items-center text-base space-x-2 space-y-1">
            {item.icon}
            <span className="flex">{item.describe}</span>
          </div>
        ))}
      </section>
      <section>
        <p className="text-2xl font-bold">Liên Hệ</p>
        {itemsContact.map((item,i) => (
          <div key={i} className="flex items-center text-base space-x-2 space-y-1">
            {item.icon}
            <span className="flex">{item.describe}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
export default memo(RulesRoom);
