"use client";

import Link from "next/link";
import Breadcrumb from "./BreadCrumb";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../ReduxToolkit/CartSlice";
import { toast } from "react-toastify";
import { MdDeleteSweep } from "react-icons/md";

export default function CheckoutReview() {
  const cartItems = useSelector((cart) => cart.cart.cartItems);
  const dispatch = useDispatch();

  // Handle Product Quantity Update
  const handleProdQuantity = (product, type, stock) => {
    if (type === "decrease" && product.quantity < 2) {
      toast.error("Minimum 1 quantity of should be available for order!!");
    } else {
      dispatch(updateQuantity({ id: product.id, type, stock }));
    }
  };

  // Handle Remove from Order List
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <>
      {/* Checkout Review Breadcrumb Start */}
      <Breadcrumb page={"Checkout"} />
      {/* Checkout Review Breadcrumb End */}

      {/* Checkout Review Content Start */}
      <section className="flex-grow">
        <section className="container mx-auto max-w-[1200px] py-5 lg:flex lg:flex-row lg:py-10">
          <h2 className="mx-auto px-5 text-2xl font-bold md:hidden">
            Checkout Review
          </h2>

          {/* Form Start */}

          <section className="grid w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10">
            {cartItems.length < 1 ? (
              <p className="text-center">No Items Selected for Order!!</p>
            ) : (
              <>
                <table className="hidden lg:table">
                  <thead className="h-16 bg-neutral-100">
                    <tr>
                      <th>ADDRESS</th>
                      <th>DELIVERY METHOD</th>
                      <th>PAYMENT METHOD</th>
                      <th className="bg-neutral-600 text-white">
                        ORDER REVIEW
                      </th>
                    </tr>
                  </thead>
                </table>
                {/* Mobile Product Table Start */}
                <section className="container mx-auto my-3 flex w-full flex-col gap-3 md:hidden">
                  <div className="flex w-full border px-4 py-4">
                    <img
                      className="self-start object-contain"
                      width="90px"
                      src="/images/bedroom.png"
                      alt="bedroom image"
                    />
                    <div className="ml-3 flex w-full flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">ITALIAN BED</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Size: XL</p>
                      <p className="py-3 text-xl font-bold text-violet-900">
                        $320
                      </p>
                      <div className="mt-2 flex w-full items-center justify-between">
                        <div className="flex items-center justify-center">
                          <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                            Quantity: 1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border px-4 py-4">
                    <img
                      className="self-start object-contain"
                      width="90px"
                      src="/images/product-chair.png"
                      alt="Chair image"
                    />
                    <div className="ml-3 flex w-full flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">GUYER CHAIR</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Size: XL</p>
                      <p className="py-3 text-xl font-bold text-violet-900">
                        $320
                      </p>
                      <div className="mt-2 flex w-full items-center justify-between">
                        <div className="flex items-center justify-center">
                          <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                            Quantity: 1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border px-4 py-4">
                    <img
                      className="self-start object-contain"
                      width="90px"
                      src="/images/outdoors.png"
                      alt="Outdoor chair image"
                    />
                    <div className="ml-3 flex w-full flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">OUTDOOR CHAIR</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Size: XL</p>
                      <p className="py-3 text-xl font-bold text-violet-900">
                        $320
                      </p>
                      <div className="mt-2 flex w-full items-center justify-between">
                        <div className="flex items-center justify-center">
                          <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                            Quantity: 1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full border px-4 py-4">
                    <img
                      className="self-start object-contain"
                      width="90px"
                      src="/images/matrass.png"
                      alt="Matrass image"
                    />
                    <div className="ml-3 flex w-full flex-col justify-center">
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">
                          MATRASS COMFORT &plus;
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Size: XL</p>
                      <p className="py-3 text-xl font-bold text-violet-900">
                        $320
                      </p>
                      <div className="mt-2 flex w-full items-center justify-between">
                        <div className="flex items-center justify-center">
                          <div className="flex cursor-text items-center justify-center active:ring-gray-500">
                            Quantity: 1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Mobile Product Table End */}

                {/* Product Table Start */}
                <table className="mt-3 hidden w-full lg:table">
                  <thead className="h-16 bg-neutral-100">
                    <tr>
                      <th>Item</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((product) => {
                      return (
                        <tr key={product.id} className="h-[100px] border-b">
                          <td className="align-middle">
                            <div className="flex">
                              <Link
                                href={`/product-overview/${product.categorySlug}/${product.id}`}
                              >
                                <img
                                  className="w-[90px]"
                                  src={product.image}
                                  alt={product.name}
                                />
                              </Link>

                              <div className="ml-3 flex flex-col justify-center">
                                <p className="text-xl font-bold">
                                  {product.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                  Size: XL
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="mx-auto text-center">
                            $
                            {product.discount > 0
                              ? product.discountedPrice
                              : product.price}
                          </td>
                          <td className="align-middle">
                            <div className="flex items-center justify-center">
                              <button
                                className={`flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500 ${
                                  product.quantity === 1
                                    ? "cursor-not-allowed opacity-75"
                                    : ""
                                }`}
                                disabled={
                                  product.quantity === 1 ? "disabled" : ""
                                }
                                onClick={() =>
                                  handleProdQuantity(
                                    product,
                                    "decrease",
                                    product.stock
                                  )
                                }
                              >
                                &minus;
                              </button>
                              <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                {product.quantity}
                              </div>
                              <button
                                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                                onClick={() =>
                                  handleProdQuantity(
                                    product,
                                    "increase",
                                    product.stock
                                  )
                                }
                              >
                                &#43;
                              </button>
                            </div>
                          </td>
                          <td className="mx-auto text-center">
                            $
                            {product.discount > 0
                              ? product.discountedPrice * product.quantity
                              : product.price * product.quantity}
                          </td>
                          <td className="align-middle text-center">
                            <MdDeleteSweep
                              className="text-[25px] hover:text-red-600 cursor-pointer mx-auto"
                              onClick={() => handleRemoveFromCart(product.id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Product Table End */}

                <div className="flex w-full items-center justify-between">
                  <a
                    href="catalog.html"
                    className="hidden text-sm text-violet-900 lg:block"
                  >
                    &larr; Back to the shop
                  </a>

                  <div className="mx-auto flex justify-center gap-2 lg:mx-0">
                    <Link
                      href="/checkout-payment"
                      className="bg-purple-900 px-4 py-2 text-white"
                    >
                      Previous step
                    </Link>

                    <Link
                      href="/checkout-confirmation"
                      className="bg-amber-400 px-4 py-2"
                    >
                      Place Order
                    </Link>
                  </div>
                </div>
              </>
            )}
          </section>

          {/* Form End */}

          {/* Summary Start */}
          {cartItems.length > 0 ? <OrderSummary /> : ""}
          {/* Summary End */}
        </section>

        {/* Cons Badges Start */}
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
        {/* Cons Badges End */}
      </section>
      {/* Checkout Review Content End */}
    </>
  );
}
