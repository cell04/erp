<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $fillable = [
        'role_id', 'user_id'
    ];

    protected $with = [
        'user', 'role'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function role()
    {
        return $this>belongsTo(Role::class);
    }
}
