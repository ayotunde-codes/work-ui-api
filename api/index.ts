import axios from "axios";

const apiUrl = "http://127.0.0.1:4010/api"
// const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})


