<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpeditionRequest;
use App\Http\Requests\UpdateExpeditionRequest;
use App\Models\Expedition;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ExpeditionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Expedition::with('user')->latest();
        
        // If not admin, show only published expeditions or user's own expeditions
        if (!auth()->user()?->isAdmin()) {
            if (auth()->check() && auth()->user()->canEditExpeditions()) {
                $query->where(function ($q) {
                    $q->where('status', 'published')
                      ->orWhere('user_id', auth()->id());
                });
            } else {
                $query->where('status', 'published');
            }
        }
        
        $expeditions = $query->paginate(12);
        
        return Inertia::render('expeditions/index', [
            'expeditions' => $expeditions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->canEditExpeditions()) {
            abort(403, 'You do not have permission to create expeditions.');
        }
        
        return Inertia::render('expeditions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpeditionRequest $request)
    {
        $validated = $request->validated();
        
        // Calculate duration
        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);
        $validated['duration'] = $startDate->diffInDays($endDate) + 1;
        
        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            $validated['hero_image'] = $request->file('hero_image')->store('expeditions/heroes', 'public');
        }
        
        // Set user_id
        $validated['user_id'] = auth()->id();
        
        // Ensure team_members is always an array
        if (!isset($validated['team_members']) || !is_array($validated['team_members'])) {
            $validated['team_members'] = [];
        }
        
        $expedition = Expedition::create($validated);

        return redirect()->route('expeditions.show', $expedition)
            ->with('success', 'Expedition created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expedition $expedition)
    {
        // Load relationships
        $expedition->load([
            'user',
            'waypoints',
            'dailyReports' => function ($query) {
                $query->orderBy('day_number');
            },
            'media' => function ($query) {
                $query->orderBy('order');
            }
        ]);
        
        // Check if user can view this expedition
        if (!$expedition->isPublished() && 
            (!auth()->check() || 
             (!auth()->user()->isAdmin() && $expedition->user_id !== auth()->id()))) {
            abort(403, 'This expedition is not published.');
        }
        
        return Inertia::render('expeditions/show', [
            'expedition' => $expedition
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expedition $expedition)
    {
        if (!auth()->user()->isAdmin() && 
            (!auth()->user()->canEditExpeditions() || $expedition->user_id !== auth()->id())) {
            abort(403, 'You do not have permission to edit this expedition.');
        }
        
        return Inertia::render('expeditions/edit', [
            'expedition' => $expedition
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpeditionRequest $request, Expedition $expedition)
    {
        $validated = $request->validated();
        
        // Calculate duration
        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);
        $validated['duration'] = $startDate->diffInDays($endDate) + 1;
        
        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            // Delete old image
            if ($expedition->hero_image) {
                Storage::disk('public')->delete($expedition->hero_image);
            }
            $validated['hero_image'] = $request->file('hero_image')->store('expeditions/heroes', 'public');
        }
        
        // Ensure team_members is always an array
        if (!isset($validated['team_members']) || !is_array($validated['team_members'])) {
            $validated['team_members'] = [];
        }
        
        $expedition->update($validated);

        return redirect()->route('expeditions.show', $expedition)
            ->with('success', 'Expedition updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expedition $expedition)
    {
        if (!auth()->user()->isAdmin() && 
            (!auth()->user()->canEditExpeditions() || $expedition->user_id !== auth()->id())) {
            abort(403, 'You do not have permission to delete this expedition.');
        }
        
        // Delete hero image
        if ($expedition->hero_image) {
            Storage::disk('public')->delete($expedition->hero_image);
        }
        
        $expedition->delete();

        return redirect()->route('expeditions.index')
            ->with('success', 'Expedition deleted successfully.');
    }
}