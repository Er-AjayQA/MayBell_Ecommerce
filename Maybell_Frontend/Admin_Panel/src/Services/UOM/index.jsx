import axiosInstance from "../../api/axiosInstance";

// Create UOM Service
export const createUomService = async (formData) => {
  const data = await axiosInstance.post("/uom/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// Get List of All UOM Service
export const getAllUomService = async (formData) => {
  const data = await axiosInstance.post("/uom/get-all", formData);
  return data.data;
};

// Get UOM Details By Id Service
export const getUomDetailById = async (id) => {
  const data = await axiosInstance.post(`/uom/get-details/${id}`);
  return data.data;
};

// Update UOM Service
export const updateUomService = async (id, formData) => {
  const data = await axiosInstance.put(`/uom/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.data;
};

// Change Status of UOM Service
export const changeUomStatusService = async (formData) => {
  const data = await axiosInstance.put("/uom/update-status", formData);
  return data.data;
};

// Delete UOM Service
export const deleteUomService = async (formData) => {
  const data = await axiosInstance.put("/uom/delete", formData);
  return data.data;
};

// Delete Multiple UOM Service
export const deleteMultipleUomService = async (formData) => {
  const data = await axiosInstance.put("/uom/delete-multiple", formData);
  return data.data;
};
