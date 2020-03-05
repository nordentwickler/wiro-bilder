let mix = require('laravel-mix');
const tailwindCss = require('tailwindcss');
let atImport = require('postcss-import');
const glob = require('glob-all');
const path = require('path');
require('laravel-mix-purgecss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

const BROWSER_SYNC_PROXY = 'ihk.hub';
const EXTRACT_VENDORS = ['vue'];

mix.setPublicPath('public/');

/*
|--------------------------------------------------------------------------
| JavaScript
|--------------------------------------------------------------------------
|
| There is a lot going on here: ES2017+ modules compilation, build and
| compile .vue components, hot module replacement and tree-shaking.
| You can even bundle multiple files into one or have multiple
| entry/output points.
|
| Mix Docs: https://laravel-mix.com/docs/2.1/mixjs
|
*/

mix.js('src/scripts/app.js', 'assets/js/');

/*
|--------------------------------------------------------------------------
| Library Code Splitting
|--------------------------------------------------------------------------
|
| Extract vendor libraries into their own file.
|	- Application code:				app.js
|	- Vendor Libraries:				vendor.js
|	- Manifest (webpack Runtime):	manifest.js
|
| Do not forget to embed all files in your template.
|
| Mix Docs: https://laravel-mix.com/docs/2.1/extract
|
*/

mix.extract(EXTRACT_VENDORS);

/*
|--------------------------------------------------------------------------
| SCSS + TailwindCSS + Purgecss
|--------------------------------------------------------------------------
|
| Mix Docs: https://laravel-mix.com/docs/2.1/css-preprocessors
| Tailwind: https://tailwindcss.com/docs/installation#laravel-mix
| Purgecss: https://www.purgecss.com/with-webpack#options
| Purgecss Mix Extension: https://github.com/spatie/laravel-mix-purgecss
|
*/

mix.sass('src/styles/app.scss', 'assets/css/')
    .options({
        processCssUrls: false,
        postCss: [atImport(),tailwindCss('tailwind.config.js')],
    })
    .purgeCss({
        paths: () => glob.sync([
            path.join(__dirname, 'templates/**/*.twig'),
            path.join(__dirname, 'src/scripts/**/*.vue'),
        ]),
        extensions: ['twig', 'css', 'scss', 'js', 'vue'],
        folders: ['src/', 'templates/']
    });

/*
|--------------------------------------------------------------------------
| Browser Sync
|--------------------------------------------------------------------------
|
| Heads up: All files in templates/_layouts are not watched because they
| are changed each time an asset versioning happens. If they would be
| watched browser sync would fire multiple times. That's not cool.
|
| Mix Docs: https://laravel-mix.com/docs/2.1/browsersync
| Settings: https://browsersync.io/docs/options/
|
*/

mix.browserSync({
    proxy: BROWSER_SYNC_PROXY,
    host: BROWSER_SYNC_PROXY,
    open: 'external',
    files: glob.sync([
        'templates/**/*.twig',
        'src/scripts/**/*.{js,vue}',
        'src/styles/**/*.scss',
        'tailwind.config.js'
    ]),
});

/*
|--------------------------------------------------------------------------
| Versioning
|--------------------------------------------------------------------------
|
| Only applied in production mode. The mode is being set directly in
| the npm script via the NODE_ENV constant.
|
| Mix Docs: https://laravel-mix.com/docs/2.1/versioning
|
*/

if (mix.inProduction()) {
    mix.version();
}
