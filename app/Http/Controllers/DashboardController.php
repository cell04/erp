<?php

namespace App\Http\Controllers;

use App\Repositories\DashboardRepository;

class DashboardController extends Controller
{
    /**
     * Dashboard repository.
     *
     * @var App\Repositories\DashboardRepository
     */
    protected $dashboard;

    /**
     * Create new instance of dashboard controller.
     *
     * @param DashboardRepository $dashboard Dashboard Repository
     */
    public function __construct(DashboardRepository $dashboard)
    {
        $this->dashboard = $dashboard;
    }

    public function test()
    {
        return response()->json([
            'message' => 'test'
        ], 200);
    }
}
