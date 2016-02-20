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
    ['prefix'=>'api','before' => 'oauth','middleware' => 'user'],
        function() {
            Route::get('/mainpage', 'MainPageController@getData');
            
            Route::get('/users',['middleware' => 'admin','uses'=> 'LoginAndRegistration\UserController@getUsers']);
            Route::post('/edituser', 'LoginAndRegistration\UserController@editUser');
            Route::get('/user', 'LoginAndRegistration\UserController@getUser');
            
            
            Route::get('/groups',['middleware' => 'mentor','admin','uses'=>'Api\GroupController@getGroups']);
            Route::post('/addgroup',['middleware' => 'admin','uses'=>'Api\GroupController@addGroup']);
            Route::post('/editgroup',['middleware' => 'mentor','admin','uses'=>'Api\GroupController@editGroup']);
            
            Route::post('/weeks','Api\WeekController@getWeeksForGroup');
            Route::post('/addweek',['middleware' => 'mentor','admin','uses'=>'Api\WeekController@addWeek']);
            
            
            Route::post('/longgoals','Api\GoalController@getLongTermGoalsForGroup');
            Route::post('/createlonggoal','Api\GoalController@saveLongGoal');
            Route::post('/editlonggoal','Api\GoalController@editLongGoal');
            
            Route::post('/shortgoals','Api\GoalController@getShortTermGoalsForGroup');
            Route::post('/createshortgoal','Api\GoalController@saveShortGoal');
            Route::post('/editshortgoal','Api\GoalController@editShortGoal');
            
        }
);

Route::post('/createuser', 'LoginAndRegistration\UserController@addUser');