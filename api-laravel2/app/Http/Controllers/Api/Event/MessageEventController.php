<?php

namespace App\Http\Controllers\Api\Event;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMessageEventRequest;
use App\Http\Requests\UpdateMessageEventRequest;
use App\Http\Resources\MessageEventResource;
use App\Models\MessageEvent;
use Illuminate\Http\Request;

class MessageEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MessageEvent::query()->orderBy('created_at', 'desc');
        return response(MessageEventResource::collection($query->get()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageEventRequest $request)
    {
        $data = $request->validated();
        $messageEvent = MessageEvent::create($data);
        return response(['message'=>'Created successfully', 'data' => new MessageEventResource($messageEvent)],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MessageEvent $messageEvent)
    {
        return response(new MessageEventResource($messageEvent), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMessageEventRequest $request, MessageEvent $messageEvent)
    {
        $data = $request->validated();
        $messageEvent->update($data);
        return response(['message' => 'Update successfully.', 'data' => new MessageEventResource($messageEvent)],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MessageEvent $messageEvent)
    {
        $messageEvent->delete();
        return response(['message', $messageEvent->id.' has been removed.', 'data' => new MessageEventResource($messageEvent)],200);
    }
}
