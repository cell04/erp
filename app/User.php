<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes, Filtering;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'mobile_number'
    ];

    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    // protected static $logAttributes = [
    //     'name', 'email', 'password',
    // ];

    protected $dates = ['deleted_at'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    // protected $with = [
    //     'userRole'
    // ];

    public function image()
    {
        return  $this->morphOne(Image::class, 'imageable');
    }

    public function userRole()
    {
        return $this->hasOne(UserRole::class);
    }
}
