module.exports = {
  // source code path
  src: {
    path: 'dev',
    html: 'dev/index.html',
    less: 'dev/less/*.less',
    js: 'dev/js/*.js',
    img: 'dev/img/*',
    extraAssets: { // vendor
      path: ['dev/assets/**/*'],
      base: 'dev/assets'
    }
  },
  // vendor
  vendor: {
    css: 'dev/assets/css/*.css',
    js: 'dev/assets/js/*.js',
    other: 'dev/assets/other/*'
  },
  // target path
  dist: {
    path: 'dist',
    html: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    img: 'dist/img',
    extraAssets: {
      path: 'dist/assets'
    },
    cdn: 'http://static.h5game.mkzoo.com/popcap'  // CDN resource path
  },
  // The directory generated while building and will deleted after project has builded.
  temp: {
    path: 'temp',
    middleHTML: {
      path: 'temp',
      filePath: 'temp/index.html'
    },
    revCss: 'temp/rev/css',
    revJs: 'temp/rev/js'
  }
};