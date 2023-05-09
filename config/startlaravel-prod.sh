#!/bin/sh

composer update
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan optimize
php artisan migrate --seed --force
php artisan serve --host=0.0.0.0 --port=8000
