<?php

Auth::routes();

Route::get('/{any}', 'SpaController@index')->where('any', '.*')->name('index');

/*Route::get('/', function () {
    if (Mail::raw('Sending emails with Mailgun and Laravel is easy!', function ($message) {
        $message->to('dus.medel22@gmail.com');
    })) {
        return 'sent';
    } else {
        return 'failed';
    }
});*/
