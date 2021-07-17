<?php

use App\Http\Controllers\testFileStorage;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Filesystem\Filesystem;
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

Route::get('getview', [testFileStorage::class, 'getview']);

Route::post('testFileStorage', [testFileStorage::class, 'index']);



// ================ test download
Route::get('insertfile', function () {
    return Storage::disk('local')->put('Note.txt','Hôn nay đi mua rau, mua cá nấu canh chua' );
});
Route::get('downloadfile', function () {
    return Storage::download('note.txt');
});
Route::get('deleteFile', function () {

    Storage::delete('images/Note.txt');
});
