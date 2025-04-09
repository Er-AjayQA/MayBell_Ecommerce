import { useState } from "react";
import { Table, Tooltip, Checkbox, Footer } from "flowbite-react";
import { FaPlus, FaFilter, FaFilePdf } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BreadCrumb } from "../UI/Breadcrumb";
import { AiOutlineSwap } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { GrDocumentCsv } from "react-icons/gr";

export const Materials = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });

  // Handle Create Form Visibility
  const handleCreateFormVisibility = () => {
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
    setFilterData({ name: "" });
  };

  return (
    <>
      <section>
        {/* Body Header Start */}
        <div className="flex items-center mb-3">
          {/* Breadcrumb Start */}
          <BreadCrumb title={"Materials Listing"} subtitle={"Materials"} />
          {/* Breadcrumb End */}

          {/* Action Buttons Start */}
          <div className="basis-2/4 text-right">
            <div className="flex items-center justify-end gap-3">
              <button className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center  shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]">
                {!filterFormStatus ? (
                  <FaFilter
                    className="text-white text-[1rem]"
                    onClick={handleFilterFormVisibility}
                  />
                ) : (
                  <MdFilterAltOff
                    className="text-white text-[1rem]"
                    onClick={handleFilterFormVisibility}
                  />
                )}
              </button>
              <button
                className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]"
                onClick={handleCreateFormVisibility}
              >
                <FaPlus className="text-white text-[1rem]" />
              </button>
            </div>
          </div>
          {/* Action Buttons End */}
        </div>
        {/* Body Header End */}

        {/* Filter Section Start */}
        <div
          className={`bg-white py-4 px-5 shadow-sm mb-3 transition-all duration-500 ease-in-out ${
            filterFormStatus
              ? "opacity-100 max-h-[200px] overflow-visible"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          {/* Filter Title Start */}
          <h2 className="py-3">Filters</h2>
          {/* Filter Title End */}

          {/* Filter Form Start */}
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filterData.name}
              className="py-1 px-3 rounded-lg basis-[30%]"
              onChange={handleFilterData}
            />
            <button className="flex items-center justify-center gap-2 py-1 px-4 bg-[#3e8ef7] text-white rounded-lg hover:bg-[#589FFC] transition-all duration-500 ease-in-out">
              <IoMdSearch className="text-[16px]" /> Filter Materials
            </button>
            <button
              className="py-1 px-4 bg-[#3e8ef7] text-white rounded-lg hover:bg-[#589FFC] transition-all duration-500 ease-in-out"
              onClick={handleClearFilterForm}
            >
              Clear
            </button>
          </div>
          {/* Filter Form End */}
        </div>
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
                  >
                    <option value="20">20</option>
                    <option value="35">35</option>
                    <option value="50">50</option>
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
                    id="default-search"
                    className="block py-1 px-3 text-sm text-gray-600 border rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </form>
            </div>
            {/* Left Form End */}

            {/* Right Form Start */}
            <div className="rightForm">
              <div className="flex gap-1">
                <Tooltip content="Reorder" placement="bottom">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200">
                    <AiOutlineSwap />
                  </button>
                </Tooltip>
                <Tooltip content="Delete Selected" placement="bottom">
                  <button className="p-2 text-red-500 hover:bg-gray-100 rounded-lg border border-gray-200">
                    <RiDeleteBin5Fill />
                  </button>
                </Tooltip>
                <Tooltip content="Save Order" placement="bottom">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200">
                    <TbArrowsSort />
                  </button>
                </Tooltip>
                <Tooltip content="Download CSV" placement="bottom">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200">
                    <GrDocumentCsv />
                  </button>
                </Tooltip>
                <Tooltip content="Download PDF" placement="bottom">
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
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-4">
                  <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Order</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Apple MacBook Pro 17
                  </Table.Cell>
                  <Table.Cell>2</Table.Cell>
                  <Table.Cell>Active</Table.Cell>
                  <Table.Cell>Edit</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>

          {/* Pagination would go here */}

          {/* Table Listing End */}

          {/* Create Form Start */}
          <div
            className={`absolute top-0 start-0 w-full h-[100vh] bg-[#00000052] z-[99] transition-all duration-500 ease-in-out ${
              !openCreateForm ? "hidden" : "visible"
            }`}
          >
            <div className="absolute top-[20%] start-[50%] translate-x-[-50%] translate-y-[-20%] rounded-md bg-white z-[999] p-5 min-w-[500px]">
              <div className="mb-3 flex items-center justify-between">
                <h1 className="py-3 font-bold">Create Material</h1>
                <IoClose
                  className="cursor-pointer"
                  onClick={handleCreateFormVisibility}
                />
              </div>
              <div>
                <form className="max-w-full">
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@flowbite.com"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Order
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@flowbite.com"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="submit"
                      className="text-black bg-gray-400 hover:bg-gray-300 focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      onClick={handleCreateFormVisibility}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      Create Material
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Create Form End */}
        </div>
        {/* Table Section End */}
      </section>
    </>
  );
};
