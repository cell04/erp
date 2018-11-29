<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockReceivesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_receives', function (Blueprint $table) {
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
            $table->integer('stock_transfer_id')->unsigned();
            $table->foreign('stock_transfer_id')
                ->references('id')
                ->on('stock_transfers')
                ->onDelete('cascade');
            $table->integer('stock_receivable_from_id')->unsigned();
            $table->string('stock_receivable_from_type');
            $table->integer('stock_receivable_to_id')->unsigned();
            $table->string('stock_receivable_to_type');
            $table->date('stock_received_date');
            $table->string('number');
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
        Schema::dropIfExists('stock_receives');
    }
}
