<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $table = 'categories';
    
    public function getLongTermGoals()
    {
        return $this->hasMany('App\Models\LongtermGoal','category_id');
    }
    
}
