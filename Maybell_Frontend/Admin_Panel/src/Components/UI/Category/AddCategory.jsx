import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { useEffect } from "react";
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
}) => {
  useEffect(() => {
    $(".dropify").dropify({
      messages: {
        default: "Drag and drop ",
        replace: "Drag and drop ",
        remove: "Remove",
        error: "Oops, something went wrong",
      },
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.categoryImage) {
      data.categoryImage = data.categoryImage[0];
    }

    if (updateIdState) {
      const response = await updateCategoryService(updateId, toFormData(data));

      if (response.success) {
        toast.success(response.message);
        reset();
        createForm();
        getAllCategoryData();
        setUpdateIdState(false);
        setUpdateId(null);
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await createCategoryService(toFormData(data));

      if (response.success) {
        toast.success(response.message);
        reset();
        createForm();
        getAllCategoryData();
      } else {
        toast.error(response.message);
      }
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
      setValue("categoryImage", categoryDetails.category_img);
    } else {
      reset({
        name: "",
        order: "",
        categoryImage: "",
      });
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
                  name="categoryImage"
                  id="categoryImage"
                  className="dropify"
                  data-height="250"
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
                  className="text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {updateIdState ? "Update" : "Create"}
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
