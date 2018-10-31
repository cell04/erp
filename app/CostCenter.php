<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class CostCenter extends Model
{
    use SoftDeletes, Filtering, LogsActivity;

    /**
     * Cost Center table.
     *
     * @var string
     */
    protected $table = 'cost_centers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'cost_centable_id', 'cost_centable_type'
    ];

    /**
     * The Log attributes that are mass assignable.
     *
     * @var array
     */
    protected static $logAttributes = [
        'corporation_id', 'cost_centable_id', 'cost_centable_type'
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
    protected $with = ['costCentable'];

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
     * The cost center belongs to a corporation
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * Get all of the owning cost center models.
     */
    public function costCentable()
    {
        return $this->morphTo();
    }
}
