"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndPolicy: false,
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

    if (data.password !== data.confirmPassword) {
      return false;
    }

    if (!data.termsAndPolicy) {
      return false;
    }

    return true;
  };

  // Handle Login Form Data
  const handleRegisterFormSubmit = (event) => {
    event.preventDefault();

    const validateRegisterDetails = validateForm(registerData);

    if (validateRegisterDetails) {
      toast.success("Register Successfully");
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAndPolicy: false,
      });
      navigate.push("/login");
    } else {
      toast.error("All fields are required!");
    }
  };

  // Handle Input Fields
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      {/* Register Card Start */}
      <section className="mx-auto mt-10 w-full flex-grow mb-10 max-w-[1200px] px-5">
        <div className="container mx-auto border px-5 py-5 shadow-sm md:w-1/2">
          <div className="">
            <p className="text-4xl font-bold">CREATE AN ACCOUNT</p>
            <p>Register for new customer</p>
          </div>

          <form
            className="mt-6 flex flex-col"
            onSubmit={(e) => handleRegisterFormSubmit(e)}
          >
            <label htmlFor="name">Full Name</label>
            <input
              className="mb-3 mt-3 border px-4 py-2"
              type="text"
              placeholder="Bogdan Bulakh"
              name="name"
              value={registerData.name}
              onChange={handleInputChange}
            />

            <label className="mt-3" htmlFor="email">
              Email Address
            </label>
            <input
              className="mt-3 border px-4 py-2"
              type="email"
              placeholder="user@mail.com"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
            />

            <label className="mt-5" htmlFor="email">
              Password
            </label>
            <input
              className="mt-3 border px-4 py-2"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
            />

            <label className="mt-5" htmlFor="email">
              Confirm password
            </label>
            <input
              className="mt-3 border px-4 py-2"
              type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleInputChange}
            />

            <div className="flex gap-2 items-center my-4">
              <input
                type="checkbox"
                name="termsAndPolicy"
                id="termsPolicy"
                onChange={handleInputChange}
              />
              <label htmlFor="termsPolicy">
                I have read and agree with
                <a href="#" className="text-violet-900">
                  terms &amp; conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="my-5 w-full bg-violet-900 py-2 text-white"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="text-center text-gray-500">OR SIGN UP WITH</p>

          <div className="my-5 flex gap-2">
            <button className="w-1/2 bg-blue-800 py-2 text-white">
              FACEBOOK
            </button>
            <button className="w-1/2 bg-orange-500 py-2 text-white">
              GOOGLE
            </button>
          </div>

          <p className="text-center">
            Already have an account?
            <a href="login.html" className="text-violet-900">
              Login now
            </a>
          </p>
        </div>
      </section>
      {/* Register Card End */}
    </>
  );
}
