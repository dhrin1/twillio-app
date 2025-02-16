<?php

namespace App\Customs\Services;

use Illuminate\Support\Facades\Hash;

class PasswordService
{

    private function validateCurrentPassword($curPassword)
    {
        if(!password_verify($curPassword, auth()->user()->password))
        {
            response()->json([
                'status' => 'failed',
                'message' => 'Password is not match to the current password.'
             ], 422)->send();
             exit;
        }
    }

    public function changePassword($data)
    {
       
        $this->validateCurrentPassword($data['current_password']);
        $updatePassword = auth()->user()->update(['password' => Hash::make($data['password'])]);
        if($updatePassword) {
            return response()->json([
                'status' => 'success',
                'message' => 'Password changed successsfully.'
            ],200);
        }else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Error to update password',    
            ],422);
        }

    }
}