import axios from "axios";

const baseURL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3001" // 👉 en tu máquina
        : "https://webtrabajo.onrender.com"; // 👉 en Render

const API = axios.create({
    baseURL,
    withCredentials: true,
});

export default API;
