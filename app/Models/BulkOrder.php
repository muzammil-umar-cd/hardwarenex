<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BulkOrder extends Model
{
    use HasFactory;
    // Define the fillable fields for mass assignment
    protected $fillable = ['name', 'email', 'phone', 'quantity', 'price', 'message'];
}