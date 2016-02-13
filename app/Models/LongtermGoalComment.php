<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LongtermGoalComment extends Model {

	protected $table = 'longterm_goal_comments';

    public function getGoal()
    {
        return $this->belongsTo('App\Models\LongtermGoal','goal_id');
    }
    public function getUser()
    {
        return $this->belongsTo('App\Models\User','user_id');
    }
}
