export default function manifest() {
  return {
    name: "Maybell - Online Store",
    short_name: "Maybell",
    description: "A Online Furniture Store",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/images/company-logo.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/company-logo.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
