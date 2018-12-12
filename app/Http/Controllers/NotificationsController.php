<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\NotificationRepository;

class NotificationsController extends Controller
{
	protected $notification;

	public function __construct(NotificationRepository $notification)
	{
		$this->notification = $notification;
	}
    
}
