<?php

namespace App\Customs\Services;

use App\Models\EmailVerificationToken;
use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class EmailVerificationService
{

   /**
    * The function sends a verification link to a user via email for email verification.
    * 
    * @param object user The `user` parameter in the `senVerificationLink` function is an object that
    * represents a user. It is used to send an email verification link to the specified user for email
    * verification purposes.
    */
    public function sendVerificationLink(object $user): void
    {
        Notification::send($user, new EmailVerificationNotification($this->generateVerificationLink($user->email)));
    }

    /**
     * The function `resendLink` checks if a user with a given email exists and sends a verification link
     * if found, otherwise returns an error message.
     * 
     * @param email The `resendLink` function takes an email address as a parameter. This email address is
     * used to find a user in the database based on the email provided. If a user with that email address
     * is found, a verification link is sent to that user using the `sendVerificationLink` method.
     * 
     * @return The function `resendLink()` returns a JSON response with status 'failed' and a message
     * 'Email was not found' if the user with the provided email is not found in the database.
     */
    public function resendLink($email)
    {
        $user = User::where('email', $email)->first();
        if($user){
            $this->sendVerificationLink($user);
            return response()->json([
                'status' => 'success',
                'message' => 'Verification link sent successfully'
            ]);
        }else{
            return response()->json([
                'status' => 'error',
                'message' => 'Email was not found, please check your email.'
            ]);
        }
    }


    /**
     * The function checks if a user's email has already been verified.
     * 
     * @param user The `checkIfEmailVerified` function you provided checks if the email of a user has
     * already been verified. The function takes a `` object as a parameter.
     */
    public function checkIfEmailVerified($user){
        if($user->email_verified_at){
            response()->json([
                'status' => 'error',
                'message' => 'Email has already been verified'
            ])->send();
            exit;
        }
    }
   

    /**
     * The function `verifyEmail` verifies a user's email address using a token and updates the email
     * verification status accordingly.
     * 
     * @param string email The `verifyEmail` function you provided seems to be a part of an email
     * verification process for users. It checks if a user with the given email exists, verifies the
     * token, and marks the email as verified if successful.
     * @param string token The `token` parameter in the `verifyEmail` function is used to verify the
     * email address of a user. This token is typically generated and sent to the user's email address
     * during the email verification process. The user needs to provide this token along with their
     * email address to confirm and complete the email
     * 
     * @return The `verifyEmail` function returns a JSON response with the status and message
     * indicating whether the email verification process was successful or failed.
     */
    public function verifyEmail(string $email, string $token)
    {
        $user = User::where('email', $email)->first();
        if(!$user) {
            response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ])->send();
            exit();
        }

        $this->checkIfEmailVerified($user);
        $verifiedToken = $this->verifyToken($email, $token);
        if($user->markEmailAsVerified()){
            $verifiedToken->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Email has successfully verified.',
                'client_url' => 'https://korusentaino.vercel.app',
                'userData' => $user,
            ]);
        }else {
            return response()->json([
                'status' => 'error', 
                'message' => 'Emaill verification failed, please try again later.'
            ]);
        }
    }

    public function verifyUser(string $email)
    {
        $user = User::where('email', $email)->first();
        if(!$user) {
            response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ])->send();
            exit();
        }

        $this->checkIfEmailVerified($user);
        $token = EmailVerificationToken::where('email', $email)->first()->token;
        $verifiedToken = $this->verifyToken($email, $token);
        if($user->markEmailAsVerified()){
            $verifiedToken->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Email has successfully verified.',
                'client_url' => 'https://korusentaino.vercel.app',
                'userData' => $user,
            ]);
        }else {
            return response()->json([
                'status' => 'error', 
                'message' => 'Emaill verification failed, please try again later.'
            ]);
        }
    }


    /**
     * The function `verifyToken` checks if a given email and token match an entry in the database and
     * returns the token if it is valid.
     * 
     * @param string email The `verifyToken` function you provided is used to verify an email
     * verification token. The function takes two parameters: `` and ``.
     * @param string token The `verifyToken` function you provided is used to verify an email
     * verification token. The function takes two parameters: `` which is the email associated
     * with the token, and `` which is the token to be verified.
     * 
     * @return If the token is valid and not expired, the function will return the
     * EmailVerificationToken object. If the token is expired, a JSON response with a message
     * indicating that the token has expired will be sent. If the token is invalid, a JSON response
     * with a message indicating that the token is invalid will be sent.
     */
    public function verifyToken(string $email, string $token)
    {
        $token = EmailVerificationToken::where('email', $email)->where('token', $token)->first();
        if($token){
            if($token->expired_at >= now()){
                return $token;
            }else{
                $token->delete();
                response()->json([
                    'status' => 'error',
                    'message' => 'Token expired'
                ])->send();
            }
        }else {
            response()->json([
                'status' => 'error',
                'message' =>  'Invalid Token'
            ])->send();
            exit;
        }
    }

    /**
     * The function generates a verification link for a given email address by creating a unique token
     * and storing it in the database with an expiration time.
     * 
     * @param email The `generateVerificationLink` function takes an email address as a parameter. It
     * generates a unique token, creates a verification link with the token and email parameters, saves
     * the token in the database with an expiration time of 60 minutes, and returns the generated
     * verification link.
     * 
     * @return string The `generateVerificationLink` function returns a string value which is the
     * generated verification link containing the token and email parameters.
     */
    public function generateVerificationLink(string $email): string
    {
        $checkIfTokenExists = EmailVerificationToken::where('email', $email)->first();
        if($checkIfTokenExists) $checkIfTokenExists->delete();
        $token = Str::uuid();
        $url = config('app.url')."/checkpoint?token=".$token."&email=".$email;
        $saveToken = EmailVerificationToken::create([
            "email" => $email,
            "token" => $token,
            "expired_at" => now()->addMinutes(60)
        ]);
        if($saveToken) {
            return $url;
        }
    }
}