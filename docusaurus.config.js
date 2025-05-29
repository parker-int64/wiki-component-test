// docusaurus.config.js
module.exports = {
    title: 'My Site',
    url: 'http://localhost',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'example',
    projectName: 'my-docusaurus-site',

    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: 'docs',
                },
                blog: false,
            },
        ],
    ],
    themeConfig: {
        prism: {
            additionalLanguages: ['bash', 'powershell'],
        }
    }
};
