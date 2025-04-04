import { Checkbox, Table, Tooltip } from "flowbite-react";
import { AiOutlineSwap } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa6";
import { GrDocumentCsv } from "react-icons/gr";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useContext, useState } from "react";
import CommonContextData from "../../Context/CommonContext";
import { FaEye } from "react-icons/fa";

export const TableListing = ({ cols, rows }) => {
  const { setOpenEditForm, setOpenViewForm } = useContext(CommonContextData);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <>
      <div
        className={`overflow-x-auto px-[20px] py-[10px] transition-all duration-[.5s]`}
      >
        <div className="p-[20px] bg-[#fff]">
          {/* Table Form UI Start */}
          <div className="flex justify-between items-center">
            <div className="leftForm">
              <form className="max-w-sm mx-auto flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <label
                    htmlFor="countries"
                    className="block text-[13px] text-[#76838f] dark:text-white"
                  >
                    Show
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-[#76838f] text-sm focus:ring-blue-200 focus:border-blue-100 block  py-[3px] px-[10px]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-100 w-[80px] rounded-[2px] transition-all duration-[.2s] relative"
                  >
                    <option selected value="20">
                      20
                    </option>
                    <option value="35">35</option>
                    <option value="50">50</option>
                    <option value="all">All</option>
                  </select>
                  <span className="text-[#76838f] text-[13px]">entries</span>
                </div>
                <div className="flex items-center gap-1 ms-3">
                  <label
                    htmlFor="default-search"
                    className="block text-[13px] font-normal text-[#76838f] dark:text-white"
                  >
                    Search:
                  </label>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full py-[3px] px-[15px] text-[13px] text-[#76838f] border border-gray-300 focus:ring-blue focus:border-blue-100  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-100 rounded-[2px] transition-all duration-[.5s]"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="rightForm">
              <ul className="flex">
                <li>
                  <button className="p-[10px] opacity-65 bg-[#f3f7f9] hover:bg-[#76838f1a] transition-all duration-[.5s] border-[1px] border-[#e4eaec] border-solid ">
                    <AiOutlineSwap />
                  </button>
                </li>
                <li>
                  <button className="p-[10px] opacity-65 bg-[#f3f7f9] text-[#dc3545] hover:bg-[#76838f1a] transition-all duration-[.5s] border-[1px] border-[#e4eaec] border-solid ">
                    <RiDeleteBin5Fill />
                  </button>
                </li>
                <li>
                  <Tooltip
                    content="Save Order"
                    style="light"
                    placement="bottom"
                    className="text-[12px]"
                  >
                    <button className="p-[10px] opacity-65 border-[1px] hover:bg-[#76838f1a] transition-all duration-[.5s] border-[#e4eaec] border-solid ">
                      <TbArrowsSort />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip
                    content="Download CSV"
                    style="light"
                    placement="bottom"
                    className="text-[12px]"
                  >
                    <button className="p-[10px] opacity-65 border-[1px] hover:bg-[#76838f1a] transition-all duration-[.5s] border-[#e4eaec] border-solid ">
                      <GrDocumentCsv />
                    </button>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip
                    content="Download PDF"
                    style="light"
                    placement="bottom"
                    className="text-[12px]"
                  >
                    <button className="p-[10px] opacity-65 border-[1px] hover:bg-[#76838f1a] transition-all duration-[.5s] border-[#e4eaec] border-solid ">
                      <FaFilePdf />
                    </button>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
          {/* Table Form UI End */}

          {/* Table UI Start */}
          <Table hoverable className="!p-[20px] my-3 text-[#76838f]">
            <Table.Head>
              <Table.HeadCell className="p-3 bg-[#428EF7] cursor-pointer !rounded-none border-[1px] border-[#e4eae] border-solid w-[5%]">
                <Checkbox onClick={() => setSelectAll((prev) => !prev)} />
              </Table.HeadCell>
              {cols?.map((col, index) => {
                return (
                  <Table.HeadCell
                    className="p-3 font-normal bg-[#428EF7] text-[#fff] cursor-pointer border-[1px] border-[#e4eae] border-solid capitalize"
                    key={index}
                  >
                    {col}
                  </Table.HeadCell>
                );
              })}
              <Table.HeadCell className="p-3 font-normal bg-[#428EF7] text-[#fff] cursor-pointer border-[1px] border-[#e4eae] border-solid capitalize">
                Actions
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {rows?.length <= 0 ? (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell
                    className="p-3 border-[1px] border-[#e4eae] border-solid w-[5%]"
                    colSpan={cols.length + 2} // Adjusted colSpan to match columns
                  >
                    No Records Found!!
                  </Table.Cell>
                </Table.Row>
              ) : (
                rows?.map((row, index) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={index}
                  >
                    <Table.Cell className="p-3 border-[1px] border-[#e4eae] border-solid w-[5%]">
                      <Checkbox checked={selectAll ? "checked" : ""} />
                    </Table.Cell>
                    {cols?.map((col, colIndex) => (
                      <Table.Cell
                        key={colIndex}
                        className="whitespace-nowrap font-normal dark:text-white border-[1px] border-[#e4eae] border-solid"
                      >
                        {row[col.toLowerCase()]}
                      </Table.Cell>
                    ))}
                    <Table.Cell className="p-3 border-[1px] border-[#e4eae] border-solid">
                      <div className="flex justify-center gap-1">
                        <Tooltip
                          content="Edit"
                          style="light"
                          placement="bottom"
                          className="text-[12px]"
                        >
                          <button
                            className="font-medium text-[#fff] p-[10px] bg-[#0099B8] rounded-[50%] transition-all duration-[.4s]"
                            onClick={() => setOpenEditForm((prev) => !prev)}
                          >
                            <MdEdit />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="View Details"
                          style="light"
                          placement="bottom"
                          className="text-[12px]"
                        >
                          <button
                            className="font-medium text-[#fff] p-[10px] bg-[#0099B8] rounded-[50%] transition-all duration-[.4s]"
                            onClick={() => setOpenViewForm((prev) => !prev)}
                          >
                            <FaEye />
                          </button>
                        </Tooltip>

                        <Tooltip
                          content="View Image"
                          style="light"
                          placement="bottom"
                          className="text-[12px]"
                        >
                          <button className="font-medium text-[#fff] p-[10px] bg-[#247CF0] rounded-[50%] transition-all duration-[.4s]">
                            <HiOutlinePhotograph />
                          </button>
                        </Tooltip>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
          {/* Table UI End */}

          {/* Pagination UI Start */}
          <div className="page_infos flex justify-between items-center">
            <div>
              <p>Showing 1 to 3 of 3 entries</p>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    2
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* Pagination UI End */}
        </div>
      </div>
    </>
  );
};
