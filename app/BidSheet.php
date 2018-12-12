<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BidSheet extends Model
{
    use SoftDeletes, Filtering;

    /**
     * bid sheet table.
     *
     * @var string
     */
    protected $table = 'bid_sheets';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'user_id', 'contact_id', 'location_id', 'bid_sheet_date', 
        'approved_bid_sheet_date', 'location_type', 'bid_sheet_number', 'amount', 
        'status', 'approved_by', 'project_title', 'description'
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
        'location'
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
            if (request()->headers->get('user-id')) {
                $model->user_id = request()->headers->get('user-id');
            } else {
                $model->user_id = auth('api')->user()->id;
            }
        });

        static::addGlobalScope(function ($model) {
            $model->where('corporation_id', request()->headers->get('CORPORATION-ID'));
        });
    }

    /**
    * The bid sheet belongs to a corporation.
    *
    * @return object
    */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The bid sheet belongs to a contact.
     *
     * @return object
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * The bid sheet belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The bid sheet belongs to a user.
     *
     * @return object
     */
    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function location()
    {
        return $this->morphTo();
    }
}
