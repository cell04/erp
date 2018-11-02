<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Journal extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Journals table.
     *
     * @var string
     */
    protected $table = 'journals';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'user_id', 'contact_id', 'reference_number',
        'memo', 'amount', 'status', 'posting_period'
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

            if (auth('api')->check()) {
                $model->user_id = auth('api')->user()->id;
            } else {
                $model->user_id = request()->headers->get('USER-ID');
            }
        });
    }

    // /**
    //  * The journal belongs to a contact.
    //  *
    //  * @return object
    //  */
    // public function contact()
    // {
    //     return $this->belongsTo(Contact::class);
    // }

    /**
     * The journal belongs to a corporation.
     *
     * @return object
     */
    public function corporation()
    {
        return $this->belongsTo(Corporation::class);
    }

    /**
     * The journal belongs to a user.
     *
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The journal has many journal entries.
     *
     * @return array object
     */
    public function journalEntries()
    {
        return $this->hasMany(JournalEntry::class);
    }
}
