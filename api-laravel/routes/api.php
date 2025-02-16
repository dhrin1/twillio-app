<?php

use App\Events\NotificationEvent;
use App\Http\Controllers\Api\Analytics\CounterController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Base\BaseAccountController;
use App\Http\Controllers\Api\Customer\ProfileController;
use App\Http\Controllers\Api\Event\NotificationEventController;
use App\Http\Controllers\Api\Event\VoiceEventController;
use App\Http\Controllers\Api\Profile\PasswordController;
use App\Http\Controllers\Api\Profile\UserDetailController;
use App\Http\Controllers\Api\Webhook\Twilio\MessageWebhookController;
use App\Http\Controllers\Api\Webhook\Twilio\TwilioWebhookController;
use App\Http\Controllers\Api\Webhook\Twilio\VoiceWebhookController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::prefix('twilio')->group(function(){
    Route::prefix('webhook')->group(function(){
        Route::match(['get', 'post'], 'inbound', [TwilioWebhookController::class, 'index']);
        Route::match(['get', 'post'], 'voice', [VoiceWebhookController::class, 'index']);
        Route::match(['get', 'post'], 'voice/error', [VoiceWebhookController::class, 'errorCallback']);
        Route::match(['get', 'post'], 'message', [MessageWebhookController::class, 'index']);
        Route::match(['get', 'post'], 'message/error', [MessageWebhookController::class, 'errorCallback']);
    }); 
});


Route::get('/test-notification', function(){
    event(new NotificationEvent("hello"));
});


Route::prefix('auth')->group(function(){
    Route::post('register', [AuthController::class, 'register']);
    Route::get('user', [AuthController::class, 'user']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh-token', [AuthController::class, 'refreshToken']);
    Route::post('verify-email', [AuthController::class, 'verifyUserEmail']);
    Route::post('resend-email-verification-link', [AuthController::class, 'resendEmailVerificationLink']);
 

    Route::middleware(['auth:api'])->group(function(){
        Route::post('change-password', [PasswordController::class, 'changePassword']);
        Route::get('get-users', [AuthController::class, 'getUsers']);
        Route::apiResource('user-details', UserDetailController::class);
        Route::post('user-upstored/{id}', [UserDetailController::class, 'updateStoredUserDetails']);
        Route::middleware(['admin'])->group(function(){
            Route::put('blocked-user/{id}', [AuthController::class, 'blockedUser']);
            Route::delete('remove-user/{id}', [AuthController::class, 'deleteUser']);
            Route::post('confirm-email-user', [AuthController::class, 'confirmUserEmail']);
        });   
    });
});
    

Route::middleware(['auth:api'])->group(function(){  
    Route::prefix('customer')->group(function(){
        Route::apiResource('profile', ProfileController::class);
    });
   
    Route::apiResource('base-account', BaseAccountController::class)->middleware('admin');

    Route::prefix('event')->group(function(){
        Route::post('/test-notification', [VoiceEventController::class, 'store']);
        Route::apiResource('notification', NotificationEventController::class);
    });

    Route::prefix('analytics')->group(function(){
        Route::get('/get-counter-card', [CounterController::class, 'getCountersCard']);
    });
 });

