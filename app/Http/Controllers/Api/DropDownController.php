<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cities;
use App\Models\Countries;
use App\Models\States;
use Illuminate\Http\Request;

class DropDownController extends Controller
{
    public function countries()
    {
        $countries = Countries::all();

        return response()->json($countries);
    }

    public function states($id)
    {
        $states = States::where('country_id', $id)
        ->get();

        return response()->json($states);
    }

    public function cities($id)
    {
        $cities = Cities::where('state_id', $id)
        ->get();

        return response()->json($cities);
    }
}
