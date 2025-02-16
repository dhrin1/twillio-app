<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoiceEventRequest extends FormRequest
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
            'base_account_number' => ['required', 'string' ,'exists:base_accounts,account_number'],
            'customer_account_number' => ['required',  'string'],
        ];
    }


    public function messages(): array
    {
        return [
            'base_account_number.required' => 'The base account number field is required.',
            'base_account_number.string' => 'The base account number must be a string.',
            'base_account_number.exists' => 'The selected base account number is invalid.',
            'customer_account_number.required' => 'The customer account number field is required.',
            'customer_account_number.string' => 'The customer account number must be a string.',
        ];
    }
}
