module.exports = function (grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),
    
    jshint: {
      files: [
        "public/javascript/**/*js",
        "rooms/**/*.js",
        "src/**/*.js",
        "test/**/*.js",
        "Gruntfile.js"
      ],
      options: {laxcomma: true}
    },

    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: "bdd",
        reporter: "tap"
      },
      all: {src:"test/**/test-*.js"}
    },

    watch: {
      scripts: {
        files: [
          "public/javascript/**/*.js",
          "rooms/**/*.js",
          "src/**/*.js",
          "test/**/*.js"
        ],
        tasks: ["test"]
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-simple-mocha");

  grunt.registerTask("test",["jshint","simplemocha"]);
  grunt.registerTask("default",["jshint"]);
};
