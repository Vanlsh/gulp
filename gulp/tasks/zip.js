import { deleteAsync, deleteSync } from "del";
import zipPlugin from "gulp-zip";

export const zip = async () => {
  await deleteAsync(`./${app.path.buildFolder}.zip`);
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "ZIP",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(zipPlugin(`${app.path.buildFolder}.zip`))
    .pipe(app.gulp.dest("./"));
};
