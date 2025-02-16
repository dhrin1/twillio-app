<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNotificationEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'event' => ['sometimes', 'string', 'min:2'],
            'direction' => ['sometimes', 'string', 'min:2'],
            'base_account_number' => ['sometimes', 'exists:base_accounts,account_number'],
            'customer_account_number' => ['sometimes', 'exists:customers,account_number'],
            'remarks' => ['sometimes', 'string', 'size:1'], 
            'active' => ['sometimes', 'boolean'],  
            'status' => ['sometimes', 'boolean'],       
        ];
    }
}
