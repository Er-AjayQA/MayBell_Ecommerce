"use client";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "./BreadCrumb";
import OrderSummary from "./OrderSummary";
import { MdDeleteSweep } from "react-icons/md";
import { removeFromCart, updateQuantity } from "../ReduxToolkit/CartSlice";
import Link from "next/link";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((cart) => cart.cart.cartItems);

  // Handle Remove Product from Cart
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  // Handle Product Quantity Update
  const handleProdQuantity = (product, type, stock) => {
    if (type === "decrease" && product.quantity === 1) {
      dispatch(removeFromCart({ id: product.id }));
    } else {
      dispatch(updateQuantity({ id: product.id, type, stock }));
    }
  };

  return (
    <>
      {/* Cart Breadcrumb Start */}
      <Breadcrumb page={"Cart"} />
      {/* Cart Breadcrumb End */}

      {/* Cart Product List Start */}
      <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Mobile Cart Table Start */}
        <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 md:hidden">
          {cartItems.length >= 1 ? (
            cartItems.map((product) => {
              const singleUnitPrice = product.discountedPrice;

              return (
                <div key={product.id} className="flex w-full border px-4 py-4">
                  <Link
                    href={`/product-overview/${product.categorySlug}/${product.id}`}
                  >
                    <img
                      className="self-start object-contain"
                      width="90px"
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>

                  <div className="ml-3 flex w-full flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold">{product.name}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">Size: XL</p>
                    <p className="py-3 text-xl font-bold text-violet-900">
                      ${singleUnitPrice}
                    </p>
                    <div className="mt-2 flex w-full items-center justify-between">
                      <div className="flex items-center justify-center">
                        <button
                          className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
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

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="m-0 h-5 w-5 cursor-pointer"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52l.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">Your Cart is Empty!!</p>
          )}
        </section>
        {/* Mobile Cart Table End */}

        {/* Desktop Cart Table Start */}
        <section
          className={`hidden ${
            cartItems.length > 1 ? "" : "h-[220px]"
          } w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:grid`}
        >
          {cartItems.length >= 1 ? (
            <table className="table-fixed">
              <thead className="h-16 bg-neutral-100">
                <tr>
                  <th>ITEM</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product) => {
                  const singleUnitPrice = product.discountedPrice;

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
                              alt="bedroom image"
                            />
                          </Link>

                          <div className="ml-3 flex flex-col justify-center">
                            <p className="text-xl font-bold">{product.name}</p>
                            <p className="text-sm text-gray-400">Size: XL</p>
                          </div>
                        </div>
                      </td>
                      <td className="mx-auto text-center">
                        ${singleUnitPrice}
                      </td>
                      <td className="align-middle">
                        <div className="flex items-center justify-center">
                          <button
                            className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
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
                        ${singleUnitPrice * product.quantity}
                      </td>
                      <td className="align-middle">
                        <MdDeleteSweep
                          className="text-[25px] hover:text-red-600 cursor-pointer"
                          onClick={() => handleRemoveFromCart(product.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Your Cart is Empty!!</p>
          )}
        </section>
        {/* Desktop Cart Table End */}

        {/* Summary Start */}
        {cartItems.length >= 1 ? <OrderSummary /> : ""}
        {/* Summary End */}
      </section>
      {/* Cart Product List End */}
    </>
  );
}
