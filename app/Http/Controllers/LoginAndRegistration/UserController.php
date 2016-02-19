<?php namespace App\Http\Controllers\LoginAndRegistration;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use \App\Models\User;
use Validator;
use \Authorizer;

class UserController extends Controller {
	
    
    public function getUser(){
        return response(User::find(Authorizer::getResourceOwnerId()),200);
    }
    public function getUsers(Request $request){
        //return response(User::all(),200);
        return response('TODO',206);
    }
    
    public function addUser(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required',
            'user_group' => 'required|integer',
            'level' => 'required',
            'country' => 'required',
            'city' => 'required',
            'address' => 'required',
            'phone' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        
        	
        $user = new User();
        $user->name= $request->input('name');
        $user->email= $request->input('email');
        $user->user_group= $request->input('user_group');
        $user->level= $request->input('level');
        $user->country= $request->input('country');
        $user->city= $request->input('city');
        $user->address= $request->input('address');
        $user->phone= $request->input('phone');
        $user->landing_page= 'home';
        $user->password = \Illuminate\Support\Facades\Hash::make($request->input('password'));
        $user->save();
        
        return response('success',200);
    }

}