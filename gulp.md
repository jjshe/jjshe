
##Gulp.js
> Gulp.js 是一个构建工具，与Grunt相比，Gulp更加简洁，执行效率更高。

###安装Gulp
安装完Node.js，使用下面命令安装Gulp

    $ npm install gulp -g

###创建Gulp项目
新建一个文件夹，并在该目录下执行npm init命令

    $ npm init

npm init 命令会为你创建一个 package.json 文件，这个文件保存着这个项目相关信息。比如你用到的各种依赖

创建完之后，我们执行下面的命令：

    npm install gulp --save-dev

局部安装 Gulp 。使用 ```—save-dev``` ，将通知计算机在 package.json 中添加 gulp 依赖。

执行完之后，gulp将创建node_modules文件夹，里面有个gulp文件夹。

###目录结构
    |- app/
        |- css/
        |- fonts/
        |- images/
        |- js/
        |- index.html
    |- build/
    |- node_modules/
    |- gulpfile.js
    |- package.json

###创建gulpfile.js
在根目录下创建一个 gulpfile.js 文件

####第一个Gulp任务
命令告知Node去node_modules中查找gulp包，先局部查找，找不到就去全局环境中查找。
找到之后就会赋值给gulp变量，然后我们就可以使用它了。

    var gulp = require('gulp');

简单的任务如下所示：

    gulp.task('task-name', function() {
        // Stuff here
    });

task-name 是给你的任务起的名字，稍后在命令行中执行 ```gulp task-name``` ，将运行该任务。

写个HelloWorld，是这样的：

    gulp.task('hello', function() {
        console.log('Hello World!');
    });

命令行中执行：

    $ gulp hello

那么将会输出 Hello World!。

    D:\duminghong\FirstGulp>gulp hello
    [13:15:14] Using gulpfile D:\duminghong\FirstGulp\gulpfile.js
    [13:15:14] Starting 'hello'...
    Hello World!
    [13:15:14] Finished 'hello' after 304 μs

Gulp 任务通常都会比这难一点，通常会包含两个特定的 Gulp 方法和一些列 Gulp 插件。

    gulp.task('task-name', function () {
        return gulp.src('source-files') // Get source files with gulp.src
            .pipe(aGulpPlugin()) // Sends it through a gulp plugin
            .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
    })

两个Gulp方法，```src``` ， ```dest```，一进一出

###Gulp执行预处理
我们使用gulp-sass插件来编译Sass。
安装插件的步骤是这样的：

* 使用npm install 命令安装

        $ npm install gulp-sass --save-dev

* 在gulpfile中引入插件，用变量保存

        var gulp = require('gulp');
        // Requires the gulp-sass plugin
        var sass = require('gulp-sass');

* 在任务中使用

        gulp.task('sass', function(){
            return gulp.src('source-files')
                .pipe(sass()) // Using gulp-sass
                .pipe(gulp.dest('destination'))
        });

我们需要给sass任务提供源文件和输出位置。所以我们先在项目中创建app/scss文件夹，里面有个styles.scss文件。

这个文件将在gulp.src中用到。

sass处理之后，我们希望它生成css文件并产出到app/css目录下，可以这样写：

    gulp.task('sass', function(){
        return gulp.src('app/scss/style.scss')
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .pipe(gulp.dest('app/css'))
    });

style.scss

    .testing {
      width: percentage(3/7);
    }

命令

    D:\duminghong\FirstGulp>gulp sass
    [13:32:47] Using gulpfile D:\duminghong\FirstGulp\gulpfile.js
    [13:32:47] Starting 'sass'...
    [13:32:47] Finished 'sass' after 21 ms

style.css

    .testing {
      width: 42.85714%;
    }

###Node中的通配符
通常我们不止有一个scss文件。这时候可以使用Node通配符。

通配符是一种匹配模式，允许你匹配到多个文件。不止是Node，很多平台都有，有点像正则表达式。

使用通配符，计算机检查文件名和路径进行匹配。

大部分时候，我们只需要用到下面4种匹配模式：

