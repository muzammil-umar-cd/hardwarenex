<?php

namespace App\Http\Controllers;

use App\Models\BulkOrder;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Mail\BulkOrderMailer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\Eloquent\Collection\Paginate;

class BulkOrderController extends Controller
{
    public function __construct()
    {
        // $this->middleware(['permission:show_bulk_orders'])->only('index');
        // $this->middleware(['permission:view_bulk_orders'])->only('show');
        // $this->middleware(['permission:delete_bulk_orders'])->only('destroy');
    }

    public function index(Request $request){
        if(!Auth::user()->user_type === "admin"){
            return abort(401);
        }
        
        $bulk_orders = BulkOrder::with('product')->orderBy('created_at', 'desc')->get();
        // $bulk_orders = $bulk_orders->paginate(10);
        return view('backend.bulk-orders.index', compact('bulk_orders'));
    }

    public function show(){
        return view('bulk-orders.show');
    }

    public function destroy(){
    }

    public function store(Request $request)
    {
        // dd($request->all());
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'unit_price' => 'required|min:0',
            'product_id' => 'required|numeric|min:0',
            'message' => 'required|string|max:1000',
        ]);

        // Create a new record in the database
        $bulk_order = BulkOrder::create($validated);

        $get_product = Product::findOrFail($request->product_id);


        if($bulk_order){
            $subject = 'Bulk Order For :' . ' ' . $get_product->name;
            $body = [
                'title' => $get_product->name,
                'quantity' => $request->quantity,
                'total_price' => $request->total_price,
                'unit_price' => $request->unit_price,
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'message' => $request->message
            ];
        
            Mail::to('muzammil.coredigitals@gmail.com')->send(new BulkOrderMailer($subject, $body));   
            // Return a response indicating success
            return response()->json(['message' => 'Order submitted successfully!']);
        }else{
            return response()->json(['message' => 'There was an error submitting your order.']);
        }

    }
}
