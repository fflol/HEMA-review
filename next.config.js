require("dotenv").config();

const withCSS = require("@zeit/next-css");

module.exports = withCSS({
    env: {
        DEV_URL: "http://localhost:4000"
        // DEV_URL: process.env.DEV_URL
    }
});
