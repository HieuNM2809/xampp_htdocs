<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class Sendmail extends Controller
{
    //
    public function index(){
        $data= [
            'name' =>'HM',
            'name2' =>'Nguyễn Minh Hiếu',
            'NoiDung' =>'làm quen'
        ];


        Mail::send('sendmail', $data, function ($message) {
            $message->from('nguyenminhhieu28092001k3@gmail.com', 'Hiếu');
            $message->to('nguyenminhhieuk3@gmail.com', 'HM');
            $message->subject('Thư gửi HM');
        });

    }
}
