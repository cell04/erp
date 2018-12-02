@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->created_at)) }}
# Due Date : {{ date("jS F, Y", strtotime($content->due_date)) }}
Created By : {{ $content->user->name }}<br>
Reference Number : {{ $content->reference_number }}

@component('mail::table')
|       Item Name                                                                           |              Quantity                 |                   Price                       |                                               Unit                                    |
|       :------------                                                                       |              :-------------           |                   :--------                   |                                               :--------                               |
@foreach ($content->billItems as $billItem)
| {{ $billItem->item->name }}                                                               |    {{ $billItem->quantity }}          |           {{ $billItem->price }}              |                      {{ $billItem->unitOfMeasurement->name }}                         |
@endforeach
|                                                                                           |              Total Amount             |             {{ $content->amount }}            |                                                                                       |
@endcomponent
                             
Thanks,<br>
{{ config('app.name') }}
@endcomponent
