<?php
/**
 * laravel-mix module for Craft CMS 3.x
 *
 * Provides a mix() Twig filter to use in templates for getting versioned asset files from the mix-manifest.json.
 *
 * @link      https://rostock-ahoi.de
 * @copyright Copyright (c) 2018 Johannes Ahrndt
 */

namespace laravelmixmodule\twigextensions;

use laravelmixmodule\LaravelmixModule;

use Craft;

/**
 * Twig can be extended in many ways; you can add extra tags, filters, tests, operators,
 * global variables, and functions. You can even extend the parser itself with
 * node visitors.
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 *
 * @author    Johannes Ahrndt
 * @package   LaravelmixModule
 * @since     0.0.1
 */
class LaravelmixModuleTwigExtension extends \Twig\Extension\AbstractExtension
{
    // Public Methods
    // =========================================================================

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName()
    {
        return 'LaravelmixModule';
    }

    /**
     * Returns an array of Twig filters, used in Twig templates via:
     *
     *      {{ 'something' | someFilter }}
     *
     * @return array
     */
    public function getFilters()
    {
        return [
            new \Twig\TwigFilter('mix', [$this, 'mix']),
        ];
    }

    /**
     * Returns an array of Twig functions, used in Twig templates via:
     *
     *      {% set this = someFunction('something') %}
     *
     * @return array
     */
    public function getFunctions()
    {
        return [
            new \Twig\TwigFunction('mix', [$this, 'mix']),
        ];
    }

    /**
     * Our function called via Twig; it can do anything you want
     *
     * @param null $text
     *
     * @return string
     */
    public function someInternalFunction($text = null)
    {
        $result = $text . " in the way";

        return $result;
    }

    /**
     * Returns versioned file or the entire tag.
     *
     * @param  string $file
     * @return string
     */
    public function mix($file)
    {
        return LaravelmixModule::$instance->laravelmixModuleService->version($file);

    }
}
