"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Badge } from "flowbite-react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi2";

export default function Header() {
  const cartItems = useSelector((cart) => cart.cart.cartItems);
  const wishlistItems = useSelector(
    (wishlist) => wishlist.wishlist.wishlistItems
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong!!");
      });
  }, []);

  return (
    <>
      {/* /Header Start */}
      <section className="sticky top-0 z-[99] bg-[#fff] w-full shadow-sm">
        <header className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 ">
          <Link href="/">
            <img
              className="cursor-pointer sm:h-auto sm:w-auto"
              src="/images/company-logo.svg"
              alt="company logo"
            />
          </Link>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <form className="hidden h-9 w-2/5 items-center border md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-3 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              className="hidden w-11/12 outline-none md:block"
              type="search"
              placeholder="Search"
            />

            <button className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300">
              Search
            </button>
          </form>

          <div className="hidden gap-3 md:!flex">
            <Link
              href="/wishlist"
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              <i className="text-[24px]">
                {wishlistItems.length > 0 ? <IoMdHeart /> : <IoIosHeartEmpty />}
              </i>

              <p className="text-xs">
                Wishlist
                <span className="ms-[2px]">({wishlistItems.length})</span>
              </p>
            </Link>

            <Link
              href="/cart"
              className="flex cursor-pointer flex-col items-center justify-center relative"
            >
              <i className="text-[24px]">
                {cartItems.length > 0 ? (
                  <HiShoppingBag />
                ) : (
                  <HiOutlineShoppingBag />
                )}
              </i>

              <p className="text-xs ">
                Cart
                <Badge className="absolute top-[-10px] end-[-90%]">
                  {cartItems.length}
                </Badge>
              </p>
            </Link>

            <Link
              href="/profile"
              className="relative flex cursor-pointer flex-col items-center justify-center"
            >
              <span className="absolute bottom-[33px] right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <p className="text-xs">Account</p>
            </Link>
          </div>
        </header>
      </section>

      {/* /Header End */}

      {/* Burger menu Start */}
      <section
        x-show="mobileMenuOpen"
        onClick={() => setMobileMenuOpen(false)}
        className={`absolute left-0 right-0 z-50 h-screen w-full bg-white ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto">
          <div className="mx-auto flex w-full justify-center gap-3 py-4">
            <Link
              href="/wishlist"
              className="flex cursor-pointer flex-col items-center justify-center"
            >
              <i className="text-[24px]">
                {wishlistItems.length > 0 ? <IoMdHeart /> : <IoIosHeartEmpty />}
              </i>

              <p className="text-xs">
                Wishlist
                <span className="ms-[2px]">({wishlistItems.length})</span>
              </p>
            </Link>

            <Link
              href="/cart"
              className="flex cursor-pointer flex-col items-center justify-center relative"
            >
              <i className="text-[24px]">
                {cartItems.length > 0 ? (
                  <HiShoppingBag />
                ) : (
                  <HiOutlineShoppingBag />
                )}
              </i>

              <p className="text-xs">
                Cart
                <Badge className="absolute top-[-10px] end-[-90%]">
                  {cartItems.length}
                </Badge>
              </p>
            </Link>

            <Link
              href="/profile"
              className="relative flex cursor-pointer flex-col items-center justify-center"
            >
              <span className="absolute bottom-[33px] right-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <p className="text-xs">Account</p>
            </Link>
          </div>

          <form className="my-4 mx-5 flex h-9 items-center border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-3 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              className="hidden w-11/12 outline-none md:block"
              type="search"
              placeholder="Search"
            />

            <button
              type="submit"
              className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300"
            >
              Search
            </button>
          </form>
          <ul className="text-center font-medium">
            <li className="py-2">
              <Link href="/">Home</Link>
            </li>
            <li className="py-2">
              <Link href="/catalog">Catalog</Link>
            </li>
            <li className="py-2">
              <Link href="/about-us">About Us</Link>
            </li>
            <li className="py-2">
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
      </section>
      {/* /Burger menu End */}

      {/* Nav bar Start */}
      {/* hidden on small devices */}
      <nav className="relative bg-violet-900">
        <div className="mx-auto hidden h-12 w-full max-w-[1200px] items-center md:flex">
          <button
            onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
            className="ml-5 flex h-full w-40 cursor-pointer items-center justify-center bg-amber-400"
          >
            <div className="flex justify-around" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mx-1 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              All categories
            </div>
          </button>

          <div className="mx-7 flex gap-8">
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              href="/catalog"
            >
              Catalog
            </Link>
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              href="/about-us"
            >
              About Us
            </Link>
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              href="/contact-us"
            >
              Contact Us
            </Link>
          </div>

          <div className="ml-auto flex gap-4 px-5">
            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              href="/login"
            >
              Login
            </Link>

            <span className="text-white">&#124;</span>

            <Link
              className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
              href="/register"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      {/* Nav bar End */}

      {/* Menu Start */}
      <section
        x-show="desktopMenuOpen"
        onClick={() => setDesktopMenuOpen(false)}
        className={`absolute left-0 right-0 z-10 w-full border-b border-r border-l bg-white ${
          desktopMenuOpen ? "block" : "hidden"
        } `}
      >
        <div className="mx-auto flex max-w-[1200px] py-10">
          <div className="w-[400px] border-r">
            <ul className="px-5 max-h-[15rem] overflow-y-scroll">
              {allCategories.map((category, index) => {
                return (
                  <Link href={`/catalog/${category.slug}`} key={category.id}>
                    <li className="active:blue-900 flex items-center gap-2 bg-amber-400 py-2 px-3 active:bg-amber-400">
                      <img
                        width="15px"
                        height="15px"
                        src="/images/bed.svg"
                        alt={category.slug}
                      />
                      {category.name}
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
                  </Link>
                );
              })}
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
    </>
  );
}
