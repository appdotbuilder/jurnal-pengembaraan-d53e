<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Waypoint
 *
 * @property int $id
 * @property int $expedition_id
 * @property string $name
 * @property string $type
 * @property string|null $description
 * @property float|null $latitude
 * @property float|null $longitude
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Expedition $expedition
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint query()
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereExpeditionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Waypoint whereUpdatedAt($value)
 * @method static \Database\Factories\WaypointFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Waypoint extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'expedition_id',
        'name',
        'type',
        'description',
        'latitude',
        'longitude',
        'order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the expedition that owns the waypoint.
     */
    public function expedition(): BelongsTo
    {
        return $this->belongsTo(Expedition::class);
    }
}