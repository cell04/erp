<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VoucherEntry extends Model
{
    use SoftDeletes, Filtering;
    
    /**
     * Voucher Entries table.
     *
     * @var string
     */
    protected $table = 'voucher_entries';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'voucher_id', 'corporation_id', 'cost_center_id',
        'account_id', 'type', 'amount'
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
            $model->corporation_id = request()->headers->get('CORPORATION-ID');
        });

        static::addGlobalScope(function ($model) {
            $model->where('corporation_id', request()->headers->get('CORPORATION-ID'));
        });
    }

    /**
     * The voucher entry belongs to an account.
     *
     * @return object
     */
    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    /**
     * The voucher entry belongs to a corporation
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The voucher entry belongs to a cost center.
     *
     * @return object
     */
    public function costCenter()
    {
        return $this->belongsTo(CostCenter::class);
    }

    /**
     * The voucher entry belongs to a voucher.
     *
     * @return object
     */
    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }
}
