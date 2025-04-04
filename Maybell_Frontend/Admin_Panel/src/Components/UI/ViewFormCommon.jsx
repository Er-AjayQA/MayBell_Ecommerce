import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Table } from "flowbite-react";

export const ViewFormCommon = ({ openViewForm, setOpenViewForm }) => {
  useEffect(() => {
    if (openViewForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openViewForm]);

  return (
    <>
      <div
        className={`bg-[#0000006e] backdrop-blur-sm absolute top-0 left-0 bottom-0 end-0 w-full z-[999] overlay transition-all duration-[.1s] ease-in-out ${
          openViewForm ? "block" : "hidden"
        }`}
      >
        <div
          className={` max-w-[70%] mx-auto bg-[#fff] p-[30px] relative top-[50%] translate-y-[-50%] rounded-[10px] transition-all duration-[.3s] ease-in-out shadow-md ${
            openViewForm
              ? "max-h-[500px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <IoMdClose
            className="absolute top-[20px] end-[20px] cursor-pointer text-[20px]"
            onClick={() => setOpenViewForm((prev) => !prev)}
          />
          <div className="overflow-x-auto">
            <Table className="w-[50%] mx-auto">
              <Table.Head>
                <Table.HeadCell>Product name</Table.HeadCell>
                <Table.HeadCell>Color</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {'Apple MacBook Pro 17"'}
                  </Table.Cell>
                  <Table.Cell>Sliver</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Microsoft Surface Pro
                  </Table.Cell>
                  <Table.Cell>White</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    Magic Mouse 2
                  </Table.Cell>
                  <Table.Cell>Black</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
