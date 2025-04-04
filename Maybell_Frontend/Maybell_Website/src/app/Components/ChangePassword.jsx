"use client";

import { useState } from "react";
import Breadcrumb from "./BreadCrumb";
import ProfileSidebar from "./ProfileSidebar";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle the Password Change Form Submission
  const handleChangePasswordForm = (event) => {
    event.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Password Mismatch!!");
    } else {
      toast.success("Password Changed Successfully!!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  // Handle The Input Change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Change Password Breadcrumb Start */}
      <Breadcrumb page={"Change Password"} />
      {/* Change Password Breadcrumb End */}

      {/* Change Password Content Start */}
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Change Password Sidebar Start */}
        <ProfileSidebar />
        {/* Change Password Sidebar End */}

        {/* Change Password Form Start */}
        <section className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10">
          <div className="py-5">
            <div className="w-full"></div>
            <form
              className="flex w-full flex-col gap-3"
              onSubmit={(e) => handleChangePasswordForm(e)}
            >
              <div className="flex w-full flex-col">
                <label className="flex" htmlFor="name">
                  Current password
                  <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                </label>
                <input
                  className="w-full border px-4 py-2 lg:w-1/2"
                  type="password"
                  placeholder=""
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex w-full flex-col">
                <label className="flex" htmlFor="name">
                  New Password
                  <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                </label>
                <input
                  className="w-full border px-4 py-2 lg:w-1/2"
                  type="password"
                  placeholder=""
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <label className="flex" htmlFor="">
                  Repeat New Password
                  <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                </label>
                <input
                  className="w-full border px-4 py-2 lg:w-1/2"
                  type="password"
                  placeholder=""
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              <button className="mt-4 w-40 bg-violet-900 px-4 py-2 text-white">
                Save changes
              </button>
            </form>
          </div>
        </section>
        {/* Change Password Form End */}
      </section>
      {/* Change Password Content End */}
    </>
  );
}
