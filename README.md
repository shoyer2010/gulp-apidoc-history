# gulp-apidoc-history

## Usage

```js
var apidocHistory = require("gulp-apidoc-history");
var concat = require("gulp-concat");
var fs = require("fs");

gulp.task('apidoc:history', function () {
    var apidocJson = JSON.parse(fs.readFileSync("apidoc.json"));
    gulp.src(["api/**/*.js", "!api/apidocs/*.js"])
        .pipe(apidocHistory())
        .pipe(concat(apidocJson.version + "_apidoc.js"))
        .pipe(gulp.dest('api/apidocs'));
});
```