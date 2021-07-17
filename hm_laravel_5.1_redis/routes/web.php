<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RedisController;
use Illuminate\Support\Facades\Cache;

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

Route::get('/', function () {
    return view('welcome');
});

// redis  - get set , check exists
Route::get('getRedis', [RedisController::class , 'getRedis']);
Route::get('setRedis', [RedisController::class , 'setRedis']);

//redis cache
Route::get('cacheRedis', function () {
    $tintuc = Cache::store('redis')->remember('tintuc', 60, function () {
        echo 'da zo';
        return 'cuoc song covid';
    });
    echo $tintuc;
});
