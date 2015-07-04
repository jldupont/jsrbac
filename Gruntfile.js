/*
 * @author: jldupont
 * 
 */
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-mocha-test');
    
    // Define the configuration for all the tasks
    grunt.initConfig({

    	test: {

    		src: ['tests/**/*.js']
    		
    	}

    });

    grunt.registerTask('default', 'test');
};
