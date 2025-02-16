<?php

namespace App\Http\Controllers\Api\Webhook\Twilio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageWebhookController extends Controller
{
    public function index(Request $request){
        return response(['res'=>$request->json()->all()],200);
    }

    public function errorCallback(Request $request){
        parse_str($request->getContent(), $postData);
        return response(['res'=>$postData],200);
    }
}
