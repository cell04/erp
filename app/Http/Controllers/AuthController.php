<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Register new user.
     *
     * @param Request $request Request class
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name'  => 'required|string|max:50',
            'email'      => 'required|string|email|max:255|unique:users',
            'password'   => 'required|string|min:6|confirmed'
        ]);

        return User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'      => $request->email,
            'password'   => bcrypt($request->password)
        ]);
    }

    /**
     * Login user.
     *
     * @param Request $request Request class
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $http = new \GuzzleHttp\Client(['verify' => false ]);
        $url  = env('APP_URL') . '/oauth/token';

        $clientSecret = DB::table('oauth_clients')->where('name', 'Inventory Password Grant Client')->first()->secret;

        try {
            $response = $http->post($url, [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => '2',
                    'client_secret' => $clientSecret,
                    'username'      => $request->email,
                    'password'      => $request->password,
                    'scope'         => '*',
                ],
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
    }

    /**
     * Logout user and delete token.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        auth()->user()->tokens->each(
            function ($token, $key) {
                $token->delete();
            }
        );

        return response()->json('Logged out successfully', 200);
    }

    /**
     * Get authenticated user.
     *
     * @return \Illuminate\Http\Response
     */
    public function user()
    {
        return response()->json([
            'message' => 'Successfully retrieve user',
            'user' => auth('api')->user()
        ], 200);
    }
}
