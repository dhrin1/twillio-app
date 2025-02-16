<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateCustomerRequest extends FormRequest
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
            'account_number' => [
                'sometimes',
                'string',
                Rule::unique('base_accounts')->where(function ($query) {
                    return $query->where('account_number', $this->input('prefix') . $this->input('account_number'));
                })
            ],
            'name' => ['sometimes', 'string', 'min:2'],
            'address' => ['sometimes', 'string', 'max:255'],
            'status' => ['sometimes', 'boolean'],
        ];
    }
}
