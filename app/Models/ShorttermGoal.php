<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShorttermGoal extends Model {

	protected $table = 'shortterm_goals';

    public function getSuggestedUser()
    {
        return $this->belongsTo('App\Models\User','suggest_id');
    }
    
    public function getAssignedUser()
    {
        return $this->belongsTo('App\Models\User','assigned_id');
    }
    public function getWeek()
    {
        return $this->belongsTo('App\Models\Week');
    }
    public function getReviewStatus()
    {
        return $this->belongsTo('App\Models\ReviewStatus');
    }
    public function getStatus()
    {
        return $this->belongsTo('App\Models\Status');
    }
    
    public function getComents()
    {
        return $this->belongsTo('App\Models\ShorttermGoalComment','goal_id');
    }
    public function getLongTermGoals()
    {
        return $this->belongsTo('App\Models\LongtermGoal','goal_id');
    }

}
