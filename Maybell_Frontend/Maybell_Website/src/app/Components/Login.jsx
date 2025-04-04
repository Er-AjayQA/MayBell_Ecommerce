"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    isRemember: false,
  });
  const navigate = useRouter();

  // Handle Form Validation
  const validateForm = (data) => {
    if (data.email === "") {
      return false;
    }

    if (data.password === "") {
      return false;
    }

    return true;
  };

  // Handle Login Form Data
  const handleLoginFormSubmit = (event) => {
    event.preventDefault();

    const validateLoginDetails = validateForm(loginData);

    if (validateLoginDetails) {
      toast.success("Login Successfully!!");
      navigate.push("/");
      setLoginData({
        email: "",
        password: "",
        isRemember: false,
      });
    } else {
      toast.error("All fields are required!!");
    }
  };

  // Handle Input Fields
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      {/* Login card Start */}
      <section className="mx-auto flex-grow w-full mt-10 mb-10 max-w-[1200px] px-5">
        <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2">
          <div className="">
            <p className="text-4xl font-bold">LOGIN</p>
            <p>Welcome back, customer!</p>
          </div>

          <form
            className="mt-6 flex flex-col"
            onSubmit={(e) => handleLoginFormSubmit(e)}
          >
            <label htmlFor="email">Email Address</label>
            <input
              className="mb-3 mt-3 border px-4 py-2"
              type="email"
              name="email"
              value={loginData.email}
              placeholder="youremail@domain.com"
              onChange={handleInputChange}
            />

            <label htmlFor="email">Password</label>
            <input
              className="mt-3 border px-4 py-2"
              type="password"
              name="password"
              value={loginData.password}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isRemember"
                  id="email"
                  onChange={handleInputChange}
                />
                <label htmlFor="email" className="ms-2">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-violet-900">
                Forgot password
              </a>
            </div>
            <button
              type="submit"
              className="my-5 w-full bg-violet-900 py-2 text-white"
            >
              LOGIN
            </button>
          </form>

          <p className="text-center text-gray-500">OR LOGIN WITH</p>

          <div className="my-5 flex gap-2">
            <button className="w-1/2 bg-blue-800 py-2 text-white">
              FACEBOOK
            </button>
            <button className="w-1/2 bg-orange-500 py-2 text-white">
              GOOGLE
            </button>
          </div>

          <p className="text-center">
            Don`t have account?
            <Link href="/register" className="text-violet-900">
              Register now
            </Link>
          </p>
        </div>
      </section>
      {/* Login Card End */}
    </>
  );
}
