import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProductsService,
  getProductsDetailById,
} from "../Services/ProductsServices";

const ProductsContextData = createContext();

export const ProductsContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });
  const [allProducts, setAllProducts] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [productsDetails, setProductsDetails] = useState([]);
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
      setProductsDetails([]);
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
    navigate("/furniture/admin-panel/products");
  };

  // Handle On Page Change
  const onPageChange = (page) => {
    setCurrentPage(page);
    getAllProductsData();
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

  // Get All Existing Products
  const getAllProductsData = async () => {
    const response = await getAllProductsService({
      ...filterData,
      limit: currentLimit,
      page: currentPage,
      sort: sort,
    });

    if (response.success) {
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setAllProducts(response.data);
    }
  };

  // Get Material Detail
  const getProductsById = async () => {
    const response = await getProductsDetailById(updateId);
    if (response.success) {
      setProductsDetails(response.data);
      setCurrentImage(response.data.image);
    }
  };

  // Handle Sort Data
  const handleSortData = () => {
    setSort((prev) => !prev);
  };

  useEffect(() => {
    getAllProductsData(currentLimit);
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getProductsById();
    }
  }, [updateId]);

  const data = {
    allProducts,
    filterFormStatus,
    filterData,
    totalRecords,
    totalPages,
    openModal,
    updateIdState,
    productsDetails,
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
    getAllProductsData,
  };

  return (
    <>
      <ProductsContextData.Provider value={data}>
        {children}
      </ProductsContextData.Provider>
    </>
  );
};

export default ProductsContextData;
