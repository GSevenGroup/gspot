<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRoles extends Model {
    
    protected $table = 'user_roles';
    public function getUser()
    {
        return $this->belongsTo('App\Models\User');
    }
}

