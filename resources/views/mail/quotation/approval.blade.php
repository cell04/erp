@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->created_at)) }}
Created By : {{ $content->user->name }}<br>
Approved By : {{ $content->approvedBy->name }}

@component('mail::table')
|       Item Name                                                                           |              Unit                                             |                   Quantity                        |                       Price                                   |                       Subtotal                                                        |
|       :------------                                                                       |              :-------------                                   |                   :--------                       |                       :--------                               |                       :--------                                                       |
@foreach ($content->quotationItems as $quotationItem)
| {{ $quotationItem->item->name }}                                                          |    {{ $quotationItem->unitOfMeasurement->name }}              |           {{ $quotationItem->quantity }}          |             {{ number_format($quotationItem->price, 2) }}     |             {{ number_format($quotationItem->quantity * $quotationItem->price, 2) }}  |
@endforeach             
@endcomponent
# Subtotal: {{ number_format($content->amount, 2) }}
# Tax: {{ number_format($$content->tax, 2) }}
# Total: {{ number_format($content->amount - $content->tax, 2) }}
@component('mail::button', ['url' => $url . '/2', 'color' => 'success']) 
    Approved 
@endcomponent    
@component('mail::button', ['url' => $url . '/3', 'color' => 'error']) 
    Cancelled 
@endcomponent                             
Thanks,<br>
{{ config('app.name') }}
@endcomponent
