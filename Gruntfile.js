module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
      dist: {
        files: { 'public/dist/<%= pkg.name %>.js': 'public/client/*.js',
        }
      }      
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      dist: {
        files: { 'public/dist/<%= pkg.name%>.min.js': 'public/dist/shortly-deploy.js',
          'public/dist/backbone.min.js': 'public/lib/backbone.js',
          'public/dist/underscore.min.js': 'public/lib/underscore.js',
          'public/dist/handlebars.min.js': 'public/lib/handlebars.js',
          'public/dist/jquery.min.js': 'public/lib/jquery.js'
        }
      }
    },

    eslint: {
      target: [
        'public/lib/**/*.js', 
        'public/client/**/*.js', 
        '*.js', 
        'app/**/*.js'
      ]
    },

    cssmin: {
      dist: {
        files: {
          'public/dist/style.min.css': 'public/*.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      target: {
        command: 'git push live master'
      }


    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default', ['eslint']);

  grunt.registerTask('test', [
    'mochaTest', 'eslint'
  ]);

  grunt.registerTask('build', [
    'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['shell']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'mochaTest', 'eslint', 'concat', 'uglify', 'cssmin', 'nodemon'
  ]);

  grunt.registerTask('prod', [
    'mochaTest', 'eslint', 'concat', 'uglify', 'cssmin', 'shell'
  ]);
};