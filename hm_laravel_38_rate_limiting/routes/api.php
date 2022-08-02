<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Call api 5 lần trên phút
Route::middleware('throttle:5,1')->group(function () {
    Route::get('/foo', function () {
        return 'Bar';
    });
    Route::get('/bar', function () {
        return 'Baz';
    });
});
