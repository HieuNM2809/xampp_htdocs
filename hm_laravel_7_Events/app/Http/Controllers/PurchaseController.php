<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseModel;
use App\Events\Purchase;
class PurchaseController extends Controller
{
    //  
    public function getPurChase(){
        return view('purchase');
    }
    public function postPurChase(Request $req){
        // validate

        // insert
        $purChase = new PurchaseModel();
        $purChase->name = $req->name;
        $purChase->email = $req->email;
        $purChase->phone = $req->phone;
        $purChase->address = $req->address;
        $purChase->product = $req->product;
        $purChase->amount = $req->amount;
        $purChase->save();

        //event : send mail confirm
        event(new Purchase($purChase));
        
        //message
         return redirect('purchase');
    }
}
