<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Contact extends Model
{
    use SoftDeletes, Filtering, Notifiable;

    /**
     * Contacts table.
     *
     * @var string
     */
    protected $table = 'contacts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'contact_type_id', 'company', 'company_address',
        'person', 'email', 'mobile_number', 'credit_limit', 'account_id',
        'mode_of_payment_id', 'bank_name', 'payment_term', 'business_type'
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

        static::addGlobalScope(function ($model) {
            $model->where('corporation_id', request()->headers->get('CORPORATION-ID'));
        });
    }

    /**
     * Eager load relationships.
     *
     * @var array
     */
    protected $with = [
        'contactType', 'modeOfPayment'
    ];

    /**
     * The contact belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The contact belongs to a contact type.
     *
     * @return object
     */
    public function contactType()
    {
        return $this->belongsTo(ContactType::class);
    }

    /**
     * The contact belongs to a mode of payment
     *
     * @return object
     */
    public function modeOfPayment()
    {
        return $this->belongsTo(ModeOfPayment::class);
    }
}
