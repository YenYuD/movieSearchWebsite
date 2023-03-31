const path = require("path");
module.exports = {
    i18n: {
        locales: ["default", "en", "zh-TW"],
        defaultLocale: "default",
        localeDetection: true,
        localePath: path.resolve("./public/locales/"),
        localeStructure: "{{lng}}/{{ns}}",
    },
};
