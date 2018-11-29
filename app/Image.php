<?php

namespace App;

use App\Traits\Filtering;
use App\Traits\Imaging;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes, Filtering, Imaging;

    protected $fillable =   [
        'image', 'imageable_id', 'imageable_type'
    ];

    protected $dates = ['deleted_at'];

    public function imageable()
    {
        return  $this->morphTo();
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            static::storeImage($model);
        });

        static::updating(function ($model) {     
            static::updateImage($model);
        });

        static::deleting(function ($model) {
            static::deleteImage($model);
        });
    }
}
