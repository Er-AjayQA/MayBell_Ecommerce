import axiosInstance from "../../api/axiosInstance";

// Create Products Service
export const createProductsService = async (formData) => {
  const data = await axiosInstance.post("/products/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// Get List of All Products Service
export const getAllProductsService = async (formData) => {
  const data = await axiosInstance.post("/products/get-all", formData);
  return data.data;
};

// Get Products Details By Id Service
export const getProductsDetailById = async (id) => {
  const data = await axiosInstance.post(`/products/get-details/${id}`);
  return data.data;
};

// Update Products Service
export const updateProductsService = async (id, formData) => {
  const data = await axiosInstance.put(`/products/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// Change Status of Products Service
export const changeProductsStatusService = async (formData) => {
  const data = await axiosInstance.put("/products/update-status", formData);
  return data.data;
};

// Delete Products Service
export const deleteProductsService = async (formData) => {
  const data = await axiosInstance.put("/products/delete", formData);
  return data.data;
};

// Delete Multiple Products Service
export const deleteMultipleProductsService = async (formData) => {
  const data = await axiosInstance.put("/products/delete-multiple", formData);
  return data.data;
};
