import gSvgSprite from "gulp-svg-sprite";

export const svgSprite = () => {
  return app.gulp
    .src(app.path.src.svgIcons, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      gSvgSprite({
        mode: {
          stack: {
            sprite: `../icons/icons.svg`,
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.images));
};
