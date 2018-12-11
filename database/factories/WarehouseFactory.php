<?php

use Faker\Generator as Faker;

$factory->define(App\Warehouse::class, function (Faker $faker) {
    return [
        'corporation_id'   => 1,
        'name'             => $faker->word,
        'address'          => $faker->address,
        'city'             => 'Bacolod',
        'zip_code'         => '6100',
        'country'          => 'Phillipines',
        'telephone_number' => $faker->tollFreePhoneNumber
    ];
});
