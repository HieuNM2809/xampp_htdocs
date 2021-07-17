<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class dangnhap extends Controller
{
    //
    public function dangnhap(){
        return view('pages.dangnhap');
    }
    public function xuly(Request $request){
        $credentials = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            echo " dang nhap thanh cong";
            $request->session()->put('user','hieu');

            echo view('pages.home',['user'=>Auth::user()]);

            // truyền biến user vào view  ( lấy thì user->gamil)
           // echo view('pages.dangnhap',['user'=>Auth::user()]);
            // return redirect()->intended('dashboard');
        }else{
            echo "dang nhap that bai";
        }

    }
}
