<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "email" => $this->email,
            "verified_date" => $this->email_verified_at ?  $this->email_verified_at->format('F d, Y H:i A') : null,
            "designation" => optional($this->details)->designation,
            "address" => optional($this->details)->address,
            "role" => $this->role->name,
            "created_at" => $this->created_at->format('F d, Y H:i A'),
            "status" => (bool) $this->status
        ];
    }
}
