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
        Schema::create('base_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('prefix')->nullable();
            $table->string('account_number')->nullable();
            $table->string('name')->nullable();
            $table->string('department')->nullable();
            $table->string('provider_url')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('base_accounts');
    }
};
