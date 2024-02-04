
import moment from "moment";
export const totalDay = (start, end) => moment(start).diff(moment(end), "days");

export const arrayDisabledDays = (data) => {
  let newData = data.map((item) => {
    let dayQuatity = totalDay(item.ngayDi, item.ngayDen);
    return (item = { ...item, dayQuatity });
  });
  let disDatesFormat = [];
  newData.forEach((item) => {
    for (let i = 0; i < item.dayQuatity; i++) {
      let addDay = moment(item.ngayDen).add(i, "days").format("YYYY-MM-DD");
      !disDatesFormat.includes(addDay) && disDatesFormat.push(addDay);
    }
  });
  let disDates = disDatesFormat.map((item) => {
    let newItem = new Date(item);
    return newItem;
  });
  return { disDates, disDatesFormat };
};
