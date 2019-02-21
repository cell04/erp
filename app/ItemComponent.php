<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ItemComponent extends Model
{
    use SoftDeletes, Filtering;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'item_id', 'component_id','quantity', 'unit_price',
        'converter_value', 'unit_of_measurement_id'
    ];

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
        'component', 
    ];

    /**
     * The item component belongs to a item.
     *
     * @return object
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The item component belongs to component
     *
     * @return object
     */
    public function component()
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * The item component belongs to unit of measurement
     *
     * @return object
     */
    public function unitOfMeasurement()
    {
        return $this->belongsTo(UnitOfMeasurement::class);
    }
}
