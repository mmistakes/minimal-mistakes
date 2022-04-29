module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            ghosthunter_embedded_lunr: {
                src: "src/<%= pkg.name %>.js",
                dest: "dist/jquery.ghosthunter.js",
                options: {
                    process: function(content, path) {
                        var lunr = grunt.file.read('./src/lunr.js');
                        content = content.replace(/\/\*\s+lunr\s+\*\//i, lunr);
                        var levenshtein = grunt.file.read('./src/levenshtein.js');
                        content = content.replace(/\/\*\s+levenshtein\s+\*\//i, levenshtein);
                        return grunt.template.process(content)
                    }
                }
            },
            ghosthunter_required_lunr: {
                src: "src/<%= pkg.name %>.js",
                dest: "dist/jquery.ghosthunter-use-require.js",
                options: {
                    process: function(content, path) {
                        content = content.replace(/\/\*\s+lunr\s+\*\//i, 'var lunr = require("lunr")');
                        var levenshtein = grunt.file.read('./src/levenshtein.js');
                        content = content.replace(/\/\*\s+levenshtein\s+\*\//i, levenshtein);
                        return grunt.template.process(content)
                    }
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    // Default task(s).
    grunt.registerTask('default', ['copy']);
};
