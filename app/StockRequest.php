<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StockRequest extends Model
{
    use SoftDeletes, Filtering;

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
        'corporation_id', 'stock_requestable_from_id', 'stock_requestable_from_type',
        'stock_requestable_to_id', 'stock_requestable_to_type', 'status', 'approve_by'
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
     * The invoice belongs to a corporation
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
     * The stock request has many stock request items.
     *
     * @return array object
     */
    public function stockRequestItems()
    {
        return $this->hasMany(StockRequestItem::class);
    }
}
