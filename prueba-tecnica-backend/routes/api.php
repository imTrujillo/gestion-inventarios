<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProductosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/v1/productos', [ProductosController::class, 'index']);
    Route::post('/v1/productos', [ProductosController::class, 'store']);
    Route::get('/v1/productos/{nombre}', [ProductosController::class, 'buscar_producto_nombre']);
    Route::patch('/v1/productos/{id}', [ProductosController::class, 'update']);
    Route::delete('/v1/productos/{id}', [ProductosController::class, 'destroy']);

    Route::post('/v1/logout', [AuthenticationController::class, 'logout']);
});

Route::post('/v1/login', [AuthenticationController::class, 'login']);
Route::get('/token', function () {
    return response()->json(['message' => 'Necesitas un token'], 401);
})->name('login');
