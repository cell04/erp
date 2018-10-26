<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReceiveOrderItem extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Receive Order Items table.
     *
     * @var string
     */
    protected $table = 'receive_order_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'receive_order_id', 'item_id', 'quantity', 'unit_of_measurement_id',
        'item_pricelist_id', 'tracking_number', 'status', 'expiration_date'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The receive order item belongs to an item.
     *
     * @return object
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The receive order item belongs to an item pricelist.
     *
     * @return object
     */
    public function itemPricelist()
    {
        return $this->belongsTo(ItemPricelist::class);
    }

    /**
     * The receive order item belongs to a unit of measurement.
     *
     * @return object
     */
    public function unitOfMeasurement()
    {
        return $this->belongsTo(UnitOfMeasurement::class);
    }
}
