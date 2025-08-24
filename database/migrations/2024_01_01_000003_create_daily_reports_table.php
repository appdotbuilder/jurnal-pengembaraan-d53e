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
        Schema::create('daily_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expedition_id')->constrained()->onDelete('cascade');
            $table->date('report_date');
            $table->integer('day_number'); // Day 1, Day 2, etc.
            $table->text('description');
            $table->string('terrain_condition');
            $table->text('important_notes')->nullable();
            $table->text('challenges')->nullable();
            $table->json('photos')->nullable(); // Store array of photo paths
            $table->timestamps();
            
            // Indexes for performance
            $table->index('expedition_id');
            $table->index('report_date');
            $table->index(['expedition_id', 'day_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_reports');
    }
};