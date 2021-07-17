<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
       for ($i=0; $i <40; $i++) {
           DB::table('nhanvien')->insert([
               'id' => random_int(1,4),
               'name' => Str::random(10).' hieu',
              // 'password' => Hash::make('password'),
           ]);
       }
    }
}
