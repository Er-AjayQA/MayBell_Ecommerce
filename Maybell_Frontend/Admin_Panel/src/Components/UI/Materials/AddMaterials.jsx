import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createMaterialsService,
  updateMaterialService,
} from "../../../Services/MaterialServices";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const AddMaterials = ({
  openCreateForm,
  createForm,
  getAllMaterialsData,
  updateId,
  materialDetails,
  updateIdState,
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
      const response = await updateMaterialService(updateId, data);

      if (response.success) {
        toast.success(response.message);
        reset();
        createForm();
        getAllMaterialsData();
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await createMaterialsService(data);

      if (response.success) {
        toast.success(response.message);
        reset();
        createForm();
        getAllMaterialsData();
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
    if (updateIdState) {
      setValue("name", materialDetails.name);
      setValue("order", materialDetails.order);
    }
  });

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
              {updateId !== null ? "Update Material" : "Create Material"}
            </h1>
            <Link to={"/furniture/admin-panel/materials"}>
              <IoClose
                className="cursor-pointer"
                onClick={() => createForm()}
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
                  placeholder="material name"
                  {...register("name", {
                    required: "Material name is required",
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
                  placeholder="name@flowbite.com"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Link
                  to={"/furniture/admin-panel/materials"}
                  type="submit"
                  className="text-black bg-gray-400 hover:bg-gray-300 focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={handleFormVisibility}
                >
                  Close
                </Link>
                <button
                  type="submit"
                  className="text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  {updateId !== null ? "Update" : "Create"}
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
