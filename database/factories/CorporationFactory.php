<?php

use Faker\Generator as Faker;

$factory->define(App\Corporation::class, function (Faker $faker) {
    return [
        'name'        => $faker->company,
        'description' => $faker->sentence,
        'street'      => $faker->streetName,
        'city'        => 'Bacolod',
        'state'       => 'Negros Occidental',
        'zip_code'    => '6100',
        'country'     => 'Phillipines',
        'fax'         => rand(1000, 9999)
    ];
});
