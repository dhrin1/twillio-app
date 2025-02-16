<?php

namespace App\Http\Controllers\Api\Webhook\Twilio;

use App\Customs\Services\EventCustomerVerificationService;
use App\Events\NotificationEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVoiceEventRequest;
use App\Http\Resources\CustomerResource;
use App\Utils\Helper;
use Illuminate\Http\Request;
use SimpleXMLElement;

class VoiceWebhookController extends Controller
{


    public function __construct(private EventCustomerVerificationService $inboundService)
    {
        
    }
    // "Called": "+19898502429",
    // "ToState": "MI",
    // "CallerCountry": "PH",
    // "Direction": "inbound",
    // "CallerState": "",
    // "ToZip": "48735",
    // "CallSid": "CAabab7db5fbdac4dcfdd149cd62694827",
    // "To": "+19898502429",
    // "CallerZip": "",
    // "ToCountry": "US",
    // "StirVerstat": "TN-Validation-Passed-B",
    // "CallToken": "%7B%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FhYmFiN2RiNWZiZGFjNGRjZmRkMTQ5Y2Q2MjY5NDgyNyIsImZyb20iOiIrNjM5Nzc2MTcyNzMzIiwidG8iOiIrMTk4OTg1MDI0MjkiLCJpYXQiOiIxNzEwMTM3MTk0In0.qoTn6hB3mGIENzl3PoBnTmYJc45U6QiqASFPdx3g7JhAsTJylTboKlj9eBqvJr2ATP19i6GjAxXib3aW1-k89A%22%2C%22identityHeaderTokens%22%3A%5B%5D%7D",
    // "CalledZip": "48735",
    // "ApiVersion": "2010-04-01",
    // "CalledCity": "GAGETOWN",
    // "CallStatus": "ringing",
    // "From": "+639776172733",
    // "AccountSid": "ACb002586a414ad05aa4d503471206195a",
    // "CalledCountry": "US",
    // "CallerCity": "",
    // "ToCity": "GAGETOWN",
    // "FromCountry": "PH",
    // "Caller": "+639776172733",
    // "FromCity": "",
    // "CalledState": "MI",
    // "FromZip": "",
    // "FromState": ""

    // $callStatus = $payload["CallStatus"];  //initiated, ringing, answered, completed
    // $callToken = $payload["CallToken"];
    // $type = $payload["Direction"]; //inbound || outbound

    // $accountNumber = $payload["Called"]; 
    // $callerCountry = $payload["CallerCountry"];
    // $accountCountry = $payload["CalledCountry"];

    // $toZipNum = $payload["ToZip"];

    // $callId = $payload["CallSid"];
    // $toNumber = $payload["To"]; //+19898502429 -- reciever
    // $fromNumber = $payload["From"]; //+639776172733 -- caller

    // //address
    // $toCountry = $payload["ToCountry"];
    // $toCity = $payload["CalledCity"];
    // $toZipCode = $payload["CalledZip"];
    // $fromCountry = $payload["FromCountry"];

    // $accountSid = $payload["AccountSid"];

    // Return the parsed data as JSON response
    // return response()->json(['res' => $payload], 200);
    
    public function index(Request $request)
    {
        parse_str($request->getContent(), $payload);    
    

        if($payload["Direction"] == "inbound"){
            $toNumber = $payload["To"];
            $fromNumber = $payload["From"];

            $validStatus = ["ringing", "answered"]; //intersect, ringing, answered
            $filteredStatus = array_intersect([$payload["CallStatus"]], $validStatus);
         
            if(!empty($filteredStatus)){
                $inboundVoice = $this->inboundService->sendPayloadVoice($toNumber, $fromNumber, $payload["Direction"]);
               
                $response = response($inboundVoice);
                $response->header('Content-Type', 'text/xml');
                
                return $response;
                // event(new NotificationEvent($inboundVoice));
            }
        }
    
    }

    public function errorCallback(Request $request){
        parse_str($request->getContent(), $postData);
    }

    
  
}
