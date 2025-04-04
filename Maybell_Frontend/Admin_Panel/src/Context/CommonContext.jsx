import { createContext, useState } from "react";

const CommonContextData = createContext();

export const CommonContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openViewForm, setOpenViewForm] = useState(false);

  const data = {
    isLogin,
    setIsLogin,
    isMenuOpen,
    setIsMenuOpen,
    openEditForm,
    setOpenEditForm,
    openViewForm,
    setOpenViewForm,
  };

  return (
    <>
      <CommonContextData.Provider value={data}>
        {children}
      </CommonContextData.Provider>
    </>
  );
};

export default CommonContextData;
