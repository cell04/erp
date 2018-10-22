<?php

namespace App\Http\Controllers;

use App\Repositories\StatisticRepository;

class StatisticController extends Controller
{
    /**
     * statistic repository.
     *
     * @var App\Repositories\StatisticRepository
     */
    protected $statistic;

    /**
     * Create new instance of statistic controller.
     *
     * @param StatisticRepository $statistic Statistic Repository
     */
    public function __construct(StatisticRepository $statistic)
    {
        $this->statistic = $statistic;
    }

    public function generateData($request)
    {
        return response()->json([
            'data' => $this->statistic->generateData($request)
        ], 200);
    }

    public function returnSettings($request)
    {
        return response()->json([
            'settings' => $this->statistic->generateData(null)
        ], 200);
    }

    public function testPayload()
    {
        return response()->json([
            'payload' => $this->statistic->testPayload()
        ], 200);
    }
}
