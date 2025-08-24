<?php

namespace Database\Factories;

use App\Models\Expedition;
use App\Models\Waypoint;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Waypoint>
 */
class WaypointFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['start_point', 'water_source', 'camp_location', 'danger_point', 'landmark', 'end_point'];
        
        return [
            'expedition_id' => Expedition::factory(),
            'name' => $this->faker->words(2, true),
            'type' => $this->faker->randomElement($types),
            'description' => $this->faker->optional()->sentence(),
            'latitude' => $this->faker->optional()->latitude(-8.5, -8.0), // Rinjani area
            'longitude' => $this->faker->optional()->longitude(116.0, 116.5), // Rinjani area
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}