<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoiceEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'notification_id',
        'customer_id',
        'user_id',
        'duration',
        'status'
    ];


    public function notification() {
        return $this->hasOne(NotificationEvent::class);
    }

    public function customer() {
        return $this->hasOne(Customer::class);
    }

    public function user() {
        return $this->hasOne(User::class)->select('id', 'name', 'email');
    }
}
