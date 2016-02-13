<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Authorizer;
class MainPageController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function getData(Authorizer $authorizer)
	{

		return response()->json(['name' => 'Abigail', 'state' => 'CA']);
	}

}