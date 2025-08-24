<?php

namespace Tests\Feature;

use App\Models\Expedition;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpeditionTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_expeditions_index(): void
    {
        $response = $this->get(route('expeditions.index'));
        
        $response->assertStatus(200);
    }

    public function test_can_view_published_expedition(): void
    {
        $expedition = Expedition::factory()->published()->create();
        
        $response = $this->get(route('expeditions.show', $expedition));
        
        $response->assertStatus(200);
    }

    public function test_cannot_view_draft_expedition_as_guest(): void
    {
        $expedition = Expedition::factory()->draft()->create();
        
        $response = $this->get(route('expeditions.show', $expedition));
        
        $response->assertStatus(403);
    }

    public function test_admin_can_view_any_expedition(): void
    {
        $admin = User::factory()->admin()->create();
        $expedition = Expedition::factory()->draft()->create();
        
        $response = $this->actingAs($admin)
            ->get(route('expeditions.show', $expedition));
        
        $response->assertStatus(200);
    }

    public function test_editor_can_create_expedition(): void
    {
        $editor = User::factory()->editor()->create();
        
        $response = $this->actingAs($editor)
            ->get(route('expeditions.create'));
        
        $response->assertStatus(200);
    }

    public function test_viewer_cannot_create_expedition(): void
    {
        $viewer = User::factory()->viewer()->create();
        
        $response = $this->actingAs($viewer)
            ->get(route('expeditions.create'));
        
        $response->assertStatus(403);
    }

    public function test_can_store_expedition(): void
    {
        $editor = User::factory()->editor()->create();
        
        $expeditionData = [
            'title' => 'Test Expedition',
            'summary' => 'A test expedition summary',
            'location' => 'Test Location',
            'start_date' => '2024-06-01',
            'end_date' => '2024-06-03',
            'status' => 'draft',
        ];
        
        $response = $this->actingAs($editor)
            ->post(route('expeditions.store'), $expeditionData);
        
        $response->assertRedirect();
        $this->assertDatabaseHas('expeditions', [
            'title' => 'Test Expedition',
            'duration' => 3, // Should calculate duration
        ]);
    }

    public function test_owner_can_edit_own_expedition(): void
    {
        $editor = User::factory()->editor()->create();
        $expedition = Expedition::factory()->create(['user_id' => $editor->id]);
        
        $response = $this->actingAs($editor)
            ->get(route('expeditions.edit', $expedition));
        
        $response->assertStatus(200);
    }

    public function test_editor_cannot_edit_others_expedition(): void
    {
        $editor1 = User::factory()->editor()->create();
        $editor2 = User::factory()->editor()->create();
        $expedition = Expedition::factory()->create(['user_id' => $editor1->id]);
        
        $response = $this->actingAs($editor2)
            ->get(route('expeditions.edit', $expedition));
        
        $response->assertStatus(403);
    }
}