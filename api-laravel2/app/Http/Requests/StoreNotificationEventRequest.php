<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNotificationEventRequest extends FormRequest
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
            'event' => ['required', 'string', 'min:2'],
            'direction' => ['required', 'string', 'min:2'],
            'base_account_number' => ['required', 'exists:base_accounts,account_number' ],
            'customer_account_number' => ['required', 'exists:customers,account_number'],
            'remarks' => ['required', 'string', 'size:1'], 
            'active' => ['required', 'boolean'],       
        ];
    }

    public function messages(): array
{
    return [
        'event.required' => 'The event field is required.',
        'event.string' => 'The event must be a string.',
        'event.min' => 'The event must be at least :min characters.',
        'direction.required' => 'The direction field is required.',
        'direction.string' => 'The direction must be a string.',
        'direction.min' => 'The direction must be at least :min characters.',
        // 'account_number.required' => 'The account number field is required.',
        // 'account_number.string' => 'The account number must be a string.',
        // 'customer_number.required' => 'The customer number field is required.',
        // 'customer_number.string' => 'The customer number must be a string.',
        'remarks.required' => 'The remarks field is required.',
        'remarks.string' => 'The remarks must be a string.',
        'remarks.size' => 'The remarks must be exactly :size character.',
        'active.required' => 'The active field is required.',
        'active.boolean' => 'The active field must be true or false.',
    ];
}
}
