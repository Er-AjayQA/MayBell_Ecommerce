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
import { CategoryFilterForm } from "../../UI/Category/CategoryFilterForm";
import { AddCategory } from "../../UI/Category/AddCategory";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable separately
import Papa from "papaparse";
import ProductsContextData from "../../../Context/ProductsContext";
import {
  changeProductsStatusService,
  deleteMultipleProductsService,
  deleteProductsService,
} from "../../../Services/ProductsServices";
import { BreadCrumbActionButtons } from "../../UI/Products/ActionButtons";
import { AddProduct } from "../../UI/Products/AddProducts";
import { ProductFilterForm } from "../../UI/Products/ProductsFilterForm";

export const ProductTableListing = () => {
  const {
    imageModal,
    currentPage,
    allProducts,
    filterData,
    totalRecords,
    totalPages,
    currentModalImage,
    handleFilterData,
    onPageChange,
    handleUpdateId,
    handleSelection,
    getAllProductsData,
    handleSortData,
    handleCloseImageModal,
    handleOpenImageModal,
  } = useContext(ProductsContextData);

  const [selectedRecords, setSelectedRecords] = useState([]);

  // Handle Download CSV
  const handleDownloadCSV = () => {
    const dataToExport = allProducts.map((product) => ({
      Name: product.name,
      "Banner Image": product.image
        ? `=HYPERLINK("${product.image}", "Click to View")`
        : "N/A",
      Order: product.order || "N/A",
      Status: product.status ? "Active" : "Inactive",
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "productsList.csv");
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
      doc.text("Products List", 14, 15);

      // Prepare data for the table
      const headers = [["Name", "Product Image", "Order", "Status"]];
      const tableData = allProducts.map((product) => [
        product.name,
        product.image ? "View" : "N/A",
        product.order || "N/A",
        product.status ? "Active" : "Inactive",
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
          // Check if we're drawing the image column (index 1) and cell has content
          if (data.column.index === 1 && data.cell.raw === "View") {
            const product = allProducts[data.row.index];
            if (product.image) {
              // Add clickable link with new window flag
              doc.link(
                data.cell.x,
                data.cell.y,
                data.cell.width,
                data.cell.height,
                {
                  url: product.image,
                  newWindow: true, // This flag should theoretically open in new window
                }
              );
            }
          }
        },
      });

      // Save the PDF
      doc.save("productsList.pdf");
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
      const data = allProducts.map((product) => {
        return product._id;
      });
      setSelectedRecords(data);
    } else {
      setSelectedRecords([]);
    }
  };

  // Change Status of Products
  const handleStatusChange = async (id) => {
    const response = await changeProductsStatusService({ id });

    if (response.success) {
      toast.success(response.message);
      getAllProductsData();
    }
  };

  // Handle Delete Products
  const handleDeleteProduct = async (id) => {
    const response = await deleteProductsService({ id });

    if (response.success) {
      toast.success(response.message);
      getAllProductsData();
    }
  };

  // Handle Delete Multiple Data
  const handleDeleteMultipleProducts = async () => {
    const response = await deleteMultipleProductsService({
      ids: selectedRecords,
    });

    if (response.success) {
      toast.success(response.message);
      getAllProductsData();
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
          <BreadCrumb title={"Products Listing"} subtitle={"Products"} />
          {/* Breadcrumb End */}

          {/* Action Buttons Start */}
          <BreadCrumbActionButtons />
          {/* Action Buttons End */}
        </div>
        {/* Body Header End */}

        {/* Filter Section Start */}
        <ProductFilterForm />
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
                    onClick={handleDeleteMultipleProducts}
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
                      allProducts.length >= 1 &&
                      selectedRecords.length === allProducts.length
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
                {allProducts?.length >= 1 ? (
                  allProducts.map((product) => {
                    return (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                        key={product?._id}
                      >
                        <Table.Cell className="p-4">
                          <Checkbox
                            defaultChecked="false"
                            onClick={() =>
                              handleCheckboxSelection(product?._id)
                            }
                            checked={
                              selectedRecords.includes(product?._id)
                                ? "checked"
                                : ""
                            }
                          />
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {product?.name}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {product?.image ? (
                            <>
                              <img
                                src={product?.image}
                                className="w-[50px] h-[50px] mx-auto cursor-pointer object-contain"
                                onClick={() => {
                                  handleOpenImageModal(product?.image);
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
                                      className="w-[350px] h-[350px] mx-auto object-contain"
                                      onClick={() => setOpenModal(true)}
                                    />
                                  </div>
                                </ModalBody>
                                <ModalFooter>
                                  <Button
                                    color="gray"
                                    onClick={handleCloseImageModal}
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
                        <Table.Cell>{product?.order}</Table.Cell>
                        <Table.Cell>
                          <div
                            className={`w-[50px] h-[20px] border border-gray-300 m-auto shadow-md rounded-full cursor-pointer flex items-center transition-colors duration-300 ${
                              product?.status
                                ? "bg-green-400 justify-end"
                                : "bg-red-400 justify-start"
                            }`}
                            onClick={() => handleStatusChange(product?._id)}
                          >
                            <span
                              className={`w-[24px] h-[18px] bg-white border-solid border-[1px] border-black rounded-full shadow-inner transform transition-transform duration-300`}
                            ></span>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-center items-center gap-2">
                            <Link
                              to={`/furniture/admin-panel/products/update/${product?._id}`}
                              className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-green-400 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                              onClick={() =>
                                handleUpdateId(product?._id, "update")
                              }
                            >
                              <MdEdit />
                            </Link>
                            <button
                              className="p-2 flex justify-center items-center rounded-full bg-[#3E8EF7] text-white text-[20px] hover:text-red-600 hover:bg-gray-300 shadow-sm transition-all duration-300 ease-in-out"
                              onClick={() => handleDeleteProduct(product?._id)}
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
                    <Table.Cell className="p-4" colSpan="6">
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
                  {allProducts.length}
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
        <AddProduct />
        {/* Add  Start */}
      </section>
    </>
  );
};