1. ***.scss** ：

    ```*```号匹配当前目录任意文件，所以这里 ```*.scss``` 匹配当前目录下所有scss文件

2. **\*\*/\*.scss** ：

    匹配当前目录及其子目录下的所有scss文件。

3. **!not-me.scss** ：

    ```!``` 号移除匹配的文件，这里将移除 ```not-me.scss```

4. **\*.+(scss|sass)** ：

    ```+``` 号后面会跟着圆括号，里面的元素用 ```| ``` 分割，匹配多个选项。这里将匹配scss和sass文件。


###监听文件
Gulp提供watch方法给我们，语法如下：

    // Gulp watch syntax
    gulp.watch('files-to-watch', ['监听执行的任务']);

我们监听的还不只是一个文件，把它变成一个任务：

    gulp.task('watch', function(){
        gulp.watch('app/scss/**/*.scss', ['sass']);
        // Other watchers
    })

执行gulp watch命令：

    D:\duminghong\FirstGulp>gulp watch
    [13:51:21] Using gulpfile D:\duminghong\FirstGulp\gulpfile.js
    [13:51:21] Starting 'watch'...
    [13:51:21] Finished 'watch' after 8.56 ms

有了监听，每次修改文件，Gulp都将自动为我们执行任务。

###使用Browser Sync自动刷新
新插件？记住！安装，引入，使用。

1. 安装

        $ npm install browser-sync --save-dev

2. 引入
    这里没有gulp-前缀，因为 browser-sync 支持Gulp，所以没有人专门去搞一个给Gulp用。

        var browserSync = require('browser-sync');

3. 使用
    我们创建一个broswerSync任务，我们需要告知它，根目录在哪里。

        gulp.task('browserSync', function() {
            browserSync({
                server: {
                    baseDir: 'app'
                },
            })
        })

修改一下之前的代码，让每次css文件更改都刷新一下浏览器：

    gulp.task('sass', function() {
        return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
            .pipe(sass())
            .pipe(gulp.dest('app/css'))
            .pipe(browserSync.reload({
                stream: true
            }))
    });

配置好 Broswer Sync 之后，需要运行这两个命令。

我们可以在watch任务之前告知Gulp，先把browserSync和Sass任务执行了，语法如下：

    gulp.task('watch', ['watch任务之前执行的任务'], function (){
        // ...
    })

具体应用如下：

    gulp.task('watch', ['browserSync', 'sass'], function (){
        gulp.watch('app/scss/**/*.scss', ['sass']);
        // Other watchers
    })

现在执行gulp watch命令，在执行完browserSync和Sass，才会开始监听。

    D:\duminghong\FirstGulp>gulp watch
    [14:07:42] Using gulpfile D:\duminghong\FirstGulp\gulpfile.js
    [14:07:42] Starting 'browserSync'...
    [14:07:42] Finished 'browserSync' after 61 ms
    [14:07:42] Starting 'sass'...
    [BS] 1 file changed (style.css)
    [14:07:42] Finished 'sass' after 24 ms
    [14:07:42] Starting 'watch'...
    [14:07:42] Finished 'watch' after 7.92 ms
    [BS] Access URLs:
     --------------------------------------
           Local: http://localhost:3000
        External: http://192.168.2.197:3000
     --------------------------------------
              UI: http://localhost:3001
     UI External: http://192.168.2.197:3001
     --------------------------------------
    [BS] Serving files from: app
    [14:08:55] Starting 'sass'...
    [BS] 1 file changed (style.css)
    [14:08:55] Finished 'sass' after 8.44 ms

修改其他相关文件也刷新浏览器：

    gulp.task('watch', ['browserSync', 'sass'], function (){
        gulp.watch('app/scss/**/*.scss', ['sass']);
        // Reloads the browser whenever HTML or JS files change
        gulp.watch('app/*.html', browserSync.reload);
        gulp.watch('app/js/**/*.js', browserSync.reload);
    });

###优化CSS和JavaScript文件
说到优化的时候，我们需要想到：压缩，合并。也就是减少体积和HTTP次数。

