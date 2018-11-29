<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventoryReceiveNotBilledAccount extends Model
{
    use SoftDeletes, Filtering;

    protected $table = 'inventory_receive_not_billed_accounts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'account_id'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'corporation_id', 'cost_centable_id', 'cost_centable_type'
    // ];

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
                if (session('new-corporation-id')) {
                    $model->corporation_id = session('new-corporation-id');
                } else {
                    $model->corporation_id = request()->headers->get('CORPORATION-ID');
                }
            }
        });
    }
}
