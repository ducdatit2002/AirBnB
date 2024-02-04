import axios from "axios";
import { localServ } from "./localService";
export const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NCIsIkhldEhhblN0cmluZyI6IjIyLzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjMzNjAwMDAwMCIsIm5iZiI6MTY4NzcxMjQwMCwiZXhwIjoxNzE2NDgzNjAwfQ.argi0m1LRAePDxZ6Nb4AX25fZ9gclDCUAA5oW84-TsQ";
export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    tokenCybersoft: TOKEN,
    token: localServ.user.get()?.token,
  },
});
