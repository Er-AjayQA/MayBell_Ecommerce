import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import {
  createMaterialsService,
  updateMaterialService,
} from "../../../Services/MaterialServices";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import MaterialContextData from "../../../Context/MaterialsContext";

export const AddMaterials = () => {
  const {
    openModal,
    updateId,
    setUpdateId,
    setUpdateIdState,
    onCloseModal,
    updateIdState,
    getAllMaterialsData,
    materialDetails,
  } = useContext(MaterialContextData);

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
        onCloseModal();
        getAllMaterialsData();
        setUpdateIdState(false);
        setUpdateId(null);
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await createMaterialsService(data);

      if (response.success) {
        toast.success(response.message);
        reset();
        onCloseModal();
        getAllMaterialsData();
      } else {
        toast.error(response.message);
      }
    }
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
  }, [updateIdState, materialDetails, openModal, setValue, reset]);

  return (
    <>
      {/* Create Form Start */}
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className=" rounded-md bg-white z-[999] p-5 min-w-[500px]">
            <div className="mb-3 flex items-center justify-between">
              <h1 className="py-3 font-bold">
                {updateIdState ? "Update Material" : "Create Material"}
              </h1>
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
                    to={"/furniture/admin-panel/materials/listing"}
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
