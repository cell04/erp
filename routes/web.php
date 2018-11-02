<?php

//Auth::routes();

Route::get('/accounting-test', function () {
    $http = new \GuzzleHttp\Client(['verify' => false ]);
    $url  = env('ACC_URL') . '/api/journals';
    $auth = session('accounting.auth');
    $corporationId = request()->headers->get('CORPORATION-ID');
    
    if (auth('api')->check()) {
        $userId = auth('api')->user()->id;
    } else {
        $userId = auth()->user()->id;
    }

    try {
        $response = $http->get($url, [
            'headers' => [
                'Authorization' => $auth['token_type'] . ' ' . $auth['access_token'],
                'CORPORATION-ID' => $corporationId,
                'USER-ID' => $userId
            ]
        ]);

        return json_decode((string) $response->getBody(), true);
    } catch (Exception $exception) {
        if ($exception->getCode() == 400) {
            return response()->json(
                'Invalid Request. Please enter a username or a password.',
                $exception->getCode()
            );
        } elseif ($exception->getCode() == 401) {
            return response()->json(
                'Your credentials are incorrect Please try again.',
                $exception->getCode()
            );
        }

        return response()->json(
            'Something went wrong on the server.',
            $exception->getCode()
        );
    }
});

// Login
Route::get('/login', 'AuthController@showLoginForm');
Route::post('/login', 'AuthController@login')->name('login');
Route::post('/logout', 'AuthController@logout');

// Forget Password
Route::get('password/reset/', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email/', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');

// Reset Password
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('show-password-reset-form');
Route::post('password/reset/', 'Auth\ResetPasswordController@reset')->name('password.reset');

// Register
Route::get('register/', 'Auth\RegisterController@showRegistrationForm')->name('show-registration-form');
Route::post('register/', 'Auth\RegisterController@register')->name('register');

Route::get('/{any}', 'SpaController@index')->where('any', '.*')->name('index');
