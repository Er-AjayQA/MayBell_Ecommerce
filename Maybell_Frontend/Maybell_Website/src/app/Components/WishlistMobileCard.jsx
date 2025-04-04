"use client";

import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useSelector } from "react-redux";

export const WishlistMobileCard = ({
  product,
  handleAddToCart,
  handleRemoveFromWishlist,
}) => {
  const cartItems = useSelector((cart) => cart.cart.cartItems);
  const [isInCart, setIsInCart] = useState(false);

  // Handle Check Already in Cart
  useEffect(() => {
    const checkIsInCart = cartItems.find((item) => item.id === product.id);

    if (checkIsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartItems]);

  // Handle Add Product to Cart
  const handleAddInCart = () => {
    handleAddToCart(product);
  };

  // Handle Remove Product from Wishlist
  const handleRemoveWishlist = (id) => {
    handleRemoveFromWishlist(id);
  };

  return (
    <>
      <div className="flex flex-col relative">
        <span className="text-[25px] font-bold absolute top-3 end-3">
          {product.discount}% off
        </span>
        <div className="relative flex">
          <Link
            href={`/product-overview/${product.categorySlug}/${product.id}`}
          >
            <img className="" src={product.image} alt={product.name} />
          </Link>
          <div className="absolute flex h-full w-full items-center justify-center gap-3 opacity-0 duration-150 hover:opacity-100">
            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400">
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <p className="mt-2">{product.name}</p>
          <p className="font-medium text-violet-900">
            ${Math.floor(product.price * (1 - product.discount / 100))}
            {product.discount >= 1 ? (
              <span className="text-sm text-red-500 line-through ms-1">
                ${product.price}
              </span>
            ) : (
              ""
            )}
          </p>

          <p>
            Availability:
            <span
              className={`font-medium  ${
                product.stock >= 1 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock >= 1 ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          <div className="flex items-center gap-3">
            <button
              className={`my-5 h-10 w-full ${
                isInCart
                  ? "bg-[#FBBF24] text-[#000]"
                  : "bg-violet-900 text-white"
              }  `}
              onClick={() => handleAddInCart(product)}
            >
              {isInCart ? "Update Quantity" : "Add to Cart"} Add to cart
            </button>
            <i className="ml-5 cursor-pointer text-[30px] hover:text-red-600">
              <Tooltip content="Remove" placement="bottom">
                <MdDeleteSweep
                  onClick={() => handleRemoveWishlist(product.id)}
                />
              </Tooltip>
            </i>
          </div>
        </div>
      </div>
    </>
  );
};
