<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('name');
            $table->string('password');
            $table->string('email');
            $table->smallInteger('level');
            $table->string('landing_page');
            $table->binary('avatar');
            $table->bigInteger('user_group');
            $table->string('country');
            $table->string('city');
            $table->string('address');
            $table->string('phone');
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
		Schema::drop('users');
	}

}
