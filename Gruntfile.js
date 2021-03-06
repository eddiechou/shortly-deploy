module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    gitpush: {
      your_target: {
        options: {
          remote: 'live'
        }
      }
    },
    concat: {
      basic: {
        src: ['public/client/app.js', 'public/client/createLinkView.js', 'public/client/link.js', 'public/client/links.js', 'public/client/linksView.js', 'public/client/linkView.js', 'public/client/router.js'],
        dest: 'public/dist/clientfiles.js'
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
      my_target: {
        files: {
          'public/dist/clientfiles.min.js': ['public/dist/clientfiles.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        // All client files, all files in app
        'public/client/*.js', 'app/**/*.js'
      ]
    },

    cssmin: {
      target: {
        files: {
          'public/dist/styles.min.css': ['public/style.css']
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
      prodServer: {
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
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'gitpush' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    // deploy to production environment
    if (grunt.option('prod')) {
      grunt.task.run([ 'eslint', 'test', 'gitpush' ]);
    } else {  // deploy to local
      grunt.task.run([ 'concat', 'uglify', 'cssmin', 'server-dev' ]);
    }
    // add your deploy tasks here
  }); 


};
