<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWeeksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('weeks', function(Blueprint $table)
		{
			$table->increments('id');
            $table->integer('week_num');
            $table->date('date_from');
            $table->date('date_to');
            $table->integer('group_id')->unsigned();
			$table->timestamps();
            $table->foreign('group_id')->references('id')->on('groups');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('weeks');
	}
}
