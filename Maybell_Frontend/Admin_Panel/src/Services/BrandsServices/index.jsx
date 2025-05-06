import axiosInstance from "../../api/axiosInstance";

// Create Brand Service
export const createBrandsService = async (formData) => {
  const data = await axiosInstance.post("/brands/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// Get List of All Brands Service
export const getAllBrandsService = async (formData) => {
  const data = await axiosInstance.post("/brands/get-all", formData);
  return data.data;
};

// Get Brand Details By Id Service
export const getBrandsDetailById = async (id) => {
  const data = await axiosInstance.post(`/brands/get-details/${id}`);
  return data.data;
};

// Update Brand Service
export const updateBrandsService = async (id, formData) => {
  const data = await axiosInstance.put(`/brands/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// Change Status of Brand Service
export const changeBrandsStatusService = async (formData) => {
  const data = await axiosInstance.put("/brands/update-status", formData);
  return data.data;
};

// Delete Brand Service
export const deleteBrandsService = async (formData) => {
  const data = await axiosInstance.put("/brands/delete", formData);
  return data.data;
};

// Delete Multiple Brands Service
export const deleteMultipleBrandsService = async (formData) => {
  const data = await axiosInstance.put("/brands/delete-multiple", formData);
  return data.data;
};
