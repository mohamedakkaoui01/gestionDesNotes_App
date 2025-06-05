<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ClassController;
use App\Http\Controllers\API\GradeController;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\TeacherAssignmentController;
use App\Http\Middleware\CheckRole;

// ------------------------------
// 🌐 Public Routes
// ------------------------------

Route::post('/login', [AuthController::class, 'login']);


// ------------------------------
// 🔐 Authenticated Routes (Sanctum)
// ------------------------------
Route::middleware('auth:sanctum')->group(function () {

    // ✅ Authenticated User Info
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // ✅ Grades – Access for teachers & students
    Route::get('/grades', [GradeController::class, 'index']);
    Route::get('/grades/{id}', [GradeController::class, 'show']);
    Route::get('/students/{studentId}/averages/{academicYearId}', [GradeController::class, 'studentAverages']);

    // ✅ Grades – Only Teachers
    Route::middleware(CheckRole::class . ':enseignant')->group(function () {
        Route::post('/grades', [GradeController::class, 'store']);
        Route::put('/grades/{id}', [GradeController::class, 'update']);
        Route::delete('/grades/{id}', [GradeController::class, 'destroy']);
    });

    // ✅ Admin-Only Routes
    Route::middleware(CheckRole::class . ':admin')->group(function () {

        // 👥 User Management
        Route::apiResource('users', UserController::class);

        // 🏫 Class Management
        Route::apiResource('classes', ClassController::class);
        Route::get('/classes/{id}/students', [ClassController::class, 'students']);
        Route::get('/classes/{id}/subjects', [ClassController::class, 'subjects']);

        // 📚 Subject Management
        Route::apiResource('subjects', SubjectController::class);
        Route::get('/subjects/{id}/teachers', [SubjectController::class, 'teachers']);
        Route::get('/subjects/{id}/classes', [SubjectController::class, 'classes']);

        // 👨‍🏫 Teacher Assignments
        Route::get('/assignments', [TeacherAssignmentController::class, 'index']);
        Route::post('/assignments', [TeacherAssignmentController::class, 'assign']);
        Route::delete('/assignments', [TeacherAssignmentController::class, 'unassign']);
        Route::get('/teachers/{teacherId}/subjects', [TeacherAssignmentController::class, 'teacherSubjects']);
    });
});
