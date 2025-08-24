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
        Schema::create('expeditions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('summary');
            $table->string('location');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('duration'); // in days
            $table->json('team_members'); // Store array of team member names
            $table->string('hero_image')->nullable();
            $table->text('main_objectives')->nullable();
            $table->text('map_embed_link')->nullable(); // Google Maps/My Maps link
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('start_date');
            $table->index(['status', 'start_date']);
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expeditions');
    }
};