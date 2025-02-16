<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMessageEventRequest extends FormRequest
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
            'notification_id' => ['sometimes', 'exists:notifications,id'],
            'customer_id' => ['sometimes', 'exists:customers,id'],
            'user_id' => ['sometimes', 'exists:users,id'],
            'content' => ['sometimes', 'string'],
        ];
    }
}
