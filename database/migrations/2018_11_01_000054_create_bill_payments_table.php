<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBillPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('corporation_id')->unsigned();
            $table->foreign('corporation_id')
                ->references('id')
                ->on('corporations')
                ->onDelete('cascade');
            $table->integer('bill_id')->unsigned();
            $table->foreign('bill_id')
                ->references('id')
                ->on('bills')
                ->onDelete('cascade');
            $table->integer('mode_of_payment_id')->unsigned();
            $table->foreign('mode_of_payment_id')
                ->references('id')
                ->on('mode_of_payments')
                ->onDelete('cascade');
            $table->string('cr_number')->nullable();
            $table->string('bills_payment_number');
            $table->string('bank_name')->nullable();
            $table->string('check')->nullable();
            $table->decimal('amount', 20, 2);
            $table->dateTime('bills_payment_date');
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
        Schema::dropIfExists('bill_payments');
    }
}
