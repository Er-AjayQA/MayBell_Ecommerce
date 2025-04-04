"use client";

import { useState } from "react";
import Banner from "./Banner";
import Link from "next/link";

export default function ContactUs() {
  const [messageData, setMessageData] = useState({
    email: "",
    fullName: "",
    category: "",
    comment: "",
    isTermsAccepted: false,
  });

  // Handle Contact Form Submission
  const handleContactForm = (event) => {
    event.preventDefault();
    setMessageData({
      email: "",
      fullName: "",
      category: "",
      comment: "",
      isTermsAccepted: false,
    });
  };

  // Handle Input Change
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setMessageData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  console.log(messageData);

  return (
    <>
      <section className="w-full flex-grow">
        {/* Banner Start */}
        <Banner />
        {/* Banner End */}

        {/* Contact section Start */}
        <section className="mx-auto w-full my-6 grid max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 lg:grid-cols-3 lg:pt-10">
          <div>
            <div className="border py-5 shadow-md">
              <div className="flex justify-between px-4 pb-5">
                <p className="text-xl font-bold">Delivery</p>
              </div>

              <div className="flex flex-col px-4">
                <Link
                  className="flex items-center"
                  href="mailto:maybell@delivery.org"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  maybell@delivery.org
                </Link>
                <Link className="flex items-center" href="tel:+8(911)339-88-88">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  +8(911)339-88-88
                </Link>
                <Link className="flex items-center" href="tel:+8(911)339-88-88">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 01-5.183.501.78.78 0 00-.528.224l-3.579 3.58A.75.75 0 016 17.25v-3.443a41.033 41.033 0 01-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  +8(911)339-88-88
                </Link>
                <Link className="flex items-center" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </svg>
                  @maybell
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="border py-5 shadow-md">
              <div className="flex justify-between px-4 pb-5">
                <p className="text-xl font-bold">Support</p>
              </div>

              <div className="flex flex-col px-4">
                <Link
                  className="flex items-center"
                  href="mailto:maybell@delivery.org"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  maybell@delivery.org
                </Link>
                <Link className="flex items-center" href="tel:+8(911)339-88-88">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  +8(911)339-88-88
                </Link>
                <Link className="flex items-center" href="tel:+8(911)339-88-88">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 01-5.183.501.78.78 0 00-.528.224l-3.579 3.58A.75.75 0 016 17.25v-3.443a41.033 41.033 0 01-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  +8(911)339-88-88
                </Link>
                <Link className="flex items-center" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </svg>
                  @maybell
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="border py-5 shadow-md">
              <div className="flex justify-between px-4 pb-5">
                <p className="text-xl font-bold">Careers</p>
              </div>

              <div className="flex flex-col px-4">
                <Link
                  className="flex items-center"
                  href="mailto:maybell@delivery.org"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                  maybell@delivery.org
                </Link>
                <Link className="flex items-center" href="tel:+8(911)339-88-88">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  +8(911)339-88-88
                </Link>
                <Link className="flex items-center" href="tel:+8(911)339-88-88">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.43 2.524A41.29 41.29 0 0110 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 01-5.183.501.78.78 0 00-.528.224l-3.579 3.58A.75.75 0 016 17.25v-3.443a41.033 41.033 0 01-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  +8(911)339-88-88
                </Link>
                <Link className="flex items-center" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="mr-3 h-4 w-4 text-violet-900"
                  >
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </svg>
                  @maybell
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Contact section End */}

        <section className="mx-auto my-5 text-center">
          <h2 className="text-3xl font-bold">Have another question?</h2>
          <p>Complete the form below</p>
        </section>

        {/* Form End */}
        <form
          className="mx-auto my-5 max-w-[600px] px-5 pb-10"
          onSubmit={(e) => handleContactForm(e)}
        >
          <div className="mx-auto">
            <div className="my-3 flex w-full gap-2">
              <input
                className="w-1/2 border px-4 py-2"
                type="email"
                placeholder="E-mail"
                name="email"
                value={messageData.email}
                onChange={handleInputChange}
              />
              <input
                className="w-1/2 border px-4 py-2"
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={messageData.fullName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <select
            className="mb-3 w-full border px-4 py-2"
            name="category"
            id="pet-select"
            onChange={handleInputChange}
          >
            <option value="">Please choose a category</option>
            <option value="delivery">Delivery</option>
            <option value="support">Support</option>
            <option value="profile">Profile</option>
            <option value="careers">Careers</option>
            <option value="another">Another category</option>
          </select>

          <textarea
            className="w-full border px-4 py-2"
            placeholder="Write a commentary..."
            name="comment"
            id=""
            value={messageData.comment}
            onChange={handleInputChange}
          ></textarea>

          <div className="lg:items:center container mt-4 flex flex-col justify-between lg:flex-row">
            <div className="flex items-center">
              <input
                className="mr-3"
                type="checkbox"
                id="checkbox"
                name="isTermsAccepted"
                checked={messageData.isTermsAccepted}
                onChange={handleInputChange}
              />
              <label htmlFor="checkbox">
                I have read and agree with
                <a href="#" className="text-violet-900">
                  terms &amp; conditions
                </a>
              </label>
            </div>
            <button
              className={`my-3 bg-amber-400 px-4 py-2 lg:my-0 ${
                messageData.isTermsAccepted
                  ? "cursor-pointer bg-amber-400"
                  : "cursor-not-allowed bg-amber-200"
              }`}
              disabled={messageData.isTermsAccepted ? "" : "disabled"}
            >
              Send Message
            </button>
          </div>
        </form>
        {/* Form End */}
      </section>
    </>
  );
}
