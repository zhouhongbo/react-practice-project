const { override, addLessLoader, fixBabelImports } = require('customize-cra');
module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        localIdentName: '[local]--[hash:base64:5]',
        modifyVars: { '@primary-color': '#1DA57A' }
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    })
);