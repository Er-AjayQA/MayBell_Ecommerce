import { useContext, useState } from "react";
import CommonContextData from "../../Context/CommonContext";
import { FaQuinscape } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import { LuPanelLeft, LuSpeech } from "react-icons/lu";
import { GrConfigure } from "react-icons/gr";
import { RiPagesLine, RiDashboard2Line } from "react-icons/ri";
import { SideBarMainMenuList } from "./SideBarMainMenuList";

export const SideBarMenu = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(CommonContextData);
  const [subMenuOpen, setSubMenuOpen] = useState("");

  const [menu, setMenu] = useState([
    { id: 1, name: "Dashboard", icon: <RiDashboard2Line /> },
    {
      id: 2,
      name: "Users Management",
      icon: <HiUsers />,
      subMenu: [
        { id: 101, name: "Admins", url: "/furniture/admin-panel/admins" },
        { id: 102, name: "Users", url: "/furniture/admin-panel/users" },
      ],
    },
    {
      id: 3,
      name: "Locations",
      icon: <IoLocationSharp />,
      subMenu: [
        { id: 103, name: "Countries", url: "/furniture/admin-panel/countries" },
      ],
    },
    {
      id: 4,
      name: "Master Catalogs",
      icon: <LuPanelLeft />,
      subMenu: [
        { id: 104, name: "Sliders", url: "/furniture/admin-panel/sliders" },
        {
          id: 105,
          name: "Testimonials",
          url: "/furniture/admin-panel/testimonials",
        },
        {
          id: 106,
          name: "Why Choose Us",
          url: "/furniture/admin-panel/why-choose-us",
        },
        { id: 107, name: "Coupons", url: "/furniture/admin-panel/coupons" },
      ],
    },
    {
      id: 5,
      name: "Product Catalogs",
      icon: <LuPanelLeft />,
      subMenu: [
        {
          id: 108,
          name: "Categories",
          url: "/furniture/admin-panel/category",
        },
        {
          id: 109,
          name: "SubCategories",
          url: "/furniture/admin-panel/sub-category",
        },
        {
          id: 110,
          name: "Materials",
          url: "/furniture/admin-panel/materials",
        },
        { id: 111, name: "Colors", url: "/furniture/admin-panel/colors" },
        { id: 112, name: "UOM", url: "/furniture/admin-panel/uom" },
        { id: 113, name: "Brands", url: "/furniture/admin-panel/brands" },
        { id: 114, name: "Products", url: "/furniture/admin-panel/products" },
      ],
    },
    {
      id: 6,
      name: "Enquiry",
      icon: <LuSpeech />,
      subMenu: [
        {
          id: 115,
          name: "Contact Enquiry",
          url: "/furniture/admin-panel/enquiry",
        },
        {
          id: 116,
          name: "Newsletters",
          url: "/furniture/admin-panel/newsletters",
        },
      ],
    },
    {
      id: 7,
      name: "Configurations",
      icon: <GrConfigure />,
      subMenu: [
        {
          id: 117,
          name: "Payment Gateways",
          url: "/furniture/admin-panel/payment-gateways",
        },
        {
          id: 118,
          name: "Configurations",
          url: "/furniture/admin-panel/configurations",
        },
      ],
    },
    {
      id: 8,
      name: "FAQ",
      url: "/furniture/admin-panel/faq",
      icon: <FaQuinscape />,
    },
    {
      id: 9,
      name: "CMS Pages",
      url: "/furniture/admin-panel/cms-pages",
      icon: <RiPagesLine />,
    },
  ]);

  const handleSubmenuToggle = (id) => {
    if (isMenuOpen) {
      if (subMenuOpen === id) {
        setSubMenuOpen(""); // Close submenu if it's already open
      } else {
        setTimeout(() => setSubMenuOpen(id), 100); // Small delay before opening new one
      }
    }
  };

  return (
    <>
      <section
        className={`bg-[#2A363C] text-[#fff] fixed h-[100%] z-[99] ${
          isMenuOpen ? "w-[15%]" : "w-[8%]"
        } transition-all duration-[.4s] ease-linear`}
      >
        <ul className="flex flex-col">
          {menu.length >= 1
            ? menu.map((item) => {
                return (
                  <SideBarMainMenuList
                    key={item.id}
                    item={item}
                    handleSubmenuToggle={handleSubmenuToggle}
                    isMenuOpen={isMenuOpen}
                    subMenuOpen={subMenuOpen}
                    setSubMenuOpen={setSubMenuOpen}
                  />
                );
              })
            : ""}
        </ul>
      </section>
    </>
  );
};
