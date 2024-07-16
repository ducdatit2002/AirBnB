import { roomServ } from "../../Services/roomService";
import { setLoadingOn } from "../../Redux/actions/actionsSpiner";
import { setLoadingOff } from "../../Redux/actions/actionsSpiner";
import { DATA_ROOM } from "../constant/constantRoom";
const setDataRoomSuccess = (successValue) => {
  return {
    type: DATA_ROOM,
    payload: successValue,
  };
};

export const setDataRoom = () => {
  return (dispatch) => {
    dispatch(setLoadingOn());
    roomServ
      .getAllDataRoom()
      .then((res) => {
        dispatch(setDataRoomSuccess(res.data.content));
        dispatch(setLoadingOff());
      })
      .catch((err) => {
        dispatch(setLoadingOff());
        console.log(err);
      });
  };
};
export const searchRoom = (idRoom) => {
  return (dispatch) => {
    if (!idRoom) {
      roomServ
        .getAllDataRoom()
        .then((res) => {
          dispatch(setDataRoomSuccess(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      roomServ
        .getDataRoom(idRoom)
        .then((res) => {
          dispatch(setDataRoomSuccess([res.data.content]));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
