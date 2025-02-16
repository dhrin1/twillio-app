<?php

namespace App\Http\Resources;

use App\Utils\Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'customer_id' => $this->id,
            'account_number' => Helper::standardizedAccountNumber($this->account_number),
            'name' => $this->name,
            'address' => $this->address,
            'created_at' => $this->created_at->format("F d, Y H:i A"),
            'updated_at' => $this->updated_at->format("F d, Y H:i A"),
        ];
    }
}
