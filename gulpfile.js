var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var ngClassify = require('gulp-ng-classify');
var wrap = require('gulp-wrap');
var strip_log = require('gulp-strip-debug');
var paths = {};
var jobs = [];

var tasks = [
    {
        name: 'main',
        dependency: ['src']
    }
];

var t, i, j, p, f;

get_task_function_for = function(task) {
    f = function(done){
        gulp.src(paths[task])
            .pipe(ngClassify())
            .pipe(coffee({bare: true}).on('error', gutil.log))
            .pipe(ngAnnotate())
            .pipe(concat(task+'.js'))
            .pipe(strip_log())
            .pipe(uglify())
            .pipe(wrap('(function(){\n<%= contents %>\n})();'))
            .pipe(gulp.dest('./assets/javascripts/'))
            .on('end', done)
    };
    return f
};

for(i=0;i<tasks.length;++i){
    t = tasks[i].name;
    jobs.push(t);
    paths[t] = [];
    for (j=0;j<tasks[i].dependency.length;++j){
        p = tasks[i].dependency[j];
        paths[t].push('./'+p+'/**/*.coffee');
    }
    gulp.task(t, get_task_function_for(t));
}

gulp.task('default', jobs);

gulp.task('watch', function() {
    for(i=0;i<jobs.length;++i){
        t = jobs[i];
        gulp.watch(paths[t],{ maxListeners: 999 }, [t]);
    }
});