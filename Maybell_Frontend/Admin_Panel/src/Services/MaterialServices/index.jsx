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

// Get Material Details By Id Service
export const getMaterialsDetailById = async (id) => {
  const data = await axiosInstance.post(`/materials/get-details/${id}`);
  return data.data;
};

// Update Materials Service
export const updateMaterialService = async (id, formData) => {
  console.log(id);

  const data = await axiosInstance.put(`/materials/update/${id}`, formData);
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

// Delete Multiple Materials Service
export const deleteMultipleMaterialService = async (formData) => {
  const data = await axiosInstance.put("/materials/delete-multiple", formData);
  return data.data;
};
