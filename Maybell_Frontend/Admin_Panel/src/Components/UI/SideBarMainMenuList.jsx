import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

export const SideBarMainMenuList = ({
  item,
  handleSubmenuToggle,
  isMenuOpen,
  subMenuOpen,
  setSubMenuOpen,
}) => {
  return (
    <>
      <li
        className="relative min-h-[60px]"
        onClick={isMenuOpen ? () => handleSubmenuToggle(item.id) : null}
        onMouseEnter={!isMenuOpen ? () => setSubMenuOpen(item.id) : null}
        onMouseLeave={!isMenuOpen ? () => setSubMenuOpen("") : null}
      >
        <Link
          to={item.url ? item.url : "#"}
          className={`flex items-center ${
            isMenuOpen ? "" : "justify-center"
          } gap-2 px-[20px] py-[10px] text-[#a3afb7e6] hover:text-[#fff] hover:bg-[#ffffff05] transition-all duration-[.2s]`}
        >
          {isMenuOpen ? (
            <>
              <span>{item.icon}</span>
              {item.name}
              <span className="ms-auto">
                {item.subMenu?.length >= 1 ? (
                  subMenuOpen === item.id ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleRight />
                  )
                ) : (
                  ""
                )}
              </span>
            </>
          ) : (
            <span
              className={`${
                subMenuOpen === item.id ? "text-[14px]" : "text-[30px]"
              }`}
            >
              {subMenuOpen === item.id ? item.name : item.icon}
            </span>
          )}
        </Link>
        {item.subMenu ? (
          <ul
            className={`transition-transform duration-200 ease-in-out absolute bg-[#242f35] shadow-md ${
              isMenuOpen
                ? `relative left-0 origin-top shadow-none ${
                    subMenuOpen === item.id
                      ? "submenu-visible"
                      : "submenu-hidden"
                  }`
                : `top-0 origin-left left-full w-40 ${
                    subMenuOpen === item.id ? "submenu-sideOpen" : "hidden"
                  }`
            }`}
          >
            {item.subMenu.map((menu) => {
              return (
                <li key={menu.id}>
                  <Link
                    to={menu.url ? menu.url : "#"}
                    className={`flex items-center  gap-2 ${
                      !isMenuOpen ? "ps-[20px]" : "ps-[60px]"
                    }  pe-[20px] py-[10px] text-[#a3afb7e6] hover:text-[#fff] hover:bg-[#ffffff05] transition-all duration-[.2s]`}
                  >
                    {menu.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </li>
    </>
  );
};
