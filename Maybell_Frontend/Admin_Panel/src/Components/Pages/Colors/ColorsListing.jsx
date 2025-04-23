import { Table, Checkbox, Tooltip, Pagination } from "flowbite-react";
import { useContext, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { GrDocumentCsv } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BreadCrumb } from "../../UI/Breadcrumb";
import ColorsContextData from "../../../Context/ColorsContext";
import { ColorsFilterForm } from "../../UI/Colors/ColorsFilterForm";
import { AddColors } from "../../UI/Colors/AddColors";
import { BreadCrumbActionButtons } from "../../UI/Colors/ActionButtons";
import {
  changeColorsStatusService,
  deleteColorService,
  deleteMultipleColorsService,
} from "../../../Services/ColorServices";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable separately
import Papa from "papaparse";

export const ColorsTableListing = () => {
  const {
    currentPage,
    allColors,
    filterData,
    totalRecords,
    totalPages,
    handleFilterData,
    onPageChange,
    handleUpdateId,
    handleSelection,
    getAllColorsData,
    handleSortData,
  } = useContext(ColorsContextData);

  const [selectedRecords, setSelectedRecords] = useState([]);

  // Handle Download CSV
  const handleDownloadCSV = () => {
    const dataToExport = allColors.map((color) => ({
      Name: color.name,
      Order: color.order || "N/A",
      code: color.colorCode || "N/A",
      Status: color.status ? "Active" : "Inactive",
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "colorsList.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Download PDF - Fixed version
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(16);
      doc.text("Colors List", 14, 15);

      // Prepare data for the table
      const headers = [["Name", "Order", "Color Code", "Preview", "Status"]];
      const tableData = allColors.map((color) => [
        color.name,
        color.order || "N/A",
        color.colorCode || "N/A",
        "",
        color.status ? "Active" : "Inactive",
      ]);

      // Add table using the separately imported autoTable
      autoTable(doc, {
        theme: "grid",
        head: headers,
        body: tableData,
        startY: 25,
        styles: {
          cellPadding: 3,
          fontSize: 9,
          valign: "middle",
          halign: "center",
        },
        headStyles: {
          fillColor: [62, 142, 247],
          textColor: 255,
          fontStyle: "bold",
          cellWidth: "wrap",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
        columnStyles: {
          1: {
            // This is the index of the "Category Image" column (0-based)
            cellWidth: 60, // Set your desired fixed width here (in mm)
          },
        },
        didDrawCell: (data) => {
          // Only draw color swatches in the Preview column (index 3)
          if (data.column.index === 3 && data.cell.section === "body") {
            const color = allColors[data.row.index];
            if (color.colorCode) {
              doc.setFillColor(color.colorCode);
              doc.rect(
                data.cell.x + 2,
                data.cell.y + 2,
                data.cell.width - 4,
                data.cell.height - 4,
                "F"
              );
            }
          }
        },
      });

      // Save the PDF
      doc.save("colorsList.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

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
      const data = allColors.map((material) => {
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
        <ColorsFilterForm />
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
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
                    onClick={handleDownloadCSV}
                  >
                    <GrDocumentCsv />
                  </button>
                </Tooltip>
                <Tooltip content="Download PDF" placement="top">
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"
                    onClick={handleDownloadPDF}
                  >
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
                      allColors.length >= 1 &&
                      selectedRecords.length === allColors.length
                        ? "checked"
                        : ""
                    }
                  />
                </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Code</Table.HeadCell>
                <Table.HeadCell>Preview</Table.HeadCell>
                <Table.HeadCell>Order</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y ">
                {allColors?.length >= 1 ? (
                  allColors.map((color) => {
                    return (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                        key={color?._id}
                      >
                        <Table.Cell className="p-4">
                          <Checkbox
                            defaultChecked="false"
                            onClick={() => handleCheckboxSelection(color?._id)}
                            checked={
                              selectedRecords.includes(color?._id)
                                ? "checked"
                                : ""
                            }
                          />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {color?.name}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {color?.colorCode}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <div
                            className={`w-[30px] h-[30px] rounded-full mx-auto shadow-md`}
                            style={{ backgroundColor: color?.colorCode }}
                          />
                        </Table.Cell>
                        <Table.Cell>{color?.order}</Table.Cell>
                        <Table.Cell>
                          <div
                            className={`w-[50px] h-[20px] border border-gray-300 m-auto shadow-md rounded-full cursor-pointer flex items-center transition-colors duration-300 ${
                              color?.status
                                ? "bg-green-400 justify-end"
                                : "bg-red-400 justify-start"
                            }`}
                            onClick={() => handleStatusChange(color?._id)}
                          >
                            <span
                              className={`w-[24px] h-[18px] bg-white border-solid border-[1px] border-black rounded-full shadow-inner transform transition-transform duration-300`}
                            ></span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-center items-center gap-2">
                            <Link
                              to={`/furniture/admin-panel/colors/update/${color?._id}`}
                              className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-green-400 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                              onClick={() =>
                                handleUpdateId(color?._id, "update")
                              }
                            >
                              <MdEdit />
                            </Link>
                            <button
                              className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-red-600 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                              onClick={() => handleDeleteColors(color?._id)}
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
                  {allColors.length}
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
        <AddColors />
        {/* Add  Start */}
      </section>
    </>
  );
};
