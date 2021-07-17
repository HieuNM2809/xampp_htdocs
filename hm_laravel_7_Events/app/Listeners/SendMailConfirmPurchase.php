<?php

namespace App\Listeners;

use App\Events\Purchase;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendMailConfirmPurchase
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Purchase  $event
     * @return void
     */
    public function handle(Purchase $event)
    {
        $data = [
            'product' => $event->purChase->product,
            'amount' => $event->purChase->amount
        ];
        $email = $event->purChase->email;
        Mail::send('SendMailConfirmPurchase', $data, function ($message) use ($email ) {
            $message->from('nguyenminhhieu28092001k3@gmail.com', 'HM');
            $message->to($email , 'Bạn');
            $message->subject('Hm thống báo mua hàng thành công');
        });
    }
}
