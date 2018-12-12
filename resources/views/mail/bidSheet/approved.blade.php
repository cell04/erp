@component('mail::message')
# Created Date : {{ date("jS F, Y", strtotime($content->bid_sheet_date)) }}
Created By : {{ $content->user->name }}<br>
Approved By : {{ $content->approvedBy->name }}
# Customer Details: 
Company: {{ $content->contact->company }}<br>
Email: {{ $content->contact->email }}<br>
Contact: {{ $content->contact->person }}<br>
Terms Of Payment : {{ $content->contact->payment_term }}<br>
# Total: {{ number_format($content->amount, 2) }}
@component('mail::button', ['url' => $url . '/2', 'color' => 'success']) 
    Approved 
@endcomponent    
@component('mail::button', ['url' => $url . '/3', 'color' => 'error']) 
    Cancelled 
@endcomponent  

Thanks,<br>
{{ config('app.name') }}
@endcomponent
