import {
  Table,
  Checkbox,
  Tooltip,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "flowbite-react";
import { useContext, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { GrDocumentCsv } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BreadCrumb } from "../../UI/Breadcrumb";
import { useForm } from "react-hook-form";
import {
  changeColorsStatusService,
  deleteColorService,
  deleteMultipleColorsService,
} from "../../../Services/ColorServices";
import { CategoryFilterForm } from "../../UI/Category/CategoryFilterForm";
import { AddCategory } from "../../UI/Category/AddCategory";
import CategoryContextData from "../../../Context/CategoryContext";
import { BreadCrumbActionButtons } from "../../UI/Category/ActionButtons";

export const CategoryTableListing = () => {
  const {
    imageModal,
    currentPage,
    allCategories,
    filterData,
    totalRecords,
    totalPages,
    currentModalImage,
    handleFilterData,
    onPageChange,
    handleUpdateId,
    handleSelection,
    getAllColorsData,
    handleSortData,
    handleCloseImageModal,
    handleOpenImageModal,
  } = useContext(CategoryContextData);

  const { setValue } = useForm();
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
      const data = allCategories.map((material) => {
        return material._id;
      });
      setSelectedRecords(data);
    } else {
      setSelectedRecords([]);
    }
  };

  // Change Status of Materials
  const handleStatusChange = async (id) => {
    const response = await changeColorsStatusService({ id });

    if (response.success) {
      toast.success(response.message);
      getAllColorsData();
    }
  };

  // Handle Delete Materials
  const handleDeleteColors = async (id) => {
    const response = await deleteColorService({ id });

    if (response.success) {
      toast.success(response.message);
      getAllColorsData();
    }
  };

  // Handle Delete Multiple Data
  const handleDeleteMultipleColors = async () => {
    const response = await deleteMultipleColorsService({
      ids: selectedRecords,
    });

    if (response.success) {
      toast.success(response.message);
      getAllColorsData();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <section>
        {/* Body Header Start */}
        <div className="flex items-center mb-3">
          {/* Breadcrumb Start */}
          <BreadCrumb title={"Colors Listing"} subtitle={"Colors"} />
          {/* Breadcrumb End */}

          {/* Action Buttons Start */}
          <BreadCrumbActionButtons />
          {/* Action Buttons End */}
        </div>
        {/* Body Header End */}

        {/* Filter Section Start */}
        <CategoryFilterForm />
        {/* Filter Section End */}

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
                    placeholder="search by name"
                    value={filterData.name}
                    className="block py-1 px-3 text-sm text-gray-600 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(event) => handleFilterData(event)}
                  />
                </div>
              </form>
            </div>
            {/* Left Form End */}

            {/* Right Form Start */}
            <div className="rightForm">
              <div className="flex gap-1">
                <Tooltip content="Save Order" placement="top">
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
                    onClick={handleSortData}
                  >
                    <TbArrowsSort />
                  </button>
                </Tooltip>
                <Tooltip content="Delete Selected" placement="top">
                  <button
                    className="p-2 text-red-500 hover:bg-gray-100 rounded-lg border border-gray-200"
                    onClick={handleDeleteMultipleColors}
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
                <Table.HeadCell>Image</Table.HeadCell>
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
                            onClick={() =>
                              handleCheckboxSelection(category?._id)
                            }
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
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {category?.category_img ? (
                            <>
                              <img
                                src={category?.category_img}
                                className="w-[50px] h-[50px] mx-auto cursor-pointer"
                                onClick={() => {
                                  handleOpenImageModal(category?.category_img);
                                }}
                              />
                              <Modal
                                show={imageModal}
                                onClose={handleCloseImageModal}
                              >
                                <ModalHeader>Category Banner Image</ModalHeader>
                                <ModalBody>
                                  <div className="space-y-6">
                                    <img
                                      src={currentModalImage}
                                      className="w-[350px] h-[350px] mx-auto"
                                      onClick={() => setOpenModal(true)}
                                    />
                                  </div>
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="gray"
                                    onClick={handleOpenImageModal}
                                    className="mx-auto"
                                  >
                                    Close
                                  </Button>
                                </ModalFooter>
                              </Modal>
                            </>
                          ) : (
                            "N/A"
                          )}
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
                              to={`/furniture/admin-panel/colors/update/${category?._id}`}
                              className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-green-400 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                              onClick={() =>
                                handleUpdateId(category?._id, "update")
                              }
                            >
                              <MdEdit />
                            </Link>
                            <button
                              className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-red-600 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                              onClick={() => handleDeleteColors(category?._id)}
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

          {/* Pagination Start Here */}
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
          {/* Pagination Start End */}

          {/* Table Listing End */}
        </div>
        {/* Table Section End */}

        {/* Add Material Start */}
        <AddCategory />
        {/* Add  Start */}
      </section>
    </>
  );
};
