<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::table('purchase')->insert([
            ['name' => 'Nguyễn Văn A', 'email' => 'nguyenvana@gmail.com',   'address' => '123, Nguyễn Phuc Chu, Hà Nội',
              'phone' => '1234567890', 'product' => 'laptop', 'amount' => '3', 'created_at' => date("Y-m-d H:i:s") ],
            ['name' => 'Nguyễn Văn B', 'email' => 'nguyenvanb@gmail.com',   'address' => '123, Nguyễn Phuc Chu, Hà Nội',
              'phone' => '1234567890', 'product' => 'phone', 'amount' => '3' ,'created_at' => date("Y-m-d H:i:s") ],
            ['name' => 'Nguyễn Văn C', 'email' => 'nguyenvanc@gmail.com',   'address' => '123, Nguyễn Phuc Chu, Hà Nội',
            'phone' => '1234567890', 'product' => 'PC', 'amount' => '3' ,'created_at' => date("Y-m-d H:i:s") ],
            ['name' => 'Nguyễn Văn D', 'email' => 'nguyenvand@gmail.com',   'address' => '123, Nguyễn Phuc Chu, Hà Nội',
            'phone' => '1234567890', 'product' => 'Ram', 'amount' => '3' ,'created_at' => date("Y-m-d H:i:s") ],
            ['name' => 'Nguyễn Văn E', 'email' => 'nguyenvane@gmail.com',   'address' => '123, Nguyễn Phuc Chu, Hà Nội',
              'phone' => '1234567890', 'product' => 'screen', 'amount' => '3' ,'created_at' => date("Y-m-d H:i:s") ],
            ['name' => 'Nguyễn Văn F', 'email' => 'nguyenvanf@gmail.com',   'address' => '123, Nguyễn Phuc Chu, Hà Nội',
              'phone' => '1234567890', 'product' => 'mouse', 'amount' => '3' ,'created_at' => date("Y-m-d H:i:s") ],
        ]);
    }
}
