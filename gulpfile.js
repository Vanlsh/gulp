import gulp from "gulp";
import { path, plugins } from "./gulp/config/index.js";
import {
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
} from "./gulp/tasks/index.js";

global.app = {
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

gulp.task("default", dev);
