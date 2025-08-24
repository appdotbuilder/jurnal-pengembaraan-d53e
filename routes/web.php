<?php

use App\Http\Controllers\ExpeditionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Expedition routes - publicly viewable but some require auth
Route::get('/expeditions', [ExpeditionController::class, 'index'])->name('expeditions.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Protected expedition routes
    Route::get('/expeditions/create', [ExpeditionController::class, 'create'])->name('expeditions.create');
    Route::post('/expeditions', [ExpeditionController::class, 'store'])->name('expeditions.store');
    Route::get('/expeditions/{expedition}/edit', [ExpeditionController::class, 'edit'])->name('expeditions.edit');
    Route::put('/expeditions/{expedition}', [ExpeditionController::class, 'update'])->name('expeditions.update');
    Route::delete('/expeditions/{expedition}', [ExpeditionController::class, 'destroy'])->name('expeditions.destroy');
});

// This must be last to avoid conflicts with /expeditions/create
Route::get('/expeditions/{expedition}', [ExpeditionController::class, 'show'])->name('expeditions.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
