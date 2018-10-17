<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReceiveOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('receive_order_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('receive_order_id')->unsigned();
            $table->foreign('receive_order_id')
                ->references('id')
                ->on('receive_orders')
                ->onDelete('cascade');
            $table->integer('item_id')->unsigned();
            $table->foreign('item_id')
                ->references('id')
                ->on('items')
                ->onDelete('cascade');
            $table->integer('quantity');
            $table->integer('unit_of_measurement_id')->unsigned();
            $table->foreign('unit_of_measurement_id')
                ->references('id')
                ->on('unit_of_measurements')
                ->onDelete('cascade');
            $table->integer('item_pricelist_id')->unsigned();
            $table->foreign('item_pricelist_id')
                ->references('id')
                ->on('item_pricelists')
                ->onDelete('cascade');
            $table->string('tracking_number');
            $table->smallInteger('status')->default(1);
            $table->date('expiration_date')->nullable();
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
        Schema::dropIfExists('receive_order_items');
    }
}
