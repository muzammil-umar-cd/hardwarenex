<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BulkOrder extends Model
{
    use HasFactory;
    // Define the fillable fields for mass assignment
    protected $fillable = ['name', 'email', 'phone', 'quantity', 'total_price','unit_price', 'product_id', 'message','status'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}