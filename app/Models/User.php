<?php namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'email', 'password','email','level','landing_page','user_group','country','city','address','phone'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];


    
    /**
     * Get the comments for the blog post.
     */
    public function getRoles()
    {
        return $this->hasMany('App\Models\UserRoles');
    }

    public function getMentoredGroup()
    {
        return $this->hasMany('App\Models\Group','mentor');
    }
    
    public function getSuggestedLongTermGoals()
    {
        return $this->hasMany('App\Models\LongtermGoal','suggest_id');
    }
    
    public function getAssignedLongTermGoals()
    {
        return $this->hasMany('App\Models\LongtermGoal','assigned_id');
    }    
    public function getSuggestedShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal','suggest_id');
    }
    
    public function getAssignedShortTermGoals()
    {
        return $this->hasMany('App\Models\ShorttermGoal','assigned_id');
    }
    public function getShortTermComents()
    {
        return $this->hasMany('App\Models\ShorttermGoalComment','user_id');
    }
    public function getLongTermComents()
    {
        return $this->belongsTo('App\Models\LongtermGoalComment','user_id');
    }
}
    

