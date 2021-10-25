module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    devtool: 'source-map',
    resolve: {
       symlinks: false
    },
    externals: {
      // only define the dependencies you are NOT using as externals!
      // canvg: "canvg",
      // html2canvas: "html2canvas",
      // dompurify: "dompurify"
    }
  }
}
