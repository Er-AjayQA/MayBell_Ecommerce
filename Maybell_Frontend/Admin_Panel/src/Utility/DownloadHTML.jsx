export const HandleDownloadHTML = () => {
  try {
    // Create HTML content
    let html = `
        <html>
        <head>
          <title>Categories List</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th { background-color: #3e8ef7; color: white; padding: 8px; text-align: center; }
            td { padding: 8px; text-align: center; border: 1px solid #ddd; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            a { color: blue; text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>Categories List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category Image</th>
                <th>Order</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
      `;

    // Add rows
    allCategories.forEach((category) => {
      html += `
          <tr>
            <td>${category.name}</td>
            <td>
              ${
                category.category_img
                  ? `<a href="${category.category_img}" target="_blank">View Image</a>`
                  : "No image"
              }
            </td>
            <td>${category.order || "N/A"}</td>
            <td>${category.status ? "Active" : "Inactive"}</td>
          </tr>
        `;
    });

    html += `
            </tbody>
          </table>
        </body>
        </html>
      `;

    // Open in new tab
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error generating HTML:", error);
    toast.error("Failed to generate report");
  }
};
