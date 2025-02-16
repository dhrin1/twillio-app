<?php

namespace App\Customs\Services;

use App\Http\Resources\CustomerResource;
use App\Models\BaseAccount;
use App\Models\Customer;

class EventCustomerVerificationService{

   /**
    * The function creates a new customer with the provided account number.
    * 
    * @param string account_number The `createCustomer` function is a method that creates a new
    * customer record in the database with the provided account number. The function takes a single
    * parameter `account_number`, which is a string representing the account number of the customer
    * being created.
    * 
    * @return The `createCustomer` function is returning a new `Customer` instance with the provided
    * `account_number` value.
    */
    public function createCustomer(string $account_number){
        return Customer::create([
            'account_number' => $account_number,
        ]);
    }

    /**
     * The function `verifyCustomer` checks if a customer with a given account number exists, and
     * creates a new customer if not.
     * 
     * @param string account_number The `verifyCustomer` function takes an account number as a
     * parameter. It checks if a customer with the provided account number already exists in the
     * database. If the customer exists, it returns the customer data with a status of "exist". If the
     * customer does not exist, it creates a new customer using
     * 
     * @return The `verifyCustomer` function returns an array with two keys: "status" and "data". If a
     * customer with the provided account number is found in the database, the function returns an
     * array with "status" set to "exist" and the customer data in the "data" key. If no customer is
     * found, a new customer is created using the `createCustomer` method and the function
     */
    public function verifyCustomer(string $account_number) {
        $customer = Customer::where('account_number', $account_number)->first();
        if(!$customer){
           $newCustomer = $this->createCustomer($account_number);
           return ["status"=> "new" , "data" => $newCustomer];
        }
        return ["status" => "exist", "data" => $customer];
    }   



   /**
    * The function `sendPayloadVoice` constructs and returns a payload for a voice event with customer
    * data based on the provided account numbers and direction.
    * 
    * @param string base_account_number The `base_account_number` parameter in the `sendPayloadVoice`
    * function is a string that represents the base account number to which the voice payload is being
    * sent. This parameter is used to identify the account to which the voice payload is associated.
    * @param string account_number The `sendPayloadVoice` function takes three parameters:
    * @param string direction The `direction` parameter in the `sendPayloadVoice` function represents
    * the direction of the voice event. It could indicate whether the voice event is incoming or
    * outgoing, for example. This parameter helps in determining the type of voice event being
    * processed.
    * 
    * @return An array is being returned with the following structure:
    * ```php
    * [
    *     "event" => "voice",
    *     "eventType" => ,
    *     "base_account" => ,
    *     "customer" => [
    *         "data" => new CustomerResource(["data"]),
    *         "status" => ["status"]
    *     ]
    * ]
    * ```
    */
    public function sendPayloadVoice(string $base_account_number, string $account_number, string $direction){
        $customer = $this->verifyCustomer($account_number);
        return [
            "event" =>  "voice",
            "eventType" => $direction,
            "base_account" => $base_account_number,
            "customer" => [
                "data" => new CustomerResource($customer["data"]),
                "status" => $customer["status"]
            ]   
        ];
    }

}