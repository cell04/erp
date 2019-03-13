<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitOfMeasurementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unit_of_measurements', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('corporation_id')->unsigned();
            $table->foreign('corporation_id')
                ->references('id')
                ->on('corporations')
                ->onDelete('cascade');
            $table->string('name');
            $table->string('abbreviation');
            $table->string('default_value');
            $table->integer('base_unit_id')->unsigned()->nullable();
            $table->foreign('base_unit_id')
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
        Schema::dropIfExists('unit_of_measurements');
    }
}
