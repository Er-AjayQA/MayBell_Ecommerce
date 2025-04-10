import { useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { BreadCrumb } from "../../UI/Breadcrumb";
import { AddMaterials } from "../../UI/Materials/AddMaterials";
import { MaterialFilterForm } from "../../UI/Materials/MaterialFilterForm";
import { MaterialTableListing } from "../../UI/Materials/MaterialListing";

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
        <MaterialFilterForm
          filterFormStatus={filterFormStatus}
          setFilterFormStatus={setFilterFormStatus}
          filterData={filterData}
          setFilterData={setFilterData}
          filterFormData={handleFilterData}
          filterFormReset={handleClearFilterForm}
        />
        {/* Filter Section End */}

        {/* Table Section Start */}
        <MaterialTableListing />
        {/* Table Section End */}

        {/* Create Form Start */}
        <AddMaterials
          openCreateForm={openCreateForm}
          createForm={handleCreateFormVisibility}
        />
        {/* Create Form End */}
      </section>
    </>
  );
};
