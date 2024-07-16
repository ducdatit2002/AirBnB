import { https } from "./configURL";
export const bookSer = {
  getDataBook: (id) =>
    https.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`),
  postBooking: (data) => https.post("/api/dat-phong", data),
  getDataBooking: (id) => https.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`),
  getStatusRoom: () => https.get(`/api/dat-phong`),
  getData: () => https.get("/api/dat-phong"),
  deleteBooking: (id) => https.delete(`/api/dat-phong/${id}`),
  getBookedFromId: (id) => https.get(`/api/dat-phong/${id}`),
  editBooked: (id, data) => https.put(`/api/dat-phong/${id}`, data),
};
