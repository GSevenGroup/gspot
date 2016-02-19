<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Week extends Model {

	protected $table = 'weeks';
	protected $fillable = ['week_num','date_from','date_to','group_id'];
    public function getGroup()
    {
         return $this->belongsTo('App\Models\Group','group_id');
    }
    
    public function getShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal');
    }
}
