import { SET_LOADING_ON,SET_LOADING_OFF } from "../constant/constantSpiner";

let initalState = {
  isLoading: false,
};
export const spinerReducer = (state = initalState, { type }) => {
  switch (type) {
    case SET_LOADING_ON:
      return { ...state, isLoading: true };
    case SET_LOADING_OFF:
      return { ...state, isLoading: false };

    default:
      return{...state};
  }
};
