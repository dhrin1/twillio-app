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
        Schema::rename('notif_events', 'notification_events');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('notification_events', 'notif_events');
    }
};
