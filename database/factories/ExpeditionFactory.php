<?php

namespace Database\Factories;

use App\Models\Expedition;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expedition>
 */
class ExpeditionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 year', '+6 months');
        $endDate = (clone $startDate)->modify('+' . $this->faker->numberBetween(1, 14) . ' days');
        
        return [
            'title' => $this->faker->sentence(4),
            'subtitle' => $this->faker->optional()->sentence(3),
            'summary' => $this->faker->paragraphs(3, true),
            'location' => $this->faker->city() . ', ' . $this->faker->country(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'duration' => $startDate->diff($endDate)->days + 1,
            'team_members' => $this->faker->randomElements([
                'John Smith',
                'Jane Doe',
                'Mike Johnson',
                'Sarah Wilson',
                'David Brown',
                'Lisa Davis',
                'Chris Taylor',
                'Emma Anderson'
            ], $this->faker->numberBetween(2, 6)),
            'main_objectives' => $this->faker->optional()->paragraphs(2, true),
            'map_embed_link' => $this->faker->optional()->url(),
            'status' => $this->faker->randomElement(['draft', 'published']),
            'user_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the expedition is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }

    /**
     * Indicate that the expedition is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }
}