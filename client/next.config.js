const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['react-financial-charts']);
module.exports = withPlugins([[withTM]]);