开发者面临的主要问题是很难按照正确的顺序合并文件。

####合并
gulp-useref会将多个文件拼接成单一文件，并输出到相应目录。语法：

    <!-- build:<type> <path> -->
    ... HTML Markup, list of script / link tags.
    <!-- endbuild -->

我们想最终产出main.min.js。可以这样写：

    <!--build:js js/main.min.js -->
    <script src="js/lib/a-library.js"></script>
    <script src="js/lib/another-library.js"></script>
    <script src="js/main.js"></script>
    <!-- endbuild -->

1. 安装

        $ npm install gulp-useref --save-dev

2. 引入、使用

        var useref = require('gulp-useref');

        gulp.task('useref', function(){
            return gulp.src('app/*.html')
                .pipe(useref())
                .pipe(gulp.dest('build'));
        });

执行useref命令，Gulp将合并多个script标签成一个文件，并保存到build/js/main.min.js。

####压缩
使用gulp-uglify插件来压缩

1. 安装

        $ npm install gulp-uglify --save-dev

2. 引入、使用

        var uglify = require('gulp-uglify');

        gulp.task('useref', function(){
            return gulp.src('app/*.html')
                .pipe(uglify()) // Uglifies Javascript files
                .pipe(useref())
                .pipe(gulp.dest('build'))
        });

注意：执行完useref后，html中的script路径将只剩下main.min.js。

gulp-useref 同样可以用在css上。除了压缩需要区分，其它内容同js一样。所以我们使用 gulp-if 来做不同处理。

#####使用gulp-minify-css压缩css。
1. 安装

        $ npm install gulp-if gulp-minify-css --save-dev

2. 引入、使用

        var gulpIf = require('gulp-if');
        var minifyCSS = require('gulp-minify-css');

        gulp.task('useref', function(){

            return gulp.src('app/*.html')
                // Minifies only if it's a CSS file
                .pipe(gulpIf('*.css', minifyCSS()))
                // Uglifies only if it's a Javascript file
                .pipe(gulpIf('*.js', uglify()))
                .pipe(useref())
                .pipe(gulp.dest('build'))
        });

###压缩图片
使用gulp-imagemin插件。

1. 安装

        $ npm install gulp-imagemin --save-dev

2. 引入、使用

        var imagemin = require('gulp-imagemin');

        gulp.task('images', function(){
            return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
                .pipe(imagemin())
                .pipe(gulp.dest('build/images'))
        });

压缩图片可能会占用较长时间，使用 gulp-cache 插件可以减少重复压缩。

1. 安装

        $ npm install gulp-cache --save-dev

2. 引入、使用

        var cache = require('gulp-cache');

        gulp.task('images', function(){
            return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
            // Caching images that ran through imagemin
            .pipe(cache(imagemin({
                interlaced: true
            })))
            .pipe(gulp.dest('build/images'))
        });

##发布流程

###清理生成文件
由于是自动生成文件，我们不想旧文件掺杂进来。
使用 del 清理生成文件

1. 安装

        $ npm install del --save-dev

2. 引入、使用

        var del = require('del');

        gulp.task('clean', function() {
            del('build');
        });

但是我们又不想图片被删除（图片改动的几率不大）,启用新的任务。

    gulp.task('clean:build', function(callback){
        del(['build/**/*', '!build/images', '!build/images/**/*'], callback)
    });

这个任务会删除，除了 images/ 文件夹，build 下的任意文件。
为了知道 clean:build 任务什么时候完成，我们需要提供 callback 参数。

在某些时候我们还是需要清除图片，所以clean任务我们还需要保留。

    gulp.task('clean', function(callback) {
        del('build');
        return cache.clearAll(callback);
    })

###组合Gulp任务
我们主要有两条线路。

第一条是开发过程，我们便以Sass，监听文件，刷新浏览器。

第二条是优化，我们优化CSS,JavaScript,压缩图片，并把资源从app移动到build。

开发任务我们上面的watch已经组装好了。

    gulp.task('watch', ['browserSync', 'sass'], function (){
        // ... watchers
    })

