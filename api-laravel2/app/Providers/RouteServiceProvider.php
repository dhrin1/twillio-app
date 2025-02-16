<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    protected function configureRateLimiting(){
        
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(1000)->by($request->user()?->id ?: $request->ip());
        });
        
        /* The code snippet `RateLimiter::for('api', function (Request ) {
            return Limit::perMinute(1000);
        });` is defining a rate limiting configuration for the 'api' route. It specifies that the rate
        limit for this route is set to 1000 requests per minute. This means that only up to 1000 requests
        can be made to the 'api' route within a minute before further requests are limited. 

        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(1000);
        });*/

        /* The code snippet `RateLimiter::for('api', function (Request ) {
            return Limit::none();
        });` is defining a rate limiting configuration for the 'api' route. In this case,
        `Limit::none()` is used, which means that there is no rate limit set for the 'api' route.
        This configuration effectively allows unlimited requests to be made to the 'api' route
        without any rate limiting restrictions. 

        RateLimiter::for('api', function (Request $request) {
            return Limit::none();
        });*/

        /* This code snippet is defining a rate limiting configuration for the 'api' route. It sets a
        rate limit of 60 requests per minute for the 'api' route. Additionally, it uses the `by`
        method to specify that the rate limiting should be based on the user's ID if the user is
        authenticated (`->user()?->id`), and if not, it falls back to using the IP address of
        the request (`->ip()`). 

        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });*/

       /* This code snippet is defining a rate limiting configuration for the 'api' route with a rate
       limit of 1000 requests per minute. Additionally, it includes a custom response function that
       will be triggered when the rate limit is exceeded (429 status code). 
       
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(1000)->response(function (Request $request, array $headers) {
                return response('Custom response...', 429, $headers);
            });
        });*/
    }
}
