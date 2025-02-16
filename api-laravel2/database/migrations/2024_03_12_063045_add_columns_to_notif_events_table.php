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
            $table->dropColumn('type');
            $table->string('event')->after('id')->nullable();
            $table->string('direction')->after('event')->nullable();
            $table->string('originCountry')->after('active')->nullable();
            $table->boolean('status')->after('updated_at')->default(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notif_events', function (Blueprint $table) {
            $table->dropColumn('event');
            $table->dropColumn('direction');
            $table->dropColumn('originCountry');
        });
    }
};
