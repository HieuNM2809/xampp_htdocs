<?php

use Illuminate\Support\Facades\Route;
use App\Events\CustomerOrder;
use App\Http\Controllers\PurchaseController;
use App\Listeners\SendMailConfirmOrder;
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

// Route::get('event', function () {
//     event(new CustomerOrder('hello everyone'));
// });


//=======================================================================================
//=========== Tạo even khi người dùng mua hàng thì gửi tin nhắn thông báo (xác nhận) ====
//=======================================================================================

Route::get('purchase',[PurchaseController::class, 'getPurChase'] );
Route::post('purchase', [PurchaseController::class , 'postPurChase'] );
