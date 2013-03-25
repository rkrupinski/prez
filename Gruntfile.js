module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),

		watch: {
			sass: {
				options: {
					debounceDelay: 250,
					nospawn: true
				},
				files: "sass/**/*.scss",
				tasks: ["sass"]
			}
		},

		sass: {
			dist: {
				options: {
					style: "compressed"
				},
				files: {
					"css/main.css": "sass/main.scss"
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-sass");

};