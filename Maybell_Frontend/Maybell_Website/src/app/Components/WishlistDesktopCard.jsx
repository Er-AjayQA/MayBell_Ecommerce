"use client";

import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useSelector } from "react-redux";

export const WishlistDesktopCard = ({
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
      <div className="flex w-full flex-row h-44 items-center justify-between border py-5 px-4 relative">
        <span
          className={`text-[25px] font-bold absolute top-3 end-3 ${
            product.discount > 0 ? "block" : "hidden"
          }`}
        >
          {product.discount}% off
        </span>
        <div className="flex w-full items-center gap-4">
          <Link
            href={`/product-overview/${product.categorySlug}/${product.id}`}
          >
            <img
              width="100px"
              className="object-cover"
              src={product.image}
              alt={product.name}
            />
          </Link>
          <div className="flex w-2/5 flex-col justify-center">
            <p className="text-xl font-bold ">{product.name}</p>
            <p className="text-gray-500">
              Availability:
              <span
                className={`font-medium  ${
                  product.stock >= 1 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock >= 1 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex w-3/5 items-center justify-between flex-row">
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

          <div className="mt-2 flex items-center">
            <button
              className={`my-5 h-10 w-full px-2 ${
                isInCart
                  ? "bg-[#FBBF24] text-[#000]"
                  : "bg-violet-900 text-white"
              } `}
              onClick={handleAddInCart}
            >
              {isInCart ? "Update Quantity" : "Add to cart"}
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
