import { Table, Checkbox, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { GrDocumentCsv } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { changeMaterialsStatus } from "../../../Services";

export const MaterialTableListing = ({ allMaterials }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [statusButtonId, setStatusButtonId] = useState([]);

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
      const data = allMaterials.map((material) => {
        return material._id;
      });
      setSelectedRecords(data);
    } else {
      setSelectedRecords([]);
    }
  };

  // Handle Status Button Status
  const handleStatusButton = (id) => {
    setStatusButtonId((prev) => {
      if (prev.includes(id)) {
        let data = prev.filter((materialId) => materialId !== id);
        return data;
      } else {
        return [...prev, id];
      }
    });
  };

  // Change Status of Materials
  const changeStatus = async () => {
    await changeMaterialsStatus(statusButtonId);
  };

  useEffect(() => {
    changeStatus();
  }, [statusButtonId]);

  console.log(statusButtonId);

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
                <Checkbox
                  defaultChecked="false"
                  onChange={handleSelectAllCheckboxes}
                  checked={
                    selectedRecords.length === allMaterials.length
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
            <Table.Body className="divide-y">
              {allMaterials?.length >= 1 ? (
                allMaterials.map((material) => {
                  const isActive = statusButtonId.includes(material?._id);
                  return (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={material?._id}
                    >
                      <Table.Cell className="p-4">
                        <Checkbox
                          defaultChecked="false"
                          onClick={() => handleCheckboxSelection(material?._id)}
                          checked={
                            selectedRecords.includes(material?._id)
                              ? "checked"
                              : ""
                          }
                        />
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {material?.name}
                      </Table.Cell>
                      <Table.Cell>2</Table.Cell>
                      <Table.Cell>
                        <div
                          className={`relative w-[50px] h-[20px] border-solid border-1 border-[#ccc]  shadow-md rounded-[50px] cursor-pointer ${
                            material?.status ? "bg-green-500" : "bg-red-500"
                          } transition-all duration-400 ease-in-out`}
                          onClick={() => handleStatusButton(material?._id)}
                        >
                          <span
                            className={`absolute top-[50%] translate-y-[-50%] border-solid border-1 border-[#0000ff] block w-[18px] h-[18px] bg-[#0000ff] rounded-full ${
                              material?.status
                                ? "translate-x-8"
                                : "translate-x-0"
                            } transition-all duration-400 ease-in-out`}
                          ></span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>Edit</Table.Cell>
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

        {/* Pagination would go here */}

        {/* Table Listing End */}
      </div>
      {/* Table Section End */}
    </>
  );
};
