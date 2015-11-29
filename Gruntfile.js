module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
    	sass: {
    		dev: {
    			options: {
    				outputStyle: 'expanded'
                    // sourcemap: true
    			},
    			files: {
    				'public/main.css': 'frontend/styles/main.scss' 
    			}
    		}
    	},
    	watch: {
    		sass: {
    			files: ['frontend/styles/**/*.scss'],
    			tasks: ['sass:dev'],
    			options: {
    				livereload: true
    			}
    		},
            browserify: {
                files: ['frontend/**/*.js', 'frontend/**/*.jsx'],
                tasks: ['browserify:dev']
            }
    	},
        browserify: {
            dev: {
                files: {
                    'public/main.js': ['frontend/scripts/**/*.js']
                },
                options: {
                    transform: [
                        ["babelify", {presets: ["react", "es2015"]}]
                    ]   
                }
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('watch-js', ['browserify:dev', 'watch:browserify'])
}