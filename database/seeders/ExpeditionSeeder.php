<?php

namespace Database\Seeders;

use App\Models\DailyReport;
use App\Models\Expedition;
use App\Models\ExpeditionMedia;
use App\Models\User;
use App\Models\Waypoint;
use Illuminate\Database\Seeder;

class ExpeditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some admin and editor users
        $admin = User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'admin@jurnal.com',
        ]);

        $editor = User::factory()->editor()->create([
            'name' => 'Mountain Guide',
            'email' => 'guide@jurnal.com',
        ]);

        // Create published expeditions
        $publishedExpeditions = Expedition::factory()
            ->count(8)
            ->published()
            ->create([
                'user_id' => $admin->id
            ]);

        // Create some draft expeditions
        $draftExpeditions = Expedition::factory()
            ->count(3)
            ->draft()
            ->create([
                'user_id' => $editor->id
            ]);

        // Add waypoints to expeditions
        foreach ($publishedExpeditions->concat($draftExpeditions) as $expedition) {
            // Create waypoints for each expedition
            Waypoint::factory()
                ->count(random_int(3, 8))
                ->create([
                    'expedition_id' => $expedition->id
                ]);

            // Create daily reports
            $reportCount = min($expedition->duration, 10); // Max 10 reports
            for ($day = 1; $day <= $reportCount; $day++) {
                DailyReport::factory()->create([
                    'expedition_id' => $expedition->id,
                    'day_number' => $day,
                    'report_date' => $expedition->start_date->addDays($day - 1),
                ]);
            }

            // Create some media
            ExpeditionMedia::factory()
                ->count(random_int(2, 6))
                ->create([
                    'expedition_id' => $expedition->id
                ]);
        }

        // Create a featured expedition with detailed content
        $featured = Expedition::factory()->published()->create([
            'user_id' => $admin->id,
            'title' => 'Mount Rinjani Summit Expedition 2024',
            'subtitle' => 'A Challenging Journey to Indonesia\'s Second Highest Volcano',
            'location' => 'Rinjani National Park, Lombok, Indonesia',
            'summary' => 'Join us on an epic 4-day expedition to the summit of Mount Rinjani, Indonesia\'s second-highest volcano at 3,726 meters. This challenging trek offers breathtaking views of Segara Anak crater lake, natural hot springs, and stunning sunrise vistas from the summit. Our experienced team will guide you through diverse landscapes, from tropical rainforest to alpine desert terrain.',
            'main_objectives' => 'Summit Mount Rinjani at 3,726m elevation, visit Segara Anak crater lake, experience traditional Sasak culture, document volcanic geology and endemic flora/fauna, promote sustainable mountain tourism practices.',
            'team_members' => ['John Smith (Guide)', 'Sarah Johnson (Photographer)', 'Mike Chen (Geology Expert)', 'Lisa Rodriguez (Medic)'],
            'duration' => 4,
        ]);

        // Add detailed waypoints for featured expedition
        $waypoints = [
            ['name' => 'Sembalun Village', 'type' => 'start_point', 'description' => 'Starting point at 1,156m elevation'],
            ['name' => 'Sembalun Crater Rim', 'type' => 'camp_location', 'description' => 'First night camp at 2,639m with crater lake views'],
            ['name' => 'Summit Point', 'type' => 'landmark', 'description' => 'Mount Rinjani summit at 3,726m elevation'],
            ['name' => 'Hot Springs', 'type' => 'water_source', 'description' => 'Natural hot springs near crater lake'],
            ['name' => 'Senaru Crater Rim', 'type' => 'camp_location', 'description' => 'Second camp with waterfall access'],
            ['name' => 'Senaru Village', 'type' => 'end_point', 'description' => 'Trek endpoint and village visit'],
        ];

        foreach ($waypoints as $index => $waypoint) {
            Waypoint::factory()->create(array_merge($waypoint, [
                'expedition_id' => $featured->id,
                'order' => $index + 1,
            ]));
        }

        // Add daily reports for featured expedition
        $reports = [
            [
                'day_number' => 1,
                'description' => 'Started early from Sembalun village. The trail began gradually through savanna grassland with stunning views of the surrounding mountains. Weather was perfect with clear skies. Team morale is high and everyone is excited for the adventure ahead.',
                'terrain_condition' => 'Gradual incline through grassland savanna',
                'important_notes' => 'Perfect weather conditions, excellent visibility',
                'challenges' => 'None significant, just getting accustomed to the altitude',
            ],
            [
                'day_number' => 2,
                'description' => 'Summit day! Started at 3 AM for the final ascent to the summit. The trail became very steep and challenging with loose volcanic rock. Reached the summit at sunrise - absolutely breathtaking views of Lombok, Bali, and Sumbawa islands.',
                'terrain_condition' => 'Very steep volcanic scree and rocky terrain',
                'important_notes' => 'Summit reached at 3,726m - amazing sunrise views',
                'challenges' => 'Steep ascent in darkness, loose volcanic rock, thin air at altitude',
            ],
            [
                'day_number' => 3,
                'description' => 'Descended to crater lake and enjoyed the natural hot springs. The contrast between the cold mountain air and warm springs was incredible. Set up camp near the lake with stunning views of the crater walls.',
                'terrain_condition' => 'Steep descent on volcanic slopes, then flat crater floor',
                'important_notes' => 'Hot springs temperature measured at 40°C, crystal clear crater lake',
                'challenges' => 'Steep descent required careful footing, heavy packs',
            ],
            [
                'day_number' => 4,
                'description' => 'Final day through the lush rainforest to Senaru village. Completely different ecosystem with incredible biodiversity. Spotted several endemic bird species and learned about traditional Sasak culture from our local guides.',
                'terrain_condition' => 'Dense tropical rainforest with muddy trails',
                'important_notes' => 'Excellent wildlife spotting opportunities, cultural exchange with locals',
                'challenges' => 'Muddy and slippery trails after morning rain',
            ],
        ];

        foreach ($reports as $report) {
            DailyReport::factory()->create(array_merge($report, [
                'expedition_id' => $featured->id,
                'report_date' => $featured->start_date->addDays($report['day_number'] - 1),
            ]));
        }
    }
}