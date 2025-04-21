import { createContext, useEffect, useState } from "react";
import {
  getAllMaterialsService,
  getMaterialsDetailById,
} from "../Services/MaterialServices";
import { useNavigate } from "react-router-dom";
import {
  getAllColorsService,
  getColorsDetailById,
} from "../Services/ColorServices";

const ColorsContextData = createContext();

export const ColorsContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });
  const [allColors, setAllColors] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [colorDetails, setColorDetails] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false);
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState(false);

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
      setColorDetails([]);
    }
  };

  // Handle Create Form
  const onCloseModal = () => {
    setOpenModal(false);
    setUpdateId(null);
    setUpdateIdState(false);
    navigate("/furniture/admin-panel/colors");
  };

  // Get All Existing Materials
  const getAllColorsData = async () => {
    const response = await getAllColorsService({
      ...filterData,
      limit: currentLimit,
      page: currentPage,
      sort: sort,
    });

    if (response.success) {
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setAllColors(response.data);
    }
  };

  // Handle On Page Change
  const onPageChange = (page) => {
    setCurrentPage(page);
    getAllColorsData();
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
  const getColorById = async () => {
    const response = await getColorsDetailById(updateId);
    if (response.success) {
      setColorDetails(response.data);
    }
  };

  // Handle Sort Data
  const handleSortData = () => {
    setSort((prev) => !prev);
  };

  useEffect(() => {
    getAllColorsData(currentLimit);
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getColorById();
    }
  }, [updateId]);

  const data = {
    allColors,
    filterFormStatus,
    filterData,
    totalRecords,
    totalPages,
    openModal,
    updateIdState,
    colorDetails,
    updateId,
    currentPage,
    handleOpenModal,
    onCloseModal,
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
    getAllColorsData,
  };

  return (
    <>
      <ColorsContextData.Provider value={data}>
        {children}
      </ColorsContextData.Provider>
    </>
  );
};

export default ColorsContextData;
