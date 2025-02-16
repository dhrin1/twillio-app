<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'prefix',
        'account_number' ,
        'name', 
        'department', 
        'provider_url', 
    ];
}
