import { Table, Checkbox, Tooltip, Pagination } from "flowbite-react";
import { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { MdOutlineSwapVert, MdDeleteForever, MdEdit } from "react-icons/md";
import { GrDocumentCsv } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  changeColorsStatusService,
  deleteColorService,
  deleteMultipleColorsService,
} from "../../../Services/ColorServices";
import {
  changeCategoryStatusService,
  deleteCategoryService,
  deleteMultipleCategoryService,
} from "../../../Services/CategoryServices";

export const CategoryTableListing = ({
  allCategories,
  getAllCategoryData,
  filterData,
  filterFormData,
  handleUpdateId,
  handleSelection,
  totalPages,
  onPageChange,
  currentPage,
  totalRecords,
  setSort,
}) => {
  const [selectedRecords, setSelectedRecords] = useState([]);

  // Handle Checkbox Check
  const handleCheckboxSelection = (id) => {
    setSelectedRecords((prev) => {
      if (prev.includes(id)) {
        let data = prev.filter((record) => record !== id);
        return data;
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle Select All Checkboxes
  const handleSelectAllCheckboxes = (event) => {
    if (event.target.checked) {
      const data = allColors.map((color) => {
        return color._id;
      });
      setSelectedRecords(data);
    } else {
      setSelectedRecords([]);
    }
  };

  // Change Status of Materials
  const handleStatusChange = async (id) => {
    const response = await changeCategoryStatusService({ id });

    if (response.success) {
      toast.success(response.message);
      getAllCategoryData();
    }
  };

  // Handle Delete Materials
  const handleDeleteCategory = async (id) => {
    const response = await deleteCategoryService({ id });

    if (response.success) {
      toast.success(response.message);
      getAllCategoryData();
    }
  };

  // Handle Delete Multiple Data
  const handleDeleteMultipleCategories = async () => {
    const response = await deleteMultipleCategoryService({
      ids: selectedRecords,
    });

    if (response.success) {
      toast.success(response.message);
      getAllCategoryData();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      {/* Table Section Start */}
      <div className="bg-white shadow-sm mb-3 py-4 px-5 rounded-lg">
        {/* Table Form UI Start */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          {/* Left Form Start */}
          <div className="leftForm">
            <form className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-1">
                <label
                  htmlFor="countries"
                  className="block text-sm text-gray-600"
                >
                  Show
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-1 px-2"
                  onChange={(event) => handleSelection(event)}
                >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="all">All</option>
                </select>
                <span className="text-gray-600 text-sm">entries</span>
              </div>
              <div className="flex items-center gap-1">
                <label
                  htmlFor="default-search"
                  className="block text-sm text-gray-600"
                >
                  Search:
                </label>
                <input
                  type="search"
                  name="name"
                  id="default-search"
                  value={filterData.name}
                  placeholder="search by name"
                  className="block py-1 px-3 text-sm text-gray-600 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(event) => filterFormData(event)}
                />
              </div>
            </form>
          </div>
          {/* Left Form End */}

          {/* Right Form Start */}
          <div className="rightForm">
            <div className="flex gap-1">
              <Tooltip content="Reorder" placement="top">
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
                  onClick={() => {
                    setSort((prev) => !prev);
                  }}
                >
                  <MdOutlineSwapVert />
                </button>
              </Tooltip>
              <Tooltip content="Delete Selected" placement="top">
                <button
                  className="p-2 text-red-500 hover:bg-gray-100 rounded-lg border border-gray-200"
                  onClick={handleDeleteMultipleCategories}
                >
                  <RiDeleteBin5Fill />
                </button>
              </Tooltip>
              <Tooltip content="Download CSV" placement="top">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <GrDocumentCsv />
                </button>
              </Tooltip>
              <Tooltip content="Download PDF" placement="top">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200">
                  <FaFilePdf />
                </button>
              </Tooltip>
            </div>
          </div>
          {/* Right Form End */}
        </div>
        {/* Table Form UI End */}

        {/* Table Listing Start */}
        <div className="overflow-y-auto h-[350px] rounded-lg border border-gray-200">
          <Table hoverable className="w-full">
            <Table.Head className="text-center sticky top-0 bg-white z-10">
              <Table.HeadCell className="p-4">
                <Checkbox
                  defaultChecked="false"
                  onChange={handleSelectAllCheckboxes}
                  checked={
                    allCategories.length >= 1 &&
                    selectedRecords.length === allCategories.length
                      ? "checked"
                      : ""
                  }
                />
              </Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Order</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y ">
              {allCategories?.length >= 1 ? (
                allCategories.map((category) => {
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                      key={category?._id}
                    >
                      <Table.Cell className="p-4">
                        <Checkbox
                          defaultChecked="false"
                          onClick={() => handleCheckboxSelection(category?._id)}
                          checked={
                            selectedRecords.includes(category?._id)
                              ? "checked"
                              : ""
                          }
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {category?.name}
                      </Table.Cell>
                      <Table.Cell>{category?.order}</Table.Cell>
                      <Table.Cell>
                        <div
                          className={`w-[50px] h-[20px] border border-gray-300 m-auto shadow-md rounded-full cursor-pointer flex items-center transition-colors duration-300 ${
                            category?.status
                              ? "bg-green-400 justify-end"
                              : "bg-red-400 justify-start"
                          }`}
                          onClick={() => handleStatusChange(category?._id)}
                        >
                          <span
                            className={`w-[24px] h-[18px] bg-white border-solid border-[1px] border-black rounded-full shadow-inner transform transition-transform duration-300`}
                          ></span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex justify-center items-center gap-2">
                          <Link
                            to={`/furniture/admin-panel/categories/update/${category?._id}`}
                            className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-green-400 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                            onClick={() =>
                              handleUpdateId(category?._id, "update")
                            }
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-red-600 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                            onClick={() => handleDeleteCategory(category?._id)}
                          >
                            <MdDeleteForever />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4" colSpan="5">
                    <p className="text-center">No records found!</p>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        {
          <div className="flex justify-between items-center mt-3">
            <div className="flex justify-center items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                1
              </span>
              to
              <span className="font-semibold text-gray-900 dark:text-white">
                {allCategories.length}
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                {totalRecords}
              </span>
              Entries
            </div>
            {totalPages > 1 && (
              <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                  currentPage={Math.min(Math.max(1, currentPage), totalPages)}
                  totalPages={totalPages}
                  onPageChange={(page) => onPageChange(page)}
                />
              </div>
            )}
          </div>
        }

        {/* Pagination would go here */}

        {/* Table Listing End */}
      </div>
      {/* Table Section End */}
    </>
  );
};
