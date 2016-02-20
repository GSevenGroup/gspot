<?php

namespace App\Http\Middleware;

use Closure;
use \App\Models\User;
use \Authorizer;

class MentorMiddleware
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
        
       foreach (User::find(Authorizer::getResourceOwnerId())->getRoles  as $role){
           
           if($hasrole = $role->role === 'MENTOR'){ 
                return $next($request);
           }
       }

        return response("You don't have access to this content",403 );
    }
}