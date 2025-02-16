<?php

namespace App\Http\Controllers\Api\Base;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBaseAccountRequest;
use App\Http\Requests\UpdateBaseAccountRequest;
use App\Http\Resources\BaseAccountResource;
use App\Models\BaseAccount;
use Illuminate\Http\Request;

class BaseAccountController extends Controller
{

   
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        $query = BaseAccount::query()->whereIn('status', [1, 0])->orderBy('created_at', 'desc');
        return [
            "data" => BaseAccountResource::collection($query->get()),
            "count" => $query->count()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBaseAccountRequest $request)
    {
        $data = $request->validated();
        $data["account_number"] = $data["prefix"].$data["account_number"];
        $baseAccount = BaseAccount::create($data);
        return response(['message' => 'Created successfully', 'data'=> new BaseAccountResource($baseAccount)], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(BaseAccount $baseAccount)
    {
        return response(new BaseAccountResource($baseAccount), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBaseAccountRequest $request, BaseAccount $baseAccount)
    {
        $data = $request->validated();
        $data["account_number"] = ($request->filled('prefix') ? $data["prefix"] : $baseAccount->prefix).($request->filled('account_number') ? $data["account_number"] :  substr($baseAccount->account_number, strlen($baseAccount->prefix)));
        $baseAccount->update($data);
        return response(['message' => 'Update successfully', 'data' => new BaseAccountResource($baseAccount)],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BaseAccount $baseAccount)
    {
        $baseAccount->delete();
        return response(['message' => $baseAccount->name. 'has been removed', 'data' => new BaseAccountResource($baseAccount)]);
    }
}
