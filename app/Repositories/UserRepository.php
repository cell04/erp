<?php

namespace App\Repositories;

use App\User;
use Illuminate\Support\Facades\DB;

class UserRepository extends Repository
{
    /**
     * Create new instance of user repository.
     *
     * @param User user User model
     */
    public function __construct(User $user)
    {
        parent::__construct($user);
        $this->user = $user;
    }

    /**
     * Store the data in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return boolean
     */
    public function store($request)
    {
        return DB::transaction(function () use ($request) {
            $user = $this->user->create([
                'name'          => $request->name,
                'email'         => $request->email,
                'password'      => bcrypt($request->password),
                'mobile_number' => $request->mobile_number
            ]);

            $user->userRole()->create($request->all());
            $user->image()->create($request->all());

            return $user;
        });
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return boolean
     */
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            $user = $this->user->findOrFail($id);
            $user->fill($request->all());
            $user->save();
            $user->userRole()->delete();
            $user->userRole()->create($request->all());
            if ($request->hasFile('image')) {
                $user->image()->update([
                    'image' => $request->image
                ]);
            }

            return $user;
        });
    }

    /**
     * Find the resource using the specified id or else fail.
     *
     * @param  int $id
     * @return json object
     */
    public function findOrFail($id)
    {
        return $this->user->with('userRole', 'image')
        ->findOrFail($id);
    }
}
