<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Productos>
 */
class ProductosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nombre' => fake()->word(),
            'descripcion' => fake()->text(),
            'precio' => fake()->randomFloat(2, 5, 500),
            'stock' => fake()->randomNumber(2, false),
            'categoria' => fake()->numberBetween(0,7),
        ];
    }
}
