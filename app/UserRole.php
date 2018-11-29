<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Traits\Filtering;

class UserRole extends Model
{   
    use SoftDeletes, Filtering;

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
