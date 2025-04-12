import { useEffect, useState } from "react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { BreadCrumb } from "../../UI/Breadcrumb";
import { AddMaterials } from "../../UI/Materials/AddMaterials";
import { MaterialFilterForm } from "../../UI/Materials/MaterialFilterForm";
import { MaterialTableListing } from "../../UI/Materials/MaterialListing";
import {
  getAllMaterialsService,
  getMaterialsDetailById,
} from "../../../Services/MaterialServices";
import { Link } from "react-router-dom";

export const Materials = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [filterFormStatus, setFilterFormStatus] = useState(false);
  const [filterData, setFilterData] = useState({ name: "" });
  const [allMaterials, setAllMaterials] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [materialDetails, setMaterialDetails] = useState([]);
  const [updateIdState, setUpdateIdState] = useState(false);

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

  // Get All Existing Materials
  const getAllMaterialsData = async () => {
    const response = await getAllMaterialsService(filterData);
    setAllMaterials(response.data);
  };

  // Handle Set Update Id
  const handleUpdateId = (id) => {
    handleCreateFormVisibility();
    setUpdateId((prev) => {
      if (!id) {
        return (prev = null);
      } else {
        return (prev = id);
      }
    });
  };

  // Get Material Detail
  const getMaterialById = async () => {
    const response = await getMaterialsDetailById(updateId);
    if (response.success) {
      setMaterialDetails(response.data);
    }
  };

  useEffect(() => {
    getAllMaterialsData();
  }, [filterData]);

  useEffect(() => {
    if (updateId === null) {
      setUpdateIdState(false);
    } else {
      setUpdateIdState(true);
      getMaterialById();
    }
  }, [updateId]);

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
              <button
                className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center  shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]"
                onClick={handleFilterFormVisibility}
              >
                {!filterFormStatus ? (
                  <FaFilter className="text-white text-[1rem]" />
                ) : (
                  <MdFilterAltOff
                    className="text-white text-[1rem]"
                    onClick={handleFilterFormVisibility}
                  />
                )}
              </button>
              <Link
                to={"/furniture/admin-panel/materials/create"}
                className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]"
                onClick={handleCreateFormVisibility}
              >
                <FaPlus className="text-white text-[1rem]" />
              </Link>
            </div>
          </div>
          {/* Action Buttons End */}
        </div>
        {/* Body Header End */}

        {/* Filter Section Start */}
        <MaterialFilterForm
          filterFormStatus={filterFormStatus}
          filterData={filterData}
          filterFormData={handleFilterData}
          filterFormReset={handleClearFilterForm}
        />
        {/* Filter Section End */}

        {/* Table Section Start */}
        <MaterialTableListing
          allMaterials={allMaterials}
          filterData={filterData}
          getAllMaterialsData={getAllMaterialsData}
          filterFormData={handleFilterData}
          handleUpdateId={handleUpdateId}
        />
        {/* Table Section End */}

        {/* Create Form Start */}
        <AddMaterials
          openCreateForm={openCreateForm}
          createForm={handleCreateFormVisibility}
          getAllMaterialsData={getAllMaterialsData}
          materialDetails={materialDetails}
          updateId={updateId}
          updateIdState={updateIdState}
        />
        {/* Create Form End */}
      </section>
    </>
  );
};
