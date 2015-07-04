/*
 * @author: jldupont
 * 
 */
'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');
    
    // Define the configuration for all the tasks
    grunt.initConfig({

    	pkg: grunt.file.readJSON("package.json"),
    	
    	mochaTest : {
        	test: {

        		src: ['tests/**/*.js']
        		
        	} //test
    
    	}//mochaTest

    });//initConfig

    grunt.registerTask("test", ["mochaTest"]);
    grunt.registerTask('default', ['test']);
};
