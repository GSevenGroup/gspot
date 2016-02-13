<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewStatus extends Model {

	 protected $table = 'review_statuses';

    public function getLongTermGoals()
    {
        return $this->hasMany('App\Models\LongtermGoal','review_status_id');
    }
    
    public function getShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal','review_status_id');
    }
    
}
