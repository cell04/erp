<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Items table.
     *
     * @var string
     */
    protected $table = 'items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'item_type_id', 'item_classification_id','name', 'description',
        'stock_keeping_unit'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * Run functions on boot.
     *
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (request()->headers->get('CORPORATION-ID')) {
                $model->corporation_id = request()->headers->get('CORPORATION-ID');
            }
        });
    }

    /**
     * Eager load relationships.
     *
     * @var array
     */
    protected $with = [
        'itemType', 'itemClassification'
    ];

    /**
     * The item belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The item belongs to an item type.
     *
     * @return object
     */
    public function itemType()
    {
        return $this->belongsTo(ItemType::class);
    }

    /**
     * The item the belongs to an item classification.
     *
     * @return object
     */
    public function itemClassification()
    {
        return $this->belongsTo(ItemClassification::class);
    }

    /**
     * The item belongs to a purchase unit of measurement.
     *
     * @return object
     */
    public function purchaseUnitOfMeasurement()
    {
        return $this->belongsTo(UnitOfMeasurement::class, 'purchase_unit_of_measurement_id');
    }

    /**
     * The item belongs to a default unit of measurement.
     *
     * @return object
     */
    public function defaultUnitOfMeasurement()
    {
        return $this->belongsTo(UnitOfMeasurement::class, 'default_unit_of_measurement_id');
    }
}
