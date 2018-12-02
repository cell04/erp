<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class ReceiveOrder extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Receive Order table.
     *
     * @var string
     */
    protected $table = 'receive_orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'purchase_order_id', 'contact_id',
        'user_id', 'reference_number', 'status'
    ];

    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    // protected static $logAttributes = [
    //     'corporation_id', 'purchase_order_id', 'contact_id',
    //     'user_id', 'reference_number', 'status'
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
        'contact'
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

            $model->user_id = auth('api')->user()->id;
        });

        static::addGlobalScope(function ($model) {
            $model->where('corporation_id', request()->headers->get('CORPORATION-ID'));
        });
    }

    /**
     * The receive order belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The receive order belongs to a contact.
     *
     * @return object
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * The receive order belongs to a purchase order.
     *
     * @return object
     */
    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    /**
     * The receive order belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The receive order has many receive order items.
     *
     * @return object
     */
    public function receiveOrderItems()
    {
        return $this->hasMany(ReceiveOrderItem::class);
    }

    /**
     * The receive order has many receive order items.
     *
     * @return object
     */
    public function bills()
    {
        return $this->hasMany(Bill::class);
    }
}
