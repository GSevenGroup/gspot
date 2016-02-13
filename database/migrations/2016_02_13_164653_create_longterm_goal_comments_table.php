<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLongtermGoalCommentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('longterm_goal_comments', function(Blueprint $table)
		{
            $table->increments('id');
            $table->string('message');
            $table->boolean('comment_type');
            $table->date('comment_date');
            $table->integer('user_id')->unsigned();
            $table->integer('goal_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
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
		Schema::drop('longterm_goal_comments');
	}

}
