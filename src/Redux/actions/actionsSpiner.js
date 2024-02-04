import { SET_LOADING_OFF, SET_LOADING_ON } from "../constant/constantSpiner";

export const setLoadingOn = () => {
  return {
    type: SET_LOADING_ON,
  };
};
export const setLoadingOff = () => {
  return {
    type: SET_LOADING_OFF,
  };
};
