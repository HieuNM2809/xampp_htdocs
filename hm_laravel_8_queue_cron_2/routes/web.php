<?php

use Illuminate\Support\Facades\Route;
use App\Jobs\sendMailJob;
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

//=============================queue crontab
//0: config
//1: tạo job sendMail 
//2: tạo queue
//3: tạo command sendMail
//4: đăng ký command
//5: chạy thử 

Route::get('/sendMail', function () {
    dispatch(new sendMailJob())->onQueue('sendMail');
    dispatch(new sendMailJob());
});

Route::get('/test', function () {
    return 'hieu';
});