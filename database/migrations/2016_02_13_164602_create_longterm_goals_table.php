<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLongtermGoalsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('longterm_goals', function(Blueprint $table)
		{
            $table->increments('id');
            $table->string('goal');
            $table->boolean('sketch');
            $table->integer('suggest_id')->unsigned();
            $table->integer('assigned_id')->unsigned();
            $table->date('goal_date');
            $table->integer('review_status_id')->unsigned();
            $table->integer('status_id')->unsigned();
            $table->integer('category_id')->unsigned();
            $table->foreign('suggest_id')->references('id')->on('users');
            $table->foreign('assigned_id')->references('id')->on('users');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->foreign('review_status_id')->references('id')->on('review_statuses');
            $table->foreign('status_id')->references('id')->on('statuses');
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
		Schema::drop('longterm_goals');
	}

}
