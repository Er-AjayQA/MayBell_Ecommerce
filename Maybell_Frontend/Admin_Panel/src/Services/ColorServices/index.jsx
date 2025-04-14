import axiosInstance from "../../api/axiosInstance";

// Create Materials Service
export const createColorsService = async (formData) => {
  const data = await axiosInstance.post("/colors/create", formData);
  return data.data;
};

// Get List of All Materials Service
export const getAllColorsService = async (formData) => {
  const data = await axiosInstance.post("/colors/get-all", formData);
  return data.data;
};

// Get Material Details By Id Service
export const getColorsDetailById = async (id) => {
  const data = await axiosInstance.post(`/colors/get-details/${id}`);
  return data.data;
};

// Update Materials Service
export const updateColorService = async (id, formData) => {
  console.log(id);

  const data = await axiosInstance.put(`/colors/update/${id}`, formData);
  return data.data;
};

// Change Status of Materials Service
export const changeColorsStatusService = async (formData) => {
  const data = await axiosInstance.put("/colors/update-status", formData);
  return data.data;
};

// Delete Materials Service
export const deleteColorService = async (formData) => {
  const data = await axiosInstance.put("/colors/delete", formData);
  return data.data;
};

// Delete Multiple Materials Service
export const deleteMultipleColorsService = async (formData) => {
  const data = await axiosInstance.put("/colors/delete-multiple", formData);
  return data.data;
};
