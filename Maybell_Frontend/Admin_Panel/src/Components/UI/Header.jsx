import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router";
import { CgLogOff } from "react-icons/cg";
import { FaHouse } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import CommonContextData from "../../Context/CommonContext";

export const Header = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(CommonContextData);

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar fluid rounded className="!p-0 shadow sticky top-0 z-[99]">
        <div
          className={`brand_logo border-e-[1px] border-solid border-[#ccc] ${
            isMenuOpen ? "basis-[15%]" : "basis-[8%]"
          } transition-all duration-[.4s] ease-linear`}
        >
          <Link
            to="/furniture/admin-panel"
            className="block py-[15px] px-[20px] flex items-center"
          >
            <img
              src="/Images/company-logo.svg"
              className="mr-3 w-[100px] h-[26px]"
              alt="MayBell Company Logo"
            />
          </Link>
        </div>
        <div
          className={`nav_header flex justify-between items-center px-[20px] ${
            isMenuOpen ? "basis-[85%]" : "basis-[90%]"
          } transition-all duration-[.4s] ease-linear`}
        >
          <div className="menu_icon">
            <RxHamburgerMenu
              className="cursor-pointer"
              onClick={() => handleMenuOpen()}
            />
          </div>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Item className="text-[#76838f] text-[14px]">
                <span>
                  <FaUser />
                </span>
                <span className="ms-[10px]">Profile</span>
              </Dropdown.Item>
              <Dropdown.Item className="text-[#76838f] text-[14px]">
                <span>
                  <FaHouse />
                </span>
                <span className="ms-[10px]">Company Profile</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-[#76838f] text-[14px]">
                <span className="text-[16px]">
                  <CgLogOff />
                </span>
                <span className="ms-[10px]">Logout</span>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        </div>
      </Navbar>
    </>
  );
};
