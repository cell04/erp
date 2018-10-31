<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class PurchaseOrder extends Model
{
    use SoftDeletes, Filtering, LogsActivity;

    /**
     * Purchase Orders table.
     *
     * @var string
     */
    protected $table = 'purchase_orders';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'user_id', 'reference_number',
        'warehouse_id', 'contact_id', 'amount', 'status'
    ];

    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    protected static $logAttributes = [
        'corporation_id', 'user_id', 'reference_number',
        'warehouse_id', 'contact_id', 'amount', 'status'
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

            $model->user_id = auth('api')->user()->id;
        });
    }

    /**
     * The purchase order belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The purchase order belongs to a contact.
     *
     * @return object
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * The purchase order belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The purchase order has many receive orders.
     *
     * @return array object
     */
    public function receiveOrders()
    {
        return $this->hasMany(ReceiveOrder::class);
    }

    /**
     * The purchase order belongs to a warehouse.
     *
     * @return object
     */
    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * The purchase order has many purchase order items.
     *
     * @return object
     */
    public function purchaseOrderItems()
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }
}
