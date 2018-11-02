@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->created_at)) }}
Created By : {{ $content->user->name }}<br>
Approved By : {{ $content->approvedBy->name }}

@component('mail::table')
|       Item Name                                                                           |              Unit                                             |                   Quantity                        |                       Price                                   |
|       :------------                                                                       |              :-------------                                   |                   :--------                       |                       :--------                               |
@foreach ($content->quotationItems as $quotationItem)
| {{ $quotationItem->item->name }}                                                          |    {{ $quotationItem->unitOfMeasurement->name }}              |           {{ $quotationItem->quantity }}          |             {{ number_format($quotationItem->price, 2) }}     |
@endforeach
|                                                                                           |                                                               |              Total Amount                         |             {{ number_format($content->amount, 2) }}          |
@endcomponent
@component('mail::button', ['url' => $url . '/2', 'color' => 'success']) 
    Approved 
@endcomponent    
@component('mail::button', ['url' => $url . '/3', 'color' => 'error']) 
    Cancelled 
@endcomponent                             
Thanks,<br>
{{ config('app.name') }}
@endcomponent
