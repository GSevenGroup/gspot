<?php namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use  \App\Models\Group;
use Validator;

class GroupController extends Controller {
    
    public function getGroups(){
        return response(Group::all(),'200');
    }
    public function addGroup(Request $request){
        
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'mentor' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        	
        $group = new Group();
        $group->name= $request->input('name');

        $group->mentor = $request->input('mentor');

        $group->save();
        
        return response('success',200);
    }
    public function editGroup(Request $request){
        
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'mentor' => 'integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        
        $group = Group::find($request->input('id'));
        if($request->input('name')!==null){
            $group->name= $request->input('name');
        }
        
        if($request->input('mentor')!==null){
            $group->mentor= $request->input('mentor');
        }
         
        $group->save();
        return response('success',200);
        
        }
}