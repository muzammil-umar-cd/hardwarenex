<?php

namespace App\Http\Controllers;

use App\Models\BulkOrder;  // Create a model to interact with the contact_form table
use Illuminate\Http\Request;

class BulkOrderController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|tel|number|max:11',
            'quantity' => 'required|number',
            'message' => 'required|string',
        ]);

        // Create a new record in the database
        $bulk_order = BulkOrder::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'quantity' => $request->quantity,
            'message' => $request->message,
        ]);

        // Return a response indicating success
        return response()->json([
            'message' => 'Thank you for reaching out. We will get back to you soon.',
        ], 200);
    }
}
