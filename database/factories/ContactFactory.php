<?php

use Faker\Generator as Faker;

$factory->define(App\Contact::class, function (Faker $faker) {
    return [
        'corporation_id'  => 1,
        'contact_type_id' => rand(1, 3),
        'payment_term'    => rand(1, 2),
        'mode_of_payment' => rand(1 ,2),
        'bank_name'       => $faker->name,
        'business_type'   => $faker->name,
        'company'         => $faker->company,
        'company_address' => $faker->address,
        'person'          => $faker->name,
        'email'           => $faker->unique()->safeEmail,
        'mobile_number'   => $faker->e164PhoneNumber,
        'credit_limit'    => 0,
        'account_id'      => 17,
    ];
});
