import axios from "axios";

const baseURL =
    import.meta.env.MODE === "development"
        ? "https://webtrabajo.onrender.com"  // 👉 en tu máquina
        : "http://localhost:3001"; // 👉 en Render

const API = axios.create({
    baseURL,
    withCredentials: true,
});

export default API;
