<?php

namespace App\Http\Controllers\Api\Event;


use App\Customs\Services\EventCustomerVerificationService;
use App\Customs\Accounts\NumberVerificationAccount;
use App\Events\NotificationEvent as PusherNotificationEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNotificationEventRequest;
use App\Http\Requests\StoreVoiceEventRequest;
use App\Http\Resources\NotificationEventResource;
use App\Models\NotificationEvent;
use Illuminate\Http\Request;

class VoiceEventController extends Controller
{
    //

    public function __construct(private EventCustomerVerificationService $inboundService, private NumberVerificationAccount $numberAccount)
    {
        
    }

    public function index(Request $request) {

    }


    public function store(StoreVoiceEventRequest $request){
  
        $data = $request->validated();     
        $baseAccountNumber = $data["base_account_number"];
        $customerAccountNumber = $data["customer_account_number"];
       
        $verifiedCustomer = $this->inboundService->sendPayloadVoice($baseAccountNumber, $customerAccountNumber, "inbound");

        $accounts = $this->numberAccount->getAccountProp($baseAccountNumber, $customerAccountNumber);
    
        $notifRequest = new StoreNotificationEventRequest([
            'event' => 'voice',
            'direction' => 'inbound',
            'customer_account_id' => $accounts["customer"]->id,
            'base_account_id' => $accounts["baseAccount"]->id,
            'remarks' => 'P',
            'active' => 1
        ]);
        $notification = NotificationEvent::create($notifRequest->all());
        if($notifRequest) {
            $payload = [
                "flag" => "create",
                "notification" => new NotificationEventResource($notification),
                "customer" => $verifiedCustomer["customer"],
            ];
            event(new PusherNotificationEvent($payload));
        }
    }
}
