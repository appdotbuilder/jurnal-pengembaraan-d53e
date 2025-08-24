<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Expedition
 *
 * @property int $id
 * @property string $title
 * @property string|null $subtitle
 * @property string $summary
 * @property string $location
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property int $duration
 * @property array $team_members
 * @property string|null $hero_image
 * @property string|null $main_objectives
 * @property string|null $map_embed_link
 * @property string $status
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Waypoint> $waypoints
 * @property-read int|null $waypoints_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\DailyReport> $dailyReports
 * @property-read int|null $daily_reports_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ExpeditionMedia> $media
 * @property-read int|null $media_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition query()
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereHeroImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereMainObjectives($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereMapEmbedLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereSubtitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereTeamMembers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expedition published()
 * @method static \Database\Factories\ExpeditionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Expedition extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'subtitle',
        'summary',
        'location',
        'start_date',
        'end_date',
        'duration',
        'team_members',
        'hero_image',
        'main_objectives',
        'map_embed_link',
        'status',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'team_members' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the expedition.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the waypoints for the expedition.
     */
    public function waypoints(): HasMany
    {
        return $this->hasMany(Waypoint::class)->orderBy('order');
    }

    /**
     * Get the daily reports for the expedition.
     */
    public function dailyReports(): HasMany
    {
        return $this->hasMany(DailyReport::class)->orderBy('day_number');
    }

    /**
     * Get the media for the expedition.
     */
    public function media(): HasMany
    {
        return $this->hasMany(ExpeditionMedia::class)->orderBy('order');
    }

    /**
     * Scope a query to only include published expeditions.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Check if expedition is published.
     */
    public function isPublished(): bool
    {
        return $this->status === 'published';
    }
}