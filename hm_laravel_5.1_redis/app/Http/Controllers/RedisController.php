<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Redis;
use Illuminate\Http\Request;

class RedisController extends Controller
{
    //
    public function setRedis(){
        echo Redis::set('txtName','Hieu');
    }
    public function getRedis(){

        if(Redis::exists('txtName')){
            echo Redis::get('txtName');
        }
        else{
            echo 'khong ton tai';
        }
    }
}
