<?php

namespace Database\Factories;

use App\Models\Expedition;
use App\Models\ExpeditionMedia;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpeditionMedia>
 */
class ExpeditionMediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['photo', 'video']);
        
        return [
            'expedition_id' => Expedition::factory(),
            'type' => $type,
            'file_path' => $type === 'photo' ? $this->faker->imageUrl(800, 600, 'nature') : null,
            'video_url' => $type === 'video' ? $this->faker->url() : null,
            'title' => $this->faker->optional()->sentence(3),
            'description' => $this->faker->optional()->sentence(),
            'order' => $this->faker->numberBetween(1, 20),
        ];
    }

    /**
     * Indicate that the media is a photo.
     */
    public function photo(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'photo',
            'file_path' => $this->faker->imageUrl(800, 600, 'nature'),
            'video_url' => null,
        ]);
    }

    /**
     * Indicate that the media is a video.
     */
    public function video(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'video',
            'file_path' => null,
            'video_url' => $this->faker->randomElement([
                'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'https://vimeo.com/123456789',
            ]),
        ]);
    }
}