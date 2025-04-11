import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { createMaterials } from "../../../Services";
import { toast } from "react-toastify";

export const AddMaterials = ({
  openCreateForm,
  setOpenCreateForm,
  createForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await createMaterials(data);
    if (response.success) {
      toast.success(response.message);
      setOpenCreateForm(false);
      reset();
    } else if (!response.success) {
      toast.error(response.message);
    }
  };

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
            <h1 className="py-3 font-bold">Create Material</h1>
            <IoClose className="cursor-pointer" onClick={() => createForm()} />
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
                  type="text"
                  id="order"
                  {...register("order")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="text-black bg-gray-400 hover:bg-gray-300 focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={() => createForm()}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Create Material
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
