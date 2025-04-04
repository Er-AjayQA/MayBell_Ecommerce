"use client";

import Link from "next/link";
import Breadcrumb from "./BreadCrumb";
import ProfileSidebar from "./ProfileSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useRouter();

  useEffect(() => {
    if (!isLogin) {
      navigate.push("/login");
    }
  }, [isLogin]);

  return (
    <>
      {/* Profile Breadcrumb Start */}
      <Breadcrumb page={"Profile"} />
      {/* Profile Breadcrumb End */}

      {/* Profile Content Start */}
      <section className="container mx-auto w-full flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Profile Sidebar Start */}
        <ProfileSidebar />
        {/* Profile Sidebar End */}

        {/* Option Cards Start */}
        <div className="mb-5 flex items-center justify-between px-5 md:hidden">
          <div className="flex gap-3">
            <div className="py-5">
              <div className="flex items-center">
                <img
                  width="40px"
                  height="40px"
                  className="rounded-full object-cover"
                  src="./assets/images/avatar-photo.png"
                  alt="Red woman portrait"
                />
                <div className="ml-5">
                  <p className="font-medium text-gray-500">Hello,</p>
                  <p className="font-bold">Sarah Johnson</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="border bg-amber-400 py-2 px-2">
              Profile settings
            </button>
          </div>
        </div>

        <section className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 lg:grid-cols-3">
          <div className="">
            <div className="border py-5 shadow-md">
              <div className="flex justify-between px-4 pb-5">
                <p className="font-bold">Personal Profile</p>
                <Link
                  className="text-sm text-violet-900"
                  href="/profile-information"
                >
                  Edit
                </Link>
              </div>

              <div className="px-4">
                <p>Sarah Johnson</p>
                <p>sarah@yandex.com</p>
                <p>20371</p>
                <p className="">1223 3432 3344 0082</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="border py-5 shadow-md">
              <div className="flex justify-between px-4 pb-5">
                <p className="font-bold">Shipping Address</p>
                <Link
                  className="text-sm text-violet-900"
                  href="/manage-address"
                >
                  Edit
                </Link>
              </div>

              <div className="px-4">
                <p>Sarah Johnson</p>
                <p>Belgrade, Serbia</p>
                <p>20371</p>
                <p>1223 3432 3344 0082</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="border py-5 shadow-md">
              <div className="flex justify-between px-4 pb-5">
                <p className="font-bold">Billing Address</p>
                <Link
                  className="text-sm text-violet-900"
                  href="/profile-information"
                >
                  Edit
                </Link>
              </div>

              <div className="px-4">
                <p>Sarah Johnson</p>
                <p>Belgrade, Serbia</p>
                <p>20371</p>
                <p>1223 3432 3344 0082</p>
              </div>
            </div>
          </div>
        </section>
        {/* Option Cards End */}
      </section>
      {/* Profile Content End */}
    </>
  );
}
