import { bookSer } from "../../Services/bookService";
import { DATA_BOOKED } from "../constant/constantBook";
const setDataBookedSuccess = (successValue) => {
  return {
    type: DATA_BOOKED,
    payload: successValue,
  };
};
export const setDataBooked = () => {
  return (dispatch) => {
    bookSer
      .getData()
      .then((res) => {
        dispatch(setDataBookedSuccess(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const searchBooked = (id) => {
  return (dispatch) => {
    if (!id) {
      bookSer
        .getData()
        .then((res) => {
          dispatch(setDataBookedSuccess(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      bookSer
        .getDataBooking(id)
        .then((res) => {
          dispatch(setDataBookedSuccess(res.data.content));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setDataBookedSuccess([]));
        });
    }
  };
};
