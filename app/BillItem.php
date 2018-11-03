<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

// use Spatie\Activitylog\Traits\LogsActivity;

class BillItem extends Model
{
    use SoftDeletes, Filtering;

    protected $table = 'bill_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'bill_id', 'item_id', 'unit_of_measurement_id',
        'quantity', 'price'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'bill_id', 'item_id', 'unit_of_measurement_id',
    //     'quantity', 'price'
    // ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * Eager load relationships.
     *
     * @var array
     */
    protected $with = [
        'item', 'unitOfMeasurement'
    ];

    /**
     * The bill item belongs to an bill.
     *
     * @return object
     */
    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    /**
     * The invoice item belongs to an item.
     *
     * @return object
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The invoice item belongs to a unit of measurement.
     *
     * @return object
     */
    public function unitOfMeasurement()
    {
        return $this->belongsTo(UnitOfMeasurement::class);
    }
}
