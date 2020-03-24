import axios from "axios";

const BASE_URL =
  "https://raw.githubusercontent.com/ajbitus/interview-tasks/master/epl-2011-12/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});
