// Karma configuration
// Generated on Sat Nov 22 2014 13:07:02 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'build/vendor/angular.js',
        'build/vendor/angular-mocks.js',
        'build/js/app.module.js',
        'build/js/templates-app.js',
        'build/js/main.controller.js',
        'build/js/sample.service.js',
        'build/js/sample.directive.js',
        'test/**/*Spec.js',
        'src/templates/*.tpl.html'
    ],


    // list of files to exclude
    exclude: [
    ],

      plugins: [
          'karma-chrome-launcher',
          'karma-jasmine',
          'karma-ng-html2js-preprocessor'
      ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
         // 'src/templates/*.tpl.html': ['ng-html2js']  //<----- Also needed
      },

     // ngHtml2JsPreprocessor: {
       //   stripPrefix: 'src/',
         // moduleName: 'templates-app'   //<-----Module Name for injection
      //},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
