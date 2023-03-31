const path = require("path");
module.exports = {
    i18n: {
        locales: ["en", "zh-TW"],
        localeDetection: true,
        localePath: path.resolve("./public/locales/"),
        localeStructure: "{{lng}}/{{ns}}",
    },
};
