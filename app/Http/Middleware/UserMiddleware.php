<?php

namespace App\Http\Middleware;

use Closure;
use \App\Models\User;
use \App\Models\Group;
use \Authorizer;

class UserMiddleware
{
    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next)
    { 
        
         $group_id = $request->input('group_id');
         $assigned_id = $request->input('assigned_id');
         $suggest_id = $request->input('suggest_id');
        
        foreach (User::find(Authorizer::getResourceOwnerId())->getRoles  as $role){
           
           if($hasrole = $role->role === 'ADMIN'){ 
               return $next($request);
           }
            if($hasrole = $role->role === 'MENTOR'){ 
               return $next($request);
           }            
       }
        
        if( $assigned_id !== null && $suggest_id !== null && intval($suggest_id) ===0){
            if(intval(User::find(Authorizer::getResourceOwnerId())->id) !==intval($assigned_id)){
                return response("You don't have access to this content",403 );
            }
        }
        
        if($group_id !== null){
            if(intval(User::find(Authorizer::getResourceOwnerId())->user_group) !==intval($group_id)){
                return response("You don't have access to this content",403 );
            }
        }
        if($assigned_id !==null && $suggest_id !==null && intval($suggest_id) !==0){
            if(intval((User::find(Authorizer::getResourceOwnerId())->user_group) !==intval(User::find($assigned_id)->user_group)) || (intval(User::find(Authorizer::getResourceOwnerId())->id) !==intval($suggest_id))){
                return response("You don't have access to this content",403 );
            }
        }
        
         

        return $next($request);
    }
}