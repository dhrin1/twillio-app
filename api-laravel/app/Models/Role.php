<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

   /**
    * The function `users()` defines a relationship where an object has many instances of the User
    * class in PHP.
    * 
    * @return The code snippet is defining a method named `users` that returns a relationship where the
    * current model has many `User` instances. The method is using the `hasMany` relationship method
    * provided by Laravel's Eloquent ORM.
    */
    public function users(){
        return $this->hasMany(User::class);
    }
}
