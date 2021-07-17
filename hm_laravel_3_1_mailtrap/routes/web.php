<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
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
Route::get('sendMail', function () {
   
    $details = [
        'title' => 'hello minh hieu',
        'body' => 'test mailtrap.io'
    ];
   
    Mail::to('nguyenminhhieu28092001k3@gmail.com')->send(new \App\Mail\sendMail($details));
   
    dd("Email is Sent.");
});