<?php

namespace App\Repositories;

use Carbon\Carbon;
use DB;

class StatisticRepository
{
    // All functions here

    private $modelNames = [
        'Item' => 'App\Item'
    ];

    private $filters = [
        1 => 'day',
        2 => 'week',
        3 => 'month',
        4 => 'year'
    ];


    private $settings = [
        'GraphType' => null,
        'Options'   => [],
        'Model'     => null
    ];


    protected $graphDataSettings = [
        'Bar'  => ['labels' => [],
                    'data'  => [],
                    'filter' => null
                  ],
        'Line' => ['labels' => [],
                    'data'  => [],
                    'filter' => null
                  ],
        'Pie'  => ['labels' => [],
                    'data'  => [],
                    'filter' => null
                  ]
    ];

    private function Settings($settings)
    {
        //do settings logic here, map settings to settings
        $this->settings['GraphType'] = $settings->{'GraphType'};
        $this->settings['Options']   = $settings->{'Options'};
        $this->settings['Model']     = $settings->{'Model'};

        return;
    }

    private function SetSettings($settings)
    {
        $this->settings['GraphType'] = $settings->graphType;
        $this->settings['Options']   = $settings->options;
        $this->settings['Model']     = $settings->model;
        return;
    }

    public function generateData($request)
    {
        //$this->SetSettings($request);

        $this->Settings((object)[
           'GraphType' => 'Line',
           'Options'   => ['GroupBy', 'Whole'],
           'Model'     => 'Item'
       ]);

        //return $this->graphDataSettings[$this->settings['GraphType']];

        return ($this->modelNames[$this->settings['Model']])::all()->with( [
            'itemType', 'itemClassification', 'defaultUnitOfMeasurement'
        ])->get(); 


        //return $this->settings;
    }

    public function getModelData($settings, $filters)
    {
        if (!$settings) {
            return false;
        }

        

        if (is_array($filters)) {
            if (!$filters) {
                return;
            }
        }
    }


    public function GetFilterValue(&$filter)
    {
        switch ($this->filters[$filter]) {
            case 'day':
                return Carbon::now();
        }
    }

    public function testPayload()
    {
        return
            [
                ['date' => '01/02/2018', 'data' => 10],
                ['date' => '01/02/2018', 'data' => 15],
                ['date' => '01/03/2018', 'data' => 15],
                ['date' => '01/04/2018', 'data' => 20],
                ['date' => '01/05/2018', 'data' => 25],
                ['date' => '01/06/2018', 'data' => 17],
                ['date' => '01/07/2018', 'data' => 5]
            ];
    }
}
