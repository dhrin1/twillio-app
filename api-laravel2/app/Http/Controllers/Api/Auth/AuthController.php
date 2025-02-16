<?php

namespace App\Http\Controllers\Api\Auth;

use App\Customs\Services\EmailVerificationService;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\ResendEmailVerificationRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Http\Resources\UsersResource;
use App\Models\EmailVerificationToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function __construct(private EmailVerificationService $service)
    {
       
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();
        $token = auth()->attempt($credentials);
        if ($token) {
            $conditions = [
                'email' => $credentials['email'],
                'status' => 1,
            ];
            $user = User::where($conditions)->whereNotNull('email_verified_at')->first();
            if ($user) {
                $token = auth()->login($user);
                return $this->responseWithToken($token, new UsersResource(auth()->user()) );
            }else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'User account is inactive or email is not verified.'
                ], 401);
            }
        } else {
            return response()->json([
                'status' => 'error',        
                'message' => 'Invalid credentials.'
            ], 401);
        }
       
    }

    public function verifyUserEmail(VerifyEmailRequest $request){
        return $this->service->verifyEmail($request->email, $request->token);
    }

    public function resendEmailVerificationLink(ResendEmailVerificationRequest $request)
    {
        return $this->service->resendLink($request->email);
    }


    public function register(RegistrationRequest $request)
    {   
        $user  = User::create($request->validated());

        if($user){
            $this->service->sendVerificationLink($user);
            return response()->json([
                'status' => 'success',
                'message' => 'Your account has been successfully created. Please verify your email address to proceed.'
            ],201);
            // $token = auth()->login($user);
            // return $this->responseWithToken($token, $user);
        }else {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occur while creating user account.'
            ],500);
        }
    }

    public function responseWithToken($token, $user) {
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'access_token' => $token,
            'type' => 'Bearer'
        ]);
    }


    public function authCheckpoint(Request $request){
        $response = $this->service->verifyEmail($request->input("email"), $request->input("token")); 
        $responseData = $response->getData(true);
        if (isset($responseData['status']) && $responseData['status'] === 'success') {
            return view('verification.success', $responseData);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => isset($responseData['message']) ? $responseData['message'] : 'Invalid response or error occurred.',
            ], 500);
        }
    }

    public function refreshToken(){        
        return response()->json([
            "status" => "success",
            "message" => "New access token",
            "token" => Auth::refresh()
        ]);
      
    }
    public function logout(){
        auth()->logout();
        return response()->json([
            "status" => "success",
            "message" => "User logged out successfully"
        ]);
    }

    public function user(Request $request){
        /** @var App\Models\User $user */
        $user = $request->user();
            
        if (!$user) {
            return response([
                'message' => 'Unauthenticated'
            ], 422);
        }
        return response(new UsersResource($user));
    }

    public function getUsers(Request $request) {
        $query = User::query()->whereIn('status', [1, 0])->orderBy("created_at", "desc");
        if($request->has('id')){
            $query->where('id', $request->id);
        }
        return UsersResource::collection($query->get());
    }

    public function blockedUser(string $id) {
        if(auth()->user()->id == $id) {
            return response()->json(['status'=>'failed', 'message' => 'Unauthorized'], 401);
        }
        $user = User::query()->where('id', $id)->firstOrFail();
        $user->status = (bool) $user->status ? 0 : 1;
        $user->save();
        return response(new UsersResource($user));
    }

    public function deleteUser(Request $request, string $id) {
        $authenticatedUser = auth()->user();
        if (!$authenticatedUser) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if ($authenticatedUser->access_token !== $request->header('Authorization')) {
            return response()->json(['error' => 'Access token does not match'], 403);
        }
        if ($authenticatedUser->id !== $id) {
            return response()->json(['error' => 'You are not authorized to delete this user'], 403);
        }
        $userToDelete = User::findOrFail($id);
        $userToDelete->delete();
        return new UsersResource($userToDelete);
    }


    public function confirmUserEmail(VerifyEmailRequest $request) {
        $data = $request->validated();
        $emailToken = EmailVerificationToken::where('email', $data["email"])->first();
        return $this->service->verifyEmail($data["email"], $emailToken["token"]);
    }


}
