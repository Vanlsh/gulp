import gulp from "gulp";
import { path, plugins } from "./gulp/config/index.js";
import {
  zip,
  copy,
  html,
  reset,
  server,
  scss,
  js,
  image,
  fontsStyle,
  otfToTtf,
  ttfToWoff,
  svgSprite,
  ftp,
} from "./gulp/tasks/index.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path,
  gulp,
  plugins,
};

function watcher() {
  gulp.watch(path.watch.img, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, image);
}
export { svgSprite };
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTask = gulp.parallel(fonts, copy, image, html, scss, js);

const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZIP = gulp.series(reset, mainTask, zip);
const deployFTP = gulp.series(reset, mainTask, ftp);

export { dev };
export { build };
export { deployZIP };
export { deployFTP };

gulp.task("default", dev);
