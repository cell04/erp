<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AccountType extends Model
{
    use SoftDeletes, Filtering;
    
    /**
     * Account Types table.
     *
     * @var string
     */
    protected $table = 'account_types';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'type'
    ];
    
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The account type has many accounts
     *
     * @return array object
     */
    public function accounts()
    {
        return $this->hasMany(Account::class);
    }
}
