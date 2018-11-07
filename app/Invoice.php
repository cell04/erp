<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Invoices table.
     *
     * @var string
     */
    protected $table = 'invoices';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'quotation_id', 'contact_id',
        'user_id', 'reference_number', 'due_date',
        'amount', 'amount_paid', 'status'
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
        'quotation', 'invoiceItems', 'contact'
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

            if (auth('api')->user()) {
                $model->user_id = auth('api')->user()->id;
            }

            if (request()->headers->get('USER-ID')) {
                $model->user_id = request()->headers->get('USER-ID');
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
     * The invoice has many invoice items
     *
     * @return array object
     */
    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    /**
     * The invoice belongs to a receive order.
     *
     * @return object
     */
    public function quotation()
    {
        return $this->belongsTo(Quotation::class);
    }
}
