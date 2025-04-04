"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const [currentPage, setCurrentPage] = useState(false);
  const [subTotalCartAmount, setSubTotalCartAmount] = useState("");
  const [totalCartAmount, setTotalCartAmount] = useState("");
  const cartItems = useSelector((cart) => cart.cart.cartItems);

  const path = usePathname();

  // Calculating the Order Summary
  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => {
      const itemPrice = item.discountedPrice;
      return acc + itemPrice * item.quantity;
    }, 0);

    setSubTotalCartAmount(subtotal);

    setTotalCartAmount(subtotal);
  }, [cartItems]);

  // Handling Breadcrumb
  useEffect(() => {
    if (path.includes("cart")) {
      setCurrentPage(true);
    } else {
      setCurrentPage(false);
    }
  }, [path]);

  return (
    <>
      {/* Summary Start */}
      <section className="mx-auto w-full px-4 md:max-w-[400px]">
        <div className="">
          <div className="border py-5 px-4 shadow-md">
            <p className="font-bold">ORDER SUMMARY</p>

            <div className="flex justify-between border-b py-5">
              <p>Subtotal</p>
              <p>${subTotalCartAmount}</p>
            </div>

            <div className="flex justify-between border-b py-5">
              <p>Shipping</p>
              <p>Free</p>
            </div>

            <div className="flex justify-between py-5">
              <p>Total</p>
              <p>${totalCartAmount}</p>
            </div>

            {currentPage ? (
              <Link href="/checkout-address">
                <button className="w-full bg-violet-900 px-5 py-2 text-white">
                  Proceed to checkout
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      {/* Summary End */}
    </>
  );
}
