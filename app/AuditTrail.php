<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AuditTrail extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Audit trails table.
     *
     * @var string
     */
    protected $table = 'audit_trails';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'user_id', 'module', 'description'
    ];

    // /**
    //  * The Log attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected static $logAttributes = [
    //     'corporation_id', 'user_id', 'module', 'description'
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
                $model->corporation_id = request()->headers->get('CORPORATION-ID');
            }
        });
    }

    /**
     * The audit trail belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The audit trail belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
