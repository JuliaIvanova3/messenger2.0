<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('getchat', 'ChatController@index')->name('get.chat');
Route::post('addchat', 'ChatController@store')->name('add.chat');
Route::post('updatechat/{id}', 'ChatController@update')->name('update.chat');

Route::get('getuser', 'UserController@getAuthUser')->name('get.user');
Route::get('users', 'UserController@index')->name('get.users');

Route::post('adduserchat', 'UsersChatsController@store')->name('add.userchat');
Route::post('getByChat/{id}', 'UsersChatsController@index')->name('get.userchat');
Route::post('getUsers/{id}', 'UsersChatsController@get')->name('getusers.notchat');
Route::delete('userchat/{id}', 'UsersChatsController@destroy')->name('delete.userchat');

Route::post('getmsgbychat', 'MessageController@index')->name('get.msg');
Route::post('addmsg', 'MessageController@store')->name('add.msg');
Route::post('messages/{id}', 'MessageController@update')->name('update.msg');
Route::delete('messages/{id}', 'MessageController@destroy')->name('delete.msg');