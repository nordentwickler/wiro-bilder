<?php
/**
 * laravel-mix module for Craft CMS 3.x
 *
 * Provides a mix() Twig filter to use in templates for getting versioned asset files from the mix-manifest.json.
 *
 * @link      https://rostock-ahoi.de
 * @copyright Copyright (c) 2018 Johannes Ahrndt
 */

namespace laravelmixmodule\services;

use Craft;
use craft\base\Component;

/**
 * LaravelmixModuleService Service
 *
 * All of your module’s business logic should go in services, including saving data,
 * retrieving data, etc. They provide APIs that your controllers, template variables,
 * and other modules can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 *
 * @author    Johannes Ahrndt
 * @package   LaravelmixModule
 * @since     0.0.1
 */
class LaravelmixModuleService extends Component
{
    /**
     * Absolute path to the root directory.
     *
     * @var string
     */
    protected $rootPath;

    /**
     * Relative path to the public directory.
     *
     * @var string
     */
    protected $publicPath;

    /**
     * Relative path to the asset directory.
     *
     * @var string
     */
    protected $assetPath;

    /**
     * Absolute path to the asset directory.
     *
     * @var string
     */
    protected $assetFullPath;

    /**
     * Name of the manifest file.
     *
     * @var string
     */
    protected $manifestName = 'mix-manifest.json';

    /**
     * Absolute path of the manifest file.
     *
     * @var string
     */
    protected $manifestPath;

    /**
     * @inheritdoc
     */
    public function init(): void
    {
        $this->rootPath = rtrim(CRAFT_BASE_PATH, '/');
        $this->publicPath = trim('public', '/');
        $this->assetPath = trim('', '/');
        $this->assetFullPath = implode('/', array_filter([
            $this->rootPath,
            $this->publicPath,
            $this->assetPath,
        ]));
        $this->manifestPath = implode('/', [
            $this->rootPath,
            $this->publicPath,
            $this->manifestName
        ]);
    }
    /**
     * Find the files version.
     *
     * @param  string  $file
     * @return string
     */
    public function version($file): string
    {
        if (file_exists($this->assetFullPath . '/hot')) {
            return '//localhost:8080/' . $file;
        }
        try {
            $manifest = $this->readManifestFile();
        } catch (Exception $e) {
            Craft::info('Laravel Mix: ' . printf($e->getMessage()), __METHOD__);
        }
        $fileKey = '/' . ltrim($file, '/');
        if (is_array($manifest) && isset($manifest[$fileKey])) {
            $file = $manifest[$fileKey];
        }
        return '/' . implode('/', array_filter([
                $this->assetPath,
                ltrim($file, '/')
            ]));
    }

    /**
     * Locate manifest and convert to an array.
     *
     * @return array|bool
     */
    protected function readManifestFile(): bool|array
    {
        if (file_exists($this->manifestPath)) {
            return json_decode(
                file_get_contents($this->manifestPath),
                true
            );
        }
        return false;
    }
}
