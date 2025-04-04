import { useState } from "react";
import { PageBody } from "../UI/PageBody";

export const Admins = () => {
  const [cols, setCols] = useState([
    "Name",
    "EmailId",
    "Mobile Number",
    "status",
  ]);
  const [rows, setRows] = useState([
    {
      name: "Ajay Kumar",
      emailid: "ajay@gmail.com",
      "mobile number": "8973562454",
      status: "Active",
    },
    {
      name: "Vijay Kumar",
      emailid: "vijay@gmail.com",
      "mobile number": "8978562454",
      status: "Active",
    },
    {
      name: "Komal Singh",
      emailid: "komal@gmail.com",
      "mobile number": "8973432454",
      status: "InActive",
    },
  ]);

  return (
    <>
      <PageBody cols={cols} rows={rows} />
    </>
  );
};
