import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import {
  createCategoryService,
  updateCategoryService,
} from "../../../Services/CategoryServices";
import ProductsContextData from "../../../Context/ProductsContext";

export const AddProduct = () => {
  const {
    allMaterials,
    currentImage,
    openModal,
    updateId,
    setUpdateId,
    setUpdateIdState,
    onCloseModal,
    updateIdState,
    getAllProductsData,
    setCurrentImage,
    productsDetails,
  } = useContext(ProductsContextData);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Dropify Logic
  useEffect(() => {
    const dropifyElement = $("#categoryImage");

    // Initialize or reinitialize Dropify when currentImage changes
    const initDropify = () => {
      // Destroy existing instance if it exists
      if (dropifyElement.data("dropify")) {
        dropifyElement.dropify("destroy");
      }

      // Initialize Dropify with current file
      dropifyElement.dropify({
        defaultFile: currentImage || "",
        messages: {
          default: "Drag and drop a file or click to select",
          replace: "Drag and drop or click to replace",
          remove: "Remove",
          error: "Ooops, something wrong happened.",
        },
      });

      // Handle file changes
      dropifyElement.on("change", function (event) {
        if (event.target.files && event.target.files[0]) {
          const newImage = URL.createObjectURL(event.target.files[0]);
          setCurrentImage(newImage);
        }
      });
    };

    initDropify();

    return () => {
      // Cleanup
      dropifyElement.off("change");
      if (dropifyElement.data("dropify")) {
        dropifyElement.dropify("destroy");
      }
    };
  }, [currentImage, setCurrentImage]);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      let formData = new FormData();

      formData.append("name", data.name);
      formData.append("order", data.order);

      // Get the file input element
      const fileInput = document.getElementById("categoryImage");
      if (fileInput.files.length > 0) {
        formData.append("categoryImage", fileInput.files[0]);
      }
      let response;

      if (updateIdState) {
        console.log("Update Scenario ======", data);
        response = await updateCategoryService(updateId, formData);
      } else {
        console.log("New Record Scenario ======", data);
        response = await createCategoryService(formData);
      }

      if (response.success) {
        toast.success(response.message);
        reset();
        onCloseModal();
        getAllCategoriesData();
        if (updateIdState) {
          setUpdateIdState(false);
          setUpdateId(null);
        }
      } else {
        toast.error(response.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Ensure loading is false when done
    }
  };

  // Handle Create Form Visibility
  const handleFormVisibility = () => {
    reset();
    createForm();
  };

  useEffect(() => {
    if (updateIdState && productsDetails) {
      setValue("name", productsDetails.name);
      setValue("order", productsDetails.order);
    } else {
      reset({
        name: "",
        order: "",
      });
      setCurrentImage(null);
    }
  }, [updateIdState, productsDetails, setValue, reset]);

  return (
    <>
      {/* Create Form Start */}
      <div className=" rounded-md bg-white z-[999] p-5 min-w-[500px]">
        <form
          className="max-w-full"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="flex gap-5 flex-col">
            <div>
              <div className="mb-5">
                <label
                  htmlFor="categoryImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category Banner Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  // {...register("image", { required: "Category image is required" })}
                  id="categoryImage"
                  name="image"
                  data-default-file={currentImage}
                  className="dropify"
                  data-height="250"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Code / SKU
                </label>
                <input
                  type="text"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("code", {
                    required: "Product Code is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="length"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Length
                </label>
                <input
                  type="text"
                  id="length"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("length")}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="width"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Width
                </label>
                <input
                  type="text"
                  id="width"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("width")}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="height"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Height
                </label>
                <input
                  type="text"
                  id="height"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("height")}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="deliveryDays"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Estimate Delivery Days
                </label>
                <input
                  type="number"
                  id="deliveryDays"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("estimate_delivery_days")}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="deliveryDays"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Material Type
                </label>
                <select
                  type="text"
                  id="material_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("material_id", {
                    required: "Material Type is required",
                  })}
                >
                  <option disabled>--- Select ---</option>
                  {allMaterials.length > 0 ? (
                    allMaterials.map((material) => {
                      return (
                        <>
                          <option key={material?._id} value={material?._id}>
                            {material?.name}
                          </option>
                        </>
                      );
                    })
                  ) : (
                    <option disabled>No records found</option>
                  )}
                </select>
                {errors.name && (
                  <p className="text-red-500">{errors.material_id.message}</p>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="order"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Order
                </label>
                <input
                  type="number"
                  id="order"
                  {...register("order")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <Link
              to={"/furniture/admin-panel/category"}
              type="submit"
              className="text-black bg-gray-400 hover:bg-gray-300 focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={onCloseModal}
            >
              Close
            </Link>
            <button
              type="submit"
              className={`text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                isLoading
                  ? "cursor-not-allowed bg-[#91b2dd] hover:bg-[#91b2dd]"
                  : "cursor-pointer"
              }`}
              disabled={isLoading ? "disabled" : ""}
            >
              {isLoading ? (
                <>
                  <Spinner
                    aria-label="Spinner button example"
                    size="sm"
                    light
                  />
                  <span className="pl-3">Loading...</span>
                </>
              ) : updateIdState ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
      {/* Create Form End */}
    </>
  );
};
