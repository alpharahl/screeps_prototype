module.exports = function(grunt){
  var config = require ('./.screeps.json');

  grunt.loadNpmTasks('grunt-screeps')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.initConfig({
    screeps: {
      options: {
        email: config.email,
        password: config.password,
        branch: grunt.option('branch') || config.branch,
        ptr: config.ptr
      },
      dist: {
        src: ['dist/*.js']
      }
    },

    clean: {
      'dist': ['dist']
    },

    copy: {
      screeps: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**',
          dest: 'dist/',
          filter: 'isFile',
          rename: function (dest, src) {
            // Change the path name utilize underscores for folders
            return dest + src.replace(/\//g,'_');
          }
        }],
      }
    }
  })

  grunt.registerTask('default',  ['clean', 'copy:screeps', 'screeps']);
}