@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->created_at)) }}
Created By : {{ $content->user->name }}<br>
Approved By : {{ $content->approvedBy->name }}

@component('mail::table')
| Item Name    | Quantity      | Price     | Unit     |
|:------------ |:------------- |:--------  |:-------- |
@foreach ($content->quotationItems as $quotationItem)
| {{ $quotationItem->item->name }}      |    {{ $quotationItem->quantity }}   | {{ $quotationItem->itemPricelist->price }}     | {{ $quotationItem->unitOfMeasurement->name }} |
@endforeach
@endcomponent
# Total Amount = {{ $content->amount }}
@component('mail::button', ['url' => '', 'color' => 'success'])
Approved
@endcomponent
@component('mail::button', ['url' => '', 'color' => 'error'])
Cancelled
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
