import { Outlet } from "react-router";
import { Header } from "../UI/Header";
import { SideBarMenu } from "../UI/SideBarMenu";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <SideBarMenu />
      <Outlet />
    </>
  );
};
