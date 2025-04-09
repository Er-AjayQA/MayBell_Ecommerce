import { Outlet } from "react-router-dom";
import { BreadCrumb } from "../UI/Breadcrumb";
import { Footer } from "../UI/Footer";
import { useContext } from "react";
import CommonContextData from "../../Context/CommonContext";

export const BodyLayout = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(CommonContextData);

  return (
    <>
      <div
        className={`p-8 bg-[#F1F4F5] ${
          isMenuOpen ? "ms-[15%]" : "ms-[8%]"
        } transition-all duration-[.4s] ease-linear`}
      >
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
