<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ExpeditionMedia
 *
 * @property int $id
 * @property int $expedition_id
 * @property string $type
 * @property string|null $file_path
 * @property string|null $video_url
 * @property string|null $title
 * @property string|null $description
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Expedition $expedition
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereExpeditionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExpeditionMedia whereVideoUrl($value)
 * @method static \Database\Factories\ExpeditionMediaFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ExpeditionMedia extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'expedition_id',
        'type',
        'file_path',
        'video_url',
        'title',
        'description',
        'order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the expedition that owns the media.
     */
    public function expedition(): BelongsTo
    {
        return $this->belongsTo(Expedition::class);
    }

    /**
     * Check if the media is a photo.
     */
    public function isPhoto(): bool
    {
        return $this->type === 'photo';
    }

    /**
     * Check if the media is a video.
     */
    public function isVideo(): bool
    {
        return $this->type === 'video';
    }
}