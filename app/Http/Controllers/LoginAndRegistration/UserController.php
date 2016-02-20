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
        return response(User::all(),200);
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
    public function editUser(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        
        $user = User::find(Authorizer::getResourceOwnerId());
        if($request->input('name')!==null){
            $user->name= $request->input('name');
            }
        
        if($request->input('email')!==null){
            $user->email= $request->input('email');
        }
         
        if($request->input('country')!==null){
            $user->country= $request->input('country');
        }
        if($request->input('city')!==null){
            $user->city= $request->input('city');
        }
        if($request->input('address')!==null){
            $user->address= $request->input('address');
        }
        
        if($request->input('phone')!==null){
            $user->phone= $request->input('phone');
        }
        if($request->input('landing_page')!==null){
            $user->landing_page= $request->input('landing_page');
        }
         
        if($request->input('password')!==null){
            $user->password = \Illuminate\Support\Facades\Hash::make($request->input('password'));
        }
        
        $user->save();
        return response('success',200);
        
        }
}