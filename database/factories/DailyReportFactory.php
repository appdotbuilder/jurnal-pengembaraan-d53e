<?php

namespace Database\Factories;

use App\Models\DailyReport;
use App\Models\Expedition;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DailyReport>
 */
class DailyReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $terrainConditions = [
            'Rocky and steep',
            'Muddy trail',
            'Sandy volcanic soil',
            'Dense forest',
            'Open grassland',
            'Scree slope',
            'River crossing',
        ];
        
        return [
            'expedition_id' => Expedition::factory(),
            'report_date' => $this->faker->date(),
            'day_number' => $this->faker->numberBetween(1, 14),
            'description' => $this->faker->paragraphs(2, true),
            'terrain_condition' => $this->faker->randomElement($terrainConditions),
            'important_notes' => $this->faker->optional()->sentence(),
            'challenges' => $this->faker->optional()->sentence(),
            'photos' => $this->faker->optional()->randomElements([
                'reports/photo1.jpg',
                'reports/photo2.jpg',
                'reports/photo3.jpg',
            ], $this->faker->numberBetween(0, 3)),
        ];
    }
}