<?php

namespace App\Customs\Accounts;

use App\Models\BaseAccount;
use App\Models\Customer;

class NumberVerificationAccount{


    public function getAccountProp(string $base_account_number, string $customer_account_number) {
        $customer =  Customer::where('account_number', $customer_account_number)->first();
        $base = BaseAccount::where('account_number', $base_account_number)->first();

        if(!$customer) {
            response()->json([
                'status' => 'error',
                'message' => 'Customer is not exists.'
            ])->send();
            exit;
        }

        if(!$base){
            response()->json([
                'status' => 'error',
                'message' => 'BaseAccount is not exists'
            ])->send();
            exit;
        }

        return ["customer" =>  $customer, "baseAccount" => $base];
    }
   

}