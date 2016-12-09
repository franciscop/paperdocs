// This builds the library itself
module.exports = function (grunt) {
  // Configuration
  grunt.initConfig({
    jshint: {
      ignore_warning: {
        src: ['Gruntfile.js', 'server.js'],
        options: {
          '-W043': true  // Allow for multiline with \ backslash
        }
      }
    },

    semistandard: {
      app: {
        src: [
          './paperdocs.js'
        ]
      }
    },

    uglify: {
      options: {
        banner: '/* Paperdocs ' + grunt.file.readJSON('package.json').version + ' by Francisco Presencia - MIT - https://github.com/franciscop/paperdocs */\n'
      },
      my_target: {
        files: {
          'paperdocs.min.js': 'paperdocs.js'
        }
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '/* Paperdocs v' + grunt.file.readJSON('package.json').version + ' by Francisco Presencia - MIT - https://github.com/franciscop/paperdocs */\n',
        linebreak: true
      },
      files: {
        src: [ './paperdocs.js', './paperdocs.min.css' ]
      }
    },

    watch: {
      scripts: {
        files: [
          'package.js', // To bump versions
          'Gruntfile.js',
          'documentation/*.**',
          'src/*.**',
          'views/*.pug',
          'server.js',
          'README.md'
        ],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    pug: {
      compile: {
        options: {
          client: false
        },
        files: [ {
          cwd: 'views',
          src: '**/*.html.pug',
          dest: './examples',
          expand: true,
          ext: '.html'
        }, {
          'index.html': 'views/index.html.pug'
        } ]
      }
    },

    concat: {
      main: {
        // No test files
        options: {
          process: function (src, file) {
            return /test\.js/.test(file) ? '' : src;
          }
        },
        files: {
          'paperdocs.js': [
            './node_modules/prismjs/prism.js',
            './node_modules/umbrellajs/umbrella.min.js',
            './node_modules/superdom/superdom.min.js',
            './node_modules/marked/marked.min.js',
            './src/paperdocs.js',
          ]
        }
      },
      test: {
        files: {
          'test/test.js': ['src/test.js', 'src/plugins/**/test.js']
        }
      }
    },

    sass: {
      dist: {
        options: { sourcemap: 'none', style: 'compressed' },
        files: {
          'paperdocs.min.css': 'src/paperdocs.scss'
        }
      }
    },

    bytesize: {
      all: {
        src: [
          'public/style.css',
          'public/javascript.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-semistandard');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-bytesize');
  grunt.loadNpmTasks('grunt-banner');

  grunt.registerTask('build', ['concat', 'sass', 'usebanner', 'pug']);
  grunt.registerTask('test', ['semistandard', 'bytesize']);
  grunt.registerTask('default', ['pug', 'build']);
};
