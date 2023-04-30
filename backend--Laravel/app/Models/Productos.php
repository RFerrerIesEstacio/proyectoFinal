<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'image',
        'categoria',
        'comprador',
        'id_usuario'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
