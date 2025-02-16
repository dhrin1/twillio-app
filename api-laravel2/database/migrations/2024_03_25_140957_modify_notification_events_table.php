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
        Schema::table('notification_events', function(Blueprint $table){
            if (!Schema::hasColumn('notification_events', 'account_number')) {
                $table->unsignedBigInteger('account_number')->unsigned()->nullable()->change();
                $table->foreign('account_number')->references('account_number')->on('base_accounts')->onDelete('cascade');
            }
    
            if (!Schema::hasColumn('notification_events', 'customer_number')) {
                $table->unsignedBigInteger('customer_number')->unsigned()->nullable()->change();
                $table->foreign('customer_number')->references('customer_number')->on('customers')->onDelete('cascade');
            }
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notifications_events', function(Blueprint $table){
            $table->dropForeign(['account_number']);
            $table->dropColumn('account_number');
            $table->dropForeign(['customer_number']);
            $table->dropColumn('customer_number');
        });
    }
};
