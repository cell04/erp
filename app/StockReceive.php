<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockReceive extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Stock Receives table.
     *
     * @var string
     */
    protected $table = 'stock_receives';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'stock_transfer_id', 'stock_receivable_from_id',
        'stock_receivable_from_type', 'stock_receivable_to_id', 'stock_receivable_to_type'
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
     * The stock receive belongs to a corporation
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The stock receive belongs to a user
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The stock receive belongs to a stock transfer.
     *
     * @return object
     */
    public function stockTransfer()
    {
        return $this->belongsTo(StockTransfer::class);
    }

    /**
     * Get all of the owning stock receiveable from from models.
     */
    public function stockReceivableFrom()
    {
        return $this->morphTo();
    }

    /**
     * Get all of the owning stock receiveable to from models.
     */
    public function stockReceivableTo()
    {
        return $this->morphTo();
    }

    /**
     * The stock receive has many stock receive items.
     *
     * @return array object
     */
    public function stockReceiveItems()
    {
        return $this->hasMany(StockReceiveItem::class);
    }

    public function stocks()
    {
        return $this->morphMany(Stock::class, 'stockable');
    }
}
