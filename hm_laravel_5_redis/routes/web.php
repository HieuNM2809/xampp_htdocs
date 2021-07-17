<?php

use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
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

Route::get('/setcache', function () {
//     $tintuc = [];
//     for ($i=0; $i < 1000; $i++) { 
//         $tintuc[] = $i;
//     }

//    Redis::set('testFromRedisSet', 'RedisSet');
//    if(Cache::store('redis')->put('tintuc', $tintuc, 10)){
//        echo 'dazo';
//    }
   $hieu = Cache::remember('testFromCacheRemember', 60, function() {
       echo 'dazo';
      return "CacheRemember";
   });
   echo $hieu;

});
Route::get('/getcache', function () {
    var_dump(Cache::store('redis')->get('tintuc'));
});

// set redis
Route::get('testredis', function () {
    return Redis::set('txtPass', '123456');
});
//get redis
Route::get('getredis', function () {
    return Redis::get('txtPass');
});
