import { MdFilterAlt } from "react-icons/md";
import { MdFilterAltOff } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { HiOutlineSlash } from "react-icons/hi2";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { AddFormCommon } from "./AddFormCommon";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "flowbite-react";

export const BodyHeader = ({ filterFormStatus, handleFilterForm }) => {
  const [filterFormData, setFilterFormData] = useState({ data: "" });
  const [openAddForm, setOpenAddForm] = useState(false);

  const location = useLocation();

  // Handle Add Form Open
  const handleAddFormOpen = () => {
    setOpenAddForm((prev) => !prev);
  };

  const handleFilterFormVisibility = () => {
    handleFilterForm();
  };

  // Handle Filter Form Input
  const handleFilterFormInput = (val) => {
    setFilterFormData((prevData) => ({ ...prevData, data: val }));
  };

  // Handle Filter Form Data
  const handleFilterFormSubmit = (event) => {
    event.preventDefault();

    event.target.reset();
  };

  // Handle Filter Form Clearing
  const handleFilterFormClear = () => {
    setFilterFormData({ data: "" });
  };

  return (
    <>
      {/* BreadCrumb Start */}
      <div className="flex justify-between px-[20px] py-[10px]">
        <div>
          <h2 className="text-[20px]">Countries Listing</h2>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-1 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="#"
                  className="inline-flex items-center text-sm text-[#76838f] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <HiOutlineSlash className="text-[#76838f]" />
              <li>
                <div className="flex items-center text-sm text-[#76838f]">
                  Projects
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Tooltip
            content="Filter"
            style="light"
            placement="bottom"
            className="text-[12px]"
          >
            <button
              type="button"
              className="flex items-center justify-center rounded-[50%] bg-[#589FFC] p-[12px] text-[#fff] shadow-sm cursor-pointer"
              onClick={handleFilterFormVisibility}
            >
              {filterFormStatus ? (
                <MdFilterAltOff className="text-[18px]" />
              ) : (
                <MdFilterAlt className="text-[18px]" />
              )}
            </button>
          </Tooltip>
          <Tooltip
            content={"Create Country"}
            style="light"
            placement="bottom"
            className="text-[12px]"
          >
            <button
              type="button"
              className="flex items-center justify-center rounded-[50%] bg-[#589FFC] p-[12px] text-[#fff] shadow-sm cursor-pointer"
              onClick={handleAddFormOpen}
            >
              <FaPlus className="text-[18px]" />
            </button>
          </Tooltip>
        </div>
      </div>
      {/* BreadCrumb End */}

      {/* Filter Form Start */}
      <div
        className={`filter_form px-[20px] py-[10px] overflow-hidden transition-all duration-[.5s] ${
          filterFormStatus ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#fff] p-[20px]">
          <h2 className="uppercase mb-[10px]">Filters</h2>
          <form
            className="w-[50%] flex items-center gap-2"
            onSubmit={(e) => handleFilterFormSubmit(e)}
          >
            <div className="basis-[45%]">
              <input
                type="text"
                id="name"
                name="filter_name"
                value={filterFormData.data}
                className="bg-[#fff] border-[1px] border-[#e4eaec] border-solid text-gray-900 text-sm rounded-[3px] focus:border-[#3e8ef7] block w-[100%] p-2.5 dark:placeholder-gray-400 dark:text-white "
                placeholder="Name"
                onChange={(e) => handleFilterFormInput(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`text-gray-900 bg-white border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                filterFormData.data
                  ? "cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100"
                  : "cursor-not-allowed"
              }`}
              disabled={filterFormData.data ? "" : "disabled"}
            >
              <FaSearch className="me-[10px]" />
              Filter Countries
            </button>
            <button
              className={`text-gray-900 bg-white  border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white  ${
                filterFormData.data
                  ? "cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100"
                  : "cursor-not-allowed"
              }`}
              onClick={handleFilterFormClear}
              disabled={filterFormData.data ? "" : "disabled"}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
      {/* Filter Form End */}

      {/* Add Form Start */}
      <AddFormCommon
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
      />
      {/* Add Form End */}
    </>
  );
};
