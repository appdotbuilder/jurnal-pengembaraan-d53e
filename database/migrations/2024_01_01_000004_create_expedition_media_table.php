<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expedition_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expedition_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['photo', 'video']);
            $table->string('file_path')->nullable(); // For uploaded photos
            $table->string('video_url')->nullable(); // For YouTube/Vimeo links
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->integer('order')->default(0); // For ordering media
            $table->timestamps();
            
            // Indexes for performance
            $table->index('expedition_id');
            $table->index('type');
            $table->index(['expedition_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expedition_media');
    }
};