import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUomService, getUomDetailById } from "../Services/UOM";

const UomContextData = createContext();

export const UomContext = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });
  const [allUom, setAllUom] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [uomDetails, setUomDetails] = useState([]);
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
      setUomDetails([]);
    }
  };

  // Handle Create Form
  const onCloseModal = () => {
    setOpenModal(false);
    setUpdateId(null);
    setUpdateIdState(false);
    navigate("/furniture/admin-panel/uom");
  };

  // Get All Existing Categories
  const getAllUomData = async () => {
    const response = await getAllUomService({
      ...filterData,
      limit: currentLimit,
      page: currentPage,
      sort: sort,
    });

    if (response.success) {
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
      setAllUom(response.data);
    }
  };

  // Handle On Page Change
  const onPageChange = (page) => {
    setCurrentPage(page);
    getAllUomData();
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
  const getUomById = async () => {
    const response = await getUomDetailById(updateId);
    if (response.success) {
      setUomDetails(response.data);
    }
  };

  // Handle Sort Data
  const handleSortData = () => {
    setSort((prev) => !prev);
  };

  useEffect(() => {
    getAllUomData(currentLimit);
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getUomById();
    }
  }, [updateId]);

  const data = {
    allUom,
    filterFormStatus,
    filterData,
    totalRecords,
    totalPages,
    openModal,
    updateIdState,
    uomDetails,
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
    getAllUomData,
  };

  return (
    <>
      <UomContextData.Provider value={data}>{children}</UomContextData.Provider>
    </>
  );
};

export default UomContextData;
