<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\DailyReport
 *
 * @property int $id
 * @property int $expedition_id
 * @property \Illuminate\Support\Carbon $report_date
 * @property int $day_number
 * @property string $description
 * @property string $terrain_condition
 * @property string|null $important_notes
 * @property string|null $challenges
 * @property array|null $photos
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Expedition $expedition
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport query()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereChallenges($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereDayNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereExpeditionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereImportantNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport wherePhotos($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereReportDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereTerrainCondition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyReport whereUpdatedAt($value)
 * @method static \Database\Factories\DailyReportFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DailyReport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'expedition_id',
        'report_date',
        'day_number',
        'description',
        'terrain_condition',
        'important_notes',
        'challenges',
        'photos',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'report_date' => 'date',
        'photos' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the expedition that owns the daily report.
     */
    public function expedition(): BelongsTo
    {
        return $this->belongsTo(Expedition::class);
    }
}