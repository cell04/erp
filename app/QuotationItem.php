<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class QuotationItem extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Quotation Items table.
     *
     * @var string
     */
    protected $table = 'quotation_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quotation_id', 'item_id', 'quantity',
        'unit_of_measurement_id', 'price', 'status'
    ];
    
    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    // protected static $logAttributes = [
    //     'quotation_id', 'item_id', 'quantity',
    //     'unit_of_measurement_id', 'price', 'status'
    // ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The quotation item belongs to quotation.
     *
     * @return object
     */
    public function quotation()
    {
        return $this->belongsTo(Quotation::class);
    }

    /**
     * The quotation item belongs to an item.
     *
     * @return object
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The quotation item belongs to a unit of measurement.
     *
     * @return object
     */
    public function unitOfMeasurement()
    {
        return $this->belongsTo(UnitOfMeasurement::class);
    }
}
