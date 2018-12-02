<?php

namespace App\Http\Controllers;

use App\Repositories\RoleRepository;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    protected $role;

    public function __construct(RoleRepository $role)
    {
        $this->role = $role;
    }

    public function getAllRoles()
    {
        if (cache()->has('roles')) {
            return response()->json([
                'response'   => true,
                'message'    => 'Resources successfully retrieve.',
                'roles' => cache('roles', 5)
            ], 200);
        }

        if (! $roles = $this->role->all()) {
            return response()->json([
                'response' => false,
                'message'  => 'Resources does not exist.'
            ], 400);
        }

        return response()->json([
            'response'   => true,
            'message'    => 'Resources successfully retrieve.',
            'roles' => $roles
        ], 200);
    }
}
