<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BaseAccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'prefix' => $this->prefix,
            'account_number' => $this->account_number,
            'phone_number' => substr($this->account_number, strlen($this->prefix)),
            'name' => $this->name,
            'department' => $this->department,
            'provider_url' => $this->provider_url,
            'created_at' => $this->created_at->format("F d, Y H:i A")
        ];
    }
}
