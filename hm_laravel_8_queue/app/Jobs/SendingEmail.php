<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
class SendingEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {   
        $data = [];
        for ($i=0; $i <  20; $i++) { 
            Mail::send('sendMail', $data, function ($message) {
                $message->from('nguyenminhhieu28092001k3@gmail.com', 'John Doe');
                $message->to('nguyenminhhieuk3@gmail.com', 'John Doe');
                $message->subject('Subject');
            });
        }
    }
}
