<?php

namespace App\Http\Controllers\Api\Webhook\Twilio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TwilioWebhookController extends Controller
{
    public function index(Request $request){
        parse_str($request->getContent(), $payload);
        return response(['res'=>$payload],200);
    }
}
