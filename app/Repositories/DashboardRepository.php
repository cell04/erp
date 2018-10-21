<?php

namespace App\Repositories;

class DashboardRepository
{
    // All functions here

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
