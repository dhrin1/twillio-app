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
        Schema::table('notif_events', function (Blueprint $table) {
            $table->dropColumn('originCountry');
            $table->string('origin_country')->after('originCountry')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notif_events', function (Blueprint $table) {
            $table->dropColumn('origin_country');
        });
    }
};
