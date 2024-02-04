
import { positionSer } from "../../Services/positionService";
import { DATA_POSITION } from "../constant/constantPosition";
const setDataPositionSuccess = (successValue) => {
  return {
    type: DATA_POSITION,
    payload: successValue,
  };
};
export const setDataPosition = () => {
  return (dispatch) => {
    positionSer
      .getPosition()
      .then((res) => {
        dispatch(setDataPositionSuccess(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const searchPostion = (id) => {
  return (dispatch) => {
    if (!id) {
      positionSer
        .getPosition()
        .then((res) => {
          dispatch(setDataPositionSuccess(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      positionSer
        .getDataFromId(id)
        .then((res) => {
          dispatch(setDataPositionSuccess([res.data.content]));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setDataPositionSuccess([]));
        });
    }
  };
};
