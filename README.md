# gulp-apidoc-history

## Usage

```js
var apidocHistory = require("gulp-apidoc-history");
var concat = require("gulp-concat");
var apidoc = require('gulp-apidoc');
var fs = require("fs");

gulp.task('apidoc', function () {
    var apidocJson = JSON.parse(fs.readFileSync("apidoc.json"));

    gulp.src(["api/**/*.js", "!api/apidocs/*.js"])
        .pipe(apidocHistory({apidoc: apidocJson}))
        .pipe(concat(apidocJson.version + "_apidoc.js"))
        .pipe(gulp.dest('api/apidocs'));

    apidoc.exec({
        src: "api/apidocs/",
        dest: buildDirectories.dest + "/apidoc",
        debug: false,
        includeFilters: [ ".*\\.js$" ]
    });
});
```