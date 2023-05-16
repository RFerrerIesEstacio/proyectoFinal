<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RolAdmin;
use App\Http\Requests\ProductosRequest;
use App\Models\Productos;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductosController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['image']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = Productos::paginate(12)->where('comprador', '=', 0);
        return response()->json($productos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductosRequest $request) {

        // Save the image to the /public/images directory using the Laravel storage disk
        $UserId = auth()->user()->id;
        $producto = Productos::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock,
            'image' => $request->image ? true : false,
            'categoria' => $request->categoria,
            'id_usuario' => $UserId,
            'comprador' => 0
        ]);

        if ($request->image) {
            $imagePath = 'images/' . $producto->id . '.jpg';
            $image_parts = explode(";base64,", $request->image);
            $image_base64 = base64_decode($image_parts[1]);

            file_put_contents($imagePath, $image_base64);
        }

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

        $this->checkAuth($id);
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
        $this->checkAuth($id);
        $imgPath = 'images/' . $id . '.jpg';
        if (File::exists($imgPath)) {
            File::delete($imgPath);
        }
        Productos::destroy($id);
        return response()->json('OK, producto eliminado' . $id , 200);
    }

    public function productListFilter( Request $request ){
        $productos = Productos::where('nombre', 'LIKE', '%'. $request->search .'%')->whereBetween('precio', [$request->preciomin, $request->preciomax])->paginate(12);
        return response()->json($productos);
    }

    public function image($id) {
        $path = 'images/' . $id . '.jpg';
        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);
        $response = response($file, 200);
        $response->header("Content-Type", $type);
        return $response;

    }

    public function buy($id) {

    }

    public function checkAuth($pid) {
        $product = Productos::find($pid);
        $userId = $product->id_usuario;
        if(!$userId === auth()->user()->id && auth()->user()->rol !== "admin"){
            abort(400);
        }
    }

}
