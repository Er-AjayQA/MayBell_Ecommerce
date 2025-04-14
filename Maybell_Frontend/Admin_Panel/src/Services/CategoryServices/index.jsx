import axiosInstance from "../../api/axiosInstance";

// Create Category Service
export const createCategoryService = async (formData) => {
  const data = await axiosInstance.post("/categories/create", formData);
  return data.data;
};

// Get List of All Categories Service
export const getAllCategoryService = async (formData) => {
  const data = await axiosInstance.post("/categories/get-all", formData);
  return data.data;
};

// Get Category Details By Id Service
export const getCategoryDetailById = async (id) => {
  const data = await axiosInstance.post(`/categories/get-details/${id}`);
  return data.data;
};

// Update Category Service
export const updateCategoryService = async (id, formData) => {
  const data = await axiosInstance.put(`/categories/update/${id}`, formData);
  return data.data;
};

// Change Status of Category Service
export const changeCategoryStatusService = async (formData) => {
  const data = await axiosInstance.put("/categories/update-status", formData);
  return data.data;
};

// Delete Category Service
export const deleteCategoryService = async (formData) => {
  const data = await axiosInstance.put("/categories/delete", formData);
  return data.data;
};

// Delete Multiple Categories Service
export const deleteMultipleCategoryService = async (formData) => {
  const data = await axiosInstance.put("/categories/delete-multiple", formData);
  return data.data;
};
