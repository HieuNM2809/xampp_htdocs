<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;


/**
 * * @OA\Post(
 * path="/login",
 * summary="Sign in",
 * description="Login by email, password",
 * operationId="authLogin",
 * tags={"auth"},
 * @OA\RequestBody(
 * required=true,
 * description="Pass user credentials",
 * @OA\JsonContent(
 * required={"email","password"},
 * @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
 * @OA\Property(property="password", type="string", format="password", example="PassWord12345"),
 * @OA\Property(property="persistent", type="boolean", example="true"),
 * ),
 * ),
 * @OA\Response(
 * response=422,
 * description="Wrong credentials response",
 * @OA\JsonContent(
 * @OA\Property(property="message", type="string", example="Sorry, wrong email address or password. Please try again")
 * )
 * )
 * )
 * @OA\Get(
 *     path="/api/home",
 *     description="Home page",
 *     @OA\Response(response="default", description="Welcome page")
 * )
 *  @OA\Get(
 *     path="/api/test",
 *     description="Home page",
 *     @OA\Response(response="default", description="Welcome page")
 * )
 * */

class HomeController extends Controller
{
    public function home(Request $request)
    {
        return response()->json(['message' => 'hello']);
    }
    public function test(Request $request)
    {
        return response()->json(['message' => 'test']);
    }
}
