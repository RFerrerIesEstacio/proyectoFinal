<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RolAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->rol === 'admin'){
            return $next($request);
        }
        $jose = auth()->user();
        var_dump($request->route()->parameter('id'));
        return response()->json(['errors' => [
            'Operación restringida. Este usuario no es propietario del producto.'
        ]], 400);
    }
}
