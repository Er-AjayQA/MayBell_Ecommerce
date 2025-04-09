import { Outlet } from "react-router";
import { Header } from "../UI/Header";
import { SideBarMenu } from "../UI/SideBarMenu";

export const MainLayout = () => {
  return (
    <>
      <div className="relative">
        <Header />
        <SideBarMenu />
        <Outlet />
      </div>
    </>
  );
};
