<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'teacher_subject')
                    ->withPivot('class_id')
                    ->withTimestamps();
    }

    public function classes()
    {
        return $this->belongsToMany(Class_::class, 'teacher_subject')
                    ->withPivot('teacher_id')
                    ->withTimestamps();
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}