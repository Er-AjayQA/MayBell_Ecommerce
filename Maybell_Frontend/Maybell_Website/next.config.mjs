/** @type {import('next').NextConfig} */
import webpack from "next/dist/compiled/webpack/webpack-lib.js";

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
  // images: {
  //   domains: ["cdn.dummyjson.com"], // Add the domain(s) of your remote images
  // },
};

export default nextConfig;
