var path = require('path');
// const mozjpeg = require('imagemin-mozjpeg');

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-less');
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-parallel');
  grunt.loadNpmTasks('grunt-express');

  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        port: 9000,
        hostname: '*'
      },
      // livereload: {
      //   options: {
      //     server: path.resolve('./server'),
      //     livereload: true,
      //     serverreload: true,
      //     bases: [path.resolve('./.tmp'), path.resolve(__dirname, yeomanConfig.app)]
      //   }
      // },
      // test: {
      //   options: {
      //     server: path.resolve('./server'),
      //     bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test')]
      //   }
      // },
      dist: {
        options: {
          server: path.resolve('./socialrender'),
          bases: path.resolve(__dirname, yeomanConfig.dist)
        }
      }
    },
    html2js: {
      /**
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          base: 'src'
        },
        src: ['src/**/*.tpl.html'],
        dest: 'build/templates-app.js'
      }
    },
    less: {
      all: {
        src: 'style.less',
        dest: 'build/style.css',
        options: {
          report: 'gzip'
        }
      }
    },
    // imagemin: {
    //   static: {
    //     options: {
    //       optimizationLevel: 3,
    //       svgoPlugins: [{removeViewBox: false}],
    //       use: [mozjpeg()] // Example plugin usage
    //     },
    //     files: {
    //       'build/': 'public/img/*.png'
    //     }
    //   },
    //   dynamic: {
    //     files: [{
    //       expand: true,
    //       cwd: 'public/img/',
    //       src: ['**/*.{png,jpg,gif}'],
    //       dest: 'build/'
    //     }]
    //   }
    // },
    connect: {
      server: {
        options: {
          port: process.env.PORT || 3000,
          base: 'build/',
          hostname: '*',
          debug: true
        },
        proxies: [{
          context: '/api/feeds', // the context of the data service
          host: 'https://ustadium-api-dev.herokuapp.com/', // wherever the data service is running
          port: 443, // the port that the data service is running on
          https: true,
          xforward: false,
          hideHeaders: ['x-removed-header']
        }],
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      templates: {
        files: ['src/**/*.tpl.html'],
        tasks: ['html2js']
      },
      less: {
        files: ['style.less', 'src/**/*.less'],
        tasks: ['less']
      },
      sources: {
        files: ['src/**/*.js', 'src/*.js'],
        tasks: ['concat_sourcemap:app']
      },
      index: {
        files: 'index.html',
        tasks: ['copy:index']
      },
      imagemin: {
        files: ['public/img/*.png'],
        tasks: ['imagemin']
      },
      css: {
        files: [
          'libs/angular-toastr/dist/angular-toastr.css'
        ],
        tasks: ['copy:css']
      }
      // Useful for watching / rerunning karma tests
      // jsTest: {
      //    files: ['test/spec/{,*/}*.js'],
      //    tasks: ['karma']
      //}
    },
    concat_sourcemap: {
      options: {
        sourcesContent: true
      },
      app: {
        src: ['src/**/*.js', 'src/*.js'],
        dest: 'build/app.js'
      },
      libs: {
        src: [
          'libs/angular/angular.js',
          'libs/angular-animate/angular-animate.js',
          'libs/angular-bootstrap/ui-bootstrap-tpls.js',
          'libs/jquery/dist/jquery.min.js',
          'libs/angular-mocks/angular-mocks.js',
          'libs/angular-ui-router/release/angular-ui-router.js',
          'libs/angular-toastr/dist/angular-toastr.tpls.js',
          'libs/angular-ui-notification/dist/angular-ui-notification.js',
          'libs/angular-socialshare/dist/angular-socialshare.js'
        ],
        dest: 'build/libs.js'
      }
    },
    copy: {
      index: {
        src: 'index.html',
        dest: 'build/',
        options: {
          processContent: function (content, srcpath) {
            // Compiling index.html file!
            var packageVersion = require('./package.json').version;
            return grunt.template.process(content, {
              data: {
                version: packageVersion
              }
            });
          }
        }
      },
      css: {
        src: [
          'libs/angular-toastr/dist/angular-toastr.css',
          'libs/angular-ui-notification/dist/angular-ui-notification.css',
        ],
        dest: 'build/angular-libs.css',
        options: {
          processContent: function (content, srcpath) {
            // Compiling index.html file!
            var packageVersion = require('./package.json').version;
            return grunt.template.process(content, {
              data: {
                version: packageVersion
              }
            });
          }
        }
      },
      img: {
        src: [
          'public/img/*.png'
        ],
        dest: 'build/',
        options: {
          processContent: function (content, srcpath) {
            // Compiling index.html file!
            var packageVersion = require('./package.json').version;
            return grunt.template.process(content, {
              data: {
                version: packageVersion
              }
            });
          }
        }
      }
    },
    clean: {
      all: {
        src: ['build/']
      }
    },
    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  // Build process:
  // - clean build/
  // - creates build/templates-app.js from *.tpl.html files
  // - creates build/style.css from all the .less files
  // - concatenates all the source files in build/app.js - banner with git revision
  // - concatenates all the libraries in build/libs.js
  // - copies index.html over build/
  grunt.registerTask('build', ['clean', 'html2js', 'less', 'concat_sourcemap:app', 'concat_sourcemap:libs', 'copy']);
  grunt.registerTask('default', ['clean', 'concat_sourcemap:libs', 'html2js', 'less', 'concat_sourcemap:app', 'concat_sourcemap:libs', 'copy']);
  grunt.registerTask('test', ['karma']);
};
