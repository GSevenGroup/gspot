<?php namespace App\Http\Controllers\Api;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use \Authorizer;
use Illuminate\Http\Request;
use  \App\Models\User;
use  \App\Models\LongtermGoal;
use  \App\Models\ShorttermGoal;
use  \App\Models\ReviewStatus;

class GoalController extends Controller {
    
    public function getLongTermGoalsForGroup(Request $request){
        $group_id = $request->input('group_id');
        
        $users = User::where('user_group',$group_id)->get();
        $usergoals =array();
        
        foreach ($users as $user){
            
            $longtermgoals = array();
            foreach (User::find($user->id)->getAssignedLongTermGoals  as $longgoal){
                if($longgoal->suggest_id===0){
                $goaltmp = new \stdClass();
                $longgoal->review_status_id = LongtermGoal::find($longgoal->id)->getReviewStatus->status;
                $longgoal->status_id = LongtermGoal::find($longgoal->id)->getStatus->status;
                $longgoal->category_id = LongtermGoal::find($longgoal->id)->getCategory->category;
                $goaltmp ->goal = $longgoal;
                $goaltmp ->comments = LongtermGoal::find($longgoal->id)->getComents;
                 array_push ($longtermgoals, $goaltmp);     
                }
            }
            
            $tmp = new \stdClass();
            $tmp ->user = $user;
            $tmp ->longtermgoals = $longtermgoals;
            array_push ($usergoals, $tmp);
             
        }
       return response($usergoals);
        
    }
    
    public function getShortTermGoalsForGroup(Request $request){
        $group_id = $request->input('group_id');
        
        $users = User::where('user_group',$group_id)->get();
        $usergoals =array();
        
        foreach ($users as $user){
            
            $shorttermgoals = array();
            foreach (User::find($user->id)->getAssignedShortTermGoals  as $shortgoal){
                if($shortgoal->suggest_id===0){
                $goaltmp = new \stdClass();
                $goaltmp ->goal = $shortgoal;
                $shortgoal->review_status_id = ShorttermGoal::find($shortgoal->id)->getReviewStatus->status;
                $shortgoal->status_id = ShorttermGoal::find($shortgoal->id)->getStatus->status;
                $shortgoal->goal_id = LongtermGoal::find($shortgoal->goal_id);
                $goaltmp ->comments = ShorttermGoal::find($shortgoal->id)->getComents;
                array_push ($shorttermgoals, $goaltmp);
                }
            }
            
            $tmp = new \stdClass();
            $tmp ->user = $user;
            $tmp ->shorttermgoals = $shorttermgoals;
            array_push ($usergoals, $tmp);
        }
        return response($usergoals);
    }
    
    public function saveLongGoal(Request $request){
        
        $validator = Validator::make($request->all(), [
            'goal' => 'required',
            'sketch' => 'required|boolean',
            'assigned_id' => 'required|integer',
            'suggest_id' => 'required|integer',
            'category_id' => 'required|integer',
            'goal_date' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        
        	
        $goal = new \App\Models\LongtermGoal();
        $goal->goal= $request->input('goal');
        $goal->sketch= $request->input('sketch');
        $goal->suggest_id = $request->input('suggest_id');
        $goal->assigned_id = $request->input('assigned_id');
        $goal->goal_date = $request->input('goal_date');
        $goal->review_status_id = 3;
        $goal->status_id = 1;
        $goal->category_id = $request->input('category_id');
        $goal->save();
        
        return response('success',200);
    }

    public function saveShortGoal(Request $request){
        
        $validator = Validator::make($request->all(), [
            'goal' => 'required',
            'sketch' => 'required|boolean',
            'assigned_id' => 'required|integer',
            'suggest_id' => 'required|integer',
            'week_id' => 'required|integer',
            'goal_id' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        
        	
        $goal = new \App\Models\ShorttermGoal();
        $goal->goal= $request->input('goal');
        $goal->sketch= $request->input('sketch');
        $goal->suggest_id = $request->input('suggest_id');
        $goal->assigned_id = $request->input('assigned_id');
        $goal->week_id = $request->input('week_id');
        $goal->review_status_id = 3;
        $goal->status_id = 1;
        $goal->goal_id = $request->input('goal_id');
        $goal->save();
        
        return response('success',200);
    }
    public function editShortGoal(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'sketch' => 'boolean',
            'assigned_id' => 'required|integer',
            'suggest_id' => 'integer',
            'week_id' => 'integer',
            'goal_id' => 'integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        
        $goal = ShorttermGoal::find($request->input('id'));
        if($request->input('goal')!==null){
            $goal->goal= $request->input('goal');
        }
        
        if($request->input('sketch')!==null){
            $goal->sketch= $request->input('sketch');
        }
         
        if($request->input('assigned_id')!==null){
            $goal->assigned_id= $request->input('assigned_id');
        }
        if($request->input('suggest_id')!==null){
            $goal->suggest_id= $request->input('suggest_id');
        }
        if($request->input('week_id')!==null){
            $goal->week_id= $request->input('week_id');
        }
        
        if($request->input('goal_id')!==null){
            $goal->goal_id= $request->input('goal_id');
        }
        
        $goal->save();
        return response('success',200);
        
        }

    public function editLongGoal(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'sketch' => 'boolean',
            'assigned_id' => 'required|integer',
            'suggest_id' => 'integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        
        $goal = LongtermGoal::find($request->input('id'));
        if($request->input('goal')!==null){
            $goal->goal= $request->input('goal');
        }
        
        if($request->input('sketch')!==null){
            $goal->sketch= $request->input('sketch');
        }
         
        if($request->input('assigned_id')!==null){
            $goal->assigned_id= $request->input('assigned_id');
        }
        if($request->input('suggest_id')!==null){
            $goal->suggest_id= $request->input('suggest_id');
        }
        if($request->input('category_id')!==null){
            $goal->category_id= $request->input('category_id');
        }
        
        if($request->input('goal_date')!==null){
            $goal->goal_date= $request->input('goal_date');
        }
        
        $goal->save();
        return response('success',200);
        
        }
    

    
    public function addShortGoalComment(Request $request){
        $validator = Validator::make($request->all(), [
            'message' => 'required',
            'comment_type' => 'required',
            'goal_id' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        	
        $comment = new \App\Models\ShorttermGoalComment();
        $comment->message= $request->input('message');
        $comment->comment_type= $request->input('comment_type');
        $comment->user_id = Authorizer::getResourceOwnerId();
        $comment->goal_id = $request->input('goal_id');
        $comment->save();
        
        return response('success',200);
    }
    
    public function addLongGoalComment(Request $request){
        $validator = Validator::make($request->all(), [
            'message' => 'required',
            'comment_type' => 'required',
            'goal_id' => 'required|integer',
        ]);
    
        if ($validator->fails()) {
            return response($validator->errors(),406 );
         }
        	
        $comment = new \App\Models\LongtermGoalComment();
        $comment->message= $request->input('message');
        $comment->comment_type= $request->input('comment_type');
        $comment->user_id = Authorizer::getResourceOwnerId();
        $comment->goal_id = $request->input('goal_id');
        $comment->save();
        
        return response('success',200);
    }
}