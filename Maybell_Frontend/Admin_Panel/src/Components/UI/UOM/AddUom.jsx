import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UomContextData from "../../../Context/UomContext";
import { createUomService, updateUomService } from "../../../Services/UOM";

export const AddUom = () => {
  const {
    openModal,
    updateId,
    setUpdateId,
    setUpdateIdState,
    onCloseModal,
    updateIdState,
    getAllUomData,
    uomDetails,
  } = useContext(UomContextData);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      let formData = new FormData();

      formData.append("name", data.name);
      formData.append("order", data.order);
      formData.append("description", data.description);

      let response;

      if (updateIdState) {
        console.log("Update Scenario ======", data);
        response = await updateUomService(updateId, formData);
      } else {
        console.log("New Record Scenario ======", data);
        response = await createUomService(formData);
      }

      if (response.success) {
        toast.success(response.message);
        reset();
        onCloseModal();
        getAllUomData();
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (updateIdState && uomDetails) {
      setValue("name", uomDetails.name);
      setValue("order", uomDetails.order);
      setValue("description", uomDetails.description);
    } else {
      reset({
        name: "",
        order: "",
        description: "",
      });
    }
  }, [updateIdState, uomDetails, setValue, reset]);

  return (
    <>
      {/* Create Form Start */}
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className=" rounded-md bg-white z-[999] p-5 min-w-[500px]">
            <div className="mb-3 flex items-center justify-between">
              <h1 className="py-3 font-bold">
                {updateIdState ? "Update UOM" : "Create UOM"}
              </h1>
            </div>
            <div>
              <form
                className="max-w-full"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <div className="flex gap-3">
                  <div className="mb-5 basis-[50%]">
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
                      placeholder="uom name"
                      {...register("name", {
                        required: "UOM name is required",
                      })}
                    />
                    {errors.name && (
                      <p className="text-[12px] mt-1 text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-5 basis-[50%]">
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

                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="provide description here"
                    {...register("description")}
                  />
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <Link
                    to={"/furniture/admin-panel/uom"}
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
