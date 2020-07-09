<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UsersChats;
use App\User;
use Auth;
 

class UsersChatsController extends Controller
{
    public function index($id)
    {
        $chats = UsersChats::with('user')->select('id', 'user_id')->where('chat_id', $id)->get();
        // foreach($chats as $chat) {
        //     $chat->member = $chat->user->name;
        // }

        return json_encode($chats);
    }

    public function get($id)
    {
        $users = UsersChats::where('chat_id', $id)->get();
        $nUsers = [];
        foreach($users as $user) {
            $nUsers[] = $user->user_id;
        }
        array_push($nUsers, Auth::id());
        $notUsers = User::whereNotIn('id', $nUsers)->get();
        return json_encode($notUsers);
    }

    public function store(Request $request)
    {
        $params = $request->all();
        $userChat = UsersChats::create($params);
        return json_encode($userChat);
    }

    public function update(Request $request, $id)
    {
        $params = $request->all();
        $record = UsersChats::find($id)->update($params);

        return json_encode($record);
    }


    public function destroy($id)
    {
        $record = UsersChats::find($id)->delete();
        return json_encode($record);
    }
}
