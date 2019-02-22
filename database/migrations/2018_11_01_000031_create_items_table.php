<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('corporation_id')->unsigned();
            $table->foreign('corporation_id')
                ->references('id')
                ->on('corporations')
                ->onDelete('cascade');
            $table->integer('item_type_id')->unsigned();
            $table->foreign('item_type_id')
                ->references('id')
                ->on('item_types')
                ->onDelete('cascade');
            $table->integer('default_unit_of_measurement_id')->unsigned()->nullable();
            $table->foreign('default_unit_of_measurement_id')
                ->references('id')
                ->on('unit_of_measurements')
                ->onDelete('cascade');
            $table->integer('purchase_unit_of_measurement_id')->unsigned()->nullable();
            $table->foreign('purchase_unit_of_measurement_id')
                ->references('id')
                ->on('unit_of_measurements')
                ->onDelete('cascade');
            $table->integer('selling_unit_of_measurement_id')->unsigned()->nullable();
            $table->foreign('selling_unit_of_measurement_id')
                ->references('id')
                ->on('unit_of_measurements')
                ->onDelete('cascade');
            $table->integer('asset_account_id')->unsigned()->nullable();
            $table->integer('cogs_account_id')->unsigned()->nullable();
            $table->integer('sales_account_id')->unsigned()->nullable();
            $table->integer('expense_account_id')->unsigned()->nullable();
            $table->integer('item_classification_id')->unsigned();
            $table->foreign('item_classification_id')
                ->references('id')
                ->on('item_classifications')
                ->onDelete('cascade');
            $table->string('name');
            $table->string('with_component');
            $table->text('description')->nullable();
            $table->string('stock_keeping_unit');
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
        Schema::dropIfExists('items');
    }
}
