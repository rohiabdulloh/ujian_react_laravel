<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
        	'name' => "Admin",
        	'email' => "admin@gmail.com",
        	'password' =>Hash::make("admin"),
            'level' => 1,
            'picture' => 'user.gif'
        ]);
    }
}