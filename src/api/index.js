import axios from "axios";

const endpoint = "https://api.covid19api.com/";

export const getAllContries = () => axios.get(`${endpoint}countries`);
