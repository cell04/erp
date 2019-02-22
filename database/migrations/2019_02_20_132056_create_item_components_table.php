<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemComponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_components', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('item_id')->unsigned();
            $table->integer('component_id')->unsigned();
            $table->integer('quantity');
            $table->integer('converter_value');
            $table->integer('unit_of_measurement_id')->unsigned();
            $table->float('unit_price', 20, 2)->default(0);
            $table->foreign('item_id')
                ->references('id')
                ->on('items');
            $table->foreign('component_id')
                ->references('id')
                ->on('items');
            $table->foreign('unit_of_measurement_id')
                ->references('id')
                ->on('unit_of_measurements');
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
        Schema::dropIfExists('item_components');
    }
}
