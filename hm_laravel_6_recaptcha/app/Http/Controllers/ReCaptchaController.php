<?php

namespace App\Http\Controllers;

use App\Rules\Captcha;
use Illuminate\Http\Request;
class ReCaptchaController extends Controller
{
    //
    public function captcha(Request $req){
        $this->validate($req,[
            'g-recaptcha-response' =>new Captcha()
        ]);
        echo 'da zo';
    }
}
