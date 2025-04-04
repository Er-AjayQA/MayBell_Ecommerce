"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Banner from "./Banner";
import TopArrivalProduct from "./TopArrivalProducts";
import RecommendedProducts from "./RecommendedProducts";
import CategoryCards from "./CategoryCards";

export default function Home() {
  const [topArrivalProducts, setTopArrivalProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Get Top Arrival Products
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          limit: 8,
          categories: "furniture",
        },
      })
      .then((result) => {
        setTopArrivalProducts(result.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong !!");
      });
  }, []);

  // Get Recommended Products
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          limit: 8,
          categories: "home-decoration",
        },
      })
      .then((result) => {
        setRecommendedProducts(result.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong !!");
      });
  }, []);

  // Get Categories List
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php", {
        params: {
          limit: 6,
          categories: "home-decoration",
        },
      })
      .then((result) => {
        setCategories(result.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong !!");
      });
  }, []);

  return (
    <>
      {/* Menu Start */}
      <section
        x-show="desktopMenuOpen"
        onClick={() => setDesktopMenuOpen(false)}
        className="absolute left-0 right-0 z-10 w-full border-b border-r border-l bg-white hidden"
      >
        <div className="mx-auto flex max-w-[1200px] py-10">
          <div className="w-[300px] border-r">
            <ul className="px-5">
              <li className="active:blue-900 flex items-center gap-2 bg-amber-400 py-2 px-3 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="/images/bed.svg"
                  alt="Bedroom icon"
                />
                Bedroom
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="/images/sleep.svg"
                  alt="bedroom icon"
                />
                Matrass
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="/images/outdoor.svg"
                  alt="bedroom icon"
                />
                Outdoor
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="/images/sofa.svg"
                  alt="bedroom icon"
                />
                Sofa
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="/images/kitchen.svg"
                  alt="bedroom icon"
                />
                Kitchen
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                <img
                  width="15px"
                  height="15px"
                  src="/images/food.svg"
                  alt="Food icon"
                />
                Living room
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex gap-6">
              <div className="mx-5">
                <p className="font-medium text-gray-500">BEDS</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Italian bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Queen-size bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Wooden craft bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">King-size bed</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">LAMPS</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Italian Purple Lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">APEX Lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">PIXAR lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Ambient Nightlamp</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">BEDSIDE TABLES</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Purple Table</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Easy Bedside</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Soft Table</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Craft Table</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">SPECIAL</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Humidifier</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Bed Cleaner</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Vacuum Cleaner</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Pillow</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Menu   */}

      {/* Banner  Start */}
      <Banner />
      {/* Banner  End */}

      {/* Cons badges Start */}
      <section className="container mx-auto my-8 flex flex-col justify-center gap-3 lg:flex-row">
        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              Free Delivery
            </h3>
            <p className="text-light text-center text-xs lg:text-left lg:text-sm">
              Orders from $200
            </p>
          </div>
        </div>

        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              Money returns
            </h3>
            <p className="text-light text-left text-xs lg:text-sm">
              30 Days guarantee
            </p>
          </div>
        </div>

        <div className="mx-5 flex flex-row items-center justify-center border-2 border-yellow-400 py-4 px-5">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-violet-900 lg:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <div className="ml-6 flex flex-col justify-center">
            <h3 className="text-left text-xs font-bold lg:text-sm">
              24/7 Supports
            </h3>
            <p className="text-light text-left text-xs lg:text-sm">
              Consumer support
            </p>
          </div>
        </div>
      </section>
      {/* Cons badges End  */}

      {/* Categories Section Start */}
      <h2 className="mx-auto mb-5 max-w-[1200px] px-5">SHOP BY CATEGORY</h2>
      <section
        className={`mx-auto grid max-w-[1200px] px-5 ${
          categories.length <= 0
            ? "grid-cols-1"
            : "grid-cols-2 lg:grid-cols-3 lg:gap-5"
        }`}
      >
        {categories.length <= 0 ? (
          <p className="text-center">No Categories Listed!!</p>
        ) : (
          categories.map((category, i) =>
            i <= 5 ? (
              <CategoryCards key={category.id} category={category} />
            ) : (
              ""
            )
          )
        )}
      </section>
      {/* Categories  Section End */}

      {/* Top New Arrival Section Start  */}
      <TopArrivalProduct products={topArrivalProducts} />
      {/* Top New Arrival Section End */}

      {/* Special Offer Card Start */}
      <div className="mx-auto max-w-[1200px] px-5">
        <section className="mt-10 flex max-w-[1200px] justify-between bg-violet-900 px-5">
          <div className="py-8 px-3 lg:px-16">
            <p className="text-white">ONLINE EXCLUSIVE</p>
            <h2 className="pt-6 text-5xl font-bold text-yellow-400">15% OFF</h2>
            <p className="pt-4 text-white">
              ACCENT CHAIRS, <br />
              TABLES & OTTOMANS
            </p>
            <button
              href="#"
              className="mt-6 bg-amber-400 px-4 py-2 duration-100 hover:bg-yellow-300"
            >
              Shop now
            </button>
          </div>

          <img
            className="-mr-5 hidden w-[550px] object-cover md:block"
            src="/images/sale-bage.jpeg"
            alt="Rainbow credit card with macbook on a background"
          />
        </section>
      </div>
      {/* Special Offer Card End */}

      {/* Recommendations Section Start */}
      <RecommendedProducts products={recommendedProducts} />
      {/* Recommendations Section End */}
    </>
  );
}
