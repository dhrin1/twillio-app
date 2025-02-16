<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class StoreBaseAccountRequest extends FormRequest
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
            'prefix' => ['required', 'string'],
            'account_number' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $combinedNumber = $this->input('prefix') . $value;
                    $existingRecord = DB::table('base_accounts')
                        ->where('account_number', $combinedNumber)
                        ->exists();
    
                    if ($existingRecord) {
                        $fail('The account number has already been taken.');
                    }
                },
            ],
            'name' => ['required', 'string', 'min:2'],
            'department' => ['required', 'string', 'max:255'],
            'provider_url' => ['required', 'string', 'max:255'], 
        ];
    }

    public function messages(): array
    {
        return [
            'prefix.required' => 'The prefix field is required.',
            'prefix.string' => 'The prefix must be a number.',
            'account_number.required' => 'The account number field is required.',
            'account_number.string' => 'The account number must be a number.',
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.min' => 'The name must be at least :min characters.',
            'department.required' => 'The department field is required.',
            'department.string' => 'The department must be a string.',
            'department.max' => 'The department may not be greater than :max characters.',
            'provider_url.required' => 'The provider URL field is required.',
            'provider_url.string' => 'The provider URL must be a string.',
            'provider_url.max' => 'The provider URL may not be greater than :max characters.',
        ];
    }
}
