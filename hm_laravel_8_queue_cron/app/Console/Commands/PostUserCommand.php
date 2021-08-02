<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\giamdocModel;

class PostUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:PostUserCommand';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
       $giamdoc = new giamdocModel();
       $giamdoc->name ='teo';
       $giamdoc->save();
    }
}
