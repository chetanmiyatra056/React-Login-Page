<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search($key)
    {
        $user = User::where('users.name', 'LIKE', "$key%")
            ->orWhere('users.email', 'LIKE', "$key%")
            ->orWhere('countries.name', 'LIKE', "$key%")
            ->orWhere('states.name', 'LIKE', "$key%")
            ->orWhere('cities.name', 'LIKE', "$key%")

            ->leftJoin('countries', 'users.countries', '=', 'countries.id')
            ->leftJoin('states', 'users.states', '=', 'states.id')
            ->leftJoin('cities', 'users.cities', '=', 'cities.id')
            ->select(
                'users.name as users_name',
                'email',
                'countries.name as countries_name',
                'states.name as states_name',
                'cities.name as cities_name',
                'hobbies',
                'gender',
                'date',
                'type',
                'profile',
            )
            ->get();

        return response()->json($user);
    }
}
