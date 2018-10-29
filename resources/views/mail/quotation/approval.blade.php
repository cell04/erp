@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->created_at)) }}
Created By : {{ $content->user->name }}<br>
Approved By : {{ $content->approvedBy->name }}

@component('mail::table')
|       Item Name                                                                           |              Quantity                 |                   Price                       |                                               Unit                                    |
|       :------------                                                                       |              :-------------           |                   :--------                   |                                               :--------                               |
@foreach ($content->quotationItems as $quotationItem)
| {{ $quotationItem->item->name }}                                                          |    {{ $quotationItem->quantity }}     |           {{ $quotationItem->price }}         |                      {{ $quotationItem->unitOfMeasurement->name }}                    |
@endforeach
|                                                                                           |              Total Amount             |             {{ $content->amount }}            |                                                                                       |
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
