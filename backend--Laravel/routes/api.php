<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ConsultasController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('user', [AuthController::class, 'user']);
Route::get('userData/{id}', [AuthController::class, 'userData']);
Route::apiResource('productos', ProductosController::class);
Route::post('/productFilters', [ProductosController::class, 'productListFilter']);
Route::get('/productImage/{id}', [ProductosController::class, 'image']);
Route::post('/contact', [ConsultasController::class, 'store']);
Route::apiResource('/usuario', UserController::class);
Route::get('/usuario/charge/{amount}', [UserController::class, 'charge']);