import { useContext } from "react";
import { Link } from "react-router";
import CommonContextData from "../../Context/CommonContext";

export const Footer = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(CommonContextData);

  return (
    <>
      <section
        className={`p-[20px] flex justify-between fixed bottom-0 end-0 ${
          isMenuOpen ? "start-[15%]" : "start-[8%]"
        } transition-all duration-[.4s] ease-linear`}
      >
        <div>
          <p className="text-[14px]">
            <span> © 2025 </span>
            <Link
              to="/furniture/admin-panel"
              className="text-[#3e8ef7] hover:underline"
            >
              Furniture
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[14px]">
            <span> Designed & Development by </span>
            <Link
              to="/furniture/admin-panel"
              className="text-[#3e8ef7] hover:underline"
            >
              Furniture
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};
