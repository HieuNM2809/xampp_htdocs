<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\dangnhap;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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


// ======================== Pagination

Route::get('testpagination', function () {
    $lstNhanVien =  DB::table('nhanvien')->orderBy('id')->paginate(10);
    $lstNhanVien->appends(['sort' => 'votes']);
   return view('pages.lstNhanVien', ['lstNhanVien'=>$lstNhanVien]);
});


// ========================= Authentication
Route::get('dangnhap', [dangnhap::class, 'dangnhap']);
Route::POST('xuly', [dangnhap::class, 'xuly']);

// test session
Route::get('echoSession', function (Request $request) {
  echo $request->session()->get('user');
});

Route::get('logout', function () {
      Auth::logout();
});


Route::get('test', function () {
    return view('pages.home');
});
