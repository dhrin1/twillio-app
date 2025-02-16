<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class UpdateBaseAccountRequest extends FormRequest
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
            'prefix' => ['sometimes', 'string'],
            'account_number' => [
                'sometimes', 
                'string', 
            ],
            'name' => ['sometimes', 'string', 'min:2'],
            'department' => ['sometimes', 'string', 'max:255'],
            'provider_url' => ['sometimes', 'string', 'max:255'], 
        ];
    }

    public function messages(): array
    {
        return [
            'prefix.string' => 'The prefix must be a number.',
            'account_number.required' => 'The account number field is required.',
            'account_number.string' => 'The account number must be a number.',
            'name.string' => 'The name must be a string.',
            'name.min' => 'The name must be at least :min characters.',
            'department.string' => 'The department must be a string.',
            'department.max' => 'The department may not be greater than :max characters.',
            'provider_url.string' => 'The provider URL must be a string.',
            'provider_url.max' => 'The provider URL may not be greater than :max characters.',
        ];
    }
}
