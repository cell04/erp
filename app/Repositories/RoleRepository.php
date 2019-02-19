<?php 

namespace App\Repositories;

use App\Role;
use App\Repositories\Repository;

class RoleRepository extends Repository
{
    public function __construct(Role $role)
    {
        parent::__construct($role);
        $this->role = $role;
    }  
}