"use client";

import { useState } from "react";
import Breadcrumb from "./BreadCrumb";
import ProfileSidebar from "./ProfileSidebar";
import { toast } from "react-toastify";

export default function ManageAddress() {
  const [manageAddressData, setManageAddressData] = useState({
    country: "",
    city: "",
    zipCode: "",
  });

  // Handle Manage Address Form Submission
  const handleAddressForm = (event) => {
    event.preventDefault();

    toast.success("Address Saved Successfully!!");
    setManageAddressData({
      country: "",
      city: "",
      zipCode: "",
    });
  };

  // Handle Input Changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setManageAddressData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Manage Address Breadcrumb Start */}
      <Breadcrumb page={"Manage Address"} />
      {/* Manage Address Breadcrumb End */}

      {/* Manage Address Content Start */}
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Manage Address Sidebar Start */}
        <ProfileSidebar />
        {/* Manage Address Sidebar End */}

        {/* Manage Address Form Start */}
        <section className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10">
          <div className="py-5">
            <div className="w-full"></div>
            <form
              className="flex w-full flex-col gap-3"
              onSubmit={(e) => handleAddressForm(e)}
            >
              <div className="flex w-full flex-col">
                <label className="flex" htmlFor="name">
                  Country
                  <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                </label>
                <input
                  className="w-full border px-4 py-2 lg:w-1/2"
                  type="text"
                  placeholder="Serbia"
                  name="country"
                  value={manageAddressData.country}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex w-full flex-col">
                <label className="flex" htmlFor="name">
                  City
                  <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']"></span>
                </label>
                <input
                  className="w-full border px-4 py-2 lg:w-1/2"
                  type="text"
                  placeholder="Belgrade"
                  name="city"
                  value={manageAddressData.city}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Zip Code</label>
                <input
                  x-mask="999999"
                  className="w-full border px-4 py-2 lg:w-1/2"
                  placeholder="240116"
                  name="zipCode"
                  value={manageAddressData.zipCode}
                  onChange={handleInputChange}
                />
              </div>

              <button className="mt-4 w-40 bg-violet-900 px-4 py-2 text-white">
                Save changes
              </button>
            </form>
          </div>
        </section>
        {/* Manage Address Form End */}
      </section>
      {/* Manage Address Content End */}
    </>
  );
}
