<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{

    function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users',
            'email' => 'required|unique:users|regex:/(.+)@(.+)\.(.+)/i',
            'countries' => 'required',
            'states' => 'required',
            'cities' => 'required',
            'password' => 'required|min:4|max:8',
            'confirm_password' => 'required|same:password|min:4|max:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = new User;
        
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->countries = $request->input('countries');
        $user->states = $request->input('states');
        $user->cities = $request->input('cities');
        $user->save();

        // return $request->input();

        return response()->json([
            'message' => 'User registered successfully.',
            'status' => true,
            'data' => $user,
        ], 201);
    }
}
