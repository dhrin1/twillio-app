<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('get') ) {
            return $next($request);
        }
        
        // If it's a delete request and the user is not an admin, abort with 403 Forbidden
        if ($request->user() && $request->user()->role->name !== 'admin') {
            abort(403, 'Unauthorized.');
        }
        
        return $next($request);
    }
}
