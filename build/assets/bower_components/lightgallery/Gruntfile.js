'use strict';
module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-umd');
    grunt.loadNpmTasks('grunt-banner');

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed GPLv3 */\n',

        // Task configuration.
        clean: {
            files: ['dist']
        },

        /* jshint ignore:start */
        concat: {
            options: {
                banner: '<%= banner %>'
            },
            basic_and_extras: {
                files: {
                    'dist/css/<%= pkg.name %>.css': ['src/css/<%= pkg.name %>.css'],
                    'dist/css/lg-fb-comment-box.css': ['src/css/lg-fb-comment-box.css'],
                    'dist/css/lg-transitions.css': ['src/css/lg-transitions.css'],
                    'dist/js/<%= pkg.name %>.js': ['dist/js/<%= pkg.name %>.js'],
                    'dist/js/<%= pkg.name %>-all.js': ['dist/js/<%= pkg.name %>.js', 'modules/lg-autoplay.js', 'modules/lg-fullscreen.js', 'modules/lg-pager.js', 'modules/lg-thumbnail.js', 'modules/lg-video.js', 'modules/lg-zoom.js', 'modules/lg-hash.js', 'modules/lg-share.js']
                }
            }
        },
        /* jshint ignore:end */
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                files: [{
                    src: 'dist/js/<%= pkg.name %>.js',
                    dest: 'dist/js/<%= pkg.name %>.min.js'
                }, {
                    src: ['dist/js/<%= pkg.name %>.js', 'modules/lg-autoplay.js', 'modules/lg-fullscreen.js', 'modules/lg-pager.js', 'modules/lg-thumbnail.js', 'modules/lg-video.js', 'modules/lg-zoom.js', 'modules/lg-hash.js', 'modules/lg-share.js'],
                    dest: 'dist/js/<%= pkg.name %>-all.min.js'
                }]
            }
        },
        umd: {
            all: {
                options: {
                    src: 'src/js/<%= pkg.name %>.js',
                    dest: 'dist/js/<%= pkg.name %>.js',
                    deps: {
                        args : ['$'],
                        'default': ['$'],
                        amd: {
                            indent: 6,
                            items: ['jquery'],
                            prefix: '\'',
                            separator: ',\n',
                            suffix: '\''
                        },
                        cjs: {
                            indent: 6,
                            items: ['jquery'],
                            prefix: 'require(\'',
                            separator: ',\n',
                            suffix: '\')'
                        },
                        global: {
                            items: ['jQuery'],
                        },
                        pipeline: {
                            indent: 0,
                            items : ['jquery'],
                            prefix: '//= require ',
                            separator: '\n',
                        }
                    }
                }
            }
        },

        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>',
                    linebreak: true
                },
                files: {
                    src: ['dist/js/<%= pkg.name %>.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    'dist/css/<%= pkg.name %>.min.css': ['src/css/<%= pkg.name %>.css']
                }, {
                    'dist/css/lg-fb-comment-box.min.css': ['src/css/lg-fb-comment-box.css']
                },{
                    'dist/css/lg-transitions.min.css': ['src/css/lg-transitions.css']
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**'],
                    dest: 'dist/img/'
                }, {
                    expand: true,
                    cwd: 'src/fonts/',
                    src: ['**'],
                    dest: 'dist/fonts/'
                }]
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc',
                    reporterOutput: ''
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/js/.jshintrc',
                    reporterOutput: ''
                },
                src: ['src/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc',
                    reporterOutput: ''
                },
                src: ['test/**/*.js']
            }
        },
        sass: {
            dist: {
                options: { // Target options
                    style: 'expanded'
                },
                files: {
                    'src/css/lightgallery.css': 'src/sass/lightgallery.scss'
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
            css: {
                files: 'src/**/*.scss',
                tasks: ['sass']
            }
        },
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 9000
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['clean', 'jshint', 'connect', 'qunit', 'umd:all', 'concat','uglify', 'sass', 'cssmin', 'copy', /*'usebanner', 'watch'*/]);
    grunt.registerTask('server', function() {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
};
