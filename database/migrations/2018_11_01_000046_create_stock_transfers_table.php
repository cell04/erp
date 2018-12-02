<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_transfers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('corporation_id')->unsigned();
            $table->foreign('corporation_id')
                ->references('id')
                ->on('corporations')
                ->onDelete('cascade');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->integer('stock_request_id')->unsigned();
            $table->foreign('stock_request_id')
                ->references('id')
                ->on('stock_requests')
                ->onDelete('cascade');
            $table->integer('stock_transferable_from_id')->unsigned();
            $table->string('stock_transferable_from_type');
            $table->integer('stock_transferable_to_id')->unsigned();
            $table->string('stock_transferable_to_type');
            $table->date('stock_transfered_date');
            $table->string('number');
            $table->smallInteger('status')->default(0);
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
        Schema::dropIfExists('stock_transfers');
    }
}
