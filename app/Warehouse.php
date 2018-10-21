<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Warehouse extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Warehouses table.
     *
     * @var string
     */
    protected $table = 'warehouses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'name', 'address', 'city', 'zip_code',
        'country', 'telephone_number', 'status'
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
     * The warehouse belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The branch has many stocks.
     *
     * @return object
     */
    public function stocks()
    {
        return $this->morphMany(Stock::class, 'stockable');
    }

    public function stockRequestFrom()
    {
        return $this->morphMany(StockRequest::class, 'stock_requestable_from');
    }

    public function stockRequestTo()
    {
        return $this->morphMany(StockRequest::class, 'stock_requestable_to');
    }
}
