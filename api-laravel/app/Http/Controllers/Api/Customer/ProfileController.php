<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin')->only(['destroy']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Customer::query()->orderBy('created_at', 'desc');
        $query->where('status', 1);
        return [
            "data" => CustomerResource::collection($query->get()),
            "count" => $query->count()
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $data =  $request->validated();   
        $customer = Customer::create($data);
       return response(['message' => "Created successfully", 'data' => new CustomerResource($customer)],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $profile)
    {
        return response(new CustomerResource($profile), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $profile)
    {   
        
        $data = $request->validated();
        $profile->update($data);
        return response(['message' => 'Update successfully', 'data'=> new CustomerResource($profile)],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $profile)
    {
       
        $profile->delete();
        return response(['message'=> $profile->name.' has been removed', 'data' => new CustomerResource($profile)], 200);
    }
}
