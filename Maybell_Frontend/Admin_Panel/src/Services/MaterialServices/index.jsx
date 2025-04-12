import axiosInstance from "../../api/axiosInstance";

// Create Materials Service
export const createMaterialsService = async (formData) => {
  const data = await axiosInstance.post("/materials/create", formData);
  return data.data;
};

// Get List of All Materials Service
export const getAllMaterialsService = async (formData) => {
  const data = await axiosInstance.post("/materials/get-all", formData);
  return data.data;
};

// Change Status of Materials Service
export const changeMaterialsStatusService = async (formData) => {
  const data = await axiosInstance.put("/materials/update-status", formData);
  return data.data;
};

// Delete Materials Service
export const deleteMaterialService = async (formData) => {
  const data = await axiosInstance.put("/materials/delete", formData);
  return data.data;
};
