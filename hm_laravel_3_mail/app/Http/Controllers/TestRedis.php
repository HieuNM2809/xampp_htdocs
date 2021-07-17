<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;

class TestRedis extends Controller
{
    //
    public function show()
    {
       //Cache::store('file')->put('name','minh hieu',600);
       if (!Cache::has('key')) {
         return  Cache::get('name');
       }

    }
    public function clear(){
        Artisan::call('cache:clear');
    }
}
