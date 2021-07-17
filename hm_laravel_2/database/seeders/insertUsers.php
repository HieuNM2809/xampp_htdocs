<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class insertUsers extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for ($i=8 ; $i <40; $i++) {
            DB::table('users')->insert([
                'id' => $i,
                'name' => Str::random(12).'hieu',
                'email' => Str::random(4).'@gmail.com',
                'password' => Hash::make('123'),
            ]);
        }
    }
}
