import { combineReducers } from "redux";
import { userReducer } from "./reducerUser";
import { spinerReducer } from "./reducerSpiner";
import roomReducer from "./reducerRoom";
import positionReducer from "./reducerPosition";
import bookedReducer from './reducerBooked'
export let rootReducer = combineReducers({
  userReducer,
  spinerReducer,
  roomReducer,
  positionReducer,bookedReducer
});
