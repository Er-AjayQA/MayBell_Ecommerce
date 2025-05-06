import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllBrandsService,
  getBrandsDetailById,
} from "../Services/BrandsServices";

const BrandsContextData = createContext();

export const BrandsContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });
  const [allBrands, setAllBrands] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [brandsDetails, setBrandsDetails] = useState([]);
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
    setFilterData({ name: "" });
  };

  // Handle Open Create Form
  const handleOpenModal = (type) => {
    setOpenModal(true);

    if (type === "create") {
      setUpdateId(null);
      setUpdateIdState(false);
      setBrandsDetails([]);
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
    navigate("/furniture/admin-panel/category");
  };

  // Get All Existing Categories
  const getAllBrandsData = async () => {
    const response = await getAllBrandsService({
      ...filterData,
      limit: currentLimit,
      page: currentPage,
      sort: sort,
    });

    if (response.success) {
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setAllBrands(response.data);
    }
  };

  // Handle On Page Change
  const onPageChange = (page) => {
    setCurrentPage(page);
    getAllBrandsData();
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
  const getBrandsById = async () => {
    const response = await getBrandsDetailById(updateId);
    if (response.success) {
      setBrandsDetails(response.data);
      setCurrentImage(response.data.image);
    }
  };

  // Handle Sort Data
  const handleSortData = () => {
    setSort((prev) => !prev);
  };

  useEffect(() => {
    getAllBrandsData(currentLimit);
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getBrandsById();
    }
  }, [updateId]);

  const data = {
    allBrands,
    filterFormStatus,
    filterData,
    totalRecords,
    totalPages,
    openModal,
    updateIdState,
    brandsDetails,
    updateId,
    imageModal,
    currentPage,
    currentModalImage,
    currentImage,
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
    getAllBrandsData,
  };

  return (
    <>
      <BrandsContextData.Provider value={data}>
        {children}
      </BrandsContextData.Provider>
    </>
  );
};

export default BrandsContextData;
