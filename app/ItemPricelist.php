<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class ItemPricelist extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Item Pricelists table.
     *
     * @var string
     */
    protected $table = 'item_pricelists';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'item_id', 'price'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'corporation_id', 'item_id', 'price'
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
        'item'
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
     * The item pricelist belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The item pricelist belongs to an item.
     *
     * @return object
     */
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
