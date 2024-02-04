import { https } from "./configURL";
export const roomServ = {
  getDataBook: (id) =>
    https.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`),
  getDataRoom: (id) => https.get(`/api/phong-thue/${id}`),
  getDataComment: () => https.get("/api/binh-luan"),
  getAllInfoUser: () => https.get("/api/users"),
  postComment: (data) => https.post("/api/binh-luan", data),
  postBooking: (data) => https.post("/api/dat-phong", data),
  getDataBooking: (id) => https.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`),
  getAllDataRoom: () => https.get("/api/phong-thue"),
  getStatusRoom: () => https.get(`/api/dat-phong`),
  getCommentRoom: (idRoom) =>
    https.get(`/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`),
  createRoom: (data) => https.post("/api/phong-thue", data),
  deleteRoom: (idRoom) => https.delete(`/api/phong-thue/${idRoom}`),
  editRoom: (idRoom, data) => https.put(`/api/phong-thue/${idRoom}`, data),
};
