import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { ChromePicker } from "react-color";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  createColorsService,
  updateColorService,
} from "../../../Services/ColorServices";
import CategoryContextData from "../../../Context/CategoryContext";

export const AddCategory = () => {
  const {
    openModal,
    updateId,
    setUpdateId,
    setUpdateIdState,
    onCloseModal,
    updateIdState,
    getAllColorsData,
    colorDetails,
  } = useContext(CategoryContextData);

  const [color, setColor] = useState("#000000");

  // Handle Color Change
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

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
        onCloseModal();
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
        onCloseModal();
        getAllColorsData();
      } else {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    if (updateIdState && colorDetails) {
      setValue("name", colorDetails.name);
      setValue("order", colorDetails.order);
      setColor(colorDetails.colorCode);
    } else {
      reset({
        name: "",
        code: "",
        order: "",
      });
      setColor("#000000");
    }
  }, [updateIdState, colorDetails, openModal, setValue, reset, setColor]);

  useEffect(() => {
    setValue("code", color);
  }, [color, setValue]);

  return (
    <>
      {/* Create Form Start */}
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className=" rounded-md bg-white z-[999] p-5 min-w-[500px]">
            <div className="mb-3 flex items-center justify-between">
              <h1 className="py-3 font-bold">
                {updateIdState ? "Update Color" : "Create Color"}
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
                      />
                    </div>
                  </div>
                  <div className="basis-[50%]">
                    <div className="mb-5">
                      <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Color Code
                      </label>
                      <ChromePicker
                        color={color}
                        id="code"
                        onChange={handleColorChange}
                      />
                      <input
                        type="hidden"
                        id="code"
                        {...register("code", {
                          required: "Color Code is required",
                        })}
                      />
                      {errors.code && (
                        <p className="text-red-500">{errors.code.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-5">
                  <Link
                    to={"/furniture/admin-panel/colors"}
                    type="submit"
                    className="text-black bg-gray-400 hover:bg-gray-300 focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={onCloseModal}
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
        </ModalBody>
      </Modal>

      {/* Create Form End */}
    </>
  );
};
