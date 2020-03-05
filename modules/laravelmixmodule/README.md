# laravel-mix module for Craft CMS 3.x

Provides a mix() Twig filter to use in templates for getting versioned asset files from the mix-manifest.json.

## Requirements

This module requires Craft CMS 3.0.0-RC1 or later.

## Installation

To install the module, follow these instructions.

First, you'll need to add the contents of the `app.php` file to your `config/app.php` (or just copy it there if it does not exist). This ensures that your module will get loaded for each request. The file might look something like this:
```
return [
    'modules' => [
        'laravel-mix-module' => [
            'class' => \modules\laravelmixmodule\LaravelmixModule::class,
            'components' => [
                'laravelmixModuleService' => [
                    'class' => 'modules\laravelmixmodule\services\LaravelmixModuleService',
                ],
            ],
        ],
    ],
    'bootstrap' => ['laravel-mix-module'],
];
```
You'll also need to make sure that you add the following to your project's `composer.json` file so that Composer can find your module:

    "autoload": {
        "psr-4": {
          "modules\\laravelmixmodule\\": "modules/laravelmixmodule/src/"
        }
    },

After you have added this, you will need to do:

    composer dump-autoload
 
 …from the project’s root directory, to rebuild the Composer autoload map. This will happen automatically any time you do a `composer install` or `composer update` as well.

## laravel-mix Overview

-Insert text here-

## Using laravel-mix

-Insert text here-

## laravel-mix Roadmap

Some things to do, and ideas for potential features:

* Release it

Brought to you by [Johannes Ahrndt](https://rostock-ahoi.de)
