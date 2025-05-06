import { useContext } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { Link } from "react-router-dom";
import UomContextData from "../../../Context/UomContext";

export const BreadCrumbActionButtons = () => {
  const { filterFormStatus, handleFilterFormVisibility, handleOpenModal } =
    useContext(UomContextData);

  return (
    <>
      <div className="basis-2/4 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center  shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]"
            onClick={() => handleFilterFormVisibility()}
          >
            {!filterFormStatus ? (
              <FaFilter className="text-white text-[1rem]" />
            ) : (
              <MdFilterAltOff
                className="text-white text-[1rem]"
                onClick={() => handleFilterFormVisibility()}
              />
            )}
          </button>
          <Link
            to={"/furniture/admin-panel/uom/create"}
            className="w-[2.5rem] h-[2.5rem] p-1 rounded-[50%] bg-[#3e8ef7] flex items-center justify-center shadow-lg transition-all duration-1000 ease-in-out hover:shadow-sm hover:bg-[#589FFC]"
            onClick={() => handleOpenModal("create")}
          >
            <FaPlus className="text-white text-[1rem]" />
          </Link>
        </div>
      </div>
    </>
  );
};
