import { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import CategoryContextData from "../../../Context/CategoryContext";

export const CategoryFilterForm = () => {
  const {
    filterFormStatus,
    filterData,
    handleFilterData,
    handleClearFilterForm,
  } = useContext(CategoryContextData);

  return (
    <>
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
            onChange={(event) => handleFilterData(event)}
          />
          <button className="flex items-center justify-center gap-2 py-1 px-4 bg-[#3e8ef7] text-white rounded-lg hover:bg-[#589FFC] transition-all duration-500 ease-in-out">
            <IoMdSearch className="text-[16px]" /> Filter Materials
          </button>
          <button
            className="py-1 px-4 bg-[#3e8ef7] text-white rounded-lg hover:bg-[#589FFC] transition-all duration-500 ease-in-out"
            onClick={() => handleClearFilterForm()}
          >
            Clear
          </button>
        </div>
        {/* Filter Form End */}
      </div>
      {/* Filter Section End */}
    </>
  );
};
