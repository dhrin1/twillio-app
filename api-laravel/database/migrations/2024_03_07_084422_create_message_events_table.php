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
            Schema::create('message_events', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('notification_id')->unsigned();
                $table->foreign('notification_id')->references('id')->on('notifications')->cascadeOnDelete();
                $table->unsignedBigInteger('customer_id')->unsigned();
                $table->foreign('customer_id')->references('id')->on('customers')->cascadeOnDelete();
                $table->unsignedBigInteger('user_id')->unsigned();
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
                $table->longText('content')->nullable();
                $table->timestamps();
                $table->boolean('status')->default(true);
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_events');
    }
};
