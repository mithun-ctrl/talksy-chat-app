import axios from "axios";

export const axiosBackendApi = axios.create({
    baseURL: "https://spicy-cecil-vitsmithun-c7bff47a.koyeb.app/api",
    withCredentials: true,
})