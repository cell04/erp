<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCorporationUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('corporation_user', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('corporation_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('corporation_id')->references('id')->on('corporations');
            $table->primary(['user_id', 'corporation_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('corporation_user');
    }
}
