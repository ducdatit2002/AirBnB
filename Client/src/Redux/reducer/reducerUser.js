import { localServ } from "../../Services/localService";
import { SET_DATA_USER, SET_USER } from "../constant/constantUser";

let initialState = {
  user: localServ.user.get(),
  dataListUser: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER: {
      return { ...state, user: payload };
    }
    case SET_DATA_USER: {
      return { ...state, dataListUser: payload };
    }
    default:
      return { ...state };
  }
};
