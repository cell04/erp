<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bill extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Bills table.
     *
     * @var string
     */
    protected $table = 'bills';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'receive_order_id', 'contact_id', 'user_id', 
        'reference_number', 'due_date', 'amount','amount_paid', 'status', 
        // 'taxable', 'taxable_value', 'tax', 
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
        'receiveOrder', 'billItems', 'contact', 'user'
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

            if (request()->headers->get('USER-ID')) {
                $model->user_id = request()->headers->get('USER-ID');
            }

            if (auth('api')->user()) {
                $model->user_id = auth('api')->user()->id;
            }
        });
    }

    /**
     * The invoice belongs to a contact.
     *
     * @return object
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
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
     * The invoice has many bill items
     *
     * @return array object
     */
    public function billItems()
    {
        return $this->hasMany(BillItem::class);
    }

    /**
     * The invoice belongs to a receiveOrder.
     *
     * @return object
     */
    public function receiveOrder()
    {
        return $this->belongsTo(ReceiveOrder::class);
    }

    /**
     * The invoice belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
