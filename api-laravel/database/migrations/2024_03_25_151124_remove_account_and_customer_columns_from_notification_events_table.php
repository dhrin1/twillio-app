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
        Schema::table('notification_events', function (Blueprint $table) {
            if (Schema::hasColumn('notification_events', 'account_number')) {
                $table->dropColumn('account_number');
            }
            if (Schema::hasColumn('notification_events', 'customer_number')) {
                $table->dropColumn('customer_number');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notification_events', function (Blueprint $table) {
            $table->unsignedBigInteger('account_number')->nullable();
            $table->unsignedBigInteger('customer_number')->nullable();
        });
    }
};
