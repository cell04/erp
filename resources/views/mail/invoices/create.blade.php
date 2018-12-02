@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->created_at)) }}
# Due Date : {{ date("jS F, Y", strtotime($content->due_date)) }}
Created By : {{ $content->user->name }}<br>
Reference Number : {{ $content->reference_number }}

@component('mail::table')
|       Item Name                                                                           |              Unit                                     |                   Quantity                        |                Price                                                      |               Amount                                                                          |
|       :------------                                                                       |              :-------------                           |                   --------:                       |               --------:                                                   |               --------:                                                                       |
@foreach ($content->billItems as $billItem)
| {{ $billItem->item->name }}                                                               |    {{ $billItem->unitOfMeasurement->name }}           |           {{ $billItem->quantity }}               |             {{ number_format($billItem->itemPricelist->price, 2) }}       |   {{ number_format($billItem->quantity * $billItem->itemPricelist->price, 2) }}               |    
@endforeach
|                                                                                           |                                                       |                                                   |                   SubTotal                                                |   {{ number_format($content->amount, 2) }}                                                    |
|                                                                                           |                                                       |                                                   |                   Tax                                                     |   {{ number_format($content->tax, 2) }}                                                       |
|                                                                                           |                                                       |                                                   |                   Total Amount                                            |   {{ number_format($content->amount - $content->tax, 2) }}                                    |
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
