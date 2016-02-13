<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model {

    protected $table = 'statuses';

    public function getLongTermGoals()
    {
        return $this->hasMany('App\Models\LongtermGoal','status_id');
    }
    
    public function getShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal','status_id');
    }
    
}
