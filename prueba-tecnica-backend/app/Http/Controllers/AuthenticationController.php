<?php

namespace App\Http\Controllers;

use App\Mail\TokenMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{
    //
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->where('password', '=', $password)->first();

        if ($user) {
            $token = $user->createToken('token_login')->plainTextToken;
            Mail::to($user->email)->send(new TokenMail($user, $token));

            return response()->json([
                "user" => $email,
                "token" => $token
            ], 200);
        } else {
            return response()->json(['message' => 'No estás autorizado'], 401);
        }
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Has cerrado sesión']);
    }
}
