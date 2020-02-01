require("dotenv").config();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
    withBundleAnalyzer({ distDir: "../../dist/functions/next" })
);
