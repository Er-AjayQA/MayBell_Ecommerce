import { useState } from "react";
import { PageBody } from "../UI/PageBody";

export const PaymentGateways = () => {
  const [cols, setCols] = useState(["Name", "Order", "status"]);
  const [rows, setRows] = useState([
    { name: "Afganistan", order: "0", status: "Active" },
    { name: "Albania", order: "1", status: "In-Active" },
  ]);

  return (
    <>
      <PageBody cols={cols} rows={rows} />
    </>
  );
};
