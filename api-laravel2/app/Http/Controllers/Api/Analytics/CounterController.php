<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use App\Models\BaseAccount;
use App\Models\Customer;
use App\Models\NotificationEvent;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CounterController extends Controller
{

    // get the month percentage
    // get the month numbers

    public static function getPercentageIncrease($model, $request, $interval) {
        if ($interval === 'month') {
            $start = Carbon::now()->startOfMonth();
            $end = Carbon::now()->endOfMonth();
        } else if ($interval === 'year') {
            $start = Carbon::now()->startOfYear();
            $end = Carbon::now()->endOfYear();
        } else {
            return response()->json(['error' => 'Invalid interval parameter.']);
        }
        $modelQuery = $model->whereBetween('created_at', [$start, $end]);
        $count = $modelQuery->count();
        if ($interval === 'month') {
            $lastMonthStart = $start->copy()->subMonth();
            $lastMonthEnd = $end->copy()->subMonth();
            $lastMonthCount = $model->whereBetween('created_at', [$lastMonthStart, $lastMonthEnd])->count();
            $percentageIncrease = ($lastMonthCount > 0) ? (($count - $lastMonthCount) / $lastMonthCount) * 100 : 100;
        }else if($interval === 'year') {
            $lastYearStart = $start->copy()->subYear();
            $lastYearEnd = $end->copy()->subYear();
            $lastYearCount = $model::whereBetween('created_at', [$lastYearStart, $lastYearEnd])->count();
            $percentageIncrease = ($lastYearCount > 0) ? (($count - $lastYearCount) / $lastYearCount) * 100 : 100;
        }
        return max(0, $percentageIncrease);
    }

    public static function counterDayNumber($model, $type, $request, $interval)
    {   
        if($interval === "hour") {
            $start = Carbon::now()->startOfDay();
            $end = Carbon::now()->endOfDay();
        }
        if($interval === "hour"){
            if($request === "number") {
                $currentTime = Carbon::now();
                $oneHourAgo = $currentTime->subHour();
                $currDayCount = $model::whereBetween('created_at', [$start, $end])->where('event', $type)->count();
                $lastHourCount = $model::where('created_at', '>=', $oneHourAgo)->where('event', $type)->count();
                $numberIncrease = [
                    "day_count" =>  $currDayCount,
                    "last_hour_count" => $lastHourCount,
                ];
            }else if($request === "percentage") {
                $currentTime = Carbon::now();
                $oneHourAgo = $currentTime->subHour();
                $currDayCount = $model::whereBetween('created_at', [$start, $end])->where('event', $type)->count();
                $lastHourCount = $model::where('created_at', '>=', $oneHourAgo)->where('event', $type)->count();
                
                $cal = ($lastHourCount > 0) ? (($currDayCount - $lastHourCount) / $lastHourCount) * 100 : 100;
                $numberIncrease = max(0, $cal).'%';
            }
        }
        return $numberIncrease;
          
    }

    public function getCountersCard(Request $request) {
        $baseAccount = BaseAccount::query()->where('status', 1)->get();
        $customer = Customer::query()->where('status', 1)->get();
        $user = User::query()->where('status', [1,0])->whereNotNull('email_verified_at')->get();
        $event = NotificationEvent::selectRaw('COUNT(CASE WHEN event = "voice" THEN 1 END) AS voice_count, 
        COUNT(CASE WHEN event = "message" THEN 1 END) AS message_count')->first();
         $responseData = [
            "base_account" => [
                "count" => $baseAccount->count(),
                "percent_increase" => $this->getPercentageIncrease($baseAccount, $request, "month")
            ],
            "customer" => [
                "count" => $customer->count(),
                "percent_increase" => $this->getPercentageIncrease($customer, $request, "month")
            ],
            "user" => [
                "count" => $user->count(),
                "percent_increase" => $this->getPercentageIncrease($user, $request, "month")
            ],
            'voice' => [
                "count" => $this->counterDayNumber(NotificationEvent::class, "voice", "number", "hour")["day_count"] ?? 0,
                "number_increase" =>$this->counterDayNumber(NotificationEvent::class, "voice", "number", "hour")["last_hour_count"] ?? 0
            ],
            'message' => [
                "count" => $this->counterDayNumber(NotificationEvent::class, "message", "number", "hour")["day_count"] ?? 0,
                "number_increase" =>$this->counterDayNumber(NotificationEvent::class, "message", "number", "hour")["last_hour_count"] ?? 0
            ]
        ];
        return response()->json($responseData);
    }

    public function getCounterPerDateRange(Request $request) {
    }

    


}
