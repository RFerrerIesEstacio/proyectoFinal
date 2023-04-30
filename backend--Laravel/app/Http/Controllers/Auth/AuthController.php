<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('user');
    }


    public function register(RegisterRequest $request){

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'password' => bcrypt($request->password),
            'email' => $request->email,
            'rol' => 'usuario',
            'valoracion' => 0
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }

    public function login(LoginRequest $request){
            $credentials = $request->only('email', 'password');
            try {
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json([
                        'errors' => [
                            "credentials"=> 'Email o contraseña incorrectos'
                        ]
                    ]
                    , 400);
                }
            } catch (JWTException $e) {
                return response()->json([
                    'errors' => [
                        "server"=> 'Error 500 - Server Not Found'
                    ]
                ]
                , 500);
            }

            return response()->json(compact('token'));
    }

    public function user(Request $request) {
        return response()->json(auth()->user());
    }

    public function userData(Request $request){
        $data = User::find($request->id);
        $productos = Productos::where("id_usuario", "=", $data->id)->get();
        return response()->json(["user" => $data, "productos" => $productos]);
    }
}
