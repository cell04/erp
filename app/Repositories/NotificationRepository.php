<?php 

namespace App\Repositories;

use App\Notification;

class NotificationRepository
{
    public function notification()
    {
        return auth()->user()->unreadNotifications;
    }
}