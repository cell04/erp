<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class UnitOfMeasurement extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Unit Of Measurement table.
     *
     * @var string
     */
    protected $table = 'unit_of_measurements';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'name', 'abbreviation', 'default_value', 'base_unit_id'
    ];

    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    // protected static $logAttributes = [
    //     'corporation_id', 'name', 'abbreviation'
    // ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    protected $with = [
        'baseUnit'
    ];

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

        static::addGlobalScope(function ($model) {
            $model->where('corporation_id', request()->headers->get('CORPORATION-ID'));
        });
    }

    /**
     * The unit of measurement has many conversions.
     *
     * @return array object
     */
    public function conversions()
    {
        return $this->hasMany(Conversion::class);
    }

    /**
     * The unit of measurement has many from conversions.
     *
     * @return array object
     */
    public function fromConversions()
    {
        return $this->hasMany(Conversion::class, 'unit_of_measurement_from_id');
    }

    /**
     * The unit of measurement has many to conversions.
     *
     * @return array object
     */
    public function toConversions()
    {
        return $this->hasMany(Conversion::class, 'unit_of_measurement_to_id');
    }

    /**
     * The unit of measurement has many purchase order items.
     *
     * @return array object
     */
    public function purchaseOrderItems()
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    /**
     * The unit of measurement has many receive order items.
     *
     * @return array object
     */
    public function receiveOrderItems()
    {
        return $this->hasMany(ReceiveOrderItem::class);
    }

    /**
     * The unit of measurement has many base unit.
     *
     * @return array object
     */
    public function baseUnit()
    {
        return $this->belongsTo(UnitOfMeasurement::class);
    }
}
