<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes, Filtering;

    protected $fillable = [
        'name', 'display_name', 'description'
    ];

    public function userRole()
    {
        return $this->hasOne(UserRole::class, 'role_id');
    }
}
