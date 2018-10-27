<?php

use Illuminate\Support\Facades\Mail;

Auth::routes();

//Route::get('/{any}', 'SpaController@index')->where('any', '.*')->name('index');

Route::get('/', function () {
    Mail::raw('Sending emails with Mailgun and Laravel is easy!', function ($message) {
        $message->subject('Mailgun and Laravel are awesome!');
        $message->to('johndoe@gmail.com');
    });
});
