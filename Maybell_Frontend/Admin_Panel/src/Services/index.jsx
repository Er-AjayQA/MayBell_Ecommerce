import axiosInstance from "../api/axiosInstance";

// Create Materials Service
export const createMaterials = async (formData) => {
  const data = await axiosInstance.post("/materials/create", formData);
  return data.data;
};

// Get List of All Materials Service
export const getAllMaterials = async (formData) => {
  const data = await axiosInstance.post("/materials/get-all", formData);
  return data.data;
};

// Change Status of Materials Service
export const changeMaterialsStatus = async (formData) => {
  await axiosInstance.put("/materials/update-status", formData);
};
