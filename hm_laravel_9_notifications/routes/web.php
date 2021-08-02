<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Notifications\InvoicePaid;
use App\Http\Controllers\NexmoSMSController;
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

// send Mail
Route::get('Noti', function () {
    $invoice = 'hello';
    $user = User::find(1);
    $user->notify(new InvoicePaid($invoice));


    echo  'thanh cong ';
});


// send SMS 
Route::get('sms', [NexmoSMSController::class, 'index']);
