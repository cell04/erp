<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voucher extends Model
{
    use SoftDeletes, Filtering;
    
    /**
     * Vouchers table.
     *
     * @var string
     */
    protected $table = 'vouchers';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'user_id', 'verified_by', 'approved_by', 'contact_id',
        'journal_id', 'number', 'reference_number', 'memo', 'amount', 'status', 'posting_period'
    ];
    
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * Eager load relationships
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
            $model->corporation_id = request()->headers->get('CORPORATION-ID');
            // $model->user_id = auth('api')->user()->id;
            // if ($model->status == 1) {
            //     $model->approved_by = auth('api')->user()->id;
            // }
        });

        static::addGlobalScope(function ($model) {
            $model->where('corporation_id', request()->headers->get('CORPORATION-ID'));
        });
    }

    /**
     * The department belongs to a corporation
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The voucher is approved by a user.
     *
     * @return object
     */
    public function approvedBy()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The voucher belongs to a contact.
     *
     * @return object
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * The voucher belongs to a journal.
     *
     * @return object
     */
    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }

    /**
     * The voucher belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The voucher is verified by a user.
     *
     * @return object
     */
    public function verifiedBy()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The voucher has many voucher entries.
     *
     * @return array object
     */
    public function voucherEntries()
    {
        return $this->hasMany(VoucherEntry::class);
    }
}
