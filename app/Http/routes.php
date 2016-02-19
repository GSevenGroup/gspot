<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', function () {
    return view('index');
});


Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});


Route::group(
    ['prefix'=>'api','before' => 'oauth'],
        function() {
            Route::get('/mainpage', 'MainPageController@getData');
            
            Route::get('/users',['middleware' => 'admin','uses'=> 'LoginAndRegistration\UserController@getUsers']);
            Route::post('/edit', 'LoginAndRegistration\UserController@editUser');
            Route::get('/user', 'LoginAndRegistration\UserController@getUser');
            
            
            Route::get('/groups','Api\GroupController@getGroups');
            Route::post('/addgroup','Api\GroupController@addGroup');
            
            Route::post('/weeks','Api\WeekController@getWeeksForGroup');
            Route::post('/addweek','Api\WeekController@addWeek');
            
            
            Route::post('/longgoals','Api\GoalController@getLongTermGoalsForGroup');
            Route::post('/createlonggoal','Api\GoalController@saveLongGoal');
            
            Route::post('/shortgoals','Api\GoalController@getShortTermGoalsForGroup');
            Route::post('/createshortgoal','Api\GoalController@saveShortGoal');
            

            
        }
);

Route::get('/register','LoginAndRegistration\RegistrationController@register');
Route::get('/testDB','LoginAndRegistration\RegistrationController@testDB');
Route::post('/createuser', 'LoginAndRegistration\UserController@addUser');