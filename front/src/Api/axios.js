import axios from "axios";

const API = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? "http://localhost:3001"
            : "https://webtrabajo.onrender.com",
    withCredentials: true,
});

export default API;
