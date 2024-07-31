<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UpdateController extends Controller
{

    public function getuser($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|regex:/(.+)@(.+)\.(.+)/i',
            'countriesid' => 'required',
            'statesid' => 'required',
            'citiesid' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
                'status' => false,
            ], 404);
        }

        $user->name =  $request->input('name');
        $user->email = $request->input('email');
        $user->countries = $request->input('countriesid');
        $user->states = $request->input('statesid');
        $user->cities = $request->input('citiesid');

       if( $user->update()){
           return response()->json([
               'message' => 'User updated successfully.',
               'status' => true,
               'type' => 'success',
               'data' => $user,
            ], 201);
        }else{
            return response()->json([
                'message' => 'User not updated.',
                'status' => false,
                'type' => 'danger',
                'data' => $user,
             ], 201);
        }
    }
}
