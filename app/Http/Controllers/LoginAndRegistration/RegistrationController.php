<?php namespace App\Http\Controllers\LoginAndRegistration;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use \Authorizer;
class RegistrationController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function register(Request $request)
	{
        $user = new \App\Models\User();
        $user->name="test user";
        $user->email='test@test.com';
        $user->password = \Illuminate\Support\Facades\Hash::make("password");
        $user->save();
	}
    public function testDB()
    {
        

        /*$x = \App\Models\Category::find(1);
        echo $x;
        $x = \App\Models\Status::find(2);
        echo $x;
        $x = \App\Models\ReviewStatus::find(3);
        echo $x; 
        $x = \App\Models\User::find(1)->getMentoredGroup;
        echo $x;
        
        $x = \App\Models\LongtermGoal::find(1)->getComents;
        echo $x;
        */
    }
}