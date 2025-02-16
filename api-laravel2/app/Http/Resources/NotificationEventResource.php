<?php

namespace App\Http\Resources;

use App\Utils\Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationEventResource extends JsonResource
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
            'event' => $this->event,
            'direction' => $this->direction,
            'base_account' =>  $this->baseAccount ? [
                'account_number' =>  Helper::standardizedAccountNumber($this->baseAccount->account_number),
                'name' =>  $this->baseAccount->name,
            ] : null, 
            'customer_account' => $this->customer ? [
                'id' => $this->customer_account_id, 
                'account_number' =>  Helper::standardizedAccountNumber($this->customer->account_number),
                'name' =>  $this->customer->name,
            ]:null, 
            'remarks' => $this->remarks,
            'active' => (bool) $this->active,
            'originCountry' => $this->origin_country,
            'created_at' => $this->created_at->format('F d, Y H:i A')
        ];
    }
}
