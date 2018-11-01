<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class InvoiceItem extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Invoice Items table.
     *
     * @var string
     */
    protected $table = 'invoice_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'invoice_id', 'item_id', 'unit_of_measurement_id',
        'quantity', 'item_pricelist_id'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'invoice_id', 'item_id', 'unit_of_measurement_id',
    //     'quantity', 'item_pricelist_id'
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
        'item', 'unitOfMeasurement', 'itemPricelist'
    ];

    /**
     * The invoice item belongs to an invoice.
     *
     * @return object
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
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

    /**
     * The invoice item belongs to an item pricelist
     *
     * @return object
     */
    public function itemPricelist()
    {
        return $this->belongsTo(ItemPricelist::class);
    }
}
