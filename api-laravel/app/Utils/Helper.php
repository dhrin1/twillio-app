<?php

namespace App\Utils;

class Helper
{
    public static function generateRandomString($length = 10)
    {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    }

    public static function  standardizedAccountNumber(string $account_number){
        return "+".$account_number;
    }
}