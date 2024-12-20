//
// Variables ===================================
//

// Load dependencies
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const cached = require('gulp-cached');
const cleancss = require('gulp-clean-css');
const del = require('del');
const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const deploy = require('gulp-gh-pages');
const gulpif = require('gulp-if');
const npmdist = require('gulp-npm-dist');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const sass = require('gulp-sass')(require('sass'));

// Define paths
const paths = {
  base: {
    base: {
      dir: './'
    },
    node: {
      dir: './node_modules'
    }
  },
  dist: {
    base: {
      dir: './dist'
    },
    libs: {
      dir: './dist/assets/libs'
    }
  },
  src: {
    base: {
      dir: './src',
      files: './src/**/*'
    },
    css: {
      dir: './src/assets/css',
      files: './src/assets/css/**/*'
    },
    html: {
      dir: './src',
      files: './src/**/*.html',
    },
    img: {
      dir: './src/assets/img',
      files: './src/assets/img/**/*',
    },
    js: {
      dir: './src/assets/js',
      files: './src/assets/js/**/*'
    },
    partials: {
      dir: './src/partials',
      files: './src/partials/**/*'
    },
    scss: {
      dir: './src/assets/scss',
      files: './src/assets/scss/**/*',
      main: './src/assets/scss/*.scss'
    },
    tmp: {
      dir: './src/.tmp',
      files: './src/.tmp/**/*'
    }
  }
};

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});


gulp.task('browsersync', function(callback) {
  browsersync.init({
    server: {
      baseDir: [paths.src.tmp.dir, paths.src.base.dir, paths.base.base.dir]
    },
    middleware: function(req,res,next) {
      if (req.url === '/les-jockeys') {
        req.url = '/les-jockeys.html';
      } else if (req.url === '/plateforme-de-gestion') {
        req.url = '/plateforme-de-gestion.html';
      } else if (req.url === '/convoicar-pour-les-entreprises' || 
                 req.url === '/service-de-livraison-de-vehicule' || 
                 req.url === '/service-de-jockey-apres-vente' || 
                 req.url === '/convoicar-pour-les-automobilistes' || 
                 req.url === '/convoicar-pour-les-pros/logo-en-ligne-convoicar' || 
                 req.url === '/convoicar-pour-les-pros/main/' ) {
        req.url = '/service-de-jockey.html';
      } else if (req.url === '/qui-sommes-nous') {
        req.url = '/qui-sommes-nous.html';
      } else if (req.url === '/recrutement-chauffeurs/convoicar-jockeys') {
        req.url = '/devenir-jockey.html';
      } else if (req.url === '/qui-sommes-nous/presentation-convoicar') {
        req.url = '/qui-sommes-nous.html';
      } else if (req.url === '/contact') {
        req.url = '/contact.html';
      }
      else if (req.url === '/gestion-de-jockey') {
        req.url = '/gestion-de-jockey.html';
      }     
      else if (req.url === '/gestion-mobilite-douce') {
        req.url = '/gestion-mobilite-douce.html';
      }     
      else if (req.url === '/rentabilisation-vehicule') {
        req.url = '/rentabilisation-vehicule.html';
      }  
      else if (req.url === '/presentation-de-vehicule-genius') {
        req.url = '/presentation-de-vehicule-genius.html';
      }    
      else if (req.url === '/thanks') {
        req.url = '/thanks.html';
      } else if (req.url === '/blog') {
        req.url = '/blog.html'
      } else if (req.url === '/blogs/arrivee-mobilite') {
        req.url = '/blogs/arrivee-mobilite.html'
      } else if (req.url === '/blogs/transformation-digitale') {
        req.url = '/blogs/transformation-digitale.html'
      } else if (req.url === '/blogs/limite-pret-courtoisie') {
        req.url = '/blogs/limite-pret-courtoisie.html'
      }
      return next();
    }
  });
  callback();
});

gulp.task('browsersyncReload', function(callback) {
  browsersync.reload();
  callback();
});

gulp.task('watch', function() {
  gulp.watch(paths.src.scss.files, gulp.series('scss'));
  gulp.watch([paths.src.js.files, paths.src.img.files], gulp.series('browsersyncReload'));
  gulp.watch([paths.src.html.files, paths.src.partials.files], gulp.series('fileinclude', 'browsersyncReload'));
});

gulp.task('scss', function() {
  return gulp
    .src(paths.src.scss.main)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.src.css.dir))
    .pipe(browsersync.stream());
});

gulp.task('fileinclude', function(callback) {
  return gulp
    .src([
      paths.src.html.files,
      '!' + paths.src.tmp.files,
      '!' + paths.src.partials.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(cached())
    .pipe(gulp.dest(paths.src.tmp.dir));
});

gulp.task('clean:tmp', function(callback) {
  del.sync(paths.src.tmp.dir);
  callback();
});

gulp.task('clean:dist', function(callback) {
  del.sync(paths.dist.base.dir);
  callback();
});

gulp.task('copy:all', function() {
  return gulp
    .src([
      paths.src.base.files,
      '!' + paths.src.partials.dir, '!' + paths.src.partials.files,
      '!' + paths.src.scss.dir, '!' + paths.src.scss.files,
      '!' + paths.src.tmp.dir, '!' + paths.src.tmp.files,
      '!' + paths.src.js.dir, '!' + paths.src.js.files,
      '!' + paths.src.css.dir, '!' + paths.src.css.files,
      '!' + paths.src.html.files,
    ])
    .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('copy:libs', function() {
  return gulp
    .src(npmdist(), {
      base: paths.base.node.dir
    })
    .pipe(gulp.dest(paths.dist.libs.dir));
});

gulp.task('html', function() {
  return gulp
    .src([
      paths.src.html.files,
      '!' + paths.src.tmp.files,
      '!' + paths.src.partials.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(replace(/href="(.{0,10})node_modules/g, 'href="$1assets/libs'))
    .pipe(replace(/src="(.{0,10})node_modules/g, 'src="$1assets/libs'))
    .pipe(useref())
    .pipe(cached())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleancss()))
    .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('html:preview', function() {
  return gulp
    .src([
      paths.src.html.files,
      '!' + paths.src.tmp.files,
      '!' + paths.src.partials.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(replace('</head>', '\n    <!-- Global site tag (gtag.js) - Google Analytics -->\n    ' + gtag + '\n\n  </head>'))
    .pipe(replace(/href="(.{0,10})node_modules/g, 'href="$1assets/libs'))
    .pipe(replace(/src="(.{0,10})node_modules/g, 'src="$1assets/libs'))
    .pipe(useref())
    .pipe(cached())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleancss()))
    .pipe(gulp.dest(paths.dist.base.dir));
});

gulp.task('copy-locales', () => {
  return gulp.src('locales/*.json')
    .pipe(gulp.dest('dist/locales'));
});

gulp.task('build', gulp.series(gulp.parallel('clean:tmp', 'clean:dist', 'copy:all', 'copy:libs', 'copy-locales'), 'scss', 'html'));
gulp.task('build:preview', gulp.series(gulp.parallel('clean:tmp', 'clean:dist', 'copy:all', 'copy:libs'), 'scss', 'html:preview'));
gulp.task('default', gulp.series(gulp.parallel('fileinclude', 'scss', 'copy-locales'), gulp.parallel('browsersync', 'watch')));

