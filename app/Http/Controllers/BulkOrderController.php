<?php

namespace App\Http\Controllers;

use App\Models\BulkOrder;  // Create a model to interact with the contact_form table
use Illuminate\Http\Request;

class BulkOrderController extends Controller
{
    public function store(Request $request)
    {
        dd($request->all());
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'message' => 'required|string|max:1000',
        ]);

        // Create a new record in the database
        $bulk_order = BulkOrder::create($validated);

        // Return a response indicating success
        return response()->json([
            'message' => 'Thank you for reaching out. We will get back to you soon.',
        ], 200);
    }
}
