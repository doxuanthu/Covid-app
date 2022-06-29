import axios from "axios";

export const getAllContries = () =>
  axios.get(`https://api.covid19api.com/countries`);

export const getReportByCountry = (Slug) =>
  axios.get(`https://api.covid19api.com/dayone/country/${Slug}`);
