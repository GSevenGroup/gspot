<?php namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use  \App\Models\Week;
use Validator;

class WeekController extends Controller {
    
    public function getWeeksForGroup(Request $request){
        $id = $request->input('group_id');
        
        return response(Week::where('group_id', $id)->get(),'200');
    }
    
    public function addWeek(Request $request){
        
        $validator = Validator::make($request->all(), [
            'week_num' => 'required|integer',
            'date_from' => 'required',
            'date_to' => 'required',
            'group_id' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        	
        $week = new Week();
        $week->week_num= $request->input('week_num');
        $week->date_from = $request->input('date_from');
        $week->date_to = $request->input('date_to');
        $week->group_id = $request->input('group_id');

        $week->save();
        
        return response('success',200);
    }
    
}