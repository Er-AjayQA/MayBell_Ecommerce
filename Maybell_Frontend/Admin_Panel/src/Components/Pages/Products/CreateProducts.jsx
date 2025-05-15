import { useContext } from "react";
import { BreadCrumb } from "../../UI/Breadcrumb";
import ProductsContextData from "../../../Context/ProductsContext";
import { AddProduct } from "../../UI/Products/AddProducts";

export const CreateProductPage = () => {
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

  return (
    <>
      <section>
        {/* Body Header Start */}
        <div className="flex items-center mb-3">
          {/* Breadcrumb Start */}
          <BreadCrumb title={"Colors Listing"} subtitle={"Colors"} />
          {/* Breadcrumb End */}
        </div>
        {/* Body Header End */}

        {/* Table Section Start */}
        <div className="bg-white shadow-sm mb-3 py-4 px-5 rounded-lg">
          {/* Table Listing Start */}
          <div className="overflow-y-auto h-[350px] rounded-lg border border-gray-200">
            {/* Add Products Start */}
            <AddProduct />
            {/* Add Products End */}
          </div>
          {/* Table Listing End */}
        </div>
        {/* Table Section End */}
      </section>
    </>
  );
};
