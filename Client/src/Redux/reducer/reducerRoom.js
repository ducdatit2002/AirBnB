import { DATA_ROOM } from "../constant/constantRoom";

const initialState = {
  dataRoom: null,
};

const reducerRoom = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_ROOM:
      return { ...state, dataRoom: payload };

    default:
      return state;
  }
};
export default reducerRoom;
