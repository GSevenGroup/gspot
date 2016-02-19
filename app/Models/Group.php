<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model {

	protected $table = 'groups';
	protected $fillable = ['name','mentor'];
    public function getMentor()
    {
         return $this->belongsTo('App\Models\User','mentor');
    }
    
    public function getWeeks()
    {
        return $this->hasMany('App\Models\Week','group_id');
    }
}
