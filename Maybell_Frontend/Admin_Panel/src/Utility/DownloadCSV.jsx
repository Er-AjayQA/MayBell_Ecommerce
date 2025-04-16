// Handle Download CSV
export const HandleDownloadCSV = () => {
  const dataToExport = allCategories.map((category) => ({
    Name: category.name,
    "Banner Image": category.category_img || "N/A",
    Order: category.order || "N/A",
    Status: category.status ? "Active" : "Inactive",
  }));

  const csv = Papa.unparse(dataToExport);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "categories.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
