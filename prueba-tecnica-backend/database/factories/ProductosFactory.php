<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cantidadInicial = fake()->numberBetween(1, 100);
        $movimiento = fake()->numberBetween(-10, 10);
        $cantidadActual = max(0, $cantidadInicial + $movimiento);

        return [
            //
            'nombre' => fake()->text(15),
            'descripcion' => fake()->text(100),
            'precio' => fake()->randomFloat(2, 1, 1000),
            'cantidadInicial' => $cantidadInicial,
            'estado' => fake()->boolean(),
            'movimiento' => $movimiento,
            'cantidadActual' => $cantidadActual
        ];
    }
}
