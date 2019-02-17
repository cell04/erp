<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemConversion extends Model
{
    use SoftDeletes, Filtering;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'item_id', 'conversion_id', 'module'
    ];

    protected $with = [
        'item', 'conversion'
    ];

     /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (request()->headers->get('CORPORATION-ID')) {
                $model->corporation_id = request()->headers->get('CORPORATION-ID');
            }
        });

        static::addGlobalScope(function ($model) {
            $model->where('corporation_id', request()->headers->get('CORPORATION-ID'));
        });
    }

    /**
     * The item conversion belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The item conversion belongs to a item.
     *
     * @return object
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The item conversion belongs to a conversion.
     *
     * @return object
     */
    public function conversion()
    {
        return $this->belongsTo(Conversion::class);
    }
}
