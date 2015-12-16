
module.exports = function(grunt) {

    var env = grunt.option('env') || "dev";

    var timestamp = Date.now();
    var assetsPath = (env == 'dev') ? './' : '/special/timeline/';

    console.log(" ");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            default: ['dist/*']
        },

        copy: {
            default: {
                files: [{
                    src: ['README.md'],
                    dest: 'dist/README.md'
                },
                {
                    expand: true,
                    cwd: 'src',
                    src: ['**', '**/*', '!iframe.html'],
                    dest: 'dist'
                }]
            }
        },

        sass: {
            options: {
                style: "compressed",
                sourcemap: "inline"
            },
            default: {
                files: [{
                    expand: true,
                    cwd: 'src/css/scss',
                    src: ['*.scss', '**/*.scss'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                diff: true,
                map: true
            },
            default: {
                src: 'dist/css/style.min.css'
            }           
        },

        concat: {
            options: {
                separator: ';\n'
            },
            js: {
                files: [{
                    src: ['bower_components/jquery/dist/jquery.min.js', 'bower_components/jquery-migrate/jquery-migrate.min.js','bower_components/angular/angular.min.js', 'bower_components/angular-i18n/angular-locale_fr-fr.js','bower_components/angular-*/*.min.js'],
                    dest: 'dist/js/vendors.min.js'
                },
                {
                    src: ['src/js/libs/*.js'],
                    dest: 'dist/js/libs.js'
                },
                {
                    src: ['src/app/config_'+ env +'.js','src/app/app.js','src/app/services/*.js','src/app/directives/*.js','src/app/filters/*.js','src/app/controllers/*.js'],
                    dest: 'dist/js/app.js'
                },
                {
                    src: ['src/js/ie/*.min.js'],
                    dest: 'dist/js/ie.min.js'
                }]
            }
        },

        processhtml: {
            default: {
                options: {
                    data: {
                        assetsPath: assetsPath,
                        timestamp: timestamp,
                        env: env
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['index.html'],
                    dest: 'dist'
                }]
            }
        },

        watch: {
            options: {
                livereload: false,
            },
            css: {
                files: ['src/**/*.scss'],
                tasks: ['css']
            },
            iecss: {
                files: ['src/**/*.css'],
                tasks: ['html']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['js']
            },
            json: {
                files: ['src/**/*.json'],
                tasks: ['html']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['html']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/**/*.css',
                        'dist/**/*.js',
                        'dist/**/*.json',
                        'dist/**/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        },

        'ftp-deploy': {
            default: {
                auth: {
                    host: '172.22.49.162',
                    port: 21,
                    authKey: env
                },
                src: 'dist/',
                dest: '/special/timeline/'
            }
        },

        htmlhint: {
            default: {
                options: {
                    force: false,
                    htmlhintrc: '.htmlhintrc'
                },
                src: ['src/**/*.html']
            }
        },

        csslint: {
            default: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: ['dist/css/**/*.css']
            }
        },

        jshint: {
            default: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['src/app/**/*.js', 'src/js/**/*.js']
            }
        },

        lintspaces: {
            default: {
                options: {
                    newline: false,
                    newlineMaximum: 2,
                    trailingspaces: true,
                    indentation: 'spaces',
                    spaces: 4
                },
                src: ['src/**/*.html', 'src/css/**/*.scss', '!src/css/scss/base/_normalize.scss', 'src/app/**/*.js', 'src/js/**/*.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-lintspaces');

    grunt.registerTask('html', ['copy', 'processhtml']);
    grunt.registerTask('css', ['sass', 'autoprefixer']);
    grunt.registerTask('js', ['concat']);

    grunt.registerTask('test', ['htmlhint', 'csslint', 'jshint', 'lintspaces']);
    grunt.registerTask('deploy', ['publish', 'ftp-deploy']);
    grunt.registerTask('publish', ['clean', 'html', 'css', 'js'/*, 'test'*/]);
    grunt.registerTask('serve', ['browserSync', 'watch']);
    grunt.registerTask('default', ['publish', 'serve']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

};
