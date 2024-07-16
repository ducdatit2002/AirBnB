import { https } from "./configURL";
export const positionSer = {
  getPosition: () => https.get("/api/vi-tri"),
  getPositionFamous: () =>
    https.get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8"),
  getCurrentPosition: (id) => https.get(`/api/vi-tri/${id}`),
  postPosition: (data) => https.post("/api/vi-tri", data),
  deletePosition: (id) => https.delete(`/api/vi-tri/${id}`),
  editPosition: (id,data) => https.put(`/api/vi-tri/${id}`,data),
  getDataFromId: (id) => https.get(`/api/vi-tri/${id}`),
};
