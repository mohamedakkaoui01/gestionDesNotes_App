<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Class_;

class ClassController extends Controller
{
    
    //get la liste des classes.

    public function index()
    {
        $classes = Class_::all();
        return response()->json($classes);
    }

    //creer une nouvelle classe.

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:classes',
        ]);

        $class = Class_::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'Classe créée avec succès',
            'class' => $class
        ], 201);
    }

 
    //Afficher la classe selon id.

    public function show($id)
    {
        $class = Class_::with('students.user')->findOrFail($id);
        return response()->json($class);
    }


    //Mettre à jour la classe selon id.

    public function update(Request $request, $id)
    {
        $class = Class_::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:50|unique:classes,name,' . $id,
        ]);

        $class->name = $request->name;
        $class->save();

        return response()->json([
            'message' => 'Classe mise à jour avec succès',
            'class' => $class
        ]);
    }

 
    //Supprimer la classe selon id.

    public function destroy($id)
    {
        $class = Class_::findOrFail($id);
        $class->delete();

        return response()->json([
            'message' => 'Classe supprimée avec succès'
        ]);
    }

    //get les étudiants d'une classe selon id.

    public function students($id)
    {
        $class = Class_::findOrFail($id);
        $students = $class->students()->with('user')->get();
        
        return response()->json($students);
    }


    //get les matières enseignees dans une classe selon id.

    public function subjects($id)
    {
        $class = Class_::findOrFail($id);
        $subjects = $class->subjects()->with('teachers.user')->get();
        
        return response()->json($subjects);
    }
}