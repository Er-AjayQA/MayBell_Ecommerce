import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable separately
import { toast } from "react-toastify";

export const HandleDownloadPDF = (headerArr, allData, pdfName) => {
  try {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Categories List", 14, 15);

    // Prepare data for the table
    const headers = [...headerArr];
    const tableData = allData.map((data) => [
      data.name,
      data.category_img ? data.category_img : "No",
      data.order || "N/A",
      data.status ? "Active" : "Inactive",
    ]);

    // Add table using the separately imported autoTable
    autoTable(doc, {
      theme: "grid",
      head: headers,
      body: tableData,
      startY: 25,
      styles: {
        cellPadding: 3,
        fontSize: 9,
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        fillColor: [62, 142, 247],
        textColor: 255,
        fontStyle: "bold",
        cellWidth: "wrap",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        1: {
          // This is the index of the "Category Image" column (0-based)
          cellWidth: 60, // Set your desired fixed width here (in mm)
        },
      },
    });

    // Save the PDF
    doc.save("pdfName.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("Failed to generate PDF");
  }
};
