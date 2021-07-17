<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\VarDumper\Cloner\Data;

class testFileStorage extends Controller
{
    //
    public function getview(){
        return view('fileStorage.getview');
    }
    public function index(Request $request){

        if ($request->hasFile('fname')) {

            $file = $request->file('fname');
            if ($file->isValid()) {


                $newFilename = 'hieu'.$file->getClientOriginalName();
                $file->originalName = $newFilename;
                Storage::disk('local')->put( 'images/'.$file->originalName,  $file);
                echo "ok";
            }
        }

    }
}
