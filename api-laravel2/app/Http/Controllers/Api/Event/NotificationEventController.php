<?php

namespace App\Http\Controllers\Api\Event;

use App\Customs\Services\EventCustomerVerificationService;
use App\Customs\Accounts\NumberVerificationAccount;
use App\Customs\Services\RequestOriginService;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNotificationEventRequest;
use App\Http\Requests\UpdateNotificationEventRequest;
use App\Http\Resources\NotificationEventResource;
use App\Models\NotificationEvent;
use Illuminate\Http\Request;
use App\Events\NotificationEvent as PusherNotificationEvent;

class NotificationEventController extends Controller
{

    public function __construct(private RequestOriginService $requestOrigin, private EventCustomerVerificationService $inboundService, private NumberVerificationAccount $numberAccount )
    {
        $this->middleware('admin')->only(['destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = NotificationEvent::query()->where('status', 1)->orderBy('created_at', 'desc');
        if($request->has('type')) {
            $query->where('event', $request->input('event'));
        }

        return [
            "data" => NotificationEventResource::collection($query->get()),
            "pending_calls" => $query->where('remarks', 'P')->count() 
        ];
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotificationEventRequest $request)
    {
       
        $data = $request->validated();
        $data["origin_country"] = $this->requestOrigin->details()->country_code;
        
        $accounts = $this->numberAccount->getAccountProp($data["base_account_number"], $data["customer_account_number"]);

        $data["base_account_id"] = $accounts["baseAccount"]->id;
        $data["customer_account_id"] = $accounts["customer"]->id;

        $notificationEvent = NotificationEvent::create($data);
        return response(['message'=> 'Created successfully', 'data' => new NotificationEventResource($notificationEvent)],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(NotificationEvent $notification)
    {
        return response(new NotificationEventResource($notification));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotificationEventRequest $request, NotificationEvent $notification)
    {
        $data = $request->validated();
        $notification->update($data);
        if((bool) $notification->status) {
            $payload = [
                "flag" => "update",
                "notification" => new NotificationEventResource($notification),
                "customer" =>  $this->inboundService->sendPayloadVoice($notification->baseAccount->account_number, $notification->customer->account_number, "inbound")["customer"]
            ];
            event(new PusherNotificationEvent($payload));
        }
      
        return response(['message'=>'Update successfully!', 'data'=>new NotificationEventResource($notification)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NotificationEvent $notification)
    {
        $notification->delete();
        return response(['messagee' => 'Removed successsfully.', 'data' => new NotificationEventResource($notification)]);
    }
}
