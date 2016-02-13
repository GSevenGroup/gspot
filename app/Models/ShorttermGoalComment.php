<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShorttermGoalComment extends Model {

	protected $table = 'shortterm_goal_comments';

    public function getGoal()
    {
        return $this->belongsTo('App\Models\ShorttermGoal','goal_id');
    }
    public function getUser()
    {
        return $this->belongsTo('App\Models\User','user_id');
    }
}
