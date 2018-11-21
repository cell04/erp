<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class BillPayment extends Model
{
    use SoftDeletes, Filtering;
    
    /**
     * Bill Payments table.
     *
     * @var string
     */
    protected $table = 'bill_payments';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'bill_id', 'amount', 
        'mode_of_payment_id', 'cr_number', 'bank_name', 'check', 
        // 'bills_payment_date', 'bills_payment_number'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'corporation_id', 'bill_id', 'amount'
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
        'bill', 'modeOfPayment'
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
    }

    /**
     * The Bill payment belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     *  The Bill payment belongs to an invoice.
     *
     * @return object
     */
    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    /**
     *  The invoice payment belongs to an mode of payment.
     *
     * @return object
     */
    public function modeOfPayment()
    {
        return $this->belongsTo(ModeOfPayment::class);
    }
}
