<?php

namespace App;

use App\StockTransferItem;
use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockTransfer extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Stock Transfers table.
     *
     * @var string
     */
    protected $table = 'stock_transfers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'stock_request_id', 'stock_transferable_from_id', 'stock_transferable_from_type', 'user_id',
        'stock_transferable_to_id', 'stock_transferable_to_type', 'status'
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
                $model->user_id = auth('api')->user()->id;
            }
        });
    }

    /**
     * The stock transfer belongs to a corporation
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * Get all of the owning stock transferable from from models.
     */
    public function stockTransferableFrom()
    {
        return $this->morphTo();
    }

    /**
     * Get all of the owning stock transferable to from models.
     */
    public function stockTransferableTo()
    {
        return $this->morphTo();
    }

    /**
     * The stock request is created by a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The stock request has many stock request items.
     *
     * @return array object
     */
    public function stockTransferItems()
    {
        return $this->hasMany(StockTransferItem::class);
    }
}
