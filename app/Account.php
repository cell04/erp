<?php

namespace App;

use App\Traits\Filtering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    use SoftDeletes, Filtering;

    /**
     * Accounts table.
     *
     * @var string
     */
    protected $table = 'accounts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'corporation_id', 'sub_account_of', 'account_type_id', 'name', 'code', 'description'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

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
     * The account belongs to aa account type.
     *
     * @return ojbect
     */
    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }

    /**
     * The account has sub accounts.
     *
     * @return object
     */
    public function subAccounts()
    {
        return $this->hasMany(Account::class, 'sub_account_of');
    }

    /**
     * The account belongs to an account.
     *
     * @return object
     */
    public function subAccountOf()
    {
        return $this->belongsTo(Account::class, 'sub_account_of');
    }

    /**
     * The account has many journal entries.
     *
     * @return array object
     */
    public function journalEntries()
    {
        return $this->hasMany(JournalEntry::class);
    }

    /**
     * The account has many voucher entires.
     *
     * @return array object
     */
    public function voucherEntries()
    {
        return $this->hasMany(VoucherEntry::class);
    }
}
