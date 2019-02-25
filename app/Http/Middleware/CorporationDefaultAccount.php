<?php

namespace App\Http\Middleware;

use App\Corporation;
use Closure;

class CorporationDefaultAccount
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (request()->headers->get('user-id')) {
            if (empty(session('user-id'))) {
                session()->put('user-id', request()->headers->get('user-id'));
            }
        }

        if (request()->headers->get('CORPORATION-ID')) {
            $corporation = Corporation::findOrFail(request()->headers->get('CORPORATION-ID'));
            
            if (empty(session('irnb'))) {
                session()->put('irnb', $corporation->inventoryReceiveNotBilledAccount->account_id);
            }

            if (empty(session('irnc'))) {
                session()->put('irnc', $corporation->inventoryReturnNotCreditedAccount->account_id);
            }

            if (empty(session('account-payable'))) {
                session()->put('account-payable', $corporation->payableAccount->account_id);
            }

            if (empty(session('cash'))) {
                session()->put('cash', $corporation->cashAccount->account_id);
            }
        }
        return $next($request);
    }
}
