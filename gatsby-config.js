module.exports = {
  siteMetadata: {
    title: "gatsby-test-project",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "U2hMfkEY0eoXIQinGpR8CZMNr6i8VI5Su4lRSRsELTA",
        spaceId: "8ord7tcapwuw",
      },
    },
    "gatsby-plugin-styled-components",
  ],
};
