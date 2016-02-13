<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Week extends Model {

	protected $table = 'weeks';

    public function getGroup()
    {
         return $this->belongsTo('App\Models\Group','group_id');
    }
    
    public function getShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal');
    }
}
