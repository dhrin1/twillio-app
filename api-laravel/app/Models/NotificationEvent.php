<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'event',
        'direction',
        'base_account_id',
        'customer_account_id',
        'remarks',
        'active',
        'origin_country',
        'status'
    ];


    public function customer()
    {
        return $this->hasOne(Customer::class, 'id', 'customer_account_id')->select('account_number', 'name');
    }

    public function baseAccount()
    {
        return $this->hasOne(BaseAccount::class, 'id', 'base_account_id')->select('account_number', 'name');
    }
}
