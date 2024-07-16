import { DATA_POSITION } from "../constant/constantPosition";

const initialState = {
  dataPosition: null,
};

const reducerPosition = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATA_POSITION:
      return { ...state, dataPosition: payload };

    default:
      return state;
  }
};
export default reducerPosition;
