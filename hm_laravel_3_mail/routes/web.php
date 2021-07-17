<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
//controller
use App\Http\Controllers\TestRedis;
use  App\Http\Controllers\Sendmail;
use App\Mail\OrderShipped;

// send mail
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


//=================== Redis
Route::get('tetsredis', [TestRedis::class ,'show']);
Route::get('test', function () {
    echo "hieu";
});

//========================= Cache
Route::get('testcache', [TestRedis::class ,'show']);
Route::get('clearcache', [TestRedis::class ,'clear']);


//========================  Collection
Route::get('testCollection', function () {
    //  ===========trả về biến in và xóa biến null
    // echo $collection = collect(['taylor', 'abigail', null])->map(function ($name) {
    //     return strtoupper($name);
    // })->reject(function ($name) {
    //     return empty($name);
    // });

    $collection = collect([1, 2, 3])->sortDesc();
    //$collection = [1, 2, 3];

   // $collection->all();
});

Route::get('testCollectData', function () {
  $arr = DB::table('nhanvien')->get();
  echo collect($arr)->sortDesc();

});
Route::get('testCollect2', function () {
    $collection = collect([1, 2, 3, 4, 5]);
    echo $collection->contains(function ($value, $key) {
        return $value > 5;
    });
});



//===================== send mail

Route::get('sendmail', [Sendmail::class , 'index']);

//== mail
// lay view để ng dùng nhập thông tin
Route::get('getview', [OrderShipped::class , 'getView']);
// xử lí tên và ảnh
Route::post('testmail', [OrderShipped::class , 'build']);




