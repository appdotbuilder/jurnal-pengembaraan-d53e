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
        Schema::create('waypoints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('expedition_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->enum('type', ['start_point', 'water_source', 'camp_location', 'danger_point', 'landmark', 'end_point']);
            $table->text('description')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->integer('order')->default(0); // For ordering waypoints
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
        Schema::dropIfExists('waypoints');
    }
};