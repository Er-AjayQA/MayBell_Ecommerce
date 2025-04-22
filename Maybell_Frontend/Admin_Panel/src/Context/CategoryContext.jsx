import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCategoryService,
  getCategoryDetailById,
} from "../Services/CategoryServices";

const CategoryContextData = createContext();

export const CategoryContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });
  const [allCategories, setAllCategories] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false);
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(null);

  const navigate = useNavigate();

  // Handle Filter Form Visibility
  const handleFilterFormVisibility = () => {
    setFilterFormStatus(!filterFormStatus);
  };

  // Handle Filter Data
  const handleFilterData = (event) => {
    const { name, value } = event.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Clear Filter Form
  const handleClearFilterForm = () => {
    setFilterData({ name: "" });
  };

  // Handle Open Create Form
  const handleOpenModal = (type) => {
    setOpenModal(true);

    if (type === "create") {
      setUpdateId(null);
      setUpdateIdState(false);
      setCategoryDetails([]);
    }
  };

  // Handle Open Image Modal
  const handleOpenImageModal = (imgPath) => {
    setCurrentModalImage(imgPath);
    setImageModal(true);
  };

  // Handle Image Close Modal
  const handleCloseImageModal = () => {
    setImageModal(false);
  };

  // Handle Create Form
  const onCloseModal = () => {
    setOpenModal(false);
    setUpdateId(null);
    setUpdateIdState(false);
    navigate("/furniture/admin-panel/category");
  };

  // Get All Existing Categories
  const getAllCategoriesData = async () => {
    const response = await getAllCategoryService({
      ...filterData,
      limit: currentLimit,
      page: currentPage,
      sort: sort,
    });

    if (response.success) {
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setAllCategories(response.data);
    }
  };

  // Handle On Page Change
  const onPageChange = (page) => {
    setCurrentPage(page);
    getAllCategoriesData();
  };

  // Handle Set Update Id
  const handleUpdateId = (id, type) => {
    handleOpenModal(type);
    setUpdateId((prev) => {
      if (!id) {
        return (prev = null);
      } else {
        return (prev = id);
      }
    });
  };

  // Handle Current Limit
  const handleSelection = (event) => {
    setCurrentLimit(event.target.value);
  };

  // Get Material Detail
  const getCategoryById = async () => {
    const response = await getCategoryDetailById(updateId);
    if (response.success) {
      setCategoryDetails(response.data);
    }
  };

  // Handle Sort Data
  const handleSortData = () => {
    setSort((prev) => !prev);
  };

  useEffect(() => {
    getAllCategoriesData(currentLimit);
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getCategoryById();
    }
  }, [updateId]);

  const data = {
    allCategories,
    filterFormStatus,
    filterData,
    totalRecords,
    totalPages,
    openModal,
    updateIdState,
    categoryDetails,
    updateId,
    imageModal,
    currentPage,
    currentModalImage,
    handleOpenModal,
    onCloseModal,
    handleCloseImageModal,
    setOpenModal,
    handleSortData,
    handleFilterFormVisibility,
    handleFilterData,
    handleClearFilterForm,
    setUpdateId,
    setUpdateIdState,
    onPageChange,
    handleUpdateId,
    handleSelection,
    handleOpenImageModal,
    getAllCategoriesData,
  };

  return (
    <>
      <CategoryContextData.Provider value={data}>
        {children}
      </CategoryContextData.Provider>
    </>
  );
};

export default CategoryContextData;
