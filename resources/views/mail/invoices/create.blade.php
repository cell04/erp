@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->created_at)) }}
# Due Date : {{ date("jS F, Y", strtotime($content->due_date)) }}
Created By : {{ $content->user->name }}<br>
Reference Number : {{ $content->reference_number }}

@component('mail::table')
|       Item Name                                                                           |              Unit                                     |                   Quantity                        |                Price                                      |
|       :------------                                                                       |              :-------------                           |                   --------:                       |               --------:                                   |
@foreach ($content->billItems as $billItem)
| {{ $billItem->item->name }}                                                               |    {{ $billItem->unitOfMeasurement->name }}           |           {{ $billItem->quantity }}               |             {{ number_format($billItem->price, 2) }}      |
@endforeach
|                                                                                           |                                                       |              Total Amount                         |             {{ number_format($content->amount, 2) }}      |
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
