import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { getAllCategoryService } from "../../../Services/CategoryServices";
import SubCategoryContextData from "../../../Context/SubCategoryContext";
import {
  createSubCategoryService,
  updateSubCategoryService,
} from "../../../Services/SubCategoryServices";

export const AddSubCategory = () => {
  const {
    currentImage,
    openModal,
    updateId,
    setUpdateId,
    setUpdateIdState,
    onCloseModal,
    updateIdState,
    getAllSubCategoriesData,
    getAllActiveCategories,
    allActiveCategories,
    setCurrentImage,
    subCategoryDetails,
  } = useContext(SubCategoryContextData);

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
    const dropifyElement = $("#subCategory_img");

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
      formData.append("category_id", data.category_id);

      // Get the file input element
      const fileInput = document.getElementById("subCategory_img");
      if (fileInput.files.length > 0) {
        formData.append("subCategory_img", fileInput.files[0]);
      } else if (currentImage && updateIdState) {
        // If no new file but in update mode, keep the existing image
        formData.append("existingImage", currentImage);
      }

      let response;

      if (updateIdState) {
        response = await updateSubCategoryService(updateId, formData);
      } else {
        response = await createSubCategoryService(formData);
      }

      if (response.success) {
        toast.success(response.message);
        reset();
        onCloseModal();
        getAllSubCategoriesData();
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

  useEffect(() => {
    if (updateIdState && subCategoryDetails) {
      setValue("category_id", subCategoryDetails.category_id?._id);
      setValue("name", subCategoryDetails.name);
      setValue("order", subCategoryDetails.order);
      // Set image from subCategoryDetails if it exists
      if (subCategoryDetails.subCategory_img) {
        setCurrentImage(subCategoryDetails.subCategory_img);
      }
    } else {
      reset({
        name: "",
        order: "",
        category_id: "",
      });
      setCurrentImage(null);
    }
  }, [updateIdState, subCategoryDetails, setValue, reset]);

  useEffect(() => {
    getAllActiveCategories();
  }, []);

  return (
    <>
      {/* Create Form Start */}
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className=" rounded-md bg-white z-[999] p-5 min-w-[500px]">
            <div className="mb-3 flex items-center justify-between">
              <h1 className="py-3 font-bold">
                {updateIdState ? "Update SubCategory" : "Create SubCategory"}
              </h1>
            </div>
            <div>
              <form
                className="max-w-full"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <div className="flex gap-5">
                  <div className="basis-[50%]">
                    <div className="mb-5">
                      <label
                        htmlFor="subCategory_img"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Banner Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="subCategory_img"
                        name="subCategory_img"
                        data-default-file={currentImage}
                        className="dropify"
                        data-height="250"
                      />
                    </div>
                  </div>
                  <div className="basis-[50%]">
                    <div className="mb-5">
                      <label
                        htmlFor="category_id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category Name
                      </label>
                      <select
                        type="text"
                        id="category_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="parent category name"
                        {...register("category_id", {
                          required: "Parent Category name is required",
                        })}
                      >
                        <option disabled>--- Select ---</option>
                        {allActiveCategories.length > 0 ? (
                          allActiveCategories.map((category) => {
                            return (
                              <>
                                <option
                                  key={category?._id}
                                  value={category?._id}
                                >
                                  {category?.name}
                                </option>
                              </>
                            );
                          })
                        ) : (
                          <option disabled>No records found</option>
                        )}
                      </select>
                      {errors.name && (
                        <p className="text-red-500">
                          {errors.category_id.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        SubCategory Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="sub category name"
                        {...register("name", {
                          required: "SubCategory name is required",
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
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <Link
                    to={"/furniture/admin-panel/sub-category"}
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
          </div>
        </ModalBody>
      </Modal>

      {/* Create Form End */}
    </>
  );
};
