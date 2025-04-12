import { Outlet } from "react-router";
import { Header } from "../UI/Header";
import { SideBarMenu } from "../UI/SideBarMenu";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
  return (
    <>
      <div className="relative">
        <ToastContainer autoClose={1000} />
        <Header />
        <SideBarMenu />
        <Outlet />
      </div>
    </>
  );
};
