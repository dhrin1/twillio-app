<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('role_id')->unsigned()->nullable()->default(2)->change();
            $table->dropForeign('users_role_id_foreign');
            $table->foreign('role_id', 'users_role_id_foreign')->references('id')->on('roles')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_role_id_foreign');
            $table->unsignedBigInteger('role_id')->unsigned()->nullable(false)->change();
        });
    }
};
