import { useContext, useState } from "react";
import { BodyHeader } from "./BodyHeader";
import { Footer } from "./Footer";
import { TableListing } from "./TableListing";
import CommonContextData from "../../Context/CommonContext";
import { EditFormCommon } from "./EditFormCommon";
import { ViewFormCommon } from "./ViewFormCommon";

export const PageBody = ({ cols, rows }) => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    openEditForm,
    setOpenEditForm,
    openViewForm,
    setOpenViewForm,
  } = useContext(CommonContextData);
  const [filterFormStatus, setFilterFormStatus] = useState(false);

  // Handle Filter Form Visibility
  const handleFilterForm = () => {
    setFilterFormStatus(!filterFormStatus);
  };
  return (
    <>
      <section
        className={`${
          isMenuOpen ? "ms-[15%]" : "ms-[8%]"
        } transition-all duration-[.4s] ease-linear`}
      >
        <div className="bg-[#F1F4F5] h-[100vh]">
          <BodyHeader
            filterFormStatus={filterFormStatus}
            handleFilterForm={handleFilterForm}
          />
          <TableListing cols={cols} rows={rows} />
          <EditFormCommon
            openEditForm={openEditForm}
            setOpenEditForm={setOpenEditForm}
          />
          <ViewFormCommon
            openViewForm={openViewForm}
            setOpenViewForm={setOpenViewForm}
          />
        </div>
        <Footer />
      </section>
    </>
  );
};
