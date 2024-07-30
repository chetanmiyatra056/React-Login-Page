<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PasswordController extends Controller
{
    function upassword(Request $request){
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|min:4|max:8',
            'password' => 'required|min:4|max:8',
            'confirm_password' => 'required|same:password|min:4|max:8'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => false,
                'error' => $validator->errors(),
                'status' => false,
            ], 200);
        }

        if (!Hash::check($request->current_password, auth()->user()->password)) {
            return response()->json([
                'message' => 'Password does not match!',
                'status' => false,
                'error' => false,
            ], 200);
        }

        $user = User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->confirm_password)
        ]);

        return response()->json([
            'message' => 'User password change successfully.',
            'status' => true,
            'data' => $user,
        ], 200);

    }
}
