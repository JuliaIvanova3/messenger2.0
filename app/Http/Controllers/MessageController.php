<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $offset = $request->input('offset'); 
        $mesages = Message::where('chat_id',$request->input('chat_id'))->orderBy('created_at', 'desc')->get();  //->skip($offset)->take(7)
        foreach($mesages as $mesage) {
            $mesage->read = 1;
            $mesage->save();
            $mesage->from = $mesage->user->name;
            $mesage->date = $mesage->created_at->format('Y-m-d : H-m');
        }

        return json_encode($mesages);
    }

    public function store(Request $request)
    {
        // $params = $request->all();
        //$message = Message::create($params);
        $message = new Message();
        $message->text = $request->input('text');
        $message->user_id = $request->input('user_id');
        $message->chat_id = $request->input('chat_id');
        $message->read = 1;
        $message->save();
        $message->channels = $request->input('channels');
        $message->from = $message->user->name;
        $message->date = $message->created_at->format('Y-m-d : H-m');

       \App\Events\NewMessage::dispatch($message);
        return json_encode($message);
       
    }

    public function update(Request $request, $id)
    {
        $params = $request->all();
        $messages = Message::find($id)->update($params);
        
        return json_encode($messages);
    }

    public function destroy($id)
    {
       $msg =  Message::find($id)->delete();

       return json_encode($msg);
    }
}
