<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LongtermGoal extends Model {

	protected $table = 'longterm_goals';


    public function getSuggestedUser()
    {
        return $this->belongsTo('App\Models\User','suggest_id');
    }
    
    public function getAssignedUser()
    {
        return $this->belongsTo('App\Models\User','assigned_id');
    }
    public function getCategory()
    {
        return $this->belongsTo('App\Models\Category');
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
        return $this->belongsTo('App\Models\LongtermGoalComment','goal_id');
    }
    
    public function getShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal','goal_id');
    }
}
