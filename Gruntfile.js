module.exports = function(grunt) {
  // grunt.loadNpmTasks("grunt-sass");
  // grunt.loadNpmTasks("postcss");
  // grunt.loadNpmTasks("grunt-contrib-watch");
  // grunt.loadNpmTasks("grunt-browser-sync");
  // grunt.loadNpmTasks("grunt-csso");

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "build/css/style.css": "source/sass/style.scss"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "build/css/style.css"
      }
    },

    watch: {
      style: {
        files: ["source/sass/**/*.scss", "source/*.html", "source/js/**/*.js"],
        tasks: ["sass", "postcss", "csso", "copy:html", "copy:js", "uglify"]
      },
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    csso: {
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },

        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 90
        },

        files: [{
          expand: true,
          src: "build/img/**/*.{png,jpg}*"
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],

          dest: "build"
        }]
      },

      html: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "*.html"
          ],

          dest: "build"
        }]
      },

      js: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "js/**/*.js"
          ],

          dest: "build"
        }]
      },

      sprite: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/sprite.svg"
          ],

          dest: "build"
        }]
      }
    },

    uglify: {
      js: {
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    },

    clean: {
      build: ["build"]
    }
  });



  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", [
    "clean",
    "copy:build",
    "sass",
    "postcss",
    "csso",
    "imagemin",
    "cwebp",
    "uglify",
    "copy:sprite"
  ]);

  grunt.registerTask("build-soft", [
    "copy:build",
    "sass",
    "postcss",
    "csso",
    "uglify"
  ]);
};
