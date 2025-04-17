import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { useEffect, useRef, useState } from "react";
import {
  createCategoryService,
  updateCategoryService,
} from "../../../Services/CategoryServices";
import { toFormData } from "axios";

export const AddCategory = ({
  openCreateForm,
  createForm,
  getAllCategoryData,
  updateId,
  categoryDetails,
  updateIdState,
  setUpdateIdState,
  setUpdateId,
  currentImage,
  setCurrentImage,
}) => {
  // Handle Dropify Logic
  useEffect(() => {
    const dropifyElement = $("#categoryImage");

    if (dropifyElement.data("dropify")) {
      dropifyElement.data("dropify").destroy();
      dropifyElement.removeData("dropify");
    }

    // **Force Update Dropify Input**
    dropifyElement.replaceWith(
      `<input type="file" accept="image/*" name="image" id="categoryImage"
        class="dropify" data-height="250" data-default-file="${currentImage}"/>`
    );

    // ** Reinitialize Dropify **
    $("#categoryImage").dropify();

    // ** Update React Hook Form when File Changes **
    $("#categoryImage").on("change", function (event) {
      if (event.target.files.length > 0) {
        setValue("image", event.target.files[0]);
      }
    });
  }, [currentImage]);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (data.categoryImage && data.categoryImage[0]) {
        data.categoryImage = data.categoryImage[0];
      } else if (updateIdState && data.categoryImage) {
        // If in update mode and no new image is selected, keep the existing image
        data.categoryImage = categoryDetails.category_img;
      }

      let response;

      if (updateIdState) {
        console.log("Update Scenario ======", data);
        response = await updateCategoryService(updateId, toFormData({ data }));
      } else {
        response = await createCategoryService(toFormData({ data }));
      }

      if (response.success) {
        toast.success(response.message);
        reset();
        createForm();
        getAllCategoryData();
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
    if (updateIdState && categoryDetails) {
      setValue("name", categoryDetails.name);
      setValue("order", categoryDetails.order);
    } else {
      reset({
        name: "",
        order: "",
      });
      setCurrentImage(null);
    }
  }, [updateIdState, categoryDetails, setValue, reset]);

  return (
    <>
      {/* Create Form Start */}
      <div
        className={`absolute top-0 start-0 w-full h-[100vh] bg-[#00000052] z-[99] transition-all duration-500 ease-in-out ${
          !openCreateForm ? "hidden" : "visible"
        }`}
      >
        <div className="absolute top-[20%] start-[50%] translate-x-[-50%] translate-y-[-20%] rounded-md bg-white z-[999] p-5 min-w-[500px]">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="py-3 font-bold">
              {updateIdState ? "Update Category" : "Create Category"}
            </h1>
            <Link to={"/furniture/admin-panel/categories"}>
              <IoClose
                className="cursor-pointer"
                onClick={() => {
                  setUpdateId(null);
                  setUpdateIdState(false);
                  createForm();
                }}
              />
            </Link>
          </div>
          <div>
            <form
              className="max-w-full"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
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
                  id="categoryImage"
                  className="dropify"
                  data-height="200"
                  {...register("categoryImage")}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="category name"
                  {...register("name", {
                    required: "Category name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
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
              <div className="flex justify-end gap-2">
                <Link
                  to={"/furniture/admin-panel/categories"}
                  type="submit"
                  className="text-black bg-gray-400 hover:bg-gray-300 focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={() => {
                    handleFormVisibility();
                    setUpdateId(null);
                    setUpdateIdState(false);
                  }}
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
        </div>
      </div>
      {/* Create Form End */}
    </>
  );
};
