<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBidSheetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bid_sheets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('corporation_id')->unsigned();
            $table->foreign('corporation_id')
                ->references('id')
                ->on('corporations')
                ->onDelete('cascade');
            $table->integer('location_id')->unsigned();
            $table->string('location_type');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->date('bid_sheet_date');
            $table->integer('approved_by')->unsigned()->nullable();
            $table->foreign('approved_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->date('approved_bid_sheet_date')->nullable();
            $table->integer('contact_id')->unsigned();
            $table->foreign('contact_id')
                ->references('id')
                ->on('contacts')
                ->onDelete('cascade');
            $table->string('bid_sheet_number');
            $table->smallInteger('status')->default(0);
            $table->decimal('amount', 20, 2);
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
        Schema::dropIfExists('bid_sheets');
    }
}
