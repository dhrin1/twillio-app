<?php

namespace App\Http\Controllers\Api\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserDetailsRequest;
use App\Http\Requests\UpdateStoredUserDetailsRequest;
use App\Http\Requests\UpdateUserDetailsRequest;
use App\Http\Resources\UserDetailsResource;
use App\Http\Resources\UsersResource;
use App\Models\User;
use App\Models\UserDetails;
use Illuminate\Http\Request;

class UserDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = UserDetails::query()->orderBy('created_at', 'desc');
        $query->where('status', 1);

        return response(UserDetailsResource::collection($query->get()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserDetailsRequest $request)
    {
        $data = $request->validated();
        $details = UserDetails::create($data);
        return response(['message' => 'Created successfully', 'data' => new UserDetailsResource($details)],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserDetails $userDetail)
    {
        return response(new UserDetailsResource($userDetail));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserDetailsRequest $request, UserDetails $userDetail)
    {
        $data = $request->validated();
        $userDetail->update($data);
        return response(['messsage'=>'Update successsfully!', 'data' => new UserDetailsResource($userDetail)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserDetails $userDetail)
    {
        $userDetail->delete();
        return response(['message'=>'removed successfully!', 'data' => new UserDetailsResource($userDetail)]);
    }


    public function updateStoredUserDetails(UpdateStoredUserDetailsRequest $request, string $id) {
        if(auth()->user()->id != $id) {
            return response()->json(['status'=>'failed', 'message' => 'Unauthorized'], 401);
        }
        $data = $request->validated();
        $user = User::firstOrNew(['id' => $id]);
        $user->update(['name'=>$data["name"]]);
        if($user->exists){
            $user->details()->updateOrCreate(
                [ 'user_id' => $user->id],
                [
                    'designation' => $data["designation"],
                    'address' => $data["address"],
                ]);
        }
        return response(new UsersResource($user),201);
    }
}
