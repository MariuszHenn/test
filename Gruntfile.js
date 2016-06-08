
module.exports = function(grunt) {


  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    template: {
      'process-html-template': {
       'options':{
          data: {
            text: grunt.option('text')
          }
       },
        files: {
          'index.html': ['src/index.html.tpl']
        }
  }
    }
  });


  grunt.loadNpmTasks('grunt-template');


  grunt.registerTask('default', ['template']);

};
