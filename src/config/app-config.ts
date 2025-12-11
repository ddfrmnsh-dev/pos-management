import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "POS Management",
  version: packageJson.version,
  copyright: `© ${currentYear}, POS Management.`,
  meta: {
    title: "POS Management - ",
    description:
      "POS Management -",
  },
};
