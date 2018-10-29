<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class QuotationApproval extends Notification
{
    private $quotation;

    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($quotation)
    {
        //
        $this->quotation = $quotation;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = url('/api/quotations/' . $this->quotation->id . '/contact-approvals');

        return (new MailMessage)->subject('Quotation Approval')
        ->markdown('mail.quotation.approval', array('content' => $this->quotation, 'url' => $url));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
