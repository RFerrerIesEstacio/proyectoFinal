<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RolAdmin;
use App\Http\Requests\ProductosRequest;
use App\Models\Productos;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware(RolAdmin::class)->only(['store', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = Productos::paginate(12);
        return response()->json($productos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductosRequest $request)
    {
        Productos::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock,
            'categoria' => $request->categoria
        ]);

        return response()->json("ok", 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Productos  $productos
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Productos::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Productos  $productos
     * @return \Illuminate\Http\Response
     */
    public function update(ProductosRequest $request, $id)
    {
        $producto = Productos::findOrFail($id);
        $producto->nombre = $request->get('nombre');
        $producto->descripcion = $request->get('descripcion');
        $producto->precio = $request->get('precio');
        $producto->stock = $request->get('stock');
        $producto->categoria = $request->get('categoria');
        $producto->save();
        return response()->json($producto);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Productos  $productos
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Productos::destroy($id);
        return response()->json('OK, producto eliminado' . $id , 200);
    }

    public function productListFilter( Request $request ){
        $productos = Productos::where('nombre', 'LIKE', '%'. $request->search .'%')->whereBetween('precio', [$request->preciomin, $request->preciomax])->paginate(12);
        return response()->json($productos);
    }
}
