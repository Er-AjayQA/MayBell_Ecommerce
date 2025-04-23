import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [updateId, setUpdateId] = useState(null);
  const [subCategoryDetails, setSubCategoryDetails] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false);
  const [allActiveCategoriesList, setAllActiveCategoriesList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

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
      getAllActiveCategoriesData();
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

  // Get All Existing Active Categories
  const getAllActiveCategoriesData = async () => {
    let filter = {
      limit: 1000,
      sort: "",
      status: true,
    };

    const response = await getAllCategoryService(filter);

    if (response.success) {
      setAllActiveCategoriesList(response.data);
    }
  };

  // Get All Existing SubCategories
  const getAllSubCategoriesData = async () => {
    let filter = {
      ...filterData,
      limit: currentLimit,
      page: currentPage,
      sort: sort,
    };

    const response = await getAllSubCategoryService(filter);

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
    console.log("Update ID=======", updateId);
    setUpdateId(id);
    handleOpenModal(type);
    getAllActiveCategoriesData();
  };

  // Handle Current Limit
  const handleSelection = (event) => {
    setCurrentLimit(event.target.value);
  };

  // Get SubCategory Detail
  const getSubCategoryById = async () => {
    const response = await getSubCategoryDetailById(params.id);
    if (response.success) {
      setSubCategoryDetails(response.data);
      setCurrentImage(response.data.image);
    }
  };

  // Handle Sort Data
  const handleSortData = () => {
    setSort((prev) => !prev);
  };

  useEffect(() => {
    getAllSubCategoriesData(currentLimit);
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (!params.id) {
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
    allActiveCategoriesList,
    setCurrentImage,
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
    getAllActiveCategoriesData,
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
