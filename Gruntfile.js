module.exports = function ( grunt ) {
// Loads in any grunt tasks in the package.json file
require('load-grunt-tasks')(grunt);

// App-specific configuration data
var appConfig = require( './app.config.js' );

var taskConfig = {

    // HTML Builder
    // Appends scripts and styles, Removes debug parts, append html partials, Template options
    // https://github.com/spatools/grunt-html-build
    htmlbuild: {
        build: {
            src: ['src/*.html'],
            dest: '<%= build_dir %>',
            options: {
                parseTag: 'build',
                beautify: true,
                relative: true,
                scripts: {
                    // Modernizr needs to go in HEAD
                    modernizr: ['<%= build_dir %>/vendor/modernizr.js'],
                    // Define order-dependent files first, then glob
                    vendor: [
                        '<%= build_dir %>/vendor/jquery.js',
                        '<%= build_dir %>/vendor/angular.js',
                        '<%= build_dir %>/vendor/**/*.js',
                        '!**/modernizr.js'
                    ],
                    // Project-specific files
                    app: [
                        '<%= build_dir %>/js/app.module.js',
                        '<%= build_dir %>/js/**/*.js',
                        '<%= html2js.app.dest %>'
                    ]

                },
                styles: {
                    vendor: [
                        '<%= build_dir %>/vendor/**/*.css'
                    ],
                    app: [
                        '<%= build_dir %>/css/**/*.css'
                    ]
                },
                // Project meta-data (defined in './app.config.js')
                data: {
                    title: '<%= meta.title %>',
                    description: '<%= meta.description %>',
                    viewport: '<%= meta.viewport %>'
                },
            }
        },
        compile: {
            src: '<%= build_dir %>/*.html',
            dest: '<%= compile_dir %>',
            options: {
                parseTag: 'compile',
                beautify: false,
                relative: true,
                scripts: {
                    // This will be the custom-built version of modernizr (not the full dev version used in build)
                    modernizr: ['<%= compile_dir %>/js/modernizr.js'],
                    app: ['<%= compile_dir %>/js/vendor.js', '<%= compile_dir %>/js/app.js']
                },
                styles: {
                    app: ['<%= compile_dir %>/css/vendor.css', '<%= compile_dir %>/css/**/*.css']
                }
            }
        }
    },

    // Clean
    // Clean files and folders.
    // https://github.com/gruntjs/grunt-contrib-clean
    clean: {
        build: [
            '<%= build_dir %>'
        ],
        compile: [
            '<%= compile_dir %>'
        ]
    },

    // grunt-ng-annotate
    // Add, remove and rebuild angularjs dependency injection annotations
    // https://github.com/mzgol/grunt-ng-annotate
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        build: {
            files: [{
                src: [ 'js/**/*.js' ],
                cwd: '<%= build_dir %>',
                dest: '<%= build_dir %>',
                expand: true
            }]
        }
    },

    // HTML2JS
    // Converts AngularJS templates to JavaScript
    // https://github.com/karlgoldstein/grunt-html2js
    html2js: {
        options: { quoteChar: '\'' },
        app: {
            src: [ '<%= app_files.atpl %>' ],
            dest: '<%= build_dir %>/js/templates-app.js'
        }
    },

    // JS Hint
    // You know it, you hate it. Validate files with JSHint.
    // https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
        // http://www.jshint.com/docs/options/
        options: {
            camelcase: true,
            eqeqeq: true,
            eqnull: true,
            indent: 4,
            latedef: true,
            newcap: true,
            // quotmark: 'single',
            trailing: true,
            // undef: true,
            curly: true,
            immed: true,
            noarg: true,
            sub: true,
            browser: true,
            devel: true,
            debug: true,
            globals: {
                angular: true
            }
        },
        build: '<%= app_files.js %>',
        compile: {
            options: {
                unused: true,
                //devel: false,
                debug: false
            },
            files: {
                src: '<%= build_dir %>/js'
            }
        },
        gruntfile: {
            options : {
                camelcase: false,
                node: true
            },
            files: {
                src: ['Gruntfile.js']
            }
        }
    },

    // Concat
    // Concatenate files.
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
        options: {
            sourceMap: true,
        },
        js_vendor: {
            src: [
                '<%= vendor_files.js %>',
                '!**/modernizr.js'
            ],
            dest: '<%= compile_dir %>/js/vendor.js'
        },
        css_vendor: {
            src: [
                '<%= vendor_files.css %>'
            ],
            dest: '<%= compile_dir %>/css/vendor.css'
        },
        js_app: {
            src: [
                '<%= build_dir %>/js/app.module.js',
                '<%= build_dir %>/js/**/*.js',
                '<%= html2js.app.dest %>'
            ],
            dest: '<%= compile_dir %>/js/app.js'
        }
    },

    // grunt-contrib-watch
    // Run tasks whenever watched files change.
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
        all: {
            files: 'index.html',
            options: {
              livereload: true
            }
        },
        
        app_config: {
            files: 'app.config.js',
            tasks: [ 'build' ]
        },

        gruntfile: {
            files: 'Gruntfile.js',
            tasks: [ 'jshint:gruntfile', 'build' ]
        },

        js_src: {
            files: ['<%= app_files.js %>'],
            tasks: [ 'jshint:build', 'newer:copy:build_appjs' ]
        },

        assets: {
            files: ['src/assets/**/*'],
            tasks: [ 'newer:copy:build_assets' ]
        },

        data: {
            files: ['<%= app_files.data %>'],
            tasks: [ 'newer:copy:build_data' ]
        },

        html: {
            files: [ '<%= app_files.html %>' ],
            tasks: [ 'htmlbuild:build' ]
        },

        views: {
            files: ['src/views/*.html'],
            tasks: [ 'copy:build_views' ]
        },

        tpls: {
            files: [
                '<%= app_files.atpl %>'
            ],
            tasks: [ 'html2js' ]
        },

        sass: {
            files: [ '<%= app_files.styles %>' ],
            tasks: [ 'sass:build', 'autoprefixer:build' ]
        }
    },

    // Uglify
    // Minify files with UglifyJS.
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
        options: {
            //beautify: true
            compress: {
                drop_console: true
            }
        },
        compile: {
            files: {
                '<%= concat.js_vendor.dest %>': '<%= concat.js_vendor.dest %>',
                '<%= concat.js_app.dest %>': '<%= concat.js_app.dest %>'
            }
        }
    },

    // Sass
    // Compile Sass to CSS
    // https://github.com/gruntjs/grunt-contrib-sass
    sass: {
        build: {
            options: {
                'sourcemap': true,
                'loadPath': ['vendor', 'src/sass/']
            },
            files: [{
                expand: true,
                cwd: 'src/sass/',
                src: ['**/*.scss'],
                dest: '<%= build_dir %>/css/',
                ext: '.css'
            }]
        },
        compile: {
            options: {
                'style': 'compressed',
                'sourcemap': false,
                'loadPath': ['vendor', 'src/sass/']
            },
            files: [{
                expand: true,
                cwd: 'src/sass/',
                src: ['*.scss'],
                dest: '<%= compile_dir %>/css/',
                ext: '.css'
            }]
        }
    },

    // Autoprefixer
    // Parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
        build: {
            src: '<%= build_dir %>/css/**/*.css',
        },
        compile: {
            src: '<%= compile_dir %>/css/**/*.css',
        }
    },

    // CSS Min
    // Compress CSS files.
    // https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
        compile: {
            expand: true,
            cwd: '<%= compile_dir %>/css/',
            src: ['**/*.css'],
            dest: '<%= compile_dir %>/css/',
        }
    },

    // Copy
    // Copy files and folders.
    // https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      build_assets: {
        files: [
            {
                src: [ '!svg/**', '**' ],
                dest: '<%= build_dir %>/assets/',
                cwd: 'src/assets',
                expand: true
            }
       ]
      },
      compile_assets: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= compile_dir %>/assets',
                cwd: '<%= build_dir %>/assets',
                expand: true
            }
        ]
      },
      build_views: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= build_dir %>/views/',
                cwd: 'src/views',
                expand: true
            }
       ]
      },
      compile_views: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= compile_dir %>/views/',
                cwd: '<%= build_dir %>/views',
                expand: true
            }
       ]
      },
      build_data: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= build_dir %>/data/',
                cwd: 'src/data',
                expand: true
            }
        ]
      },
      compile_data: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= compile_dir %>/data',
                cwd: '<%= build_dir %>/data',
                expand: true
            }
        ]
      },
      build_appjs: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= build_dir %>/js',
                cwd: 'src/js',
                expand: true
            }
        ]
      },
      build_vendor: {
        files: [
            {
                src: '<%= vendor_files.js %>',
                dest: '<%= build_dir %>/vendor',
                expand: true,
                flatten: true
            },
            {
                src: '<%= vendor_files.css %>',
                dest: '<%= build_dir %>/vendor',
                expand: true,
                flatten: true
            }
        ]
      }
    },

    // ImageMin
    // Minify PNG, JPEG and GIF images
    // https://github.com/gruntjs/grunt-contrib-imagemin
    imagemin: {
        compile: {
            files: [{
                expand: true,
                cwd: '<%= compile_dir %>/assets/images',
                src: ['**/*.{png,jpg,gif}'],
                dest: '<%= compile_dir %>/assets/images'
            }]
        }
    },

    // Modernizr
    // Sifts through your project files, gathers up your references to Modernizr tests and outputs a lean, mean Modernizr machine.
    // https://github.com/Modernizr/grunt-modernizr
    modernizr: {
        compile: {
            devFile: 'vendor/modernizr/modernizr.js',
            outputFile: '<%= compile_dir %>/js/modernizr.js',
            extra : {
                'shiv' : false, // Only need shiv if we've supporting IE < 9
            },
            extensibility : {
                'addtest' : false,
                'prefixed' : true,
                'teststyles' : false,
                'testprops' : true,
                'testallprops' : true,
                'hasevents' : false,
                'prefixes' : false,
                'domprefixes' : false
            },
            parseFiles: true,
            files: {
                src: ['<%= build_dir %>/js/**/*.js', '<%= build_dir %>/css/**/*.css']
            }
        }
    },

    // Express
    // Runs an Express Server
    // https://github.com/blai/grunt-express
    express: {
        dev: {
            options: {
                hostname: 'localhost',
                port: 9000,
                bases: '<%= build_dir %>',
                livereload: true
            }
        },
        compile: {
            options: {
                hostname: 'localhost',
                port: 9000,
                bases: '<%= compile_dir %>'
            }
        }
    },

    // Open
    // Opens the web server in the browser
    // https://github.com/jsoverson/grunt-open
    open: {
      dev: {
        path: 'http://localhost:<%= express.dev.options.port %>'
      },
      compile: {
        path: 'http://localhost:<%= express.compile.options.port %>'
      }
    },

    // SVG Store
    // Merge svgs from a folder
    // https://github.com/FWeinb/grunt-svgstore
    svgstore: {
        options: {
            prefix : 'svg-'
        },
        dev: {
            files: {
                '<%= build_dir %>/assets/svg/icons.svg': ['src/assets/svg/*.svg'],
            },
        },
    },

    // Git Hooks
    // A Grunt plugin to help bind Grunt tasks to Git hooks
    // https://github.com/wecodemore/grunt-githooks
    githooks: {
        all: {
            'pre-commit': 'jshint:build',
            'post-merge': 'dist'
        }
    },

    // HTML Min
    // Minify HTML
    // https://github.com/gruntjs/grunt-contrib-htmlmin
    htmlmin: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            //conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            caseSensitive: true
        },
        compile: {
            files: [{
                expand: true,
                cwd: '<%= compile_dir %>',
                src: ['**/*.html'],
                dest: '<%= compile_dir %>'
            }]
        }
    }
};

