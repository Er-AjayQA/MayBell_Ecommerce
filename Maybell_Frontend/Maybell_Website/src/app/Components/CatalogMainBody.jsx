"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "./BreadCrumb";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductRowView from "./ProductRowView";
import ProductCard from "./ProductCard";
import ProductLoading from "./ProductLoading";

export default function CatalogMainBody() {
  const params = useParams();
  const [getAllCategories, setGetAllCategories] = useState([]);
  const [getAllBrands, setGetAllBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [getAllProducts, setGetAllProducts] = useState([]);
  const [changeView, setChangeView] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategories, setSelectedCategory] = useState(
    params.slug?.filter(Boolean).slice(-1) || []
  );
  const [priceFilter, setPriceFilter] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const onPageChange = (page) => setCurrentPage(page);

  // Get All Categories From API
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((response) => {
        setGetAllCategories(response.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong!!");
      });
  }, []);

  // Get All Brands From API
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/brands.php")
      .then((response) => {
        setGetAllBrands(response.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong!!");
      });
  }, []);

  // Handle the Slug
  useEffect(() => {
    setIsloading(true);
    setSelectedCategory((prev) => {
      if (params?.slug) {
        return [params.slug[0], ...prev];
      } else {
        return [];
      }
    });
  }, [params.slug]);

  // Handle Category Selections
  const handleSelectCategory = (category) => {
    setIsloading(true);
    setSelectedCategory((prev) => {
      let newSelectedCategories;
      if (prev.includes(category)) {
        newSelectedCategories = prev.filter((item) => item !== category);
        return newSelectedCategories;
      } else {
        newSelectedCategories = [category, ...prev];
        return newSelectedCategories;
      }
    });
  };

  // Handle Brand Selection
  const handleSelectBrand = (brand) => {
    setIsloading(true);
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((item) => {
          return item !== brand;
        });
      } else {
        return [brand, ...prev];
      }
    });
  };

  // Handle Price Filter
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPriceFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Get Products API
  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          page: currentPage,
          limit: 15,
          sorting: "",
          name: "",
          price_from: priceFilter.minPrice,
          price_to: priceFilter.maxPrice,
          discount_from: "",
          discount_to: "",
          rating: "",
          brands: selectedBrands.toString(),
          categories: selectedCategories.toString(),
        },
      })
      .then((response) => {
        setIsloading(false);
        setGetAllProducts(response.data.data);
        setTotalPages(response.data.toal_pages || 1);
      })
      .catch((error) => {
        toast.error("Something went wrong!!");
      });
  }, [selectedBrands, selectedCategories, currentPage, priceFilter]);

  return (
    <>
      {/* Breadcrumb Start */}
      <Breadcrumb page={"Catalog"} />
      {/* Breadcrumb End */}

      {/* Catalog Main Content Start */}
      <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
        {/* Sidebar Start */}
        <section className="hidden w-[300px] flex-shrink-0 px-4 lg:block">
          {/* Categories Filter Start */}
          <div className="flex border-b pb-5">
            <div className="w-full max-h-[15rem] overflow-y-scroll">
              <p className="mb-3 font-medium">CATEGORIES</p>

              {getAllCategories.length >= 1
                ? getAllCategories.map((category, index) => {
                    return (
                      <div
                        key={category.id}
                        className="flex w-full justify-between"
                      >
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            id={category.slug}
                            value={category.slug}
                            checked={
                              selectedCategories.includes(category.slug)
                                ? "checked"
                                : ""
                            }
                            onChange={() => handleSelectCategory(category.slug)}
                          />
                          <label className="ml-4" htmlFor={category.slug}>
                            {category.name}
                          </label>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          {/* Categories Filter End */}

          {/* Brand Filter Start */}
          <div className="flex border-b py-5">
            <div className="w-full max-h-[15rem] overflow-y-scroll">
              <p className="mb-3 font-medium">BRANDS</p>

              {getAllBrands.length >= 1
                ? getAllBrands.map((brand, index) => {
                    return (
                      <div
                        key={brand.id}
                        className="flex w-full justify-between"
                      >
                        <div className="flex justify-center items-center">
                          <input
                            type="checkbox"
                            id={brand.slug}
                            checked={
                              selectedBrands.includes(brand.slug)
                                ? "checked"
                                : ""
                            }
                            onChange={() => handleSelectBrand(brand.slug)}
                          />
                          <label className="ml-4" htmlFor={brand.slug}>
                            {brand.name}
                          </label>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          {/* Brand Filter End */}

          {/* Price Filter Start */}
          <div className="flex border-b py-5">
            <div className="w-full">
              <p className="mb-3 font-medium">PRICE</p>

              <div className="flex w-full">
                <div className="flex justify-between">
                  <input
                    x-mask="99999"
                    min="50"
                    type="number"
                    className="h-8 w-[90px] border pl-2"
                    placeholder="50"
                    name="minPrice"
                    value={priceFilter.minPrice}
                    onChange={(e) => handleInputChange(e, "min")}
                  />
                  <span className="px-3">-</span>
                  <input
                    x-mask="999999"
                    type="number"
                    name="maxPrice"
                    max="999999"
                    className="h-8 w-[90px] border pl-2"
                    value={priceFilter.maxPrice}
                    onChange={(e) => handleInputChange(e, "max")}
                    placeholder="99999"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Price Filter End */}

          {/* Size Filter Start */}
          <div className="flex border-b py-5">
            <div className="w-full">
              <p className="mb-3 font-medium">SIZE</p>

              <div className="flex gap-2">
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                  XS
                </div>
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                  S
                </div>
                <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                  M
                </div>

                <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                  L
                </div>

                <div className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                  XL
                </div>
              </div>
            </div>
          </div>
          {/* Size Filter End */}

          {/* Colors Filter Start */}
          <div className="flex py-5">
            <div className="w-full">
              <p className="mb-3 font-medium">COLOR</p>

              <div className="flex gap-2">
                <div className="h-8 w-8 cursor-pointer border border-white bg-gray-600 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                <div className="h-8 w-8 cursor-pointer border border-white bg-violet-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
                <div className="h-8 w-8 cursor-pointer border border-white bg-red-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"></div>
              </div>
            </div>
          </div>
          {/* Colors Filter End */}
        </section>
        {/* Sidebar End */}

        {/* Product Listing Right Side Start */}
        <div className="w-full">
          {/* Product Listing Filter Start */}
          <div className="mb-5 flex items-center justify-between px-5">
            <div className="flex gap-3">
              <button className="flex items-center justify-center border px-6 py-2">
                Sort by
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mx-2 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              <button className="flex items-center justify-center border px-6 py-2 md:hidden">
                Filters
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mx-2 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden gap-3 lg:flex">
              <button
                className={`border py-2 px-2 ${
                  changeView ? "" : "bg-amber-400"
                }`}
                onClick={() => setChangeView(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </button>

              <button
                className={`border py-2 px-2 ${
                  changeView ? "bg-amber-400" : ""
                }`}
                onClick={() => setChangeView(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Product Listing Filter End */}

          {/* Product Listing Start */}
          <section
            className={`gap-3 ${
              changeView ? "flex flex-col" : "grid"
            } max-w-[1200px] mx-auto pb-10 px-5 ${
              getAllProducts.length <= 0
                ? "grid-cols-1"
                : "grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {isLoading ? (
              <>
                <ProductLoading />
                <ProductLoading />
                <ProductLoading />
              </>
            ) : getAllProducts.length <= 0 ? (
              <p className="text-center">No Products Available!!</p>
            ) : (
              getAllProducts.map((product) => {
                return changeView ? (
                  <ProductRowView key={product.id} product={product} />
                ) : (
                  <ProductCard key={product.id} product={product} />
                );
              })
            )}
          </section>
          {/* Product Listing End */}

          {/* Pagination Start */}
          <div className="flex overflow-x-auto sm:justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          {/* Pagination End */}
        </div>
        {/* Product Listing Right Side End */}
      </section>
      {/* Catalog Main Content End */}
    </>
  );
}
