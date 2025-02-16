<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageEventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'notification' => $this->notication->only(['id', 'account_number']),
            'customer' => $this->customer->only(['id', 'account_number']),
            'user_employee' => $this->users->only(['id', 'name']),
            'content' => $this->content,
            'created_at' => $this->created_at
        ];
    }
}