grunt.initConfig( grunt.util._.extend( taskConfig, appConfig ) );

grunt.registerTask( 'server', [ 'githooks', 'build', 'express:dev', 'open:dev', 'watch' ] );
grunt.registerTask( 'ncserver', [ 'noclean', 'express:dev', 'watch' ] );
grunt.registerTask( 'noserver', [ 'build', 'watch' ] );
grunt.registerTask( 'dist', [ 'build', 'compile' ] );
grunt.registerTask( 'distserver', [ 'noclean', 'compile', 'express:compile', 'open:compile', 'watch' ] );
grunt.registerTask( 'default', [ 'server' ] );

grunt.registerTask('build', [
    'clean:build', 'jshint:build', 'html2js',
    // 'svgstore',
    'copy:build_assets', 'copy:build_data', 'copy:build_appjs', 'copy:build_vendor', 'copy:build_views',
    'ngAnnotate',
    'sass:build', 'autoprefixer:build', 'htmlbuild:build'
]);

grunt.registerTask('compile', [
    'clean:compile', 'jshint:compile',
    'copy:compile_assets', 'copy:compile_data', 'copy:compile_views',
    'imagemin:compile',
    'sass:compile', 'autoprefixer:compile',
    'concat', 'cssmin:compile',
    'uglify',
    //'modernizr',
    'htmlbuild:compile',
    'htmlmin:compile'
]);


};
