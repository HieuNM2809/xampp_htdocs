<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class testdata extends Controller
{
    //
    public function index(){
        //======================= SU DUNG SQL
            // DB::unprepared('create table nhanvien (
            //     id int not null primary key,
            //     name varchar(30)
            // )');

            //  $arr = DB::select('select * from a ');
        //========================= LARAVEL

          //$lstNV =  DB::select('select * from nhanvien');
          //   $lstnv = DB::table('nhanvien')->where('name','hieu')->get();
          //   echo $lstnv[0]->name;

         // $lstnv = DB::table('nhanvien')->select('name')->where('name','<>','hieu')->get();
         // echo  $lstnv;

        //    $lstnv = DB::table('nhanvien')->value('name');
        //   echo  $lstnv;

        // $lst = DB::table('nhanvien')
        //     ->join('congviec', 'nhanvien.id', '=', 'congviec.id_nv')
        //     ->get();

        // echo '<pre>';
        // echo print_r($lst);
        // echo '</pre>';
        // echo $lst[0]->name;


        DB::table('nhanvien')->insert(['id'=>'3','name'=>'hoang']);
    }
}
