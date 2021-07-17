<?php

use Illuminate\Support\Facades\Route;
use App\Rules\Captcha;
use Illuminate\Auth\Events\Validated;
use App\Http\Controllers\ReCaptchaController;

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

Route::get('recaptcha', function () {
    return view('recaptcha');
});
Route::post('recaptcha', [ReCaptchaController::class, 'captcha']);