<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('corporation_id')->unsigned();
            $table->foreign('corporation_id')
                ->references('id')
                ->on('corporations')
                ->onDelete('cascade');
            $table->integer('contact_type_id')->unsigned();
            $table->foreign('contact_type_id')
                ->references('id')
                ->on('contact_types')
                ->onDelete('cascade');
            $table->string('company');
            $table->string('company_address');
            $table->string('person');
            $table->string('email')->unique();
            $table->string('mobile_number')->nullable();
            $table->decimal('credit_limit', 20, 2)->nullable();
            $table->integer('account_id')->unsigned()->nullable();
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
        Schema::dropIfExists('contacts');
    }
}
