import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  createColorsService,
  updateColorService,
} from "../../../Services/ColorServices";

export const AddColors = ({
  openCreateForm,
  createForm,
  getAllColorsData,
  updateId,
  materialDetails,
  updateIdState,
  setUpdateIdState,
  setUpdateId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (updateIdState) {
      const response = await updateColorService(updateId, data);

      if (response.success) {
        toast.success(response.message);
        reset();
        createForm();
        getAllColorsData();
        setUpdateIdState(false);
        setUpdateId(null);
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await createColorsService(data);

      if (response.success) {
        toast.success(response.message);
        reset();
        createForm();
        getAllColorsData();
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
    if (updateIdState && materialDetails) {
      setValue("name", materialDetails.name);
      setValue("order", materialDetails.order);
    } else {
      reset({
        name: "",
        order: "",
      });
    }
  }, [updateIdState, materialDetails, setValue, reset]);

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
              {updateIdState ? "Update Colors" : "Create Colors"}
            </h1>
            <Link to={"/furniture/admin-panel/color"}>
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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="color name"
                  {...register("name", {
                    required: "Color name is required",
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
                  Color Code
                </label>
                <input
                  type="color"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg cursor-pointer focus:ring-blue-500 focus:border-blue-500 block w-[20%] h-[50px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="color code"
                  {...register("code", {
                    required: "Color Code is required",
                  })}
                />
                {errors.code && (
                  <p className="text-red-500">{errors.code.message}</p>
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
                  to={"/furniture/admin-panel/colors"}
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
