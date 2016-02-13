<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShorttermGoalsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('shortterm_goals', function(Blueprint $table)
		{
            $table->increments('id');
            $table->string('goal');
            $table->boolean('sketch');
            $table->integer('suggest_id')->unsigned();
            $table->integer('assigned_id')->unsigned();
            $table->integer('week_id')->unsigned();
            $table->integer('review_status_id')->unsigned();
            $table->integer('status_id')->unsigned();
            $table->integer('goal_id')->unsigned();
            $table->foreign('suggest_id')->references('id')->on('users');
            $table->foreign('assigned_id')->references('id')->on('users');
            $table->foreign('week_id')->references('id')->on('weeks');
            $table->foreign('review_status_id')->references('id')->on('review_statuses');
            $table->foreign('status_id')->references('id')->on('statuses');
            $table->foreign('goal_id')->references('id')->on('longterm_goals');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('shortterm_goals');
	}

}
