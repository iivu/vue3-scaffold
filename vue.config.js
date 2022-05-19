const { defineConfig } = require('@vue/cli-service');
const projectConfig = require('./src/project.config');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  publicPath: isProduction ? projectConfig.staticURL : '/',
  productionSourceMap: false,
});
