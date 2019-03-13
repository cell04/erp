<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unit_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('base_unit_id')->unsigned()->nullable();
            $table->foreign('base_unit_id')
                ->references('id')
                ->on('unit_of_measurements')
                ->onDelete('cascade');
            $table->integer('unit_of_measurement_id')->unsigned()->nullable();
            $table->foreign('unit_of_measurement_id')
                ->references('id')
                ->on('unit_of_measurements')
                ->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unit_groups');
    }
}
