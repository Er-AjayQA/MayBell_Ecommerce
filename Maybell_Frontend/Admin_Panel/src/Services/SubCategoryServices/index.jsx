import axiosInstance from "../../api/axiosInstance";

// Create SubCategory Service
export const createSubCategoryService = async (formData) => {
  const data = await axiosInstance.post("/sub-categories/create", formData);
  return data.data;
};

// Get List of All SubCategories Service
export const getAllSubCategoryService = async (formData) => {
  const data = await axiosInstance.post("/sub-categories/get-all", formData);
  return data.data;
};

// Get SubCategory Details By Id Service
export const getSubCategoryDetailById = async (id) => {
  const data = await axiosInstance.post(`/sub-categories/get-details/${id}`);
  return data.data;
};

// Update SubCategory Service
export const updateSubCategoryService = async (id, formData) => {
  const data = await axiosInstance.put(
    `/sub-categories/update/${id}`,
    formData
  );
  return data.data;
};

// Change Status of SubCategory Service
export const changeSubCategoryStatusService = async (formData) => {
  const data = await axiosInstance.put(
    "/sub-categories/update-status",
    formData
  );
  return data.data;
};

// Delete SubCategory Service
export const deleteSubCategoryService = async (formData) => {
  const data = await axiosInstance.put("/sub-categories/delete", formData);
  return data.data;
};

// Delete Multiple SubCategories Service
export const deleteMultipleSubCategoryService = async (formData) => {
  const data = await axiosInstance.put(
    "/sub-categories/delete-multiple",
    formData
  );
  return data.data;
};
