import axios from "axios";
import { localServ } from "./localService";
export const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzciLCJIZXRIYW5TdHJpbmciOiIzMS8xMi8yMTAwIiwiSGV0SGFuVGltZSI6IjQxMzM4OTQ0MDAwMDAiLCJuYmYiOjE2OTg1MTI0MDAsImV4cCI6MTcxNjY1NjQwMH0.nJ0FPo5wkc1WgelxELfkD3BJ8WrFfjXNH_EGwFMsWh8";
export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    tokenCybersoft: TOKEN,
    token: localServ.user.get()?.token,
  },
});
