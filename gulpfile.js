var gulp = require("gulp");
var fs = require("fs");
var path = require("path");
var url = require("url");
var scss = require("gulp-sass"); //scss转为css
var mincss = require("gulp-clean-css"); //压缩css
var minJs = require("gulp-uglify");
var server = require("gulp-webserver");
var data = require("./src/data/data.json");
//转为css并压缩
gulp.task("sassTask", function() {
        return gulp.src("./src/scss/*.scss")
            .pipe(scss())
            .pipe(mincss())
            .pipe(gulp.dest("./src/css"))
    })
    //监听scss的变化
gulp.task("watch", function() {
        return gulp.src("./src/scss/index.scss", gulp.series("sassTask"));
    })
    //压缩js
gulp.task("minjs", function() {
        return gulp.src(["./src/js/**/*.js", "!./src/js/lib/*.js"])
            .pipe(minJs())
            .pipe(gulp.dest("./src/jj"))
    })
    //起服务 判断接口
gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 8000,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/") {
                    return false;
                }
                if (pathname === "/api/list") {
                    res.end(JSON.stringify({ "code": 1, "msg": "成功", data: data }))
                } else if (pathname === "/") {
                    var pathname = pathname === "/" ? "/index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
})
gulp.task("dev", gulp.series("sassTask", "minjs", "server", "watch"));