import axiosInstance from "../api/axiosInstance";

// Create Material Service
export const createMaterials = async (formData) => {
  const data = await axiosInstance.post("/materials/create", formData);
  return data.data;
};
