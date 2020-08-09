<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth; 
use App\User; 

class UserController extends Controller
{
    public function getAuthUser()
    {
        $user = Auth::user();
        \App\Events\OnlineUser::dispatch($user);

        return json_encode($user);
    }

    public function index()
    {
        $users = User::all();
        $users = $users->except(Auth::id());

        return json_encode($users);
    }
}
