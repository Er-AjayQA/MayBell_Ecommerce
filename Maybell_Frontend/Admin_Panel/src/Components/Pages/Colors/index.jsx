import { useEffect, useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { BreadCrumb } from "../../UI/Breadcrumb";
import { Link } from "react-router-dom";
import { ColorFilterForm } from "../../UI/Colors/ColorFilterForm";
import { ColorTableListing } from "../../UI/Colors/ColorListing";
import { AddColors } from "../../UI/Colors/AddColors";
import {
  getAllColorsService,
  getColorsDetailById,
} from "../../../Services/ColorServices";

export const Colors = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "", code: "" });
  const [allColors, setAllColors] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [colorDetails, setColorDetails] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false);
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState(false);

  // Handle On Page Change
  const onPageChange = (page) => {
    setCurrentPage(page);
    getAllMaterialsData();
  };

  // Handle Create Form Visibility
  const handleCreateFormVisibility = (type) => {
    if (type === "create") {
      setUpdateId(null);
      setUpdateIdState(false);
      setColorDetails([]);
    }
    setOpenCreateForm(!openCreateForm);
  };

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
    setFilterData({ name: "", code: "" });
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

  // Handle Set Update Id
  const handleUpdateId = (id, type) => {
    handleCreateFormVisibility(type);
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

  useEffect(() => {
    getAllColorsData();
  }, [filterData, currentLimit, currentPage, sort]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getColorById();
    }
  }, [updateId]);

  return (
    <>
      <section>
        {/* Body Header Start */}
        <div className="flex items-center mb-3">
          {/* Breadcrumb Start */}
          <BreadCrumb title={"Colors Listing"} subtitle={"Colors"} />
          {/* Breadcrumb End */}

          {/* Action Buttons Start */}
          <div className="basis-2/4 text-right">
            <div className="flex items-center justify-end gap-3">
              <button
                className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center  shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]"
                onClick={handleFilterFormVisibility}
              >
                {!filterFormStatus ? (
                  <FaFilter className="text-white text-[1rem]" />
                ) : (
                  <MdFilterAltOff
                    className="text-white text-[1rem]"
                    onClick={handleFilterFormVisibility}
                  />
                )}
              </button>
              <Link
                to={"/furniture/admin-panel/colors/create"}
                className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]"
                onClick={() => {
                  handleCreateFormVisibility("create");
                }}
              >
                <FaPlus className="text-white text-[1rem]" />
              </Link>
            </div>
          </div>
          {/* Action Buttons End */}
        </div>
        {/* Body Header End */}

        {/* Filter Section Start */}
        <ColorFilterForm
          filterFormStatus={filterFormStatus}
          filterData={filterData}
          filterFormData={handleFilterData}
          filterFormReset={handleClearFilterForm}
        />
        {/* Filter Section End */}

        {/* Table Section Start */}
        <ColorTableListing
          allColors={allColors}
          filterData={filterData}
          getAllColorsData={getAllColorsData}
          filterFormData={handleFilterData}
          handleUpdateId={handleUpdateId}
          handleSelection={handleSelection}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
          setSort={setSort}
        />
        {/* Table Section End */}

        {/* Create Form Start */}
        <AddColors
          openCreateForm={openCreateForm}
          createForm={handleCreateFormVisibility}
          getAllColorsData={getAllColorsData}
          colorDetails={colorDetails}
          updateId={updateId}
          updateIdState={updateIdState}
          setUpdateId={setUpdateId}
          setUpdateIdState={setUpdateIdState}
          onPageChange={onPageChange}
        />
        {/* Create Form End */}
      </section>
    </>
  );
};
