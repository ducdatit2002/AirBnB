import { DATA_BOOKED } from "../constant/constantBook";

const initialState = {
  dataBooked: null,
};

const reducerBooked = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_BOOKED:
      return { ...state, dataBooked: payload };

    default:
      return state;
  }
};
export default reducerBooked;
