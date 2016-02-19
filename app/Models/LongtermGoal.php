<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LongtermGoal extends Model {

	protected $table = 'longterm_goals';

	protected $fillable = ['goal', 'sketch','suggest_id', 'assigned_id','goal_date','review_status_id','status_id','category_id'];
    
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
        return $this->belongsTo('App\Models\Category','category_id');
    }
    public function getReviewStatus()
    {
        return $this->belongsTo('App\Models\ReviewStatus','review_status_id');
    }
    public function getStatus()
    {
        return $this->belongsTo('App\Models\Status','status_id');
    }
    public function getComents()
    {
        return $this->hasMany('App\Models\LongtermGoalComment','goal_id');
    }
    
    public function getShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal','goal_id');
    }
}
