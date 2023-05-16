<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller 
{
    public function charge($amount) {
        \Stripe\Stripe::setApiKey(env('STRIPE_SK'));

        $session = \Stripe\Checkout\Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Charge ' . str($amount) . ' €'
                        ],
                        'unit_amount' => $amount*100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => 'https://rferreriesestacio.ddns.net/payment/success',
            'cancel_url' => 'https://rferreriesestacio.ddns.net/payment/fail'
        ]);

        return response()->json([
            'payment_url' => $session->url
        ]);
    }    
}
