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

    protected $with = [
        'corporations'
    ];

    public function image()
    {
        return  $this->morphOne(Image::class, 'imageable');
    }

    public function userRole()
    {
        return $this->hasOne(UserRole::class);
    }

    public function corporations()
    {
        return $this->belongsToMany(Corporation::class);
    }

    public static function boot()
    {
        parent::boot();

        static::addGlobalScope(function ($model) {
            if (request()->headers->get('CORPORATION-ID')) {
                $model->whereHas('corporations', function($query) {
                    $query->where('corporation_id', request()->headers->get('CORPORATION-ID'));
                });   
            }
        });
    }
}
