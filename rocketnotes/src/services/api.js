import axios from "axios";

export const api = axios.create({
    baseURL: "https://galllibrothers-rocketnotes.onrender.com"
});

