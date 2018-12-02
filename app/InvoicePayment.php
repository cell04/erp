<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class InvoicePayment extends Model
{
    use SoftDeletes, Filtering;
    
    /**
     * Invoice Payments table.
     *
     * @var string
     */
    protected $table = 'invoice_payments';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'invoice_id', 'amount', 'payment_for',
        'mode_of_payment_id', 'cr_number', 'bank_name', 'check',
        'invoice_payment_number', 'invoice_payment_date'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'corporation_id', 'invoice_id', 'amount'
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
        'invoice', 'modeOfPayment'
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
     * The invoice payment belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     *  The invoice payment belongs to an invoice.
     *
     * @return object
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
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
