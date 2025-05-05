import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCategoryService,
  getCategoryDetailById,
} from "../Services/CategoryServices";
import {
  getAllSubCategoryService,
  getSubCategoryDetailById,
} from "../Services/SubCategoryServices";

const SubCategoryContextData = createContext();

export const SubCategoryContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [allActiveCategories, setAllActiveCategories] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [subCategoryDetails, setSubCategoryDetails] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false);
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

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
    setFilterData({ name: "", category_id: "" });
  };

  // Handle Open Create Form
  const handleOpenModal = (type) => {
    setOpenModal(true);

    if (type === "create") {
      setUpdateId(null);
      setUpdateIdState(false);
      setSubCategoryDetails([]);
    }
  };

  // Handle Open Image Modal
  const handleOpenImageModal = (imgPath) => {
    setImageModal(true);
    setCurrentModalImage(imgPath);
  };

  // Handle Image Close Modal
  const handleCloseImageModal = () => {
    setImageModal(false);
    setCurrentModalImage(null);
  };

  // Handle Create Form
  const onCloseModal = () => {
    setOpenModal(false);
    setUpdateId(null);
    setUpdateIdState(false);
    navigate("/furniture/admin-panel/sub-category");
  };

  // Get All Existing SubCategories
  const getAllSubCategoriesData = async () => {
    const response = await getAllSubCategoryService({
      ...filterData,
      limit: currentLimit,
      page: currentPage,
      sort: sort,
    });

    if (response.success) {
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setAllSubCategories(response.data);
    }
  };

  // Handle On Page Change
  const onPageChange = (page) => {
    setCurrentPage(page);
    getAllSubCategoriesData();
  };

  // Handle Set Update Id
  const handleUpdateId = (id, type) => {
    handleOpenModal(type);

    if (type === "update") {
      setUpdateId(id);
    } else {
      setUpdateId(null);
    }
  };

  // Handle Current Limit
  const handleSelection = (event) => {
    setCurrentLimit(event.target.value);
  };

  // Get SubCategory Detail
  const getSubCategoryById = async () => {
    const response = await getSubCategoryDetailById(updateId);
    if (response.success) {
      setSubCategoryDetails(response.data);
      setCurrentImage(response.data.image);
    }
  };

  // Handle Sort Data
  const handleSortData = () => {
    setSort((prev) => !prev);
  };

  // Get All Active Categories
  const getAllActiveCategories = async () => {
    let formData = { status: true };
    let response = await getAllCategoryService(formData);

    if (response.success) {
      setAllActiveCategories(response.data);
    } else {
      setAllActiveCategories([]);
    }
  };

  useEffect(() => {
    getAllSubCategoriesData(currentLimit);
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getSubCategoryById();
    }
  }, [updateId]);

  const data = {
    allSubCategories,
    filterFormStatus,
    filterData,
    totalRecords,
    totalPages,
    openModal,
    updateIdState,
    subCategoryDetails,
    updateId,
    imageModal,
    currentPage,
    currentModalImage,
    currentImage,
    allActiveCategories,
    setCurrentImage,
    getAllActiveCategories,
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
    getAllSubCategoriesData,
  };

  return (
    <>
      <SubCategoryContextData.Provider value={data}>
        {children}
      </SubCategoryContextData.Provider>
    </>
  );
};

export default SubCategoryContextData;
