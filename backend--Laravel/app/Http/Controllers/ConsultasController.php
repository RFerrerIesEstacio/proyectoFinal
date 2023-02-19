<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactanosRequest;
use App\Models\Consulta;
use App\Models\User;
use Illuminate\Http\Request;

class ConsultasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ContactanosRequest $request)
    {
        $consulta = new Consulta;
        $user = User::find($request->id_usuario);
        $consulta->email = $request->email;
        $consulta->telefono = $request->telefono;
        $consulta->tipoConsulta = $request->tipoConsulta;
        $consulta->problema = $request->problema;
        $consulta->user()->associate($user);

        $consulta->save();

        return response()->json('OK, consulta efectuada', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
