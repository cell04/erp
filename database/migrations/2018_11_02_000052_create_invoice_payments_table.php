<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('corporation_id')->unsigned();
            $table->integer('payment_for'); //0 = sales invoice, 1 = service invoice 
            $table->foreign('corporation_id')
                ->references('id')
                ->on('corporations')
                ->onDelete('cascade');
            $table->integer('invoice_id')->unsigned();
            $table->foreign('invoice_id')
                ->references('id')
                ->on('invoices')
                ->onDelete('cascade');
            $table->integer('mode_of_payment_id')->unsigned();
            $table->foreign('mode_of_payment_id')
                ->references('id')
                ->on('mode_of_payments')
                ->onDelete('cascade');
            $table->string('cr_number')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('check')->nullable();
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
        Schema::dropIfExists('invoice_payments');
    }
}
