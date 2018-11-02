<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JournalEntry extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Journal Entries table.
     *
     * @var string
     */
    protected $table = 'journal_entries';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'journal_id', 'corporation_id', 'cost_center_id',
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
            if (request()->headers->get('CORPORATION-ID')) {
                $model->corporation_id = request()->headers->get('CORPORATION-ID');
            }
        });
    }

    // /**
    //  * The journal entry belongs to an account
    //  *
    //  * @return object
    //  */
    // public function account()
    // {
    //     return $this->belongsTo(Account::class);
    // }

    /**
     * The journal entry belongs to a corporation
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    // /**
    //  * The journal entry belongs to a cost center.
    //  *
    //  * @return object
    //  */
    // public function costCenter()
    // {
    //     return $this->belongsTo(CostCenter::class);
    // }

    // /**
    //  * The journal entry belongs to a journal
    //  *
    //  * @return object
    //  */
    public function journal()
    {
        return $this->belongsTo(Journal::class);
    }
}
