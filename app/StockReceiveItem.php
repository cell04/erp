<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class StockReceiveItem extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Stock Receive Items table.
     *
     * @var string
     */
    protected $table = 'stock_receive_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'stock_receive_id',
        'item_id', 'quantity', 'unit_of_measurement_id'
    ];

    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    // protected static $logAttributes = [
    //     'corporation_id', 'stock_receive_id',
    //     'item_id', 'quantity', 'unit_of_measurement_id'
    // ];

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
     * The stock receive item belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The stock receive item belongs to a stock receive
     *
     * @return object
     */
    public function stockReceive()
    {
        return $this->belongsTo(StockReceive::class);
    }

    /**
     * The stock receive item belongs to an item.
     *
     * @return object
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The stock receive item belongs to a unit of measurement.
     *
     * @return object
     */
    public function unitOfMeasurement()
    {
        return $this->belongsTo(UnitOfMeasurement::class);
    }
}
