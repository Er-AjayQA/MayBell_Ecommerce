import { Outlet } from "react-router";
import { Header } from "../UI/Header";
import { SideBarMenu } from "../UI/SideBarMenu";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
  return (
    <>
      <div className="relative">
        <ToastContainer />
        <Header />
        <SideBarMenu />
        <Outlet />
      </div>
    </>
  );
};
