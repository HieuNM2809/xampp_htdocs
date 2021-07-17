<?php

namespace App\Mail;

use Facade\FlareClient\View;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class OrderShipped extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function getView(){
        return view('viewMail');
    }
    public function build(Request $req)
    {
        //lay ten người
        $data = array (
            'name' => $req->txtName
        );


        Mail::send('contentMail', $data, function ($message) use ( $req) {
            $message->from('nguyenminhhieu28092001k3@gmail.com', 'Hieu Minh');
            $message->to('nguyenminh@gmail.com', 'HM');
            $message->subject('Test HM');

            $message->attach( $req->file('txtFile')->getRealPath(), [
                'as' => $req->file('txtFile')->getClientOriginalName(),
                'mime' =>  $req->file('txtFile')->getMimeType()
             ]);
        });



    }
}
