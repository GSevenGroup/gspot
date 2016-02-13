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
        }
);

Route::get('/register','LoginAndRegistration\RegistrationController@register');
Route::get('/testDB','LoginAndRegistration\RegistrationController@testDB');