来执行第二条线路:

    gulp.task('build', ['clean', 'sass', 'useref', 'images', 'fonts'], function (){
        console.log('Building files');
    })

但是这样Gulp会同时触发[]的事件。我们要让clean在其他任务之前完成。

####让一个任务在其他任务之前完成
用 RunSequence 插件

1. 安装

        $ npm install run-sequence --save-dev

2. 引入、使用

        var runSequence = require('run-sequence');

        gulp.task('task-name', function(callback) {
            runSequence('task-one', 'task-two', 'task-three', callback);
        });

执行 task-name 时，Gulp会按照顺序执行 task-one , task-two , task-thre。
RunSequence也允许你同时执行多个任务。

    gulp.task('task-name', function(callback) {
        runSequence('task-one', ['同时执行的任务','同时执行的任务'], 'task-three', callback);
    });

看看实际代码：

    gulp.task('build', function (callback) {
        runSequence('clean:dist',
            ['sass', 'useref', 'images', 'fonts'],
            callback
        )
    })

开发任务我们也用runSequence:

    gulp.task('default', function (callback) {
        runSequence(['sass','browserSync', 'watch'],
            callback
        )
    })

如果你的任务名字叫做default，那么只需要输入gulp命令即可执行。


-----------------------

###常用的插件

    $ npm install gulp --save-dev                       // Gulp
    $ npm install gulp-sass --save-dev                  // Sass
    $ npm install browser-sync --save-dev               // 浏览器自动刷新
    $ npm install gulp-useref --save-dev                // 合并
    $ npm install gulp-uglify --save-dev                // 压缩
    $ npm install gulp-if gulp-minify-css --save-dev    // 压缩css
    $ npm install gulp-imagemin --save-dev              // 压缩图片
    $ npm install gulp-cache --save-dev                 // 减少图片重复压缩
    $ npm install del --save-dev                        // 清理生成文件
    $ npm install run-sequence --save-dev               // 让一个任务在其他任务之前完成

####最终的 gulpfile.js

    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var browserSync = require('browser-sync');
    var useref = require('gulp-useref');
    var uglify = require('gulp-uglify');
    var gulpIf = require('gulp-if');
    var cssnano = require('gulp-minify-css');
    var imagemin = require('gulp-imagemin');
    var cache = require('gulp-cache');
    var del = require('del');
    var runSequence = require('run-sequence');


    // ---------------
    // 开发任务
    // -----------------

    // 开始自动刷新浏览器
    gulp.task('browserSync', function() {
      browserSync({
        server: {
          baseDir: 'app'
        }
      })
    })

    gulp.task('sass', function() {
      return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass()) // Passes it through a gulp-sass
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
          stream: true
        }));
    })

    // 监听修改
    gulp.task('watch', function() {
      gulp.watch('app/scss/**/*.scss', ['sass']);
      gulp.watch('app/*.html', browserSync.reload);
      gulp.watch('app/js/**/*.js', browserSync.reload);
    })


    // ---------------
    // 优化任务
    // ------------------

    // 优化 CSS 和 JavaScript
    gulp.task('useref', function() {

      return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulp.dest('build'));
    });

    // 优化图片
    gulp.task('images', function() {
      return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
          interlaced: true,
        })))
        .pipe(gulp.dest('build/images'))
    });

    // 复制字体
    gulp.task('fonts', function() {
      return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
    })

    // 清理
    gulp.task('clean', function() {
      return del.sync('build').then(function(cb) {
        return cache.clearAll(cb);
      });
    })

    gulp.task('clean:build', function() {
      return del.sync(['build/**/*', '!build/images', '!build/images/**/*']);
    });


    // ---------------
    // 构造序列
    // ---------------

    gulp.task('default', function(callback) {
      runSequence(['sass', 'browserSync', 'watch'],
        callback
      )
    })

    gulp.task('build', function(callback) {
      runSequence(
        'clean:build',
        'sass',
        ['useref', 'images', 'fonts'],
        callback
      )
    })

#END