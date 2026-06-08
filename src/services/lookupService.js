import api from "../api/axiosInstance";

export const getPriorities = async () => {
    console.log("we are fetching prioities")
  const response = await api.get("/priorities");
  console.log(response.data)
  return response.data;
};

export const getWorkTypes = async () => {
  const response = await api.get("/work-types");
  return response.data;
};

export const getWorkCategories = async () => {
  const response = await api.get("/work-categories");
  return response.data;
};

export const getTerritories = async () => {
  const response = await api.get("/territories");
   console.log(response.data)
  return response.data;
};

export const getSites = async () => {
  const response = await api.get("/sites");
  return response.data;
};

export const getBuildings = async () => {
  const response = await api.get("/buildings");
  return response.data;
};

export const getFloors = async () => {
  const response = await api.get("/floors");
  return response.data;
};