<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
// use Spatie\Activitylog\Traits\LogsActivity;

class Quotation extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Quotations table.
     *
     * @var string
     */
    protected $table = 'quotations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'user_id', 'contact_id', 'quotable_id',
        'quotable_type', 'number', 'amount', 'status', 'approved_by'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'corporation_id', 'user_id', 'contact_id', 'quotable_id',
    //     'quotable_type', 'number', 'amount', 'status', 'approved_by'
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
        'quotable',
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
    }

    /**
    * The quotations belongs to a corporation.
    *
    * @return object
    */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The quotations belongs to a contact.
     *
     * @return object
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * The quotations belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The quotations belongs to a user.
     *
     * @return object
     */
    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * The quotations has many quotation items.
     *
     * @return object
     */
    public function quotationItems()
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function quotable()
    {
        return $this->morphTo();
    }
}
