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
            //
            $table->unsignedBigInteger('base_account_id')->after('direction')->nullable();
            $table->foreign('base_account_id')->references('id')->on('base_accounts')->onDelete('cascade');

            $table->unsignedBigInteger('customer_account_id')->after('base_account_id')->nullable();
            $table->foreign('customer_account_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notification_events', function (Blueprint $table) {
            $table->dropForeign(['account_number']);
            $table->dropColumn('account_number');
            $table->dropForeign(['customer_number']);
            $table->dropColumn('customer_number');

            $table->dropForeign(['base_account_id']);
            $table->dropColumn('base_account_id');
            $table->dropForeign(['customer_account_id']);
            $table->dropColumn('customer_account_id');
        });
    }
};
