<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'notification_id',
        'customer_id',
        'user_id',
        'content',
    ];


    public function notification()
    {
        return $this->hasMany(NotificationEvent::class, 'account_number');
    }

    public function users() {
        return $this->hasMany(User::class);
    }

    public function baseAccount() {
        return $this->belongsTo(BaseAccount::class);
    }
}
