<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class StockRequest extends Model
{
    use SoftDeletes, Filtering, LogsActivity;

    /**
     * Stock Requests table.
     *
     * @var string
     */
    protected $table = 'stock_requests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'stock_requestable_from_id', 'stock_requestable_from_type', 'user_id',
        'stock_requestable_to_id', 'stock_requestable_to_type', 'number', 'status', 'approve_by'
    ];

    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    protected static $logAttributes = [
        'corporation_id', 'stock_requestable_from_id', 'stock_requestable_from_type', 'user_id',
        'stock_requestable_to_id', 'stock_requestable_to_type', 'number', 'status', 'approve_by'
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
        'stockRequestableFrom', 'stockRequestableTo',
        'approveBy', 'user', 'stockRequestItems'
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
                $model->user_id = auth('api')->user()->id;
            }
        });
    }

    /**
     * The stock request belongs to a corporation
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * Get all of the owning stock requestable from from models.
     */
    public function stockRequestableFrom()
    {
        return $this->morphTo();
    }

    /**
     * Get all of the owning stock requestable to from models.
     */
    public function stockRequestableTo()
    {
        return $this->morphTo();
    }

    /**
     * The stock request is approved by a user.
     *
     * @return object
     */
    public function approveBy()
    {
        return $this->belongsTo(User::class, 'approve_by');
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
    public function stockRequestItems()
    {
        return $this->hasMany(StockRequestItem::class);
    }
}
