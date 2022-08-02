<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// ======================  RATE_LIMITING =======================================

// Một phút cho call tối đa 5 lần
Route::get('/attempt', function () {
    $executed = RateLimiter::attempt(
        'send-message:123',
        $perMinute = 5,
        function() {
            echo '1-';
        }
    );
    if (! $executed) {
      return 'Too many messages sent!';
    }
});

// xoá giới hạn call
Route::get('/clearRatelimiting', function () {
   dd(RateLimiter::clear('send-message:123'));
});


// Một phút cho call tối đa 5 lần (cách 2)
Route::get('/tooManyAttempts', function () {
    if (RateLimiter::tooManyAttempts('send-message:', $perMinute = 5)) {
        $seconds = RateLimiter::availableIn('send-message:');

        return 'You may try again in '.$seconds.' seconds.';
    }
});


// https://viblo.asia/p/to-da-su-dung-redis-trong-laravel-nhu-the-nao-4P856d89ZY3
// https://laravel.com/docs/9.x/rate-limiting#introduction


Route::get('/test', function () {
   return 1;
});
