<?php

namespace App\Http\Controllers;

use App\Models\Productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $productos = Productos::all();

        if (count($productos) > 0) {
            return response()->json($productos, 200);
        }
        return response()->json([], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:30',
            'descripcion' => 'required|string|max:200',
            'precio' => 'required|numeric|between:0,999999.99',
            'cantidadInicial' => 'required|integer|min:0',
            'estado' => 'required|boolean',
            'movimiento' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        $productos = new Productos();
        $productos->nombre = $request->input('nombre');
        $productos->descripcion = $request->input('descripcion');
        $productos->precio = $request->input('precio');
        $productos->cantidadInicial = $request->input('cantidadInicial');
        $productos->estado = $request->input('estado');
        $productos->movimiento = $request->input('movimiento');
        $productos->cantidadActual = $productos->cantidadInicial + $request->input('movimiento');
        $productos->save();

        return response()->json(['message' => 'Producto registrado exitosamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:30',
            'descripcion' => 'required|string|max:200',
            'precio' => 'required|numeric|between:0,999999.99',
            'cantidadInicial' => 'required|integer|min:0',
            'estado' => 'required|boolean',
            'movimiento' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 400);
        }

        $productos = Productos::find($id);
        $productos->nombre = $request->input('nombre');
        $productos->descripcion = $request->input('descripcion');
        $productos->precio = $request->input('precio');
        $productos->cantidadInicial = $request->input('cantidadInicial');
        $productos->estado = $request->input('estado');
        $productos->movimiento = $request->input('movimiento');
        $productos->cantidadActual = $productos->cantidadInicial + $request->input('movimiento');
        $productos->update();

        return response()->json(['message' => 'Producto actualizado exitosamente'], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $producto = Productos::find($id);
        $producto->delete();

        return response()->json(['message' => 'Producto borrado exitosamente'], 201);
    }

    public function buscar_producto_nombre($nombre)
    {
        $validator = Validator::make(['nombre' => $nombre], [
            'nombre' => 'required|string|max:30'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de búsqueda',
                'errors' => $validator->errors()
            ], 400);
        }

        $productos = Productos::where('nombre', 'like', '%' . $nombre . '%')->get();

        if ($productos != null) {
            return response()->json($productos, 200);
        }
        return response()->json(['message' => 'Producto no encontrado'], 404);
    }
}
