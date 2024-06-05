let mix = require('laravel-mix');
const glob = require('glob-all');
const tailwindcss = require("tailwindcss");

const BROWSER_SYNC_PROXY = 'wiro-bilder.ddev.site/';

const EXTRACT_VENDORS = [];

mix.setPublicPath('public/');
mix.js('src/scripts/app.js', 'assets/js');
mix.extract(EXTRACT_VENDORS);

mix.sass("src/styles/app.scss", "assets/css/") // for sass
    .options({
        processCssUrls: false,
        postCss: [
            tailwindcss,
        ],
        autoprefixer: {
            options: {
                browsers: [
                    'last 4 versions',
                ]
            }
        }
    });

mix.browserSync({
    proxy: BROWSER_SYNC_PROXY,
    //host: BROWSER_SYNC_PROXY,
    //port: 3000,
    open: 'external',
    files: glob.sync([
        'templates/**/*.twig',
        'src/scripts/**/*.{js,vue}',
        'src/styles/**/*.{css,scss}',
        'tailwind.config.js'
    ]),
});

if (mix.inProduction()) {
    mix.version();
}
